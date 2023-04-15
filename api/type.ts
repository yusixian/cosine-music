// 枚举状态码 根据自己需要定义
export enum Code {
  success = 2000,
  denied,
  error,
}
export type Response<T> = {
  /**
   * 状态码，"2000": "success 请求成功""2001": "denied 无权限""2002": "error 系统异常"
   */
  code: Code;
  /**
   * 说明信息
   */
  message?: string;
  /**
   * 返回数据
   */
  result: T | null;
};

export enum UserStatus {
  NORMAL = 0,
  BANNED,
}
export enum UserSex {
  UNKNOWN = 0,
  FEMALE,
  MALE,
}
export interface User {
  /**
   * 用户名，唯一
   */
  user_name: string;
	/**
	 * 用户昵称
	 */
	name?: string
  /**
   * 用户状态， "0": "正常",             "1": "被封禁"
   */
  status: UserStatus;
  /**
   * 用户类型，"0": "普通用户",             "1": "管理员"
   */
  type: number;
  /**
   * 用户头像
   */
  avatar?: null | string;
  /**
   * 所处城市
   */
  city?: null | string;
  /**
   * 邮箱
   */
  email?: null | string;
  /**
   * 性别，"0": "未知"
   * "1": "女"
   * "2": "男"
   */
  sex?: UserSex;
}

export type LoginParam = {
  user_name: string;
  password: string;
};

export type LoginResult = {
  sessionid: number;
  token: string;
  user: User;
};
