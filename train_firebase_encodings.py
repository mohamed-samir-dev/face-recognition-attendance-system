#!/usr/bin/env python3
"""
AI-Powered Firebase Encoding Training System
Trains multiple face encodings per employee and stores them in Firebase
for better appearance change tolerance
"""
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'ai'))

import face_recognition
from backend.app.services.firebase_service import FirebaseService

def train_firebase_encodings():
    print("AI-Powered Firebase Encoding Training")
    print("=" * 50)
    
    firebase_service = FirebaseService()
    
    if not firebase_service.firebase_enabled:
        print("✗ Firebase service not available. Please check configuration.")
        return
    
    dataset_path = "ai/image_dataset"
    
    if not os.path.exists(dataset_path):
        print(f"✗ Dataset path not found: {dataset_path}")
        return
    
    total_employees = 0
    total_encodings = 0
    
    for person_name in os.listdir(dataset_path):
        person_folder = os.path.join(dataset_path, person_name)
        if not os.path.isdir(person_folder):
            continue
            
        print(f"\nProcessing {person_name}...")
        person_encodings = []
        
        for image_file in os.listdir(person_folder):
            if image_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                image_path = os.path.join(person_folder, image_file)
                
                try:
                    # Load and process image
                    image = face_recognition.load_image_file(image_path)
                    
                    # Get encodings with both models for robustness
                    encodings_large = face_recognition.face_encodings(image, model='large')
                    encodings_small = face_recognition.face_encodings(image, model='small')
                    
                    if encodings_large:
                        person_encodings.append(encodings_large[0])
                        print(f"  ✓ {image_file} (large model)")
                    elif encodings_small:
                        person_encodings.append(encodings_small[0])
                        print(f"  ✓ {image_file} (small model)")
                    else:
                        print(f"  ✗ {image_file} - No face detected")
                        
                except Exception as e:
                    print(f"  ✗ {image_file} - Error: {e}")
        
        if person_encodings:
            # Store encodings in Firebase
            success = firebase_service.store_employee_encodings(person_name, person_encodings)
            if success:
                print(f"  ✓ Stored {len(person_encodings)} encodings for {person_name}")
                total_employees += 1
                total_encodings += len(person_encodings)
            else:
                print(f"  ✗ Failed to store encodings for {person_name}")
        else:
            print(f"  ✗ No valid encodings found for {person_name}")
    
    print("\n" + "=" * 50)
    print("AI TRAINING COMPLETE")
    print(f"✓ Trained {total_employees} employees")
    print(f"✓ Generated {total_encodings} total encodings")
    print("✓ Firebase AI system ready for appearance-tolerant recognition")

if __name__ == "__main__":
    train_firebase_encodings()