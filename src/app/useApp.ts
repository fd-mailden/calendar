import {useInitial} from "./useInitial";
import {useEffect, useState} from "react";
import {ITask, ITasks} from "../shared/types/counteries-types";
import {JsonService} from "../shared/services/json-service";

export const useApp = () => {
    const {
        models: {
            currentMonth, currentYear, daysOfTheMonth, currentTasks, countries, calendarCode
        },
        commands: {
            setCalender, setNewCalender
        }
    } = useInitial()

    const [month, setMonth] = useState(daysOfTheMonth);
    const [tasks, setTask] = useState<ITasks>(currentTasks);
    const [isOpenModalWindow, setOpenModalWindow] = useState(false);
    const [isOpenInitialWindow, setOpenInitialWindow] = useState(false);
    const [createDate, setCreateDate] = useState(null);
    useEffect(() => {
        setMonth(daysOfTheMonth)
        setTask(currentTasks)
    }, [daysOfTheMonth, currentTasks]);

    const onOpen = () => setOpenModalWindow(true)
    const onClose = () => setOpenModalWindow(false)

    const onOpenInitialWindow = () => setOpenInitialWindow(true)
    const onCloseInitialWindow = () => setOpenInitialWindow(false)

    const onCreate = (date) => {
        setCreateDate(date)
        onOpen()
    }

    const onAllActiveTasks = () => {
        const tempTasks = {...tasks}
        for (const key in tempTasks) {
            tempTasks[key].isActive = true;
        }
        setTask({...tempTasks})
    }
    const onFilterColor = (colorId: number) => {
        const tempTasks = {...tasks}
        for (const key in tempTasks) {
            if (tempTasks[key].taskTypes.includes(colorId)) {
                tempTasks[key].isActive = true;
            } else {
                tempTasks[key].isActive = false;
            }
        }
        setTask({...tempTasks})
    }

    const onFilter = (colorId: number) => {
        colorId === 0 ? onAllActiveTasks() : onFilterColor(colorId)
    }

    const addNewTask = (task: ITask) => {
        const state = [...month]
        const dayIndex = state.findIndex(day => day.date === createDate)
        if (dayIndex < 0) return
        state[dayIndex].tasks.push(task.id)
        setMonth(state)
        const tempTasks = {...tasks}
        tempTasks[task.id] = task
        tempTasks[task.id].date = createDate
        setTask({...tempTasks})
        onClose()
    }

    const onRemoveTask = (date, taskId) => {
        setMonth(prevState => {
            const dayIndex = prevState.findIndex(day => day.date === date)
            if (dayIndex < 0) return prevState
            prevState[dayIndex].tasks = prevState[dayIndex].tasks.filter(taskItem => taskItem !== taskId)
            return [...prevState]
        })
        const tempTasks = {...tasks}
        delete tempTasks[taskId];
        setTask({...tempTasks})
    }
    const onEditTask = (taskText, taskId) => {
        const tempTasks = {...tasks}
        tempTasks[taskId].text = taskText
        setTask({...tempTasks})
    }

    const onMoveTask = (prevDate, nextData, taskId) => {
        const tempTasks = {...tasks}
        const tempMonth = [...month]
        const prevDateIndex = tempMonth.findIndex(day => day.date === prevDate)
        const nextDataIndex = tempMonth.findIndex(day => day.date === nextData)
        if (prevDateIndex < 0) return tempMonth
        const currentTask = tempMonth[prevDateIndex].tasks.find(task => task === taskId)
        if (!currentTask) return null
        tempMonth[prevDateIndex].tasks = tempMonth[prevDateIndex].tasks.filter(taskItem => taskItem !== taskId)
        tempMonth[nextDataIndex].tasks.push(currentTask)

        setMonth(prevState => [...tempMonth])
        tempTasks[taskId].date = nextData
        setTask({...tempTasks})
    }

    const download = () => {
        onAllActiveTasks()
        JsonService.downloadObjectAsJson({
            countryCode: calendarCode,
            month: currentMonth,
            year: currentYear,
            daysOfTheMonth: month,
            tasks
        }, `calendar-${currentMonth}-${currentYear}-${calendarCode}`)

    }

    return {
        models: {
            currentMonth,
            currentYear,
            daysOfTheMonth,
            currentTasks,
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
    }
}
