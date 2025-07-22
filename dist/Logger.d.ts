export declare enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    OFF = 5
}
type Input = string | Error | object;
type InputGen<T extends Input> = T;
type LazyInput<T extends InputGen<any>> = () => T;
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
    info: <T extends Input>(msg: T) => void;
    infoL: <T_1 extends Input>(msg: LazyInput<T_1>) => void;
    warn: <T_2 extends Input>(msg: T_2) => void;
    warnL: <T_3 extends Input>(msg: LazyInput<T_3>) => void;
    error: <T_4 extends Input>(msg: T_4) => void;
    errorL: <T_5 extends Input>(msg: LazyInput<T_5>) => void;
    debug: <T_6 extends Input>(msg: T_6) => void;
    debugL: <T_7 extends Input>(msg: LazyInput<T_7>) => void;
    trace: <T_8 extends Input>(msg: T_8) => void;
    traceL: <T_9 extends Input>(msg: LazyInput<T_9>) => void;
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
    info: <T extends Input>(msg: T) => void;
    infoL: <T_1 extends Input>(msg: LazyInput<T_1>) => void;
    warn: <T_2 extends Input>(msg: T_2) => void;
    warnL: <T_3 extends Input>(msg: LazyInput<T_3>) => void;
    error: <T_4 extends Input>(msg: T_4) => void;
    errorL: <T_5 extends Input>(msg: LazyInput<T_5>) => void;
    debug: <T_6 extends Input>(msg: T_6) => void;
    debugL: <T_7 extends Input>(msg: LazyInput<T_7>) => void;
    trace: <T_8 extends Input>(msg: T_8) => void;
    traceL: <T_9 extends Input>(msg: LazyInput<T_9>) => void;
};
export {};
