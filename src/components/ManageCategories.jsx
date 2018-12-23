import React from 'react';
import PropTypes from 'prop-types';
import CreateCategory from './CreateCategory';
import Categories from './Categories';


class ManageCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { token } = this.props;
    return (
      <div >
        <Categories/>
        <CreateCategory token={token} />
      </div>
    );
  }
}

ManageCategories.propTypes = {
  token: PropTypes.string.isRequired,
};


export default ManageCategories;
