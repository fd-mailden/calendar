import React from 'react';
import styled from "styled-components";
import {IDay} from "shared/types/counteries-types";
import {DayCard} from "../day-card/dat-card";
import {useCalendar} from './useCalendar'
import {WEEK_DAYS} from "../../../../shared/constants/week";


const CalendarHead = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`
const CalendarHeadItem = styled.div`
	width: 15%;
	padding: 10px 5px;
	align-items: center;
`

interface ICalendar {
	weeks: IDay[]
}

const CalendarBody = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	gap: 5px;
`
const CalendarStyle = styled.div`
	padding: 0 20px;
`

export const Calendar: React.FC<ICalendar> = ({weeks}) => {
	const {
		commands: {dragMethods}
	} = useCalendar()

	return (
		<CalendarStyle>
			<CalendarHead>
				{WEEK_DAYS.map(day => <CalendarHeadItem key={day}>{day}</CalendarHeadItem>)}
			</CalendarHead>
			<CalendarBody>
				{weeks.map(day => <DayCard key={day.date} dragMethods={dragMethods}
																	 day={day}/>)}
			</CalendarBody>
		</CalendarStyle>
	);
};

