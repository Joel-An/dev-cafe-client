import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import { sortBy } from 'lodash';
import classNames from 'classnames';

import './postPage.css';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'authorInfo.name'),
  UPVOTES: list => sortBy(list, 'upVotes').reverse(),
  VIEWED: list => sortBy(list, 'viewed').reverse(),
};

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
  const sortClass = classNames('button-inline', {
    'button-active': sortKey === activeSortKey,
  });
  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
    </Button>
  );
};

const Loading = () => <div>Loading...</div>;

const withLoading = Component => ({ isLoading, ...rest }) => {
  return isLoading ? <Loading /> : <Component {...rest} />;
};
const Button = ({ onClick, className = '', children }) => {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
};

const ButtonWithLoading = withLoading(Button);

class PostsPage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchTerm: '',
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false,
    };
  }

  getPosts = (searchTerm, page = 0) => {
    this.setState({ isLoading: true });
    axios
      .get(`/api/v1/search/posts?query=${searchTerm}&page=${page}`)
      .then(result => this._isMounted && this.setPosts(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  };

  setPosts = results => {
    const { hits, page } = results;

    const oldHits = page !== 0 ? this.state.results.hits : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({ results: { hits: updatedHits, page }, isLoading: false });
  };

  onSort = sortKey => {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  };

  onDismiss = id => {
    const isNotId = result => result._id !== id;
    const updatedPosts = this.state.results.hits.filter(isNotId);

    this.setState({ results: { ...this.state.result, hits: updatedPosts } });
  };

  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.getPosts(searchTerm);
    event.preventDefault();
  };

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.getPosts(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      results,
      searchTerm,
      error,
      isLoading,
      sortKey,
      isSortReverse,
    } = this.state;
    const page = (results && results.page) || 0;
    return (
      <div>
        <h2>Posts</h2>
        <div className="page">
          <div className="interactions">
            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}
            >
              SEARCH
            </Search>
          </div>
          {error ? (
            <div className="interactions">
              <p>Something went wrong.</p>
            </div>
          ) : (
            results && (
              <Table
                posts={results.hits}
                sortKey={sortKey}
                isSortReverse={isSortReverse}
                onSort={this.onSort}
                onDismiss={this.onDismiss}
              />
            )
          )}
          <div className="interactions">
            <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => this.getPosts(searchTerm, page + 1)}
            >
              More
            </ButtonWithLoading>
          </div>
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    <button type="submit">{children}</button>
  </form>
);

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      posts,
      pattern,
      sortKey,
      isSortReverse,
      onSort,
      onDismiss,
    } = this.props;
    const largeColumn = { width: '40%' };
    const midColumn = { width: '30%' };
    const smallColumn = { width: '10%' };

    const sortedPosts = SORTS[sortKey](posts);
    const reverseSortedPosts = isSortReverse
      ? sortedPosts.reverse()
      : sortedPosts;

    return (
      <div className="table">
        <div className="table-header">
          <span style={midColumn}>
            <Sort sortKey={'TITLE'} onSort={onSort} activeSortKey={sortKey}>
              Title
            </Sort>
          </span>
          <span style={largeColumn}>
            <Sort sortKey={'AUTHOR'} onSort={onSort} activeSortKey={sortKey}>
              Author
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort sortKey={'UPVOTES'} onSort={onSort} activeSortKey={sortKey}>
              UpVotes
            </Sort>
          </span>
          <span style={smallColumn}>
            <Sort sortKey={'VIEWED'} onSort={onSort} activeSortKey={sortKey}>
              Views
            </Sort>
          </span>
          <span style={smallColumn}>Archive</span>
        </div>
        {reverseSortedPosts.map(post => (
          <div key={post._id} className="table-row">
            <span style={midColumn}>{post.title}</span>
            <span style={largeColumn}>{post.authorInfo.name}</span>
            <span style={smallColumn}>{post.upVotes}</span>
            <span style={smallColumn}>{post.viewed}</span>
            <span style={smallColumn}>
              <Button onClick={() => onDismiss(post._id)}>Dismiss</Button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default PostsPage;
