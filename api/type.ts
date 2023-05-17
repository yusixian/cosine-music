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

export type PaginatedData<T> = {
  list: Array<T>; // 当前记录
  total: number; // 记录总数
  totalPages: number; // 总页数
  pageNum: number; // 当前页码
  pageSize: number; // 每页记录数
};

export type PaginateProps = { pageNum?: number; pageSize?: number };

export type OrderType = 'asc' | 'desc';
export type SortProps = { order?: OrderType; orderBy?: string };

export enum UserType {
  NORMAL = 0,
  ADMIN,
}
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
  name?: string;
  /**
   * 用户状态， "0": "正常",             "1": "被封禁"
   */
  status: UserStatus;
  /**
   * 用户类型，"0": "普通用户",             "1": "管理员"
   */
  type: UserType;
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

  createdAt?: string;
  updatedAt?: string;
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

export type RegisterParam = {
  user_name: string;
  password: string;
};

export type MusicCreateParam = {
  id?: number;
  title: string; // 音乐标题
  description?: string; // 音乐描述
  coverUrl?: string; // 封面图片路径
  url: string; // 歌曲资源路径
  foreignArtist?: string; // 不在本平台的歌手名称
  artistId?: number;
  lyric?: string; // lrc格式歌词
  lyricAuthorId?: number;
  tags?: number[];
};

export enum MusicStatus {
  UNAUDITED = 0,
  NORMAL,
  BANNED,
}

export type MusicDetail = {
  id: number; // 音乐id
  title: string; // 音乐标题
  description?: string; // 音乐描述
  coverUrl?: string; // 封面图片路径
  url: string; // 歌曲资源路径
  playCount: number; // 播放量
  artist?: string; // 歌手名称
  foreignArtist?: string; // 不在本平台的歌手名称
  artistId?: number; // 歌手id
  lyric?: string; // lrc格式歌词
  lyricAuthorId?: number; // 歌词贡献者id
  status: MusicStatus; // 0:未审核 1:正常 2:封禁
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  tags: Tag[];
};

export type MusicUpdateParam = {
  title?: string;
  description?: string;
  coverUrl?: string;
  url?: string;
  foreignArtist?: string;
  artistId?: number;
  lyric?: string;
  lyricAuthorId?: number;
  status?: MusicStatus; // 0:未审核 1:正常 2:封禁
  tagNames: string[];
};

export type MusicAuditParam = {
  musicIds: number[];
  status: MusicStatus;
};

export type MusicBatchDeleteParam = {
  musicIds: number[];
  force?: boolean;
};

export type Tag = {
  id: number;
  name: string;
  icon?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  musics: MusicDetail[];
};

export type TagCreateParam = {
  name: string;
  icon?: string;
  color?: string;
};
export type TagUpdateParam = {
  name: string;
  icon?: string;
  color?: string;
};

export type TagBatchDeleteParam = {
  tagIds: number[];
};
