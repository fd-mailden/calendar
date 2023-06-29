import React, {createContext, useContext} from 'react';

type ProviderProps = {
	onCreate: (date: string) => void;
	onRemove: (date, task) => void
	onEdit: (taskText, taskId) => void
	onMove: (prevDate, nextData, taskId) => void
	tasks: object
};
const CalendarContext = createContext<ProviderProps>({
	onCreate: () => console.log('onCreate'),
	onRemove: () => console.log('onRemove'),
	onEdit: () => console.log('onEdit'),
	onMove: () => console.log('onMove'),
	tasks: {}

});
const useCalendarContext = () => useContext<ProviderProps>(CalendarContext);

export {CalendarContext, useCalendarContext}
