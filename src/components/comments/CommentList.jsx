import React from 'react';
import { connect } from 'react-redux';

import CommentListItem from './CommentListItem';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import withCommentsMetaContainer from '../../containers/CommentsMetaContainer';
import { connectComponent } from '../../utils';

import { fetchNextPageComments as fetchNextPageCommentsAction } from '../../store/actions/comments';

class CommentList extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const { scrollHeight, offsetHeight } = document.body;
    const { scrollY } = window;
    if (scrollHeight - (scrollY + offsetHeight) < 700) {
      const { commentsMeta } = this.props;
      if (commentsMeta && !commentsMeta.isFetchingComments && commentsMeta.nextPageUrl) {
        this.fetchNextPage();
      }
    }
  }

  fetchNextPage = () => {
    const { commentsMeta, fetchNextPageComments, postId } = this.props;
    fetchNextPageComments(commentsMeta.nextPageUrl, postId);
  }

  render() {
    const { commentsMeta } = this.props;

    if (!commentsMeta || (commentsMeta.isFetchingComments && commentsMeta.ids.length === 0)) {
      return <LoadingSpinner center/>;
    }

    return (
      <ul className="CommentList">
        {commentsMeta.ids.map(id => <CommentListItem commentId={id} key={id}/>)}
        {commentsMeta.isFetchingComments && <LoadingSpinner key="isFetchingComments" center/>}
        {commentsMeta.isFetchingNewParentComment && <LoadingSpinner key="isFetchingNewComment" center/>}
      </ul>
    );
  }
}

const mapDispatchToProps = { fetchNextPageComments: fetchNextPageCommentsAction };

export default connectComponent(CommentList,
  [
    connect(null, mapDispatchToProps),
    withCommentsMetaContainer,
  ]);
