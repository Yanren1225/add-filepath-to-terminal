const vscode = require("vscode");

function buildInsertText(editor, config) {
  const uri = editor.document.uri;
  const prefix = config.get("mentionPrefix", "@") ?? "";
  const path = config.get("useAbsolutePath", false)
    ? uri.fsPath
    : vscode.workspace.asRelativePath(uri, false);

  let text = prefix + path;

  if (config.get("lineHint", true)) {
    const sel = editor.selection;
    if (!sel.isEmpty) {
      const start = sel.start.line + 1;
      let end = sel.end.line + 1;
      // 拖选到下一行行首时,用户意图不含该行
      if (sel.end.character === 0 && end > start) end -= 1;
      const hint = start === end ? `#L${start}` : `#L${start}-${end}`;
      const sep = config.get("lineHintSeparator", "separated") === "attached" ? "" : " ";
      text += sep + hint;
    }
  }

  return text;
}

function activate(context) {
  const cmd = vscode.commands.registerCommand("addFilepathToTerminal.insert", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.uri.scheme === "untitled") return;

    const config = vscode.workspace.getConfiguration("addFilepathToTerminal");
    const text = buildInsertText(editor, config);

    let term = vscode.window.activeTerminal;
    if (!term) {
      if (!config.get("createTerminalIfMissing", true)) return;
      term = vscode.window.createTerminal();
    }
    term.sendText(text, false);
    term.show();
  });
  context.subscriptions.push(cmd);
}

module.exports = { activate };
