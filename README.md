# Face Recognition Attendance System

A comprehensive attendance management system that combines facial recognition technology with a modern web interface for employee attendance tracking.

## 🏗️ Project Structure

```
face-recognition-attendance-system/
├── frontend/                    # Next.js React Application
│   ├── src/
│   │   ├── app/                # Next.js app router pages
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utilities and services
│   │   └── utils/              # Helper functions
│   ├── public/                 # Static assets
│   └── package.json
├── backend/                     # Flask API Server
│   ├── enhanced_face_api_server.py    # Main API server
│   ├── face_api_server.py              # Basic API server
│   ├── firebase_service.py             # Firebase integration
│   ├── requirements_face.txt           # Python dependencies
│   └── requirements_firebase.txt      # Firebase dependencies
├── ai/                          # Face Recognition AI
│   ├── face_recognition_model.py       # ML model
│   ├── face_model.pkl                  # Trained model
│   └── image_dataset/                  # Training images
│       ├── employee1/
│       ├── employee2/
│       └── ...
├── scripts/                     # Management Scripts
│   ├── setup_and_run.bat              # Complete setup
│   ├── start_both_servers.bat         # Start all servers
│   ├── install_dependencies.bat       # Install deps only
│   ├── train_model.bat                # Train AI model
│   ├── start_frontend_only.bat        # Frontend only
│   ├── start_backend_only.bat         # Backend only
│   └── check_servers.bat              # Health check
└── README.md
```

## 🚀 Quick Start

### Option 1: Complete Setup (Recommended)
```bash
cd scripts
setup_and_run.bat
```

### Option 2: Manual Setup
```bash
# 1. Install dependencies
cd scripts
install_dependencies.bat

# 2. Train the AI model
train_model.bat

# 3. Start both servers
start_both_servers.bat
```

### Option 3: Individual Components
```bash
# Start only frontend
start_frontend_only.bat

# Start only backend
start_backend_only.bat

# Check server status
check_servers.bat
```

## 🔧 System Requirements

- **Node.js** 18+ and npm
- **Python** 3.8+
- **Webcam** or camera device
- **Git**

## 📱 Access Points

- **Frontend Dashboard**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Camera Interface**: http://localhost:3000/camera
- **Backend API**: http://localhost:5001

## 🛠️ Development

### Frontend Development
```bash
cd frontend
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
```

### Backend Development
```bash
cd backend
python enhanced_face_api_server.py    # Start API server
```

### AI Model Training
```bash
cd ai
python face_recognition_model.py      # Train model
```

## 📁 Key Features

- **Facial Recognition**: Advanced face detection and recognition
- **Web Dashboard**: Modern Next.js-based interfaces
- **Real-time Attendance**: Live tracking and monitoring
- **Department Management**: Employee organization
- **Leave Management**: Request and approval system
- **Analytics & Reports**: Comprehensive reporting
- **Multi-language Support**: Interface localization

## 🔄 API Endpoints

### Face Recognition API (Port 5001)
- `POST /recognize` - Recognize face from image
- `POST /compare` - Compare two face images
- `POST /retrain` - Retrain the model
- `GET /health` - Health check
- `POST /clear-cache` - Clear encoding cache

## 🛡️ Security Features

- Secure facial recognition algorithms
- Employee data encryption
- Role-based access control
- Session management

## 📄 Configuration

### Environment Variables
Create `.env.local` in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
FIREBASE_CONFIG=your_firebase_config
```

### Face Recognition Setup
1. Add employee photos to `ai/image_dataset/`
2. Organize photos by employee name in separate folders
3. Run `scripts/train_model.bat`

## 🆘 Troubleshooting

1. **Servers not starting**: Run `check_servers.bat`
2. **Dependencies missing**: Run `install_dependencies.bat`
3. **Face recognition issues**: Run `train_model.bat`
4. **Port conflicts**: Check if ports 3000 and 5001 are available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `check_servers.bat`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This system requires proper camera permissions and adequate lighting for optimal face recognition performance.