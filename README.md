# Angular Generate Command Extension

The **Angular Generate Command** extension for Visual Studio Code simplifies the process of generating Angular artifacts (components, directives, services, etc.) by providing a user-friendly interface to create Angular CLI commands. Instead of running commands directly, the extension copies the generated command to your clipboard, allowing you to paste and execute it in your preferred terminal.

## Features

- Generate Angular artifacts including:
  - Components
  - Directives
  - Services
  - Interceptors
  - Modules
  - Pipes
  - Guards
  - Environments
- Interactive input for artifact names and options (e.g., standalone, skip tests, inline styles).
- Copies the full Angular CLI command to the clipboard.
- Displays a confirmation message when the command is copied.
- Supports context menu integration for folder-based generation in the VS Code Explorer.

## Prerequisites

- **Visual Studio Code** (version 1.60.0 or higher recommended).
- **Angular CLI** installed globally or locally in your project (`npm install -g @angular/cli` or as a dev dependency).
- An Angular project with a `src/app` folder structure for accurate path detection.

## Installation

1. **Install the Extension**:
   - Open VS Code.
   - Go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS).
   - Search for **Angular Generate Command**.
   - Click **Install**.

2. Alternatively, if packaging manually:
   - Download the `.vsix` file from the release page (if available).
   - In VS Code, go to Extensions > `...` > **Install from VSIX** and select the file.

## Usage

### Generating an Artifact

1. **Open Your Angular Project**:
   - Ensure your workspace contains an Angular project with a `src/app` folder.

2. **Access the Command**:
   - **Option 1**: Right-click on a folder in the VS Code Explorer (preferably under `src/app`) and select one of the `Angular Generate Command: <Artifact>` commands (e.g., `Angular Generate Command: Component`).
   - **Option 2**: Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS), type `Angular Generate Command`, and select the desired artifact (e.g., `Angular Generate Command: Component`).

3. **Provide Input**:
   - **Name**: Enter the name of the artifact (e.g., `my-component` for a component) in the input box.
   - **Options** (if applicable): Select options from the multi-select list (e.g., `--standalone`, `--skip-tests`). Use arrow keys to navigate and `Space` to select multiple options.

4. **Copy and Paste**:
   - The extension generates an Angular CLI command (e.g., `ng generate component my-component --standalone`).
   - The command is copied to your clipboard.
   - A notification appears (e.g., `Command for Component "my-component" copied to clipboard!`).

5. **Execute the Command**:
   - Open your terminal (within VS Code or externally).
   - Paste the command (`Ctrl+V` or `Cmd+V`).
   - Press `Enter` to run the Angular CLI command and generate the artifact.

### Example

To generate a standalone component named `my-component`:
1. Right-click on `src/app` in the Explorer.
2. Select `Angular Generate Command: Component`.
3. Enter `my-component` in the input box.
4. Select `Standalone` and `Skip Test` from the options list.
5. The command `ng generate component my-component --standalone --skip-tests` is copied.
6. Paste and run it in your terminal to create the component.

## Available Commands

The extension provides the following commands, accessible via the Command Palette or Explorer context menu:

| Command                       | Description                                      | Options Available                                                                 |
|-------------------------------|--------------------------------------------------|-----------------------------------------------------------------------------------|
| `Angular Generate Command: Component` | Generates an Angular component.                  | Standalone, Not Standalone, Change Detection, Display Block, Skip Test, Flat, Inline Template, Inline Style, Skip Import, View Encapsulation |
| `Angular Generate Command: Directive` | Generates an Angular directive.                  | Standalone, Not Standalone, Skip Test, Flat, Skip Import                           |
| `Angular Generate Command: Service`   | Generates an Angular service.                    | Skip Test                                                                         |
| `Angular Generate Command: Interceptor` | Generates an Angular interceptor.              | Functional, Skip Test                                                             |
| `Angular Generate Command: Module`    | Generates an Angular module.                     | Flat, Add Router                                                                  |
| `Angular Generate Command: Pipe`      | Generates an Angular pipe.                       | Standalone, Not Standalone, Skip Test, Skip Import                                |
| `Angular Generate Command: Guard`     | Generates an Angular guard.                      | Functional, Skip Test                                                             |
| `Angular Generate Command: Environments` | Generates Angular environment files.          | None                                                                              |

### Option Descriptions

- **Standalone**: Generates a standalone artifact (v14+).
- **Not Standalone**: Generates a non-standalone artifact (default in v17+ for standalone).
- **Skip Test**: Omits test files.
- **Flat**: Places files in the same directory without a subfolder.
- **Inline Template/Style**: Embeds template/styles in the component file.
- **Skip Import**: Prevents auto-import into the nearest module.
- **Change Detection: OnPush**: Sets component change detection to OnPush.
- **Display Block**: Sets component display to block in styles.
- **View Encapsulation**: Sets encapsulation to None or ShadowDom.
- **Functional**: Generates a functional guard or interceptor.
- **Add Router**: Includes a routing module.

## Configuration

No additional configuration is required. The extension automatically detects the workspace path based on the folder you right-click or the project root. Ensure your Angular project is structured correctly (e.g., contains `src/app`).

## Troubleshooting

- **Command Not Copied**: Ensure you have permissions to access the clipboard. Try restarting VS Code.
- **Invalid Path**: Make sure you’re triggering the command from a folder within an Angular project. The extension splits paths at `src/app` to determine the relative path.
- **Angular CLI Errors**: After pasting the command, check that Angular CLI is installed (`ng --version`) and your project is set up correctly.
- **No Options Shown**: Some artifacts (e.g., environments) have no options by design.

## Contributing

Feedback and contributions are welcome! To report issues or suggest features:
1. Open an issue on the [GitHub repository](#) (replace with your repo link).
2. For code contributions, fork the repository, make changes, and submit a pull request.

## Author

This extension is written by Nguyen Van Huu

## Acknowledgments

Built to support the Angular and VS Code communities.