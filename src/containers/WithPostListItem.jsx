import { connect } from 'react-redux';

import { selectPostById } from '../store/selectors/posts';

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  const post = selectPostById(state, postId);

  return { post };
};

export default function withPostListItem(Component) {
  return connect(mapStateToProps)(Component);
}
