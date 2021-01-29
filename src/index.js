const http = require('http');
const cors = require('cors');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const fs = require('fs')

app.use('/', express.static('public'))
let arrayBuffer = []

io.on('connection', (socket) => {

    socket.on('stream', (blob) => {
        const hexBlob = `-------------------------\n${blob}\n-------------------------`
        //fs.writeFileSync(`./${Date.now()}_blobAudio.txt`,arrayBuffer.toString('hex'),'utf8')
        arrayBuffer.push(hexBlob)
        socket.broadcast.emit('stream',blob)
    })

})

process.on('SIGINT', () => {
    fs.writeFile('',arrayBuffer)
    fs.writeFile(`./${Date.now()}_blobAudio.txt`, 'utf8', (err) => {

    })
    process.exit(0)
})

server.listen(666, () => {
    console.log("PHONE RUNNING")
})