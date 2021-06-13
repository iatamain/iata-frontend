import React from "react";
import styled from "styled-components";
import contactsImg from "./contacts.svg";

const H1 = styled.h1`
	position: relative;
	margin-top: 0px;
	margin-bottom: 100px;
	top: 100px;
	margin-left: 200px;
	text-transform: uppercase;
	color: #f5f5f7;
  align-self: flex-start;
`;
const Container = styled.div`
    width: 100%;
	background: #1f254a;
	background-image: url(${contactsImg});
	background-size: 100% 100%;
	background-position: 0 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Blocks = styled.div`
	width: 75%;
	position: relative;
	margin-top: 90px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
    @media (max-width: 1110px){
        width: 93%;
    }
    @media (max-width: 900px){
        flex-direction: column;
        align-items: center;
    }
`;
const Block = styled.div`
	position: relative;
	width: 48%;
    min-width: 400px;
	border: 1px solid #f5f5f7;
	border-radius: 5px;
	padding: 37px 0 20px 34px;
	box-sizing: border-box;
	margin-bottom: 4%;
	color: #f5f5f7;
	&::before {
		content: "Адреc";
		position: absolute;
		left: -20px;
		top: -2%;
		transform-origin: right;
		transform: translateX(-100%) rotate(-90deg);
		font-size: calc(11px + (24 - 11) * ( (100vw - 300px) / ( 1524 - 300) ));
		font-weight: 400;
	}
`;
const Label = styled.div`
	font-size: calc(9px + (18 - 9) * ( (100vw - 300px) / ( 1524 - 300) ));
	font-weight: 500;
	cursor: pointer;
`;
const Content = styled.div`
	font-size: calc(13px + (34 - 13) * ( (100vw - 300px) / ( 1524 - 300) ));
	font-weight: 500;
	margin-bottom: 30px;
	cursor: pointer;
`;
const Social = styled(Block)`
    top: -90px;
    @media (max-width: 900px){
        top: 0px;
    }
`;
const Contacts = () => (
	<Container>
		<H1>Контакты</H1>
		<Blocks>
			<Block style={{ height: "calc(6vw + 70px)" }}>
				<Label>Город</Label>
				<Content>Москва</Content>
			</Block>
			<Block>
				<Label>Телефон</Label>
				<Content>+7 (978) 715-97-17</Content>
				<Label>Почта</Label>
				<Content>laplas.adm@gmail.com</Content>
			</Block>
			<Social>
				<Label>Facebook</Label>
				<Content>@laplas.adm</Content>
				<Label>Instagram</Label>
				<Content>@laplas.adm</Content>
				<Label>Telegram</Label>
				<Content>@laplasoffical</Content>
				<Label>Вконтакте</Label>
				<Content>laplas.offical</Content>
			</Social>
		</Blocks>
	</Container>
);
export { Contacts };
