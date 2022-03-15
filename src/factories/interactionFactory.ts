// Libraries
import inquirer from 'inquirer';

// Utils
import { Category } from "../helpers/category";

/**
 * Responsible for managing interactions with user.
 * @class
 */
export default class InteractionFactory {

    /**
     * Asks a question to user.
     * @param categories - Categories fetched by GoodReadsFactory.
     * @return category - Category that selected by user.
     */
    async askForCategory(categories: Category[]): Promise<{ name: string }> {
        const question = {
            type: 'list',
            name: 'name',
            message: 'Select a book category.',
            choices: categories.map((category) => category.name),
        };

        return inquirer
            .prompt([question])
            .then((answer) => answer);
    }
}