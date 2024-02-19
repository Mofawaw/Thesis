interface ThScaleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ThScaleButton: React.FC<ThScaleButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button {...props} className={`
      transition duration-150 ease-in-out
      hover:scale-110
      active:scale-95 active:duration-100
    `}>
      {children}
    </button>
  );
}

export default ThScaleButton;