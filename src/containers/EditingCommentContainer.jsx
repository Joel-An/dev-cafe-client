import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { commentIdPropType } from './WithComment';
import { postIdPropType } from './PostContainer';

import {
  loadEditingComment as loadEditingCommentAction,
  saveEditingComment as saveEditingCommentAction,
  editingCommentDone as editingCommentDoneAction,
} from '../store/actions/comments';
import { selectEditingCommentById } from '../store/selectors/comments';

export const EditingCommentContainerPropTypes = {
  loadEditingComment: PropTypes.func,
  saveEditingComment: PropTypes.func,
  editingCommentDone: PropTypes.func,
  editingComment: PropTypes.shape({
    _id: commentIdPropType.isRequired,
    post: postIdPropType.isRequired,
    contents: PropTypes.string.isRequired,
  }),
};

export const EditingCommentContainerDefaultProps = {
  editingComment: undefined,
};

export default function withEditingCommentContainer(ComposedComponent) {
  class EditingCommentContainer extends React.Component {
    constructor(props) {
      super(props);

      const { commentId, loadEditingComment } = this.props;
      loadEditingComment(commentId);
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const { commentId } = ownProps;
    const editingComment = selectEditingCommentById(state, commentId);

    return { editingComment };
  };

  const mapDispatchToProps = {
    loadEditingComment: loadEditingCommentAction,
    saveEditingComment: saveEditingCommentAction,
    editingCommentDone: editingCommentDoneAction,
  };

  return connect(mapStateToProps, mapDispatchToProps)(EditingCommentContainer);
}
