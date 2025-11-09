import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState, useEffect } from "react";
import { useRef } from "react";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
const images = {
  image1: { img1 },
  image2: { img2 },
};
export default function App() {
  return (
    <div>
      <ImageZoomInOut images={images} />
    </div>
  );
}
function ImageZoomInOut() {
  //state for img scale
  const [scale, setScale] = useState(1);
  //state for img position
  const [position, setPosition] = useState({ x: 0, y: 0 });

  //image transform origin
  const [transform, setTransform] = useState(position);
  //reference to the img element
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  function handleTransform(position) {
    const image = imageRef.current;
    return setTransform(function () {
      if (
        image.getBoundingClientRect().x > -20 ||
        image.getBoundingClientRect().y > -20
      ) {
        return "top left";
      }
    });
  }

  //zoom in function
  function handleZoomIn(e) {
    e.preventDefault();
    if (scale < 1) return;
    setScale((scale) => scale + 0.05);

    return;
  }

  //zoom out function
  function handleZoomOut(e) {
    e.preventDefault();

    if (scale > 1 && !scale < 1) setScale((scale) => scale - 0.05);
    // const image = imageRef.current;
    // image.style = {transform.translate('40%, 10%')};
    if (scale === 1) {
      setPosition(() => ({ x: 0, y: 0 }));

      return;
    }

    handleTransform();
  }

  //image drag and zoom/////////////////////////////
  useEffect(() => {
    const image = imageRef.current;
    const container = containerRef.current;
    const containCoords = container.getBoundingClientRect();
    let isDragging = false;
    let prevPosition = { x: 0, y: 0 };

    //mouse down event handler for starting img drag
    const handleMouseDown = (e) => {
      isDragging = true;
      prevPosition = { x: e.clientX, y: e.clientY };
    };

    //mouse move event handler for dragging img

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      if (scale === 1) return;
      const deltaX = e.clientX - prevPosition.x;
      const deltaY = e.clientY - prevPosition.y;
      prevPosition = { x: e.clientX, y: e.clientY };

      //set draggable limits for img//
      console.log(
        image.getBoundingClientRect().x,
        image.getBoundingClientRect().y,
        containCoords.bottom
      );

      //left side of img limitation
      if (image.getBoundingClientRect().x > containCoords.x) {
        image.getBoundingClientRect().x === containCoords.x;
        setPosition(function (position) {
          return { x: position.x - scale * 0.04, y: position.y };
        });

        return;
        //top of img limitation
      } else if (image.getBoundingClientRect().y > containCoords.y) {
        image.getBoundingClientRect().y === containCoords.y;

        setPosition(function (position) {
          return { x: position.x, y: position.y - scale * 0.04 };
        });

        return;

        //right side of img limitation
      } else if (image.getBoundingClientRect().right < containCoords.right) {
        image.getBoundingClientRect().right === containCoords.right;
        setPosition(function (position) {
          return { x: position.x + scale * 0.04, y: position.y };
        });

        return;
        //bottom limitation
      } else if (image.getBoundingClientRect().bottom < containCoords.bottom) {
        image.getBoundingClientRect().bottom === containCoords.bottom;
        setPosition(function (position) {
          return { x: position.x, y: position.y + scale * 0.04 };
        });

        return;
      }

      setPosition((position) => ({
        x: position.x + deltaX / (12.5 * scale),
        y: position.y + deltaY / (12.5 * scale),
      }));
    };

    //mouse up event handler for ending img drag
    const handleMouseUp = () => {
      isDragging = false;
    };

    //add event listeners
    if (image) {
      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseup", handleMouseUp);
      return;
    }

    //remove event listeners on component unmount
    return () => {
      if (image) {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [imageRef, containerRef, scale]);

  //////////

  return (
    <div
      className="image-container"
      ref={containerRef}
      style={{
        // position: "absolute",
        overflow: "hidden",
        width: "800px",
        height: "400px",
      }}
    >
      <div className="btns">
        <button className="btn1" onClick={handleZoomIn}>
          +
        </button>

        <button className="btn2" onClick={handleZoomOut}>
          -
        </button>
      </div>
      {/* image element */}
      <img
        ref={imageRef}
        id="1"
        src={img1}
        alt=""
        style={{
          width: "850px",
          height: "auto",
          bottom: "100px",
          cursor: "move",
          overflow: "hidden",
          transition: "transform 1 ease",
          // position: "relative",

          transitionTimingFunction: "ease-in-out",

          // transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,

          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: `${transform}`,
        }}
        draggable={false}
      />{" "}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
