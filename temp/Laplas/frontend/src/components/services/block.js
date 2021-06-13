import styled from "styled-components";
const BigNumber = styled.p`
	display: inline;
	font-size: 64px;
	font-weight: 500;
`;
const Block = (props) => {
	return (
		<div style={{ fontWeight: "500", fontSize: "24px" }}>
			<BigNumber>{props.n}</BigNumber>
			{props.children}
		</div>
	);
};
export { Block };
