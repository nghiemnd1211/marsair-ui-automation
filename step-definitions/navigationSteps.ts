import { Given, When, Then } from '@cucumber/cucumber';
import BookingPage from '../pages/BookingPage';
import ResultsPage from '../pages/ResultsPage';
import { expect } from 'chai';

const booking = new BookingPage();
const results = new ResultsPage();

Given('I am on the results page', async function() {
    await booking.open();
    await booking.selectDeparture('July');
    await booking.selectReturn('July (next year)');
    await booking.clickSearch();
});

When('I click {string}', async function(linkText: string) {
    if (linkText === 'Book a ticket to the red planet now!') {
        await results.clickBookNow();
    } else {
        throw new Error('Unsupported link click: ' + linkText);
    }
});

When('I click the MarsAir logo', async function() {
    await results.clickLogo();
});

Then('I should be on the booking page', async function() {
    const url = await browser.getUrl();
    expect(url).to.include('/NghiemN');
});
