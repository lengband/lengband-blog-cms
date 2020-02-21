import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ text }, e, changeContent) {
  changeContent(text);
}
export default (props) => {
  return (
    <MdEditor
      value={props.value}
      renderHTML={(text) => mdParser.render(text)}
      onChange={(...args) => handleEditorChange(...args, props.changeContent)}
      />
  );
};
