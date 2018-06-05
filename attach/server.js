const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9090 })

console.log('================= WebSocket Server Start =======================')
console.log('================= Listening on port 9090 =======================')

wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (message) {
    const sentMessage = message + ' @ ' + new Date()
    ws.send('received: ' + sentMessage)

    console.log('----------------------------------------------------------------')
    console.log('received: %s', message)
    console.log('sent: %s', sentMessage)
    console.log('----------------------------------------------------------------')
  })

  ws.send('Hi, there！')
  console.log('Hello was sent.')

  setTimeout(() => {
    ws.close(1000, 'timeout')

    console.log('----------------------------------------------------------------')
    console.log('connection closed for code: %d, reason: %s', 1000, 'timeout')
    console.log('----------------------------------------------------------------')
  }, 20000)
});


/*
 * client code
 *

const connectWebSocket = () => {
  var ws = new WebSocket('ws://localhost:9090')
  ws.onopen = e => {
    console.log('connection opend')
    ws.send('1st message from client')
  }
  ws.onmessage = e => console.log(e.data)
  ws.onclose = e => console.log(`connection closed, code: ${e.code}, reason: ${e.reason}`)

  return ws
}
*/
