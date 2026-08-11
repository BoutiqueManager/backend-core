"use strict";
/**
 * Image View Type Constants
 *
 * This file contains all image type constants used across the application.
 * These constants define the different types/views of images that can be uploaded.
 *
 * IMPORTANT: This is the single source of truth for image types.
 * Do not duplicate these constants elsewhere in the codebase.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoType = exports.MediaType = exports.ImageViewType = void 0;
exports.isValidImageViewType = isValidImageViewType;
exports.isValidMediaType = isValidMediaType;
exports.getProductImageTypes = getProductImageTypes;
var ImageViewType;
(function (ImageViewType) {
    // Product image types
    ImageViewType["COVER"] = "cover";
    ImageViewType["FRONT"] = "front";
    ImageViewType["BACK"] = "back";
    ImageViewType["SIDE_LEFT"] = "side-left";
    ImageViewType["SIDE_RIGHT"] = "side-right";
    ImageViewType["TOP"] = "top";
    ImageViewType["CLOSEUP"] = "closeup";
    ImageViewType["LIFESTYLE"] = "lifestyle";
    // Campaign image types
    ImageViewType["BANNER"] = "banner";
    ImageViewType["HERO"] = "hero";
    ImageViewType["PROMOTIONAL"] = "promotional";
    // Profile image types
    ImageViewType["LOGO"] = "logo";
    ImageViewType["PROFILE_COVER"] = "profile_cover";
    ImageViewType["CERTIFICATE"] = "certificate";
    // Review image types
    ImageViewType["REVIEW_PHOTO"] = "review_photo";
    // Category image types
    ImageViewType["CATEGORY_ICON"] = "category_icon";
    ImageViewType["CATEGORY_BANNER"] = "category_banner";
    // System image types
    ImageViewType["PLACEHOLDER"] = "placeholder";
    ImageViewType["DEFAULT"] = "default";
})(ImageViewType || (exports.ImageViewType = ImageViewType = {}));
var MediaType;
(function (MediaType) {
    MediaType["IMAGE"] = "image";
    MediaType["VIDEO"] = "video";
})(MediaType || (exports.MediaType = MediaType = {}));
var VideoType;
(function (VideoType) {
    VideoType["PRODUCT_DEMO"] = "product_demo";
    VideoType["PRODUCT_360"] = "product_360";
    VideoType["UNBOXING"] = "unboxing";
    VideoType["TUTORIAL"] = "tutorial";
    VideoType["CAMPAIGN_VIDEO"] = "campaign_video";
    VideoType["TESTIMONIAL"] = "testimonial";
    VideoType["BEHIND_SCENES"] = "behind_scenes";
})(VideoType || (exports.VideoType = VideoType = {}));
/**
 * Helper function to check if a string is a valid ImageViewType
 */
function isValidImageViewType(value) {
    return Object.values(ImageViewType).includes(value);
}
/**
 * Helper function to check if a string is a valid MediaType
 */
function isValidMediaType(value) {
    return Object.values(MediaType).includes(value);
}
/**
 * Helper function to get all product image types
 */
function getProductImageTypes() {
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
//# sourceMappingURL=ImageTypes.js.map