// Utils
import { ERROR_MESSAGES } from "./variables";

export interface Category {
    name: string,
    bookName: string,
}

/**
 * Searches the categoryName in categories array.
 * @param categoryName
 * @param categories
 */
export function findCategoryDetails(categoryName: string, categories: Category[]): Category {
    const category = categories.find((category) => category.name === categoryName);
    if (category) {
        return category;
    }

    throw new Error(ERROR_MESSAGES.CATEGORY_NOT_FOUND);
}