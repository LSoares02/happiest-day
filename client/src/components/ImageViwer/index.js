import React, { useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";

export function Viwer({
  images,
  isViewerOpen,
  setIsViewerOpen,
  currentImage,
  setCurrentImage,
}) {
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
}
