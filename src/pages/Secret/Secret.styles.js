import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../config/colors';

const Container = styled.section`
  text-align: center;
  margin: 0 auto;
  padding: 2rem;
  max-width: 100%;
  width: 120rem;
`;

const ButtonLink = styled(Link)`
  border: none;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  padding: 2rem 3rem;
  text-decoration: none;
  margin: 2rem;
  background-color: ${colors.orange400};
  color: ${colors.gray100};
  border-radius: ${(props) => props.theme.borderRadiusLg};
  svg {
    font-size: 1.6rem;
    vertical-align: bottom;
    margin-right: 0.5rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  align-self: flex-start;
`;

const Styled = { ButtonLink, Container, Title };
export default Styled;
