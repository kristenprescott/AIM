import "./index.css";
import { useState, useCallback, useEffect, useRef } from "react";
import Draggable from "react-draggable";

function useDragNDrop() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable handle="#handle" onDrag={(e, data) => trackPos(data)}>
      <div className="box">
        <div id="handle" className="handle" />

        <div className="inner">
          <p>COMPONENT GOES HERE</p>
        </div>
      </div>
    </Draggable>
    //    <Draggable handle="#handle" onDrag={(e, data) => trackPos(data)}>
    //      <div className="box">
    //        <div id="handle" className="handle"></div>

    //        <div className="inner">
    //          <div>Here's my position...</div>
    //          <div>
    //            x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
    //          </div>
    //          <div style={{ padding: "1em" }}>Cannot drag here</div>
    //        </div>
    //      </div>
    //    </Draggable>
  );
}

export default useDragNDrop;
