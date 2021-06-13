import { Fragment } from "react";
import styled from "styled-components";

const H2 = styled.h2`
	font-size: calc(20px + (36 - 20) * ((100vw - 300px) / (1524 - 300)));
	font-weight: 700;
	color: #f5f5f7;
	text-transform: uppercase;
	align-self: flex-start;
	@media (max-width: 900px) {
		font-weight: 500;
	}
`;
const Container = styled.div`
	position: relative;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(
		${({ courseSections }) => (courseSections.length % 2 ? 3 : 2)},
		1fr
	);
	grid-gap: 20px;
`;
const Section = styled.div`
	position: relative;
	width: 100%;
	margin-top: 30px;
	box-sizing: border-box;
	border-radius: 5px;
	font-size: calc(12px + (20 - 12) * ((100vw - 600px) / (1524 - 600)));
	font-weight: 500;
	color: #f5f5f7;
	&::before {
		content: "";
		display: block;
		position: absolute;
		top: -30px;
		width: 0px;
		height: 0px;
		border: 10px solid transparent;
		border-left: 20px solid #f5f5f5;
	}
	@media (max-width: 900px) {
		margin-top: 15px;
		&:before {
			border: 5px solid transparent;
			border-left: 10px solid #f5f5f5;
			top: -15px;
		}
	}
`;
const CourseSections = ({ courseSections }) => (
	<Fragment>
		<H2>Основные разделы курса</H2>
		<Container courseSections={courseSections}>
			{courseSections.map((section, i) => (
				<Section key = {i}>{section}</Section>
			))}
		</Container>
	</Fragment>
);
export { CourseSections };
