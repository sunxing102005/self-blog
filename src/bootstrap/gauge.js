//
const client = require('prom-client');

const setGauge = (path, gauge_name) => {
    if (client.register._metrics[gauge_name]) {
        //解决bug:同一个worker进程有多个相同name
        return client.register._metrics[gauge_name];
    }
    return new client.Gauge({
        name: gauge_name,
        help: `Number of request ${path}`,
        labelNames: ['module', 'path', 'method', 'statusCode']
    });
};

module.exports = setGauge;
