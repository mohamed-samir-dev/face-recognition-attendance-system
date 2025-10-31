export interface LoginFormData {
  email: string;
  password: string;
}

export interface FacialRecognitionButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export interface LoginContainerProps {
  onLogin: (formData: LoginFormData) => Promise<void>;
  onFacialRecognition: () => void;
  onClearSession: () => void;
  loading: boolean;
  faceLoading: boolean;
  error: string;
}