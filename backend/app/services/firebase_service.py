import firebase_admin
from firebase_admin import credentials, firestore, storage
import base64
import face_recognition
import numpy as np
from PIL import Image
import io

class FirebaseService:
    def __init__(self):
        self.db = None
        self.firebase_enabled = False
        
        try:
            if not firebase_admin._apps:
                # Try to initialize Firebase with service account key
                import os
                key_path = os.path.join(os.path.dirname(__file__), '..', '..', 'credentials', 'user-login-data-7d185-firebase-adminsdk-fbsvc-5e534dfaf3.json')
                if os.path.exists(key_path):
                    cred = credentials.Certificate(key_path)
                    firebase_admin.initialize_app(cred, {
                        'projectId': 'user-login-data-7d185'
                    })
                else:
                    raise Exception("Firebase service account key file not found")
            
            self.db = firestore.client()
            self.firebase_enabled = True
            print("Firebase initialized successfully")
        except Exception as e:
            print(f"Firebase initialization failed: {e}")
            print("Running in offline mode - Firebase features disabled")
            self.firebase_enabled = False
    
    def get_employee_image(self, employee_name):
        """Get employee image from Firebase"""
        if not self.firebase_enabled or self.db is None:
            return None
            
        try:
            doc_ref = self.db.collection('employees').document(employee_name)
            doc = doc_ref.get()
            
            if doc.exists:
                data = doc.to_dict()
                return data.get('image_data')  # Base64 encoded image
            return None
        except Exception as e:
            print(f"Error fetching employee image: {e}")
            return None
    
    def compare_with_firebase_image(self, captured_image_encoding, employee_name):
        """Compare captured image with Firebase stored image"""
        if not self.firebase_enabled:
            return True, "Firebase disabled - skipping stage 2 validation"
            
        firebase_image_data = self.get_employee_image(employee_name)
        
        if not firebase_image_data:
            return True, "No Firebase image found - skipping stage 2 validation"
        
        try:
            # Decode Firebase image
            image_data = firebase_image_data.split(',')[1] if ',' in firebase_image_data else firebase_image_data
            image_bytes = base64.b64decode(image_data)
            
            image = Image.open(io.BytesIO(image_bytes))
            if image.mode != 'RGB':
                image = image.convert('RGB')
            image_array = np.array(image)
            
            # Get face encoding from Firebase image
            firebase_encodings = face_recognition.face_encodings(image_array)
            
            if not firebase_encodings:
                return False, "No face detected in Firebase image"
            
            # Compare encodings
            distance = face_recognition.face_distance([firebase_encodings[0]], captured_image_encoding)[0]
            
            # Relaxed threshold for Firebase comparison
            if distance < 0.5:
                return True, f"Firebase match confirmed (distance: {distance:.3f})"
            else:
                return False, f"Firebase image mismatch (distance: {distance:.3f})"
                
        except Exception as e:
            return False, f"Error comparing with Firebase: {e}"