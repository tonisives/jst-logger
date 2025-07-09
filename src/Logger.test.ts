import { Logger, LogLevel } from "./Logger.js"
import { expect, it, vi } from "vitest"

it("should log", () => {
  Logger.config.withTimestamp = false
  // spy
  vi.spyOn(console, "info").mockImplementation(() => {})

  Logger.infoL(() => "msg 1")
  Logger.info("msg 2")

  expect(console.info).toHaveBeenCalledWith("msg 1")
  expect(console.info).toHaveBeenCalledWith("msg 2")
})

it("logs errors", () => {
  Logger.config.withTimestamp = false
  vi.spyOn(console, "error").mockImplementation(() => {})

  Logger.errorL(() => new Error("msg 1"))
  Logger.error("msg 2")

  expect(console.error).toHaveBeenCalledWith("msg 1")
  expect(console.error).toHaveBeenCalledWith("msg 2")
})

it("will not log if level is not enabled", () => {
  Logger.config.withTimestamp = false
  vi.spyOn(console, "info").mockImplementation(() => {})

  Logger.setLevel(LogLevel.ERROR)
  Logger.info("msg 1")

  expect(console.info).not.toHaveBeenCalled()
})
