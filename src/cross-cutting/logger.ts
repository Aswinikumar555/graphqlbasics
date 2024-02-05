import pino from 'pino'
const envToLogLevel = new Map([
  ['dev', 'debug'],
  ['prod', 'info'],
  ['test', 'error'],
  ['stage', 'debug'],
])

export type ILogger = pino.Logger

export const makeLogger = (): ILogger => {
  const env ='dev'
  const level =  'info'
  const options: pino.LoggerOptions = { level }
  options.serializers = {
    req(request) {
      return {
        method: request.method,
        url: request.url,
        params: request.params,
        headers: request.headers,
        hostname: request.hostname,
        remoteAddress: request.ip,
        remotePort: request.socket.remotePort,
      }
    },
  }
  if (env === 'dev') {
    options.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    }
  }
  return pino(options)
}
