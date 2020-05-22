function getNextHoliday(holiday) {
    const currentDate = new Date();

    if (holiday.isFixed === false) {
        const holidayWithYear = getDateOfHolidayByYear(
            holiday,
            currentDate.getFullYear()
        );
        if (currentDate >= holidayWithYear) {
            return getDateOfHolidayByYear(
                holiday,
                currentDate.getFullYear() + 1
            );
        } else {
            return holidayWithYear;
        }
    } else {
        if (
            getDayOfYear(currentDate) >=
            getDayOfYear(
                new Date(currentDate.getFullYear(), holiday.month, holiday.day)
            )
        ) {
            return new Date(
                currentDate.getFullYear() + 1,
                holiday.month,
                holiday.day
            );
        } else {
            return new Date(
                currentDate.getFullYear(),
                holiday.month,
                holiday.day
            );
        }
    }
}

function getDateOfHolidayByYear(holiday, year) {
    const firstOfMonth = new Date(year, holiday.month, 1);
    const firstDayOfWeek = firstOfMonth.getDay();
    const earliestPossibleDay = holiday.weekOfMonth * 7 + 1;
    const dayOfHolidayInMonth =
        earliestPossibleDay + ((holiday.dayOfWeek + 7 - firstDayOfWeek) % 7);
    return new Date(year, holiday.month, dayOfHolidayInMonth);
}

function getDayOfYear(date) {
    const startDate = new Date(date.getFullYear(), 0, 0);
    const difference =
        date -
        startDate +
        (startDate.getTimezoneOffset() - date.getTimezoneOffset()) * 60000;
    return Math.floor(difference / 86400000);
}
