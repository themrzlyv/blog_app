const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    BASE_URL: 'http://localhost:3000',
    MONGO_URI:'mongodb+srv://blog_app:blog_app15@cluster0.calac.mongodb.net/blog_users?retryWrites=true&w=majority',
    JWT_SECRET:'adsfwsryedxfgdfwqrt'
  }
}