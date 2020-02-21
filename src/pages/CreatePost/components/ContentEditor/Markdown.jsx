import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';


const mdParser = new MarkdownIt(/* Markdown-it options */);

const handleEditorChange = ({ text }, e, changeContent) => {
  changeContent(text);
};

const handleImageUpload = file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = data => {
      resolve(data.target.result);
    };
    reader.readAsDataURL(file);
  });
};

export default (props) => {
  return (
    <MdEditor
      style={{ height: '500px', width: '100%' }}
      value={props.value}
      renderHTML={(text) => mdParser.render(text)}
      onImageUpload={handleImageUpload}
      onChange={(...args) => handleEditorChange(...args, props.changeContent)}
      />
  );
};
