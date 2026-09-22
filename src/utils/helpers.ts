export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // spaces → hyphens
    .replace(/[^\w-]+/g, '')     // remove special chars
}

export const getImageUrl = (image?: string | Record<string, any> | null): string | undefined => {
  if (!image) return undefined;
  if (typeof image === 'string') return image;

  if (typeof image === 'object' && image !== null) {
    return (
      image.url ??
      image.thumbnail_url ??
      image.medium_url ??
      image.large_url ??
      image.image_url ??
      undefined
    );
  }

  return undefined;
}