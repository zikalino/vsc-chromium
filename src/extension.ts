import * as vscode from 'vscode';
import type { ExtensionContext, Uri } from 'vscode';

import * as helpers from '@zim.kalinowski/vscode-helper-toolkit';
import puppeteer from 'puppeteer-core';

//import vm_sizes from './vm_sizes.json' assert {type: 'json'};

export function activate (context: ExtensionContext) {

  let disposable = vscode.commands.registerCommand(
    'vscode-docker-runner.displayExplorer',
    () => {
      displayChromiumExplorer(context);
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate () {}

var view: helpers.GenericWebView|null = null;

async function displayChromiumExplorer(extensionContext : vscode.ExtensionContext) {

  // use Puppeteer to launch browser endpoint
  const browser = await puppeteer.launch({ executablePath: 'c:\\dev\\work\\chromium\\src\\out\\Release\\opera.exe'});
  const endpoint = browser.wsEndpoint();

  // set helpers global context so we don't have to do it again
  helpers.SetContext(vscode, extensionContext);

  // do not display more than one Cloud Explorer panel
  if (view !== null && !view.destroyed) {
    view.focus();
    return;
  }

  view = helpers.CreateExplorerView("Chromium Explorer", "Chromium Explorer", "media/icon.png");
}
