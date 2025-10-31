# Backend Structure

```
backend/
├── app/
│   ├── config/settings.py
│   ├── models/face_model.pkl
│   ├── routes/
│   │   ├── common_routes.py
│   │   ├── detection_routes.py
│   │   └── face_routes.py
│   ├── services/firebase_service.py
│   ├── utils/image_utils.py
│   └── server_factory.py
├── credentials/
├── requirements/
├── enhanced_face_api_server.py
├── face_api_server.py
└── face_detection_server.py
```

## Usage

```bash
python enhanced_face_api_server.py  # Enhanced server
python face_api_server.py          # Basic server
python face_detection_server.py    # Detection server
```