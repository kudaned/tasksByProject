module.exports = {
  devServer: {
    // In here you put backend URL
    proxy: "http://localhost:3005"
  },
  "transpileDependencies": [
    "vuetify"
  ]
}