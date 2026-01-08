---
layout: post
title: Setting Up a Proxy for the Cloud Server
subtitle: 
tags: [Proxy, Cloud Server]
readtime: true
---

For a brand new domestic Linux cloud server, network issues are often a significant obstacle that limits our learning and research. Similar to PCs, we can completely utilize proxies on cloud servers to resolve network issues and facilitate scientific research progress.

- [Two Core Steps](#two-core-steps)
- [Step-by-step Guidance](#step-by-step-guidance)
  - [Download and Install v2ray-core](#download-and-install-v2ray-core)
  - [Edit Configuration File](#edit-configuration-file)
  - [Run the v2ray](#run-the-v2ray)
  - [Perform Some Tests](#perform-some-tests)

## Two Core Steps

1. **Install a "proxy client" software:** This type of software is lightweight and efficient, making it suitable for server environments. Its sole purpose is to connect to a remote proxy server.
2. **Configure system environment variables:** It acts as a "global proxy switch." When the client software is running in the background and has created a local proxy channel (`127.0.0.1:1080`), we need to tell other programs on the server to send all network requests to this local address, `127.0.0.1:1080`.

## Step-by-step Guidance

### Download and Install v2ray-core

Initially, we didn't have a proxy, and it wasn't convenient to download `v2ray-core` directly onto the cloud server. We can download [this](https://github.com/v2fly/v2ray-core/releases) (I choose `v2ray-linux-64.zip` for my usage) on our PC first and then transfer the uncompressed folder to the cloud server (to the `/home` directory) using Xftp 7.

After that, we should do the following things on the cloud server in the `/home/v2ray-linux-64`.

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

### Edit Configuration File

We can follow the official [start guidance](https://www.v2fly.org/guide/start.html) to edit our own config file.

Now create our own config file

```bash
sudo vim /usr/local/etc/v2ray/config.json
```

and then paste the below codes and modify the corresponding things (like the server address, port and UUID)

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

### Run the v2ray

For convenience, we created an automated script to manage the proxy.

we run `vim ~/proxy_manager.sh` and then paste the below content.

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

Finally we run `chmod +x ~/proxy_manager.sh` to grant permissions.

The above script provides us with 4 options (start, stop, status and restart). For example, we can run `source ~/proxy_manager.sh start` to start the proxy.

For more convenience, we can create an alias. Add `alias proxy='source ~/proxy_manager.sh'` in `~/.bashrc` and then we can simply run `proxy start` to start it.

### Perform Some Tests

Finally, we can perform some tests to help us verify that V2Ray is running correctly.

```bash
# Check the process
ps aux | grep v2ray

# Check the port listening status and you should see 127.0.0.1:1080
netstat -tlnp | grep v2ray

# Test proxy connection and you should see your server address
curl --socks5 127.0.0.1:1080 -m 10 http://httpbin.org/ip

# View real-time logs
tail -f /tmp/v2ray.log

# Ping the github.com
curl -I https://github.com
```
