export default class BookingPage {
    get departingBtn() { return $('#departing'); }
    get returningBtn() { return $('#returning'); }
    get promoInput() { return $('#promo'); }
    get searchBtn() { return $('button#search'); }

    async open() {
        // Note: the app requires access via email-linked session.
        await browser.url('https://marsair.recruiting.thoughtworks.net/NghiemN');
    }

    async selectMonthFromDropdown(dropdownElem: WebdriverIO.Element, monthLabel: string) {
        await dropdownElem.click();
        const option = await $(`button[data-month="${monthLabel}"]`);
        if (await option.isExisting()) {
            await option.click();
            return;
        }
        const elems = await $$('button.month-option');
        for (const e of elems) {
            const txt = await e.getText();
            if (txt.trim() === monthLabel) {
                await e.click();
                return;
            }
        }
        throw new Error(`Month option "${monthLabel}" not found`);
    }

    async selectDeparture(month: string) {
        await this.selectMonthFromDropdown(await this.departingBtn, month);
    }

    async selectReturn(month: string) {
        await this.selectMonthFromDropdown(await this.returningBtn, month);
    }

    async enterPromo(code: string) {
        await (await this.promoInput).setValue(code);
    }

    async clickSearch() {
        await (await this.searchBtn).click();
    }
}
