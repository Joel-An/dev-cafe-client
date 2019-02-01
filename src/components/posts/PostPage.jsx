import React from 'react';
import CommentArea from '../comments/CommentArea';
import withPostContainer from '../../containers/PostContainer';

const Post = (props) => {
  const { postId, entities } = props;
  const { posts, categories, users } = entities;

  const post = posts[postId];

  if (!post) {
    return <div>글이 없어!</div>;
  }

  const { title } = post;
  const author = users[post.author].profileName;
  const category = categories[post.category].name;
  const contents = post.contents || 'Loading...';

  return (
    <div>
      <p>
        제목 : {title}<br/>
        카테고리 : {category}<br/>
        작성자 : {author}<br/>
        내용 : {contents}
      </p>
      <CommentArea
        postId={postId}
      />
    </div>
  );
};

export default withPostContainer(Post);
