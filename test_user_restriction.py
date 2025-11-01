#!/usr/bin/env python3
"""
Test script to verify that the face recognition system only accepts the page owner's image.
This script tests the enhanced security feature that prevents unauthorized access.
"""

import requests
import base64
import json
import os
import sys

# Add AI module to path
ai_path = os.path.join(os.path.dirname(__file__), 'ai')
sys.path.insert(0, ai_path)

def encode_image_to_base64(image_path):
    """Convert image file to base64 string"""
    try:
        with open(image_path, 'rb') as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
            return f"data:image/jpeg;base64,{encoded_string}"
    except Exception as e:
        print(f"Error encoding image {image_path}: {e}")
        return None

def test_recognize_endpoint(image_path, expected_user=None):
    """Test the /recognize endpoint with user validation"""
    print(f"\n--- Testing /recognize endpoint ---")
    print(f"Image: {image_path}")
    print(f"Expected User: {expected_user}")
    
    # Encode image
    image_data = encode_image_to_base64(image_path)
    if not image_data:
        return False
    
    # Prepare request data
    request_data = {"image": image_data}
    if expected_user:
        request_data["expected_user"] = expected_user
    
    try:
        # Send request to recognition endpoint
        response = requests.post(
            "http://localhost:5001/recognize",
            headers={"Content-Type": "application/json"},
            json=request_data,
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"Success: {result.get('success', False)}")
            print(f"Message: {result.get('message', 'No message')}")
            if result.get('name'):
                print(f"Recognized: {result['name']}")
            return result.get('success', False)
        else:
            print(f"HTTP Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return False

def test_compare_endpoint(image1_path, image2_path):
    """Test the /compare endpoint"""
    print(f"\n--- Testing /compare endpoint ---")
    print(f"Image 1: {image1_path}")
    print(f"Image 2: {image2_path}")
    
    # Encode both images
    image1_data = encode_image_to_base64(image1_path)
    image2_data = encode_image_to_base64(image2_path)
    
    if not image1_data or not image2_data:
        return False
    
    try:
        response = requests.post(
            "http://localhost:5001/compare",
            headers={"Content-Type": "application/json"},
            json={
                "image1": image1_data,
                "image2": image2_data
            },
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"Match: {result.get('match', False)}")
            print(f"Distance: {result.get('distance', 'N/A')}")
            print(f"Message: {result.get('message', 'No message')}")
            return result.get('match', False)
        else:
            print(f"HTTP Error: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return False

def main():
    """Run comprehensive tests"""
    print("=== Face Recognition User Restriction Test ===")
    
    # Check if server is running
    try:
        response = requests.get("http://localhost:5001/health", timeout=5)
        if response.status_code != 200:
            print("❌ Face recognition server is not running on localhost:5001")
            print("Please start the server first: python backend/enhanced_face_api_server.py")
            return
    except:
        print("❌ Cannot connect to face recognition server on localhost:5001")
        print("Please start the server first: python backend/enhanced_face_api_server.py")
        return
    
    print("✅ Server is running")
    
    # Define test cases
    dataset_path = "ai/image_dataset"
    
    if not os.path.exists(dataset_path):
        print(f"❌ Dataset path not found: {dataset_path}")
        return
    
    # Get available users
    users = [d for d in os.listdir(dataset_path) if os.path.isdir(os.path.join(dataset_path, d))]
    
    if len(users) < 2:
        print(f"❌ Need at least 2 users in dataset for testing. Found: {users}")
        return
    
    print(f"Available users: {users}")
    
    # Test scenarios
    test_results = []
    
    for user in users[:2]:  # Test first 2 users
        user_path = os.path.join(dataset_path, user)
        images = [f for f in os.listdir(user_path) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        
        if not images:
            print(f"⚠️  No images found for user {user}")
            continue
        
        image_path = os.path.join(user_path, images[0])
        
        print(f"\n🧪 Testing user: {user}")
        
        # Test 1: Correct user should be accepted
        print(f"\n1. Testing correct user recognition:")
        result1 = test_recognize_endpoint(image_path, user)
        test_results.append(("Correct user accepted", result1))
        
        # Test 2: Wrong expected user should be rejected
        other_user = users[1] if user == users[0] else users[0]
        print(f"\n2. Testing wrong user rejection:")
        result2 = test_recognize_endpoint(image_path, other_user)
        test_results.append(("Wrong user rejected", not result2))  # Should fail
        
        # Test 3: No expected user (legacy mode)
        print(f"\n3. Testing legacy mode (no expected user):")
        result3 = test_recognize_endpoint(image_path)
        test_results.append(("Legacy mode works", result3))
        
        break  # Test only first user for now
    
    # Summary
    print(f"\n{'='*50}")
    print("TEST RESULTS SUMMARY:")
    print(f"{'='*50}")
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! User restriction is working correctly.")
    else:
        print("⚠️  Some tests failed. Please check the implementation.")

if __name__ == "__main__":
    main()