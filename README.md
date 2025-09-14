# jst-logger

A simple, efficient logger for Node.js with lazy evaluation and ESM support.

## install
```bash
yarn add 'jst-logger@tonisives/jst-logger'
```

## Features

### Dual Input Support
- **Direct logging**: `Logger.info("message")`
- **Lazy evaluation**: `Logger.infoL(() => expensiveOperation())` - only evaluates when log level is enabled
- **Mixed input types**: Supports strings, objects, errors, and any JavaScript value

### Log Levels
- `TRACE` - Most verbose
- `DEBUG` - Debug information
- `INFO` - General information
- `WARN` - Warning messages
- `ERROR` - Error messages
- `OFF` - Disable all logging

### Configuration Options
- **Truncation**: Large log messages are automatically truncated with `[...]` indicator
- **Timestamps**: ISO timestamp prefixes (configurable)
- **Level filtering**: Only logs at or above the configured level

### Console Method Mapping
- Maps to appropriate console methods (`console.info`, `console.warn`, `console.error`, `console.debug`)
- Falls back to `console.log` when specific methods aren't available

## Usage

### Basic Usage
```typescript
import { Logger, LogLevel } from "jst-logger"

// Direct logging
Logger.info("Application started")
Logger.warn("Low disk space")
Logger.error("Database connection failed")

// Lazy evaluation (recommended for expensive operations)
Logger.infoL(() => `User count: ${getUserCount()}`)
Logger.debugL(() => JSON.stringify(largeObject))
```

### Configuration
```typescript
// Set log level
Logger.setLevel(LogLevel.INFO) // Only INFO, WARN, ERROR will be logged

// Configure options
Logger.setConfig({
  truncate: 5000,        // Truncate messages longer than 5000 chars
  withTimestamp: false   // Disable timestamps
})

// Check if level is enabled
if (Logger.enabledFor(LogLevel.DEBUG)) {
  // Perform debug-specific work
}
```

### Available Methods
```typescript
// Direct methods
Logger.trace(msg)
Logger.debug(msg)
Logger.info(msg)
Logger.warn(msg)
Logger.error(msg)

// Lazy methods (L suffix)
Logger.traceL(() => msg)
Logger.debugL(() => msg)
Logger.infoL(() => msg)
Logger.warnL(() => msg)
Logger.errorL(() => msg)

// Short alias
import { l } from "jst-logger"
l.info("Same as Logger.info")
```

### ESM Support

This module is built for ESM imports. Add to your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "moduleResolution": "NodeNext"
  }
}
```

### Release to npm

```bash
npm run build
npm publish
```
