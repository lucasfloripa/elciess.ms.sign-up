export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/elciess.ms.auth-controll',
  port: process.env.PORT || 6060,
  jwtSecret: process.env.JWT_SECRET || '3lc1355'
}
