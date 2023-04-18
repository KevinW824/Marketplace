import React, {createContext, useContext, useState, useEffect} from 'react';

/**
 * Component that provides dimensions of window
 * Copied from class sample number 9
 *
 * Resources: Lecture 9 Slide 38
 */

const DimensionsContext = createContext();

const winDims = () => ({
  height: window.innerHeight,
  width: window.innerWidth,
});

const DimensionsProvider = ({children}) => {
  const [dimensions, setDimensions] = useState(winDims);
  useEffect(() => {
    const handleResize = () => {
      setDimensions(winDims);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <DimensionsContext.Provider value={dimensions}>
      {children}
    </DimensionsContext.Provider>
  );
};

export default DimensionsProvider;

export const useDimensions = () => {
  return useContext(DimensionsContext);
};

