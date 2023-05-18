import { deleteBatchBanner, fetchBannerById } from '@/api';
import { Code, Banner, BannerBatchDeleteParam, Response } from '@/api/type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useFetchBannerById = (id?: string, onSuccess?: (data: Banner | null) => void) => {
  return useQuery(['get_banner_by_id', id], () => fetchBannerById(id), {
    select: (res) => {
      if (res.code === Code.success) {
        return res.result;
      }
      toast.error(res?.message || '获取轮播图信息失败！请刷新页面');
      return null;
    },
    onSuccess: (data) => {
      console.log(data);
      onSuccess?.(data);
    },
  });
};

export const useMutationBatchDeleteBanner = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation<Response<undefined>, any, BannerBatchDeleteParam>({
    mutationFn: (data) => deleteBatchBanner(data),
    onSuccess: ({ code, message }) => {
      if (code === Code.success) {
        toast.success(message ?? '删除轮播图成功！');
        onSuccess?.();
        return;
      }
      toast.error(message ?? '删除轮播图失败！');
    },
  });
};
