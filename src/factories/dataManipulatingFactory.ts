// Libraries
import { Page } from "puppeteer";

// Utils
import { Category } from "../helpers/category";

/**
 * Responsible for manipulating data.
 */
export default class DataManipulatingFactory {

    /**
     * Parses categories on GoodReads page and returns array of Category.
     * @param page
     */
    async parseCategories(page: Page): Promise<Category[]> {
        return await page.evaluate(() => {
            const categories = document.querySelectorAll('.category > a');
            const categoryList = Array
                .from(categories)
                .map((category)=> {
                    const image = category.querySelector('.category__winnerImage');
                    const name = category.textContent;

                    return {
                        name: name && name.replace(/\n/g,""),
                        bookName: image && image.getAttribute('alt'),
                    } as Category
                });

            return categoryList.filter((category) => category.name && category.bookName);
        });
    }
}