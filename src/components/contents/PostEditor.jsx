import React from 'react';
import PropTypes from 'prop-types';

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
            theme="material"
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

PostEditor.propTypes = {
  contents: PropTypes.string,
};

PostEditor.defaultProps = {
  contents: '',
};

export default PostEditor;
