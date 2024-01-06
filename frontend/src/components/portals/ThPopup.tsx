import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ThColorKeys } from '../../../tailwind.config';

interface ThPopupPortalProps {
  width: number;
  height: number;
  thColor: ThColorKeys;
  children: React.ReactNode;
  onClose: () => (void);
}

const ThPopupPortal: React.FC<ThPopupPortalProps> = ({ width, height, thColor, children, onClose }) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    const top = (window.innerHeight - height) / 2;
    const left = (window.innerWidth - width) / 2;

    setPosition({ top, left });
  }, [height, width]);

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-th-white bg-opacity-50 z-30 animate-th-fade-in" onClick={onClose} ></div>

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
  thColor: ThColorKeys;
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => (void);
}

const ThPopup: React.FC<ThPopupProps> = ({ width, height, thColor, button, children, isOpen, onClose }) => {
  return (
    <>
      <div >
        {button}
      </div>
      {isOpen &&
        <ThPopupPortal width={width} height={height} thColor={thColor} onClose={onClose}>
          {children}
        </ThPopupPortal>
      }
    </>
  );
};

export default ThPopup;