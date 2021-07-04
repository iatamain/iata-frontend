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
	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const ctx = canvas.getContext("2d");
		const handleMouseEnter = ()=>{
			cursor.isHover = true;
			console.log("test");
		}
		const handleMouseLeave = ()=>{
			cursor.isHover = false;
			console.log("test2");
		}
		const handleMouseDown = ()=>{
			cursor.dr = 35;
			cursor.isActive = true;
		};
		const handleMouseUp = ()=>{
			cursor.isActive = false;
		}
		const handleMouseMove = (event) => {
			const x = event.clientX;
			const y = event.clientY;
			cursor.toX = x;
			cursor.toY = y;
			if (cursor.x < 0 || cursor.y < 0) {
				cursor.x = x;
				cursor.y = y;
			}
			cursor.dx = (cursor.toX - cursor.x)*10;
			cursor.dy = (cursor.toY - cursor.y)*10;
		};
		const cursor = {
			x: -20,
			y: -20,
			toX: -20,
			toY: -20,
			dx: 0,
			dy: 0,
			dr: 0,
			r: 5,
			maxR: 10,
			maxRForActive: 25,
			minR: 5,
			isActive: false,
			isHover: false,
		};
		let id = 0;
    let last = Date.now();
		function play() {
      let now = Date.now();
      let dt = (now - last)/1000;
			update(dt);
			render();
			id = requestAnimationFrame(play);
      last = now;
		}
		function update(dt) {
			const dist = Math.sqrt(
				(cursor.x - cursor.toX) ** 2 + (cursor.y - cursor.toY) ** 2
			);
			const vectSpeed = Math.sqrt(cursor.dx ** 2 + cursor.dy ** 2);
			if (dist <= vectSpeed*dt) {
				cursor.x = cursor.toX;
				cursor.y = cursor.toY;
				cursor.speed = 0;
			} else {
				cursor.x += cursor.dx*dt;
				cursor.y += cursor.dy*dt;
			}
			cursor.r += cursor.dr*dt;
			if(cursor.r > cursor.maxR && !cursor.isActive && cursor.dr > 0){
				cursor.dr *= -1;
			}else if(cursor.r > cursor.maxRForActive && cursor.isActive){
				cursor.r = cursor.maxRForActive;
			}
			if(cursor.r < cursor.minR){
				cursor.r = cursor.minR;
				cursor.dr = 0;
			}
		}
		function render() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#ABDBE2"; //Рисуем большой круг
			ctx.strokeStyle = "#ABDBE2";
			ctx.beginPath();
			ctx.arc(cursor.x + 5, cursor.y + 5, 25, 0, Math.PI * 2);
			ctx.closePath();
			if(!cursor.isHover)ctx.globalAlpha = 0.2;
			if(!cursor.isHover)ctx.fill();
			if(cursor.isHover) ctx.stroke();
			ctx.globalAlpha = 1;

			ctx.fillStyle = "#ABDBE2"; //Рисуем маленький круг
			ctx.beginPath();
			ctx.arc(cursor.toX + 5, cursor.toY + 5, cursor.r, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		}
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);
		const listPointerElem = document.querySelectorAll(".cursorPointer");
		listPointerElem.forEach((value)=>{
			console.log(value);
			value.addEventListener("mouseenter", handleMouseEnter);
			value.addEventListener("mouseleave", handleMouseLeave);
		})
		play();
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			listPointerElem.forEach((value)=>{
				value.removeEventListener("mouseenter", handleMouseEnter);
				value.removeEventListener("mouseleave", handleMouseLeave);
			})
			cancelAnimationFrame(id);
		};
	}, [window.innerWidth, window.innerHeight]);
	return <Canvas ref={canvasRef}></Canvas>;
};
export { Cursor };
