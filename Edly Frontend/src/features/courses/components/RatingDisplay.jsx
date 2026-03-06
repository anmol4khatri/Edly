const Rating = ({ rating }) => {
  const maxStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - Math.ceil(rating);

  const StarIcon = ({ className }) => (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );

  const FilledStar = () => <StarIcon className="icon-sm star-filled me-1" />;

  const HalfStar = () => (
    <div className="relative icon-sm me-1">
      <StarIcon className="absolute icon-sm star-empty" />
      <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
        <StarIcon className="icon-sm star-filled" />
      </div>
    </div>
  );

  const EmptyStar = () => <StarIcon className="icon-sm star-empty me-1" />;

  return (
    <div className="flex items-center">
      {Array.from({ length: filledStars }, (_, i) => (
        <FilledStar key={`filled-${i}`} />
      ))}
      {hasHalfStar && <HalfStar key="half" />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <EmptyStar key={`empty-${i}`} />
      ))}
      <span className="ms-2 body-default text-muted-foreground">{rating} out of 5</span>
    </div>
  );
};

export default Rating;
