interface ThStarProps {
  corners: 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
  [key: string]: any;
}

export default function ThStar({ corners, ...props }: ThStarProps) {
  const outerRadius = 1;
  const innerRadius = 0.5;

  const generateClipPath = () => {
    let path = "";
    for (let i = 0; i < corners * 2; i++) {
      // Calculate angle
      const angle = (Math.PI / corners) * i;

      // Use outerRadius for even points, innerRadius for odd points
      const radius = i % 2 === 0 ? outerRadius : innerRadius;

      // Calculate point
      const x = 50 + radius * Math.cos(angle) * 50;
      const y = 50 + radius * Math.sin(angle) * 50;

      path += `${x}% ${y}%, `;
    }
    return `polygon(${path.slice(0, -2)})`;
  };

  const style = {
    clipPath: generateClipPath(),
    ...props.style,
  };

  return <div style={style} {...props} />;
}