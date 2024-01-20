import { CastleValue, CastleReference, CastleTogether } from '@/assets/images/castles.tsx'

export type ThCastleKey = 'castle-value' | 'castle-reference' | 'castle-together';

interface ThCastleProps extends React.SVGProps<SVGSVGElement> {
  castle: ThCastleKey;
}

export const ThCastle: React.FC<ThCastleProps> = ({
  castle,
  ...props
}) => {
  let CastleComponent: React.FC<React.SVGProps<SVGSVGElement>> | null = null;

  switch (castle) {
    case 'castle-value':
      CastleComponent = CastleValue;
      break;
    case 'castle-reference':
      CastleComponent = CastleReference;
      break;
    case 'castle-together':
      CastleComponent = CastleTogether;
      break;
    default:
      return null;
  }

  return <CastleComponent {...props} />;
};