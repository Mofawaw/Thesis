import { ThStage } from '@/types/th-types.ts';

const stages: ThStage[] = [
  {
    id: "s1",
    label: "Wertetypen",
    color: "th-value",
    logo: "castle-value",
    levels: [
      { id: "s1-l1", order: 0 },
      { id: "s1-l2", order: 1 },
      { id: "s1-l3", order: 2 },
      { id: "s1-l4", order: 3 },
      { id: "s1-l5", order: 4 },
      { id: "s1-l6", order: 5 },
      { id: "s1-l7", order: 6 },
      { id: "s1-lfinal", order: 7 }
    ]
  },
  {
    id: "s2",
    label: "Referenztypen",
    color: "th-reference",
    logo: "castle-reference",
    levels: [
      { id: "s2-l1", order: 0 },
      { id: "s2-l2", order: 1 },
      { id: "s2-l3", order: 2 },
      { id: "s2-l4", order: 3 },
      { id: "s2-l5", order: 4 },
      { id: "s2-l6", order: 5 },
      { id: "s2-l7", order: 6 },
      { id: "s2-l8", order: 7 },
      { id: "s2-l9", order: 8 },
      { id: "s2-lfinal", order: 9 }
    ]
  },
  {
    id: "s3",
    label: "Werte- & Referenztypen",
    color: "th-together",
    logo: "castle-together",
    levels: [
      { id: "s3-l1", order: 0 },
      { id: "s3-l2", order: 1 },
      { id: "s3-l3", order: 2 },
      { id: "s3-l4", order: 3 },
      { id: "s3-l5", order: 4 },
      { id: "s3-l6", order: 5 },
      { id: "s3-l7", order: 6 },
      { id: "s3-l8", order: 7 },
      { id: "s3-l9", order: 8 },
      { id: "s3-l10", order: 9 },
      { id: "s3-l11", order: 10 },
      { id: "s3-lfinal", order: 11 }
    ]
  }
];

export default stages;