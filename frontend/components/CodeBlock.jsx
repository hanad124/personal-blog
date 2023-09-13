import { useState, useEffect } from "react";
import Clipboard from "clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vsDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styled from "styled-components";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const CodeBlockWrapper = styled.div`
    font-size: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin-bottom: 1rem;
    background-color: #2d2d2d;
    color: #fff;
    padding: 1rem;
    line-height: 1.5;
  `;

  useEffect(() => {
    const clipboard = new Clipboard(".copy-btn");
    clipboard.on("success", () => {
      setCopied(true);
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const handleClick = () => {
    const el = document.createElement("textarea");
    el.value = code;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <div className="relative">
      {/* <CodeBlockWrapper>
        <SyntaxHighlighter language={language} style={vsDark}> */}
      <pre>{code}</pre>
      {/* </SyntaxHighlighter>
      </CodeBlockWrapper> */}

      <button
        className="absolute top-0 right-0 p-1 m-1 text-sm text-gray-500 bg-white rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 copy-btn"
        onClick={handleClick}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CodeBlock;
