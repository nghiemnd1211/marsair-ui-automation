export default class ResultsPage {
    get mainMessage() { return $('#content .message'); }
    get promoMessage() { return $('#content .promo'); }
    get bookLink() { return $('a.book-now'); }
    get logo() { return $('#logo'); }

    async getMainMessageText(): Promise<string> {
        if (!await (await this.mainMessage).isExisting()) return '';
        return (await (await this.mainMessage).getText()).trim();
    }

    async getPromoMessageText(): Promise<string> {
        if (!await (await this.promoMessage).isExisting()) return '';
        return (await (await this.promoMessage).getText()).trim();
    }

    async clickBookNow() {
        await (await this.bookLink).click();
    }

    async clickLogo() {
        await (await this.logo).click();
    }
}
