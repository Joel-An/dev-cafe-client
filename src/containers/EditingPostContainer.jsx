import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { postIdPropType } from './PostContainer';
import { categoryIdPropType } from './WithCategory';

import {
  loadEditingPost as loadEditingPostAction,
  saveEditingPost as saveEditingPostAction,
  editingPostDone as editingPostDoneAction,
} from '../store/actions/posts';
import { selectEditingPostById } from '../store/selectors/posts';


export const EditingPostContainerPropTypes = {
  loadEditingPost: PropTypes.func,
  saveEditingPost: PropTypes.func,
  editingPostDone: PropTypes.func,
  postId: postIdPropType,
  editingPost: PropTypes.shape({
    _id: postIdPropType.isRequired,
    category: categoryIdPropType.isRequired,
    title: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
  }),
};

export const EditingPostContainerDefaultProps = {
  editingPost: undefined,
};

export default function withEditingPostContainer(ComposedComponent) {
  class EditingPostContainer extends React.Component {
    constructor(props) {
      super(props);

      const { postId, loadEditingPost } = this.props;
      loadEditingPost(postId);
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const { postId } = ownProps;
    const editingPost = selectEditingPostById(state, postId);

    return { editingPost };
  };

  const mapDispatchToProps = {
    loadEditingPost: loadEditingPostAction,
    saveEditingPost: saveEditingPostAction,
    editingPostDone: editingPostDoneAction,
  };

  return connect(mapStateToProps, mapDispatchToProps)(EditingPostContainer);
}
