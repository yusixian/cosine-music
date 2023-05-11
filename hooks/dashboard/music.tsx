import { fetchMusicList } from '@/api';
import { Code, PaginateProps, SortProps } from '@/api/type';
import { useQuery } from '@tanstack/react-query';
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
