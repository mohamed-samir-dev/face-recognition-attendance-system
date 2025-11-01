import sys
import os

# Add paths
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'ai'))

from ai.face_recognition_model import FaceRecognitionModel

def test_combined_model():
    """Test the combined model recognition"""
    print("Testing combined face recognition model...")
    
    # Initialize model
    model = FaceRecognitionModel()
    
    # Load the model
    if not model.load_model():
        print("No model found! Please run train_combined_model.py first")
        return
    
    print(f"Model loaded with {len(model.known_face_encodings)} encodings")
    
    # Show unique names in model
    unique_names = list(set(model.known_face_names))
    print(f"Trained employees: {unique_names}")
    
    # Show encoding count per person
    name_counts = {}
    for name in model.known_face_names:
        name_counts[name] = name_counts.get(name, 0) + 1
    
    print("\nEncodings per person:")
    for name, count in name_counts.items():
        print(f"  {name}: {count} encodings")
    
    print("\nModel ready for flexible recognition!")
    print("The model now includes both local dataset and Firebase photos.")

if __name__ == "__main__":
    test_combined_model()