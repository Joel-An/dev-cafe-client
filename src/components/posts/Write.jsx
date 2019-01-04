import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SelectCategory from '../categories/SelectCategory';

import withTokenContainer from '../../containers/TokenContainer';
import withCategoryContainer from '../../containers/CategoryContainer';

const CategorySelector = withCategoryContainer(SelectCategory);

class Write extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postForm: {
        title: '',
        contents: '',
        categoryId: '',
      },
      redirect: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { postForm } = this.state;
    const { token } = this.props;
    const config = { headers: { 'x-access-token': token } };
    axios
      .post('/api/v1/posts', postForm, config)
      .then((res) => {
        console.log(res.data);
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log(err.response.data);
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
    const { postForm, redirect } = this.state;

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
      </form>
    );
  }
}

export default withTokenContainer(Write);
