# Add Filepath to Terminal

把当前活动编辑器文件的路径(可带选区行号提示)插入到最近使用的集成终端输入框。为支持 `@文件` 提及语法的终端 AI CLI 设计,已验证 omp 与 opencode;Claude Code 等支持 `@` 提及的 CLI 同样适用。

## 使用

编辑器内打开任意文件,执行命令 **Add Filepath to Terminal**(建议绑定 `Ctrl+Alt+K`):

```jsonc
// VS Code keybindings.json
{
  "key": "ctrl+alt+k",
  "command": "addFilepathToTerminal.insert"
}
```

- 无选区 → 插入 `@src/lib/track.dart`
- 选中第 12 行 → 插入 `@src/lib/track.dart #L12`
- 选中第 12–34 行 → 插入 `@src/lib/track.dart #L12-34`

文本发送到最近使用的终端且**不带回车**,继续输入你的问题后发送。

## 设置

| 设置 | 默认 | 说明 |
| --- | --- | --- |
| `addFilepathToTerminal.mentionPrefix` | `"@"` | 路径前缀。`@` 适配提及类 CLI;置空则插入裸路径 |
| `addFilepathToTerminal.lineHint` | `true` | 有选区时追加 `#L起` / `#L起-止` 行号提示 |
| `addFilepathToTerminal.lineHintSeparator` | `"separated"` | `separated`:`@路径 #L12`(omp 安全:路径精确提及、行号作为正文);`attached`:`@路径#L12`(opencode 原生格式) |
| `addFilepathToTerminal.useAbsolutePath` | `false` | 使用绝对路径而非工作区相对路径 |
| `addFilepathToTerminal.createTerminalIfMissing` | `true` | 无活动终端时新建一个集成终端 |

## 兼容性说明

- **omp**:`@` 提及要求精确路径且不解析 `#L` 后缀,必须用默认的 `separated`。行号提示以正文形式随消息发送,模型结合内联全文定位。
- **opencode**:原生格式是紧贴的 `@路径#L12`,选 `attached`。
- 其他工具(普通 shell 等):插入的是纯文本,无特殊含义。

## License

MIT
