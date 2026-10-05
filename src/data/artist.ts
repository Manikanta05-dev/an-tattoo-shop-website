import type { ArtistData } from '@/types';

export const artist: ArtistData = {
  name: 'Anil Kumar',
  title: 'Founder & Lead Tattoo Artist',
  yearsExperience: 8,
  bio: `Anil Kumar is the founder and lead artist behind AN Tattoo Shop in Kalyandurg, Andhra Pradesh. With over 8 years of professional tattooing experience, Anil has dedicated his craft to mastering multiple styles — from hyper-realistic portraiture and bold blackwork to intricate tribal patterns and custom illustrative designs.

Trained under renowned artists in Hyderabad before returning to his roots in Kalyandurg, Anil\'s work is defined by his meticulous attention to detail, deep understanding of skin as a canvas, and his ability to translate a client\'s personal story into timeless body art. He believes every tattoo should be a reflection of the individual wearing it.

Beyond technical skill, Anil is known for creating a welcoming, pressure-free environment where first-timers and seasoned collectors alike feel at ease. His consultations are thorough, his lines are clean, and his commitment to hygiene and client safety is unwavering. AN Tattoo Shop is not just a business — it is Anil\'s creative home.`,
  photo: 'inkhub-1.jpg',
  specializations: ['Realism', 'Blackwork', 'Portrait', 'Tribal', 'Custom'],
  portfolioImages: [
    { id: 'a1', src: 'angelic-knight-1.jpg', alt: 'Angelic knight realism tattoo by Anil', category: 'Realism' },
    { id: 'a2', src: 'krishna-in-dhyan-1.jpg', alt: 'Krishna in dhyan portrait tattoo by Anil', category: 'Portrait' },
    { id: 'a3', src: 'cosmic-phoenix-1.jpg', alt: 'Cosmic phoenix realism tattoo by Anil', category: 'Realism' },
    { id: 'a4', src: 'enso-shogun-1.jpg', alt: 'Enso shogun blackwork tattoo by Anil', category: 'Blackwork' },
    { id: 'a5', src: 'karma-trishul-1.jpg', alt: 'Karma trishul tribal tattoo by Anil', category: 'Tribal' },
    { id: 'a6', src: 'natural-geometry-1.jpg', alt: 'Natural geometry blackwork tattoo by Anil', category: 'Blackwork' },
    { id: 'a7', src: 'serpent\'s-wrath-1.jpg', alt: "Serpent's wrath custom tattoo by Anil", category: 'Custom' },
    { id: 'a8', src: 'veni-vidi-vici-1.jpg', alt: 'Veni vidi vici tribal tattoo by Anil', category: 'Tribal' },
  ],
  testimonials: [
    {
      id: 't1',
      name: 'Arjun Reddy',
      rating: 5,
      text: 'Anil is one of the most talented artists I\'ve ever met. He took my rough concept sketch and turned it into a stunning full-sleeve masterpiece. His passion for the craft is evident in every single line.',
      date: '2024-11-15',
      photo: 'testimonial-2.jpg',
    },
    {
      id: 't2',
      name: 'Priya Sharma',
      rating: 5,
      text: 'As a first-timer I was nervous, but Anil made the whole experience feel comfortable and exciting. He explained every step, checked in constantly during the session, and the result is absolutely beautiful. I\'m already planning my next one.',
      date: '2024-10-28',
      photo: 'testimonial-3.jpg',
    },
    {
      id: 't3',
      name: 'Vikram Nair',
      rating: 5,
      text: 'Anil did a cover-up on a terrible old tattoo I\'d regretted for a decade. Not only did he completely hide it, but the new piece is something I\'m genuinely proud to show off. His creative problem-solving and artistic skill are second to none.',
      date: '2024-10-05',
      photo: 'testimonial-4.jpg',
    },
    {
      id: 't4',
      name: 'Divya Krishnan',
      rating: 5,
      text: 'I drove 3 hours to get tattooed by Anil and would do it a hundred times over. His blackwork is flawless — every geometric line is razor precise. The level of care and attention he puts into every client is extraordinary.',
      date: '2024-08-14',
      photo: 'testimonial-5.jpg',
    },
  ],
};
