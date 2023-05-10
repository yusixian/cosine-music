import { toast } from 'react-toastify';
import request, { postFormData } from './request';
import { LoginParam, LoginResult, MusicCreateParam, MusicDetail, RegisterParam, Response, User } from './type';

export const login = (data: LoginParam) => request.post<any, Response<LoginResult>>('/user/login', data);
export const register = (data: RegisterParam) => request.post<any, Response<User>>('/user/register', data);

export const fetchUserInfoByAuth = () => request.get<any, Response<User>>('/user/info/byauth');

// musics

/**
 * 资源上传
 * @param file
 * @returns {Promise<string>} 图片url
 */
export const uploadFile = async (file: any, url?: string) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const res = await postFormData<Response<string>>(url ?? '/music/upload/file', formData);
    if (res.result) toast.success('Upload success');
    return res.result;
  } catch (e) {
    toast.error('Upload failed');
    return '';
  }
};

export const createMusic = (data: MusicCreateParam) => request.post<any, Response<MusicDetail>>('/music/create', data);
