import { uploadFile } from '@/api';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useIsMounted } from './useIsMounted';
import { globalMusicControllerAtom } from '@/store/music/state';
import { useSetRecoilState } from 'recoil';

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
      audio: [
        {
          name: 'アイドル	',
          artist: 'YOASOBI',
          lrc: '[by:已过期i]\n[00:00.273]無敵の笑顔で荒らすメディア\n[00:03.283]知りたいその秘密ミステリアス\n[00:05.915]抜けてるとこさえ彼女のエリア\n[00:08.977]完璧で嘘つきな君は\n[00:11.672]天才的なアイドル様\n[00:14.369]\n[00:14.474]Oh my savior\n[00:15.918]Oh my saving grace\n[00:17.033]\n[00:17.215]今日何食べた？\n[00:18.651]好きな本は？\n[00:20.078]遊びに行くならどこに行くの？\n[00:23.120]何も食べてない\n[00:24.492]それは内緒\n[00:25.947]何を聞かれても\n[00:27.368]のらりくらり\n[00:28.487]\n[00:28.533]そう淡々と\n[00:29.830]だけど燦々と\n[00:31.297]見えそうで見えない秘密は蜜の味\n[00:34.328]あれもないないない\n[00:35.644]これもないないない\n[00:37.015]好きなタイプは？\n[00:38.224]相手は？\n[00:38.974]さあ答えて\n[00:40.102]\n[00:40.200]「誰かを好きになることなんて私分からなくてさ」\n[00:46.002]嘘か本当か知り得ない\n[00:48.891]そんな言葉にまた一人堕ちる\n[00:52.592]また好きにさせる\n[00:54.650]\n[00:54.689]誰もが目を奪われていく\n[00:57.492]君は完璧で究極のアイドル\n[01:00.780]金輪際現れない\n[01:03.363]一番星の生まれ変わり\n[01:07.118]その笑顔で愛してるで\n[01:09.838]誰も彼も虜にしていく\n[01:12.946]その瞳がその言葉が\n[01:15.256]嘘でもそれは完全なアイ\n[01:18.109]\n[01:18.411]はいはいあの子は特別です\n[01:21.330]我々はハナからおまけです\n[01:24.021]お星様の引き立て役Bです\n[01:27.044]全てがあの子のお陰なわけない\n[01:30.127]洒落臭い\n[01:30.789]妬み嫉妬なんてないわけがない\n[01:33.019]これはネタじゃない\n[01:34.001]からこそ許せない\n[01:35.139]完璧じゃない君じゃ許せない\n[01:37.236]自分を許せない\n[01:38.364]誰よりも強い君以外は認めない\n[01:40.938]\n[01:40.960]誰もが信じ崇めてる\n[01:43.823]まさに最強で無敵のアイドル\n[01:47.020]弱点なんて見当たらない\n[01:49.675]一番星を宿している\n[01:52.623]弱いとこなんて見せちゃダメダメ\n[01:55.745]知りたくないとこは見せずに\n[01:58.626]唯一無二じゃなくちゃイヤイヤ\n[02:01.476]それこそ本物のアイ\n[02:04.294]\n[02:04.736]得意の笑顔で沸かすメディア\n[02:08.046]隠しきるこの秘密だけは\n[02:10.880]愛してるって嘘で積むキャリア\n[02:14.387]これこそ私なりの愛だ\n[02:17.684]流れる汗も綺麗なアクア\n[02:20.738]ルビーを隠したこの瞼\n[02:23.651]歌い踊り舞う私はマリア\n[02:27.153]そう嘘はとびきりの愛だ\n[02:30.316]\n[02:31.205]誰かに愛されたことも\n[02:34.319]誰かのこと愛したこともない\n[02:37.714]そんな私の嘘がいつか本当になること\n[02:43.536]信じてる\n[02:44.712]\n[02:44.824]いつかきっと全部手に入れる\n[02:47.731]私はそう欲張りなアイドル\n[02:51.066]等身大でみんなのこと\n[02:53.557]ちゃんと愛したいから\n[02:56.485]今日も嘘をつくの\n[02:58.766]この言葉がいつか本当になる日を願って\n[03:03.137]それでもまだ\n[03:04.544]君と君にだけは言えずにいたけど\n[03:08.927]やっと言えた\n[03:10.385]これは絶対嘘じゃない\n[03:12.522]愛してる\n[03:14.510]\n[03:25.823]Oh my savior\n[03:27.145]My true savior\n[03:28.558]My saving grace',
          cover: 'http://qiniu.cosine.ren/588e6b79d9a20233976973a351092fa3.jpg',
          url: 'http://qiniu.cosine.ren/482e81b54748da963bd25e3e8d97f612.mp3',
        },
        {
          name: 'Dancing with my phone',
          artist: 'HYBS',
          cover: 'http://qiniu.cosine.ren/588e6b79d9a20233976973a351092fa3.jpg',
          url: 'https://music.163.com/song/media/outer/url?id=1969744125',
        },
      ],
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
      audio: [
        {
          name: 'アイドル	',
          artist: 'YOASOBI',
          cover: 'http://qiniu.cosine.ren/588e6b79d9a20233976973a351092fa3.jpg',
          lrc: '[by:已过期i]\n[00:00.273]無敵の笑顔で荒らすメディア\n[00:03.283]知りたいその秘密ミステリアス\n[00:05.915]抜けてるとこさえ彼女のエリア\n[00:08.977]完璧で嘘つきな君は\n[00:11.672]天才的なアイドル様\n[00:14.369]\n[00:14.474]Oh my savior\n[00:15.918]Oh my saving grace\n[00:17.033]\n[00:17.215]今日何食べた？\n[00:18.651]好きな本は？\n[00:20.078]遊びに行くならどこに行くの？\n[00:23.120]何も食べてない\n[00:24.492]それは内緒\n[00:25.947]何を聞かれても\n[00:27.368]のらりくらり\n[00:28.487]\n[00:28.533]そう淡々と\n[00:29.830]だけど燦々と\n[00:31.297]見えそうで見えない秘密は蜜の味\n[00:34.328]あれもないないない\n[00:35.644]これもないないない\n[00:37.015]好きなタイプは？\n[00:38.224]相手は？\n[00:38.974]さあ答えて\n[00:40.102]\n[00:40.200]「誰かを好きになることなんて私分からなくてさ」\n[00:46.002]嘘か本当か知り得ない\n[00:48.891]そんな言葉にまた一人堕ちる\n[00:52.592]また好きにさせる\n[00:54.650]\n[00:54.689]誰もが目を奪われていく\n[00:57.492]君は完璧で究極のアイドル\n[01:00.780]金輪際現れない\n[01:03.363]一番星の生まれ変わり\n[01:07.118]その笑顔で愛してるで\n[01:09.838]誰も彼も虜にしていく\n[01:12.946]その瞳がその言葉が\n[01:15.256]嘘でもそれは完全なアイ\n[01:18.109]\n[01:18.411]はいはいあの子は特別です\n[01:21.330]我々はハナからおまけです\n[01:24.021]お星様の引き立て役Bです\n[01:27.044]全てがあの子のお陰なわけない\n[01:30.127]洒落臭い\n[01:30.789]妬み嫉妬なんてないわけがない\n[01:33.019]これはネタじゃない\n[01:34.001]からこそ許せない\n[01:35.139]完璧じゃない君じゃ許せない\n[01:37.236]自分を許せない\n[01:38.364]誰よりも強い君以外は認めない\n[01:40.938]\n[01:40.960]誰もが信じ崇めてる\n[01:43.823]まさに最強で無敵のアイドル\n[01:47.020]弱点なんて見当たらない\n[01:49.675]一番星を宿している\n[01:52.623]弱いとこなんて見せちゃダメダメ\n[01:55.745]知りたくないとこは見せずに\n[01:58.626]唯一無二じゃなくちゃイヤイヤ\n[02:01.476]それこそ本物のアイ\n[02:04.294]\n[02:04.736]得意の笑顔で沸かすメディア\n[02:08.046]隠しきるこの秘密だけは\n[02:10.880]愛してるって嘘で積むキャリア\n[02:14.387]これこそ私なりの愛だ\n[02:17.684]流れる汗も綺麗なアクア\n[02:20.738]ルビーを隠したこの瞼\n[02:23.651]歌い踊り舞う私はマリア\n[02:27.153]そう嘘はとびきりの愛だ\n[02:30.316]\n[02:31.205]誰かに愛されたことも\n[02:34.319]誰かのこと愛したこともない\n[02:37.714]そんな私の嘘がいつか本当になること\n[02:43.536]信じてる\n[02:44.712]\n[02:44.824]いつかきっと全部手に入れる\n[02:47.731]私はそう欲張りなアイドル\n[02:51.066]等身大でみんなのこと\n[02:53.557]ちゃんと愛したいから\n[02:56.485]今日も嘘をつくの\n[02:58.766]この言葉がいつか本当になる日を願って\n[03:03.137]それでもまだ\n[03:04.544]君と君にだけは言えずにいたけど\n[03:08.927]やっと言えた\n[03:10.385]これは絶対嘘じゃない\n[03:12.522]愛してる\n[03:14.510]\n[03:25.823]Oh my savior\n[03:27.145]My true savior\n[03:28.558]My saving grace',
          url: 'http://qiniu.cosine.ren/482e81b54748da963bd25e3e8d97f612.mp3',
        },
      ],
    });
    setGlobalMusicController(ap);
    return () => {
      ap.destroy();
    };
  }, [isMounted]);
  return <div id="dashboard-global-player"></div>;
};
