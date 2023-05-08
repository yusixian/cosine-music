import { uploadImage } from '@/api';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useUploadCover = (onSuccess: (url: string | null) => void) => {
  return useCallback(
    async (file: File) => {
      try {
        const url = await uploadImage(file);
        onSuccess(url);
      } catch {
        toast.error('Upload failed');
      }
    },
    [onSuccess],
  );
};
