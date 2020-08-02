const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(routes)
app.use(express.static('public'))

app.listen(3000, () => {
  console.log('Express is listen on port 3000.')
})