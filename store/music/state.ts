import { atom } from 'recoil';

export const globalMusicControllerAtom = atom<any>({
  key: 'global_music_controller_atom',
  dangerouslyAllowMutability: true,
  default: null,
});

export const dashboardGlobalMusicControllerAtom = atom<any>({
  key: 'dashboard_global_music_controller_atom',
  dangerouslyAllowMutability: true,
  default: null,
});
