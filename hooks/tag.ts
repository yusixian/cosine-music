import { fetchTagList } from '@/api';
import { Code, PaginateProps, SortProps } from '@/api/type';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useFetchTagList = ({ pageNum, pageSize, order, orderBy }: PaginateProps & SortProps) => {
  return useQuery(
    ['get_tag_list', pageNum, pageSize, order, orderBy],
    () => fetchTagList({ pageNum, pageSize, order, orderBy }),
    {
      select: (res) => {
        if (res.code === Code.success) {
          return res.result;
        }
        toast.error(res?.message || '获取标签列表失败！');
        return null;
      },
    },
  );
};
