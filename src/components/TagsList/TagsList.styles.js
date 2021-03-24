import styled from 'styled-components';

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const TagListItem = styled.li`
  display: inline-block;
  padding: 0 1rem 1rem 0;
`;

const Tag = styled.button`
  background-color: ${(props) => props.theme.tagSecondaryBackground};
  color: ${(props) => props.theme.tagSecondaryText};
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: ${(props) => props.theme.borderRadiusSm};
  letter-spacing: 0;
  margin: 0;
  text-transform: capitalize;
  line-height: 1.4rem;
`;

const Styled = { TagList, TagListItem, Tag };
export default Styled;
