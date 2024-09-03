import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './ShowCalendar.css';
function ShowCalendarBlocked({ selectedDates, onConfirmDates }) {
    const [newSelectedDates, setNewSelectedDates] = useState([]);
    const [deselectedDates, setDeselectedDates] = useState([]);
    useEffect(() => {
        setNewSelectedDates([]);
        setDeselectedDates([]);
    }, [selectedDates]);
    const formattedSelectedDates = selectedDates.map(date => format(new Date(date), "yyyy-MM-dd"));
    return (
        <div className="calendar-page-result d-flex">
            <div className="calendar-container">
                <Calendar
                    tileClassName={({ date }) => {
                        const dateString = format(date, "yyyy-MM-dd");
                        if (formattedSelectedDates.includes(dateString)) {
                            return deselectedDates.includes(dateString) ? "deselected" : "available";
                        }
                        return newSelectedDates.includes(dateString) ? "selected" : null;
                    }}
                />
                <div className="dates-to-confirm-container ms-4">
                    <button>Save Dates</button>
                </div>
            </div>
        </div>
    );
}
export default ShowCalendarBlocked;