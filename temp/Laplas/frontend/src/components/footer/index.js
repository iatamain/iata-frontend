import React from "react";
import styled from "styled-components";
import bird from "../../images/bird.svg";
import facebookImg from "../../images/facebook.svg";
import telegramImg from "../../images/telegram.svg";
import instagramImg from "../../images/instagram.svg";
import vkImg from "../../images/vk.svg";
import { Link } from "react-router-dom";
const Container = styled.div`
	background: #1f254a;
	width: 100%;
	border-top: 1px solid #f5f5f7;
	display: flex;
	justify-content: center;
	@media (max-width: 750px) {
		justify-content: flex-start;
	}
`;
const Table = styled.div`
	width: 70%;
	margin-top: 80px;
	display: flex;
	justify-content: space-between;
	padding-bottom: 10px;
	@media (max-width: 750px) {
		padding-left: 20px;
		flex-direction: column;
		justify-content: space-around;
		margin-top: 0px;
	}
`;
const Column = styled.div`
	margin: 0 10px;
	@media (max-width: 750px) {
		display: none;
	}
`;
const SocialBlock = styled.div`
	margin: 0 10px;
`;
const Social = styled.div`
	display: flex;
	justify-content: space-between;
	width: 130px;
	margin-top: 60px;
	@media (max-width: 750px) {
		margin: 20px 0px;
		width: 30vw;
		min-width: 200px;
	}
`;
const Contacts = styled.div`
	display: none;
	@media (max-width: 750px) {
		display: block;
		color: #f5f5f7;
	}
`;
const H3 = styled.h3`
	color: #f5f5f7;
	font-size: calc(10px + (16 - 10) * ((100vw - 300px) / (1524 - 300)));
	font-weight: 600;
`;
const Elem = styled.p`
	color: #f5f5f7;
	font-size: calc(8px + (14 - 8) * ((100vw - 300px) / (1524 - 300)));
	font-weight: 400;
`;
const Logo = styled.img`
	margin-top: 15px;
`;
const Phone = styled.a`
	color: #f5f5f7;
`;
const Email = styled(Phone)``;
const Footer = () => {
	return (
		<Container>
			<Table>
				<SocialBlock>
					<Logo src={bird} width="130" height="60" />
					<Contacts>
						<Phone href="tel:+7(978) 715-97-17">+7(978) 715-97-17</Phone>
						<br />
						<Email href="mailto:LAPLAS.ADM@GMAIL.COM">
							LAPLAS.ADM@GMAIL.COM
						</Email>
					</Contacts>
					<Social>
						<a
							href="https://www.facebook.com/groups/laplas.official"
							target="_blank"
						>
							<img className = "cursorPointer" src={facebookImg} />
						</a>
						<a href="https://t.me/laplasoffical" target="_blank">
							<img className = "cursorPointer" src={telegramImg} />
						</a>
						<a href="https://www.instagram.com/laplas.adm/" target="_blank">
							<img className = "cursorPointer" src={instagramImg} />
						</a>
						<a href="https://vk.com/laplas.official" target="_blank">
							<img className = "cursorPointer" src={vkImg} />
						</a>
					</Social>
				</SocialBlock>
				<Column>
					<H3 className = "cursorPointer">
						<Link to="/courses">Курсы</Link>
					</H3>
					<Elem className = "cursorPointer"><Link to="/courses/higher_mathematics">Высшая математика</Link></Elem>
					<Elem className = "cursorPointer"><Link to="/courses/diff_equations">Дифференциальные уравнения</Link></Elem>
					<Elem className = "cursorPointer"><Link to="/courses/algorithmics">Алгоритмика</Link></Elem>
					<Elem className = "cursorPointer"><Link to="/courses/abstract_algebra">Абстрактная алгебра</Link></Elem>
					<Elem className = "cursorPointer"><Link to="/courses/english">English для технарей</Link></Elem>
					<Elem className = "cursorPointer"><Link to="/courses/tfcv">ТФКП</Link></Elem>
					<Elem className = "cursorPointer"><Link to="/courses/physics">Физика</Link></Elem>
				</Column>
				<Column>
					<H3 className = "cursorPointer">
						<a href="https://vk.me/laplas.official" target="_blank">
							Индивидуальные занятия
						</a>
					</H3>
					<Elem className = "cursorPointer">
						<a href="https://vk.me/laplas.official" target="_blank">
							Университет
						</a>
					</Elem>
					<Elem className = "cursorPointer">
						<a href="https://vk.me/laplas.official" target="_blank">
							Школа
						</a>
					</Elem>
				</Column>
				<Column>
					<H3 className = "cursorPointer">
						<a href="https://vk.me/laplas.official" target="_blank">
							Услуги
						</a>
					</H3>
					<Elem className = "cursorPointer">
						<a href="https://vk.me/laplas.official" target="_blank">
							IT
						</a>
					</Elem>
					<Elem className = "cursorPointer">
						<a href="https://vk.me/laplas.official" target="_blank">
							Графический дизайн
						</a>
					</Elem>
				</Column>
				<Column>
					<H3 className = "cursorPointer">
						<Link to="/contacts">Контакты</Link>
					</H3>
				</Column>
			</Table>
		</Container>
	);
};

export { Footer };
