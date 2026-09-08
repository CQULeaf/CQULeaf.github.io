# Linux Computer Use 实践稿事实底稿

核查日期为 2026-09-08。文章定位为作者与 Codex 共同完成的一次本机试用记录，不是安装发行包、通用性能评测或安全审计。

## 项目来源与实现

- [computer-use-linux](https://github.com/agent-sh/computer-use-linux) 实际安装和修改。基于 v0.5.0，提交 `d6f05716f6e6a960fd2f22ffa5a9d4ec87630a56`。
- [Cua Driver](https://github.com/trycua/cua/tree/main/libs/cua-driver) 实测 0.24.0 后未保留。按版本和机器限定评价。
- [agent-workspace-linux](https://github.com/agent-sh/agent-workspace-linux) 仅调研。没有安装、复用代码或做与 QEMU/KVM 的对照测试。
- 最终 VM 为标准 QEMU/KVM + Ubuntu 24.04.4 + XFCE/X11。自己的 `agent-desktop` Python 入口负责生命周期、SSH MCP 和 TigerVNC 预览，没有自行实现虚拟化或完整 GUI 驱动。
- 当前控制器二进制 SHA256 为 `e24236bfded5d9c92301e6ca45cf90115d3214ebd5e5eb55df178f151132b14b`，宿主与虚拟机一致。

## 原始记录与可发表的结论

以下文件名对应本次任务保留的验收产物。正文不公开 SSH 私钥、端口、完整主目录或未审查的运行配置。

| 材料 | 可以支持的结论 | 不可扩大成的结论 |
|---|---|---|
| `cua-test-findings.json` | 输入“中文输入测试”得到“中文”；一次前台输入写入另一测试窗口；响应 effect 为 unverifiable | Cua 的全部版本或全部 Linux 环境都不可用 |
| `desktop-acceptance.json` | 宿主机阶段 20 项检查通过，其中包含重复输入和真实文件保存 | 20 种独立应用均已验证 |
| 控制器最终单元日志 | 272 项单元检查通过，使用单线程测试执行 | 272 项真实桌面操作都已成功 |
| `agent-desktop-isolation.json` | 三轮文本完全一致、按钮计数增加三次、滚动改变、第二测试窗口未被输入；193 次主桌面样本中焦点与 X/Y 坐标未变 | 193 个独立试验，或已经完成长期并发工作测试 |
| `agent-desktop-file-exchange.json` | Inbox 读成功、修改被拒绝；Outbox 写入后宿主可读 | VM 无法访问任何网络或已经过完整安全审计 |
| 预览生命周期记录、冷启动 MCP doctor | 关闭预览后 VM 进程不变；正常关机后冷启动就绪、文件保留 | 能抵御所有崩溃、睡眠或长期任务中断 |
| `agent-desktop-manifest.json` | 4 GiB RAM、2 vCPU、40 GiB 稀疏磁盘；安装结束时增量约 1.2 GiB，基镜像约 253 MiB | 每次启动实际只使用固定内存或磁盘永远不增长 |

## 修正记录

1. GLIBC_2.39 预编译需求与 Ubuntu 22.04 的 glibc 2.35 不匹配，通过本地编译解决。
2. 批量 GetActions 会触发旧 GTK/ATK 崩溃，改用逐项读取。对应 [GNOME 提交 dc0dc3318171c824ba16cbb3e28780df2bda21cc](https://lists.gnome.org/archives/commits-list/2022-April/msg04656.html)。
3. X11 滚动、拖动使用已有 xdotool；非 ASCII 输入增加 12 ms 间隔。
4. 窗口 ID 与 PID 不一致时拒绝输入。
5. xwininfo 提供真实客户区坐标；VM 实测进一步暴露相对点击的独立旧路径，已修正。
6. 应用发现增加等待上限。部分文件选择框的无障碍读取仍需截图坐标作为后备路径。

## 文章与资产检查

中英文正文按相同问题顺序编写。截图来自真实 TigerVNC 预览，仅含虚拟机桌面和本次生成的说明文档，不含主机私人窗口或账号信息。

截图位于 `assets/img/linux-computer-use-isolated-desktop/preview.png`。这轮没有把本机启动脚本包装成公共可移植工具，也没有提供可直接复制的完整安装命令；文中的 agent-desktop 命令明确属于这套本地安装。
