import { expect } from 'chai';

export default class BasePage {
    async open(path: string) {
        await browser.url(path);
    }

    async waitForVisible(element: WebdriverIO.Element, timeout = 5000) {
        await element.waitForDisplayed({ timeout });
    }
    
    async verifyPageTitle(expected: string) {
        const title = await browser.getTitle();
        expect(title).to.equal(expected);
    }

    async verifyPageHeader(){
        // TODO
    }

    async waitForPageLoad(){
        // TODO
    }

}