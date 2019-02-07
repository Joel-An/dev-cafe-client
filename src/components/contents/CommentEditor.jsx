import React from 'react';
import Editor from './Editor';

import './CommentEditor.scss';

class CommentEditor extends React.PureComponent {
  render() {
    const { onChange, contents, preview } = this.props;
    return (
      <div className="CommentEditor">
        <Editor
          contents={contents}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default CommentEditor;
