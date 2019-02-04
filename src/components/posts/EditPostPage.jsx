import React from 'react';

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

export default EditPostPage;
