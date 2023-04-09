# cosine-music

cosine-music 是一个使用 Next.js + TypeScript + Tailwind CSS 开发的音乐推荐网站~ 也是我的毕设~

- 在线地址：[music.cosine.ren](https://music.cosine.ren/)
- 后端使用 Express + Prisma + MySQL 开发，后端仓库为：[cosine-music-backend](https://github.com/yusixian/cosine-music-backend)

## 🍨 快速开始

```bash
yarn # 安装依赖
yarn dev # 启动开发环境

# tauri 打包：需要安装 tauri 及 rust 等，可选
yarn tauri # 启动开发环境
```

看到 `ready - started server on 0.0.0.0:3000, url: http://localhost:3000` 即可访问

## 🧰 开发说明

- 动画采用 framer-motion 进行开发
- icon 库采用 [react-icons](https://react-icons.github.io/react-icons/) ，聚合了包括 antd、css.gg 等超级多的成熟 icon，并利用 ES6 导入，允许您仅包含项目正在使用的图标
  - 聚合，且能搜索，搜索！
  - 比较好用且齐全的 icon 有[Ant Design Icons](https://react-icons.github.io/react-icons/icons?name=ai)、[Simple Icons](https://react-icons.github.io/react-icons/icons?name=si)、[css.gg](https://react-icons.github.io/react-icons/icons?name=cg)、[]()
  - 有色 icon：[Flat Color Icons](https://react-icons.github.io/react-icons/icons?name=fc)、

## 🍦 TODO

项目 TODO

- [x] 初始环境搭建
- [ ] 功能设计 ing

功能模块 TODO

- [ ] 用户模块
  - [ ] 登录/注册页面
  - [ ] 用户个人页
- [ ] 音乐模块
  - [ ] 音乐热门推荐页面
  - [ ] 随机推荐页面
  - [ ] 我的音乐页面
  - [ ] 音乐详情页面
  - [ ] 榜单
- 歌单模块
  - [ ] 添加新歌单
  - [ ] 查询歌单信息
  - [ ] 删除歌单（普通用户仅修改自己的）
  - [ ] 更新歌单信息（普通用户仅修改自己的）
- [ ] 标签模块
- [ ] 分区模块
  - [ ] 添加分区（自定义分区封面）
  - [ ] 删除分区
- [ ] 推荐模块
  - [ ] 随机推荐
  - [ ] 前 xxx 推荐
