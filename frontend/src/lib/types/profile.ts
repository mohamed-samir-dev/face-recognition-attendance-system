export interface ProfilePictureProps {
  selectedImage: string | null;
  userImage: string;
  userName: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}