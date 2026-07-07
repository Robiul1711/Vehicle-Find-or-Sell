import React, { useState, useEffect, useRef } from "react";
import { Modal, Slider } from "antd";

const ImageCropperModal = ({ open, file, onCrop, onCancel }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [imgAspect, setImgAspect] = useState(1);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const viewportRef = useRef(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setImgAspect(1);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mobile touch handlers
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    dragStart.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.current.x;
    const newY = touch.clientY - dragStart.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setImgAspect(naturalWidth / naturalHeight);
  };

  const handleCrop = () => {
    if (!imageRef.current || !viewportRef.current) return;

    const img = imageRef.current;
    const viewport = viewportRef.current;

    // Create 4:3 canvas (1024x768)
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext("2d");

    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;

    const viewportAspect = 4 / 3;

    let displayWidth = viewportWidth;
    let displayHeight = viewportHeight;

    if (imgAspect > viewportAspect) {
      displayHeight = viewportHeight;
      displayWidth = viewportHeight * imgAspect;
    } else {
      displayWidth = viewportWidth;
      displayHeight = viewportWidth / imgAspect;
    }

    // Apply zoom scale
    displayWidth = displayWidth * scale;
    displayHeight = displayHeight * scale;

    // Calculate default center position
    const defaultX = (viewportWidth - displayWidth) / 2;
    const defaultY = (viewportHeight - displayHeight) / 2;

    // Combined default + drag offsets
    const finalX = defaultX + position.x;
    const finalY = defaultY + position.y;

    // Map to canvas
    const ratio = 1024 / viewportWidth;
    const drawX = finalX * ratio;
    const drawY = finalY * ratio;
    const drawW = displayWidth * ratio;
    const drawH = displayHeight * ratio;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const croppedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          onCrop(croppedFile);
        }
      },
      "image/jpeg",
      0.9
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Adjust & Crop Photo (4:3)"
      onOk={handleCrop}
      okText="Crop & Save"
      cancelText="Cancel"
      centered
      destroyOnClose
      width={600}
    >
      <div className="space-y-4 py-2">
        <p className="text-xs text-gray-500">
          Drag the photo to position it inside the frame. Use the slider to zoom.
        </p>

        {/* Viewport container */}
        <div
          ref={viewportRef}
          className="relative w-full aspect-[4/3] bg-gray-950 overflow-hidden rounded-lg cursor-move select-none flex items-center justify-center border border-gray-200"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {imageSrc && (
            <img
              ref={imageRef}
              src={imageSrc}
              alt="To Crop"
              onLoad={handleImageLoad}
              className="absolute pointer-events-none select-none max-w-none max-h-none"
              style={{
                width: imgAspect > 4 / 3 ? "auto" : "100%",
                height: imgAspect > 4 / 3 ? "100%" : "auto",
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
          )}
          {/* Visual guides / Grid overlay for premium cropping feedback */}
          <div className="absolute inset-0 border-2 border-white/40 pointer-events-none rounded-lg" />
          <div className="absolute inset-x-0 top-1/3 border-b border-dashed border-white/20 pointer-events-none" />
          <div className="absolute inset-x-0 top-2/3 border-b border-dashed border-white/20 pointer-events-none" />
          <div className="absolute inset-y-0 left-1/3 border-r border-dashed border-white/20 pointer-events-none" />
          <div className="absolute inset-y-0 left-2/3 border-r border-dashed border-white/20 pointer-events-none" />
        </div>

        {/* Zoom Control */}
        <div className="flex items-center gap-4 pt-2">
          <span className="text-sm font-semibold text-gray-700">Zoom:</span>
          <Slider
            min={1}
            max={3}
            step={0.02}
            value={scale}
            onChange={(val) => setScale(val)}
            className="flex-grow"
            tooltip={{ formatter: (val) => `${Math.round(val * 100)}%` }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ImageCropperModal;
