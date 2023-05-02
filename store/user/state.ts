import { User } from '@/api/type';
import { atom } from 'recoil';

export const userInfoAtom = atom<User | undefined>({
  key: 'fetch_user_info_atom',
  default: undefined,
});
