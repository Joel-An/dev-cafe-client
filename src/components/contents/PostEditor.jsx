import React from 'react';

import Editor from './Editor';
import Viewer from './Viewer';

import './PostEditor.scss';

class PostEditor extends React.PureComponent {
  render() {
    const { onChange, contents } = this.props;
    return (
      <div className="PostEditor">
        <div className="Editor">
          <Editor
            contents={contents}
            onChange={onChange}
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
