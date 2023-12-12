import "./ImageSlider.css";

import IMAGES from "../../../images/Images";

const ImageSlider = ({ slides, show, onClose, goToPrevious, goToNext }) => {
  const handleContentClick = (event) => {
    // Prevent propagation of click events to the parent elements
    event.stopPropagation();
  };

  return (
    <div style={{}}>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(\n    0,\n    0,\n    0,\n    0.5\n  )",
          zIndex: "9999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          alignSelf: "center",
        }}
      >
        <div
          onClick={handleContentClick}
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{}}>
              <img
                alt="left"
                src={IMAGES.Left_arrow_icon}
                onClick={() => goToPrevious()}
                className="left-arrow"
              />
              <img
                alt="right"
                src={IMAGES.Right_arrow_icon}
                className="right-arrow"
                onClick={() => goToNext()}
              />
            </div>
            {slides ? (
              <img alt="boat img" src={slides} className="slides-img-style" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
