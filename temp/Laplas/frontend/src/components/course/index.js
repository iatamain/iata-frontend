import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import courses from "../../data/courses.json";
import { ArrowBtn } from "../../components/arrowBtn";
import { Header } from "./components/header/index.js";
import { CourseSections } from "./components/courseSections/index.js";
import { HowGoesCourse } from "./components/howGoesCourse";
import { Footer } from "./components/footer";
const NewArrowBtn = styled(ArrowBtn)`
	position: absolute;
	top: 1.3vw;
	left: 1.8vw;
	transform: rotate(180deg);
	transition: 1s;
	@media (max-width: 900px) {
		transform: scale(0.7) rotate(180deg);
	}
`;
const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	background: #1f254a;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 14vw 50px 14vw;
	box-sizing: border-box;
	@media (max-width: 900px) {
		padding: 0 5vw 50px 5vw;
	}
`;
const About = styled.p`
	font-size: calc(14px + (24 - 14) * ((100vw - 600px) / (1524 - 600)));
	color: #f5f5f7;
	width: 80vw;
	max-width: 870px;
	align-self: flex-start;
	padding: 7vw 0;
	& p {
		display: inline-block;
		margin: 0;
		padding: 5px;
		border: 1px solid #f5f5f7;
		border-radius: 50px;
	}
`;
const Course = () => {
	const { course } = useParams();
	const currentCourse = courses.find((el) => el.localName === course);

	return (
		<Container>
			<Link to="/courses">
				<NewArrowBtn />
			</Link>
			<Header startDate={currentCourse.start} title={currentCourse.title} />
			<About dangerouslySetInnerHTML={{ __html: currentCourse.about }} />
			<CourseSections courseSections={currentCourse.courseSections} />
			<HowGoesCourse howGoesCourse={currentCourse.howGoesCourse} />
			<Footer price = {currentCourse.price}/>
		</Container>
	);
};
export { Course };
