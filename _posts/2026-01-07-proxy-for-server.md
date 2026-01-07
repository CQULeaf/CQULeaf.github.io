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
  - [Set Environment Variables](#set-environment-variables)

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

We run v2ray directly as a background process. (Systemd is also ok and more convenient)

```bash
# Stop any v2ray processes that may be currently running.
pkill v2ray

# Use `nohup` to start v2ray in the background and output logs to a file.
nohup /usr/local/bin/v2ray run -config /usr/local/etc/v2ray/config.json > /tmp/v2ray.log 2>&1 &

# Check if it started successfully.
sleep 2
ps aux | grep v2ray | grep -v grep
```

### Perform Some Tests

We can also perform some tests to help us verify that V2Ray is running correctly.

```bash
# Test the configuration file syntax and if success it displays "Configuration OK"
sudo /usr/local/bin/v2ray test -config /usr/local/etc/v2ray/config.json

# Check the process
ps aux | grep v2ray

# Check the port listening status and you should see 127.0.0.1:1080
netstat -tlnp | grep v2ray

# Test proxy connection and you should see your server address
curl --socks5 127.0.0.1:1080 -m 10 http://httpbin.org/ip

# View real-time logs
tail -f /tmp/v2ray.log
```

### Set Environment Variables

V2Ray is now running. Set the environment variables to point to the local proxy.

```bash
# Edit bash configuration
vim ~/.bashrc

# Add the following lines to the end of the file:
export http_proxy="socks5://127.0.0.1:1080"
export https_proxy="socks5://127.0.0.1:1080"
export all_proxy="socks5://127.0.0.1:1080"
export no_proxy="localhost,127.0.0.1,10.0.0.0/8,192.168.0.0/16"

# Save and exit to apply the configuration changes.
source ~/.bashrc
```

