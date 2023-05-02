import { User } from '@/api/type';
import { atom } from 'recoil';

export const userInfoAtom = atom<User | undefined>({
  key: 'fetch_user_info_atom',
  default: undefined,
});

export const userLoginDialogAtom = atom<boolean>({
  key: 'user_login_dialog_atom',
  default: false,
});
