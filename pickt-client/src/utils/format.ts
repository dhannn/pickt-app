export function getRelativeDateTime(timestamp: Date): string {
    const today = new Date();
    const yearDiff = today.getFullYear() - timestamp.getFullYear();
    const monthDiff = today.getMonth() - timestamp.getMonth();
    const dayDiff = today.getDate() - timestamp.getDate();
    const hourDiff = today.getHours() - timestamp.getHours();
    const minuteDiff = today.getMinutes() - timestamp.getMinutes();
    const secondDiff = today.getSeconds() - timestamp.getSeconds();

    const units = {
        'year': yearDiff,
        'month': monthDiff,
        'day': dayDiff,
        'hour': hourDiff,
        'minute': minuteDiff,
        'second': secondDiff
    }
    
    let significantUnit: string = 'second';

    if (yearDiff > 0) {
        significantUnit = 'year';
    } else if (monthDiff > 0) {
        significantUnit = 'month';
    } else if (dayDiff > 0) {
        significantUnit = 'day';
    } else if (hourDiff > 0) {
        significantUnit = 'hour';
    } else if (minuteDiff > 0) {
        significantUnit = 'minute';
    } else if (secondDiff > 0) {
        significantUnit = 'second';
    }

    const significantDigit = (units as any)[significantUnit];
    return `${significantDigit} ${significantUnit}${significantDigit === 1? '': 's'} ago`;
}

export function htmlify(str: string) {
    return str.replace(/\n/g, '<br/>');
}
