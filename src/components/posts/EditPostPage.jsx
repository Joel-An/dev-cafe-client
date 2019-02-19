import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import EditPost from './EditPost';

const EditPostPage = (props) => {
  const { match } = props;
  const { id: postId } = match.params;

  return (
    <div>
      <EditPost postId={postId}/>
    </div>
  );
};

EditPostPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default EditPostPage;
