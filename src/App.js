import React from 'react';
import ParticlesBg from 'particles-bg'
import Main from './components/MainComponent'
import { Component } from 'react';

let config = {
  num: [4, 7],
  rps: 0.1,
  radius: [5, 10],
  life: [1.5, 3],
  v: [2, 3],
  tha: [-40, 40],
  // body: "./img/icon.png", // Whether to render pictures
  alpha: [0.6, 0],
  scale: [1, 0.1],
  position: "all", // all or center or {x:1,y:1,width:100,height:100}
  color: ["random", "#ff0000"],
  bround: "dead", // cross or bround
  random: null,  // or null,
  g: 5,    // gravity
  // f: [2, -1], // force
  onParticleUpdate: (ctx, particle) => {
      ctx.beginPath();
      ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.closePath();
  }
};


class App extends Component{

render(){
  return (
    <>
    <div>
      <Main />
    </div>
    <ParticlesBg type="random" num={10} bg={true} />
    </>
  );
}
}
export default App;

