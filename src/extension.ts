import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  myStatusBarItem.text = `$(zap) Restart Svelte Server`;
  myStatusBarItem.tooltip = "Click to restart the Svelte language server";
  myStatusBarItem.command = "svelte-server-restart.restartSvelteServer";
  myStatusBarItem.show();

  context.subscriptions.push(myStatusBarItem);

  // Register the command
  const restartSvelteServerCommand = vscode.commands.registerCommand(
    "svelte-server-restart.restartSvelteServer",
    () => {
      restartSvelteServer();
    }
  );

  context.subscriptions.push(restartSvelteServerCommand);
}

export function deactivate() {}

function restartSvelteServer() {
  const svelteExtension = vscode.extensions.getExtension(
    "svelte.svelte-vscode"
  );
  if (!svelteExtension) {
    vscode.window.showErrorMessage("Svelte extension not found.");
    return;
  }

  if (!svelteExtension.isActive) {
    svelteExtension.activate().then(() => {
      vscode.commands.executeCommand("svelte.restartLanguageServer");
    });
  } else {
    vscode.commands.executeCommand("svelte.restartLanguageServer");
  }

  vscode.window.showInformationMessage("Svelte language server restarted.");
}
