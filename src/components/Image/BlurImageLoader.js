import React, { useState, useEffect } from "react";

const styles = (loaded, src) => {

  return {
    width: "100%",
    height: "400px",
    maxHeight: "4Ovh",
    transition: "filter 1s ease",
    filter: `${!loaded ? "blur(3px)" : "unset"}`,
    backgroundImage: `url(${src})`,
    backgroundPosition: "50% 50%",
    backgroundOrigin: "border-box",
    backgroundSize: "cover"
  }
};

const BlurImageLoader = ({ placeholder, image, visible }) => {
  const runOnce = true;
  const [loadState, setLoadState] = useState({
    src: placeholder,
    loaded: false
  });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoadState({
        src: img.src,
        loaded: true
      });
    };

    if (visible) {
      img.src = image;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, runOnce]);

  return (
    <header>
      <figure>
        <div style={styles(visible && loadState.loaded, loadState.src)} />
      </figure>
    </header>
  )
};

export default BlurImageLoader;
