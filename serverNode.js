const finalhandler = require('finalhandler') // dependency of other installed
const http = require('http') // built in
const serveStatic = require('serve-static') // npm installed, change root directory, set mimetype, and automatically serve index.html
const serveIndex = require('serve-index') // npm installed, show directory listing when no index.html
const open = require('open') // npm installed, open browser at listening port when run

const hostname = '127.0.0.1'
const port = 3001
const currentProject = 'blockchainTxsExporter'

// Serve directory indexes for public/ftp folder (with icons)
const index = serveIndex('public', {
    'icons': false
})

// Serve up public/ftp folder files
const serve = serveStatic('public')

// Create server
const server = http.createServer(function onRequest(req, res) {
    const done = finalhandler(req, res)
    serve(req, res, function onNext(err) {
        if (err) return done(err)
        index(req, res, done)
    })
})

// Listen
server.listen(port, hostname, () => {
    const homepage = `http://${hostname}:${port}/`
    console.log(`Node server running at ${homepage}`)
    open(homepage + currentProject)
})