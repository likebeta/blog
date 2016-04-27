---
layout: post
title: Ubuntu One命令行工具
tags: [python,linux,ubuntu,dropbox]
---

前段时间翻译了[Argparse简易教程][1]，刚学python，业余时间做了个[Ubuntu One][2]的命令行工具练下手，现在基本上可以使用了，有很多地方没有优化处理，大家可以自己修改下，源码在[ubuntuone_uploader][3]，下面说说一些用法。

<!--more-->

#### 安装

脚本依赖`oauth2`, ubuntu 下可以 `sudo apt-get install python-oauth2` 安装。

```sh
git clone https://github.com/likebeta/ubuntuone_uploader.git
cd ubuntuone_uploader
chmod +x ubuntuone_uploader.py
```

#### 帮助

使用`-h`查看命令参数：

```sh
king@ubuntu:~/ubuntuone_uploader$ ./ubuntuone_uploader.py -h
usage: ubuntuone_uploader.py [-h] [-v]
                             
                             {auth,quota,list,download,upload,delete,mkdir,move,copy,share}
                             ...

It is a command-line tool to operate ubuntu one

optional arguments:
  -h, --help            show this help message and exit
  -v, --version         show program's version number and exit

sub-commands:
  {auth,quota,list,download,upload,delete,mkdir,move,copy,share}
    auth                authorize to access your account
    quota               quota info
    list                list file of the directory
    download            download file from ubuntu one and output to screen
    upload              upload file to ubuntu one
    delete              delete file from ubuntu one
    mkdir               create directory
    move                move file
    copy                copy file
    share               share or cancel share file,list share file
```

参看子命令`upload`使用方法：

```sh
king@ubuntu:~/ubuntuone_uploader$ ./ubuntuone_uploader.py upload -h
usage: ubuntuone_uploader.py upload [-h] [-r remote_path] local_path

positional arguments:
  local_path      which to upload

optional arguments:
  -h, --help      show this help message and exit
  -r remote_path  where to save
```

详细用法说明参看[ubuntuone_uploader][4]，Ubuntu One中的文件共享后可以直链访问(类似早期注册的Dropbox用户的public文件夹)，有需要的可以使用我的推荐链接注册，我可以得到500M空间，邀请链接是[Ubuntu One][5]和[Dropbox][6]。


  [1]: http://blog.ixxoo.me/argparse.html
  [2]: https://one.ubuntu.com/referrals/referee/1698584/
  [3]: https://github.com/likebeta/ubuntuone_uploader
  [4]: https://github.com/likebeta/ubuntuone_uploader
  [5]: https://one.ubuntu.com/referrals/referee/1698584/
  [6]: http://db.tt/jacpdIw