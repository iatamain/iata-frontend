import styled from "styled-components";

const Container = styled.div`
	position: relative;
	width: 52vw;
	height: 52vw;
	background: radial-gradient(
		63% 63% at 25% 19%,
		#546ca4 0%,
		#0691a9 55%,
		#1f254a 135%
	);
	border-radius: 100%;
	margin-top: -11vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	& div {
		margin-bottom: 7vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;
const Circle = styled.div`
	position: absolute;
	left: -2vw;
	border: 1px solid #F5F5F7;
	width: 100%;
	height: 100%;
	border-radius: 100%;
`;
const SingUpBtn = styled.a`
	width: 18vw;
	height: 3.1vw;
	border: 1px solid #f5f5f7;
	border-radius: 25px;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: calc(4px + (18 - 4) * ( (100vw - 300px) / ( 1524 - 300) ));
	font-weight: 700;
	z-index: 1;
`;
const StartCourse = styled.p`
	font-weight: 700;
	margin-top: 2.6vw;
	color: white;
	font-size: calc(4px + (18 - 4) * ( (100vw - 300px) / ( 1524 - 300) ));
	font-weight: 700;
`;
const H1 = styled.h1`
	margin: 40% 0 0 0;
	width: 40vw;
	color: white;
	text-align: center;
	text-transform: uppercase;
	font-family: Montserrat;
	font-weight: 700;
	font-size: calc(8px + (48 - 8) * ( (100vw - 300px) / ( 1524 - 300) ));
	z-index: 1;
`;
const Header = ({startDate, title}) => (
	<Container>
		<Circle />
		<H1 dangerouslySetInnerHTML={{ __html: title }} />
		<div>
			<SingUpBtn href="https://vk.me/laplas.official">Записаться</SingUpBtn>
			<StartCourse>{startDate}</StartCourse>
		</div>
	</Container>
);
export { Header };
