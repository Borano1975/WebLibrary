const express = require('express')
require('./db/mongoose')
const adminRouter = require('./routers/admin')
const bookRouter = require('./routers/book')
const authorRouter = require('./routers/author')
const categoryRouter = require('./routers/category')
const bookcategoryRouter = require('./routers/book_category')
const app = express()
const port = process.env.PORT || 5000


const cors = require('cors')
app.use(cors())

/* //maintenance middleware.
app.use((req, res, next) => {
    res.status(503).send('Website under maintenance, hold tight until we\'re back!')
})
*/

app.use(express.json())
app.use(adminRouter)
app.use(bookRouter)
app.use(authorRouter)
app.use(categoryRouter)
app.use(bookcategoryRouter)

app.listen(port, () => {
    console.log(port)
})

