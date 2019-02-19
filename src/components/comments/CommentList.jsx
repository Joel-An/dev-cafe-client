import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CommentListItem from './CommentListItem';
import WriteComment from './WriteComment';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import withCommentsMetaContainer from '../../containers/CommentsMetaContainer';
import { postIdPropType } from '../../containers/PostContainer';

import { connectComponent } from '../../utils';

import { fetchNextPageComments as fetchNextPageCommentsAction } from '../../store/actions/comments';

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleExtraCommentForm: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  toggleExtraCommentForm = () => {
    this.setState(prevState => ({
      toggleExtraCommentForm: !prevState.toggleExtraCommentForm,
    }));
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
    const { commentsMeta, postId } = this.props;
    const { toggleExtraCommentForm } = this.state;

    if (!commentsMeta || (commentsMeta.isFetchingComments && commentsMeta.ids.length === 0)) {
      return <LoadingSpinner center/>;
    }

    return (
      <Fragment>
        <ul className="CommentList">
          {commentsMeta.ids.map(id => <CommentListItem commentId={id} key={id}/>)}
          {commentsMeta.isFetchingComments && <LoadingSpinner key="isFetchingComments" center/>}
          {commentsMeta.isFetchingNewParentComment && <LoadingSpinner key="isFetchingNewComment" center/>}
        </ul>
        {commentsMeta.ids.length > 4 && <button type="button" onClick={this.toggleExtraCommentForm}>
          +댓글 달기
        </button>}
        {toggleExtraCommentForm && <WriteComment postId={postId} autofocus key="extraCommentForm"/>}
      </Fragment>

    );
  }
}

CommentList.propTypes = {
  postId: postIdPropType.isRequired,
  fetchNextPageComments: PropTypes.func.isRequired,
};

const mapDispatchToProps = { fetchNextPageComments: fetchNextPageCommentsAction };

export default connectComponent(CommentList,
  [
    connect(null, mapDispatchToProps),
    withCommentsMetaContainer,
  ]);
