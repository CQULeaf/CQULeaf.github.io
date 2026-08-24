# Codex Agent 能力栈研究笔记

> 调研日期：2026-08-24（Asia/Shanghai）
> 用途：为一篇关于 `AGENTS.md`、Memory、Skills、Plugins、MCP、Hooks、CLI 如何组合使用的双语博客提供事实底稿。
> 来源边界：只使用 OpenAI 官方文档与官方 `openai/codex` 源码、Model Context Protocol 官方规范。本文中的“建议”“可理解为”“适合”均是基于这些来源的归纳，不冒充产品保证。

## 一句话结论

最大化 Codex 的 Agent 能力，关键不在于不断增加工具数量，而在于让不同层各司其职：`AGENTS.md` 固定不可丢失的项目契约，Memory 带回过去工作中可能有用的经验，Skill 教会 Agent 如何完成一类任务，Plugin 把 Skill、MCP 与可选 UI 打包分发，MCP 提供结构化的外部能力，CLI 提供可组合的本地命令面，Hooks 则在生命周期边界执行确定性检查。生产力来自这些层形成闭环，而不是来自任一层单独存在。

## 1. 第一层：`AGENTS.md` 与 Memory 负责“我是谁、这里怎样工作、过去发生过什么”

### 1.1 `AGENTS.md` 是确定性的项目契约

OpenAI 的说明是，Codex 在开始工作前读取 `AGENTS.md`，并把全局规则与项目规则拼成一条指令链。全局层位于 `~/.codex`；项目层从项目根目录一路走到当前工作目录；越靠近当前目录的文件越晚出现，因此具有更高优先级。每个目录至多读取一个文件，默认组合上限为 32 KiB。来源：[Custom instructions with AGENTS.md](https://learn.chatgpt.com/codex/agent-configuration/agents-md)。

由此可把 `AGENTS.md` 的职责归纳为：

- 必须每次生效的仓库事实，例如技术栈、构建命令、生成目录和编辑边界。
- 长期有效的工作约定，例如先构建再报告、内容更新默认双语、危险操作先确认。
- 分层覆盖的局部规则，例如根目录规定全局协作方式，某个子目录补充该模块独有的测试或产物规则。

它不适合承载大量只在特定任务中才需要的操作手册。这样做会让每次任务都支付上下文成本，也会把“项目契约”和“可选流程”混在一起。这个判断是架构建议；官方另有直接证据表明 Skills 采用渐进披露，只有被选中时才加载完整 `SKILL.md`，正适合承接长流程。[Build skills](https://learn.chatgpt.com/codex/build-skills)

需要注意的实现细节：官方文档将 `project_doc_max_bytes` 描述为组合指令链的累计上限；截至调研日，官方仓库另有一个仍开放的文档问题指出，另一处配置文档曾把它写成“每个文件”的上限，而源码行为是累计上限。因此成稿宜写“默认累计上限为 32 KiB”，不要写成每个文件各有 32 KiB。[openai/codex issue #36371](https://github.com/openai/codex/issues/36371)

### 1.2 Memory 是辅助回忆层，不是规则数据库

OpenAI 明确要求，把必须执行的团队规则放在 `AGENTS.md` 或版本库文档中，Memory 只应被视为有帮助的回忆层。ChatGPT Web 使用 ChatGPT Memory；本地 Codex 客户端使用独立的本地 Memory 存储和控制。CLI 与连接到同一 Codex host 的 IDE 扩展共享本地 Memory。[Memories](https://learn.chatgpt.com/codex/customization/memories)

本地 Memory 的当前行为：

- 默认关闭，开启后才会从符合条件的历史对话生成本地记忆。
- 生成在后台发生，不保证对话结束后立即更新；活跃或过短的会话可能被跳过。
- 当剩余额度低于配置阈值时，后台生成也可能被跳过。
- 主要文件位于 `~/.codex/memories/`，包含摘要、持久条目、近期输入与支持证据。
- 这些文件属于生成状态，可以检查，但官方不建议把手工编辑它们当作主要控制界面。
- 可以分别控制“是否把新对话用于生成 Memory”和“是否把已有 Memory 注入新会话”。
- 可配置在使用 MCP、Web Search 或 Tool Search 等外部上下文后不生成 Memory。
- 官方会对生成字段做 secret redaction，但仍明确提醒不要在 Memory 中存秘密，分享 Codex home 前应检查。

来源同上：[Memories](https://learn.chatgpt.com/codex/customization/memories)。

因此，`AGENTS.md` 和 Memory 的区别可以写得非常直接：

| 层 | 更像什么 | 可靠性与时效 | 应放什么 | 不应只放什么 |
| --- | --- | --- | --- | --- |
| `AGENTS.md` | 项目宪法、进入仓库就生效的契约 | 确定加载，有作用域与优先级 | 边界、命令、长期约定、验收方式 | 偶尔使用的长流程 |
| Memory | 工作经历、跨会话的经验召回 | 后台生成，可能延迟或跳过 | 用户偏好、历史判断、曾经踩过的坑、可复用上下文 | 安全规则、硬性流程、秘密 |

最适合文章展开的观点是：`AGENTS.md` 让 Agent 每次进入项目都“守规矩”，Memory 让它不必每次都从陌生人重新开始；前者负责确定性，后者负责连续性。

## 2. 第二层回顾：Skill 负责“这类任务应该怎样做”

OpenAI 将 Skill 定义为任务专用能力包，包含指令、资源与可选脚本，用来可靠地复现一套工作流。一个 Skill 是包含必需 `SKILL.md` 的目录，也可以带 `scripts/`、`references/`、模板或资产。`SKILL.md` 至少声明 `name` 与 `description`。[Build skills](https://learn.chatgpt.com/codex/build-skills)

关键机制是渐进披露：Codex 初始只得到 Skill 的名称、描述和路径；决定使用后才读取完整 `SKILL.md`。初始 Skill 列表只占上下文窗口的有限预算，Skill 太多时描述会被缩短，甚至可能有 Skill 从初始列表中被省略并显示警告；一旦 Skill 被选中，完整说明仍会被读取。[Build skills](https://learn.chatgpt.com/codex/build-skills)

这进一步支持上一篇文章的判断：

- `AGENTS.md` 写“在这个项目里必须怎样工作”。
- Skill 写“遇到这一类任务时，按什么流程完成并验证”。
- 项目脚本写“把哪一个确定动作执行出来”。

Skill 可以调用已有工具或随包脚本，但它自身主要是工作流与知识的载体，不天然意味着获得某个外部账号、API 或远程写权限。

## 3. 第三层：Plugin、MCP、Hooks、CLI 负责“把流程接到真实世界”

### 3.1 Plugin 与 Skill 的异同

官方对两者的分界非常明确：Skill 是可复用工作流的创作格式；Plugin 是人们发现、安装、共享与发布能力的包。一个 Plugin 可以包含一个或多个 Skills、一个 MCP server，或者两者；MCP server 还可以返回可选 UI。ChatGPT 与 Codex 共享通用插件目录，但单项能力仍可能只适用于某个产品界面，例如 Plugin 中的 Hooks 只在 Codex 运行。[Plugin architecture](https://developers.openai.com/plugins/concepts/plugins)、[Build plugins](https://learn.chatgpt.com/codex/build-plugins)

| 比较项 | Skill | Plugin |
| --- | --- | --- |
| 核心目的 | 描述一套可重复执行的工作流 | 分发一组可安装能力 |
| 最小形态 | 一个带 `SKILL.md` 的目录 | 带 manifest 的插件包，可含 Skill、MCP 或两者 |
| 是否天然连接外部服务 | 否，通常复用已有工具或脚本 | 可以，通过所含 MCP server 或连接器 |
| 是否适合个人快速迭代 | 是 | 只有要分发、组合能力或连接服务时才更合适 |
| 是否可以包含另一个 | 可被 Plugin 打包 | 可以包含多个 Skills |

官方建议先从最小形态开始：个人流程仍在迭代时先写 Skill；当需要分享、将相关 Skills 放在一起、连接外部服务或作为稳定能力分发给团队时，再做 Plugin。[Build plugins](https://learn.chatgpt.com/codex/build-plugins)

可用于文章的简短表述：Skill 教方法，Plugin 管交付；一个 Plugin 可能只有方法，也可能同时带上能真正访问外部世界的工具。

### 3.2 MCP 是标准化的工具与上下文接口

Codex 官方把 MCP 描述为“让 Codex 访问第三方工具与上下文”的协议。ChatGPT 桌面、Codex CLI 和 IDE 扩展在同一 Codex host 上共享 MCP 配置；本地客户端支持 STDIO server 与 Streamable HTTP server。远程 HTTP 可使用 bearer token 或 OAuth。Codex 还会读取 server 初始化时返回的 `instructions`，作为跨工具的服务器级指导。[Model Context Protocol in Codex](https://learn.chatgpt.com/codex/extend/mcp)

MCP 官方规范把 server 能力分为三个基础原语：

- Prompts：用户控制的可复用提示模板。
- Resources：应用控制的上下文数据。
- Tools：模型控制的可执行函数，用于查询或修改外部系统。

来源：[MCP server overview](https://modelcontextprotocol.io/specification/2024-11-05/server/index)。当前规范仍强调 capability negotiation；并非每个 server 或 client 都必须实现全部可选能力。

MCP 与 Skill 的关系不是替代，而是互补：MCP 回答“有哪些结构化能力可调用”，Skill 回答“为完成目标，应该以什么顺序、在什么条件下调用哪些能力”。Plugin 可以把这两者一起安装。OpenAI 的官方 Plugin 架构也直接建议，当模型既需要工作流指导又需要 server-backed capabilities 时，同时包含 Skills 与 MCP server。[Plugin architecture](https://developers.openai.com/plugins/concepts/plugins)

MCP 的安全边界也不应被淡化。官方 MCP 规范指出，Tools 通常由模型控制，但应用应提供清晰的工具暴露与调用指示，并为敏感操作保留人类拒绝或确认的能力。[MCP tools](https://modelcontextprotocol.io/specification/draft/server/tools)

### 3.3 Hooks 是确定性的生命周期控制面

Codex Hooks 会在对话生命周期的特定节点运行自定义脚本。当前事件包括 `SessionStart`、`UserPromptSubmit`、`PreToolUse`、`PermissionRequest`、`PostToolUse`、`PreCompact`、`PostCompact`、`SubagentStart`、`SubagentStop`、`Stop` 与 `SessionEnd`。它们可以做日志、秘密扫描、自动记忆、停止前验证和目录相关的上下文注入。[Hooks](https://learn.chatgpt.com/codex/hooks)

最重要的边界：

- Hook 是事件触发的确定性脚本，不由模型临时决定是否调用。
- `PreToolUse` 可以在受支持的本地工具执行前拒绝或重写输入，也可以增加模型可见上下文。
- `PostToolUse` 在动作已经发生后运行，因此不能撤销副作用，只能替换/阻断结果传递或给模型反馈。
- 同一事件下多个匹配的 command hooks 会并发启动，一个 Hook 不能阻止另一个已经匹配的 Hook 启动。
- 非托管 Hook 需要按当前定义的 hash 审核并信任；修改后会重新进入待审核状态。
- Hosted tools（例如 Web Search）不走本地 function-tool Hook 路径，某些专用工具路径也可以绕开默认 Hook 路径。官方因此明确把 Hooks 称为“有用的 guardrail，而非完整 enforcement boundary”。

来源：[Hooks](https://learn.chatgpt.com/codex/hooks)，具体 wire shape 可在官方源码生成 schema 与实现中核对：[pre-tool-use output schema](https://github.com/openai/codex/blob/main/codex-rs/hooks/schema/generated/pre-tool-use.command.output.schema.json)、[PreToolUse implementation](https://github.com/openai/codex/blob/main/codex-rs/hooks/src/events/pre_tool_use.rs)。

适合文章采用的判断是：需要模型判断、解释与选择的步骤交给 Skill；无论模型是否“记得”，都必须在固定节点执行的检查交给 Hook。

### 3.4 CLI 是最朴素、可组合、易调试的能力面

官方用例建议为 API、日志源、导出流程、本地存档或团队脚本制作可组合 CLI，并用 companion Skill 告诉未来的 Codex 任务先运行哪些命令、哪些写操作需要批准。适合 Agent 的 CLI 应提供分页搜索、按 ID 精确读取、可预测 JSON、文件下载、本地索引与“先草稿、后写入”等命令形态。[Create a CLI Codex can use](https://learn.chatgpt.com/use-cases/agent-friendly-clis)

Codex 自身也可以通过 `codex exec` 作为非交互 CLI 被放进脚本、CI、定时任务和 Unix 管道。它把进度写到 `stderr`，最终回答写到 `stdout`，并允许显式设置 sandbox 与 approval。默认是只读 sandbox；扩大权限时官方建议只授予流程所需的最小权限。[Non-interactive mode](https://learn.chatgpt.com/codex/non-interactive-mode)

CLI 与 MCP 的区别可这样归纳：

| 比较项 | CLI | MCP |
| --- | --- | --- |
| 调用通道 | shell / process / stdin / stdout | 标准协议中的 tools、resources、prompts |
| 能力发现 | 通常靠 `--help`、Skill 或文档 | client/server 初始化与结构化 schema |
| 组合方式 | Unix 管道、脚本、repo command | 模型工具调用、结构化参数与返回值 |
| 最适合 | 本地开发链、已有命令、快速封装、透明调试 | 跨客户端复用、远程服务、鉴权、结构化工具目录 |
| 典型风险 | PATH、环境变量、输出漂移、shell 权限 | 远程权限、鉴权、工具描述、模型自主调用 |

上表是架构归纳，不是官方产品分类。最稳妥的选型原则是：已有可靠 CLI 时先复用；需要跨界面、跨客户端的结构化发现、鉴权和远程能力时再上 MCP；无论底层是 CLI 还是 MCP，都可以由 Skill 编排。

## 4. “化学反应”来自闭环，而不是堆叠

### 4.1 双语博客维护闭环

可按以下方式组织作者当前网站的真实工作流：

1. 根 `AGENTS.md` 固定“双语文章默认成对维护、链接配对、构建命令、生成目录不可直接编辑、汇报必须说明未验证项”等项目契约。
2. Memory 带回作者偏好的语气、过去出现过的 Jekyll/Ruby 环境问题、先前验证方式，但不让这些回忆取代仓库规则。
3. `research` / `openai-docs` Skill 只在需要外部事实时加载，留下可复查的研究笔记。
4. `human-writing` Skill 负责把材料写成自然中文，英文版再按同一结构本地化，而不是逐句机械翻译。
5. 仓库 CLI 脚本执行 build、clean、链接或阅读时长检查。
6. Browser/Playwright 类 Plugin 提供真实页面预览与交互验证；Skill 规定检查顺序，工具负责实际打开页面与读取状态。
7. Hook 可以在 `Stop` 时检查“是否构建、是否仍有未跟踪研究文件、是否同步更新配对文章”，缺少证据时要求 Agent 继续，而不是依赖 Agent 自己想起。

这里的增益是从“写完文件”变成“查证—写作—构建—浏览器验收—清理—提交”的证据闭环。

### 4.2 GitHub 修复闭环

1. `AGENTS.md` 规定不改历史、不强推、先读当前差异与测试规则。
2. GitHub Plugin 可以同时包含面向 PR/CI 的 Skills 与访问 GitHub 的 MCP 工具。
3. `diagnosing-bugs` 或 `gh-fix-ci` Skill 规定先看失败检查和日志，再做最小复现与修复。
4. MCP 精确读取 PR、review thread、check 状态；本地 `gh` CLI 或 repo test command 做更细的日志与复现。
5. `PreToolUse` Hook 可阻止危险 Git 命令；`Stop` Hook 可要求回归测试或 review thread 处理证据。
6. Memory 记录这个仓库曾经出现过的环境陷阱，帮助下次缩短定位，但硬性 Git 规则仍留在 `AGENTS.md`。

这里的增益来自职责分离：Skill 维持诊断纪律，MCP/CLI 提供事实与动作，Hook 保底，Memory 加速下一次。

### 4.3 内容研究与发布闭环

1. `AGENTS.md` 写来源要求、双语要求与发布边界。
2. `research` Skill 把问题拆成证据任务并输出仓库笔记。
3. Docs/Search MCP 或官方文档工具提供结构化检索；必要时用 CLI 获取源码、版本和可重复的机器可读结果。
4. `human-writing` / `technical-writer` Skill 按不同读者把同一证据重组为博客或文档。
5. Browser Plugin 检查最终页面，Hook 在停止前执行引用、构建与工作区清洁检查。
6. Memory 让下一篇文章能找到这次调研与作者偏好，但来源链接仍写进文章或研究笔记，避免把 Memory 当作证据。

## 5. 可作为文章主线的层级模型

建议不要把文章写成七个名词的百科，可沿着一次任务从进入到完成的时间顺序来写：

1. **进入项目之前**：Memory 带回人与历史。
2. **进入项目之后**：`AGENTS.md` 给出当前仓库必须遵守的边界。
3. **识别任务之后**：Skill 加载完成这类工作的具体方法。
4. **需要接触外界时**：Plugin 把相关 Skill 与连接器作为一组能力交付；MCP 或 CLI 执行读取与动作。
5. **经过关键节点时**：Hook 做不应依赖模型记忆的检查、拦截和继续条件。
6. **任务结束后**：留下测试、页面、研究笔记、提交或其他可验证产物；一部分经验再进入 Memory，形成下一轮起点。

可以用下面这句话收束：

> Agent 真正变强，不是因为它“知道更多名词”，而是因为规则、经验、流程、工具和反馈终于接成了一条能反复运行的链。

## 6. 截至 2026-08-24 的不确定点与写作边界

1. **产品变化很快。** OpenAI 文档目前已把 Skills、Plugins、Hooks、Memory 分成明确页面，但界面名称、安装位置、支持 surface 和默认状态仍可能继续变化。文章应注明时间坐标，不把当前 UI 写成永久不变。
2. **Memory 不是即时或完整的。** 官方明确说明后台生成会延迟或跳过；不要声称“每次对话都会自动记住”。
3. **Memory 与 ChatGPT Memory 不是同一存储。** 本地 Codex 客户端使用单独的本地存储；ChatGPT Work 的设置又受账号和工作区影响。
4. **Skill 可见不等于必然被选中。** 初始 Skill 列表有上下文预算，数量过多时描述会缩短甚至省略；依赖、权限和工具可用性仍需另行验证。
5. **Plugin 跨产品共享目录，不代表能力完全同构。** 官方明确指出单项能力可以是 surface-specific；例如 Plugin 内的 Hook 只在 Codex 运行。
6. **MCP 规范与 Codex 支持范围不能混为一谈。** MCP 官方规范持续演进；Codex 文档列出的支持能力只是该 Codex host 当前实现的子集，hosted plugin tools 还可能有不同能力。
7. **Hooks 不是完整安全边界。** Hosted tools 与某些专用工具路径可能不经过本地 Hook；真正的安全还需要 sandbox、approval、最小权限与服务端鉴权。
8. **Hooks 的 `main` 分支 schema 可能领先正式发行版。** 官方 Hooks 文档明确要求，以发布文档描述当前行为，源码 schema 用来核对 wire format，不应把 `main` 的新字段直接写成所有用户已可用。
9. **CLI 没有 MCP 那样的统一发现与 schema。** “CLI 更简单”取决于它是否有稳定参数、可预测 JSON、明确 exit code、无交互模式和最小权限设计；这是工程建议，不是协议保证。
10. **作者个人示例要标明“我的当前工作流”。** 当前安装或常用的 GitHub、Browser、Ponytail、Data Analytics 等 Plugin 会持续更新，不宜把版本号或具体能力写成长期事实，除非发稿前再现场核对。

## 7. 一手来源索引

- OpenAI Codex：[Custom instructions with AGENTS.md](https://learn.chatgpt.com/codex/agent-configuration/agents-md)
- OpenAI Codex：[Memories](https://learn.chatgpt.com/codex/customization/memories)
- OpenAI Codex：[Build skills](https://learn.chatgpt.com/codex/build-skills)
- OpenAI Codex：[Build plugins](https://learn.chatgpt.com/codex/build-plugins)
- OpenAI Plugins：[Plugin architecture](https://developers.openai.com/plugins/concepts/plugins)
- OpenAI Codex：[Model Context Protocol](https://learn.chatgpt.com/codex/extend/mcp)
- OpenAI Codex：[Hooks](https://learn.chatgpt.com/codex/hooks)
- OpenAI Codex：[Non-interactive mode](https://learn.chatgpt.com/codex/non-interactive-mode)
- OpenAI use cases：[Create a CLI Codex can use](https://learn.chatgpt.com/use-cases/agent-friendly-clis)
- OpenAI Codex source：[Hook schema implementation](https://github.com/openai/codex/blob/main/codex-rs/hooks/src/schema.rs)
- OpenAI Codex source：[PreToolUse implementation](https://github.com/openai/codex/blob/main/codex-rs/hooks/src/events/pre_tool_use.rs)
- MCP specification：[Server overview](https://modelcontextprotocol.io/specification/2024-11-05/server/index)
- MCP specification：[Tools](https://modelcontextprotocol.io/specification/draft/server/tools)
