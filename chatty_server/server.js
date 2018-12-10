

const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');


const PORT = 3001;


const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });


wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(wss.clients.size);
  const usersOnline = Object.assign({}, {online: wss.clients.size}, {type: 'incomingUsers'})
  // console.log(wss.clients)
  wss.clients.forEach(client => {
    client.send(JSON.stringify(usersOnline));
  })
  console.log(usersOnline)
  //wss.clients.send(wss.clients.size);



  ws.on('message', function incoming(message){

    const messageParsed = JSON.parse(message)
    console.log(`User ${messageParsed.username} said ${messageParsed.content}`)
    const id = uuidv1();
    console.log('id', id);
    if(messageParsed.type === 'postMessage'){
      const sendDataMessage = Object.assign({}, messageParsed, { id }, {type: 'incomingMessage'});
      console.log(sendDataMessage);

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN){ //&& client !== ws) {{
          client.send(JSON.stringify(sendDataMessage));
        }
      })
    }
    else if(messageParsed.type === 'postNotification'){
      const sendDataNotification = Object.assign({}, messageParsed, { id }, {type: 'incomingNotification'});
      console.log(sendDataNotification);

      wss.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN){
          client.send(JSON.stringify(sendDataNotification));
        }
      })
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected');
    const usersOnline = Object.assign({}, {online: wss.clients.size}, {type: 'incomingUsers'})
    wss.clients.forEach(client => {
    client.send(JSON.stringify(usersOnline));
    })
    console.log(wss.clients.size);
  })

})

