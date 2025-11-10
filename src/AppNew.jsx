import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState, useEffect } from "react";
import { useRef } from "react";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import img5 from "./img5.jpg";
import img6 from "./img6.jpg";

export default function App() {
  return (
    <div>
      <ImageZoomInOut />
    </div>
  );
}

function ImageZoomInOut() {
  const [clickedImageId, setClickedImageId] = useState("1");
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [transform, setTransform] = useState(position);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const images = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
    5: img5,
    6: img6,
  };

  function handleClick(e) {
    setClickedImageId(e.target.id);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    return;
  }

  // function handleTransform() {
  //   const image = imageRef.current;
  //   const container = containerRef.current;
  //   const containCoords = container.getBoundingClientRect();

  //   setTransform(function () {
  //     if (containCoords.x - image.getBoundingClientRect().x < 20) {
  //       return `top left`;
  //     }
  //   });
  //   return;
  // }

  function handleZoomIn(e) {
    e.preventDefault();
    if (scale < 1) return;
    setScale((scale) => scale + 0.05);
  }

  //zoom out function
  function handleZoomOut(e) {
    e.preventDefault();
    if (scale > 1 && !scale < 1) setScale((scale) => scale - 0.05);
    if (scale === 1) {
      setPosition(() => ({ x: 0, y: 0 }));
      return;
    }
    // handleTransform();
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
      console.log("hi");
    };

    //mouse move event handler for dragging img
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      if (scale === 1) return;

      const deltaX = e.clientX - prevPosition.x;
      const deltaY = e.clientY - prevPosition.y;
      prevPosition = { x: e.clientX, y: e.clientY };
      console.log(
        containCoords.x - image.getBoundingClientRect().x,
        containCoords.x - image.getBoundingClientRect().x < 20
      );

      //set draggable limits for img//

      //left side of img limitation
      if (image.getBoundingClientRect().x > containCoords.x) {
        image.getBoundingClientRect().x === containCoords.x;
        setPosition(function (position) {
          return { x: position.x - 0.01, y: position.y };
        });
        return;

        //top of img limitation
      } else if (image.getBoundingClientRect().y > containCoords.y) {
        image.getBoundingClientRect().y === containCoords.y;
        setPosition(function (position) {
          return { x: position.x, y: position.y - 0.01 };
        });
        return;

        //right side of img limitation
      } else if (image.getBoundingClientRect().right < containCoords.right) {
        image.getBoundingClientRect().right === containCoords.right;
        setPosition(function (position) {
          return { x: position.x + 0.01, y: position.y };
        });
        return;

        //bottom limitation
      } else if (image.getBoundingClientRect().bottom < containCoords.bottom) {
        image.getBoundingClientRect().bottom === containCoords.bottom;
        setPosition(function (position) {
          return { x: position.x, y: position.y + 0.01 };
        });
        return;
      }

      setPosition((position) => ({
        x: position.x + deltaX / (45 * scale),
        y: position.y + deltaY / (45 * scale),
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
  }, [imageRef, containerRef, scale, clickedImageId]);

  return (
    <div>
      <div className="container">
        <div className="side-bar">
          <div className="img1">
            <img id="1" src={img1} onClick={handleClick} alt="baby deer" />{" "}
          </div>
          <div className="img2">
            <img
              id="2"
              src={img2}
              onClick={handleClick}
              alt="robin in the woods"
            />{" "}
          </div>
          <div className="img3">
            <img
              id="3"
              src={img3}
              onClick={handleClick}
              alt="two swans in lake"
            />
          </div>
          <div className="img4">
            <img
              id="4"
              src={img4}
              onClick={handleClick}
              alt="bee on yellow flower"
            />
          </div>
          <div className="img5">
            <img
              className="img5"
              id="5"
              src={img5}
              onClick={handleClick}
              alt="pig with babies"
            />
          </div>
          <div className="img6">
            <img
              className="img6"
              id="6"
              src={img6}
              onClick={handleClick}
              alt="red bird"
            />
          </div>
        </div>
        <div className="image-container" ref={containerRef}>
          <div className="btns">
            <button className="btn1" onClick={handleZoomIn}>
              <span> &#10133;</span>
            </button>
            <button className="btn2" onClick={handleZoomOut}>
              <span> &#10134;</span>
            </button>
          </div>
          <div className="image-container">
            <img
              ref={imageRef}
              id={clickedImageId}
              style={
                clickedImageId
                  ? {
                      // transformOrigin: { transform },
                      transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                    }
                  : {
                      transform: `scale(1) translate(0, 0)`,
                    }
              }
              src={clickedImageId !== "100" ? images[clickedImageId] : null}
              alt={`${clickedImageId}`}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
