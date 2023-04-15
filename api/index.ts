import request from './request';
import { LoginParam, LoginResult, RegisterParam, Response, User } from './type';

export const login = (data: LoginParam) => request.post<any, Response<LoginResult>>('/user/login', data);
export const register = (data: RegisterParam) => request.post<any, Response<User>>('/user/register', data);

export const fetchUserInfoByAuth = () => request.get<any, Response<User>>('/user/info/byauth');
