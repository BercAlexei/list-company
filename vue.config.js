module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/list-company/dist/'
    : '/'
}