export enum LogLevel {
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  OFF,
}

type Input = any 

type LazyInput = () => Input

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
  info: (msg: Input) => logFun(LogLevel.INFO, msg),
  infoL: (msg: LazyInput) => logFunLazy(LogLevel.INFO, msg),
  warn: (msg: Input) => logFun(LogLevel.WARN, msg),
  warnL: (msg: LazyInput) => logFunLazy(LogLevel.WARN, msg),
  error: (msg: Input) => logFun(LogLevel.ERROR, msg),
  errorL: (msg: LazyInput) => logFunLazy(LogLevel.ERROR, msg),
  debug: (msg: Input) => logFun(LogLevel.DEBUG, msg),
  debugL: (msg: LazyInput) => logFunLazy(LogLevel.DEBUG, msg),
  trace: (msg: Input) => logFun(LogLevel.TRACE, msg),
  traceL: (msg: LazyInput) => logFunLazy(LogLevel.TRACE, msg),
}

export let l = Logger

let logFunLazy = (level: LogLevel, msg: LazyInput): void => {
  if (!Logger.enabledFor(level)) return

  return logFun(level, msg)
}

let logFun = (level: LogLevel, msg: Input | LazyInput): void => {
  if (!Logger.enabledFor(level)) return void 0

  let obj: Input
  let log: Input
  if (typeof msg === "function") {
    obj = msg()
  } else {
    obj = msg
  }

  log = truncate(obj)

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
    hdlr(`[${new Date().toISOString()}]`, log)
  } else {
    hdlr(log)
  }
}

const truncate = (log: Input) => {
  if (typeof log !== "string") return log

  if (Logger.config.truncate && Logger.config.truncate > 0 && log.length > Logger.config.truncate) {
    let top = Math.floor(Logger.config.truncate * 0.65)
    let bottom = Math.floor(Logger.config.truncate * 0.35)
    log = `${log.slice(0, top)}\n[...]\n${log.slice(-bottom)}`
  }

  return log
}
