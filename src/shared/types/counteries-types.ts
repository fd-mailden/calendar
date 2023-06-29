import React from 'react'

export interface IAvailableCountry {
	countryCode: string
	name: string
}


export interface IPublicHolidays {
	date: string,
	name: string
	fixed: boolean,
	global: boolean
	types: string[]

}


export interface IDay {
	date: string,
	current_date?: boolean,
	weekday: string,
	free_day: boolean
	tasks: string[]

	[propName: string]: any

}

export interface IDragMethods {
	dragOverHandler(e: React.DragEvent<HTMLDivElement>): void

	dragLeaveHandler(e: React.DragEvent<HTMLDivElement>): void

	dragStartHandler(e: React.DragEvent<HTMLDivElement>, idTask: string, data: string): void

	dragEndHandler(e: React.DragEvent<HTMLDivElement>): void

	dropHandler(e: React.DragEvent<HTMLDivElement>): void

	dropCardHandler(e: React.DragEvent<HTMLDivElement>, idTask: string): void
}


export interface ITask {
	isActive: boolean;
	text: string,
	taskTypes: number[],
	id: string,

	[propName: string]: any
}

export interface ITasks {
	[key: string]: ITask
}


export interface ICalendarData {
	countryCode: string,
	month: string,
	year: number,
	daysOfTheMonth: IDay[],
	tasks: ITasks
}
