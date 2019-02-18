import React from 'react';
import { connect } from 'react-redux';

import withPostListContainer from '../../containers/PostListContainer';
import { connectComponent } from '../../utils';

import { fetchNextPagePosts as fetchNextPagePostsAction } from '../../store/actions/posts';

import PostListItem from './PostListItem';
import PostListNavPortal from './PostListNavPortal';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const createRef = () => React.createRef();

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageRefs: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { postsMeta } = props;

    if (!postsMeta) {
      return null;
    }

    const { pages } = postsMeta;
    const { pageRefs } = state;

    if (pages.length > pageRefs.length) {
      const diff = pages.length - pageRefs.length;
      const newRefs = new Array(diff).fill(true).map(() => createRef());
      return {
        pageRefs: [...pageRefs, ...newRefs],
      };
    }

    return null;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
    this.fetchNextPageWhenCannotScroll();
  }

  componentDidUpdate() {
    this.fetchNextPageWhenCannotScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  fetchNextPageWhenCannotScroll = () => {
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

  goToPage = index => () => {
    const { pageRefs } = this.state;
    window.scrollTo(0, pageRefs[index].current.offsetTop);
  }

  render() {
    const { postsMeta, fetchNextPagePosts, categoryId } = this.props;
    const { pageRefs } = this.state;

    if (!postsMeta || (postsMeta.isFetchingPosts && postsMeta.ids.length === 0)) {
      return <LoadingSpinner/>;
    }

    if (!postsMeta.isFetchingPosts && (postsMeta.ids.length === 0)) {
      return <p>글이 없어!</p>;
    }

    const { pages } = postsMeta;

    return (
    <>
    <PostListNavPortal>
      { pages.map((id, index) => (
        <button type="button" key={`pageNavButton${id}`} onClick={this.goToPage(index)}>
          {index + 1}
        </button>
      ))
      }
    </PostListNavPortal>
    <ul className="postList" >
      {postsMeta.isFetchingNewPost && <LoadingSpinner key="fetchingNewPost"/>}
      {postsMeta.ids.map((postId) => {
        const pageIndex = pages.indexOf(postId);
        if (pageIndex !== -1) {
          return (
            <PostListItem refProp={pageRefs[pageIndex]} postId={postId} key={postId}/>
          );
        }
        return (
          <PostListItem postId={postId} key={postId}/>
        );
      })
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
