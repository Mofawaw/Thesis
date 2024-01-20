export interface ThStarProps extends React.HTMLProps<HTMLDivElement> {
  corners: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
}

const ThStar: React.FC<ThStarProps> = ({
  corners,
  ...props
}) => {
  const outerRadius = 1;
  const innerRadius = 0.5;

  const generateClipPath = () => {
    let path = "";
    for (let i = 0; i < corners * 2; i++) {
      const angle = (Math.PI / corners) * i;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;

      const x = 50 + radius * Math.cos(angle) * 50;
      const y = 50 + radius * Math.sin(angle) * 50;

      path += `${x}% ${y}%, `;
    }
    return `polygon(${path.slice(0, -2)})`;
  }

  const style = {
    clipPath: generateClipPath(),
    ...props.style,
  }

  return <div style={style} {...props} />;
}

export default ThStar;