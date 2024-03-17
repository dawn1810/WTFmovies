'use client'
// import { useState, useEffect } from 'react';

// const useViewport = () => {
//     // const [width, setWidth] = useState(window.innerWidth);
//     const [width, setWidth] = useState(0);

//     useEffect(() => {
//         const handleWindowResize = () => setWidth(window.innerWidth);
//         window.addEventListener('resize', handleWindowResize);
//         return () => window.removeEventListener('resize', handleWindowResize);
//     }, []);

//     return { width };
// };

// // export default useViewport;
// import { useState, useEffect } from 'react';

// const useViewport = () => {
//   // Initialize width to a default value (e.g., 0) to handle server-side rendering.
//   const [width, setWidth] = useState(0);

//   // useEffect runs on the client after rendering.
//   useEffect(() => {
//     // This function will be invoked when the window is resized.
//     const handleWindowResize = () => setWidth(window.innerWidth);

//     // Add the event listener for window resizing.
//     window.addEventListener('resize', handleWindowResize);

//     // Call the handler right away so the state gets updated with the initial window size
//     handleWindowResize();

//     // Remove the event listener when the component is unmounted or re-rendered.
//     return () => window.removeEventListener('resize', handleWindowResize);
//   }, []); // Empty array ensures that the effect only runs once on mount and cleanup on unmount.

//   return { width };
// };
import { useState, useEffect } from 'react';

const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { width };
};

export default useViewport;