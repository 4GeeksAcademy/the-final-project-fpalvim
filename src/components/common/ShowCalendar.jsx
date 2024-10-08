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
    
        setDeselectedDates(prev =>
            prev.includes(dateString)
                ? prev.filter(d => d !== dateString)
                : [...prev, dateString]
        );
    } else {
        
        setNewSelectedDates(prev =>
            prev.includes(dateString)
                ? prev.filter(d => d !== dateString)
                : [...prev, dateString]
        );
    }
};
const handleSaveDates = () => {
    onConfirmDates(newSelectedDates, deselectedDates);
    setNewSelectedDates([]);
    setDeselectedDates([]); 
};

return (
        <div className="calendar-page-result d-flex flex-column justify-content-center align-itens-center">
            <div className="calendar-container mb-2">
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
            </div>
            <div className="dates-to-confirm-container">
                <button className="button-78" onClick={handleSaveDates}>Save Dates</button>
            </div>
        </div>
    );
}
export default ShowCalendar;