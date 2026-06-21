
import {SocketClient} from "./network/SocketClient.js";
import {Game} from "./game/Game.js";
import {Input} from "./game/Input.js";

const socket=new SocketClient();
const game=new Game(socket);
const input=new Input();

socket.join("room1","player");

function loop(){
  game.update(input);
  requestAnimationFrame(loop);
}
loop();
