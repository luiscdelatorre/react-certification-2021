import styled from 'styled-components';
import colors from '../../config/colors';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  font-size: 1.6rem;
`;

const FormInput = styled.input`
  width: 100%;
`;

const FormSubmit = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: ${colors.gray100};
  height: 5.6rem;
  width: 10rem;
  text-align: center;
  position: relative;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const FormError = styled.p`
  color: ${(props) => props.theme.formError};
  width: 100%;
`;

const Spinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  svg {
    animation-name: spinner-animation;
    animation-timing-function: ease-in;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    font-size: 2.4rem;
  }
`;

const Styled = {
  FormGroup,
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
  FormError,
  Spinner,
};
export default Styled;
