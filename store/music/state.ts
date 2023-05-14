import { atom } from 'recoil';

export const globalMusicControllerAtom = atom<any>({
  key: 'global_music_controller_atom',
  dangerouslyAllowMutability: true,
  default: null,
});

export const globalConfigAtom = atom<{
  playerShow: boolean;
  playerPause: boolean;
}>({
  key: 'global_config_atom',
  dangerouslyAllowMutability: true,
  default: {
    playerShow: true,
    playerPause: true,
  },
});
