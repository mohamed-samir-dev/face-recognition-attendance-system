import cv2
import face_recognition
import os
import numpy as np
from PIL import Image, ImageEnhance
import shutil

class DatasetImprover:
    def __init__(self, dataset_path="image_dataset"):
        self.dataset_path = dataset_path
        self.backup_path = f"{dataset_path}_backup"
    
    def analyze_dataset(self):
        """Analyze dataset quality and identify issues"""
        print("Analyzing dataset quality...")
        issues = []
        
        for person_name in os.listdir(self.dataset_path):
            person_folder = os.path.join(self.dataset_path, person_name)
            
            if not os.path.isdir(person_folder):
                continue
            
            print(f"\nAnalyzing {person_name}:")
            person_issues = []
            image_count = 0
            valid_images = 0
            
            for image_file in os.listdir(person_folder):
                if image_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                    image_count += 1
                    image_path = os.path.join(person_folder, image_file)
                    
                    # Check image quality
                    issue = self.check_image_quality(image_path, image_file)
                    if issue:
                        person_issues.append(issue)
                    else:
                        valid_images += 1
            
            print(f"  Total images: {image_count}")
            print(f"  Valid images: {valid_images}")
            print(f"  Issues found: {len(person_issues)}")
            
            if len(person_issues) > 0:
                issues.extend(person_issues)
            
            # Recommend minimum images
            if valid_images < 3:
                issues.append(f"{person_name}: Only {valid_images} valid images. Recommend at least 3-5 images per person.")
        
        return issues
    
    def check_image_quality(self, image_path, image_file):
        """Check individual image quality"""
        try:
            # Load image
            image = face_recognition.load_image_file(image_path)
            face_encodings = face_recognition.face_encodings(image)
            
            # Check for face detection
            if len(face_encodings) == 0:
                return f"{image_file}: No face detected"
            
            if len(face_encodings) > 1:
                return f"{image_file}: Multiple faces detected"
            
            # Check image size and quality
            pil_image = Image.open(image_path)
            width, height = pil_image.size
            
            if width < 200 or height < 200:
                return f"{image_file}: Image too small ({width}x{height})"
            
            # Check if image is too dark or bright
            gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
            mean_brightness = np.mean(gray)
            
            if mean_brightness < 50:
                return f"{image_file}: Image too dark (brightness: {mean_brightness:.1f})"
            
            if mean_brightness > 200:
                return f"{image_file}: Image too bright (brightness: {mean_brightness:.1f})"
            
            return None
            
        except Exception as e:
            return f"{image_file}: Error loading image - {str(e)}"
    
    def enhance_images(self):
        """Enhance existing images for better recognition"""
        print("Enhancing images...")
        
        # Create backup
        if not os.path.exists(self.backup_path):
            shutil.copytree(self.dataset_path, self.backup_path)
            print(f"Backup created at {self.backup_path}")
        
        for person_name in os.listdir(self.dataset_path):
            person_folder = os.path.join(self.dataset_path, person_name)
            
            if not os.path.isdir(person_folder):
                continue
            
            print(f"Enhancing images for {person_name}...")
            
            for image_file in os.listdir(person_folder):
                if image_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                    image_path = os.path.join(person_folder, image_file)
                    self.enhance_single_image(image_path)
    
    def enhance_single_image(self, image_path):
        """Enhance a single image"""
        try:
            # Load image
            pil_image = Image.open(image_path)
            
            # Convert to RGB if needed
            if pil_image.mode != 'RGB':
                pil_image = pil_image.convert('RGB')
            
            # Check if enhancement is needed
            gray = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2GRAY)
            mean_brightness = np.mean(gray)
            
            enhanced = False
            
            # Enhance contrast if needed
            if mean_brightness < 80 or mean_brightness > 180:
                enhancer = ImageEnhance.Contrast(pil_image)
                pil_image = enhancer.enhance(1.2)
                enhanced = True
            
            # Enhance brightness if needed
            if mean_brightness < 100:
                enhancer = ImageEnhance.Brightness(pil_image)
                pil_image = enhancer.enhance(1.2)
                enhanced = True
            elif mean_brightness > 160:
                enhancer = ImageEnhance.Brightness(pil_image)
                pil_image = enhancer.enhance(0.9)
                enhanced = True
            
            # Save enhanced image
            if enhanced:
                pil_image.save(image_path, quality=95)
                print(f"  Enhanced: {os.path.basename(image_path)}")
        
        except Exception as e:
            print(f"  Error enhancing {image_path}: {e}")
    
    def generate_report(self):
        """Generate a comprehensive dataset report"""
        print("\n" + "="*50)
        print("DATASET QUALITY REPORT")
        print("="*50)
        
        issues = self.analyze_dataset()
        
        if issues:
            print(f"\nFound {len(issues)} issues:")
            for issue in issues:
                print(f"  ⚠️  {issue}")
            
            print(f"\nRECOMMENDATIONS:")
            print(f"  1. Run enhance_images() to improve image quality")
            print(f"  2. Add more images for people with < 3 valid images")
            print(f"  3. Replace images with 'No face detected' or 'Multiple faces'")
            print(f"  4. Ensure good lighting and clear face visibility")
            print(f"  5. Retrain model after improvements")
        else:
            print("✅ Dataset quality looks good!")
        
        return issues

if __name__ == "__main__":
    improver = DatasetImprover()
    
    # Generate quality report
    issues = improver.generate_report()
    
    if issues:
        response = input("\nWould you like to enhance images automatically? (y/n): ")
        if response.lower() == 'y':
            improver.enhance_images()
            print("\n✅ Image enhancement complete!")
            print("💡 Now run: python face_recognition_model.py to retrain the model")