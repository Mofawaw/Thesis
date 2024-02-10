import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ThColorKey } from "@/utilities/th-color.ts";
import ArrowIcon from '@/assets/icons/arrow-icon';

interface ThDropdownPortalProps {
  width: number;
  height: number;
  thColor: ThColorKey;
  gradientBorder?: boolean;
  children: React.ReactNode;
  buttonRef: React.RefObject<HTMLElement>;
  onClose: () => (void);
}

const ThDropdownPortal: React.FC<ThDropdownPortalProps> = ({
  width,
  height,
  thColor,
  gradientBorder = false,
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

  let border = gradientBorder ? 'th-bg-gradient' : `bg-${thColor}-20`;
  const borderPadding = 5;

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 w-full h-full z-30 animate-th-fade-in" onClick={onClose}></div>
      <div
        className="absolute animate-th-zoom-in-from-bottom z-40"
        style={{ width: `${width}px`, height: `${height}px`, top: `${position.top}px`, left: `${position.left}px` }}
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
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 z-50">
              <ArrowIcon className={`text-${thColor}-30`} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

interface ThDropdownProps {
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
        <ThDropdownPortal width={width} height={height} thColor={thColor} gradientBorder={gradientBorder} buttonRef={buttonRef} onClose={onClose}>
          {children}
        </ThDropdownPortal>
      }
    </>
  );
};

export default ThDropdown;