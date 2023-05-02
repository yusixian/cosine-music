import { fetchUserInfoByAuth, login, register } from '@/api';
import { Code, LoginParam, LoginResult, RegisterParam, Response, User } from '@/api/type';
import { STORAGE_KEY } from '@/constants';
import { userInfoAtom } from '@/store/user/state';
import { useMutation, useQuery } from '@tanstack/react-query';
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
      toast.error(errMsg ?? '登录失败！');
    },
  });
};

export const useRegister = () => {
  return useMutation<Response<User | null>, any, RegisterParam>({
    mutationFn: (params) => register(params),
    onSuccess: (res) => {
      const { code, result, message = '服务器内部错误！' } = res;
      if (code !== Code.success) {
        toast.error(message);
        return null;
      }
      toast.success('注册成功！请前往登录！');
      return code === Code.success ? result : undefined;
    },
    onError: (err) => {
      console.error(err.message);
      const errMsg = err?.response?.data?.message;
      toast.error(errMsg ?? '注册失败！');
    },
  });
};

export const useFetchUserInfoByAuth = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  return useQuery(['fetch_user_info_by_auth'], () => fetchUserInfoByAuth(), {
    select: async (res) => {
      const { code, result } = res;
      const preUser = await localforage.getItem(STORAGE_KEY.USER_INFO);
      if (code !== Code.success) {
        if (preUser) toast.error('登录已过期，请重新登录！');
        return null;
      }
      await localforage.setItem(STORAGE_KEY.USER_INFO, result);
      setUserInfo(result || undefined);
      return result;
    },
  });
};
