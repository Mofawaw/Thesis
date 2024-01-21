import { CastleValue, CastleReference, CastleTogether } from '@/assets/images/castles.tsx'

export type ThCastleKey = 'castle-value' | 'castle-reference' | 'castle-together';

interface ThCastleProps extends React.SVGProps<SVGSVGElement> {
  castle: ThCastleKey;
  grey?: boolean;
}

export const ThCastle: React.FC<ThCastleProps> = ({
  castle,
  grey = false,
  ...props
}) => {
  let CastleComponent;

  switch (castle) {
    case 'castle-value':
      CastleComponent = <CastleValue grey={grey} {...props} />;
      break;
    case 'castle-reference':
      CastleComponent = <CastleReference grey={grey} {...props} />;
      break;
    case 'castle-together':
      CastleComponent = <CastleTogether grey={grey} {...props} />;
      break;
    default:
      return null;
  }

  return CastleComponent;
};