import BookingPage from '../pages/BookingPage';
import ResultsPage from '../pages/ResultsPage';
import promoCodes from '../data/promoCodeTestData.json';
import { expect } from 'chai';

const booking = new BookingPage();
const resultsPage = new ResultsPage();

describe('MarsAir Promotional Codes', () => {

    beforeEach(async () => {
        await booking.open('https://marsair.recruiting.thoughtworks.net/NghiemN');
    });

    // VALID PROMO CODES
    promoCodes.valid.forEach(({ code, discount }) => {
        it(`Valid promo code: ${code}`, async () => {
            await booking.enterPromoCode(code);
            await booking.clickSearch();

            const expectedText = `Promotional code ${code} used: ${discount}% discount!`;

            await resultsPage.verifyPromoApplied(code, discount, expectedText);
        });
    });

    // INVALID PROMO CODES
    promoCodes.invalid.forEach((invalidCode) => {
        it(`Invalid promo code: ${invalidCode}`, async () => {
            await booking.enterPromoCode(invalidCode);
            await booking.clickSearch();

            const expectedText = `Sorry, code ${invalidCode} is not valid`;

            await resultsPage.verifyPromoInvalid(expectedText);
        });
    });

    // EMPTY PROMO CODE
    it('Empty promotional code proceeds without discount', async () => {
        await booking.enterPromoCode('');
        await booking.clickSearch();

        const isMessageShown = await $('#promo-message').isExisting();
        expect(isMessageShown).to.be.false;
    });
});
