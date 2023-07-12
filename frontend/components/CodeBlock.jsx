import { useState, useEffect } from "react";
import Clipboard from "clipboard";

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

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
      <code>{code}</code>
      {/* <pre>
      </pre> */}
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
