<p align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/dlerm/shopify-themecraft/master/.github/img/logo.svg" width="250px" style="max-width: 100%">
</p>

<p align="center">
  <img alt="Static Badge ShopifyThemeCraft" src="https://img.shields.io/badge/version-1.0.0-FF4D4D">
  <img alt="Static Badge Vite" src="https://img.shields.io/badge/vite-%5E4.0.0-646cff">
  <img alt="Static Badge AplineJS" src="https://img.shields.io/badge/alpinejs-%5E3.13.3-259dbe">
  <img alt="Static Badge TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%5E3.4.0-06b6d4">
</p>

# Shopify ThemeCraft

- [Shopify ThemeCraft](#shopify-themecraft)
  - [Getting Started](#getting-started)
  - [Theme Architecture](#theme-architecture)
    - [Shopify](#shopify)
    - [AplineJS](#aplinejs)
    - [TailwindCSS](#tailwindcss)
    - [Icons](#icons)
    - [File Structure](#file-structure)
  - [Build Tools](#build-tools)
    - [Vite](#vite)
  - [Developer Tools](#developer-tools)
    - [AlpineJS Devtools](#alpinejs-devtools)

## Getting Started

In order to work on this theme codebase, you must install some prerequesite software on your machine.

**Prequisites**: [GIT](#git) | [Homebrew](https://brew.sh/) | [NVM](https://formulae.brew.sh/formula/nvm) | [Node](https://github.com/nvm-sh/nvm/blob/master/README.md#usage) | [Shopify CLI](https://shopify.dev/docs/themes/tools/cli/install#install-shopify-cli) | [VSCode](https://code.visualstudio.com/)

**Optional**: [iTerm](https://iterm2.com/)

> ##### GIT
>
> Run the following command to install git: `xcode-select --install`

Once all neccessary software is installed, you can **download the project dependencies** by running this command:

```
npm install
```

Next you must update `shopify.theme.toml` to include a **store** value. See [Shopify Docs](https://shopify.dev/docs/themes/tools/cli/environments) for more info.

Now you are ready to begin working. You can start up the development environment and tooling by running this command:

```
npm run dev
```

At this point you can begin building features by editting local files and previewing the changes on the generated development theme.

See [package.json](package.json) scripts for a list of all project commands

## Theme Architecture

### Shopify

This theme is built upon the [Shopify Online Store 2.0](https://shopify.dev/docs/themes/os20) theme structure and is meant to be built in a way that enables non-tech users to customize many aspects of the site ([see here](/shopify)).

### AplineJS

The codebase interface logic and interations are handled primarly by [AlpineJS](https://alpinejs.dev/start-here), which is a lightweight framework for composing behavior directly in your markup. Alpine components can be written directly in the shopify liquid templating code ([see here](/shopify)), or abstracted into individual component module JS files ([see here](/src/alpine/components)).

### TailwindCSS

The theme is styled using [TailwindCSS](https://tailwindcss.com/docs/theme), which is a utility-first CSS framework that can be composed to build any design, directly in your markup. See the [Tailwind configuration file](tailwind.config.cjs) for our utility defaults, extensions, and plugins. Standard CSS can also be utilized, particularly in cases when we do not have direct control over certain markup ([see here](/src/styles)). An optional animation library is available to use, see [TailwindCSS Animated](https://www.tailwindcss-animated.com/configurator.html) for usage references.

### Icons

In order to easily add and re-use SVG icons throughout the codebase, there is a [sprite plugin](https://github.com/vbenjs/vite-plugin-svg-icons) added into the build tool.

<u>Add a new icon</u>: Include the svg file in the `src/icons/` folder ([see here](/src/icons)). This svg file will be combined with the other svgs into a single symbol spritesheet with optimized icons that can be referenced anywhere.

<u>Output an icon</u>: Reference the [icon snippet](/shopify/snippets/icon.liquid), and pass it a parameter for the **name** of the icon (svg filename) and an optional CSS **class** (or classes) you would like to attach.

### File Structure

```markdown
├── shopify
│ ├── assets/
│ ├── config/
│ ├── layout/
│ ├── locales/
│ ├── sections/
│ ├── snippets/
│ ├── templates/
│ ├── .shopifyignore
├── src
│ ├── alpine
│ │ ├── components/
│ │ ├── stores/
│ ├── icons/
│ ├── styles/
│ ├── main.js
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Build Tools

### Vite

This repo utilizes [Vite](https://vitejs.dev/config/) to bundle and optimize our javascript. When the `dev` command runs, Vite will watch the project and re-compile assets anytime a local file is changed. See the [Vite configuration file](vite.config.js) for the build options, plugins, and path aliases.

## Developer Tools

These tools can expedite development of our Shopify theme code.

### AlpineJS Devtools

[AlpineJS Devtools](https://chrome.google.com/webstore/detail/alpinejs-devtools/fopaemeedckajflibkpifppcankfmbhk) is a browser extension to detect, inspect and edit AlpineJs data and components in the Chrome Developer Tools.
