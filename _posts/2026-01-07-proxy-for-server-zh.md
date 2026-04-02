---
layout: post
lang: zh
language: zh-CN
translation_url: /2026-01-07-proxy-for-server/
permalink: /zh/2026-01-07-proxy-for-server/
title: 为云服务器配置代理
subtitle:
tags: [Proxy, Cloud Server]
readtime: true
---

对于一台全新的国内 Linux 云服务器来说，网络问题往往是限制学习和科研效率的重要障碍。和个人电脑类似，我们也完全可以在云服务器上使用代理，从而解决网络访问问题，更顺畅地开展学习与研究。

## 两个核心步骤

1. **安装一个“代理客户端”软件**：这类软件通常轻量高效，非常适合服务器环境，它的职责就是连接远端代理服务器。
2. **配置系统环境变量**：这一步相当于打开“全局代理开关”。当客户端在后台运行，并建立了本地代理通道（例如 `127.0.0.1:1080`）之后，我们还需要告诉服务器上的其他程序，把网络请求发往这个本地地址。

## 分步指南

### 下载并安装 v2ray-core

一开始服务器本身还没有代理，因此直接在云服务器上下载 `v2ray-core` 并不方便。我们可以先在个人电脑上下载 [这个发布页中的文件](https://github.com/v2fly/v2ray-core/releases)（我这里使用的是 `v2ray-linux-64.zip`），解压后再通过 Xftp 7 把文件夹传到云服务器的 `/home` 目录。

之后，在云服务器的 `/home/v2ray-linux-64` 目录执行以下操作：

```bash
# Move the v2ray main program to the system directory.
sudo mv v2ray /usr/local/bin/

# Grant execution permission.
sudo chmod +x /usr/local/bin/v2ray

# Move the data files to the directory specified by the V2Ray official documentation.
sudo mkdir -p /usr/local/share/v2ray
sudo mv geoip.dat geosite.dat geoip-only-cn-private.dat /usr/local/share/v2ray/

# Create the configuration directory.
sudo mkdir -p /usr/local/etc/v2ray
```

### 编辑配置文件

我们可以参考官方的[入门指南](https://www.v2fly.org/guide/start.html)来编写自己的配置文件。

先创建配置文件：

```bash
sudo vim /usr/local/etc/v2ray/config.json
```

然后粘贴下面这段内容，并把对应字段替换成你自己的配置（比如服务器地址、端口和 UUID）：

```json
{
    "inbounds": [
        {
            "port": 1080, // The SOCKS proxy port; 
            // you need to configure the proxy in your browser and point it to this port.
            "listen": "127.0.0.1",
            "protocol": "socks",
            "settings": {
                "udp": true
            }
        }
    ],
    "outbounds": [
        {
            "protocol": "vmess",
            "settings": {
                "vnext": [
                    {
                        "address": "server", // Change this to your server address.
                        "port": 10086, // Change this to your server port.
                        "users": [
                            {
                                "id": "b831381d-6324-4d53-ad4f-8cda48b30811" // Change this to your UUID
                            }
                        ]
                    }
                ]
            }
        },
        {
            "protocol": "freedom",
            "tag": "direct"
        }
    ],
    "routing": {
        "domainStrategy": "IPOnDemand",
        "rules": [
            {
                "type": "field",
                "ip": [
                    "geoip:private"
                ],
                "outboundTag": "direct"
            }
        ]
    }
}
```

### 运行 v2ray

为了更方便地管理代理，我写了一个自动化脚本。

执行 `vim ~/proxy_manager.sh`，然后粘贴下面的内容：

```bash
#!/bin/bash
PROXY_LOG="/tmp/v2ray.log"
PROXY_PID_FILE="/tmp/v2ray.pid"
V2RAY_BIN="/usr/local/bin/v2ray"
V2RAY_CONFIG="/usr/local/etc/v2ray/config.json"
PROXY_ADDR="socks5://127.0.0.1:1080"
NO_PROXY="localhost,127.0.0.1,::1,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16"

start_proxy() {
    if [ -f "$PROXY_PID_FILE" ] && kill -0 "$(cat "$PROXY_PID_FILE")" 2>/dev/null; then
        echo "✓ Proxy is already running (PID: $(cat "$PROXY_PID_FILE"))"
        return 0
    fi

    if [ ! -f "$V2RAY_CONFIG" ]; then
        echo "❌ Config file not found: $V2RAY_CONFIG"
        exit 1
    fi

    nohup "$V2RAY_BIN" run -config "$V2RAY_CONFIG" > "$PROXY_LOG" 2>&1 &
    echo $! > "$PROXY_PID_FILE"
    sleep 2

    if kill -0 "$(cat "$PROXY_PID_FILE")" 2>/dev/null; then
        echo "✓ Proxy started (PID: $(cat "$PROXY_PID_FILE"))"
        # Set proxy env vars (compatible with most tools)
        export http_proxy="$PROXY_ADDR"
        export https_proxy="$PROXY_ADDR"
        export all_proxy="$PROXY_ADDR"
        export HTTP_PROXY="$PROXY_ADDR"
        export HTTPS_PROXY="$PROXY_ADDR"
        export ALL_PROXY="$PROXY_ADDR"
        export no_proxy="$NO_PROXY"
        export NO_PROXY="$NO_PROXY"
        echo "Proxy environment variables set."
    else
        echo "❌ Proxy failed to start. Check log: $PROXY_LOG"
        rm -f "$PROXY_PID_FILE"
    fi
}

stop_proxy() {
    if [ -f "$PROXY_PID_FILE" ]; then
        local pid
        pid=$(cat "$PROXY_PID_FILE")
        if kill -0 "$pid" 2>/dev/null; then
            kill "$pid"
            sleep 1
            kill -0 "$pid" 2>/dev/null && kill -9 "$pid"
        fi
        rm -f "$PROXY_PID_FILE"
        echo "✓ Proxy stopped"
    else
        echo "⚠ PID file not found. Attempting to kill by name..."
        pkill -f "v2ray run" 2>/dev/null
    fi

    # Unset all proxy variables
    unset http_proxy https_proxy all_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY no_proxy NO_PROXY
    echo "Proxy environment variables cleared"
}

status_proxy() {
    if [ -f "$PROXY_PID_FILE" ] && kill -0 "$(cat "$PROXY_PID_FILE")" 2>/dev/null; then
        echo "Proxy status: running (PID: $(cat "$PROXY_PID_FILE"))"
        echo "Recent log:"
        tail -n 5 "$PROXY_LOG" 2>/dev/null || echo "(No log available)"
    else
        echo "Proxy status: not running"
        if [ -f "$PROXY_LOG" ]; then
            echo "Log file: $PROXY_LOG"
        fi
    fi
}

case "$1" in
    start)
        start_proxy
        ;;
    stop)
        stop_proxy
        ;;
    status)
        status_proxy
        ;;
    restart)
        stop_proxy
        sleep 1
        start_proxy
        ;;
    *)
        echo "Usage: source $0 {start|stop|status|restart}" >&2
        echo "Note: Use 'source' or '.' to apply proxy settings in the current shell." >&2
        exit 1
        ;;
esac
```

最后执行 `chmod +x ~/proxy_manager.sh` 来赋予执行权限。

上面的脚本提供了 4 个常用选项：`start`、`stop`、`status` 和 `restart`。例如，我们可以运行 `source ~/proxy_manager.sh start` 来启动代理。

为了更方便，也可以在 `~/.bashrc` 中加入 `alias proxy='source ~/proxy_manager.sh'`，这样之后只需要执行 `proxy start` 即可。

### 做一些测试

最后，我们可以做一些简单测试，确认 V2Ray 是否已经正常运行：

```bash
# Check the process
ps aux | grep v2ray

# Check the port listening status and you should see 127.0.0.1:1080
```
