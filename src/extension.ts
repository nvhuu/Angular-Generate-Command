import * as vscode from "vscode";

interface GenerateOption {
  label: string;
  detail: string;
  description: string;
}

export function activate(context: vscode.ExtensionContext): void {
  console.log(
    'Congratulations, your extension "angular-generate-command" is now active!'
  );

  const commandConfigs: {
    [key: string]: {
      command: string;
      handler: (event: { path: string }) => void | Promise<void>;
    };
  } = {
    component: {
      command: "angular-generate-command.component",
      handler: (event) => generate(event, componentOptions, "component"),
    },
    directive: {
      command: "angular-generate-command.directive",
      handler: (event) => generate(event, directiveOptions, "directive"),
    },
    service: {
      command: "angular-generate-command.service",
      handler: (event) => generate(event, serviceOptions, "service"),
    },
    interceptor: {
      command: "angular-generate-command.interceptor",
      handler: (event) => generate(event, interceptorOptions, "interceptor"),
    },
    module: {
      command: "angular-generate-command.module",
      handler: (event) => generate(event, moduleOptions, "module"),
    },
    pipe: {
      command: "angular-generate-command.pipe",
      handler: (event) => generate(event, pipeOptions, "pipe"),
    },
    guard: {
      command: "angular-generate-command.guard",
      handler: (event) => generate(event, guardOptions, "guard"),
    },
    environments: {
        command: 'angular-generate.environments',
        handler: generateEnvironments,
      },
  };

  Object.values(commandConfigs).forEach(({ command, handler }) => {
    const disposable = vscode.commands.registerCommand(command, handler);
    context.subscriptions.push(disposable);
  });
}

export function deactivate(): void {}

async function generate(
  event: { path: string },
  options: GenerateOption[],
  entity: string
): Promise<void> {
  const capitalizeEntity = entity.charAt(0).toUpperCase() + entity.slice(1);
  const name = await vscode.window.showInputBox({
    title: `${capitalizeEntity} Name`,
    placeHolder: `Enter the ${entity} name`,
    validateInput: (value) => (value.trim() ? null : "Name cannot be empty"),
  });

  if (!name) {
    vscode.window.showWarningMessage(
      `${capitalizeEntity} generation cancelled.`
    );
    return;
  }

  const [workspacePath, relativePath] = _getPath(event.path);
  const optionList = await vscode.window.showQuickPick(options, {
    canPickMany: true,
    placeHolder: `Select options for the ${entity}`,
  });

  if (!optionList) {
    vscode.window.showWarningMessage(
      `No options selected for ${capitalizeEntity}.`
    );
    return;
  }

  const optionsJoined = optionList.map((opt) => opt.description).join(" ");
  const command = `ng generate ${entity} ${relativePath}/${name} ${optionsJoined}`;
  await vscode.env.clipboard.writeText(command);
  vscode.window.showInformationMessage(
    `Command for ${capitalizeEntity} "${name}" copied to clipboard!`
  );
}

function generateEnvironments(event: { path: string }): void {
    const [workspacePath] = _getPath(event.path);
    const command = `ng generate environments`;
    vscode.env.clipboard.writeText(command);
    vscode.window.showInformationMessage('Command for environments copied to clipboard!');
  }

function _getPath(fullpath: string): [string, string] {
  const cleanedPath = fullpath.replace(/\/[a-zA-Z]:/, (match) =>
    match.slice(1)
  );
  const [workspacePath, relativePath = ""] = cleanedPath.split("src/app");
  return [workspacePath, relativePath];
}


const componentOptions: GenerateOption[] = [
  {
    label: "Standalone",
    detail:
      "Generate a standalone component without module imports. (Available from v14+)",
    description: "--standalone",
  },
  {
    label: "Not Standalone",
    detail:
      "Generate a non-standalone component; in v17+ standalone components are default",
    description: "--standalone=false",
  },
  {
    label: "Change Detection: OnPush",
    detail: "Generate a component with change detection set to OnPush.",
    description: "--change-detection OnPush",
  },
  {
    label: "Display Block",
    detail: "Generate a component with display set to block in its styles.",
    description: "--display-block",
  },
  {
    label: "Skip Test",
    detail: "Generate a component without accompanying test files.",
    description: "--skip-tests",
  },
  {
    label: "Flat",
    detail:
      "Generate the component files in the same directory, without creating a separate folder.",
    description: "--flat",
  },
  {
    label: "Inline Template",
    detail:
      "Generate the component with the template defined inline in the component file.",
    description: "--inline-template",
  },
  {
    label: "Inline Style",
    detail:
      "Generate the component with the styles defined inline in the component file.",
    description: "--inline-style",
  },
  {
    label: "Skip Import",
    detail:
      "Generate the component without importing it into the nearest module file.",
    description: "--skip-import",
  },
  {
    label: "View Encapsulation: None",
    detail: "Generate the component with view encapsulation set to None.",
    description: "--view-encapsulation None",
  },
  {
    label: "View Encapsulation: ShadowDom",
    detail: "Generate the component with view encapsulation set to ShadowDom.",
    description: "--view-encapsulation ShadowDom",
  },
];

const serviceOptions: GenerateOption[] = [
  {
    label: "Skip Test",
    detail: "Generate a service without accompanying test files.",
    description: "--skip-tests",
  },
];

const moduleOptions: GenerateOption[] = [
  {
    label: "Flat",
    detail:
      "Generate the module file in the same directory, without creating a separate folder.",
    description: "--flat",
  },
  {
    label: "Add Router",
    detail: "Generate a routing module in the same directory.",
    description: "--routing",
  },
];

const guardOptions: GenerateOption[] = [
  {
    label: "Functional",
    detail: "Generate a guard as a function.",
    description: "--functional",
  },
  {
    label: "Skip Test",
    detail: "Generate a guard without accompanying test files.",
    description: "--skip-tests",
  },
];

const pipeOptions: GenerateOption[] = [
  {
    label: "Standalone",
    detail:
      "Generate a standalone pipe without module imports. (Available from v14+)",
    description: "--standalone",
  },
  {
    label: "Not Standalone",
    detail:
      "Generate a non-standalone pipe; in v17+ standalone pipes are default",
    description: "--standalone=false",
  },
  {
    label: "Skip Test",
    detail: "Generate a pipe without accompanying test files.",
    description: "--skip-tests",
  },
  {
    label: "Skip Import",
    detail:
      "Generate the pipe without importing it into the nearest module file.",
    description: "--skip-import",
  },
];

const directiveOptions: GenerateOption[] = [
  {
    label: "Standalone",
    detail:
      "Generate a standalone directive without module imports. (Available from v14+)",
    description: "--standalone",
  },
  {
    label: "Not Standalone",
    detail:
      "Generate a non-standalone directive; in v17+ standalone directives are default",
    description: "--standalone=false",
  },
  {
    label: "Skip Test",
    detail: "Generate a directive without accompanying test files.",
    description: "--skip-tests",
  },
  {
    label: "Flat",
    detail:
      "Generate the directive files in the same directory, without creating a separate folder.",
    description: "--flat",
  },
  {
    label: "Skip Import",
    detail:
      "Generate the directive without importing it into the nearest module file.",
    description: "--skip-import",
  },
];

const interceptorOptions: GenerateOption[] = [
  {
    label: "Functional",
    detail: "Generate an interceptor as a function.",
    description: "--functional",
  },
  {
    label: "Skip Test",
    detail: "Generate an interceptor without accompanying test files.",
    description: "--skip-tests",
  },
];

const environmentOptions: GenerateOption[] = [];
