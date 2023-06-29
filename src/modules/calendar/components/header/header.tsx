import React, {useState} from 'react';
import styled from "styled-components";
import {TASK_TYPES} from "shared/constants/tasks-type";
import {ScreenshotButton} from "../screenshot-button";


interface IHeader {
	month: string
	year: number
	onFilter: (colorId: number) => void
	download: () => void
	onOpenInitWindow: () => void
}

interface IColorButton {
	isActive: boolean,
	color: string

}

const CalendarTitle = styled.h1`
	margin: 0 auto;
	font-size: 30px;
`
const HeaderStyle = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`
const ColorButton = styled.button<IColorButton>`
	width: 20px;
	height: 20px;
	margin: 10px;
	border: 2px solid ${props => props.isActive ? '#2d2c2c' : 'transparent'};
	background-color: ${props => props.color};
	box-shadow: 0px 0px 5px 2px rgba(171, 167, 167, 0.53);
	cursor: pointer;
`
const ColorButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	max-width: 500px;

`
const HeaderButton = styled.button`
  padding: 5px 7px;
  background-color: #789b9b;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin: 0 5px;
  cursor: pointer;
  color: #fff;
	transition: opacity 0.3s ease-out;
  &:hover {
    opacity: 0.8;
  }
`

export const Header: React.FC<IHeader> = ({month, year, onFilter, download, onOpenInitWindow}) => {
	const [currentColor, setCurrentColor] = useState(0);
	const changeColor = (colorId: number) => {
		setCurrentColor(colorId)
		onFilter(colorId)
	}
	const taskTypeList = Object.entries(TASK_TYPES)
	return (
		<HeaderStyle>
			<ColorButtonWrapper>
				<ColorButton color='#fff' isActive={currentColor === 0} onClick={() => changeColor(0)}/>
				{taskTypeList.map(color =>
					<ColorButton key={color[1]}
											 color={color[1]}
											 isActive={currentColor === Number(color[0])}
											 onClick={() => changeColor(Number(color[0]))}
					/>)}

			</ColorButtonWrapper>

			<CalendarTitle>{`${month}, ${year}`}</CalendarTitle>
			<ColorButtonWrapper>
				<ScreenshotButton/>
				<HeaderButton onClick={onOpenInitWindow}>Create new Calendar</HeaderButton>
				<HeaderButton onClick={download}>Download</HeaderButton>
			</ColorButtonWrapper>

		</HeaderStyle>
	);
};

