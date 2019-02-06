import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';

import Preview from './Viewer';

class Editor extends React.PureComponent {
  render() {
    const { onChange, contents, preview } = this.props;
    return (
      <>
        <CodeMirror
          value={contents}
          options={{
            mode: {
              name: 'markdown',
              highlightFormatting: true,
            },
          }}
          onBeforeChange={(editor, data, value) => {
            onChange(value);
          }}
          onChange={(editor, data, value) => {
          }}
        />
        {preview && <Preview contents={contents}/>}
      </>
    );
  }
}

export default Editor;
