// Libraries
import { Browser } from "puppeteer";

// Factories
import DataManipulatingFactory from "./dataManipulatingFactory";

// Utils
import {Category} from "../helpers/category";
import {ERROR_MESSAGES} from "../helpers/variables";


/**
 * @class
 * Factory class for fetching and manipulating data about books.
 */
export default class GoodReadsFactory {

    private readonly _baseUrl = 'https://www.goodreads.com';
    private readonly _browser: Browser;

    private dataFactory = new DataManipulatingFactory();

    constructor(browser: Browser) {
        this._browser = browser;
    }

    async fetchCategories() {
        const browser = this._browser;
        const page = await browser.newPage();
        await page.goto(`${this._baseUrl}${'/choiceawards/best-books-2020'}`);

        return await this.dataFactory.parseCategories(page);
    }
}