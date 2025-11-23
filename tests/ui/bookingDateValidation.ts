import BookingPage from '../pages/BookingPage';
import { expect } from 'chai';
import returnDateScenarios from '../data/bookingDateValidationTestData.json';

describe('MarsAir Booking Date Validation', () => {
    const booking = new BookingPage();

    beforeEach(async () => {
        await booking.open();
    });

    returnDateScenarios.forEach(({ departure, return: ret, valid, description }) => {
        const testTitle = valid
            ? `should allow valid trip when ${description}`
            : `should show error for invalid trip when ${description}`;

        it(testTitle, async () => {
            await booking.selectDeparture(departure);
            await booking.selectReturn(ret);
            await booking.clickSearch();

            if (valid) {
                const msg = await $('#seats-message'); // update selector as necessary
                expect(await msg.getText()).to.not.include('Unfortunately');
            } else {
                const errorMsg = await $('#error-message'); // update selector as necessary
                expect(await errorMsg.getText()).to.include('Unfortunately, this schedule is not possible');
            }
        });
    });
});
