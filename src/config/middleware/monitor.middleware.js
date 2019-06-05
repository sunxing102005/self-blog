import setCounter from "../../bootstrap/counter";
import setGauge from "../../bootstrap/gauge";
const ipUtil = require("../util/ip");
module.exports = (options, app) => {
    return async (ctx, next) => {
        if (
            ctx.path.indexOf("static") !== -1 ||
            ctx.path.indexOf("metrics") !== -1
        ) {
            return next();
        }
        const ip = ipUtil.getIp();
        //设置prometheus metric
        const path = ctx.path;
        let namePrefix = path && path.replace(/\/|-/gi, "_");
        namePrefix = namePrefix.slice(1);
        const stime = new Date().getTime();
        //Counter
        //某接口请求个数
        const counter = setCounter(path, namePrefix + "_total_" + ip);
        counter.labels(ctx.module, path, ctx.method).inc(1);

        await next();
        //Gauge
        //接口耗时
        const etime = new Date().getTime();
        const status = ctx.response.status;
        const costTime = (etime - stime) / 1000;
        const gauge = setGauge(path, "duration_seconds");
        gauge.labels(ctx.module, path, ctx.method, status).set(costTime);
    };
};
