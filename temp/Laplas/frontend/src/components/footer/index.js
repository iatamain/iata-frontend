import React from "react";
import styled from "styled-components";
import bird from "../../images/bird.svg";
import facebookImg from "../../images/facebook.svg";
import telegramImg from "../../images/telegram.svg";
import instagramImg from "../../images/instagram.svg";
import vkImg from "../../images/vk.svg";

const Container = styled.div`
	background: #1f254a;
	width: 100%;
	border-top: 1px solid #f5f5f7;
	display: flex;
	justify-content: center;
`;
const Table = styled.div`
	width: 70%;
	margin-top: 80px;
	display: flex;
	justify-content: space-between;
`;
const Column = styled.div``;
const Social = styled.div`
	display: flex;
	justify-content: space-between;
	width: 130px;
	margin-top: 60px;
	& img {
		cursor: pointer;
	}
`;
const H3 = styled.h3`
	color: #f5f5f7;
	font-size: 16;
	font-weight: 600;
	cursor: pointer;
`;
const Elem = styled.p`
	color: #f5f5f7;
	font-size: 14;
	font-weight: 400;
	cursor: pointer;
`;
const Logo = styled.img`
	margin-top: 15px;
`;
const Footer = () => {
	return (
		<Container>
			<Table>
				<Column>
					<Logo src={bird} width="130" height="60" />
					<Social>
						<img src={facebookImg} />
						<img src={telegramImg} />
						<img src={instagramImg} />
						<img src={vkImg} />
					</Social>
				</Column>
				<Column>
					<H3>Курсы</H3>
					<Elem>Высшая математика</Elem>
					<Elem>Дифференциальные уравнения</Elem>
					<Elem>Программирование</Elem>
					<Elem>Абстрактная алгебра</Elem>
					<Elem>Английский язык</Elem>
					<Elem>
						Теория вероятностей & <br /> статистика
					</Elem>
				</Column>
				<Column>
					<H3>Индивидуальные занятия</H3>
					<Elem>Университет</Elem>
					<Elem>Школа</Elem>
				</Column>
				<Column>
					<H3>Услуги</H3>
					<Elem>IT</Elem>
					<Elem>Графический дизайн</Elem>
				</Column>
				<Column>
					<H3>Контакты</H3>
				</Column>
			</Table>
		</Container>
	);
};

export { Footer };
