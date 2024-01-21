import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ThColorKey } from "@/utilities/th-color.ts";
import ArrowIcon from '@/assets/icons/arrow-icon';

interface ThDropdownPortalProps {
  width: number;
  height: number;
  thColor: ThColorKey;
  children: React.ReactNode;
  buttonRef: React.RefObject<HTMLElement>;
  onClose: () => (void);
}

const ThDropdownPortal: React.FC<ThDropdownPortalProps> = ({
  width,
  height,
  thColor,
  children,
  buttonRef,
  onClose
}) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const dropDownGap = 10

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      const top = rect.top + window.scrollY - height - dropDownGap;
      const triggerCenterX = rect.left + rect.width / 2;
      const left = triggerCenterX - width / 2;

      setPosition({ top, left });
    }
  }, [buttonRef, height, width]);

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 w-full h-full z-30 animate-th-fade-in" onClick={onClose} ></div>
      <div
        style={{ width: `${width}px`, height: `${height}px`, top: `${position.top}px`, left: `${position.left}px` }}
        className={`absolute bg-${thColor}-30 rounded-th border-th border-${thColor}-20 animate-th-zoom-in-from-bottom z-40`}
      >
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 z-50">
          <ArrowIcon className={`text-${thColor}-30`} />
        </div>
        {children}
      </div>
    </>,
    document.body
  );
};

interface ThDropdownProps {
  width: number;
  height: number;
  thColor: ThColorKey;
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => (void);
}

const ThDropdown: React.FC<ThDropdownProps> = ({
  width,
  height,
  thColor,
  button,
  children,
  isOpen,
  onClose
}) => {
  const buttonRef = useRef<any>(null);

  return (
    <>
      <div ref={buttonRef}>
        {button}
      </div>
      {isOpen &&
        <ThDropdownPortal width={width} height={height} thColor={thColor} buttonRef={buttonRef} onClose={onClose}>
          {children}
        </ThDropdownPortal>
      }
    </>
  );
};

export default ThDropdown;