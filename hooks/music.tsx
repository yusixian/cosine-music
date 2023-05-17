import { fetchPublicMusicList, updateMusicPlayCount, uploadFile } from '@/api';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useIsMounted } from './useIsMounted';
import { globalMusicControllerAtom } from '@/store/music/state';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Code, MusicDetail, MusicWhereOpt, PaginateProps, SortProps } from '@/api/type';
import { useQuery } from '@tanstack/react-query';

export const useUploadFile = (onSuccess: (url: string | null) => void) => {
  return useCallback(
    async (file: File) => {
      try {
        const url = await uploadFile(file);
        onSuccess(url);
      } catch {
        toast.error('Upload failed');
      }
    },
    [onSuccess],
  );
};

export const useGlobalPlayer = () => {
  const isMounted = useIsMounted();
  const setGlobalMusicController = useSetRecoilState(globalMusicControllerAtom);
  useEffect(() => {
    if (!isMounted) return;
    const APlayer = require('aplayer');
    const ap = new APlayer({
      container: document.getElementById('global-player'),
      lrcType: 1,
      audio: [],
    });
    setGlobalMusicController(ap);
    return () => {
      ap.destroy();
    };
  }, [isMounted]);
  return <div id="global-player"></div>;
};

export const useDashboardGlobalPlayer = () => {
  const isMounted = useIsMounted();
  const setGlobalMusicController = useSetRecoilState(globalMusicControllerAtom);
  useEffect(() => {
    if (!isMounted) return;
    const APlayer = require('aplayer');
    const ap = new APlayer({
      container: document.getElementById('dashboard-global-player'),
      lrcType: 1,
      audio: [],
    });
    setGlobalMusicController(ap);
    return () => {
      ap.destroy();
    };
  }, [isMounted]);
  return <div id="dashboard-global-player"></div>;
};

export const useFetchPublicMusicList = ({
  pageNum,
  pageSize,
  order,
  orderBy,
  tagNames,
}: PaginateProps & SortProps & MusicWhereOpt) => {
  return useQuery(
    ['get_public_music_list', pageNum, pageSize, order, orderBy, tagNames],
    () => fetchPublicMusicList({ pageNum, pageSize, order, orderBy, tagNames }),
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

export const usePlayMusic = (music?: MusicDetail | null) => {
  const globalController = useRecoilValue(globalMusicControllerAtom);
  const playMusic = useCallback(() => {
    if (!music) return null;
    const { id, title, foreignArtist, lyric, url, coverUrl } = music ?? {};
    const len = globalController.list?.audios?.length;
    globalController.list.add({
      name: title,
      artist: foreignArtist,
      cover: coverUrl,
      lrc: lyric,
      url: url,
    });
    globalController.list.switch(len);
    globalController.play();
    updateMusicPlayCount(id).catch((e) => console.log(e));
    toast(`${title} 已加入播放列表!`);
  }, [globalController, music]);
  return {
    playMusic,
  };
};
