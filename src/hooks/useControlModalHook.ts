import { FormEvent, useEffect, useRef } from "react";

const UseOutsideClick = (close: () => void, listenCapturing = true) => {
  const ref: any = useRef();

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("Outside clicked");
          close();
        }
      }

      // document.addEventListener("click", handleClick); //event bubbles so we get an issue, we need to make it run in the capture phase
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [close, listenCapturing]
  );

  return ref;
};

export default UseOutsideClick;
