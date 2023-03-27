import {Server} from "socket.io";
import {v4} from "uuid";


// Object that will contain extra room/session information
const rooms = {};
let server;


/**
 * Modify the given http server to use websockets to allow for multiplayer
 * @param {HttpServer} app 
 */
function setupServer(app) {
  // Make the server and accept cors for testing purposes
  server = new Server(app, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET"]
    }
  });

  const maxPlayers = 2;

  //What to do when someone tries to connect to the server
  server.on("connection", (socket) => {
    console.log("Client Connected");

    // Get the room from their connection attempt
    // If they have a room let them join that room if there are less than 2 people in there
    // If there is no room or there is no space put them in their own room
    // Maybe change to refuse the connection if they have a room but it is full
    let room = socket.handshake.query.room;

    const user = {};
    user.info = socket.handshake.auth;
    user.sid = socket.id;

    if (room && rooms[room]?.users?.length < maxPlayers && !rooms[room].hasStarted) {

      socket.join(room);
      
      socket.to(room).emit("oponnent-join");

    } else {
      // Breaks some default functionality if you use just the socket id
      room = v4();
      socket.join(room);
    }
    
    // If this is the initial creation of the room put an empty object in it
    rooms[room] = rooms[room] || {users: []};
    rooms[room].users.push(user);

    if (rooms[room].users.length >= maxPlayers) {
      console.log("room full")
      server.to(room).emit("lobby-full");

      //Don't allow people to join once a game has started
      rooms[room].hasStarted = true;
    }

    console.log(`Room: ${room}`);

    // Should you want to do something upon disconnect put it here
    socket.on("disconnect", (reason) => {
      console.log(reason);
      socket.to(room).emit("oponnent-leave");
    });

    // Upon receiving a message, send it to everyone else in the room
    // And have the room remember the it to send to any newcomers
    socket.on("keypress", (key) => {
      socket.to(room).emit("keypress", key);
    });

    // Relay the start data to the others in the room
    socket.on("send-start-data", data => {
      socket.to(room).emit("send-start-data", data);
    });

    // Set that this person has finished their game
    socket.on("user-done", () => {
      rooms[room].users.map(user => {
        if (user.sid === socket.id) {
          user.gameDone = true;
        }
        return user
      });
      checkGameDone(room);
    });

    // Relay the rematch request to other users
    socket.on("request-rematch", () => {
      socket.to(room).emit("request-rematch");
    });

    // Send the user the code of their room to allow invites
    socket.emit("return-code", {code: room});
  });

  // Upon automatic deletion of room, detele extra room info
  server.of("/").adapter.on("delete-room", (room) => {
    console.log(`Deleting Room ${room}`);
    delete rooms[room];
  });

  // Upon leaving of room, remove user from that room
  server.of("/").adapter.on("leave-room", (room, id) => {
    if (room in rooms) {
      rooms[room].users = rooms[room].users.filter(user => user.sid !== id);
      checkGameDone(room);
    }
    
  });
}

/**
 * Check whether a room's game is over, and end it if it is.
 * @param {String} room The room in question
 */
function checkGameDone(room) {
  if (rooms[room].users.every(user => user.gameDone)) {
    server.to(room).emit("game-done");
  }
}


export default setupServer;