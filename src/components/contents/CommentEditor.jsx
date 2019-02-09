import React from 'react';
import Editor from './Editor';

import './CommentEditor.scss';

class CommentEditor extends React.PureComponent {
  render() {
    return (
      <div className="CommentEditor">
        <Editor
          {...this.props}
        />
      </div>
    );
  }
}

export default CommentEditor;
