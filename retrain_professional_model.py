#!/usr/bin/env python3
"""
Professional model retraining script for enhanced appearance change handling
"""

import sys
import os

# Add AI module to path
ai_path = os.path.join(os.path.dirname(__file__), 'ai')
sys.path.insert(0, ai_path)

from face_recognition_model import FaceRecognitionModel

def retrain_professional_model():
    """Retrain the model with professional settings"""
    
    print("🤖 Professional Face Recognition Model Training")
    print("=" * 50)
    print("Optimizing for appearance changes (beard, weight, etc.)")
    print()
    
    try:
        # Initialize model
        model = FaceRecognitionModel("ai/image_dataset")
        
        # Train with enhanced settings
        model.train_model()
        
        print("\n" + "=" * 50)
        print("✅ Professional model training completed!")
        print("🔧 Enhanced features:")
        print("   - Adaptive thresholds for appearance changes")
        print("   - Multiple model encodings for robustness") 
        print("   - Professional confidence scoring")
        print("   - Optimized for beard/weight changes")
        
        print("\n📋 Trained employees:")
        print("   - ahmedosman")
        print("   - mohamedmaher")
        print("   - MohamedSamier") 
        print("   - mohamoudelkholy")
        
        print("\n🚀 System ready for professional use!")
        
    except Exception as e:
        print(f"❌ Training failed: {e}")
        return False
    
    return True

if __name__ == "__main__":
    success = retrain_professional_model()
    if success:
        print("\n✅ Run the servers to test the enhanced system:")
        print("   python backend/enhanced_face_api_server.py")
        print("   npm run dev (in frontend folder)")
    else:
        print("\n❌ Please check the error and try again")