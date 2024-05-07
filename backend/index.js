const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)
// const hostane='ipaddress' -> cmd -> ipconfig ->phone
server.listen(config.PORT, () => {
  logger.info(`Server je pokrenut na portu ${config.PORT}`)
})
// server.listen(config.PORT, hostaname, () => {
//   logger.info(`Server je pokrenut na portu ${config.PORT}`)
// })