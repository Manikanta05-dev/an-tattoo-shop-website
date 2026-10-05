export type LeadStatus = 'New' | 'Contacted' | 'Booked' | 'Completed';

export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  tattooIdea: string;
  preferredDate: string;
  message: string;
  submittedAt: string; // ISO 8601
  status: LeadStatus;
}

export type PortfolioCategory = 'All' | 'Realism' | 'Blackwork' | 'Portrait' | 'Tribal' | 'Custom';

export interface PortfolioItem {
  id: string;
  src: string; // path relative to public/images/
  alt: string;
  category: Exclude<PortfolioCategory, 'All'>;
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  photo?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string; // emoji or SVG path name
  description: string;
  highlights: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArtistData {
  name: string;
  title: string;
  yearsExperience: number;
  bio: string;
  photo: string;
  specializations: string[];
  portfolioImages: PortfolioItem[];
  testimonials: ReviewItem[];
}
