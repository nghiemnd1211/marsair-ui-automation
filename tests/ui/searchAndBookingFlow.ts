import BookingPage from '../pages/BookingPage';
import { expect } from 'chai';
import { dateOptions, seatAvailabilityScenarios } from '../data/searchAndBookingFlowTestData.json';

describe('MarsAir Search and Booking Flow', () => {
    const booking = new BookingPage();

    beforeEach(async () => {
        await booking.open();
    });

    describe('Search with seats available', () => {
        const availableScenarios = seatAvailabilityScenarios.filter(s => s.seatsAvailable);

        availableScenarios.forEach(({ message }) => {
            dateOptions.forEach((departureDate: string) => {
                dateOptions.forEach((returnDate: string) => {
                    const isValidTrip = (() => {
                        if (departureDate === 'Select...' || returnDate === 'Select...') return false;

                        const parseDateOption = (dateStr: string): { month: 'July' | 'December'; yearOffset: number } => {
                            const month = dateStr.startsWith('July') ? 'July' : 'December';
                            let yearOffset = 0;
                            if (dateStr.includes('Next year')) yearOffset = 1;
                            else if (dateStr.includes('Next two years')) yearOffset = 2;
                            return { month, yearOffset };
                        };

                        const dep = parseDateOption(departureDate);
                        const ret = parseDateOption(returnDate);

                        const monthOrder: Record<'July' | 'December', number> = { 'July': 0, 'December': 1 };
                        if (ret.yearOffset < dep.yearOffset) return false;
                        if (ret.yearOffset === dep.yearOffset && monthOrder[ret.month] < monthOrder[dep.month]) return false;

                        const yearDiff = ret.yearOffset - dep.yearOffset;
                        const monthDiff = monthOrder[ret.month] - monthOrder[dep.month];
                        const totalMonths = yearDiff * 12 + monthDiff;

                        return totalMonths >= 12;
                    })();

                    if (isValidTrip) {
                        it(`searching for trip from ${departureDate} to ${returnDate} with seats available should show message "${message}"`, async () => {
                            await booking.selectDeparture(departureDate);
                            await booking.selectReturn(returnDate);
                            await booking.clickSearch();

                            const seatMsgEl = await $('#seat-availability-message');
                            const seatMsgText = await seatMsgEl.getText();

                            expect(seatMsgText).to.include(message);
                        });
                    }
                });
            });
        });
    });

    describe('Search with no seats available', () => {
        const noSeatsScenarios = seatAvailabilityScenarios.filter(s => !s.seatsAvailable);

        noSeatsScenarios.forEach(({ message }) => {
            dateOptions.forEach((departureDate: string) => {
                dateOptions.forEach((returnDate: string) => {
                    const isValidTrip = (() => {
                        if (departureDate === 'Select...' || returnDate === 'Select...') return false;

                        const parseDateOption = (dateStr: string): { month: 'July' | 'December'; yearOffset: number } => {
                            const month = dateStr.startsWith('July') ? 'July' : 'December';
                            let yearOffset = 0;
                            if (dateStr.includes('Next year')) yearOffset = 1;
                            else if (dateStr.includes('Next two years')) yearOffset = 2;
                            return { month, yearOffset };
                        };

                        const dep = parseDateOption(departureDate);
                        const ret = parseDateOption(returnDate);

                        const monthOrder: Record<'July' | 'December', number> = { 'July': 0, 'December': 1 };
                        if (ret.yearOffset < dep.yearOffset) return false;
                        if (ret.yearOffset === dep.yearOffset && monthOrder[ret.month] < monthOrder[dep.month]) return false;

                        const yearDiff = ret.yearOffset - dep.yearOffset;
                        const monthDiff = monthOrder[ret.month] - monthOrder[dep.month];
                        const totalMonths = yearDiff * 12 + monthDiff;

                        return totalMonths >= 12;
                    })();

                    if (isValidTrip) {
                        it(`searching for trip from ${departureDate} to ${returnDate} with no seats available should show message "${message}"`, async () => {
                            await booking.selectDeparture(departureDate);
                            await booking.selectReturn(returnDate);
                            await booking.clickSearch();

                            const seatMsgEl = await $('#seat-availability-message');
                            const seatMsgText = await seatMsgEl.getText();

                            expect(seatMsgText).to.include(message);
                        });
                    }
                });
            });
        });
    });

    describe('Search without selecting dates', () => {
        it('should show validation error when no dates are selected', async () => {
            await booking.selectDeparture('Select...');
            await booking.selectReturn('Select...');
            await booking.clickSearch();

            const errorMsgEl = await $('#error-message');
            expect(await errorMsgEl.getText()).to.include('Unfortunately, this schedule is not possible');
        });
    });
});
