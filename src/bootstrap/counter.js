//累加
const client = require("prom-client");

const setCounter = (path, counter_name) => {
    if (client.register._metrics[counter_name]) {
        //解决bug:同一个worker进程有多个相同counter_name
        return client.register._metrics[counter_name];
    }
    return new client.Counter({
        name: counter_name,
        help: `Number of request ${path}`,
        labelNames: ["module", "path", "method"]
    });
};

module.exports = setCounter;
