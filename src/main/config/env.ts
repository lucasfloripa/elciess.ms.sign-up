export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://elciess:planeta05@elciess.ihcok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '3lc1355'
}
