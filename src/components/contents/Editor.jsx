import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';

class Editor extends React.PureComponent {
  render() {
    const { onChange, contents } = this.props;
    return (
      <CodeMirror
        value={contents}
        options={{
          mode: {
            name: 'markdown',
            highlightFormatting: true,
          },
          viewportMargin: Infinity,
        }}
        onBeforeChange={(editor, data, value) => {
          onChange(value);
        }}
        onChange={(editor, data, value) => {
        }}
      />
    );
  }
}

export default Editor;
