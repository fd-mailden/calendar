import React, {useRef} from 'react';
import {ICalendarData} from "shared/types/counteries-types";
import styled from "@emotion/styled/macro";
import {toast} from "react-toastify";

interface IUploadForm {
	setCalender: (setCalender: ICalendarData) => void,
	onCloseWindow: () => void
}

const Button = styled.button`
	padding: 20px;
	background-color: #61dafb;
	font-size: 24px;
	border: none;
	border-radius: 8px;
	margin: auto;
	cursor: pointer;
	color: #fff;
	transition: opacity 0.3s ease-out;

	&:hover {
		opacity: 0.8;
	}`
const UploadFormStyle = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
`

export const UploadForm: React.FC<IUploadForm> = ({setCalender, onCloseWindow}) => {
	const fileRef = useRef<HTMLInputElement | null>(null);

	const readJsonFile = (event: React.ChangeEvent<HTMLInputElement>, funcSet: (data: ICalendarData) => void) => {
		const fileReader = new FileReader();
		const {files} = event.target;
		if (!files || !event) return
		fileReader.readAsText(files[0], 'UTF-8');
		fileReader.onload = (e) => {
			funcSet(e.target?.result ? JSON.parse(e.target?.result as string) : null);
		};
		if (fileRef.current) {
			fileRef.current = null
		}
	};
	const addToOtherPresets = (newPresets: ICalendarData) => {
		newPresets ? setCalender(newPresets) : toast.error('File is Empty')
		onCloseWindow()
	};

	return (
		<UploadFormStyle>
			<Button onClick={() => fileRef.current!.click()} type="button">
				<input
					ref={fileRef}
					type="file"
					id="ext-input-file"
					onChange={(e) => readJsonFile(e, addToOtherPresets)}
					hidden
				/>
				Import
			</Button>
		</UploadFormStyle>
	);
};
