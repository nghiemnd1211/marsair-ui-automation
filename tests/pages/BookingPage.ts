export default class BookingPage {
    get departingBtn() { return $('#departing'); }
    get returningBtn() { return $('#returning'); }
    get promoInput() { return $('#promo'); }
    get searchBtn() { return $('button#search'); }

    async open() {
        // Note: the app requires access via email-linked session.
        await browser.url('https://marsair.recruiting.thoughtworks.net/NghiemN');
    }

    /**
     * Selects a month from the dropdown element by clicking on the dropdown and choosing the option.
     * @param dropdownElem The dropdown button element or promise resolving to element.
     * @param monthLabel The label of the month to select.
     */
    private async selectMonthFromDropdown(dropdownElem: WebdriverIO.Element | Promise<WebdriverIO.Element>, monthLabel: string): Promise<void> {
        const elem = await dropdownElem;
        await elem.click();
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

    /**
     * Selects the departure month by leveraging common dropdown selector.
     * @param month The month to select as departure.
     */
    async selectDeparture(month: string): Promise<void> {
        await this.selectMonth('departingBtn', month);
    }

    /**
     * Selects the return month by leveraging common dropdown selector.
     * @param month The month to select as return.
     */
    async selectReturn(month: string): Promise<void> {
        await this.selectMonth('returningBtn', month);
    }

    /**
     * Helper method to select month from dropdown by button key.
     * @param buttonName The property name of the dropdown button.
     * @param month The month label to select.
     */
    private async selectMonth(buttonName: 'departingBtn' | 'returningBtn', month: string): Promise<void> {
        const button = this[buttonName] as unknown as WebdriverIO.Element | Promise<WebdriverIO.Element>;
        await this.selectMonthFromDropdown(button, month);
    }

    async enterPromo(code: string) {
        await (await this.promoInput).setValue(code);
    }

    async clickSearch() {
        await (await this.searchBtn).click();
    }
}
