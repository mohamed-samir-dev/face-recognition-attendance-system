#!/usr/bin/env python3
"""
Test script to verify daily attendance restriction functionality
"""

import requests
import json
import base64
from datetime import datetime

def test_attendance_restriction():
    """Test the attendance restriction functionality"""
    
    # Test data - replace with actual base64 image data
    test_image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    test_employee_id = "test_user_123"
    
    print("Testing Daily Attendance Restriction System")
    print("=" * 50)
    
    # Test 1: First attendance attempt (should succeed)
    print("\n1. Testing first attendance attempt...")
    try:
        response = requests.post(
            "http://localhost:5001/recognize",
            json={"image": test_image},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Status: {response.status_code}")
            print(f"   Success: {result.get('success', False)}")
            print(f"   Message: {result.get('message', 'No message')}")
            print(f"   Attendance Recorded: {result.get('attendance_recorded', False)}")
        else:
            print(f"   Error: {response.status_code} - {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"   Connection Error: {e}")
        print("   Make sure the backend server is running on localhost:5001")
    
    # Test 2: Second attendance attempt (should fail)
    print("\n2. Testing second attendance attempt (should be blocked)...")
    try:
        response = requests.post(
            "http://localhost:5001/recognize",
            json={"image": test_image},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Status: {response.status_code}")
            print(f"   Success: {result.get('success', False)}")
            print(f"   Message: {result.get('message', 'No message')}")
            print(f"   Already Taken: {result.get('attendance_already_taken', False)}")
        else:
            print(f"   Error: {response.status_code} - {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"   Connection Error: {e}")
    
    # Test 3: Compare endpoint with employee ID
    print("\n3. Testing compare endpoint with employee ID...")
    try:
        response = requests.post(
            "http://localhost:5001/compare",
            json={
                "image1": test_image,
                "image2": test_image,
                "employeeId": test_employee_id
            },
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"   Status: {response.status_code}")
            print(f"   Match: {result.get('match', False)}")
            print(f"   Message: {result.get('message', 'No message')}")
            print(f"   Already Taken: {result.get('attendance_already_taken', False)}")
        else:
            print(f"   Error: {response.status_code} - {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"   Connection Error: {e}")
    
    print("\n" + "=" * 50)
    print("Test completed!")
    print("\nExpected behavior:")
    print("- First attempt: Should succeed if face is recognized")
    print("- Second attempt: Should fail with 'already taken attendance' message")
    print("- Compare endpoint: Should check attendance status when employeeId provided")

if __name__ == "__main__":
    test_attendance_restriction()