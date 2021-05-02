import React, { Fragment } from "react";
import {
	Header,
	Main,
	Footer,
	Courses,
	Lessons,
	Services,
	Contacts,
} from "../../components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";
import { NotFound } from "../notfound";

const App = () => {
	const setDemension = React.useState({
		width: window.innerWidth,
		height: window.innerHeight,
		scrollY: window.scrollY
	})[1];
	React.useEffect(() => {
		const debouncedHandleResize = debounce(function handleResize() {
			setDemension({
				width: window.innerWidth,
				height: window.innerHeight,
				scrollY: window.scrollY
			});
		}, 16);
		window.addEventListener("scroll", debouncedHandleResize);
		window.addEventListener("resize", debouncedHandleResize);
		return () => {
			window.removeEventListener("scroll", debouncedHandleResize)
			window.removeEventListener("resize", debouncedHandleResize);
		};
	});
	return (
		<Fragment>
			<Router>
				<Route path="/" component={Header} />
				<Switch>
					<Route exact path={["/", "/main"]} component={Main} />
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
