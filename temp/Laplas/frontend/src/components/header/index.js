import React, { Component } from "react";
import "./style.css";
import bird from "./bird.svg";
import { Link } from "react-router-dom";

class Header extends Component {
	constructor(props) {
		super(props);
		this.curNavRef = React.createRef();
		this.timer = null;
		this.state = { elem: null };
		this.navElements = [
			{ title: "Главная", key: "main" },
			{ title: "Курсы", key: "course" },
			{ title: "Индивидуальные занятия", key: "lessons" },
			{ title: "Услуги", key: "services" },
			{ title: "Контакты", key: "contacts" },
		];
		this.currentKey = window.location.pathname.slice(1) || "main";
    this.lastStyleUnderline = {
      left: 0,
      width: 0
    };
	}
	handleMouseOut(event) {
		this.timer = setTimeout(() => {
			this.timer = null;
			this.setState({ elem: this.curNavRef.current });
		}, 500);
	}
	handleMouseOver(event) {
		clearTimeout(this.timer);
		this.setState({ elem: event.target });
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ elem: this.curNavRef.current });
		}, 100); //Чтобы шрифт успел прогрузиться
	}
	render() {
		this.currentKey = window.location.pathname.slice(1) || "main";
		let classNav = this.currentKey === "main" ? "in_top" : "";
		let style = {};
		if (this.state.elem) {
			 style = {
				left: this.state.elem.getBoundingClientRect().left + "px",
				width: this.state.elem.getBoundingClientRect().width + "px",
			};
      this.lastStyleUnderline.left = parseInt(style.left);
      this.lastStyleUnderline.width = parseInt(style.width);
		}else{
      style.left = this.lastStyleUnderline.left + this.lastStyleUnderline.width/2 + "px";
      style.width = "0px";
    }
		return (
			<nav className = {classNav}>
				<ul>
					<li>
						<img src={bird} alt="Laplas" width="70" />
					</li>
					{this.navElements.map((elem) => {
						return (
							<li
								key={elem.key}
								ref={elem.key === this.currentKey ? this.curNavRef : null}
								className={elem.key === this.currentKey ? "current" : ""}
								onMouseOver={this.handleMouseOver.bind(this)}
								onMouseOut={this.handleMouseOut.bind(this)}
							>
								<Link to={"/" + elem.key}>{elem.title}</Link>
							</li>
						);
					})}
				</ul>
				<div style={style} className="underline" />
			</nav>
		);
	}
}
export { Header };
