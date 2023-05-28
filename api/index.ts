import { toast } from 'react-toastify';
import request, { postFormData } from './request';
import {
  Banner,
  BannerBatchDeleteParam,
  BannerCreateParam,
  BannerUpdateParam,
  LoginParam,
  LoginResult,
  MusicAuditParam,
  MusicBatchDeleteParam,
  MusicCreateParam,
  MusicDetail,
  MusicUpdateParam,
  MusicWhereOpt,
  PaginateProps,
  PaginatedData,
  RegisterParam,
  Response,
  SortProps,
  Tag,
  TagBatchDeleteParam,
  TagCreateParam,
  TagUpdateParam,
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
export const fetchPublicMusicList = ({
  pageNum,
  pageSize,
  order,
  orderBy,
  tagNames,
}: PaginateProps & SortProps & MusicWhereOpt) =>
  request.get<any, Response<PaginatedData<MusicDetail>>>('/music/all/public', {
    params: { pageNum, pageSize, order, orderBy, tagNames },
  });

// 获取猜你喜欢音乐列表
export const fetchRecommendMusicList = ({ pageNum, pageSize, order, orderBy }: PaginateProps & SortProps & MusicWhereOpt) =>
  request.get<any, Response<MusicDetail[]>>('/music/recommend/list', {
    params: { pageNum, pageSize, order, orderBy },
  });

// 获取音乐详情
export const fetchMusicDetail = (id?: string) => request.get<any, Response<MusicDetail>>(`/music/detail/public/${id}`);

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

export const createTag = (data: TagCreateParam) => request.post<any, Response<Tag>>('/tag/create', data);

// 获取标签详情
export const fetchTagById = (id?: string) => request.get<any, Response<Tag>>(`/tag/detail/${id}`);

// 更新标签
export const updateTag = ({ id, data }: { id?: string; data: TagUpdateParam }) =>
  request.put<any, Response<Tag>>(`/tag/update/${id}`, data);

// 删除标签 - 批量
export const deleteBatchTag = (data: TagBatchDeleteParam) => request.post<any, Response<undefined>>(`/tag/batch/delete`, data);

// 轮播图
// 获取轮播图列表
export const fetchBannerList = ({ pageNum, pageSize = 30, order, orderBy }: PaginateProps & SortProps) =>
  request.get<any, Response<PaginatedData<Banner>>>('/banner/all', {
    params: { pageNum, pageSize, order, orderBy },
  });

export const createBanner = (data: BannerCreateParam) => request.post<any, Response<Banner>>('/banner/create', data);

// 获取轮播图详情
export const fetchBannerById = (id?: string) => request.get<any, Response<Banner>>(`/banner/detail/${id}`);

// 更新轮播图
export const updateBanner = ({ id, data }: { id?: string; data: BannerUpdateParam }) =>
  request.put<any, Response<Banner>>(`/banner/update/${id}`, data);

// 删除轮播图 - 批量
export const deleteBatchBanner = (data: BannerBatchDeleteParam) =>
  request.post<any, Response<undefined>>(`/banner/batch/delete`, data);
