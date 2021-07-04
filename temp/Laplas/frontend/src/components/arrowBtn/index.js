import styled from "styled-components";

const ArrowBtn = styled.div`
	width: 45px;
	height: 45px;
	border-radius: 50%;
	border: 1px solid #f5f5f7;
	display: flex;
	align-items: center;
	&::before {
		content: "";
		display: block;
		position: relative;
		left: 10px;
		width: 25px;
		height: 3px;
		background: #f5f5f7;
		border-radius: 2px;
	}
	&::after {
		content: "";
		display: block;
		position: relative;
		width: 15px;
		height: 15px;
		border-top: 3px solid #f5f5f7;
		border-right: 3px solid #f5f5f7;
		transform: rotate(45deg);
		border-radius: 2px;
		right: 10px;
	}
	&:hover {
		background: #f5f5f7;
	}
	&:hover::before {
		background: #424f6f;
	}
	&:hover::after {
		border-top: 3px solid #424f6f;
		border-right: 3px solid #424f6f;
	}
`;
export { ArrowBtn }
