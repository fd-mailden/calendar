import React from "react"
import './App.css';
import {InitialWindow} from "../modules/calendar/components/initial-window/initial-window";
import {Calendar} from "../modules/calendar/components/calendar/calendar";
import {CreateTask} from "../modules/calendar/components/create-task/create-task";
import {CalendarContext} from "../modules/calendar/context/calendarContext";
import {Header} from "../modules/calendar/components/header/header";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useApp} from './useApp'

function App() {
	const {
		models: {
			currentMonth,
			currentYear,
			countries,
			isOpenModalWindow,
			isOpenInitialWindow,
			tasks,
			month,
		},
		commands: {
			setCalender,
			setNewCalender,
			download,
			onMoveTask,
			onEditTask,
			onRemoveTask,
			addNewTask,
			onFilter,
			onCreate,
			onOpenInitialWindow,
			onCloseInitialWindow,
			onClose
		}
	} = useApp()

	return (
		<div className="App">
			<Header month={currentMonth} year={currentYear} onFilter={onFilter} download={download}
							onOpenInitWindow={onOpenInitialWindow}/>
			<CalendarContext.Provider
				value={{
					onCreate: onCreate,
					onRemove: onRemoveTask,
					onEdit: onEditTask,
					onMove: onMoveTask,
					tasks: tasks
				}}>
				<Calendar weeks={month}/>
			</CalendarContext.Provider>
			<CreateTask onCreate={addNewTask} onClose={onClose} isOpenModalWindow={isOpenModalWindow}/>
			<p>{countries.status}</p>
			{countries.data &&
				<InitialWindow countriesList={countries.data} setNewCalender={setNewCalender} isOpen={isOpenInitialWindow}
											 onClose={onCloseInitialWindow} setCalender={setCalender}/>}
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"/>
		</div>
	);
}

export default App;
