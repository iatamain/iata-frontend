import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import courses from "../../data/courses.json";
import { ArrowBtn } from "../../components/arrowBtn";

const NewArrowBtn = styled(ArrowBtn)`
	position: absolute;
	top: 20px;
	left: 28px;
	transform: rotate(180deg);
`;

const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	background: #1f254a;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const H1 = styled.h1`
	position: absolute;
	top: 366px;
	left: 50%;
	transform: translate(-50%, 0);
	margin: 0;
	color: white;
	text-align: center;
	text-transform: uppercase;
`;
const Circle = styled.div`
	position: absolute;
	left: -70px;
	border: 1px solid #fff;
	width: 100%;
	height: 100%;
	border-radius: 100%;
`;
const Header = styled.div`
	position: relative;
	width: 800px;
	height: 800px;
	background: radial-gradient(
		63% 63% at 25% 19%,
		#546ca4 0%,
		#0691a9 55%,
		#1f254a 135%
	);
	border-radius: 100%;
	margin-top: -180px;
`;
const Course = () => {
	const { course } = useParams();
	const currentCourse = courses.find((el) => el.localName === course);

	return (
		<Container>
			<Link to="/courses">
				<NewArrowBtn />
			</Link>
			<Header>
				<Circle />
				<H1 dangerouslySetInnerHTML={{ __html: currentCourse.title }} />
			</Header>
			<p>{currentCourse.about}</p>
		</Container>
	);
};
export { Course };