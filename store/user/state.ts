import { User } from '@/api/type';
import { atom } from 'recoil';

export const userInfoAtom = atom<User | undefined>({
  key: 'user_info_atom',
  default: undefined,
});
