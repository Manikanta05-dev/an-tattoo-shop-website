import type { ReviewItem } from '@/types';

interface ReviewCardProps {
  review: ReviewItem;
}

function StarRating({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
          fill={i < rating ? '#ffffff' : 'none'}
          stroke="#ffffff"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="bg-zinc-900 border border-white/10 rounded-none p-6 flex flex-col">
      {/* Optional photo */}
      {review.photo && (
        <div className="mb-4 -mx-6 -mt-6">
          <img
            src={review.photo}
            alt={`Photo of ${review.name}`}
            loading="lazy"
            className="h-48 w-full object-cover"
          />
        </div>
      )}

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Review text */}
      <p className="text-gray-200 text-sm leading-relaxed mt-3 flex-grow">
        "{review.text}"
      </p>

      {/* Name and date */}
      <div className="mt-4 flex items-center justify-between">
        <span className="font-display text-white font-medium">{review.name}</span>
        <span className="text-gray-400 text-sm">{review.date}</span>
      </div>
    </article>
  );
}
