import BookingPage from '../pages/BookingPage';
import { expect } from 'chai';
import { dateOptions, seatAvailabilityScenarios } from '../data/searchAndBookingFlowTestData.json';
import { isTripValid } from '../utils/dateUtils';

describe('MarsAir Search and Booking Flow', () => {
    const booking = new BookingPage();
    beforeEach(async () => {
        await booking.open('https://marsair.recruiting.thoughtworks.net/NghiemN');
    });

    // All available seats tests
    seatAvailabilityScenarios
        .filter(s => s.seatsAvailable)
        .forEach(({ message }) => {
            dateOptions.forEach((departureDate: string) => {
                dateOptions.forEach((returnDate: string) => {
                    if (!isTripValid(departureDate, returnDate)) return;

                    it(`AVAILABLE - ${departureDate} → ${returnDate} should show "${message}"`, async () => {
                        await booking.selectDeparture(departureDate);
                        await booking.selectReturn(returnDate);
                        await booking.clickSearch();

                        const seatMsgText = await $('#seat-availability-message').getText();
                        expect(seatMsgText).to.include(message);
                    });
                });
            });
        });

    // All NO seats tests
    seatAvailabilityScenarios
        .filter(s => !s.seatsAvailable)
        .forEach(({ message }) => {
            dateOptions.forEach((departureDate: string) => {
                dateOptions.forEach((returnDate: string) => {
                    if (!isTripValid(departureDate, returnDate)) return;

                    it(`FULL - ${departureDate} → ${returnDate} should show "${message}"`, async () => {
                        await booking.selectDeparture(departureDate);
                        await booking.selectReturn(returnDate);
                        await booking.clickSearch();

                        const seatMsgText = await $('#seat-availability-message').getText();
                        expect(seatMsgText).to.include(message);
                    });
                });
            });
        });

    // Validation error test
    it('should show validation error when no dates are selected', async () => {
        await booking.selectDeparture('Select...');
        await booking.selectReturn('Select...');
        await booking.clickSearch();

        const errorMsgText = await $('#error-message').getText();
        expect(errorMsgText).to.include('Unfortunately, this schedule is not possible');
    });
});
