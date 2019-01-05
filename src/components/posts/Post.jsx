import React from 'react';
import CommentArea from '../comments/CommentArea';
import withPostContainer from '../../containers/PostContainer';

const Post = (props) => {
  console.log(props);
  const { postId } = props;
  const error = true;
  return (
    <div>
      {error
        ? '글이 없어!'
        : <p>
            제목 : {post.title}<br/>
            카테고리 : {post.category.name}<br/>
            작성자 : {post.author.profileName}<br/>
            내용 : {post.contents}
        </p>
      }
      <CommentArea
        post={postId}
      />
    </div>
  );
};

export default withPostContainer(Post);
