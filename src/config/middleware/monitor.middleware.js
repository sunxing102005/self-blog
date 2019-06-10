// import setCounter from "../../bootstrap/counter";
import setGauge from "../../bootstrap/gauge";
import setHistogram from "../../bootstrap/histogram";
const ipUtil = require("../../utils/ip");
const packageConfig = require("../../../package.json");
const moduleName = packageConfig.name;
module.exports = (options, app) => {
    return async (ctx, next) => {
        if (
            ctx.path.indexOf("static") !== -1 ||
            ctx.path.indexOf("metrics") !== -1 ||
            ctx.path.indexOf("assets") !== -1
        ) {
            return next();
        }
        const ip = ipUtil.getIp();
        console.log("ip_ip", ip);
        //设置prometheus metric
        const path = ctx.path;
        // let namePrefix = path && path.replace(/\/|-/gi, "_");
        // namePrefix = namePrefix.slice(1);
        const stime = new Date().getTime();
        // //Counter,多进程使用counter有问题
        // //某接口请求个数
        // const counter = setCounter(path, namePrefix + "_total");
        // counter.labels(moduleName, path, ctx.method).inc(1);

        await next();
        //Gauge
        //接口耗时
        const etime = new Date().getTime();
        const status = ctx.response.status;
        const costTime = (etime - stime) / 1000;
        const gauge = setGauge(path, "duration_seconds");
        gauge.labels(moduleName, path, ctx.method, status).set(costTime);

        //Histogram, 因为是多进程，不能用summary
        //平均时长占比
        const cost_time_distribution = setHistogram("cost_time_distribution");
        cost_time_distribution
            .labels(moduleName, path, ctx.method, status)
            .observe(costTime);
    };
};
