export function createLogger(context = {}) {
  const write = (level, message, fields = {}) => {
    process.stdout.write(`${JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...context,
      ...fields,
    })}\n`);
  };

  return Object.freeze({
    info: (message, fields) => write("info", message, fields),
    warn: (message, fields) => write("warn", message, fields),
    error: (message, fields) => write("error", message, fields),
  });
}
