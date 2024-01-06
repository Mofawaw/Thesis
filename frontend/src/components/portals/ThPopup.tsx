import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ThColorKeys } from '../../../tailwind.config';

interface ThPopupPortalProps {
  width: number;
  height: number;
  thColor: ThColorKeys;
  children: React.ReactNode;
}

const ThPopupPortal: React.FC<ThPopupPortalProps> = ({ width, height, thColor, children }) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    const top = (window.innerHeight - height) / 2;
    const left = (window.innerWidth - width) / 2;

    setPosition({ top, left });
  }, [height, width]);

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-th-white bg-opacity-50 backdrop-blur-[2px] z-30 animate-th-fade-in"></div>

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
  children: React.ReactNode;
  trigger: React.ReactNode;
}

const ThPopup: React.FC<ThPopupProps> = ({ width, height, thColor, children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen &&
        <ThPopupPortal width={width} height={height} thColor={thColor}>
          {children}
        </ThPopupPortal>
      }
    </>
  );
};

export default ThPopup;