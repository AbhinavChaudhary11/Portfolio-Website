import React from "react";

const Slider = ({ width = "200px", height = "200px", reverse = false }) => {
  // 👇 fixed number of images (change this if you add more in /public/slider/)
  const quantity = 11;

  // auto-generate paths: /slider/image-1.png, /slider/image-2.png ...
  const images = Array.from({ length: quantity }, (_, i) => 
    `/slider/image-${i + 1}.png`
  );

  return (
    <div
      className="slider"
      reverse={reverse ? "true" : "false"}
      style={{
        "--width": width,
        "--height": height,
        "--quantity": quantity,
      }}
    >
      <div className="list">
        {images.map((src, index) => (
          <div
            key={index}
            className="item"
            style={{ "--position": index + 1 }}
          >
            <img src={src} alt={`slide-${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
