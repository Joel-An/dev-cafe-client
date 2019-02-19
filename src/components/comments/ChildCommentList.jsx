import React from 'react';
import PropTypes from 'prop-types';

import CommentListItem from './CommentListItem';
import { commentIdPropType } from '../../containers/WithComment';

import './ChildCommentList.scss';

const ChildCommentList = (props) => {
  const { childCommentIds } = props;

  if (!childCommentIds.length) {
    return null;
  }

  return (
    <ul className="ChildCommentList">
      {childCommentIds.map(childId => <CommentListItem commentId={childId} key={childId}/>)}
    </ul>
  );
};

ChildCommentList.propTypes = {
  childCommentIds: PropTypes.arrayOf(commentIdPropType).isRequired,
};

export default ChildCommentList;
