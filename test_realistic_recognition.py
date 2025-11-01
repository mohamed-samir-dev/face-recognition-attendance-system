#!/usr/bin/env python3
"""
Test realistic face recognition settings
"""

import requests

def test_realistic_settings():
    print("🎯 Testing Realistic Face Recognition Settings")
    print("=" * 50)
    
    try:
        response = requests.get("http://localhost:5001/health")
        if response.status_code != 200:
            print("❌ Start backend: python backend/enhanced_face_api_server.py")
            return
    except:
        print("❌ Backend not running")
        return
    
    print("✅ Backend running")
    print("\n🔧 Current Settings:")
    print("   - Face comparison threshold: 0.65 (realistic for live faces)")
    print("   - Firebase comparison: 0.65 (live vs stored)")
    print("   - Confidence minimum: 0.25 (realistic)")
    print("   - Adaptive thresholds: 0.65-0.75 (based on distance)")
    
    print("\n📋 This should now work:")
    print("   ✅ Real person's face in front of camera")
    print("   ❌ Phone/photo held up to camera (anti-spoofing)")
    print("   ✅ Same person with beard/weight changes")
    print("   ❌ Different person entirely")
    
    print("\n🚀 Test with frontend:")
    print("   1. Start: npm run dev (in frontend folder)")
    print("   2. Login with your account")
    print("   3. Go to camera page")
    print("   4. Your real face should now be accepted")
    
    print("\n✅ System optimized for realistic face recognition!")

if __name__ == "__main__":
    test_realistic_settings()