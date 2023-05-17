import { toast } from 'react-toastify';
import request, { postFormData } from './request';
import {
  LoginParam,
  LoginResult,
  MusicAuditParam,
  MusicBatchDeleteParam,
  MusicCreateParam,
  MusicDetail,
  MusicUpdateParam,
  PaginateProps,
  PaginatedData,
  RegisterParam,
  Response,
  SortProps,
  Tag,
  User,
} from './type';

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

// 获取音乐列表
export const fetchMusicList = ({ pageNum, pageSize, order, orderBy }: PaginateProps & SortProps) =>
  request.get<any, Response<PaginatedData<MusicDetail>>>('/music/all', { params: { pageNum, pageSize, order, orderBy } });

// 获取音乐列表
export const fetchPublicMusicList = ({ pageNum, pageSize, order, orderBy }: PaginateProps & SortProps) =>
  request.get<any, Response<PaginatedData<MusicDetail>>>('/music/all/public', {
    params: { pageNum, pageSize, order, orderBy },
  });

// 获取音乐详情
export const fetchMusicDetail = (id?: string) => request.get<any, Response<MusicDetail>>(`/music/detail/${id}`);

// 更新音乐
export const updateMusic = ({ id, data }: { id?: string; data: MusicUpdateParam }) =>
  request.put<any, Response<MusicDetail>>(`/music/update/${id}`, data);

// 更新音乐 - 批量审核
export const updateAuditMusic = (data: MusicAuditParam) => request.put<any, Response<undefined>>(`/music/audit`, data);

// 更新音乐 - 播放量增长
export const updateMusicPlayCount = (id: number) => request.put<any, Response<undefined>>(`/music/play/${id}`);

// 删除音乐 - 批量
export const deleteBatchMusic = (data: MusicBatchDeleteParam) =>
  request.post<any, Response<undefined>>(`/music/batch/delete`, data);

// 获取标签列表
export const fetchTagList = ({ pageNum, pageSize = 30, order, orderBy }: PaginateProps & SortProps) =>
  request.get<any, Response<PaginatedData<Tag>>>('/tag/all', {
    params: { pageNum, pageSize, order, orderBy },
  });
