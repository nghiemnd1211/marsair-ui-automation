import BasePage from './BasePage';

export default class BookingPage extends BasePage {
    // Booking form elements
    get departingSelect() { return $('#departing'); }
    get returningSelect() { return $('#returning'); }
    get promoInput() { return $('#promotional_code'); }
    get searchBtn() { return $('input[type="submit"]'); }

    // Homepage elements
    get logo() { return $('h1 a'); }
    get bookTicketLink() { return $('=Book a ticket to the red planet now!'); }

    private async selectOptionFromSelect(selectElem: any, optionValue: string) {
        await selectElem.waitForDisplayed();
        await selectElem.click();
        const option = await selectElem.$(`option[value="${optionValue}"]`);
        await option.waitForExist();
        await option.click();
    }

    async selectDeparture(value: string) {
        await this.selectOptionFromSelect(this.departingSelect, value);
    }

    async selectReturn(value: string) {
        await this.selectOptionFromSelect(this.returningSelect, value);
    }

    async enterPromoCode(code: string) {
        await this.promoInput.setValue(code);
    }

    async clickSearch() {
        await this.searchBtn.click();
    }

    async isBookTicketVisible(): Promise<boolean> {
        return (await this.bookTicketLink.isExisting()) && (await this.bookTicketLink.isDisplayed());
    }

    async clickBookTicket() {
        await this.bookTicketLink.click();
    }

    async clickLogo() {
        await this.logo.click();
    }

    async getCurrentUrl(): Promise<string> {
        return browser.getUrl();
    }
}

