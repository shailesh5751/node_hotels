const express = require('express')
const app = express()
const db = require('./db')
const bodyParser=require('body-parser')

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.json({
        message: 'Welcome to Govindas!',
        endpoints: ['/person', '/menu'],
        status: 'API is running smoothly'
    })
})

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use('/person',personRoutes)
app.use('/menu', menuRoutes)

app.listen(3000, () => {
    console.log('Govindas is open near NVCC')
})