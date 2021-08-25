const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });
const cors = require('cors');
const bodyParser = require('body-parser');
const { onConnected } = require('./core/socketio');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 4000;
http.listen(PORT, () => {
  console.log('listening on *:' + PORT);
});
app.use(require('./routes'));
app.get('/', (req, res) => {
  res.send('socket.io');
});

io.on('connection', onConnected);
