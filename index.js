const express = require('express')
const app = express()

const contacts = [
    {
        name: 'amir',
        phone: '085482938471'
    },
    {
        name: 'budi',
        phone: '086452738493'
    }
]

function validateIndex(req, res, next) {
    if (req.query.index !== undefined && contacts[req.query.index] === undefined) {
        res.send({ success: false })
    } else {
        next()
    }
}

app.use(validateIndex)
app.use(express.json)

app.get('/contact', function(req, res) {
    res.send(contacts)
})

app.post('/contact', function(req, res) {
    contacts.push({ name: req.body.name, phone: req.body.phone })
    res.send({ success: true })
})

// menerapkan middleware validateIndex pada rute pengubahan data
app.put('/contact', function(req, res) {
    contacts[req.query.index] = { name: req.body.name, phone: req.body.phone }
    res.send({ success: true })
})

// menerapkan middleware validateIndex pada rute penghapusan data
app.delete('/contact', function(req, res) {
    contacts.splice(req.query.index, 1)
    res.send({ success: true })
})

app.listen(3000, function() {
    console.log('server running')
})