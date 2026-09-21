# 深水城日报项目说明

这是一个用于记录《深水城：龙金之劫》跑团内容的网站。

网站主入口是“深水城日报”，以现代 Editorial Website 与古典印刷视觉结合的方式呈现团内新闻、城市内容和跑团记录。

## 当前开发阶段

目前优先完成桌面端首页视觉原型。

先把首页的大版式、网格、留白、字体层级和整体视觉方向做对。

## 设计规则

所有 UI 和视觉相关工作，必须优先阅读并遵循：

`.agents/skills/deepwater-paper/SKILL.md`

不要擅自改成常见 SaaS、Dashboard、商业落地页或卡片式网站风格。

如果已有页面已经建立视觉语言，应优先延续现有设计，而不是重新设计。

## 开发原则

- 优先保持代码简单、清晰、可维护。
- 不要为了小功能引入大型依赖。
- 修改页面时尽量只修改与当前任务相关的部分。
- 不要无理由重构整个项目。
- 不要擅自增加用户未要求的功能。
- 桌面端优先，但不要破坏基本移动端可读性。
- 图片、新闻内容和文案以后应方便替换，不要全部硬编码进复杂组件。

## 内容结构

当前首页主要包含：

- 顶部导航
- 报头
- 主新闻
- 次级新闻
- 城市栏目
- 城市布告

后续可能扩展：

- 深水城档案室
- 人物档案
- 地点档案
- 线索整理
- 巨魔裁缝铺

## Efficiency

- Keep changes scoped to the current task.
- Do not inspect or modify unrelated files unless necessary.
- Prefer targeted edits over broad refactors or rewrites.