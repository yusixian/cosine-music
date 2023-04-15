import { login } from '@/api';
import { Code, LoginParam, LoginResult, Response } from '@/api/type';
import { STORAGE_KEY } from '@/constants';
import { userInfoAtom } from '@/store/user/state';
import { useMutation } from '@tanstack/react-query';
import localforage from 'localforage';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

export const useLogin = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  return useMutation<Response<LoginResult | null>, any, LoginParam>({
    mutationFn: (params) => login(params),
    onSuccess: async (res) => {
      const { code, result, message = '服务器内部错误！' } = res;
      if (code !== Code.success) {
        toast.error(message);
        return null;
      }
      await localforage.setItem(STORAGE_KEY.USER_TOKEN, result?.token);
      toast.success(message ?? '登录成功！');
      setUserInfo(result?.user);
      return code === Code.success ? result : undefined;
    },
    onError: (err) => {
      console.error(err.message);
      const errMsg = err?.response?.data?.message;
      toast.error(errMsg);
    },
  });
};
