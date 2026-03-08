/**
 * Image View Type Constants
 *
 * This file contains all image type constants used across the application.
 * These constants define the different types/views of images that can be uploaded.
 *
 * IMPORTANT: This is the single source of truth for image types.
 * Do not duplicate these constants elsewhere in the codebase.
 */

export enum ImageViewType {
  // Product image types
  COVER = "cover",
  FRONT = "front",
  BACK = "back",
  SIDE_LEFT = "side-left",
  SIDE_RIGHT = "side-right",
  TOP = "top",
  CLOSEUP = "closeup",
  LIFESTYLE = "lifestyle",

  // Campaign image types
  BANNER = "banner",
  HERO = "hero",
  PROMOTIONAL = "promotional",

  // Profile image types
  LOGO = "logo",
  PROFILE_COVER = "profile_cover",
  CERTIFICATE = "certificate",

  // Review image types
  REVIEW_PHOTO = "review_photo",

  // Category image types
  CATEGORY_ICON = "category_icon",
  CATEGORY_BANNER = "category_banner",

  // System image types
  PLACEHOLDER = "placeholder",
  DEFAULT = "default",
}

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
}

export enum VideoType {
  PRODUCT_DEMO = "product_demo",
  PRODUCT_360 = "product_360",
  UNBOXING = "unboxing",
  TUTORIAL = "tutorial",
  CAMPAIGN_VIDEO = "campaign_video",
  TESTIMONIAL = "testimonial",
  BEHIND_SCENES = "behind_scenes",
}

/**
 * Helper function to check if a string is a valid ImageViewType
 */
export function isValidImageViewType(value: string): value is ImageViewType {
  return Object.values(ImageViewType).includes(value as ImageViewType);
}

/**
 * Helper function to check if a string is a valid MediaType
 */
export function isValidMediaType(value: string): value is MediaType {
  return Object.values(MediaType).includes(value as MediaType);
}

/**
 * Helper function to get all product image types
 */
export function getProductImageTypes(): ImageViewType[] {
  return [
    ImageViewType.COVER,
    ImageViewType.FRONT,
    ImageViewType.BACK,
    ImageViewType.SIDE_LEFT,
    ImageViewType.SIDE_RIGHT,
    ImageViewType.TOP,
    ImageViewType.CLOSEUP,
    ImageViewType.LIFESTYLE,
  ];
}
