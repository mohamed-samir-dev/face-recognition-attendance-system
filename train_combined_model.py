import os
import sys
import base64
import numpy as np
from PIL import Image
import io
import face_recognition
import pickle

# Add backend to path
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

from app.services.firebase_service import FirebaseService

class CombinedFaceTrainer:
    def __init__(self):
        self.firebase_service = FirebaseService()
        self.known_face_encodings = []
        self.known_face_names = []
        self.model_file = "face_model.pkl"
        self.dataset_path = "ai/image_dataset"
    
    def get_firebase_users(self):
        """Get all users from Firebase"""
        if not self.firebase_service.firebase_enabled:
            return []
        
        try:
            users_ref = self.firebase_service.db.collection('users')
            docs = users_ref.get()
            users = []
            for doc in docs:
                data = doc.to_dict()
                if 'name' in data and 'image' in data:
                    users.append({
                        'name': data['name'],
                        'image': data['image']
                    })
            return users
        except Exception as e:
            print(f"Error fetching Firebase users: {e}")
            return []
    
    def process_firebase_image(self, image_data):
        """Convert Firebase base64 image to face encoding"""
        try:
            # Remove data URL prefix if present
            if ',' in image_data:
                image_data = image_data.split(',')[1]
            
            # Decode base64
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
            
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            image_array = np.array(image)
            
            # Get face encodings
            encodings = face_recognition.face_encodings(image_array, model='large')
            return encodings[0] if encodings else None
            
        except Exception as e:
            print(f"Error processing Firebase image: {e}")
            return None
    
    def train_combined_model(self):
        """Train model on both local dataset and Firebase photos"""
        print("Training combined model with local dataset + Firebase photos...")
        
        # 1. Train on local dataset
        if os.path.exists(self.dataset_path):
            print("Processing local dataset...")
            for person_name in os.listdir(self.dataset_path):
                person_folder = os.path.join(self.dataset_path, person_name)
                
                if not os.path.isdir(person_folder):
                    continue
                
                print(f"  Processing local images for {person_name}...")
                
                for image_file in os.listdir(person_folder):
                    if image_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                        image_path = os.path.join(person_folder, image_file)
                        
                        try:
                            image = face_recognition.load_image_file(image_path)
                            encodings = face_recognition.face_encodings(image, model='large')
                            
                            if encodings:
                                self.known_face_encodings.append(encodings[0])
                                self.known_face_names.append(person_name)
                                print(f"    Added local encoding for {person_name}")
                        except Exception as e:
                            print(f"    Error processing {image_file}: {e}")
        
        # 2. Add Firebase photos
        print("Processing Firebase photos...")
        firebase_users = self.get_firebase_users()
        
        for user in firebase_users:
            name = user['name']
            image_data = user['image']
            
            print(f"  Processing Firebase photo for {name}...")
            encoding = self.process_firebase_image(image_data)
            
            if encoding is not None:
                self.known_face_encodings.append(encoding)
                self.known_face_names.append(name)
                print(f"    Added Firebase encoding for {name}")
            else:
                print(f"    Failed to process Firebase photo for {name}")
        
        # 3. Save combined model
        self.save_model()
        print(f"Combined model trained with {len(self.known_face_encodings)} total encodings")
        
        # Show training summary
        name_counts = {}
        for name in self.known_face_names:
            name_counts[name] = name_counts.get(name, 0) + 1
        
        print("\nTraining Summary:")
        for name, count in name_counts.items():
            print(f"  {name}: {count} encodings")
    
    def save_model(self):
        """Save the combined model"""
        model_data = {
            'encodings': self.known_face_encodings,
            'names': self.known_face_names
        }
        
        # Save to multiple locations
        locations = [
            self.model_file,
            "ai/face_model.pkl",
            "backend/face_model.pkl"
        ]
        
        for location in locations:
            try:
                os.makedirs(os.path.dirname(location), exist_ok=True)
                with open(location, 'wb') as f:
                    pickle.dump(model_data, f)
                print(f"Model saved to {location}")
            except Exception as e:
                print(f"Failed to save to {location}: {e}")

if __name__ == "__main__":
    trainer = CombinedFaceTrainer()
    trainer.train_combined_model()