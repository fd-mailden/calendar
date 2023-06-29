import React, { useState} from 'react';
import styled from "styled-components";
import {useOnClickOutside} from "shared/hooks/use-on-click-outside";

const TaskText = styled.p`
	word-wrap: break-word;
	margin: 5px 0;
	font-size: 14px;
	text-align: start;
`
const TaskTextarea = styled.textarea`
	resize: none;
	height: 60px;

`

interface ITaskInput {
	text: string,
	onEdit: (text: string) => void
}

export const TaskInput: React.FC<ITaskInput> = ({text, onEdit}) => {
	const [taskText, setTaskText] = useState(text);
	const [isFocus, setIsFocus] = useState(false);
	const onInputFocus = () => setIsFocus(prevState => true)
	const unInputFocus = () => setIsFocus(prevState => false)
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setTaskText(setTaskText => event.target.value)

	const inputRef = React.useRef(null);

	useOnClickOutside(inputRef, () => {
		taskText
			? onEdit(taskText)
			: setTaskText(text)

		unInputFocus()
	})

	return (
		<form>
			{
				isFocus
					? <TaskTextarea
						ref={inputRef}
						value={taskText}
						placeholder="Type something..."
						onChange={handleChange}
					/>
					: <TaskText onClick={onInputFocus}>{taskText}</TaskText>
			}

		</form>
	);
};
