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
        return ''
    }

    async clickBookNow() {
        await (await this.bookLink).click();
    }

    async clickLogo() {
        await (await this.logo).click();
    }

    async verifyPromoApplied(code: string, discount: string): Promise<boolean> {
        const message = await this.getPromoMessageText();
        return message !== null &&
           message.includes(code) &&
           message.includes(`${discount}%`);
        }
        
    async verifyPromoInvalid(code: string): Promise<boolean> {
        const message = await this.getPromoMessageText();
        return message !== null &&
            message.includes('Sorry') &&
            message.includes(code) &&
            message.includes('not valid');
        }
}
