import * as winston from 'winston';

const transports = [];

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports,
})