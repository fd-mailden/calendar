import {
	eachDayOfInterval,
	eachWeekOfInterval,
	endOfMonth,
	endOfWeek,
	format, isSameDay, isWeekend,
	startOfMonth,
	startOfWeek,
	parseISO,
	getYear
} from "date-fns";
import {IPublicHolidays, IDay} from "../types/counteries-types";

interface IGetCurrentMonth {
	currentMonth: string
	currentYear: number
	data: IDay[]
}

class _BaseDateService {

	getCurrentMonth(date?: string): IGetCurrentMonth {
		const today: Date = date ? new Date(`${date}-01`) : new Date();

		const currentMonth: string = format(today, 'MMMM');
		const currentYear: number = getYear(today);

		const firstDayOfMonth: Date = startOfMonth(today);
		const lastDayOfMonth: Date = endOfMonth(today);

		const allWeeks: Date[] = eachWeekOfInterval({start: firstDayOfMonth, end: lastDayOfMonth});

		const result: IDay[] = [];

		allWeeks.forEach((week: Date) => {
			const startDate: Date = startOfWeek(week, {weekStartsOn: 0}); // Неделя начинается с воскресенья
			const endDate: Date = endOfWeek(week, {weekStartsOn: 0}); // Неделя заканчивается субботой
			const dates: Date[] = eachDayOfInterval({start: startDate, end: endDate});
			dates.forEach((date: Date) => {
				const formattedDate: string = format(date, 'yyyy-MM-dd'); // Формат даты "2023-06-28"
				const isCurrentDate: boolean = isSameDay(date, today);
				const weekday: string = format(date, 'EEEE');
				const isFreeDay: boolean = isWeekend(date);
				result.push({date: formattedDate, current_date: isCurrentDate, weekday, free_day: isFreeDay, tasks: []});
			});
		});

		return {
			currentMonth, currentYear, data: result
		}

	}

	setHolidays(month: IDay[], holidays: IPublicHolidays[]) {
		const monthWithHolidays = month.map(day => {
			const value = holidays.find(item => item.date == day.date)
			if (value) {
				day.free_day = true
				day.holiday = value
			}
			return day
		})
		return monthWithHolidays
	}

	getDay(dateString: string) {
		const date = parseISO(dateString);
		const dayNumber: number = date.getDate();
		const month: string = format(date, 'MMMM'); // Получаем полное название месяца
		const year: number = date.getFullYear();

		return {dayNumber, month, year};
	}

}

export const BaseDateService = new _BaseDateService()
