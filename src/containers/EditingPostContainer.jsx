import { connect } from 'react-redux';
import React from 'react';

import {
  loadEditingPost as loadEditingPostAction,
  saveEditingPost as saveEditingPostAction,
  editingPostDone as editingPostDoneAction,
} from '../store/actions/posts';
import { selectEditingPostById } from '../store/selectors/posts';

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
