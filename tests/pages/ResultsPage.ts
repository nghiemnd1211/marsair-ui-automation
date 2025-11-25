import { expect } from 'chai';
import BasePage from './BasePage';

export default class ResultsPage extends BasePage{
    get promoMessage() { return $('#promo-message'); }
    get seatsMessage() { return $('#content p'); }
    
    async verifySeatsAvailability(expectedMessage: string): Promise<boolean> {
        if (!await this.seatsMessage.isExisting()) return false;
        const text = (await this.seatsMessage.getText()).trim();
        return text.includes(expectedMessage);
    }


    async verifyPromoApplied(code: string, discount: number, expectedMsg: string) {
        await this.promoMessage.waitForDisplayed({ timeout: 5000 });
        const actual = await this.promoMessage.getText();

        expect(actual).to.equal(
            expectedMsg,
            `Promo message is incorrect.\nExpected: ${expectedMsg}\nActual: ${actual}`
        );
    }

    async verifyPromoInvalid(expectedMsg: string) {
        await this.promoMessage.waitForDisplayed({ timeout: 5000 });
        const actual = await this.promoMessage.getText();

        expect(actual).to.equal(
            expectedMsg,
            `Invalid promo message is incorrect.\nExpected: ${expectedMsg}\nActual: ${actual}`
        );
    }
}
