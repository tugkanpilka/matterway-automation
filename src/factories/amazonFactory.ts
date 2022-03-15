// Libraries
import { Browser, Page } from "puppeteer";

// Utils
import { ERROR_MESSAGES } from '../helpers/variables';


/**
 * Responsible for navigating in Amazon and managing corresponding data data.
 * @class
 *
 */
export default class AmazonFactory {

    private readonly _baseUrl = 'https://www.amazon.com';
    private readonly _browser: Browser;

    // Selectors for proper buying option.
    private readonly _buyingOptions = [
        '#buy-now-button',
        '#one-click-button',
        '#add-to-cart-button',
        '#a-autoid-11'
    ];

    constructor(browser: Browser) {
        this._browser = browser;
    }

    /**
     * Searches for a book on Amazon.
     * @param bookName
     * @return page - Search page fulfilled with results.
     */
    async searchBook(bookName: string): Promise<Page> {
        try {
            const browser = this._browser;
            const page = await browser.newPage();
            await page.setViewport({ width: 1280, height: 724 });
            await page.goto(this._baseUrl);

            await page.type('#twotabsearchtextbox', bookName);
            await page.click('#nav-search-submit-button');
            await page.waitForNavigation();
            return page;
        } catch (e) {
            throw new Error(ERROR_MESSAGES.BOOK_NOT_FOUND);
        }
    }

    /**
     * Navigates to desired book's detail page.
     * @param page - SearchPage provided by AmazonFactory.searchBook function.
     * @result page - Book's detail page.
     */
    async navigateToBookDetailPage(page: Page): Promise<Page> {
        const firstResult = await page.waitForXPath('//*[@id="search"]/div[1]/div[1]/div/span[3]/div[2]/div[2]/div/div/div/div/div/div[2]/div/div/div[1]/h2/a');
        if (firstResult) {
            await firstResult.click();
            await page.waitForNavigation();
        }

        return page;
    }

    /**
     *
     * @param page - Book detail page (Amazon)
     *
     * Checks product's detail page for following 4 situations:
     * 1. The book cannot be purchased
     * 2. The book has audio option primary.
     * 3. The book has multiple buying options - excluding 'Buy right now'
     * 4. The book has 'Buy right now' button.
     *
     * Then clicks the proper buying option.
     */
    async addBookToCart(page: Page) {
        let index = 0;

        while(index < this._buyingOptions.length) {
            const button = await page.$(this._buyingOptions[index]);
            if (button) {
                await button.click();
                return;
            }
            index++;
        }

        throw new Error(ERROR_MESSAGES.LACK_OF_BUY_OPTIONS);
    }
}