import React, {useState} from "react";
import {ITask} from "../../../../shared/types/counteries-types";
import {v4 as uuid} from 'uuid';
export const useCreateTask = (onCreate: (task: ITask) => void) => {
	const [textTask, setTextTask] = useState('');
	const [colorList, setColorList] = useState<number[]>([]);
	const [error, setError] = useState<{ input: boolean, color: boolean }>({
		input: false,
		color: false,
	})

	const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => setTextTask(event.target.value)
	const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			colorList?.length
				? setColorList(prevState => [...prevState, Number(event.target.name)])
				: setColorList([Number(event.target.name)])
		} else {
			setColorList(prevState => prevState.filter(colorNumbed => colorNumbed !== Number(event.target.name)))
		}
	}

	const onCreateTask = (event) => {
		event.preventDefault()
		if (!textTask.length) return setError(prevState => {
			return {...prevState, input: true};
		})
		if (!colorList.length) return setError(prevState => {
			return {...prevState, color: true};
		})
		onCreate({
			text: textTask,
			taskTypes: colorList,
			id: uuid(),
			isActive: true,
		})
		setTextTask('')
		setError({
			input: false,
			color: false,
		})
	}
	return {
		models: {
			error, textTask
		},
		commands: {
			onChangeText, onCreateTask, onChangeCheckbox
		}
	}
}
