import BookingPage from '../pages/BookingPage';
import returnDateScenarios from '../data/bookingDateValidationTestData.json';
import ResultsPage from '../pages/ResultsPage';

const SEAT_AVAILABLE_MSG = 'Seats available! Call 0800 MARSAIR to book!';
const SEAT_UNAVAILABLE_MSG = 'Unfortunately, this schedule is not possible'
describe('MarsAir Booking Date Validation', () => {
    const booking = new BookingPage();
    const resultsPage = new ResultsPage();
    
    beforeEach(async () => {
        await booking.open('https://marsair.recruiting.thoughtworks.net/NghiemN');
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
                await resultsPage.verifySeatsAvailability(SEAT_AVAILABLE_MSG);
            } else {
                await resultsPage.verifySeatsAvailability(SEAT_UNAVAILABLE_MSG);
            }
        });
    });
});
