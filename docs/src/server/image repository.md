# PicGo + GitHub + jsDelivr 打造加速图床

媒体文件存储在本地很不方便，一方面占用资源庞大，另一方面容易找不到。可以使用 `PicGo` + `Github` + `jsDelivr` 来实现 **方便、访问速度快** 的 **免费** 图床

## 新建 Github 仓库

新建一个名为 `PicGo` 的公共仓库（**注意，一定要是 Public 仓库！否则会导致图片无法访问**）

![PixPin_2025-07-14_16-19-11.png](https://cdn.jsdelivr.net/gh/Leonardo-tao/PicGo/img/PixPin_2025-07-14_16-19-11.png)


点击右上角头像，点击 `Settings` 进入设置界面，点击 `Developer settings`，在 `Personal access tokens` 下找到 `Tokens`，点击右上角 `Generate new token`，配置如下

![PixPin_2025-07-14_16-02-37.png](https://cdn.jsdelivr.net/gh/Leonardo-tao/PicGo/img/PixPin_2025-07-14_16-02-37.png)


生成后的 Token 只会出现一次，保存好后复制

![PixPin_2025-07-14_16-06-23.png](https://cdn.jsdelivr.net/gh/Leonardo-tao/PicGo/img/PixPin_2025-07-14_16-06-23.png)

## 下载＆配置 PicGo

进入 [PicGo](https://github.com/Molunerfinn/PicGo) 的 `Github` 仓库界面，进入 [Releases](https://github.com/Molunerfinn/PicGo/releases) 界面，下载对应系统的稳定版本（带有 `Latest` 标识）

安装好后，进入 `Github` 图床配置：

仓库名：[Github 用户名]/[仓库名称]
分支：默认为 main
Token：刚才复制的 Token
存储路径：若想要上传到仓库中某个文件夹，则为文件夹路径，例如 `img/`。不填则直接传到根目录
自定义域名：`https://cdn.jsdelivr.net/gh/[Github 用户名]/[仓库名]`（使用 `jsDelivr` 加速可快速访问 Github 下的图片，否则访问很慢）

![PixPin_2025-07-14_16-23-22.png](https://cdn.jsdelivr.net/gh/Leonardo-tao/PicGo/img/PixPin_2025-07-14_16-23-22.png)

 