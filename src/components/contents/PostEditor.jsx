import React from 'react';

import Editor from './Editor';
import Viewer from './Viewer';

import './PostEditor.scss';

class PostEditor extends React.PureComponent {
  render() {
    const { contents } = this.props;
    return (
      <div className="PostEditor">
        <div className="Editor">
          <Editor
            {...this.props}
          />
        </div>
        <div className="Preview">
          <Viewer contents={contents} />
        </div>
      </div>
    );
  }
}

export default PostEditor;
