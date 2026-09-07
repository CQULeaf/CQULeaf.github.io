# 博客标题、副标题与标签核查

核查日期为 2026-09-07，范围为当前保留的 6 篇文章及其英文版本，共 12 个文件。已阅读全文并检查标签展示与分享元数据的使用位置。此前删除的 stringstream 文章不在本次范围内。

以下保留最初核查依据和修改建议。用户确认后，已于同日应用到全部 12 个文章文件，并同步标签译名与相关分享信息。核查指出的正文问题也已修正。GitHub 相关修正已核对官方文档；教程没有在真实 Windows 或云服务器环境中重新执行。

## 主要发现

- 首篇博客的 BDD 没有在标题中展开，读者容易理解成 Behavior-Driven Development；英文标题的表达也不自然。
- SSH 教程围绕 Windows 和 Git Bash 展开，现有标题、副标题未交代这一适用范围。代理教程没有突出 v2ray-core，副标题为空，容易让人误以为是代理方案综述或搭建代理服务端。
- 6 篇文章中有 5 篇使用了宽泛标签。`Ideas and Insights`、`Software Development` 和 `Trivial Tech Knowledge` 与文章未必无关，但不足以帮助读者识别核心主题。两篇 Codex 文章甚至都没有 `Codex` 标签。
- Code Review 的副标题只承诺提升效率；SSH 的副标题基本重复标题并附加安全、简便的泛化承诺。Codex Agent 的副标题堆叠组件名称，未突出这些组件在真实任务中的分工。
- Codex Skills 的标题与正文匹配，可以保留。代理文章的 `Proxy` 标签同样相关，不需要为了统一风格全部替换。

## 逐篇建议

### 1. 首篇博客

文件为 `_posts/2024-05-19-my-first-blog.md` 及 `-zh.md`。

正文记录作者开始写博客的动机，以及 Blog-Driven Development 对学习和整理想法的意义。它没有展开一套完整的方法教程。现有副标题“写下去，持续写下去”偏口号，未说明写作与学习的关系。

- 建议标签为 `[Blogging]`，替换 `[Ideas and Insights]`。不使用有歧义的 `BDD`，也不把一次开篇感想包装成“知识管理”体系。
- 中文标题建议为“我为什么开始写博客”。
- 英文标题建议为“Why I Started Blogging”。
- 中文副标题建议为“从 Blog-Driven Development 开始，用写作梳理学到的东西”。
- 英文副标题建议为“Starting with Blog-Driven Development to make sense of what I learn”。

### 2. Code Review

文件为 `_posts/2024-07-05-code-review.md` 及 `-zh.md`。

正文介绍审查目的、反馈流程、常见方式与 GitHub Pull Request 的辅助能力，没有足够的代码案例来支撑“学会做好”的完整实践承诺。`Software Development` 应收窄到文章实际讨论的活动。

- 建议标签为 `[Code Review, GitHub]`。GitHub 有独立篇幅介绍审查功能，具有实际关联。
- 中文标题建议为“Code Review 入门”。
- 英文标题建议为“An Introduction to Code Review”。
- 中文副标题建议为“审查的目标与反馈流程，以及 GitHub Pull Request 的辅助作用”。
- 英文副标题建议为“Review goals, feedback practices, and the role of GitHub pull requests”。

### 3. GitHub SSH 认证

文件为 `_posts/2024-10-10-ssh-keys-for-auth.md` 及 `-zh.md`。

正文从密钥概念讲到生成密钥、加入 ssh-agent、上传公钥与连接测试，操作环境明确是 Windows，关键步骤指定 Git Bash。现有标题的主题正确，但缺少平台范围；副标题没有补充实质信息。

- 建议标签为 `[SSH, GitHub]`，替换 `[Trivial Tech Knowledge]`。Windows 已由标题交代，不必为凑数量再加平台标签。
- 中文标题建议为“在 Windows 上配置 GitHub SSH 认证”。
- 英文标题建议为“Setting Up GitHub SSH Authentication on Windows”。
- 中文副标题建议为“在 Git Bash 中管理密钥，添加公钥并测试连接”。
- 英文副标题建议为“Manage keys in Git Bash, add your public key, and test the connection”。

### 4. 云服务器代理

文件为 `_posts/2026-01-07-proxy-for-server.md` 及 `-zh.md`。

正文讲的是在 Linux 云服务器上安装和配置 v2ray-core 客户端，再通过 Shell 脚本管理进程和当前 Shell 的代理环境变量。它不涵盖云服务部署的一般问题，也没有搭建远端代理服务端。

- 建议标签为 `[V2Ray, Proxy]`，保留 `Proxy`，用核心工具替换场景性的 `Cloud Server`。
- 中文标题建议为“在 Linux 云服务器上配置 V2Ray 代理客户端”。
- 英文标题建议为“Setting Up a V2Ray Proxy Client on a Linux Cloud Server”。
- 中文副标题建议为“安装 v2ray-core，用 Shell 脚本管理进程与代理环境变量”。
- 英文副标题建议为“Install v2ray-core and manage its process and proxy environment variables with a shell script”。

### 5. Codex Skills 推荐

文件为 `_posts/2026-04-02-codex-skills-i-recommend.md` 及 `-zh.md`。

正文按实际工作流组织推荐，并解释技能、插件和项目规则的边界。现有标题已经准确表达个人推荐，可以保留。副标题的“按工作流来选”值得保留，“不看收藏数量”可以换成具体的使用范围；2026 年 8 月的更新日期有正文依据，本次不把它刷新成 9 月。

- 建议标签为 `[Codex, Agent Skills]`，替换 `[Ideas and Insights, Software Development]`。不为文中列举的每个 skill 单独打标签。
- 中文标题保留“我目前推荐使用的 Codex Skills”。
- 英文标题保留“The Codex Skills I Recommend Right Now”。
- 中文副标题建议为“按实际工作流选择，覆盖调研、工程验证与内容处理”。
- 英文副标题建议为“Chosen for practical workflows in research, engineering verification, and content work”。

### 6. Codex Agent 工作方式

文件为 `_posts/2026-08-24-getting-the-most-out-of-codex-agent.md` 及 `-zh.md`。

正文以博客阅读时长修复为例，解释项目规则、Memory、Skills、Plugins、MCP、Hooks 和 CLI 如何分工。现有标题中的“真正用起来”和“Get the Most Out of”较泛，副标题是组件清单，缺少具体任务与结果验证这条主线。

- 建议标签为 `[Codex, Agent Workflows]`，替换 `[Ideas and Insights, Software Development]`。不把作为案例出现的 Jekyll 或阅读时长计算提升为文章分类主题。
- 中文标题建议为“我怎样组织 Codex 的上下文与工具”。
- 英文标题建议为“How I Organize Context and Tools in Codex”。
- 中文副标题建议为“用一次博客阅读时长修复，串起项目规则、任务执行与结果验证”。
- 英文副标题建议为“Connecting project guidance, task execution, and verification through a blog reading-time fix”。

## 应用建议时的配套检查

- 中英文文章保持相同 tag key；在 `_data/site-text.yml` 中补齐展示名。建议对应为 Blogging／博客写作、Code Review／代码审查、SSH／SSH、GitHub／GitHub、V2Ray／V2Ray、Proxy／代理、Codex／Codex、Agent Skills／Agent 技能、Agent Workflows／Agent 工作流。
- 首篇博客、Code Review 和两篇 Codex 文章有显式 `share-title` 与 `share-description`，应用建议时应同步检查，避免分享卡片仍承诺旧的内容范围。
- Codex Agent 正文引用了 Skills 文章的标题；本建议保留 Skills 标题，因此该引用无需修改。其他文章改名也不应改变文件名、permalink 或双语链接。
- 改动文章元数据后，构建并检查中英文文章页、标签页与分享元数据。执行阶段已完成这些检查，结果见下文。

## 另外发现的正文问题

以下为核查时发现的问题，已在执行阶段修正。

- Code Review 英文正文含旧的 GitHub 私有仓库人数和价格描述，中文版未保留这段具体数字；静态与动态分析的定义也需要另行核验。新标题不能将它包装成当前完整实操指南。
- SSH 正文推荐不设置 passphrase，密码认证停用的表述也没有清楚限定适用范围。因此副标题不应笼统承诺“更安全”。
- 代理正文把环境变量比作“全局代理开关”，容易忽略应用支持与进程继承的限制；中文版末尾的测试部分比英文短，缺少英文已有的连接测试命令。因此副标题只描述实际配置范围，不承诺全系统代理或完整验证。

## 执行结果

- 已应用上述中英文标题、副标题和标签建议，保留 Codex Skills 的原题。存在分享标题覆盖的文章已同步，相关分享摘要已调整；Skills 的摘要仍保留有正文依据的 2026 年 8 月时间信息。
- 已将标签整理为 9 个核心主题，补齐两种语言的展示名并移除不再使用的宽泛标签映射。
- Code Review 已移除过期套餐数字，纠正静态与动态分析的定义，并说明人工审查、自动检查及请求审查权限的区别。
- SSH 已限定 HTTPS Git 操作与网页登录的区别，推荐设置密钥口令，提醒不要覆盖已有密钥，并补充主机指纹核对和连接测试的退出码说明。
- 代理文章已限定环境变量的作用范围，补齐中文版测试命令，并同步两种语言的出口 IP、远程 DNS 和 HTTP 测试说明。
- 手机浏览器实测发现英文站名使导航换行并遮挡文章标题。已在 `assets/css/beautifuljekyll.css` 中添加仅适用于 575px 以下屏幕的站名宽度与排版约束，保留完整站名和原有桌面样式。
- 文件名、permalink、双语链接和现有日期均未变；此前 stringstream 文章的删除保持不变。未提交或推送。

## 验证结果与边界

- `bash scripts/build.sh` 通过，差异空白检查通过。
- 已解析 12 个文章文件和生成的 HTML，核对标题、Open Graph/Twitter 元数据、双语标签一致性、9 个主题的展示名与归档数量，并与 Git 基线对比地址和日期。
- 浏览器验证覆盖中英文文章与标签页、1280px 桌面及 390px/320px 手机宽度。窄屏英文导航不再遮挡标题，代表页面无横向溢出；实际点击 V2Ray 标签成功到达 `/tags/#V2Ray`。
- 代理文章中的 Bash 代码块全部通过 `bash -n`，中英文命令内容一致。未运行密钥生成、系统安装、代理启停或真实云服务器连接测试；本次不宣称教程已在这些环境中端到端复测。
- GitHub 核验使用官方的[认证说明](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github)、[密钥生成说明](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)、[连接测试说明](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)与 [Pull Request 审查说明](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)。
