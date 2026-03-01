const Rating = ({ rating }) => {
  const maxStars = 5;
  const filledStars = Math.floor(rating); // Number of fully filled stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a partial star
  const emptyStars = maxStars - Math.ceil(rating); // Number of empty stars

  // Star SVG component for filled stars
  const FilledStar = () => (
    <svg
      className="w-4 h-4 text-yellow-300 me-1"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );

  // Star SVG component for half-filled stars
  const HalfStar = () => (
    <div className="relative w-4 h-4 me-1">
      <svg
        className="absolute w-4 h-4 text-gray-300 dark:text-gray-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
        <svg
          className="w-4 h-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      </div>
    </div>
  );

  // Star SVG component for empty stars
  const EmptyStar = () => (
    <svg
      className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );

  return (
    <div className="flex items-center">
      {/* Render filled stars */}
      {Array.from({ length: filledStars }, (_, i) => (
        <FilledStar key={`filled-${i}`} />
      ))}

      {/* Render half star if needed */}
      {hasHalfStar && <HalfStar key="half" />}

      {/* Render empty stars */}
      {Array.from({ length: emptyStars }, (_, i) => (
        <EmptyStar key={`empty-${i}`} />
      ))}

      <p className="ms-1 text-md font-medium text-gray-500 dark:text-gray-300">{rating}</p>
      <p className="ms-1 text-md font-medium text-gray-500 dark:text-gray-300">out of</p>
      <p className="ms-1 text-md font-medium text-gray-500 dark:text-gray-300">5</p>
    </div>
  );
};

export default Rating;
