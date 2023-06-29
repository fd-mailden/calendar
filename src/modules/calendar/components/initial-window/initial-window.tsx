import React, {useMemo, useState} from 'react';
import styled from '@emotion/styled/macro';
import {ModalWindow} from "shared/components/modal/modal";
import {IAvailableCountry, ICalendarData} from "shared/types/counteries-types";
import CountrySearch from "../country-search/country-search";
import {UploadForm} from "../upload-form/upload-form";
import {format} from "date-fns";

interface IButton{
	isActive: boolean
}

interface IInitialWindow {
	countriesList: IAvailableCountry[]
	isOpen: boolean
	onClose: () => void,
	setCalender: (setCalender: ICalendarData) => void,
	setNewCalender: (dateString: string, country: IAvailableCountry) => void
}

const Button = styled.button<IButton>`
  padding: 5px 7px;
  background-color: ${props => props.isActive ? '#496262' : '#789b9b'};
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin: 0 5px;
  cursor: pointer;
  color: #fff;
  transition: opacity 0.3s ease-out;

  &:hover {
    opacity: 0.8;
  }`
const WindowBody = styled.div`
	padding: 20px;
	height: 600px;
`

export const InitialWindow: React.FC<IInitialWindow> = (props) => {
	const {countriesList, isOpen, onClose, setCalender, setNewCalender} = props
	const [isCreatedForm, setIsCreatedForm] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const today: Date = new Date();

	const [date, setDate] = useState<string>(format(today, "yyyy-MM"));
	const [country, setCountry] = useState<IAvailableCountry>({countryCode: "UA", name: "Ukraine"});

	const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value)
		setDate(event.target.value)
	}
	const onChangeCountry = (currentCountry: IAvailableCountry) => setCountry(currentCountry)

	const onOpenNewForm = () => setIsCreatedForm(true)
	const onOpenHistoryForm = () => setIsCreatedForm(false)

	const countries = useMemo(() => {
		const current = countriesList.filter((country) =>
			country.name.toLowerCase().includes(inputValue.toLowerCase())
		);
		return current

	}, [inputValue]);

	const onChangeInputValue = (event) => {
		setInputValue(event.target.value)
	}
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setNewCalender(date, country)
		onClose()
	}


	return (
		<ModalWindow onClose={onClose} open={isOpen}>
			<WindowBody>
				<div className="">
					<Button isActive = {isCreatedForm} onClick={onOpenNewForm}>New Calendar</Button>
					<Button isActive = {!isCreatedForm} onClick={onOpenHistoryForm}>Upload calendar history</Button>
				</div>

				{isCreatedForm ?
					<CountrySearch onChangeInputValue={onChangeInputValue} countries={countries}
												 inputValue={inputValue}
												 date={date}
												 onChangeDate={onChangeDate}
												 onChangeCountry={onChangeCountry}
												 currentCountry={country}
												 handleSubmit={handleSubmit}
					/>
					: <UploadForm setCalender={setCalender} onCloseWindow={onClose}/>
				}
			</WindowBody>


		</ModalWindow>


	)
}

