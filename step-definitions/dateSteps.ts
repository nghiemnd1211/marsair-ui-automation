import { Then } from '@cucumber/cucumber';
import ResultsPage from '../pages/ResultsPage';
import { expect } from 'chai';

const results = new ResultsPage();

Then('I should see "Unfortunately, this schedule is not possible. Please try again." message', async function() {
    const t = await results.getMainMessageText();
    expect(t).to.include('Unfortunately, this schedule is not possible. Please try again.');
});
