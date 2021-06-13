import styled from "styled-components";
import { Fragment } from "react";
import chatImg from "./chat.svg";
import feedback from "./feedback.svg";

const H2 = styled.h2`
	font-size: calc(20px + (36 - 20) * ((100vw - 300px) / (1524 - 300)));
	font-weight: 700;
	color: #f5f5f7;
	text-transform: uppercase;
	align-self: flex-end;
	@media (max-width: 900px) {
		font-weight: 500;
	}
`;
const Container = styled.div`
	position: relative;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 30px;
`;
const Section = styled.div`
	border-top: 3px solid #9b256e;
	padding-top: 20px;
	font-size: calc(12px + (20 - 12) * ((100vw - 600px) / (1524 - 600)));
	color: #f5f5f5;
	font-weight: 700;
	& div{
		margin-bottom: 30px;
		font-weight: 700;
		margin-right: 80px;
		width: 100%;
	}
`;
const Img = styled.img`
	position: relative;
	top: 10px;
	left: 30px;
	margin-top: -20px;
	cursor: pointer;
`;

const HowGoesCourse = ({ howGoesCourse }) => {
	let content = [];
	for (let i = 0; i < howGoesCourse.length; i++) {
		content.push(
			<Section key = {i} dangerouslySetInnerHTML={{ __html: howGoesCourse[i] }} />
		);
		if (i === 4) {
			content.push(
				<Section key = "other">
					<div>Отзывы о курсе: <Img src={chatImg} /></div>
					<div>Отзывы о<br/> преподавателе: <Img src={feedback} /></div>
				</Section>
			);
		}
	}
	return (
		<Fragment>
			<H2>Как проходит курс</H2>
			<Container>{content}</Container>
		</Fragment>
	);
};
export { HowGoesCourse };
