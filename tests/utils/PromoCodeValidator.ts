export function validatePromoCode(code: string): { valid: boolean, discount?: number } {
    const pattern = /^[A-Z]{2}\d-[A-Z]{3}-\d{3}$/;
    if (!pattern.test(code)) return { valid: false };
    const digitsStr = code.replace(/[^0-9]/g, '');
    const digits = digitsStr.split('').map(d => parseInt(d, 10));
    const discountDigit = digits[0];
    const sum = digits.slice(0, -1).reduce((a, b) => a + b, 0);
    const check = sum % 10;
    if (check !== digits[digits.length - 1]) return { valid: false };
    return { valid: true, discount: discountDigit * 10 };
}
