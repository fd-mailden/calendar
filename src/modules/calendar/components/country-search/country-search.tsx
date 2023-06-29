import React from 'react';
import {IAvailableCountry} from "shared/types/counteries-types";
import styled from "styled-components";

interface ICountry {
	isActive: boolean
}

const SearchForm = styled.form`
	display: flex;
	flex-direction: column;
`
const Input = styled.input`
	max-width: 300px;
	margin-bottom: 10px;
`

const CountryName = styled.p`
	margin: 0;
`

const ListStyle = styled.ul`
	padding: 10px;
	overflow-y: scroll;
	height: 300px;
`
const Country = styled.li<ICountry>`
	color: ${props => props.isActive ? "#fff" : "#000"};
	background-color: ${props => props.isActive ? "#43739a" : "#fff"};
	cursor: pointer;

	&:hover {
		background-color: ${props => props.isActive ? "#43739a" : "#acdfe5"};
	}
`

interface ICountrySearch {
	inputValue: string
	onChangeInputValue: (event: React.FormEvent<HTMLInputElement>) => void,
	countries: IAvailableCountry[]
	currentCountry: IAvailableCountry
	date: string
	onChangeDate: (event: React.ChangeEvent<HTMLInputElement>) => void
	onChangeCountry: (currentCountry: IAvailableCountry) => void
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const Button = styled.button`
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
  }`
const CountrySearch: React.FC<ICountrySearch> = (props) => {
	const {
		inputValue,
		onChangeInputValue,
		countries,
		date,
		onChangeDate,
		onChangeCountry,
		currentCountry,
		handleSubmit
	} = props

	return (
		<SearchForm onSubmit={handleSubmit}>
			<h3>Your country</h3>
			<Input type="month" value={date} onChange={onChangeDate} required/>
			<Input type="text" name="" id="" value={inputValue} onChange={onChangeInputValue} placeholder='Search country'/>
			<CountryName>Country: {currentCountry.name} </CountryName>
			<ListStyle>
				{!countries.length && <p>Not found</p>}
				{countries.map(item => <Country isActive={item.countryCode === currentCountry.countryCode}
																				onClick={() => onChangeCountry(item)}
																				key={item.name}>{item.name}</Country>)}
			</ListStyle>
			<Button type="submit">Create</Button>
		</SearchForm>
	);
}

export default CountrySearch;
