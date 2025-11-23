import { Given, When, Then } from '@cucumber/cucumber';
import BookingPage from '../pages/BookingPage';
import ResultsPage from '../pages/ResultsPage';
import { expect } from 'chai';

const booking = new BookingPage();
const results = new ResultsPage();

Given('I am on the MarsAir booking page', async function(): Promise<void> {
    console.log('Step definition for "I am on the MarsAir booking page" executed');
    await booking.open();
});

When('Ntest', async function(): Promise<void> {
    // This step is intentionally left blank for testing purposes.
});

When('I select {string} as departure', async function(departure: string): Promise<void> {
    await booking.selectDeparture(departure);
});

When('I select {string} as return', async function(ret: string): Promise<void> {
    await booking.selectReturn(ret);
});

When('I click Search', async function(): Promise<void> {
    await booking.clickSearch();
});

Then('I should see {string} message', async function(expected: string): Promise<void> {
    const text = await results.getMainMessageText();
    expect(text).to.include(expected);
});
