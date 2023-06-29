import React from 'react';
import styled from "styled-components";
import {TASK_TYPES} from "shared/constants/tasks-type";
import {ITask} from "shared/types/counteries-types";
import {ModalWindow} from "shared/components/modal/modal";
import {useCreateTask} from "./use-create-task";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const CreateTaskStyle = styled.div`
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: space-around;
`
const ColorCircle = styled.div<{ color: string }>`
	height: 30px;
	width: 30px;
	border-radius: 50%;
	background-color: ${props => props.color};
`
const ColorList = styled.ul`
	padding: 10px;
	margin: 0;
	display: flex;
	flex-wrap: wrap;
`
const ColorItem = styled.li`
	display: flex;
	list-style: none;
	margin: 10px;
`
const Button = styled.button`
  padding: 5px 7px;
  background-color: #789b9b;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin: 10px 5px;
  cursor: pointer;
  color: #fff;
  transition: opacity 0.3s ease-out;

  &:hover {
    opacity: 0.8;
  }`

const Textarea = styled.textarea`
  resize: none;
  width: 300px;
  height: 100px;
  font-size: 18px;
`
const Error = styled.p`
	margin: 0;
	color: #f37474;
	font-size: 14px;
`
interface ICreateTask {
	onCreate: (task: ITask) => void
	isOpenModalWindow: boolean
	onClose: () => void
}

export const CreateTask: React.FC<ICreateTask> = ({onCreate, isOpenModalWindow, onClose}) => {
		const {
			models: {
				error, textTask
			},
			commands: {
				onChangeText, onCreateTask, onChangeCheckbox
			}
		} = useCreateTask(onCreate)

		const taskTypeList = Object.entries(TASK_TYPES)
		return (
			<ModalWindow onClose={onClose} open={isOpenModalWindow}>
				<CreateTaskStyle>
					<Form onSubmit={onCreateTask}>
						<h2>Create new tas</h2>
						<Textarea value={textTask} onChange={onChangeText}/>
						{error.input && <Error>empty</Error>}
						<ColorList>
							{taskTypeList.map(type =>
								<ColorItem key={type[0]}>
									<ColorCircle color={type[1]}/>
									<input type="checkbox" name={type[0]} onChange={onChangeCheckbox}/>
								</ColorItem>)}

						</ColorList>
						{error.color && <Error>empty</Error>}
						<Button type='submit'>Creat</Button>
					</Form>
				</CreateTaskStyle>
			</ModalWindow>
		);
	}
;

