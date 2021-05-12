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
	padding: 0 215px;
	box-sizing: border-box;
`;
const H1 = styled.h1`
	margin: 300px 0 0 0;
	width: 600px;
	color: white;
	text-align: center;
	text-transform: uppercase;
	font-family: Montserrat;
	font-weight: 700;
	font-size: 48px;
	z-index: 1;
`;
const Circle = styled.div`
	position: absolute;
	left: -40px;
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
	margin-top: -165px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	& div{
		margin-bottom: 120px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;
const SingUpBtn = styled.a`
  width: 270px;
  height: 47px;
  border: 1px solid #F5F5F7;
  border-radius: 25px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
	font-weight: 700;
	z-index: 1;
`
const StartCourse = styled.p`
	font-size: 15px;
	font-weight: 700;
	margin-top: 40px;
	color: white;
	font-size: 18px;
	font-weight: 700;
`
const About = styled.p`
	font-size: 24px;
	color: white;
	width: 870px;
	align-self: flex-start;
	padding: 115px 0;
	& p{
		display: inline-block;
		margin: 0;
		padding: 5px;
		border: 1px solid white;
		border-radius: 50px;
	}
`
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
				<div>
					<SingUpBtn href = "https://vk.me/laplas.official">Записаться</SingUpBtn>
					<StartCourse>{currentCourse.start}</StartCourse>
				</div>
			</Header>
			<About  dangerouslySetInnerHTML={{ __html: currentCourse.about }} />
		</Container>
	);
};
export { Course };