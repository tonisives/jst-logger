export declare enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    OFF = 5
}
type Input = string | Error;
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
    info: <T extends Input>(msg: T) => T;
    infoL: <T_1 extends Input>(msg: LazyInput<T_1>) => T_1 | undefined;
    warn: <T_2 extends Input>(msg: T_2) => T_2;
    warnL: <T_3 extends Input>(msg: LazyInput<T_3>) => T_3 | undefined;
    error: <T_4 extends Input>(msg: T_4) => T_4;
    errorL: <T_5 extends Input>(msg: LazyInput<T_5>) => T_5 | undefined;
    debug: <T_6 extends Input>(msg: T_6) => T_6;
    debugL: <T_7 extends Input>(msg: LazyInput<T_7>) => T_7 | undefined;
    trace: <T_8 extends Input>(msg: T_8) => T_8;
    traceL: <T_9 extends Input>(msg: LazyInput<T_9>) => T_9 | undefined;
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
    info: <T extends Input>(msg: T) => T;
    infoL: <T_1 extends Input>(msg: LazyInput<T_1>) => T_1 | undefined;
    warn: <T_2 extends Input>(msg: T_2) => T_2;
    warnL: <T_3 extends Input>(msg: LazyInput<T_3>) => T_3 | undefined;
    error: <T_4 extends Input>(msg: T_4) => T_4;
    errorL: <T_5 extends Input>(msg: LazyInput<T_5>) => T_5 | undefined;
    debug: <T_6 extends Input>(msg: T_6) => T_6;
    debugL: <T_7 extends Input>(msg: LazyInput<T_7>) => T_7 | undefined;
    trace: <T_8 extends Input>(msg: T_8) => T_8;
    traceL: <T_9 extends Input>(msg: LazyInput<T_9>) => T_9 | undefined;
};
export {};
