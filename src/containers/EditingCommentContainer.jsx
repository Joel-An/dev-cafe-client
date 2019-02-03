import { connect } from 'react-redux';
import React from 'react';

import {
  loadEditingComment as loadEditingCommentAction,
  saveEditingComment as saveEditingCommentAction,
  editingCommentDone as editingCommentDoneAction,
} from '../store/actions/comments';
import { selectEditingCommentById } from '../store/selectors/comments';

export default function withEditingCommentContainer(ComposedComponent) {
  class EditingCommentContainer extends React.Component {
    constructor(props) {
      super(props);

      const { commentId, loadEditingComment } = this.props;
      loadEditingComment(commentId);
    }

    componentDidMount() {
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
