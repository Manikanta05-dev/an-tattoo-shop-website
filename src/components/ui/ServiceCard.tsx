import { Link } from 'react-router-dom';
import type { ServiceItem } from '@/types';

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="border border-white/10 p-8 flex flex-col hover:border-white/40 transition-colors duration-300">
      {/* Icon */}
      <span className="text-5xl mb-4" aria-hidden="true">
        {service.icon}
      </span>

      {/* Title */}
      <h3 className="font-display text-2xl text-white mb-3">{service.title}</h3>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 flex-grow">{service.description}</p>

      {/* Highlights */}
      {service.highlights.length > 0 && (
        <ul className="mb-6 space-y-1">
          {service.highlights.map((highlight, i) => (
            <li key={i} className="text-gray-500 text-xs">
              — {highlight}
            </li>
          ))}
        </ul>
      )}

      {/* Book Now CTA */}
      <Link
        to="/contact"
        className="btn btn-primary inline-flex items-center justify-center px-6 py-3 min-h-[44px] text-sm tracking-wide"
      >
        Book Now
      </Link>
    </article>
  );
}
