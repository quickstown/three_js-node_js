
export class Input {
  constructor(){
    this.keys={};
    addEventListener("keydown",e=>this.keys[e.key.toLowerCase()]=true);
    addEventListener("keyup",e=>this.keys[e.key.toLowerCase()]=false);
  }

  get(){
    return {
      w:!!this.keys["w"],
      a:!!this.keys["a"],
      s:!!this.keys["s"],
      d:!!this.keys["d"]
    };
  }
}
