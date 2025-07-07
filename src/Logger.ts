export enum LogLevel {
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  OFF,
}

type Input = string | Error
type InputGen<T extends Input> = T
type LazyInput<T extends InputGen<any>> = () => T

type Config = {
  truncate?: number
  withTimestamp?: boolean
}

export let Logger = {
  level: LogLevel.DEBUG,
  config: { truncate: 10_000, withTimestamp: true },
  enabledFor: (lvl: LogLevel) => {
    return lvl >= Logger.level
  },
  setLevel: (level: LogLevel) => {
    Logger.level = level
  },
  setConfig: (config: Config) => {
    Logger.config = { ...Logger.config, ...config }
  },
  info: <T extends Input>(msg: T) => logFun(LogLevel.INFO, msg),
  infoL: <T extends Input>(msg: LazyInput<T>) => logFunLazy(LogLevel.INFO, msg),
  warn: <T extends Input>(msg: T) => logFun(LogLevel.WARN, msg),
  warnL: <T extends Input>(msg: LazyInput<T>) => logFunLazy(LogLevel.WARN, msg),
  error: <T extends Input>(msg: T) => logFun(LogLevel.ERROR, msg),
  errorL: <T extends Input>(msg: LazyInput<T>) => logFunLazy(LogLevel.ERROR, msg),
  debug: <T extends Input>(msg: T) => logFun(LogLevel.DEBUG, msg),
  debugL: <T extends Input>(msg: LazyInput<T>) => logFunLazy(LogLevel.DEBUG, msg),
  trace: <T extends Input>(msg: T) => logFun(LogLevel.TRACE, msg),
  traceL: <T extends Input>(msg: LazyInput<T>) => logFunLazy(LogLevel.TRACE, msg),
}

export let l = Logger

let logFunLazy = <T extends Input>(level: LogLevel, msg: LazyInput<T>): T | undefined => {
  if (!Logger.enabledFor(level)) return

  return logFun(level, msg)
}

let logFun = <T extends Input>(level: LogLevel, msg: T | LazyInput<T>): T => {
  if (!Logger.enabledFor(level)) return msg as T

  let obj: T
  let log: string
  if (typeof msg === "function") {
    obj = msg()
  } else {
    obj = msg
  }

  if (obj instanceof Error) {
    log = obj.message
  } else {
    log = obj
  }

  log = truncate(log)

  let hdlr = console.log

  if (level === LogLevel.WARN && console.warn) {
    hdlr = console.warn
  } else if (level === LogLevel.ERROR && console.error) {
    hdlr = console.error
  } else if (level === LogLevel.INFO && console.info) {
    hdlr = console.info
  } else if ((level === LogLevel.DEBUG || level === LogLevel.TRACE) && console.debug) {
    hdlr = console.debug
  }

  if (Logger.config.withTimestamp) {
    log = `[${new Date().toISOString()}] ${log}`
  }

  hdlr.call(console, log)

  return obj
}

const truncate = (log: string) => {
  if (Logger.config.truncate && Logger.config.truncate > 0 && log.length > Logger.config.truncate) {
    let top = Math.floor(Logger.config.truncate * 0.65)
    let bottom = Math.floor(Logger.config.truncate * 0.35)
    log = `${log.slice(0, top)}\n[...]\n${log.slice(-bottom)}`
  }

  return log
}
