import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import CategorySelector from '../categories/SelectCategory';

import withTokenContainer from '../../containers/TokenContainer';
import { postPost } from '../../api/posts';


class Write extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;
    const { categoryId } = match.params;
    const initialId = categoryId === 'all' ? '' : categoryId;

    this.state = {
      postForm: {
        title: '',
        contents: '',
        categoryId: initialId,
      },
      redirect: false,
      error: null,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { postForm } = this.state;
    const { token, dispatch } = this.props;
    postPost(postForm, token)
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch((err) => {
        this.setState(prevState => ({ ...prevState, error: err.response.data.message }));
      });
  }

  onChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    const { postForm } = this.state;

    this.setState({ postForm: { ...postForm, [name]: value } });
  }

  onSelectCategory = (categoryId) => {
    const { postForm } = this.state;
    this.setState({ postForm: { ...postForm, categoryId } });
  }

  render() {
    const { postForm, redirect, error } = this.state;

    if (redirect) {
      return <Redirect to={{
        pathname: '/posts',
        search: `category=${postForm.categoryId}`,
      }}/>;
    }

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <CategorySelector
            onSelect={this.onSelectCategory}
            selectedCategory={postForm.categoryId}
          />
        </div>
        <div>
          <label htmlFor="title">
            <input type="text"
              name="title"
              value={postForm.title}
              placeholder="Title"
              onChange={this.onChange}/>
          </label>
        </div>
        <div>
          <label htmlFor="contents">
            <textarea type="text"
              name="contents"
              value={postForm.contents}
              placeholder="contents"
              onChange={this.onChange}/>
          </label>
        </div>
        <button type="submit">작성</button>
        {error}
      </form>
    );
  }
}

export default withTokenContainer(Write);
