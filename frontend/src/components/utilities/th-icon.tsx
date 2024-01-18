import {
  ThIconKey,
  PlayIcon,
  PlusIcon,
  MinusIcon,
  FitIcon,
  TutorialIcon,
  TippsIcon,
  CheckIcon,
} from "../../assets/icons/icons";

interface ThIconProps extends React.SVGProps<SVGSVGElement> {
  icon: ThIconKey;
}

const ThIcon: React.FC<ThIconProps> = ({
  icon,
  ...props
}) => {
  let IconComponent: React.FC<React.SVGProps<SVGSVGElement>> | null = null;

  switch (icon) {
    case 'play':
      IconComponent = PlayIcon;
      break;
    case 'plus':
      IconComponent = PlusIcon;
      break;
    case 'minus':
      IconComponent = MinusIcon;
      break;
    case 'fit':
      IconComponent = FitIcon;
      break;
    case 'tutorial':
      IconComponent = TutorialIcon;
      break;
    case 'tipps':
      IconComponent = TippsIcon;
      break;
    case 'check':
      IconComponent = CheckIcon;
      break;
    default:
      return null;
  }

  return <IconComponent {...props} />;
};

export default ThIcon;