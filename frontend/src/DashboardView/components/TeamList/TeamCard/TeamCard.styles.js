import styled from 'styled-components';
import { colors } from '../../../../colorVariables';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import mediaQueryFor from '../../../../_global_styles/responsive_querie';

const Container = styled(Card)`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	color: ${colors.text};
	background-color: ${colors.button};
	border-radius: 3px;
	transition: background-color 250ms ease-in-out, transform 150ms ease;

	h3 {
		font-size: 1.2rem;
		text-decoration: none;
		position: relative;
		float: left;
		padding-left: 20px;
	}

	p {
		position: relative;
		text-align: right;
		padding-right: 20px;
	}

	:hover {
		background-color: rgba(107, 40, 59, 0.7);
	}
`;

const Info = styled(CardContent)`
	padding: 20px;
`;

const StyledTypography = styled(Typography)`
	color: ${colors.text};

	${mediaQueryFor.xsDevice`
		font-size: .95rem;
	`}
`;

const Prem = styled(Typography)`
	color: ${colors.text};

	${mediaQueryFor.xsDevice`
		display: none;
	`}
`;

export { Container, Info, StyledTypography, Prem };
