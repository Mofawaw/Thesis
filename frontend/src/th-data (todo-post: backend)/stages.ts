import { ThStage } from '@/types/th-types.ts';

const stages: ThStage[] = [
  {
    id: "s1",
    label: "Wertetypen",
    color: "th-value",
    logo: "castle-value",
    levels: ["s1-l1", "s1-l2", "s1-l3", "s1-l4", "s1-l5", "s1-l6", "s1-l7", "s1-lfinal"]
  },
  {
    id: "s2",
    label: "Referenztypen",
    color: "th-reference",
    logo: "castle-reference",
    levels: ["s2-l1", "s2-l2", "s2-l3", "s2-l4", "s2-l5", "s2-l6", "s2-l7", "s2-l8", "s2-l9", "s2-lfinal"]
  },
  {
    id: "s3",
    label: "Werte- & Referenztypen",
    color: "th-together",
    logo: "castle-together",
    levels: ["s3-l1", "s3-l2", "s3-l3", "s3-l4", "s3-l5", "s3-l6", "s3-l7", "s3-l8", "s3-l9", "s3-l10", "s3-l11", "s3-lfinal"]
  },
]

export default stages;