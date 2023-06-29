import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {COUNTRIES_QUERY_KEY, HOLIDAYS_QUERY_KEY} from "../shared/constants/query-keys";
import {DateApi} from "./api/date-nager/date-api";
import {BaseDateService} from "../shared/services/base-date-service";
import {IAvailableCountry, ICalendarData} from "../shared/types/counteries-types";
import {format, parseISO} from "date-fns";
import {toast} from "react-toastify";


export const useInitial = () => {

	const {currentMonth, currentYear, data: baseMonth} = BaseDateService.getCurrentMonth()

	const [calendarData, setCalendarData] = useState<ICalendarData>({
		countryCode: 'UA',
		month: currentMonth,
		year: currentYear,
		daysOfTheMonth: baseMonth,
		tasks: {}
	});

	const countries = useQuery({
		queryKey: [COUNTRIES_QUERY_KEY],
		queryFn: () => DateApi.getAvailableCountry()
	})

	const holidays = useQuery({
		queryKey: [HOLIDAYS_QUERY_KEY],
		queryFn: () => DateApi.getPublicHolidays('2023', "UA")
	})

	useEffect(() => {
		if (holidays.data?.length) {
			setCalendarData(prevState => {
					return {...prevState, daysOfTheMont: BaseDateService.setHolidays(baseMonth, holidays.data)}
				}
			)
		}
	}, [holidays.isLoading]);

	useEffect(() => {
		// eslint-disable-next-line
		// @ts-ignore
		countries.error && toast.error(countries.error.message)
		// eslint-disable-next-line
		// @ts-ignore
		holidays.error && toast.error(holidays.error.message)


	}, [holidays, countries]);
	const setCalender = (setCalender: ICalendarData) => {
		setCalendarData(setCalender)
	}
	const setNewCalender = async (dateString: string, country: IAvailableCountry) => {
		try {
			const date = parseISO(dateString);
			const year: string = format(date, "yyyy");
			const tempHolidays = await DateApi.getPublicHolidays(year, country.countryCode)
			const tempMonth = BaseDateService.getCurrentMonth(dateString)
			setCalendarData({
					countryCode: country.countryCode,
					month: tempMonth.currentMonth,
					year: tempMonth.currentYear,
					daysOfTheMonth: BaseDateService.setHolidays(tempMonth.data, tempHolidays),
					tasks: {}
				}
			)

		} catch (error) {
			// eslint-disable-next-line
			// @ts-ignore
			toast.error(error.message)
		}

	}


	return {
		models: {
			calendarCode: calendarData.countryCode,
			currentMonth: calendarData.month,
			currentYear: calendarData.year,
			daysOfTheMonth: calendarData.daysOfTheMonth,
			currentTasks: calendarData.tasks,
			countries
		},
		commands: {
			setCalender,
			setNewCalender
		}

	}
}

