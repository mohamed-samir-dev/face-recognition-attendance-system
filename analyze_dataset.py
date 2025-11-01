#!/usr/bin/env python3
import os
import face_recognition
from PIL import Image
import numpy as np

def analyze_dataset():
    dataset_path = "ai/image_dataset"
    
    print("Analyzing Employee Dataset Quality")
    print("=" * 50)
    
    for person_name in os.listdir(dataset_path):
        person_folder = os.path.join(dataset_path, person_name)
        if not os.path.isdir(person_folder):
            continue
            
        print(f"\nEmployee: {person_name}")
        
        valid_images = 0
        total_images = 0
        encodings = []
        
        for image_file in os.listdir(person_folder):
            if image_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                total_images += 1
                image_path = os.path.join(person_folder, image_file)
                
                try:
                    image = face_recognition.load_image_file(image_path)
                    face_encodings = face_recognition.face_encodings(image)
                    
                    if face_encodings:
                        valid_images += 1
                        encodings.append(face_encodings[0])
                        print(f"   OK: {image_file}")
                    else:
                        print(f"   FAIL: {image_file} - No face detected")
                        
                except Exception as e:
                    print(f"   ERROR: {image_file} - {e}")
        
        print(f"   Valid images: {valid_images}/{total_images}")
        
        # Check encoding consistency
        if len(encodings) > 1:
            distances = []
            for i in range(len(encodings)):
                for j in range(i+1, len(encodings)):
                    dist = face_recognition.face_distance([encodings[i]], encodings[j])[0]
                    distances.append(dist)
            
            avg_distance = np.mean(distances)
            print(f"   Avg internal distance: {avg_distance:.3f}")
            
            if avg_distance > 0.6:
                print(f"   WARNING: HIGH VARIANCE - May cause recognition issues")
            elif avg_distance > 0.4:
                print(f"   MEDIUM VARIANCE - Should work with current thresholds")
            else:
                print(f"   LOW VARIANCE - Excellent consistency")

if __name__ == "__main__":
    analyze_dataset()