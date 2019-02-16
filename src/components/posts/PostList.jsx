import React from 'react';
import { connect } from 'react-redux';

import withPostListContainer from '../../containers/PostListContainer';
import { connectComponent } from '../../utils';

import { fetchNextPagePosts as fetchNextPagePostsAction } from '../../store/actions/posts';


import PostListItem from './PostListItem';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

class PostList extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentDidUpdate() {
    const { postsMeta } = this.props;
    const { scrollHeight, offsetHeight } = document.body;

    if (scrollHeight === offsetHeight) {
      // 스크롤 바가 없을 때는 스크롤 이벤트가 발생하지 않는다.

      const hasNextPageUrl = postsMeta && !postsMeta.isFetchingPosts && postsMeta.nextPageUrl;
      if (hasNextPageUrl) {
        // fetch가 완료되었는데도, nextPageUrl이 있다면 fetch한다.
        this.fetchNextPage();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  fetchNextPage = () => {
    const { postsMeta, fetchNextPagePosts, categoryId } = this.props;
    fetchNextPagePosts(postsMeta.nextPageUrl, categoryId);
  }

  onScroll = () => {
    const { scrollHeight, offsetHeight } = document.body;
    const { scrollY } = window;
    if (scrollHeight - (scrollY + offsetHeight) < 500) {
      const { postsMeta } = this.props;
      if (postsMeta && !postsMeta.isFetchingPosts && postsMeta.nextPageUrl) {
        this.fetchNextPage();
      }
    }
  }

  render() {
    const { postsMeta, fetchNextPagePosts, categoryId } = this.props;

    if (!postsMeta || (postsMeta.isFetchingPosts && postsMeta.ids.length === 0)) {
      return <LoadingSpinner/>;
    }

    if (!postsMeta.isFetchingPosts && (postsMeta.ids.length === 0)) {
      return <p>글이 없어!</p>;
    }

    return (
    <>
    <ul className="postList" >
      {postsMeta.isFetchingNewPost && <LoadingSpinner key="fetchingNewPost"/>}
      {postsMeta.ids.map(postId => (
        <PostListItem postId={postId} key={postId}/>
      ))
      }
      {postsMeta.isFetchingPosts && <LoadingSpinner key="fetchingPosts"/>}
    </ul>
    { !!postsMeta.nextPageUrl || <span>
      이젠 끝이다!
    </span>
    }
    </>
    );
  }
}

const mapDispatchToProps = { fetchNextPagePosts: fetchNextPagePostsAction };

export default connectComponent(PostList,
  [
    connect(null, mapDispatchToProps),
    withPostListContainer,
  ]);
