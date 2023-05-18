import { fetchBannerList } from '@/api';
import { Code, PaginateProps, SortProps } from '@/api/type';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useFetchBannerList = ({ pageNum, pageSize, order, orderBy }: PaginateProps & SortProps) => {
  return useQuery(
    ['get_banner_list', pageNum, pageSize, order, orderBy],
    () => fetchBannerList({ pageNum, pageSize, order, orderBy }),
    {
      select: (res) => {
        if (res.code === Code.success) {
          return res.result;
        }
        toast.error(res?.message || '获取轮播图列表失败！');
        return null;
      },
    },
  );
};
