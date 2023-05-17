import { deleteBatchTag, fetchTagById } from '@/api';
import { Code, Tag, TagBatchDeleteParam, Response } from '@/api/type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useFetchTagById = (id?: string, onSuccess?: (data: Tag | null) => void) => {
  return useQuery(['get_tag_by_id', id], () => fetchTagById(id), {
    select: (res) => {
      if (res.code === Code.success) {
        return res.result;
      }
      toast.error(res?.message || '获取标签信息失败！请刷新页面');
      return null;
    },
    onSuccess: (data) => {
      console.log(data);
      onSuccess?.(data);
    },
  });
};

export const useMutationBatchDeleteTag = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation<Response<undefined>, any, TagBatchDeleteParam>({
    mutationFn: (data) => deleteBatchTag(data),
    onSuccess: ({ code, message }) => {
      if (code === Code.success) {
        toast.success(message ?? '删除标签成功！');
        onSuccess?.();
        return;
      }
      toast.error(message ?? '删除标签失败！');
    },
  });
};
