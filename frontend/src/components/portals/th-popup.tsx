import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ThColorKey } from "@/utilities/th-color.js";

interface ThPopupPortalProps {
  width: number;
  height: number;
  thColor: ThColorKey;
  backgroundClass: string;
  children: React.ReactNode;
  onClose: () => (void);
}

const ThPopupPortal: React.FC<ThPopupPortalProps> = ({
  width,
  height,
  thColor,
  backgroundClass,
  children,
  onClose
}) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    const top = (window.innerHeight - height) / 2;
    const left = (window.innerWidth - width) / 2;

    setPosition({ top, left });
  }, [height, width]);

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-th-black-40 bg-opacity-50 animate-th-fade-in z-30" >
        <div className={`fixed top-0 left-0 w-full h-full ${backgroundClass} bg-opacity-50 z-30`} onClick={onClose} ></div>
      </div>

      <div
        style={{ width: `${width}px`, height: `${height}px`, top: `${position.top}px`, left: `${position.left}px` }}
        className={`absolute bg-${thColor}-30 rounded-th border-th border-${thColor}-20 z-40 animate-th-zoom-in-from-bottom`}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

interface ThPopupProps {
  width: number;
  height: number;
  thColor: ThColorKey;
  backgroundClass: string;
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => (void);
}

const ThPopup: React.FC<ThPopupProps> = ({
  width,
  height,
  thColor,
  backgroundClass,
  button,
  children,
  isOpen,
  onClose
}) => {
  return (
    <>
      <div >
        {button}
      </div>
      {isOpen &&
        <ThPopupPortal width={width} height={height} thColor={thColor} backgroundClass={backgroundClass} onClose={onClose}>
          {children}
        </ThPopupPortal>
      }
    </>
  );
};

export default ThPopup;