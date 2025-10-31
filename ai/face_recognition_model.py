import cv2
import face_recognition
import os
import pickle
import numpy as np
import sys
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
    
    def train_model(self):
        """Train the model on images in the dataset folder"""
        print("Training face recognition model...")
        
        for person_name in os.listdir(self.dataset_path):
            person_folder = os.path.join(self.dataset_path, person_name)
            
            if not os.path.isdir(person_folder):
                continue
                
            print(f"Processing images for {person_name}...")
            
            for image_file in os.listdir(person_folder):
                if image_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                    image_path = os.path.join(person_folder, image_file)
                    
                    # Load image
                    image = face_recognition.load_image_file(image_path)
                    
                    # Get face encodings
                    face_encodings = face_recognition.face_encodings(image)
                    
                    if face_encodings:
                        # Use the first face found
                        face_encoding = face_encodings[0]
                        self.known_face_encodings.append(face_encoding)
                        self.known_face_names.append(person_name)
                        print(f"  Added encoding for {person_name} from {image_file}")
        
        # Save the model
        self.save_model()
        print(f"Model trained with {len(self.known_face_encodings)} face encodings")
    
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
    
    def recognize_face(self, image_path):
        """Three-stage face recognition validation with professional messaging"""
        # Load the image
        image = face_recognition.load_image_file(image_path)
        
        # Find face encodings in the image
        face_encodings = face_recognition.face_encodings(image)
        
        if not face_encodings:
            return None, "No face detected in the image. Please ensure proper lighting and positioning."
        
        if len(face_encodings) > 1:
            return None, "Multiple faces detected. Please ensure only one person is in the frame."
        
        face_encoding = face_encodings[0]
        
        # STAGE 1: Compare with dataset images
        matches = face_recognition.compare_faces(self.known_face_encodings, face_encoding, tolerance=0.6)
        face_distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)
        
        if not any(matches):
            return None, "This person is a stranger and doesn't exist in our employee database. Access denied."
        
        best_match_index = np.argmin(face_distances)
        best_distance = face_distances[best_match_index]
        employee_name = self.known_face_names[best_match_index]
        
        if not matches[best_match_index] or best_distance >= 0.6:
            return employee_name, f"Person detected: {employee_name}. However, this person is not authorized to access the system."
        
        # STAGE 2: Compare with Firebase image
        firebase_match, firebase_message = self.firebase_service.compare_with_firebase_image(face_encoding, employee_name)
        
        if not firebase_match:
            # If person is in dataset but Firebase verification fails, they might be impersonating
            return None, f"Identity verification failed. Expected account holder: {employee_name}. Please use the correct authorized account."
        
        # STAGE 3: Final validation - both stages passed
        confidence = 1 - best_distance
        return employee_name, f"Welcome, {employee_name}. Identity verified successfully. Confidence: {confidence:.0%}"

if __name__ == "__main__":
    try:
        model = FaceRecognitionModel()
        model.train_model()
    except Exception as e:
        print(f"Error: {e}")