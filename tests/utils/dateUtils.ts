
export function isTripValid(departureDate: string, returnDate: string): boolean {
    if (departureDate === 'Select...' || returnDate === 'Select...') return false;

    const parseDateOption = (dateStr: string): { month: 'July' | 'December'; yearOffset: number } => {
        const month = dateStr.startsWith('July') ? 'July' : 'December';
        let yearOffset = 0;
        if (dateStr.includes('Next year')) yearOffset = 1;
        else if (dateStr.includes('Next two years')) yearOffset = 2;
        return { month, yearOffset };
    };

    const dep = parseDateOption(departureDate);
    const ret = parseDateOption(returnDate);

    const monthOrder: Record<'July' | 'December', number> = { 'July': 0, 'December': 1 };

    if (ret.yearOffset < dep.yearOffset) return false;
    if (ret.yearOffset === dep.yearOffset && monthOrder[ret.month] < monthOrder[dep.month]) return false;

    const yearDiff = ret.yearOffset - dep.yearOffset;
    const monthDiff = monthOrder[ret.month] - monthOrder[dep.month];
    const totalMonths = yearDiff * 12 + monthDiff;

    return totalMonths >= 12;
}
