import "./ImageSlider.css";

import IMAGES from "../../../images/Images";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';

const ImageSlider = ({ slides, onClose, goToPrevious, goToNext, showButton, getVerify }) => {
  const [check, setCheck] = useState(null)
	const [numPages, setNumPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  useEffect(()=>{
    getVerify({check})
  },[check])

  const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

  const goToPrevPage = () =>
		setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

	const goToNextPage = () =>
		setPageNumber(
			pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
		);

  const handleVerify = (verify) =>{
    setCheck(verify)
  }
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
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-center w-100">
                  { showButton?
                    <div className="d-flex gap-3">
                    <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={
                      ()=>handleVerify('1')
                    }
                    >
                      Verify
                    </button>
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={
                      ()=>handleVerify('0')
                    }
                    >
                      Cancel
                    </button>
                    </div>
                    :null
                  }
                </div>
                <div>
                  {/* <img alt="boat img" src={slides} className="slides-img-style" /> */}
                  {/* <nav>
                    <button onClick={goToPrevPage}>Prev</button>
                    <button onClick={goToNextPage}>Next</button>
                    <p>
                      Page {pageNumber} of {numPages}
                    </p>
                  </nav> */}

                  <Document
                    file={require('../../../assets/documents/EPFO_shanthi.pdf')} //require('../../../assets/documents/EPFO_shanthi.pdf')
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
