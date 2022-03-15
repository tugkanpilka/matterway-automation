// Libraries
import puppeteer, { Browser } from 'puppeteer';

// Factories
import AmazonFactory from "./factories/amazonFactory";
import GoodReadsFactory from "./factories/goodReadsFactory";
import InteractionFactory from "./factories/interactionFactory";

// Helpers
import { findCategory } from "./helpers/category";


async function prepareApplication() {
    return await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
}

async function goodReadsJobs(browser: Browser) {
    try {
        const goodReads = new GoodReadsFactory(browser);
        const categories = await goodReads.fetchCategories();

        const interactionFactory = new InteractionFactory();
        const category = await interactionFactory.askForCategory(categories);

        return findCategory(category.name, categories);
    } catch (e) {
        throw e;
    }
}

async function amazonJobs(browser: Browser, bookName: string): Promise<void> {
    try {
        const amazon = new AmazonFactory(browser);
        const searchResultPage = await amazon.searchBook(bookName);
        const bookDetailPage = await amazon.navigateToBookDetailPage(searchResultPage);
        await amazon.addBookToCart(bookDetailPage);
    } catch (e) {
        throw e;
    }
}

async function runApplication(): Promise<void> {
    const browser = await prepareApplication();
    try {
        const category = await goodReadsJobs(browser);
        await amazonJobs(browser, category.bookName);
    } catch (e) {
        console.log(e);
        await browser.close();
    }
}

runApplication();
