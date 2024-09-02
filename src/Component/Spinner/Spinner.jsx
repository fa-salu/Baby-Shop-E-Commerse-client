import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

const Spinner = ({ color = "#2ECC71", loading = true, height = 15, width = 5, radius = 2, margin = 2 }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <FadeLoader
        color={color}
        loading={loading}
        height={height}
        width={width}
        radius={radius}
        margin={margin}
      />
    </div>
  );
};

export default Spinner;
