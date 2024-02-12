import { PrismaClient } from "@prisma/client"
import { logger } from "./logging.js";

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ]
});

prismaClient.$on('error', (errornya) => {
  logger.error(errornya)
})

prismaClient.$on('warn', (errornya) => {
  logger.warn(errornya)
})

prismaClient.$on('info', (errornya) => {
  logger.info(errornya)
})

prismaClient.$on('query', (errornya) => {
  logger.info(errornya)
})
