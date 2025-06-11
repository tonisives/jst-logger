export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["TRACE"] = 0] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["OFF"] = 5] = "OFF";
})(LogLevel || (LogLevel = {}));
export let Logger = {
    level: LogLevel.DEBUG,
    config: { truncate: 10000, withTimestamp: true },
    enabledFor: (lvl) => {
        return lvl >= Logger.level;
    },
    setLevel: (level) => {
        Logger.level = level;
    },
    setConfig: (config) => {
        Logger.config = { ...Logger.config, ...config };
    },
    info: (msg) => logFun(LogLevel.INFO, msg),
    infoL: (msg) => logFunLazy(LogLevel.INFO, msg),
    warn: (msg) => logFun(LogLevel.WARN, msg),
    warnL: (msg) => logFunLazy(LogLevel.WARN, msg),
    error: (msg) => logFun(LogLevel.ERROR, msg),
    errorL: (msg) => logFunLazy(LogLevel.ERROR, msg),
    debug: (msg) => logFun(LogLevel.DEBUG, msg),
    debugL: (msg) => logFunLazy(LogLevel.DEBUG, msg),
    trace: (msg) => logFun(LogLevel.TRACE, msg),
    traceL: (msg) => logFunLazy(LogLevel.TRACE, msg),
};
let logFunLazy = (level, msg) => {
    if (!Logger.enabledFor(level))
        return;
    return logFun(level, msg);
};
let logFun = (level, msg) => {
    if (!Logger.enabledFor(level))
        return msg;
    let obj;
    let log;
    if (typeof msg === "function") {
        obj = msg();
    }
    else {
        obj = msg;
    }
    if (obj instanceof Error) {
        log = obj.message;
    }
    else {
        log = obj;
    }
    log = truncate(log);
    let hdlr = console.log;
    if (level === LogLevel.WARN && console.warn) {
        hdlr = console.warn;
    }
    else if (level === LogLevel.ERROR && console.error) {
        hdlr = console.error;
    }
    else if (level === LogLevel.INFO && console.info) {
        hdlr = console.info;
    }
    else if ((level === LogLevel.DEBUG || level === LogLevel.TRACE) && console.debug) {
        hdlr = console.debug;
    }
    if (Logger.config.withTimestamp) {
        log = `[${new Date().toISOString()}] ${log}`;
    }
    hdlr.call(console, log);
    return obj;
};
const truncate = (log) => {
    if (Logger.config.truncate && Logger.config.truncate > 0 && log.length > Logger.config.truncate) {
        let top = Math.floor(Logger.config.truncate * 0.65);
        let bottom = Math.floor(Logger.config.truncate * 0.35);
        log = `${log.slice(0, top)}\n[...]\n${log.slice(-bottom)}`;
    }
    return log;
};
//# sourceMappingURL=Logger.js.map