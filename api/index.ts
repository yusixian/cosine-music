import request from './request';
import { LoginParam, LoginResult, Response } from './type';

export const login = (data: LoginParam) => request.post<any, Response<LoginResult>>('/user/login', data);
