import { render } from "@testing-library/react";
import { useEffect, createRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1000;
`;
const Cursor = () => {
  const canvasRef = createRef();
  useEffect(()=>{
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    const handleMouseMove = (event)=>{
      const x = event.clientX;
      const y = event.clientY;
      cursor.toX = x;
      cursor.toY = y;
      if(cursor.x < 0 && cursor.y < 0){
        cursor.x = x;
        cursor.y = y;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ABDBE2";
      ctx.beginPath();
      ctx.arc(x + 5, y + 5, 25, 0, Math.PI*2);
      ctx.closePath();
      ctx.globalAlpha = 0.2;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    const cursor = {
      x: -20,
      y: -20,
      toX: -20,
      toY: -20,
      speed: 1
    }
    let id = 0;
    function play(){
      update();
      render();
      id = requestAnimationFrame(play);
    }
    function update(){

    }
    function render(){

    }
    window.addEventListener("mousemove", handleMouseMove);
    play();
    return ()=>{
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(id);
    }
  }, [window.innerWidth, window.innerHeight]);
	return <Canvas ref={canvasRef}></Canvas>;
};
export { Cursor };
