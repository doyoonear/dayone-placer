const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });
// io.set('heartbeat interval', 2000);
// io.set('heartbeat timeout', 10000);

const port = 4000;

http.listen(port, function () {
    console.log('listening on *:' + port);
});

app.use(require('./routes'));
app.get('/', function (req, res) {
    res.send('socket.io');
});

io.on('connection', onConnection);

const memberService = require('./core/component/member');
const roomService = require('./core/component/room');

function onConnection(socket) {
    try {
        console.log('User is Connection! ' + socket.id);

        socket.on('init', (data) => {
            console.log('init data', data)
            socket.memberId = data.memberId;
        });

        socket.on('connect_wait', (data) => {
            console.log('wait..');
            socket.emit('connect_wait', {});
        });

        socket.on('getRoom', ({ roomId } = {}) => {
            console.log('caller', socket.memberId);
            const data = roomService.getRoom();
            socket.emit('getRoom', data);
        });

        socket.on('changeRoomDesk', (props) => {
            // const members = memberService.findRoomMembers();
            socket.emit('changeRoomDesk', { brod: 'cast' });
            socket.broadcast.emit('changeRoomDesk', { brod: 'cast' });
        });

        // // 유저의 접속에 대한 이벤트를 전달 받음.
        // socket.on('room_list', (data) => {
        //   try {
        //     console.log("connect ? : " + JSON.stringify(data));
        //
        //     data = toJson(data)
        //     // channel에 접속 처리.
        //
        //     socket.user_type = data.type;
        //     socket.locale = data.locale;
        //
        //     getRoomList(socket, data, function(user, room_list){
        //       // console.log('roomlist... ' + socket.id)
        //       socket.emit('room_list', room_list, function(err){
        //         // console.log('room_list emit result')
        //         // console.log('room_list emit result ' + err)
        //       });
        //       // console.log("room_list size : " + room_list.length +  " / " + socket)
        //
        //       if(data.type == 'biz'){
        //         // 배열로 관리
        //         // if(bizs['biz_' + data.biz_id] == undefined){
        //           bizs['biz_' + data.biz_id] = {};
        //           bizs['biz_' + data.biz_id].socket = socket;
        //         // }
        //       }
        //
        //       socket.user = user;
        //       socket.room_list = room_list;
        //
        //       room_list.forEach(function(room){
        //         if(socket.user_type == 'user'){
        //           onChangeOnUser(room.room_cd, socket.user.id)
        //         }
        //         socket.join(room.room_cd);
        //       })
        //
        //
        //
        //       // socket.emit('room_list', room_list);
        //     })
        //   } catch (err) {
        //     console.log('room_list err : ' + err)
        //   }
        // });

        // socket.on('chat_list', (data) => {
        //   socket.view_room_cd = data.room_cd
        //   funcChatList(socket, data)
        // });

        socket.on('disconnect', () => {
            console.log("emit disconnect ! " + socket.id);
            socket.disconnect();

        });

        socket.emit('connected');

        // });
    } catch (err) {
        console.log('socket err : ' + err)
    }
}
