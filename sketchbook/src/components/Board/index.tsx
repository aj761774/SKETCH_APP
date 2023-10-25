import { COLORS, MENU_ITEMS } from "@/constant";
import { actionItemClick } from "@/slice/menuSlice";
import {  useAppDispatch, useAppSelector } from "@/store";
import { useEffect, useLayoutEffect, useRef } from "react";

const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldDraw = useRef(false);
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef(0);
  const dispatch = useAppDispatch();
  const {activeMenuItem, actionMenuItem} = useAppSelector((state) => state.menu);
  const { color, size } = useAppSelector(
    (state) => state.toolbox[activeMenuItem]
  );

  useEffect(()=> {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if(actionMenuItem === MENU_ITEMS.DOWNLOAD){
      const url = canvas.toDataURL();
      const anchorElm = document.createElement("a");
      anchorElm.href = url;
      anchorElm.download = 'sketch.png';
      anchorElm.click();
      document.removeChild(anchorElm)
    }else if(actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO){
      if(historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1;
      if(historyPointer.current < drawHistory.current.length -1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1;
      const imgData = drawHistory.current?.[historyPointer.current];
      if(imgData){
        context?.putImageData(imgData, 0, 0);
      }
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch])

  // before browser paints
  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // setting the canvas width and height equal to window width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // getImageData returns an ImageData object representing the underlying pixel data for specified portion of canvas
    const imgData = context?.getImageData(0,0, canvas.width, canvas.height);
    // maintaining draw history for undo and redo functionality
    if(imgData) drawHistory.current.push(imgData)

    const handleMouseDown = (e: MouseEvent) => {
        shouldDraw.current = true;
        // start a new path by emptying the list of sub-paths
        context?.beginPath();
        // begins a new sub-path at the point specified by the given (x, y) coordinates
        context?.moveTo(e.clientX, e.clientY)
    };

    const handleMouseMove = (e: MouseEvent) => {
        if(!shouldDraw.current) return;
        // add a straight line to the current sub-path by connecting the sub-path's last point to the specified (x, y) coordinates
        context?.lineTo(e.clientX, e.clientY);
        // strokes the current or given path with the current stroke style.
        context?.stroke();
    };

    const handleMouseUp = (e: MouseEvent) => {
        shouldDraw.current = false;
        // getImageData returns an ImageData object representing the underlying pixel data for specified portion of canvas
        const imgData = context?.getImageData(0,0, canvas.width, canvas.height);
        
        if(imgData){
          drawHistory.current?.push(imgData);
          historyPointer.current = drawHistory.current ? drawHistory.current.length -1 : 0;
        }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        // setting strokeStyle
        context.strokeStyle = color ?? COLORS.BLACK;
        // setting line width
        context.lineWidth = size ?? 3;
      }
    }
  }, [color, size]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
