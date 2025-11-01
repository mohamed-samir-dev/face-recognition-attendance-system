from flask import request, jsonify
import os
import base64
import tempfile
import face_recognition
from ..utils.image_utils import get_face_encoding_from_base64, create_cache_key
from ..services.firebase_service import FirebaseService

def init_face_routes(app, face_model, encoding_cache):
    firebase_service = FirebaseService()
    
    @app.route('/recognize', methods=['POST'])
    def recognize_face():
        """Recognize face with mandatory user validation for attendance restriction"""
        try:
            data = request.get_json()
            
            if 'image' not in data:
                return jsonify({'error': 'No image provided'}), 400
            
            # SECURITY: expected_user is now mandatory for attendance system
            expected_user = data.get('expected_user')
            if not expected_user:
                return jsonify({
                    'error': 'Expected user must be specified for attendance validation'
                }), 400
            
            # Decode base64 image
            image_data = data['image'].split(',')[1]  # Remove data:image/jpeg;base64, prefix
            image_bytes = base64.b64decode(image_data)
            
            # Save to temporary file
            with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_file:
                temp_file.write(image_bytes)
                temp_path = temp_file.name
            
            try:
                # Recognize face with mandatory expected user validation
                name, message = face_model.recognize_face(temp_path, expected_user)
                
                if name:
                    return jsonify({
                        'success': True,
                        'name': name,
                        'message': message,
                        'validated_user': expected_user
                    })
                else:
                    return jsonify({
                        'success': False,
                        'message': message,
                        'expected_user': expected_user
                    })
            
            finally:
                # Clean up temporary file
                os.unlink(temp_path)
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/compare', methods=['POST', 'OPTIONS'])
    def compare_faces():
        if request.method == 'OPTIONS':
            return '', 200
        """Compare captured face with specific user's stored photo - used for attendance restriction"""
        try:
            data = request.get_json()
            
            if 'image1' not in data or 'image2' not in data:
                return jsonify({'error': 'Two images required'}), 400
            
            # Create cache keys for stored images (image2 is usually the stored user photo)
            image2_hash = create_cache_key(data['image2'])
            
            # Get encodings with caching for stored image
            face1_encoding = get_face_encoding_from_base64(data['image1'])
            face2_encoding = get_face_encoding_from_base64(data['image2'], cache_key=image2_hash, encoding_cache=encoding_cache)
            
            if face1_encoding is None or face2_encoding is None:
                return jsonify({
                    'match': False,
                    'message': 'No face detected in one or both images'
                })
            
            # Calculate distance (lower = more similar)
            distance = face_recognition.face_distance([face2_encoding], face1_encoding)[0]
            
            # STRICT threshold to prevent cross-employee fraud
            threshold = 0.45
            match = distance < threshold
            
            return jsonify({
                'match': bool(match),
                'distance': float(distance),
                'threshold': float(threshold),
                'message': 'Faces match' if match else 'Faces do not match'
            })
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/retrain', methods=['POST'])
    def retrain_model():
        try:
            face_model.train_model()
            return jsonify({'success': True, 'message': 'Model retrained successfully'})
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @app.route('/clear-cache', methods=['POST'])
    def clear_cache():
        """Clear the encoding cache to free memory"""
        cache_size = len(encoding_cache)
        encoding_cache.clear()
        return jsonify({'message': f'Cache cleared. Removed {cache_size} entries'})