import {Server} from "socket.io";

/**
 * Modify the given http server to use websockets to allow for multiplayer
 * @param {HttpServer} app 
 */

function setupServer(app) {
  // Make the server and accept cors for testing purposes
  let server = new Server(app, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET"]
    }})
  
  // Object that will contain extra room/session information
  let rooms = {};

  //What to do when someone tries to connect to the server
  server.on("connection", (socket) => {
    console.log("Client Connected");

    // Get the room from their connection attempt
    // If they have a room let them join that room if there are less than 2 people in there
    // If there is no room or there is no space put them in their own room
    // Maybe change to refuse the connection if they have a room but it is full
    let room = socket.handshake.query.room;
    if (room && server.of("/").adapter.rooms.get(room)?.size < 2 && !rooms[room].hasStarted) {
      socket.join(room);
      socket.to(room).emit("oponnent-join");
    } else {
      // Breaks some default functionality if you use just the socket id
      room = socket.id + "!";
      socket.join(room);
      
    }
    

    // If this is the initial creation of the room put an empty object in it
    rooms[room] = rooms[room] ? rooms[room] : {};

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

    //Don't allow people to join once a game has started
    socket.on("start-game", () => {
      rooms[room].hasStarted = true;
    });

    //If there is only one person in the room allow others to join before the start of the next game
    socket.on("restart-game", () => {
      rooms[room].hasStarted = false;
    });

    // Send the user the code of their room to allow invites
    socket.emit("return-code", {code: room});
  });

  // Upon automatic deletion of room, detele extra room info
  server.of("/").adapter.on("delete-room", (room) => {
    console.log(`Deleting Room ${room}`);
    delete rooms[room];
  });
}


export default setupServer;