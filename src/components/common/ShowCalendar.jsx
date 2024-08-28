import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './ShowCalendar.css';

function ShowCalendar({ selectedDates, onConfirmDates }) {
    const [newSelectedDates, setNewSelectedDates] = useState([]);
    const [deselectedDates, setDeselectedDates] = useState([]);

    useEffect(() => {
        setNewSelectedDates([]);
        setDeselectedDates([]);
    }, [selectedDates]);

    const formattedSelectedDates = selectedDates.map(date => format(new Date(date), "yyyy-MM-dd"));

    const handleDateClick = (clickedDate) => {
        const dateString = format(clickedDate, "yyyy-MM-dd");

        if (formattedSelectedDates.includes(dateString)) {
            // If the date is already available (green), toggle deselection
            setDeselectedDates(prev =>
                prev.includes(dateString)
                    ? prev.filter(d => d !== dateString)
                    : [...prev, dateString]
            );
        } else {
            // If it's a new date (blue), toggle selection
            setNewSelectedDates(prev =>
                prev.includes(dateString)
                    ? prev.filter(d => d !== dateString)
                    : [...prev, dateString]
            );
        }
    };

    const handleSaveDates = () => {
        onConfirmDates(newSelectedDates, deselectedDates);
        setNewSelectedDates([]); // Clear new selections
        setDeselectedDates([]);  // Clear deselected dates
    };

    return (
        <div className="calendar-page-result d-flex">
            <div className="calendar-container">
                <Calendar
                    onClickDay={handleDateClick}
                    tileClassName={({ date }) => {
                        const dateString = format(date, "yyyy-MM-dd");

                        if (formattedSelectedDates.includes(dateString)) {
                            return deselectedDates.includes(dateString) ? "deselected" : "available";
                        }

                        return newSelectedDates.includes(dateString) ? "selected" : null;
                    }}
                />
                <div className="dates-to-confirm-container ms-4">
                    <button onClick={handleSaveDates}>Save Dates</button>
                </div>
            </div>
        </div>
    );
}
    
export default ShowCalendar;

