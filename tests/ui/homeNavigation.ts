import BookingPage from '../pages/BookingPage';
import { expect } from 'chai';

describe('MarsAir Home Navigation', () => {
    const booking = new BookingPage();

    beforeEach(async () => {
        await booking.open();
    });

    it('"Book a ticket to the red planet now!" visibility', async () => {
        const bookTicketText = await $('=Book a ticket to the red planet now!');
        expect(await bookTicketText.isExisting()).to.be.true;
        expect(await bookTicketText.isDisplayed()).to.be.true;
    });

    it('Clicking "Book a ticket" navigates to home page', async () => {
        const bookTicketText = await $('=Book a ticket to the red planet now!');
        await bookTicketText.click();
        expect(await browser.getUrl()).to.include('NghiemN'); // Home URL fragment
    });

    it('MarsAir logo navigation goes home', async () => {
        const logo = await $('img[alt="MarsAir Logo"]'); // Update selector as needed
        await logo.click();
        expect(await browser.getUrl()).to.include('NghiemN'); // Home URL fragment
    });
});
