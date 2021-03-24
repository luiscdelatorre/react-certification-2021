import React from 'react';
import { useHistory } from 'react-router';
import { useSearch } from '../../providers/Search';
import Styled from './TagsList.styles';

const TagsList = ({ tags }) => {
  const { search } = useSearch();
  const history = useHistory();

  const searchTag = (query) => {
    search(query);
    history.push('/');
  };

  return (
    <Styled.TagList>
      {tags
        .filter((tag) => tag.length > 2 && tag.length < 20)
        .map((tag) => {
          return (
            <Styled.TagListItem key={`${tag}`}>
              <Styled.Tag
                type="button"
                onClick={() => searchTag(tag)}
                data-testid="tag-button"
              >
                {tag}
              </Styled.Tag>
            </Styled.TagListItem>
          );
        })}
    </Styled.TagList>
  );
};

export default TagsList;
