import type { Product, ProductImage } from "../types/product.types";

type GalleryImages = ProductImage[] | string[] | null;

function getGalleryImageUrls(gallery: GalleryImages): string[] {
  if (!gallery) {
    return [];
  }

  if (Array.isArray(gallery)) {
    return gallery.map((img) =>
      typeof img === "string"
        ? img
        : img.thumbnail_url ?? img.medium_url ?? img.large_url ?? img.image_url,
    );
  }

  return [];
}

export function getAllProductImages(product: Product): { id: number; url: string; is_primary?: boolean }[]{
  const images: { id: number; url: string; is_primary?: boolean }[] = [];

  if (product.featured_image) {
    images.push({
      id: 0,
      url:
        product.featured_image.thumbnail_url ??
        product.featured_image.medium_url ??
        product.featured_image.large_url ??
        product.featured_image.image_url,
      is_primary: true,
    });
  }

  const galleryUrls = getGalleryImageUrls(product.gallery_images);
  images.push(...galleryUrls.map((url, index) => ({ id: index + 1, url })));

  return [...new Map(images.map((img) => [img.url, img])).values()];
}