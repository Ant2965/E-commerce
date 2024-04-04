const express = require('express')

const app = express();


app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to the app'
    })
})

//port


const PORT = 6060

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
