import React from 'react';
import PropTypes from 'prop-types';
import CreateCategory from './CreateCategory';


class ManageCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
    };
  }

  render() {
    const { token } = this.props;
    return (
      <div >
        <CreateCategory token={token} />
      </div>
    );
  }
}

ManageCategories.propTypes = {
  token: PropTypes.string.isRequired,
};


export default ManageCategories;
