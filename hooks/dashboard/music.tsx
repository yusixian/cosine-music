import { deleteBatchMusic, fetchMusicDetail, fetchMusicList, updateAuditMusic } from '@/api';
import { Code, MusicAuditParam, MusicBatchDeleteParam, MusicDetail, PaginateProps, Response, SortProps } from '@/api/type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useFetchMusicList = ({ pageNum, pageSize, order, orderBy }: PaginateProps & SortProps) => {
  return useQuery(
    ['get_music_list', pageNum, pageSize, order, orderBy],
    () => fetchMusicList({ pageNum, pageSize, order, orderBy }),
    {
      select: (res) => {
        if (res.code === Code.success) {
          return res.result;
        }
        toast.error(res?.message || '获取音乐列表失败！');
        return null;
      },
    },
  );
};

export const useFetchMusicById = (id?: string, onSuccess?: (data: MusicDetail | null) => void) => {
  return useQuery(['get_music_by_id', id], () => fetchMusicDetail(id), {
    select: (res) => {
      if (res.code === Code.success) {
        return res.result;
      }
      toast.error(res?.message || '获取音乐详情失败！');
      return null;
    },
    onSuccess: (data) => {
      console.log(data);
      onSuccess?.(data);
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

export const useMutationBatchDeleteMusic = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation<Response<undefined>, any, MusicBatchDeleteParam>({
    mutationFn: (data) => deleteBatchMusic(data),
    onSuccess: ({ code, message }) => {
      if (code === Code.success) {
        toast.success(message ?? '删除音乐成功！');
        onSuccess?.();
        return;
      }
      toast.error(message ?? '删除音乐失败！');
    },
  });
};
