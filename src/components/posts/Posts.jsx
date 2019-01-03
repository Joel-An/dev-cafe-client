import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostList from './PostList';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: null,
      error: true,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    this.getPosts(location.search);
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (location.search !== nextProps.location.search) {
      this.getPosts(nextProps.location.search);
    }
  }


  getPosts = (query) => {
    axios.get(`/api/v1/posts${query}`)
      .then((result) => {
        if (result.status === 200) {
          this.setState({
            posts: result.data,
            error: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ error: true, posts: null });
      });
  }

  render() {
    const { posts, error } = this.state;
    console.log(posts);
    return (
      <div>
        {error
          ? '글이 없어!'
          : <PostList posts={posts}/>
        }
        <div>
          <Link to="/write">글쓰기</Link>
        </div>
      </div>
    );
  }
}

export default Posts;
