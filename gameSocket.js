
const rooms = {};

module.exports = (io) => {

  io.on("connection", (socket)=>{

    socket.on("join_room", ({roomId,name})=>{
      socket.join(roomId);

      if(!rooms[roomId]) rooms[roomId] = { players: {} };

      rooms[roomId].players[socket.id] = {
        id: socket.id,
        name,
        x:0,
        z:0,
        vx:0,
        vz:0
      };

      io.to(roomId).emit("state_update", rooms[roomId]);
    });

    socket.on("player_input", ({roomId,input})=>{
      const p = rooms?.[roomId]?.players?.[socket.id];
      if(!p) return;

      const speed = 0.1;
      p.vx = 0; p.vz = 0;

      if(input.w) p.vz -= speed;
      if(input.s) p.vz += speed;
      if(input.a) p.vx -= speed;
      if(input.d) p.vx += speed;
    });

    socket.on("disconnect", ()=>{
      for(const r in rooms){
        delete rooms[r].players[socket.id];
      }
    });
  });

  setInterval(()=>{
    for(const r in rooms){
      const room = rooms[r];

      for(const id in room.players){
        const p = room.players[id];
        p.x += p.vx;
        p.z += p.vz;
      }

      io.to(r).emit("state_update", room);
    }
  }, 1000/30);
};
