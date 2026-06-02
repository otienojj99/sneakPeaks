import React from "react";

interface ProductRatingProps {
  rating?: number; // 0 to 5, e.g. 4.5
  reviewCount?: number; // e.g. 9120
}

const ProductRating: React.FC<ProductRatingProps> = ({
  rating = 4.7,
  reviewCount = 9120,
}) => {
  const formartReviewCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(2)}k reviews`;
    }
    return `${count} reviews`;
  };

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5 text-yellow-400 text-lg">
        {/* Full starts */}

        {[...Array(fullStars)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-5 h-5"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.561-.955L10 0l2.95 5.955 6.561.955-4.256 4.635 1.123 6.545z" />
          </svg>
        ))}
        {/* Half star (using CSS for half effect) */}

        {hasHalfStar && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-5 h-5"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.561-.955L10 0l2.95 5.955 6.561.955-4.256 4.635 1.123 6.545z" />
          </svg>
        )}

        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            className="w-5 h-5 text-gray-300"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783 .57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.397c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {renderStars()}
      <span className="text-gray-600">{formartReviewCount(reviewCount)}</span>
    </div>
  );
};

export default ProductRating;
