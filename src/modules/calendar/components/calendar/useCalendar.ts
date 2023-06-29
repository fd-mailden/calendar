import React, {useState} from "react";
import {useCalendarContext} from "../../context/calendarContext";
import {IDragMethods} from "../../../../shared/types/counteries-types";

interface ICurrentItem {
	id: string,
	date: string
}

export const useCalendar = () => {
	const [currentItem, setCurrentItem] = useState<ICurrentItem | null>();
	const {onMove} = useCalendarContext()

	const dragMethods: IDragMethods = {
		dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
			e.preventDefault();

		},
		dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
			(e.target as HTMLDivElement).style.boxShadow = 'none';
		},
		dragStartHandler(e, idTask, data) {
			setCurrentItem({
				id: idTask,
				date: data
			});
		},
		dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
			(e.target as HTMLDivElement).style.boxShadow = 'none'
		},
		dropHandler(e) {
			e.preventDefault();
			setCurrentItem(null);
		},
		dropCardHandler(e, date) {
			e.preventDefault();
			onMove(currentItem?.date, date, currentItem?.id)
			setCurrentItem(null);
		}

	}

	return {
		commands: {dragMethods}
	}
}
