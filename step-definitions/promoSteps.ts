import { Given, When, Then } from '@cucumber/cucumber';
import BookingPage from '../pages/BookingPage';
import ResultsPage from '../pages/ResultsPage';
import { expect } from 'chai';

const booking = new BookingPage();
const results = new ResultsPage();

Given('I am on the MarsAir booking page', async function() {
    console.log('Executing step: I am on the MarsAir booking page');
    await booking.open();
});

When('I enter promotional code {string}', async function(code: string) {
    await booking.enterPromo(code);
});

Then('I should see promo result {string}', async function(expected: string) {
    const txt = await results.getPromoMessageText();
    expect(txt).to.equal(expected);
});
