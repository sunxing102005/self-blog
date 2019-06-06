const client = require("prom-client");
const setHistogram = name => {
    if (client.register._metrics[name]) {
        return client.register._metrics[name];
    }
    return new client.Histogram({
        name,
        help: "url cost time ",
        labelNames: ["module", "path", "method", "statusCode"],
        buckets: [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.9, 0.99]
    });
};
module.exports = setHistogram;
