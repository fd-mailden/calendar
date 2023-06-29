import React, {memo} from 'react';
import styled from "styled-components";
import {TaskCard} from "../task-card/task-card";
import {IDay, IDragMethods} from "shared/types/counteries-types";
import {useCalendarContext} from "../../context/calendarContext";
import {BaseDateService} from "shared/services/base-date-service";

interface IDayCardStyle {
	isActive: boolean
}

const DayCardStyle = styled.div<IDayCardStyle>`
	box-sizing: border-box;
	padding: 10px;
	margin: 2px;
	border: 1px solid rgba(111, 111, 112, 0.87);
	border-radius: 5px;
	background-color: #d5cfc7;
	opacity: ${props => props.isActive ? 1 : 0.7};
	cursor: ${props => !props.isActive && 'not-allowed'};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100px;
`
const DateDay = styled.p`
	margin: 0;
	text-align: start;
	font-size: 12px;
	font-weight: bold;
	color: #343434;
`
const AddTaskButton = styled.button`
	border: none;
	background-color: transparent;
	width: 100%;
	cursor: pointer;
	font-weight: bold;
	color: #7f8686;
	transition: color 0.3s ease-out;

	&:hover {
		color: #090909;
	}
`

interface IDayCard {
	day: IDay
	key: string;
	dragMethods: IDragMethods
}


const DayCardComponent: React.FC<IDayCard> = ({day, dragMethods}) => {
	const {onCreate, onRemove, onEdit, tasks} = useCalendarContext()
	const {dayNumber} = BaseDateService.getDay(day.date)
	const onEditTask = (id) => (text) => {
		onEdit(text, id)
	}
	return (
		<DayCardStyle
			isActive={!day.free_day}
			onDragOver={(e) => !day.free_day && dragMethods.dragOverHandler(e)}
			onDrop={(e) => !day.free_day && dragMethods.dropCardHandler(e, day.date)}
		>
			<DateDay>{dayNumber}</DateDay>
			{(tasks && day.tasks) && day.tasks.map((task, index) =>
				<TaskCard key={tasks[task].id} text={tasks[task].text}
									dragMethods={dragMethods}
									isActive={tasks[task].isActive}
									index={index}
									date={day.date}
									taskTypes={tasks[task].taskTypes}
									id={tasks[task].id}
									onRemove={() => onRemove(day.date, task)}
									onEdit={onEditTask(task)}
				/>)}

			{!day.free_day && <AddTaskButton onClick={() => onCreate(day.date)}>add new task</AddTaskButton>}

		</DayCardStyle>
	);
};

export const DayCard = memo(DayCardComponent)


