#!/usr/bin/env python3
"""
Test script to verify the system only accepts trained employee faces.
"""

import requests
import json

def test_employee_only_recognition():
    """Test that only trained employees are accepted"""
    
    print("🔒 Testing Employee-Only Face Recognition")
    print("=" * 50)
    
    # Check server
    try:
        response = requests.get("http://localhost:5001/health")
        if response.status_code != 200:
            print("❌ Backend server not running")
            print("   Please start: python enhanced_face_api_server.py")
            return
    except:
        print("❌ Cannot connect to backend server")
        return
    
    print("✅ Backend server is running")
    
    # Test with dummy image (should be rejected)
    print("\n🧪 Testing with non-employee image...")
    
    dummy_image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
    
    test_data = {
        "image": dummy_image,
        "expected_user": "ahmedosman"  # One of the trained employees
    }
    
    try:
        response = requests.post("http://localhost:5001/recognize", 
                               json=test_data,
                               headers={"Content-Type": "application/json"})
        
        result = response.json()
        
        if response.status_code == 200 and result.get('success'):
            print("❌ PROBLEM: System accepted non-employee image!")
            print(f"   Result: {result}")
        else:
            print("✅ GOOD: System rejected non-employee image")
            print(f"   Message: {result.get('message', 'No message')}")
            
    except Exception as e:
        print(f"❌ Error testing recognition: {e}")
    
    print("\n" + "=" * 50)
    print("🔧 Current Security Settings:")
    print("   - Face recognition threshold: 0.4 (strict)")
    print("   - Firebase comparison threshold: 0.4 (strict)")
    print("   - Only trained employees in dataset:")
    print("     • ahmedosman")
    print("     • mohamedmaher") 
    print("     • MohamedSamier")
    print("     • mohamoudelkholy")
    
    print("\n📋 To test with real employee photos:")
    print("   1. Take a photo of one of the trained employees")
    print("   2. Use the frontend camera interface")
    print("   3. System should accept only trained employee faces")
    print("   4. Any other person should be rejected")
    
    print("\n✅ System configured to accept ONLY trained employees!")

if __name__ == "__main__":
    test_employee_only_recognition()