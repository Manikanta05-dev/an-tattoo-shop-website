import type { ServiceItem } from '@/types';

export const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Custom Tattoo Design',
    icon: '✦',
    description:
      'Bring your vision to life with a one-of-a-kind tattoo designed exclusively for you. Our artist collaborates closely with you through a detailed consultation to craft a design that reflects your story, personality, and aesthetic.',
    highlights: [
      'In-depth design consultation included',
      'Multiple concept revisions until perfect',
      'All styles: realism, blackwork, portrait, tribal',
      'Digital mockup before any ink touches skin',
    ],
  },
  {
    id: '2',
    title: 'Cover-Up Tattoo',
    icon: '◈',
    description:
      'Transform an unwanted old tattoo into a stunning new piece of art. We specialise in expertly concealing faded, blurred, or regretted tattoos with bold and creative new designs that completely disguise what was there before.',
    highlights: [
      'Free cover-up assessment and analysis',
      'Strategic design to maximise coverage',
      'Works on most existing tattoos',
      'Final result that stands on its own as art',
    ],
  },
  {
    id: '3',
    title: 'Touch-Up & Refresh',
    icon: '◇',
    description:
      'Keep your existing tattoos looking crisp and vibrant. Over time, tattoos can fade, blur, or lose contrast. Our touch-up service restores the original detail and colour depth, making your ink look freshly done.',
    highlights: [
      'Colour restoration and brightening',
      'Line sharpening and detail re-inking',
      'Assessment of existing tattoo condition',
      'Extended longevity for your investment',
    ],
  },
  {
    id: '4',
    title: 'Free Consultation',
    icon: '○',
    description:
      'Not sure where to start? Book a free no-obligation consultation with our artist. We\'ll discuss your ideas, recommend styles that suit your body placement, walk you through the process, and provide a quote — all before any commitment.',
    highlights: [
      'Zero pressure, fully free session',
      'Style and placement recommendations',
      'Honest timeline and pricing estimates',
      'Aftercare guidance and healing advice',
    ],
  },
];
