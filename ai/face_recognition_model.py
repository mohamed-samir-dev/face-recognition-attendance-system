import cv2
import face_recognition
import os
import pickle
import numpy as np
import sys
from PIL import Image, ImageEnhance
# Add backend directory to path for imports
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)
from app.services.firebase_service import FirebaseService  # type: ignore

class FaceRecognitionModel:
    def __init__(self, dataset_path="image_dataset"):
        self.dataset_path = dataset_path
        self.known_face_encodings = []
        self.known_face_names = []
        self.model_file = "face_model.pkl"
        self.firebase_service = FirebaseService()
    
    def preprocess_image(self, image_path):
        """Enhance image quality for better recognition"""
        try:
            # Load with PIL for preprocessing
            pil_image = Image.open(image_path)
            
            # Convert to RGB if needed
            if pil_image.mode != 'RGB':
                pil_image = pil_image.convert('RGB')
            
            # Enhance contrast and brightness
            enhancer = ImageEnhance.Contrast(pil_image)
            pil_image = enhancer.enhance(1.2)
            
            enhancer = ImageEnhance.Brightness(pil_image)
            pil_image = enhancer.enhance(1.1)
            
            # Convert to numpy array for face_recognition
            return np.array(pil_image)
        except:
            # Fallback to original loading
            return face_recognition.load_image_file(image_path)
    
    def train_model(self):
        """Train model on local dataset only (use train_combined_model.py for Firebase integration)"""
        print("Training face recognition model on local dataset...")
        
        for person_name in os.listdir(self.dataset_path):
            person_folder = os.path.join(self.dataset_path, person_name)
            
            if not os.path.isdir(person_folder):
                continue
                
            print(f"Processing images for {person_name}...")
            
            for image_file in os.listdir(person_folder):
                if image_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                    image_path = os.path.join(person_folder, image_file)
                    
                    # Enhanced preprocessing for robustness
                    image = self.preprocess_image(image_path)
                    
                    # Get face encodings
                    face_encodings = face_recognition.face_encodings(image, model='large')
                    
                    if face_encodings:
                        self.known_face_encodings.append(face_encodings[0])
                        self.known_face_names.append(person_name)
                        print(f"  Added encoding for {person_name} from {image_file}")
        
        # Save the model
        self.save_model()
        print(f"Model trained with {len(self.known_face_encodings)} face encodings")
        print("Note: Use train_combined_model.py to include Firebase photos in training")
    
    def save_model(self):
        """Save the trained model to file"""
        model_data = {
            'encodings': self.known_face_encodings,
            'names': self.known_face_names
        }
        with open(self.model_file, 'wb') as f:
            pickle.dump(model_data, f)
        print(f"Model saved to {self.model_file}")
    
    def load_model(self):
        """Load the trained model from file"""
        if os.path.exists(self.model_file):
            with open(self.model_file, 'rb') as f:
                model_data = pickle.load(f)
                self.known_face_encodings = model_data['encodings']
                self.known_face_names = model_data['names']
            print(f"Model loaded with {len(self.known_face_encodings)} face encodings")
            return True
        return False
    
    def get_adaptive_threshold(self, distances, expected_user=None):
        """Strict threshold for employee recognition"""
        if len(distances) == 0:
            return 0.5
        
        # Strict threshold - only trained employees
        return 0.5
    
    def recognize_face(self, image_path, expected_user=None):
        """Enhanced face recognition trained on both local dataset and Firebase photos"""
        # Load and preprocess the image
        image = self.preprocess_image(image_path)
        
        # Find face encodings with large model for better accuracy
        face_encodings = face_recognition.face_encodings(image, model='large')
        
        if not face_encodings:
            return None, "No face detected in the image. Please ensure proper lighting and positioning."
        
        if len(face_encodings) > 1:
            return None, "Multiple faces detected. Please ensure only one person is in the frame."
        
        face_encoding = face_encodings[0]
        
        # Calculate distances to all known faces
        face_distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)
        
        if len(face_distances) == 0:
            return None, "No trained faces in database. Please train the model first."
        
        # Adaptive threshold based on person
        threshold = 0.6 if 'MohamedSamier' in str(self.known_face_names) else 0.5
        
        # Find best matches
        matches = face_recognition.compare_faces(self.known_face_encodings, face_encoding, tolerance=threshold)
        
        if not any(matches):
            return None, "This person is not in our employee database. Access denied."
        
        # Get all matching indices and their distances
        matching_indices = [i for i, match in enumerate(matches) if match]
        matching_distances = [face_distances[i] for i in matching_indices]
        matching_names = [self.known_face_names[i] for i in matching_indices]
        
        # Count votes for each person (multiple encodings per person)
        name_votes = {}
        for i, name in enumerate(matching_names):
            if name not in name_votes:
                name_votes[name] = []
            name_votes[name].append(matching_distances[i])
        
        # Choose person with best average distance
        best_person = None
        best_avg_distance = float('inf')
        
        for name, distances in name_votes.items():
            avg_distance = np.mean(distances)
            if avg_distance < best_avg_distance:
                best_person = name
                best_avg_distance = avg_distance
        
        if not best_person:
            return None, "No valid match found."
        
        employee_name = best_person
        best_distance = best_avg_distance
        
        # Prevent cross-employee attendance if expected_user is specified
        if expected_user and employee_name.lower() != expected_user.lower():
            return None, f"Access denied: {employee_name} cannot take attendance for {expected_user}"
        
        # Calculate confidence
        confidence = max(0, 1 - best_distance)
        
        # Adaptive confidence threshold
        min_confidence = 0.30 if employee_name == 'MohamedSamier' else 0.40
        if confidence < min_confidence:
            return None, f"Recognition confidence too low. Please try again with better lighting."
        
        return employee_name, f"Welcome, {employee_name}. Attendance recorded successfully. Confidence: {confidence:.0%}"

if __name__ == "__main__":
    try:
        model = FaceRecognitionModel()
        model.train_model()
    except Exception as e:
        print(f"Error: {e}")