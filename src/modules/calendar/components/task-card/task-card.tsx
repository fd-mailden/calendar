import React, {memo} from 'react';
import styled from "styled-components";
import {TASK_TYPES} from "shared/constants/tasks-type";
import {IDragMethods} from "shared/types/counteries-types";
import {TaskInput} from "../task-input";

interface ITaskTypeStyle {
	typeColor: number;
}

interface ITaskCardStyle {
	isActive: boolean
}

const TaskCardStyle = styled.div<ITaskCardStyle>`
	box-sizing: border-box;
	background-color: #ffffff;
	padding: 5px 7px;
	box-shadow: 0px 0px 10px 2px rgba(87, 86, 86, 0.53);
	text-align: center;
	width: 100%;
	max-width: 300px;
	margin: 10px 0;
	border-radius: 5px;
	opacity: ${props => props.isActive ? 1 : 0.7};

`
const TaskTypeWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;

`
const TaskType = styled.div<ITaskTypeStyle>`
	height: 8px;
	width: 25px;
	border-radius: 5px;
	margin: 2px;
	background-color: ${(props) => props.typeColor};
`
const TaskHead = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`
const ButtonRemove = styled.button`
	font-size: 16px;
	font-weight: bold;
	background-color: transparent;
	border: none;
	color: #656464;
	cursor: pointer;
	transition: color 0.3s ease-out;

	&:hover {
		color: #090909;
	}
`

interface ITaskCard {
	text: string,
	taskTypes: Array<number>
	onRemove: () => void
	onEdit: (text) => void
	id: string
	index?: any
	dragMethods: IDragMethods,
	date: string,
	isActive: boolean


}

const TaskCardComponent: React.FC<ITaskCard> = (props) => {
	const {text, taskTypes, onRemove, onEdit, id, date, dragMethods, isActive} = props

	return (
		<TaskCardStyle
			isActive={isActive}
			draggable={true}
			onDragOver={(e) => dragMethods.dragOverHandler(e)}
			onDragLeave={(e) => dragMethods.dragLeaveHandler(e)}
			onDragStart={(e) => dragMethods.dragStartHandler(e, id, date)}
			onDragEnd={(e) => dragMethods.dragEndHandler(e)}
			onDrop={(e) => dragMethods.dropHandler(e)}
		>

			<TaskHead>
				<TaskTypeWrapper>
					{taskTypes.map(type => <TaskType key={type} typeColor={TASK_TYPES[type]}/>)}
				</TaskTypeWrapper>
				<ButtonRemove onClick={onRemove}>x</ButtonRemove>
			</TaskHead>
			<TaskInput text={text} onEdit={onEdit}/>
		</TaskCardStyle>
	);
};
export const TaskCard = memo(TaskCardComponent)
