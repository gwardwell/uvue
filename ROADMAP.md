# Roadmap

## Alpha 0

- [x] Basic core package
- [x] Basic server package
  - [x] Plugins system
  - [x] Can send options to plugins from config
  - [x] Base plugins middlewares (static files, gzip, cookies)
- [x] CLI plugin
  - [x] Base commands works
  - [x] Command: serve
  - [x] Command: build
  - [x] Command: start
- [x] UVue API
  - [x] Attach to Vue CLI API
  - [x] Read configs files from current project
  - [x] Start Webpack plugin & loader to overwrite project code
- [ ] Write basic tests
  - [x] Base project as a storybook
- [x] Contribute guide

## Alpha 1

**All tasks need to have a unit, intregration or e2e tests if possible !**

**Please comment you code !**

### Core

- [ ] Implements `asyncData()` on pages components
  - [ ] Handle hot reload
- [ ] Implements `redirect()`

### Core plugins

- [x] Plugins system with hooks
- [ ] Vuex and `onHttpRequest` action
- [ ] Error handler (without Vuex)
- [ ] Middlewares system
  - [ ] Handle hot reload

### UVue API

- [x] Transform main `new Vue` code to return only constructor options
- [x] Load imports from project configuration
- [ ] Transorm Vue plugins instanciation with an export function (router, store)
  - [ ] Transform main.js to use these functions
- [x] Watch uvue config change to reload app

### Server

- [ ] Handle HTTPS configuration
- [ ] Handle correctly Vue meta plugin
- [ ] Tools for CPU & RAM monitoring
- [ ] Benchmarks
- [ ] Docker start script

### CLI plugin

- [ ] Base template (configs, router, server with plugins)
- [ ] Detect Vue plugins presence and transform code
- [ ] UI: Webpack dashboard & analyzer for `ssr:serve` and `ssr:build` commands
- [ ] `generate` command
- [ ] Docker: prompt & dockerfile
- [ ] Prompts to install server plugins
- [ ] Prompts to install UVue plugins

### Webpack

- [ ] CSS management

### Killers features

- [ ] Critical CSS
  - [ ] Critters
  - [ ] Critical / Penthouse (Puppeteer based)
  - [ ] Vue components styles (@akryum repo)
- [ ] Modern build

### Common

- [ ] New logo
- [ ] Documentation with Vuepress with custom theme
- [ ] Issue template for Github
- [ ] Better contribution guide
- [ ] Example repository
- [x] Discord Chat

## Alpha 2

### Vue CLI UI

- [ ] CPU & RAM monitoring for `ssr:start` command
- [ ] Edit configuration files
- [ ] `generate` command: List generated files & size

### Vue CLI plugin support

- [ ] E2E tests with SSR mode
- [ ] TypeScript
- [ ] Vue i18n
- [ ] Apollo

### Vue CLI generator

- [ ] Prompts to install core & server plugins

### Server

- [ ] Watch server config to reload server (implements nodemon)
- [ ] Pages cache plugin
  - [ ] Memory
  - [ ] Files
  - [ ] Redis
- [ ] Server error plugin (to customize server error page)

## Core

- [ ] SPA loader plugin
- [ ] Navigation loader plugin