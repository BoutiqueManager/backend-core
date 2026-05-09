export declare enum Gender {
    MEN = "men",
    WOMEN = "women",
    KIDS = "kids",
    UNISEX = "unisex"
}
export declare class ProductCategories {
    id: string;
    name: string;
    gender: Gender | null;
    description?: string;
    imagePreviewKey?: string;
    imageOriginalKey?: string;
    createdAt: Date;
    updatedAt: Date;
}
export default ProductCategories;
