import BookingPage from '../pages/BookingPage';
import { expect } from 'chai';

describe('MarsAir Home Navigation', () => {
    const booking = new BookingPage();
    beforeEach(async () => {
        await booking.open('https://marsair.recruiting.thoughtworks.net/NghiemN');
    });

    it('"Book a ticket to the red planet now!" link is visible', async () => {
        expect(await booking.isBookTicketVisible()).to.be.true;
    });

    it('Clicking "Book a ticket" navigates to home page', async () => {
        await booking.clickBookTicket();
        expect(await booking.getCurrentUrl()).to.include('NghiemN');
    });

    it('MarsAir logo navigation goes home', async () => {
        await booking.clickLogo();
        expect(await booking.getCurrentUrl()).to.include('NghiemN');
    });
});
