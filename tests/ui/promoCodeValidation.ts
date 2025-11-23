import BookingPage from '../pages/BookingPage';
import { expect } from 'chai';
import promoCodes from '../data/promoCodeTestData.json';

describe('MarsAir Promotional Codes', () => {
    const booking = new BookingPage();

    beforeEach(async () => {
        await booking.open();
    });

    promoCodes.valid.forEach(({ code }) => {
        it(`Valid promo code: ${code}`, async () => {
            await booking.enterPromo(code);
            await booking.clickSearch();
            const message = await $('#promo-message'); // update selector as necessary
            expect(await message.getText()).to.include(`Promotional code ${code} used`);
        });
    });

    promoCodes.invalid.forEach((invalidCode) => {
        it(`Invalid promo code: ${invalidCode}`, async () => {
            await booking.enterPromo(invalidCode);
            await booking.clickSearch();
            const message = await $('#promo-message'); // update selector as necessary
            expect(await message.getText()).to.include(`Sorry, code ${invalidCode} is not valid`);
        });
    });

    it('Empty promotional code proceeds without discount', async () => {
        await booking.enterPromo('');
        await booking.clickSearch();
        const message = await $('#promo-message'); // may verify no discount message or absence of error
        expect(await message.isExisting()).to.be.false;
    });
});
