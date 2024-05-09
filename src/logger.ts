import winston from 'winston'

const { combine, timestamp, printf, colorize, align } = winston.format

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((log) => `[${log.timestamp}] ${log.level}: ${log.message}`),
  ),
  transports: [new winston.transports.Console()],
})
