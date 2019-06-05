const Application = require("thinkjs");
const watcher = require("think-watcher");
const babel = require("think-babel");
const notifier = require("node-notifier");
const path = require("path");
const instance = new Application({
    // APP_PATH: path.join(__dirname, "../app"),
    ROOT_PATH: __dirname,
    watcher: watcher,
    transpiler: [
        babel,
        {
            presets: ["think-node"]
        }
    ],
    // notifier: notifier.notify.bind(notifier),
    env: "development"
});

instance.run();
