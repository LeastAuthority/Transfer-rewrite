import type { Options } from "@wdio/types";
import { execSync } from "child_process";
import * as fs from "fs";
import * as fsExtra from "fs-extra";

global.downloadDirBrowser = "/home/seluser/downloads";
global.downloadDir = "/home/node/downloads";

export const config: Options.Testrunner = {
  hostname: "selenium-hub",
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: "test/tsconfig.json",
    },
  },
  specs: ["./test/specs/**/*.ts"],
  maxInstances: 10,
  capabilities: [
    {
      browserName: "chrome",
      acceptInsecureCerts: true,
      "goog:chromeOptions": {
        prefs: {
          "download.default_directory": global.downloadDirBrowser,
          "download.directory_upgrade": true,
          "download.prompt_for_download": false,
          "savefile.default_directory": global.downloadDirBrowser,
        },
      },
    },
    {
      browserName: "firefox",
      "moz:firefoxOptions": {
        prefs: {
          "browser.download.dir": global.downloadDirBrowser,
          "browser.download.folderList": 2,
        },
      },
    },
    {
      browserName: "MicrosoftEdge",
      "ms:edgeOptions": {
        prefs: {
          "download.default_directory": global.downloadDirBrowser,
          "download.directory_upgrade": true,
          "download.prompt_for_download": false,
          "savefile.default_directory": global.downloadDirBrowser,
        },
      },
    },
  ],
  logLevel: "info",
  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  onPrepare: function (_config, _capabilities) {
    execSync("/usr/src/app/scripts/generate-sized-test-files.sh");
  },
  beforeTest: function () {
    fsExtra.emptyDirSync(global.downloadDir);
  },
};
