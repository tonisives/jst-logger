export declare enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    OFF = 5
}
type Input = any;
type LazyInput = () => Input;
type Config = {
    truncate?: number;
    withTimestamp?: boolean;
};
export declare let Logger: {
    level: LogLevel;
    config: {
        truncate: number;
        withTimestamp: boolean;
    };
    enabledFor: (lvl: LogLevel) => boolean;
    setLevel: (level: LogLevel) => void;
    setConfig: (config: Config) => void;
    info: (msg: Input) => void;
    infoL: (msg: LazyInput) => void;
    warn: (msg: Input) => void;
    warnL: (msg: LazyInput) => void;
    error: (msg: Input) => void;
    errorL: (msg: LazyInput) => void;
    debug: (msg: Input) => void;
    debugL: (msg: LazyInput) => void;
    trace: (msg: Input) => void;
    traceL: (msg: LazyInput) => void;
};
export declare let l: {
    level: LogLevel;
    config: {
        truncate: number;
        withTimestamp: boolean;
    };
    enabledFor: (lvl: LogLevel) => boolean;
    setLevel: (level: LogLevel) => void;
    setConfig: (config: Config) => void;
    info: (msg: Input) => void;
    infoL: (msg: LazyInput) => void;
    warn: (msg: Input) => void;
    warnL: (msg: LazyInput) => void;
    error: (msg: Input) => void;
    errorL: (msg: LazyInput) => void;
    debug: (msg: Input) => void;
    debugL: (msg: LazyInput) => void;
    trace: (msg: Input) => void;
    traceL: (msg: LazyInput) => void;
};
export {};
