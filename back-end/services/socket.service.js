const logger = require("./logger.service");
var gIo = null;
function connectSockets(http, session) {
  gIo = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });
  gIo.on("connection", (socket) => {
    console.log("New socket", socket.id);
    socket.on("disconnect", (socket) => {
      console.log("Someone disconnected");
    });
    socket.on("chat toy", (toyId) => {
      if (socket.myToyId === toyId) return;
      if (socket.myToyId) {
        socket.leave(socket.myToyId);
      }
      socket.join(toyId);
      socket.myToyId = toyId;
    });
    socket.on("chat newMsg", (msg) => {
      console.log("Emitting Chat msg", msg);
      // emits only to sockets in the same room
      gIo.to(socket.myToyId).emit("chat addMsg", msg);
    });
    socket.on("join", (room) => {
      console.log("user joined room", room);
      socket.join(room);
    });
    socket.on("join isConnected", (userId) => {
      console.log("user joined room", userId);
      socket.join(userId);
      socket.userId = userId;
      console.log("emmiting user id", userId);
      gIo.to(userId).emit(userId);
    });
    socket.on("leave", (room) => {
      console.log("user left room", room);
      socket.leave(room);
    });
    socket.on("add-review", ({ review, ownerId }) => {
      socket.to(ownerId).emit("add-review", review);
    });
    socket.on("join-order-channel", (userId) => {
      if (socket.orderChannel === userId) return;
      if (socket.orderChannel) {
        socket.leave(socket.orderChannel);
      }
      socket.join(userId);
      socket.orderChannel = userId;
    });

    socket.on("user-connected", (userId) => {
      console.log("user online", userId);
      gIo.to(userId).emit("user-online", userId);
    });
    socket.on("new order", (order) => {
      socket.to(order.seller._id).emit("added order", order);
    });
    socket.on("new status", (order) => {
      console.log("SOCKET ORDER", order.buyer);
      socket.to(order.buyer._id).emit("changed status", order);
    });
    socket.on('new status msg', (order) => {
      const msg = order.orderStatus === 'rejected' ? 'Your Order has been cancelled...' : 'Your Order is now in progress!'
      const isSuccess = order.orderStatus === 'rejected' ? false : true
      socket.to(order.buyer._id).emit('order status', { msg, isSuccess })
    })
    socket.on("set-user-socket", (userId) => {
      socket.userId = userId;
      console.log("user logged in", socket.userId);
      gIo.to(userId).emit("user-online", userId);
    });
    socket.on("user-online", (userId) => {
      console.log("user reporting online", userId);
      socket.userId = userId;
      gIo.to(userId).emit("user-online", userId);
    });
    socket.on("unset-user-socket", (userId) => {
      console.log("user logged out");
      delete socket.userId;
      gIo.emit("user-offline", userId);
    });
    socket.on("isUserConnected", async (userId) => {
      const userSocket = await _getUserSocket(userId);
      if (userSocket) gIo.emit("user-connection", userId);
      else {
        gIo.emit("find-user", userId);
      }
    });
  });
}

// function emitTo({ type, data, label }) {
//   if (label) gIo.to("watching:" + label).emit(type, data);
//   else gIo.emit(type, data);
// }

// async function emitToUser({ type, data, userId }) {
//   logger.debug("Emiting to user socket: " + userId);
//   const socket = await _getUserSocket(userId);
//   if (socket) socket.emit(type, data);
//   else {
//     console.log("User socket not found");
//     _printSockets();
//   }
// }

// async function broadcast({ type, data, room = null, userId }) {
//   console.log("BROADCASTING", JSON.stringify(arguments));
//   const excludedSocket = await _getUserSocket(userId);
//   if (!excludedSocket) {
//     // logger.debug('Shouldnt happen, socket not found')
//     // _printSockets();
//     return;
//   }
//   logger.debug("broadcast to all but user: ", userId);
//   if (room) {
//     excludedSocket.broadcast.to(room).emit(type, data);
//   } else {
//     excludedSocket.broadcast.emit(type, data);
//   }
// }

async function _getUserSocket(userId) {
  const sockets = await _getAllSockets();
  const socket = sockets.find((s) => s.userId == userId);
  return socket;
}
async function _getAllSockets() {
  // return all Socket instances
  const sockets = await gIo.fetchSockets();
  return sockets;
}

// async function _printSockets() {
//   const sockets = await _getAllSockets();
//   console.log(`Sockets: (count: ${sockets.length}):`);
//   sockets.forEach(_printSocket);
// }
// function _printSocket(socket) {
//   console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`);
// }

// module.exports = {
//   connectSockets,
//   emitTo,
//   emitToUser,
//   broadcast,
// };

module.exports = {
  connectSockets,
};
