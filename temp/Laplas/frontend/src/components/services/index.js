import React from "react";
import styled from "styled-components";
import { Block } from "./block"
const Container = styled.div`
	position: relative;
	margin-top: 50px;
	padding: 0px 214px 0px 214px;
`;
const H1 = styled.h1`
	position: relative;
	margin-top: 0px;
	margin-bottom: 80px;
	top: 50px;
	text-transform: uppercase;
	align-self: flex-start;
`;
const Nav = styled.div`
	display: flex;
	margin-bottom: 138px;
`;
const RedBtn = styled.div`
	padding: 5px 50px 5px 50px;
	border: 1px solid #9b256e;
	border-radius: 50px;
	color: #9b256e;
	margin-right: 20px;
`;
const AboutIT = styled.p`
	position: relative;
	font-size: 24px;
	width: 90%;
	font-weight: 500;
	&::before {
		content: "IT";
		position: absolute;
		left: -20px;
		top: -2%;
		transform-origin: right;
		transform: translateX(-100%) rotate(-90deg);
		font-size: calc(11px + (24 - 11) * ((100vw - 300px) / (1524 - 300)));
		font-weight: 500;
		color: #9b256e;
	}
`;
const ContainerForColumns = styled.div`
  margin-top: 90px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
`;
const Services = () => {
	return (
		<Container>
			<H1>Услуги</H1>
			<Nav>
				<RedBtn className = "cursorPointer">IT</RedBtn>
				<RedBtn className = "cursorPointer">Дизайн</RedBtn>
			</Nav>
			<AboutIT>
				Веб-студия LAPLAS воплотит ваши идеи в стильном и современном виде!
				Создаём цифровые продукты по доступным ценам.
				<br />
				<br />
				Для того чтобы реализовать любой проект – сайт, приложение или игру, мы
				проводим <font color="#9b256e">7 этапов разработки:</font>
			</AboutIT>
			<ContainerForColumns>
				<Column>
					<Block n = "00">
					  Брифинг и техническое задание: по видеосвязи определяем с
						клиентом тип продукта, функционал, начальную смысловую упаковку,
						стиль дизайна и план реализации.
					</Block>
					<Block n = "02">
						Проектирование: находим лучшие решения для реализации ваших идей,
						выбираем технологии и инструменты, создаём письменный и детальный
						прототип, создавая структуру продукта и прописывая все тексты.
					</Block>
					<Block n = "04">
						Написание кода: программную реализацию макета посредством лучших
						технологий.
					</Block>
				</Column>
				<Column>
					<Block n = "01"> Аналитика: анализируем рынок и целевую аудиторию.</Block>
					<Block>
						03 Дизайн: детально прорабатываем концепцию дизайна, разрабатываем
						версии сайта для ПК и мобильных устройств, создаём детальный макет и
						презентуем для внесения правок.
					</Block>
					<Block n = "05">
						Тестирование: проверяем полное функционирование продукта на
						наличие багов, производим отладку
					</Block>
					<Block n = "06">
						Завершение: презентуем готовый проект и передаём права доступа.
					</Block>
				</Column>
			</ContainerForColumns>
		</Container>
	);
};
export { Services };
