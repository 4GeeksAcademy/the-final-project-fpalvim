import React, { useContext } from "react"
import Calendar from 'react-calendar'
import { MyContext } from "../context/MyContext";
import 'react-calendar/dist/Calendar.css';

function ShowCalendar() {
    const {calDate, setCalDate} = useContext(MyContext)

    function onChange (calDate) {
        setCalDate(calDate)
        console.log(calDate.toLocaleString().split(",")[0]);  
    }

    return ( 
        <div className="calendar-page-result">
            <Calendar onChange={onChange} value={calDate} />
            <span>{calDate ? calDate.toLocaleDateString() : ""}</span>
        </div>
     );
}

export default ShowCalendar;