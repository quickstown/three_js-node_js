
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

export class SocketClient {
  constructor(){
    this.socket = io("http://localhost:3000");
  }

  join(roomId,name){
    this.socket.emit("join_room",{roomId,name});
  }

  input(roomId,input){
    this.socket.emit("player_input",{roomId,input});
  }

  onState(cb){
    this.socket.on("state_update",cb);
  }
}
