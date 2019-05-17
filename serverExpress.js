const express = require('express')
const serveIndex = require('serve-index')

const fs = require('fs')

const open = require('open')
const currentProject = 'blockchainTxsExporter'

const app = express()
const hostname = '127.0.0.1'
const port = 3000

app.use((req, res, next) => {
    console.log(req.path)
    next()
})

app.use(express.json({
    limit: '10mb'
}))

app.get('/blockchainTxsExporter/SavedData', (req, res, next) => {
    fs.readdir('public/' + req.path, function (err, files) {
        if (err) {
            return next(err)
        }
        // console.log(files)
        res.send({
            "files": files
        })
        // next()
    })
})

app.post('/blockchainTxsExporter/SavedData', (req, res, next) => {
    var filename = req.body.filename
    var data = req.body.data
    // console.log(filename, data)

    fs.writeFile(`public/${req.path}/${filename}`, data, function (err) {
        if (err) {
            console.log('Data not saved', err)
            return
        }
    })
})

app.use(express.static('public'))
app.use(serveIndex('public'))

app.listen(port, hostname, () => {
    const homepage = `http://${hostname}:${port}/`
    console.log(`Express server running at ${homepage}`)
    open(homepage + currentProject)
})