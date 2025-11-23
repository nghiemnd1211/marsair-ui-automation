import { expect } from 'chai';

export async function expectMessageContains(element: WebdriverIO.Element, expectedText: string): Promise<void> {
    const text = await element.getText();
    expect(text).to.include(expectedText);
}

export async function isElementVisible(element: WebdriverIO.Element): Promise<boolean> {
    return (await element.isExisting()) && (await element.isDisplayed());
}
