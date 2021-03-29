import React, { Component, useState, useEffect } from "react";
import "./style.css";
import bird from "./bird.svg";
import { Link } from "react-router-dom";

let Header = () => {
	let curNavRef = React.createRef(); //ref фкладки от текущей страницы
	let [currNav, setCurrNav] = useState(curNavRef.current);
	let timer = null; //Шоб полосочка возвращалась не сразу:D
	let navElements = [
		{ title: "Главная", key: "main" },
		{ title: "Курсы", key: "course" },
		{ title: "Индивидуальные занятия", key: "lessons" },
		{ title: "Услуги", key: "services" },
		{ title: "Контакты", key: "contacts" },
	];
	let currentKey = window.location.pathname.slice(1) || "main"; //key вкладки от текущей страницы
	let lastStyleUnderline = {
		left: 0,
		width: 0,
	};
	let classNav = currentKey === "main" && window.scrollY <= 10 ? "in_top" : "";
	let style = {};
	if (currNav) {
		style = {
			left: currNav.getBoundingClientRect().left + "px",
			width: currNav.getBoundingClientRect().width + "px",
		};
		lastStyleUnderline.left = parseInt(style.left);
		lastStyleUnderline.width = parseInt(style.width);
	} else {
		style.left = lastStyleUnderline.left + lastStyleUnderline.width / 2 + "px";
		style.width = "0px";
	}
	function handleMouseOut(event) {
		timer = setTimeout(() => {
			timer = null;
			setCurrNav(curNavRef.current);
		}, 500);
	}
	function handleMouseOver(event) {
		clearTimeout(timer);
		setCurrNav(event.target);
	}
	useEffect(() => {
		setTimeout(() => {
			setCurrNav(curNavRef.current);
		}, 100)
	}, [currentKey]);
	return (
		<nav className={classNav}>
			<ul>
				<li>
					<img src={bird} alt="Laplas" width="70" />
				</li>
				{navElements.map((elem) => {
					return (
						<li
							key={elem.key}
							ref={elem.key === currentKey ? curNavRef : null}
							className={elem.key === currentKey ? "current" : ""}
							onMouseOver={handleMouseOver}
							onMouseOut={handleMouseOut}
						>
							<Link to={"/" + elem.key}>{elem.title}</Link>
						</li>
					);
				})}
			</ul>
			<div style={style} className="underline" />
		</nav>
	);
};
export { Header };
