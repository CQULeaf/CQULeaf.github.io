---
layout: post
lang: zh
language: zh-CN
translation_url: /2024-10-10-ssh-keys-for-auth/
permalink: /zh/2024-10-10-ssh-keys-for-auth/
title: 在 Windows 上配置 GitHub SSH 认证
subtitle: 在 Git Bash 中管理密钥，添加公钥并测试连接
tags: [SSH, GitHub]
readtime: true
last-updated: 2024-10-13
---

GitHub 不接受用账号密码认证 HTTPS Git 操作。HTTPS 可以使用 token 或凭据管理器，**SSH 则使用密钥对**。这些方式与登录 GitHub 网站是不同的场景。本文在 Windows 的 Git Bash 中完成 SSH 密钥生成、添加公钥和连接测试。认证方式的区别可以参考 GitHub 的[认证指南](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github)。

## 什么是 SSH Keys？

SSH keys 是一对密码学密钥，用于在连接远程服务器或 GitHub 这类服务时验证身份。它由两部分组成：

- **公钥（public key）**：可以安全地分享给服务端；
- **私钥（private key）**：必须保密，只能自己持有。

当你连接到服务端时，本地私钥会生成签名，而服务端会使用公钥来验证你的身份。

## Windows 上配置 SSH Keys 的步骤

### 第一步：生成 SSH Key Pair

打开 Git Bash，执行下面的命令。

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

系统会询问密钥的保存位置。确认不会覆盖已有密钥后，才使用默认路径；否则另选文件名，并在后续命令中使用对应路径。建议设置足够强的 passphrase 来保护私钥，再交给 ssh-agent 管理，减少同一会话中反复输入口令的次数。具体说明可参考 GitHub 的[密钥生成指南](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)。

![save-ssh-key](../assets/img/save-ssh-key.png)

### 第二步：启动 SSH Agent，并把 SSH Key 加入 Agent

如果你希望 SSH key 能**自动被管理和使用**，就需要启动 SSH agent：

继续在同一个 **Git Bash** 会话中执行。下面使用的是 Bash 语法，PowerShell 与 Windows OpenSSH agent 需要采用另一套配置方式。

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 第三步：把 SSH Public Key 添加到 GitHub

1. 显示公钥后复制输出内容。不要复制或上传私钥。

   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. 打开 [GitHub SSH settings](https://github.com/settings/keys)，点击 **New SSH key**，选择 **Authentication Key**，粘贴公钥。

### 第四步：测试 SSH 连接

在同一个 Git Bash 会话中执行下面的命令，测试连接。

```bash
ssh -T git@github.com
```

首次连接时，先将主机指纹与 [GitHub 公布的指纹](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)核对，确认一致后再接受。成功时会提示已经通过认证，同时说明 GitHub 不提供 shell 访问；官方的[连接测试说明](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)指出，即使认证成功，这条命令也会以状态码 1 退出。

![test-ssh-connection](../assets/img/test-ssh-connection.png)
