/**
 * 기본 리턴되는 데이터 구조
 * {
 *   status: 200,
 *   message: '', // 200이 아닌 오류일 때
 *   data: [],
 * }
 */

const { SOCKET_EVENTS } = require("../../config/socket");
const { subscribeMoveLocationEvent } = require("./move-location");
const { subscribeChangeLocationEvent } = require("./change-location");
const { subscribeAppendLocationEvent } = require("./append-location");
const { subscribeDeleteLocationEvent } = require("./delete-location");

class SocketService {
  constructor(io) {
    this.io = io;
    io.on("connection", (socket) => {
      try {
        console.log("User is Connection! " + socket.id);

        socket.on(SOCKET_EVENTS.INIT, (data) => {
          const accessToken = data.accessToken;
          socket.accessToken = accessToken;
        });

        // 현재 보고있는 roomId를 저장한다.
        socket.on(SOCKET_EVENTS.ROOM_JOIN, (data) => {
          socket.join(`room_${data.roomId}`);
          socket.roomId = data.roomId;
        });

        socket.on(SOCKET_EVENTS.ROOM_LEAVE, (data) => {
          socket.leave(`room_${data.roomId}`);
        });

        subscribeMoveLocationEvent(this.io, socket);
        subscribeChangeLocationEvent(this.io, socket);
        subscribeAppendLocationEvent(this.io, socket);
        subscribeDeleteLocationEvent(this.io, socket);

        socket.on("connect_wait", (data) => {
          console.log("wait..");
          socket.emit("connect_wait", {});
        });

        socket.on("disconnect", () => {
          console.info("emit disconnect ! " + socket.id);
          socket.disconnect();
        });

        socket.emit("connected");
      } catch (err) {
        console.error("socket err : " + err);
      }
    });
  }
}

module.exports = {
  SocketService,
};
