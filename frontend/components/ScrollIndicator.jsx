import { useEffect, useState } from "react";
import "../styles/indicator.module.css";

const ScrollIndicator = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const heigth =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = (winScroll / heigth) * 100;

    setScrollTop(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  console.log("Scrolling: ", scrollTop);

  return (
    <div className="progress-wrapper">
      <div className="progress-bar" style={{ width: `${scrollTop}%` }}></div>
    </div>
  );
};

export default ScrollIndicator;
