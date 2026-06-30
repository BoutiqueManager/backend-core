/**
 * Image View Type Constants
 *
 * This file contains all image type constants used across the application.
 * These constants define the different types/views of images that can be uploaded.
 *
 * IMPORTANT: This is the single source of truth for image types.
 * Do not duplicate these constants elsewhere in the codebase.
 */
export declare enum ImageViewType {
    COVER = "cover",
    FRONT = "front",
    BACK = "back",
    SIDE_LEFT = "side-left",
    SIDE_RIGHT = "side-right",
    TOP = "top",
    CLOSEUP = "closeup",
    LIFESTYLE = "lifestyle",
    BANNER = "banner",
    HERO = "hero",
    PROMOTIONAL = "promotional",
    LOGO = "logo",
    PROFILE_COVER = "profile_cover",
    CERTIFICATE = "certificate",
    REVIEW_PHOTO = "review_photo",
    CATEGORY_ICON = "category_icon",
    CATEGORY_BANNER = "category_banner",
    PLACEHOLDER = "placeholder",
    DEFAULT = "default"
}
export declare enum MediaType {
    IMAGE = "image",
    VIDEO = "video"
}
export declare enum VideoType {
    PRODUCT_DEMO = "product_demo",
    PRODUCT_360 = "product_360",
    UNBOXING = "unboxing",
    TUTORIAL = "tutorial",
    CAMPAIGN_VIDEO = "campaign_video",
    TESTIMONIAL = "testimonial",
    BEHIND_SCENES = "behind_scenes"
}
/**
 * Helper function to check if a string is a valid ImageViewType
 */
export declare function isValidImageViewType(value: string): value is ImageViewType;
/**
 * Helper function to check if a string is a valid MediaType
 */
export declare function isValidMediaType(value: string): value is MediaType;
/**
 * Helper function to get all product image types
 */
export declare function getProductImageTypes(): ImageViewType[];
