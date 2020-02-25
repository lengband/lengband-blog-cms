import React, { useState } from 'react';
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
  const [ref, setRef] = useState(null);
  if (ref) {
    ref.on('fullscreen', (v) => { // 全屏模式下自动开启预览模式
      const configView = {
        md: true,
        menu: true,
        html: true,
      };
      if (v) {
        configView.html = true;
      } else {
        configView.html = false;
      }
      ref.setView(configView);
    });
  }

  return (
    <MdEditor
      config={{
        view: { menu: true, md: true, html: false },
      }}
      style={{ height: '500px', width: '100%' }}
      value={props.value}
      ref={setRef}
      renderHTML={(text) => mdParser.render(text)}
      onImageUpload={handleImageUpload}
      onChange={(...args) => handleEditorChange(...args, props.changeContent)}
      />
  );
};
