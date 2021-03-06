window["AlpheiosEmbed"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./embedded.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../package.json":
/*!***********************!*\
  !*** ../package.json ***!
  \***********************/
/*! exports provided: name, version, description, main, directories, scripts, repository, author, license, bugs, homepage, devDependencies, engines, jest, eslintConfig, eslintIgnore, dependencies, config, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"alpheios-embedded\",\"version\":\"3.3.0\",\"description\":\"Alpheios Embedded Library\",\"main\":\"dist/alpheios-embedded.js\",\"directories\":{\"doc\":\"doc\"},\"scripts\":{\"set-node-build-deps\":\"npx install-peerdeps alpheios-node-build --dev --only-peers\",\"test\":\"jest\",\"build\":\"npm run build-dev && npm run build-prod\",\"build-prod\":\"npm run lint && node --experimental-modules ./node_modules/alpheios-node-build/dist/build.mjs -m all -M production -p app -c config.mjs\",\"build-dev\":\"npm run lint && node --experimental-modules ./node_modules/alpheios-node-build/dist/build.mjs -m all -M development -p app -c config.mjs\",\"auth0-env-update\":\"node --experimental-modules ./node_modules/alpheios-node-build/dist/files.mjs replace --s=../protected-config/auth0/prod --t=dist/auth0 --f=env-embed.js\",\"auth0-env-dev-update\":\"node --experimental-modules ./node_modules/alpheios-node-build/dist/files.mjs replace --s=../protected-config/auth0/dev --t=dist/auth0 --f=env-embed.js\",\"lint\":\"eslint --fix src/**/*.js\",\"update-dependencies\":\"node --experimental-modules ./node_modules/alpheios-node-build/dist/files.mjs replace --s=./node_modules/alpheios-core/packages/components/dist/ --t=dist/lib && node --experimental-modules ./node_modules/alpheios-node-build/dist/files.mjs replace --s=./node_modules/alpheios-core/packages/components/dist/style --t=dist/style\",\"build-experimental\":\"node --experimental-modules ./node_modules/alpheios-node-build/dist/build.mjs -m webpack -M development -p app -c config.mjs\",\"dev\":\"npm run build-experimental && http-server -c-1 -p 8888 & onchange src -- npm run build-experimental\",\"conventional-commit\":\"npx git-cz\",\"version-set-major\":\"npm version major\",\"version-set-minor\":\"npm version minor\",\"version-set-patch\":\"npm version patch\",\"tagged-commit\":\"node --experimental-modules --experimental-json-modules ./tagged-commit.mjs\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/alpheios-project/wordsvc.git\"},\"author\":\"The Alpheios Project, Ltd.\",\"license\":\"ISC\",\"bugs\":{\"url\":\"https://github.com/alpheios-project/wordsvc/issues\"},\"homepage\":\"https://github.com/alpheios-project/wordsvc#readme\",\"devDependencies\":{\"@babel/core\":\"^7.10.3\",\"@babel/plugin-proposal-object-rest-spread\":\"^7.10.3\",\"@babel/plugin-transform-modules-commonjs\":\"^7.10.1\",\"@babel/plugin-transform-runtime\":\"^7.10.3\",\"@babel/preset-env\":\"^7.10.3\",\"@babel/register\":\"^7.10.3\",\"@babel/runtime\":\"^7.10.3\",\"alpheios-core\":\"github:alpheios-project/alpheios-core\",\"alpheios-node-build\":\"github:alpheios-project/node-build#semver:^3.5.0\",\"archiver\":\"^4.0.1\",\"babel-eslint\":\"^10.1.0\",\"babel-loader\":\"^8.1.0\",\"babel-plugin-dynamic-import-node\":\"^2.3.3\",\"babel-plugin-module-resolver\":\"^4.0.0\",\"chalk\":\"^4.1.0\",\"command-line-args\":\"^5.1.1\",\"copy-webpack-plugin\":\"^6.0.2\",\"coveralls\":\"^3.0.11\",\"css-loader\":\"^3.6.0\",\"cz-conventional-changelog\":\"^3.1.0\",\"eslint\":\"^7.3.1\",\"eslint-config-standard\":\"^14.1.1\",\"eslint-plugin-import\":\"^2.21.2\",\"eslint-plugin-node\":\"^11.1.0\",\"eslint-plugin-promise\":\"^4.2.1\",\"eslint-plugin-standard\":\"^4.0.1\",\"eslint-plugin-vue\":\"^6.2.2\",\"fibers\":\"^5.0.0\",\"fs-extra\":\"^9.0.1\",\"git-branch\":\"^2.0.1\",\"http-server\":\"^0.12.3\",\"imagemin\":\"^7.0.1\",\"imagemin-jpegtran\":\"^7.0.0\",\"imagemin-optipng\":\"^8.0.0\",\"imagemin-svgo\":\"^8.0.0\",\"inspectpack\":\"^4.5.2\",\"interactjs\":\"^1.9.19\",\"jest\":\"^26.1.0\",\"jest-fetch-mock\":\"^3.0.3\",\"mini-css-extract-plugin\":\"^0.9.0\",\"onchange\":\"^7.0.2\",\"optimize-css-assets-webpack-plugin\":\"^5.0.3\",\"path\":\"^0.12.7\",\"postcss-import\":\"^12.0.1\",\"postcss-loader\":\"^3.0.0\",\"postcss-safe-important\":\"^1.2.0\",\"postcss-scss\":\"^2.1.1\",\"raw-loader\":\"^4.0.0\",\"sass\":\"^1.26.9\",\"sass-loader\":\"^8.0.2\",\"shx\":\"^0.3.2\",\"source-map-loader\":\"^1.0.0\",\"style-loader\":\"^1.1.3\",\"url-loader\":\"^4.1.0\",\"vue-loader\":\"^15.9.3\",\"vue-style-loader\":\"^4.1.2\",\"vue-svg-loader\":\"^0.16.0\",\"vue-template-compiler\":\"^2.6.11\",\"vue-template-loader\":\"^1.1.0\",\"webpack\":\"^4.43.0\",\"webpack-bundle-analyzer\":\"^3.8.0\",\"webpack-cleanup-plugin\":\"^0.5.1\",\"webpack-dev-server\":\"^3.11.0\",\"webpack-merge\":\"^4.2.2\"},\"engines\":{\"node\":\">= 14.1.0\",\"npm\":\">= 6.13.0\"},\"jest\":{\"verbose\":true,\"transform\":{\"^.+\\\\.jsx?$\":\"babel-jest\"},\"transformIgnorePatterns\":[\"node_modules/alpheios-core/packages/components/\"]},\"eslintConfig\":{\"env\":{\"browser\":true,\"node\":true},\"parser\":\"babel-eslint\",\"parserOptions\":{\"sourceType\":\"module\",\"ecmaVersion\":2019,\"allowImportExportEverywhere\":true}},\"eslintIgnore\":[\"**/dist\"],\"dependencies\":{},\"config\":{\"commitizen\":{\"path\":\"./node_modules/cz-conventional-changelog\"}}}");

/***/ }),

/***/ "./embedded.js":
/*!*********************!*\
  !*** ./embedded.js ***!
  \*********************/
/*! exports provided: importDependencies, Embedded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importDependencies", function() { return importDependencies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Embedded", function() { return Embedded; });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./state.js");
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../package.json */ "../package.json");
var _package_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../package.json */ "../package.json", 1);
/* eslint-env jest */
/* global Event, BUILD_BRANCH, BUILD_NUMBER, BUILD_NAME */


// A variable that will store an instance of the imported components module
let components

/**
 * Imports dynamic dependencies that are required for the embed-lib.
 * @param {object} options - A configuration object of the import function.
 * @param {'production' | 'development' | 'cdn' | 'custom'} options.mode - What type of libraries shall be imported.
 *         'production' - will load minified version of libraries from a `dist/lib` local directory;
 *         'development' - will load non-optimized libraries with source maps from a `dist/lib` local directory;
 *         'cdn' - will load the latest version of minified libraries from JSDelivr (this is a default value);
 *         'custom' - allows to specify your own paths for loading the libraries. The paths shall be specified
 *                    as values of keys of a `libs` object.
 * @param {object} options.libs - An object whose properties specify paths from where libraries to be loaded.
 *        {string} options.libs.components - A path to a components library. Value for a default `production` mode
 *                 is `./lib/alpheios-components.min.js`.
 * @return {Promise} - A promise that is resolved when all dependencies are loaded
 * or rejected when there was an error during an import.
 */
function importDependencies (options) {
  let libs = {}
  switch (options.mode) {
    case 'production':
      libs.components = './lib/alpheios-components.min.js'
      break
    case 'development':
      libs.components = './lib/alpheios-components.js'
      break
    case 'custom':
      libs = options.libs
      break
    case 'cdn':
    default:
      libs.components = 'https://cdn.jsdelivr.net/npm/alpheios-components@latest/dist/alpheios-components.min.js'
      break
  }
  return new Promise((resolve, reject) => {
    let imports = []
    let componentsImport = import(
      /* webpackIgnore: true */
      libs.components
    ).then(() => {
      components = window.AlpheiosComponents
    })
    imports.push(componentsImport)

    Promise.all(imports).then(() => {
      resolve (Embedded)
    }).catch((e) => {
      reject(e)
    })
  })
}

/**
 * Encapsulation of Alpheios functionality which can be embedded in a webpage
 */
class Embedded {
  /**
   * @constructor
   * @param {Object} arguments - object with the following properties:
   *     clientId: a string identifying the embedding client or site. Required.
   *     authEnv: authentication environment object.(Optional)
   *     documentObject: the parent document. Default: window.document
   *     enabledSelector: a CSS Selector string identifying the page elements for which Alpheios should be activated
   *                      Default: ".alpheios-enabled"
   *     disabledSelector: a CSS Selector string identifying the page elements for which Alpheios should be deactivated
   *                       Default: [data-alpheios-ignore="all"]
   *     enabledClass: a CSS class to apply to alpheios/staten enabled elements
   *                   Default: ""
   *     disabledClass: a CSS class to apply to alpheios disabled elements
   *                    Default: ""
   *     mobileTriggerEvent: DOM Event to trigger word selection on mobile devices
   *                         Default: longTap
   *     desktopTriggerEvent: DOM Event to trigger word selection on desktops
   *                    Default: "dblclick"
   *     triggerPreCallback: a callback function which is called when the trigger event handler is invoked, prior to initiating
   *                         Alpheios functionality. It should return true to proceed with lookup or false to abort.
   *                         Default: no-op, returns true
   *     enableMouseMoveOverride: override the desktop trigger with a mousemove handler
   *     popupInitialPos: object containing initial css positioning properties for the popup
   *                      Default { top: 10vh, left: 10vw}
   *     toolbarInitialPos: object containing initial css positioning properties for the toolbar
   *                        Default { top: 10px, right: 15px}
   *     actionPanelInitialPos: object containing initial css positioning properties for the action panel (mobile)
   *                            Default { bottom: 120px, right: 20px}
   *     layoutType: 'default' or 'readingTools' (readingTools is used for the Alpheios Reader UI)
   *                 Default: 'default'
   *     disableTextSelection: set to true to disable default browser text selection behavior (not recommended)
   *                           Default: false
   *     textLangCode: default language for lookups via the toolbar
   *                   Default: null (which will result in the user preferred page language being used)
   *     overrideHelp: set to true to disable the default alpheios behavior for the help icon
   *                   (client code must attach their own handler to the ".alpheios-toolbar__help-control" element)
   *                   Default: false
   *     simpleMode: set to true to restrict the UI to the popup/morphology panel (with grammar links) and lookup but no other features
   *                 Default: false
   *     arethusaTbRefreshRetryCount: number of times to retry retrieval of treebank data before disabling the
   *                                  functionality for the treebank document
   *                                  Default: 5
   *     arethusaTbRefreshDelay: number of milliseconds to wait in between retrying treebank document requests
   *                             Default: 200,
   */
  constructor ({
    clientId = null,
    authEnv = null,
    documentObject = document,
    enabledSelector = '.alpheios-enabled',
    disabledSelector = '',
    enabledClass = '',
    disabledClass = '',
    mobileTriggerEvent = null,
    desktopTriggerEvent = null,
    triggerPreCallback = (evt) => { return true }, // Not used at the moment but can be set as a filter for `this.ui.getSelectedText()` calls
    enableMouseMoveOverride = false,
    popupInitialPos = {},
    toolbarInitialPos = {},
    actionPanelInitialPos = {},
    layoutType = 'default', // The other option is 'readingTools'
    // Disable text selection on mobile devices
    disableTextSelection = false,
    textLangCode = null,
    overrideHelp = false,
    simpleMode = false,
    arethusaTbRefreshRetryCount = 5,
    arethusaTbRefreshDelay = 200
    } = {}) {
    this.clientId = clientId

    if (this.clientId === null) {
      throw new Error('Please identify the site.')
    }
    // TODO at some point in the future we may add authentication of
    // clientId
    this.doc = documentObject
    this.authEnv = authEnv
    this.state = new _state__WEBPACK_IMPORTED_MODULE_0__["default"]()
    this.enabledSelector = enabledSelector
    this.disabledSelector = disabledSelector
    this.enabledClass = enabledClass
    this.disabledClass = disabledClass
    this.desktopTriggerEvent = desktopTriggerEvent
    this.mobileTriggerEvent = mobileTriggerEvent
    this.triggerPreCallback = triggerPreCallback
    this.enableMouseMoveOverride = enableMouseMoveOverride
    this.simpleMode = simpleMode

    // Set an initial UI Controller state for activation
    this.state.setPanelClosed() // A default state of the panel is CLOSED
    this.state.tab = 'info' // A default tab is "info"

    this.ui = components.AppController.create(this.state, {
      storageAdapter: components.LocalStorageArea,
      textQueryTriggerDesktop: this.desktopTriggerEvent,
      textQueryTriggerMobile: this.mobileTriggerEvent,
      textQuerySelector: this.enabledSelector,
      triggerPreCallback: this.triggerPreCallback,
      enableMouseMoveOverride: this.enableMouseMoveOverride,
      app: { version:`${_package_json__WEBPACK_IMPORTED_MODULE_1__["version"]}`, buildBranch: "dev", buildNumber: "20200626482", buildName: "dev.20200626482", name: _package_json__WEBPACK_IMPORTED_MODULE_1__["description"] },
      appType: components.Platform.appTypes.EMBEDDED_LIBRARY,
      clientId: this.clientId,
      // Disable text selection on mobile devices
      disableTextSelection: disableTextSelection,
      textLangCode: textLangCode,
      overrideHelp: overrideHelp,
      configServiceUrl: 'https://config.alpheios.net/v1/config',
      arethusaTbRefreshRetryCount: arethusaTbRefreshRetryCount,
      arethusaTbRefreshDelay: arethusaTbRefreshDelay
    })
    // Environment-specific initializations
    if (this.authEnv) {
      if (authEnv.CLIENT_ID) {
        // Register an authentication module only with authentication environment is loaded
        this.ui.registerModule(components.AuthModule, { auth: new components.AppAuthenticator(authEnv) })
      } else if (authEnv.LOGIN_URL) {
        this.ui.registerModule(components.AuthModule, { auth: new components.SessionAuthenticator(authEnv) })
      }
    } else {
      this.ui.registerModule(components.AuthModule, { auth: null })
    }
    // Register UI modules
    let panelParams = {}
    if (this.simpleMode) {
      panelParams.showNav = false
    }
    this.ui.registerModule(components.PanelModule, panelParams)

    let popupParams = {}
    if (popupInitialPos && Object.values(popupInitialPos).filter(value => Boolean(value)).length > 0) {
      popupParams.initialPos = popupInitialPos
    }
    if (this.simpleMode) {
      popupParams.showNav = false
    }
    this.ui.registerModule(components.PopupModule, popupParams)

    let actionPanelParams = {}
    if (actionPanelInitialPos && Object.values(actionPanelInitialPos).filter(value => Boolean(value)).length > 0) {
      actionPanelParams.initialPos = actionPanelInitialPos
    }
    if (this.simpleMode) {
      actionPanelParams.showNav = false
    } else {
      actionPanelParams.showNav = true
    }

    let toolbarParams = {}
    if (this.simpleMode) {
      toolbarParams.showNav = false
    }
    if (layoutType === 'default') {
      if (toolbarInitialPos && Object.values(toolbarInitialPos).filter(value => Boolean(value)).length > 0) {
        toolbarParams.initialPos = toolbarInitialPos
      }

      this.ui.registerModule(components.ToolbarModule, toolbarParams)
      this.ui.registerModule(components.ActionPanelModule, { showNav: actionPanelParams.showNav })
    } else if (layoutType === 'readingTools') {
      // This is a special configuration for Alpheios Reading Tools
      if (this.ui.platform.isDesktop) {
        if (toolbarInitialPos && Object.values(toolbarInitialPos).filter(value => Boolean(value)).length > 0) {
          toolbarParams.initialPos = toolbarInitialPos
        }

        this.ui.registerModule(components.ToolbarModule, toolbarParams)
      } else if (this.ui.platform.isMobile) {
        this.ui.registerModule(components.ActionPanelModule, {
          lookupResultsIn: 'panel',
          initialPos: actionPanelParams.initialPos,
          showNav: actionPanelParams.showNav
        })
      }
    }
  }

  get platform () {
    return this.ui.platform
  }

  notifyExtension () {
    this.doc.body.dispatchEvent(new Event('Alpheios_Embedded_Response'))
  }

  async activate () {
    try {
      /**
       * Notify extension that an embedded lib is present.
       * We need to do this right after an activation.
       * If webextension is loaded sooner than the embedded library
       * than the extension will have no information about
       * the embedded library presence unless explicitly notified by us.
       */
      this.notifyExtension()

      // await this.ui.init() // Activate will call `init()` if has not been initialized previously
      await this.ui.activate()

      // Set a body attribute so the content scrip will know if embedded library is active on a page
      this.doc.body.setAttribute('alpheios-embed-lib-status', 'active')
      this.doc.body.addEventListener('Alpheios_Embedded_Check', event => { this.notifyExtension(event) })

      // and set the state on the components
      this.ui.setEmbedLibActive(true)

    } catch (error) {
      console.error(`Unexpected error activating Alpheios: ${error}`)
      return
    }

    let selector = this.enabledSelector

    if (!selector) {
      throw new Error('Configuration must define selector')
    }
    let activateOn = this.doc.querySelectorAll(selector)
    if (activateOn.length === 0) {
      // it could be that we want to activate Alpheios for lookups via the
      // tools even if there isn't any text on the page to activate to on
      // so just print a warning here.
      console.warn(`Alpheios was activated for the page but not any content (no elements matching ${activateOn}).`)
    }
    if (this.enabledClass) {
      for (let elem of activateOn) {
        elem.classList.add(this.enabledClass)
      }
    }
    if (this.disabledSelector) {
      let disableOn = this.doc.querySelectorAll(this.disabledSelector)
      for (let elem of disableOn) {
        elem.setAttribute('data-alpheios-ignore', 'all')
        if (this.disabledClass) {
          elem.classList.add(this.disabledClass)
        }
      }
    }

    let alignment = new components.AlignmentSelector(this.doc, {})
    alignment.activate()
    let alignmentTranslation = components.AppController.initAlignedTranslation(this.doc, '.aligned-translation',
      {
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: false, top: false },

        // minimum size
        restrictSize: {
          min: { width: 200 }
        },

        // keep the edges inside the parent
        restrictEdges: {
          outer: this.doc.body,
          endOnly: true
        },
        inertia: true
      },
      event => {
        let target = event.target
        // update the element's style
        target.style.width = `${event.rect.width}px`
      })
    return this
  }

  openToolbar () {
    this.ui.openToolbar()
  }

  openActionPanel () {
    if (this.ui.platform.isMobile) {
      this.ui.closePanel()
    }
    this.ui.openActionPanel()
  }

  closeActionPanel () {
    this.ui.closeActionPanel()
  }

  /**
   * Opens the action panel with toolbar buttons hidden and only the lookup visible.
   */
  openActionPanelLookup () {
    if (this.ui.platform.isMobile) {
      this.ui.closePanel()
    }
    this.ui.openActionPanel({ showNav: false })
  }

  /**
   * Opens the action panel with only toolbar buttons visible.
   */
  openActionPanelToolbar () {
    if (this.ui.platform.isMobile) {
      this.ui.closePanel()
    }
    this.ui.openActionPanel({ showLookup: false })
  }
}


/***/ }),

/***/ "./state.js":
/*!******************!*\
  !*** ./state.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return State; });
/**
 * Contains Alpheios state
 * @property {panelStatus} panelStatus
 */
class State {
  constructor (tabID) {
    this.panelStatus = undefined
    this.tab = undefined
    this.watchers = new Map()
  }

  static create (source) {
    let copy = new State()
    for (let key of Object.keys(source)) {
      copy[key] = source[key]
    }
    return copy
  }

  static get defaults () {
    return {
      panelStatus: State.statuses.panel.OPEN
    }
  }

  static get statuses () {
    return {
      embedLib: {
        PENDING: Symbol.for('Alpheios_Status_Pending'), // Has not been fully initialized yet
        ACTIVE: Symbol.for('Alpheios_Status_Active'), // Is loaded and active
        DEACTIVATED: Symbol.for('Alpheios_Status_Deactivated'), // Has been loaded, but is deactivated
        DISABLED: Symbol.for('Alpheios_Status_Disabled') // Has been loaded, but it is disabled
      },
      panel: {
        OPEN: Symbol.for('Alpheios_Status_PanelOpen'), // Panel is open
        CLOSED: Symbol.for('Alpheios_Status_PanelClosed'), // Panel is closed
        DEFAULT: Symbol.for('Alpheios_Status_PanelDefault') // Panel should set its state according to default values
      },
      tab: {
        DEFAULT: 'default' // A tab should be set according to default values
      }
    }
  }

  /**
   * Sets a watcher function that is called every time a property is changed using a setItem() method.
   * @param {String} property - A name of a property that should be monitored
   * @param {Function} watchFunc - A function that will be called every time a property changes
   * @return {State} Reference to self for chaining
   */
  setWatcher (property, watchFunc) {
    this.watchers.set(property, watchFunc)
    return this
  }

  /**
   * SetItem provides a monitored way to change state. If value is assigned to a data property directly
   * there is no way to know if a property was changed. However, if a property was changed using setItem() method,
   * and if there is a watcher function registered for a changed property name,
   * this function will be called on every property change, passing a changed property name as an argument.
   * @param key
   * @param value
   * @return {State}
   */
  setItem (key, value) {
    this[key] = value
    if (this.watchers && this.watchers.has(key)) {
      this.watchers.get(key)(key, this)
    }
    return this
  }

  isPanelOpen () {
    return this.panelStatus === State.statuses.panel.OPEN
  }

  isPanelClosed () {
    return this.panelStatus === State.statuses.panel.CLOSED
  }

  isPanelStateDefault () {
    return this.panelStatus === State.statuses.panel.DEFAULT
  }

  isPanelStateValid () {
    return (
      this.panelStatus === State.statuses.panel.OPEN ||
      this.panelStatus === State.statuses.panel.CLOSED
    )
  }

  setPanelOpen () {
    this.setItem('panelStatus', State.statuses.panel.OPEN)
    return this
  }

  setPanelClosed () {
    this.setItem('panelStatus', State.statuses.panel.CLOSED)
    return this
  }

  changeTab (tabName) {
    this.setItem('tab', tabName)
    return this
  }

  activateUI () {
    this.setItem('uiActive', true)
    return this
  }

  // TODO: A temporary solution for compatibility with TabScript.
  isActive () {
    return this.status === State.statuses.embedLib.ACTIVE
  }

  isDeactivated () {
    return this.status === State.statuses.embedLib.DEACTIVATED
  }

  isDisabled () {
    return this.status === State.statuses.embedLib.DISABLED
  }

  isTabStateDefault () {
    return this.tab === State.statuses.tab.DEFAULT
  }

  uiIsActive () {
    return this.uiActive
  }

  activate () {
    this.status = State.statuses.embedLib.ACTIVE
    return this
  }

  deactivate () {
    this.status = State.statuses.embedLib.DEACTIVATED
    return this
  }

  disable () {
    this.status = State.statuses.embedLib.DISABLED
    return this
  }
}


/***/ })

/******/ });
//# sourceMappingURL=alpheios-embedded.js.map