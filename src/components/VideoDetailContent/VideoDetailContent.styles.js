import styled from 'styled-components';
import device from '../../config/device';

const DescriptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DescriptionLogo = styled.img`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
`;

const Title = styled.h5`
  color: ${(props) => props.theme.cardTitle};
`;

const Subtitle = styled.h6`
  color: ${(props) => props.theme.textSecondary};
`;

const Description = styled.p`
  margin-top: 1rem;
  color: ${(props) => props.theme.cardSubtitle};
  @media ${device.laptop} {
    padding-left: 5rem;
  }
`;

const Styled = {
  DescriptionContainer,
  DescriptionLogo,
  Description,
  Title,
  Subtitle,
};

export default Styled;
