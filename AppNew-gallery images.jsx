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
import img7 from "./img7.jpg";
import img8 from "./img8.jpg";

function App() {
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
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const images = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
    5: img5,
    6: img6,
    7: img7,
    8: img8,
  };

  function handleClick(e) {
    setClickedImageId(e.target.id);
    setScale(1);
    return;
  }

  function handleZoomIn(e) {
    e.preventDefault();
    if (scale < 1) return;
    setScale((scale) => scale + 0.05);
  }

  function handleZoomOut(e) {
    e.preventDefault();
    if (scale > 1 && !scale < 1) setScale((scale) => scale - 0.05);
  }
  console.log(clickedImageId);

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

      const deltaX = e.clientX - prevPosition.x;
      const deltaY = e.clientY - prevPosition.y;
      prevPosition = { x: e.clientX, y: e.clientY };

      //set draggable limits for img//
      if (image.getBoundingClientRect().x > containCoords.x) {
        image.getBoundingClientRect().x === containCoords.x;
        setPosition(function (position) {
          return { x: position.x - 0.05, y: position.y };
        });
        return;
      } else if (image.getBoundingClientRect().y > containCoords.y) {
        image.getBoundingClientRect().y === containCoords.y;
        setPosition(function (position) {
          return { x: position.x, y: position.y - 0.05 };
        });
        return;
      } else if (image.getBoundingClientRect().right < containCoords.right) {
        image.getBoundingClientRect().right === containCoords.right;
        setPosition(function (position) {
          return { x: position.x + 0.05, y: position.y };
        });
        return;
      } else if (image.getBoundingClientRect().bottom < containCoords.bottom) {
        image.getBoundingClientRect().bottom === containCoords.bottom;
        setPosition(function (position) {
          return { x: position.x, y: position.y + 0.05 };
        });
        return;
      }

      setPosition((position) => ({
        x: position.x + deltaX / 15,
        y: position.y + deltaY / 15,
      }));
    };

    //mouse up event handler for ending img drag
    const handleMouseUp = () => {
      isDragging = false;
    };

    //add event listeners
    if (image) {
      image.addEventListener("mousedown", handleMouseDown);
      image.addEventListener("mousemove", handleMouseMove);
      image.addEventListener("mouseup", handleMouseUp);
      return;
    }

    //remove event listeners on component unmount
    return () => {
      if (image) {
        image.removeEventListener("mousedown", handleMouseDown);
        image.removeEventListener("mousemove", handleMouseMove);
        image.removeEventListener("mouseup", handleMouseUp);
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
              alt="bee on yellow flower"
            />
          </div>
        </div>
        <div className="image-container">
          <div className="btns">
            <button className="btn1" onClick={handleZoomIn}>
              <span> &#10133;</span>
            </button>
            <button className="btn2" onClick={handleZoomOut}>
              <span> &#10134;</span>
            </button>
          </div>
          <div className="image-container" ref={containerRef}>
            <img
              ref={imageRef}
              id={clickedImageId}
              style={
                clickedImageId
                  ? {
                      transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                    }
                  : { transform: `scale(1,1)` }
              }
              // style={
              //   clickedImageId
              //     ? { transform: `scale(${zoom})` }
              //     : { transform: `scale(1,1)` }
              // }
              src={clickedImageId !== "100" ? images[clickedImageId] : null}
              alt={`images.alt${clickedImageId}`}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
// );
//   }

// ////////////////////////////////////////////
// const ImageZoomInOut = ({ img4 }) => {
// function ImageZoomInOut({ images }) {
//   //state for img scale
//   const [scale, setScale] = useState(1);
//   //state for img position
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   //reference to the img element
//   const imageRef = useRef(null);
//   const containerRef = useRef(null);

//   //zoom in function
//   function handleZoomIn(e) {
//     e.preventDefault();
//     if (scale < 1) return;
//     setScale((scale) => scale + 0.05);
//   }
//   //zoom out function
//   function handleZoomOut(e) {
//     e.preventDefault();
//     if (scale > 1 && !scale < 1) setScale((scale) => scale - 0.05);
//   }

//   //image drag and zoom/////////////////////////////
//   useEffect(() => {
//     const image = imageRef.current;
//     const container = containerRef.current;
//     const containCoords = container.getBoundingClientRect();
//     let isDragging = false;
//     let prevPosition = { x: 0, y: 0 };

//     //mouse down event handler for starting img drag
//     const handleMouseDown = (e) => {
//       isDragging = true;
//       prevPosition = { x: e.clientX, y: e.clientY };
//     };

//     //mouse move event handler for dragging img
//     const handleMouseMove = (e) => {
//       if (!isDragging) return;

//       const deltaX = e.clientX - prevPosition.x;
//       const deltaY = e.clientY - prevPosition.y;
//       prevPosition = { x: e.clientX, y: e.clientY };

//       //set draggable limits for img//
//       if (image.getBoundingClientRect().x > containCoords.x) {
//         image.getBoundingClientRect().x === containCoords.x;
//         setPosition(function (position) {
//           return { x: position.x - 0.05, y: position.y };
//         });
//         return;
//       } else if (image.getBoundingClientRect().y > containCoords.y) {
//         image.getBoundingClientRect().y === containCoords.y;
//         setPosition(function (position) {
//           return { x: position.x, y: position.y - 0.05 };
//         });
//         return;
//       } else if (image.getBoundingClientRect().right < containCoords.right) {
//         image.getBoundingClientRect().right === containCoords.right;
//         setPosition(function (position) {
//           return { x: position.x + 0.05, y: position.y };
//         });
//         return;
//       } else if (image.getBoundingClientRect().bottom < containCoords.bottom) {
//         image.getBoundingClientRect().bottom === containCoords.bottom;
//         setPosition(function (position) {
//           return { x: position.x, y: position.y + 0.05 };
//         });
//         return;
//       }

//       setPosition((position) => ({
//         x: position.x + deltaX / 15,
//         y: position.y + deltaY / 15,
//       }));
//     };

//     //mouse up event handler for ending img drag
//     const handleMouseUp = () => {
//       isDragging = false;
//     };

//     //add event listeners
//     if (image) {
//       image.addEventListener("mousedown", handleMouseDown);
//       image.addEventListener("mousemove", handleMouseMove);
//       image.addEventListener("mouseup", handleMouseUp);
//       return;
//     }

//     //remove event listeners on component unmount
//     return () => {
//       if (image) {
//         image.removeEventListener("mousedown", handleMouseDown);
//         image.removeEventListener("mousemove", handleMouseMove);
//         image.removeEventListener("mouseup", handleMouseUp);
//       }
//     };
//   }, [imageRef, containerRef, scale]);

//////////
//   return (
//     <div
//       className="image-container"
//       ref={containerRef}
//       style={{
//         position: "absolute",
//         overflow: "hidden",
//         width: "800px",
//         height: "400px",
//       }}
//     >
//       <div className="btns">
//         <button className="btn1" onClick={handleZoomIn}>
//           +
//         </button>
//         <button className="btn2" onClick={handleZoomOut}>
//           -
//         </button>
//       </div>
//       {/* image element */}
//       <img
//         ref={imageRef}
//         className="main"
//         id="1"
//         src={img1}
//         alt=""
//         style={{
//           width: "850px",
//           height: "auto",
//           bottom: "100px",
//           cursor: "move",
//           overflow: "hidden",
//           position: "relative",
//           transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
//         }}
//         draggable={false}
//       />{" "}
//       <div
//         style={{
//           width: "28px",
//           height: "28px",
//           backgroundColor: "red",
//           zIndex: "500",
//         }}
//       ></div>
//     </div>
//   );
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
