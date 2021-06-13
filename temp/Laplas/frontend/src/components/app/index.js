import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import {
	Header,
	Main,
	Footer,
	Courses,
	Lessons,
	Services,
	Contacts,
	Course,
} from "../../components";
import { NotFound } from "../notfound";

const GlobalStyle = createGlobalStyle`
	html{
			scroll-behavior: smooth;
	}
	body{
			margin: 0;
			overflow-x:hidden;
			min-width: 280px;
	}
	body::-webkit-scrollbar {
		width: 0px;
		
	}
	a{
		text-decoration: none;
		cursor: pointer;
	}
	a:visited {
		color: #f5f5f7;
	}
	@font-face{
		font-family: "Montserrat";
		src: url(${require("../../fonts/montserrat/Montserrat-Regular.ttf").default});
    font-weight: 400;
	}
  @font-face{
		font-family: "Montserrat";
		src: url(${require("../../fonts/montserrat/Montserrat-Medium.ttf").default});
    font-weight: 500;
	}
	@font-face{
		font-family: "Montserrat";
		src: url(${require("../../fonts/montserrat/Montserrat-SemiBold.ttf").default});
    font-weight: 600;
	}
	@font-face{
		font-family: "Montserrat";
		src: url(${require("../../fonts/montserrat/Montserrat-Bold.ttf").default});
    font-weight: 700;
	}
	*{
			font-family: Montserrat;
			font-weight: 500;
	}
`;
const App = () => {
	const setDemension = React.useState({
		width: window.innerWidth,
		height: window.innerHeight,
		scrollY: window.scrollY,
	})[1];
	useEffect(() => {
		const debouncedHandleResize = debounce(function handleResize() {
			setDemension({
				width: window.innerWidth,
				height: window.innerHeight,
				scrollY: window.scrollY,
			});
		}, 16);
		window.addEventListener("scroll", debouncedHandleResize);
		window.addEventListener("resize", debouncedHandleResize);
		return () => {
			window.removeEventListener("scroll", debouncedHandleResize);
			window.removeEventListener("resize", debouncedHandleResize);
		};
	}, []);
	return (
		<Fragment>
			<GlobalStyle/>
			<Router>
				<Switch>
					<Route exact path="/courses/:course" />
					<Route path="/" component={Header} />
				</Switch>
				<Switch>
					<Route exact path={["/", "/main"]} component={Main} />
					<Route exact path="/courses/:course">
						<Course />
					</Route>
					<Route exact path="/courses" component={Courses} />
					<Route exact path="/lessons" component={Lessons} />
					<Route exact path="/services" component={Services} />
					<Route exact path="/contacts" component={Contacts} />
					<Route path="/" component={NotFound} />
				</Switch>
			</Router>
			<Footer />
		</Fragment>
	);
};

function debounce(fn, ms) {
	let timer;
	return () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = null;
			fn.apply(this, arguments);
		}, ms);
	};
}
export { App };
