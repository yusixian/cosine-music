import { fetchMusicList, updateAuditMusic, updateMusic } from '@/api';
import { Code, MusicDetail, MusicUpdateParam, PaginateProps, SortProps, Response, MusicAuditParam } from '@/api/type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useFetchMusicList = ({ pageNum, pageSize, order, orderBy }: PaginateProps & SortProps) => {
  return useQuery(
    ['get_music_list', pageNum, pageSize, order, orderBy],
    () => fetchMusicList({ pageNum, pageSize, order, orderBy }),
    {
      select: (res) => {
        console.log('fetch music', res);
        if (res.code === Code.success) {
          return res.result;
        }
        toast.error(res?.message || '获取音乐列表失败！');
        return null;
      },
    },
  );
};

export const useMutationUpdateMusic = () => {
  return useMutation<Response<MusicDetail>, any, { id: number; data: MusicUpdateParam }>({
    mutationFn: (param) => updateMusic(param),
    onSuccess: ({ result, code, message }) => {
      if (code === Code.success) {
        toast.success(message ?? '更新音乐成功！');
        console.log({ code, result, message });
      }
    },
  });
};

export const useMutationAuditMusic = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation<Response<undefined>, any, MusicAuditParam>({
    mutationFn: (data) => updateAuditMusic(data),
    onSuccess: ({ code, message }) => {
      if (code === Code.success) {
        toast.success(message ?? '更新音乐审核状态成功！');
        onSuccess?.();
        return;
      }
      toast.error(message ?? '更新音乐审核状态失败！');
    },
  });
};
