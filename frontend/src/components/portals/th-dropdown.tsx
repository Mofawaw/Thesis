import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { ThColorKey } from "@/utilities/th-color.ts";
import ArrowIcon from '@/assets/icons/arrow-icon';
import { pxAccordingToRem, pxToRem } from '@/helpers/responsitivity';

interface ThDropdownPortalProps {
  position: "top" | "top-left";
  width: number;
  height: number;
  thColor: ThColorKey;
  gradientBorder?: boolean;
  children: React.ReactNode;
  buttonRef: React.RefObject<HTMLElement>;
  onClose: () => (void);
}

const ThDropdownPortal: React.FC<ThDropdownPortalProps> = ({
  position,
  width,
  height,
  thColor,
  gradientBorder = false,
  children,
  buttonRef,
  onClose
}) => {
  const [coordinates, setCoordinates] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const dropDownGap = 10

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      let top = rect.top + window.scrollY - pxAccordingToRem(height) - pxAccordingToRem(dropDownGap);
      const triggerCenterX = rect.left + rect.width / 2;
      let left = triggerCenterX - pxAccordingToRem(width) / 2;

      if (position === 'top-left') {
        left = rect.left - pxAccordingToRem(width) - dropDownGap;
        top = top + pxAccordingToRem(65);
      }

      setCoordinates({ top, left });
    }
  }, [buttonRef, height, width]);

  let border = gradientBorder ? 'th-bg-gradient' : `bg-${thColor}-20`;
  const borderPadding = 5;

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 w-full h-full z-30 animate-th-fade-in" onClick={onClose}></div>
      <div
        className={`absolute ${position === "top" ? "animate-th-zoom-in-from-bottom" : "animate-th-zoom-in-from-right"} z-40`}
        style={{ width: pxToRem(width), height: pxToRem(height), top: `${coordinates.top}px`, left: `${coordinates.left}px` }}
      >
        {/* Border Wrapper */}
        <div
          className={`${border} rounded-th absolute`}
          style={{ top: 0, right: 0, bottom: 0, left: 0, boxSizing: 'border-box' }}
        >
          {/* Content Wrapper */}
          <div
            className={`bg-${thColor}-30 rounded-th-inner absolute`}
            style={{ top: `${borderPadding}px`, right: `${borderPadding}px`, bottom: `${borderPadding}px`, left: `${borderPadding}px`, boxSizing: 'border-box' }}
          >
            {/* Arrow and Content */}
            <div
              className={`absolute z-50 ${position === 'top-left' ? '-bottom-5 -right-5 transform -rotate-90 -translate-y-[30px]' : '-bottom-5 left-1/2 transform -translate-x-1/2'}`}
            >
              <ArrowIcon className={`text-${thColor}-30`} />
            </div>
            {children}
          </div>
        </div>
      </div >
    </>,
    document.body
  );
};

interface ThDropdownProps {
  position: "top" | "top-left"
  width: number;
  height: number;
  thColor: ThColorKey;
  gradientBorder?: boolean;
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => (void);
}

const ThDropdown: React.FC<ThDropdownProps> = ({
  position,
  width,
  height,
  thColor,
  gradientBorder = false,
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
        <ThDropdownPortal position={position} width={width} height={height} thColor={thColor} gradientBorder={gradientBorder} buttonRef={buttonRef} onClose={onClose}>
          {children}
        </ThDropdownPortal>
      }
    </>
  );
};

export default ThDropdown;