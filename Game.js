
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js";

export class Game {
  constructor(socket){
    this.socket=socket;

    this.scene=new THREE.Scene();
    this.camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
    this.renderer=new THREE.WebGLRenderer();
    this.renderer.setSize(innerWidth,innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.players={};
    this.roomId="room1";

    this.socket.onState(state=>{
      for(const id in state.players){
        if(!this.players[id]){
          const mesh=new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1),
            new THREE.MeshBasicMaterial({color:0xff4444})
          );
          this.scene.add(mesh);
          this.players[id]={mesh};
        }

        this.players[id].mesh.position.x=state.players[id].x;
        this.players[id].mesh.position.z=state.players[id].z;
      }
    });
  }

  update(input){
    this.socket.input(this.roomId,input.get());
    this.renderer.render(this.scene,this.camera);
  }
}
