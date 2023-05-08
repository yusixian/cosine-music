import { toast } from 'react-toastify';

export const verifyCover = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    toast.error('You can only upload JPG/PNG file!');
    return false;
  }
  const isLt10M = file.size / 1024 / 1024 < 1;
  if (!isLt10M) {
    toast.error('Image must smaller than 1MB!');
    return false;
  }
  const hasCh = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/.test(file.name);
  if (hasCh) {
    toast.error('Upload file name must not contain Chinese!');
    return false;
  }
  return true;
};
