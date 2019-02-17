import ReactDOM from 'react-dom';

import './PostListNavPortal.scss';

const PostListNavPortal = ({ children }) => {
  const el = document.getElementById('post-list-page-nav');
  return ReactDOM.createPortal(children, el);
};

export default PostListNavPortal;
