import React from "react";
import "./style.css";
import courses from "./courses.json";

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => {
		images[item.replace("./", "")] = r(item).default;
	});
	return images;
}
const images = importAll(require.context("./images", false, /\.svg$/));

const Course = () => (
	<div id="course">
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
							<h2 dangerouslySetInnerHTML={{ __html: course.title }}></h2>
							<p>{course.duration}</p>
							<div className="arrow"></div>
						</li>
					);
				})}
			</ul>
			<ul>
				{courses
					.slice(Math.ceil(courses.length / 2))
					.map((course, i) => {
						return (
							<li
								key={i}
								style={{
									backgroundImage: `url(${images[course.img]})`,
								}}
							>
								<h2 dangerouslySetInnerHTML={{ __html: course.title }}></h2>
								<p>{course.duration}</p>
								<div className="arrow"></div>
							</li>
						);
					})}
			</ul>
		</div>
	</div>
);
export { Course };
