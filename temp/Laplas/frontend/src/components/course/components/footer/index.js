import styled from "styled-components";

const Container = styled.div`
	position: relative;
	width: 30vw;
	height: 30vw;
	background: radial-gradient(
		63% 63% at 25% 19%,
		#546ca4 0%,
		#0691a9 55%,
		#1f254a 135%
	);
	border-radius: 100%;
	margin-top: 3vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const Circle = styled.div`
	position: absolute;
	left: -2vw;
	top: 5%;
	border: 1px solid #f5f5f7;
	width: 95%;
	height: 95%;
	border-radius: 100%;
`;
const CirclePrice = styled.div`
  position: absolute;
	right: -3vw;
	top: 0;
	border: 1px solid #f5f5f7;
	width: 30%;
	height: 30%;
	border-radius: 100%;
  color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: calc(4px + (16 - 4) * ((100vw - 300px) / (1524 - 300)));;
`
const SingUpBtn = styled.a`
	position: relative;
	width: 18vw;
	height: 3.1vw;
	border: 1px solid #f5f5f7;
	border-radius: 25px;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: calc(4px + (18 - 4) * ((100vw - 300px) / (1524 - 300)));
	font-weight: 700;
	z-index: 1;
`;
const Footer = ({price}) => (
	<Container>
		<Circle />
    <CirclePrice>стоимость одного занятия {price}₽</CirclePrice>
		<SingUpBtn href="https://vk.me/laplas.official" className = "cursorPointer">Записаться</SingUpBtn>
	</Container>
);
export { Footer };
