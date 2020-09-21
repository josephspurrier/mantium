# mantium

**This is a WIP while testing how JSX works without React. Don't use this in production - it's designed as a learning tool to understand the internals of front-end frameworks.**

It does support JSX via .jsx or .tsx file extensions. This project is designed to show how modern, front-end development tools integrate. It takes a while to piece together your own tools for linting, building, testing, etc. so you can reference this to see how to get all these different tools set up and integrated.

This project supports these features:

- [x] Render function for JSX
- [x] JSX using TypeScript (.tsx)
- [ ] JSX using Babel (.jsx)
- [x] JSX fragments
- [x] JSX declarations/interfaces for: IntrinsicElements, Element, ElementChildrenAttribute
- [x] JSX children access via attributes (typing available using interfaces)
- [x] JSX attribute access (using interfaces)
- [x] JSX functional components
- [ ] JSX class components
- [x] JSX as children in JSX components
- [ ] JSX keys for loops
- [x] JSX attributes for strings
- [ ] JSX attributes for booleans (like 'required') - this needs testing
- [ ] Sort out class vs className
- [ ] Test forceUpdate for event handlers
- [x] JSX event handling for 'on' functions
- [x] Virtual DOM
- [x] Reactivity
- [x] Redrawing on click events
- [x] Local variable state using 'useState'
- [x] Router
- [x] 404 page
- [x] Hash URL prefix handling
- [x] Router and virtual DOM handling
- [x] Virtual DOM handling of fragments at top level
- [ ] Add Link to handle changing pages for URLs that don't include the hash
- [ ] Support history handling on page URLs
- [ ] Support regex on routes for authentication
- [x] Request Handling for JSON
- [ ] Request handling for non-JSON
- [ ] Handle redraws on requests to ensure loop don't occur
- [ ] Add useEffect to handle when to update (onLoad, on variable change, etc)
- [x] Add redraw after request (doesn't alway work, especially with nested requested, but if useing useState then it will)
- [x] Add redraw on setter from useState
- [x] Easy way to view output of generated code (`npm run build-clean`)
- [ ] Lifecycle methods
- [ ] Performance testing
- [ ] Unit tests
- [ ] Clean up the types
- [ ] Launch on NPM to see how the process works

This project uses these tools:

- [Bulma](https://bulma.io/)
- [ESLint](https://eslint.org/)
- [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)
- [npm](https://www.npmjs.com/)
- [Sass](https://sass-lang.com/libsass)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
- [webpack](https://webpack.js.org/)
- [webpack DevServer](https://webpack.js.org/configuration/dev-server/)

## Quick Start

Below are the instructions to test the application quickly.

```bash
# Clone the repo.
git clone git@github.com:josephspurrier/mantium.git

# Change to the directory.
cd mantium

# Install the dependencies.
npm install

# Start the web server. Your browser will open to: http://locahost:8080.
npm start

# Lint the js/jsx/ts/tsx code using ESLint/Prettier.
npm run lint

# Fix the js/jsx/ts/tsx code using ESLint/Prettier.
npm run lint-fix

# Lint the css/scss code using stylelint.
npm run stylelint

# Fix the css/scss code using stylelint.
npm run stylelint-fix
```

## Dev Components

### Babel

Babel will transform your code using the [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) and will also convert your JSX through webpack (webpack.config.js and .babelrc).

### Bulma

Bulma is a front-end framework that provides you with styled components and CSS helpers out of the box. This template also uses [Font Awesome](https://fontawesome.com/).

### SASS

[SASS](https://sass-lang.com/documentation/syntax) with the extension (.scss) is supported for both globally scoped (affects entire application) and locally scoped (namespaced for just the web component). The plugin, [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/), is used with [css-loader](https://webpack.js.org/loaders/css-loader/) and [sass-loader](https://webpack.js.org/loaders/sass-loader/). The css-loader is configured to use [CSS Modules](https://github.com/css-modules/css-modules).

Any `.scss` files will be treated as global and applied to the entire application like standard CSS. You can reference it like this from a web component: `import '@/file.scss';`. It's recommended to use the `:local(.className)` designation on top level classes and then nest all the other CSS so your styles are locally scoped to your web component. You can then reference it like this from a web component: `import style from '@/layout/side-menu/side-menu.scss';`. Any class names wrapped in `:local()` will be converted to this format: `[name]__[local]__[hash:base64:5]`. You must reference the `:local` class names in your TypeScript files using an import or the styles won't apply properly. It's recommended to use camelCase for the local class names because dashes make it a little more difficult to reference. You can read more about global vs local scope [here](https://webpack.js.org/loaders/css-loader/#scope). If you have any trouble using it, you can easily view the CSS output to see if names are namespaced or not.

To allow referencing CSS class names in TypeScript, there is a declaration.d.ts file that allows any class name to be used. It's in the `include` section of tsconfig.json file.

### ESLint, stylelint, Prettier

After testing a few combinations of tools, we decided to use the ESLint and stylelint VSCode extensions without using the Prettier VSCode extension. The interesting part is ESLint will still use Prettier to do auto-formatting which is why it's included in the package.json file. ESLint and Prettier will work together to autoformat your code on save and suggest where you can improve your code (.estlintignore, .estlintrc.json, .prettierrc). You will get a notification in VSCode when you first open the project asking if you want to allow the ESLint application to run from the node_modules folder - you should allow it so it can run properly. Stylelint is used for linting and auto-formatting any CSS and SCSS files.

### TypeScript

Many JavaScript projects now use TypeScript because it reduces code that you would have to write in JavaScript to validate the data you're passing in is of a certain type. The tsconfig.json and jsconfig.json tell your IDE and build tools which options you have set on your project. This project uses [ts-loader](https://github.com/TypeStrong/ts-loader) for webpack.

### Visual Studio Code

If you open this project in Visual Studio Code, you will get:

- extension recommendations for ESLint (.vscode/extensions.json)
- settings configured for ESLint linting and prettier auto-corrections (.vscode/settings.json)
- TypeScript code snippets for Mithril and arrow functions (.vscode/typescript.code-snippets)

These code snippets are included - just start typing and they should be in the auto-complete menu. A few of them support tabbing through the various fields:

- **arrow** - Creates an arrow function.
- **onclick** - Creates an onclick with an arrow function.
- **log** - Creates a console.log() statement.

### webpack

When you run `npm start`, webpack will provide linting via ESLint and live reloading (webpack.config.js). To compile faster, this template uses the [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) that runs the TypeScript type checker on a separate process. ESLint is also run on a separate process. You'll notice the `transpileOnly: true` option is set on the `ts-loader` in the webpack.config.js and the `ForkTsCheckerWebpackPlugin` is a plugin that handles the type checking and ESLint.