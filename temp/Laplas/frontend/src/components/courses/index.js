import React from "react";
import "./style.css";
import courses from "../../data/courses.json";
import { Link } from "react-router-dom";
import { ArrowBtn } from "../../components/arrowBtn";
import styled from "styled-components";

const NewArrowBtn = styled(ArrowBtn)`
	position: absolute;
	right: 25px;
	top: 50%;
	transform: translate(0, -50%);
`;

function importAll(r) {
	let images = {};
	r.keys().map((item) => {
		return images[item.replace("./", "")] = r(item).default;
	});
	return images;
}
const images = importAll(require.context("./images", false, /\.svg$/));

const Courses = () => (
	<div id="courses">
		<div className="wrapper">
			<h1>Курсы</h1>
			<ul>
				{courses.slice(0, Math.ceil(courses.length / 2)).map((course, i) => {
					return (
						<li
							key={i}
							style={{
								backgroundImage: `url(${images[course.img]})`,
							}}
						>
							<Link to={`courses/${course.localName}`} onClick = {()=>{window.scrollTo(0, 0)}}>
								<h2 dangerouslySetInnerHTML={{ __html: course.title }}></h2>
								<p>{course.duration}</p>
								<NewArrowBtn />
							</Link>
						</li>
					);
				})}
			</ul>
			<ul>
				{courses.slice(Math.ceil(courses.length / 2)).map((course, i) => {
					return (
						<li
							key={i}
							style={{
								backgroundImage: `url(${images[course.img]})`,
							}}
						>
							<Link to={`courses/${course.localName}`} onClick = {()=>{window.scrollTo(0, 0)}}>
								<h2 dangerouslySetInnerHTML={{ __html: course.title }}></h2>
								<p>{course.duration}</p>
								<NewArrowBtn />
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	</div>
);
export { Courses };
