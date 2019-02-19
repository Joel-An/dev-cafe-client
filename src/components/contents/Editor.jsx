import React from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.editor = null;
  }

  componentDidUpdate(prevProps) {
    const { insertText } = this.props;
    if (!prevProps.insertText && insertText) {
      this.insertTextAtCursor();
    }
  }

  insertTextAtCursor = () => {
    const { insertText, clearInsertText } = this.props;
    const selection = this.editor.getSelection();

    if (selection.length > 0) {
      this.editor.replaceSelection(insertText);
    } else {
      const doc = this.editor.getDoc();
      const cursor = doc.getCursor();
      doc.replaceRange(insertText, cursor);
    }

    clearInsertText();
  }

   editorDidMount = (editor) => {
     this.editor = editor;
     this.editor.setSize(null, 'auto');
   }

   render() {
     const { onChange, contents, autofocus } = this.props;
     return (
       <CodeMirror
         value={contents}
         options={{
           mode: {
             name: 'markdown',
             highlightFormatting: true,
           },
           viewportMargin: Infinity,
           autofocus,
         }}
         onBeforeChange={(editor, data, value) => {
           onChange(value);
         }}
         editorDidMount={this.editorDidMount}
       />
     );
   }
}

Editor.propTypes = {
  insertText: PropTypes.string,
  clearInsertText: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  contents: PropTypes.string,
  autofocus: PropTypes.bool,
};

Editor.defaultProps = {
  insertText: undefined,
  clearInsertText: undefined,
  contents: '',
  autofocus: undefined,
};

export default Editor;
