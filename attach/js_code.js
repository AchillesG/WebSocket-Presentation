// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080')

/**************/
/** property **/
/**************/

`
binaryType = enum "blob"
                | "arraybuffer"

readyState = enum 0   -- WebSocket.CONNECTING
                | 1   -- WebSocket.OPEN
                | 2   -- WebSocket.CLOSING
                | 3   -- WebSocket.CLOSED

bufferedAmount        -- The number of bytes of data
                      -- that have been queued but not yet transmitted.
`

/**************/
/*** method ***/
/**************/

/**
 * Enqueues the specified data to be transmitted to the server
 * over WebSocket, increasing the value of bufferedAmount.
 * @arg {String | Blob | ArrayBuffer | ArrayBufferView} data error code
 * @error INVALID_STATE_ERR, SYNTAX_ERR
 */
socket.send(data)

/**
 * close WebSocket connection, if already CLOSED, do nothing
 * @arg {Number} code error code
 * @arg {String} reason must be no longer than 123 bytes of UTF-8 text
 * @error INVALID_ACCESS_ERR, SYNTAX_ERR
 */
socket.close([code], [reason])

/*******************/
/** EventListener **/
/*******************/

// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!')
})

// Listen for messages
socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data)
})

// Connection closed
socket.addEventListener('close', function (event) {
  console.log('Connection closed ', event.code, event.reason)
})

// Connection error
socket.addEventListener('error', function (event) {
  console.log('Error in Connection ', event)
})

/**********************************************/
/** Sec-WebSocket-Key & Sec-WebSocket-Accept **/
/**********************************************/

import sha1 from "sha1"
// 客户端器发送的 secWebSocketKey
const secWebSocketKey = request.headers['sec-websocket-key']
// RFC 6455规定的全局标志符(GUID)
const MAGIC_WORD = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
// 计算 secWebSocketAccept
const secWebSocketAccept = Buffer
  .from(sha1(secWebSocketKey + MAGIC_WORD), 'hex')
  .toString('base64')
