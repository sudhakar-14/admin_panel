import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComponent.css";
import moment from "moment";

const CalendarComponent = ({
  setSelectedDateTime,
  selectedDateTime,
  onDateSelect,
  errorShow,
  showFixedDates,
  setDay,
  setPrimary_date,

  // handleCalendarMoth = () => {},
  calender_no,
  handleShowMonth,
  hideSelectedDayColor = false,
  selectNxtMonthBtn = true,
  duplicates,
  setSecondary_date,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDate, setAvailableDate] = useState([]);
  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 365);
  // console.log(selectedDate.getDate())

  useEffect(() => {
    if (showFixedDates) {
      setAvailableDate(showFixedDates);
    }
  }, [showFixedDates]);

  useEffect(() => {
    if (handleShowMonth) {
      setSelectedDate(handleShowMonth);
    } else if (selectedDateTime?.length > 0) {
      setSelectedDate(selectedDateTime[0]?.date);
    } else if (setDay) {
      setSelectedDate(setDay);
    } else {
      setSelectedDate(null);
    }
  }, [selectedDateTime, setDay]);

  function isSameDay(date1, date2) {
    if (!date2) {
      return false; // If date2 is not provided, return false
    }
    // console.log("date1, date2", date1, date2);
    // Extract day, month, and year from date1
    const day1 = new Date(date1).getDate();
    const month1 = new Date(date1).getMonth();
    const year1 = new Date(date1).getFullYear();

    // Extract day, month, and year from date2
    const day2 = date2 ?? date2?.getDate();
    const month2 = date2 ?? date2?.getMonth();
    const year2 = date2 ?? date2?.getFullYear();

    // Compare the day, month, and year components
    return day1 === day2 && month1 === month2 && year1 === year2;
  }

  const isDaySelectedDouble = (date) => {
    // console.log(date.getDate(),'date')
    return (
      selectedDateTime && date.getDate() > 9 &&
      selectedDateTime.some((selectedDay) => isSameDay(selectedDay.date, date))
    );
  };
  const isDaySelectedSingle = (date) => {
    // console.log(date.getDate(),'date')
    return (
      selectedDateTime && date.getDate() <= 9 &&
      selectedDateTime.some((selectedDay) => isSameDay(selectedDay.date, date))
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);

    // Check if the date already exists in the list
    const dateExists = selectedDateTime.some(
      (item) =>
        moment(item.date).format("DD/MM/YYYY") ===
        moment(date).format("DD/MM/YYYY")
    );

    if (dateExists) {
      // setSelectedDateTime(updatedDays);
    } else {
      // If the date doesn't exist, add it to the list
      const updatedDays = [...selectedDateTime, { date, time: ["00:00 AM"] }];
      setSelectedDateTime(updatedDays);
    }
  };

  const isTargetDateSingle = (date) => {
    if (errorShow) {
      const targetDate = errorShow;
      return (isSameDay(targetDate, date) && date.getDate() <= 9);
    }
  };

  const isTargetDateDouble = (date) => {
    if (errorShow) {
      const targetDate = errorShow;
      return (isSameDay(targetDate, date) && date.getDate() > 9);
    }
  };

  // Function to convert date strings to Date objects using Moment.js
  function convertDatesToJSDateObjects(data) {
    return data.map((item) => ({
      ...item,
      date: moment(item.date, "YYYY-MM-DD").toDate(),
    }));
  }

  // Call the function to convert the dates
  const dataWithJSDateObjects = convertDatesToJSDateObjects(availableDate);

  const handleViewChange = (view) => {
    console.log("Calendar view changed:", view);

    // You can perform any desired operations based on the calendar view change here
    // For example, you can update some state or fetch data for the new view, etc.
  };

  const handleActiveStartDateChange = (date) => {
    let secondary_date_calculation = null;

    if (showFixedDates) {
      setPrimary_date(date?.activeStartDate);
      if (calender_no === "1") {
        if (date?.action === "next") {
          secondary_date_calculation = moment(date?.activeStartDate).add(
            1,
            "month"
          );
        } else if (date?.action === "prev") {
          secondary_date_calculation = moment(date?.activeStartDate).add(
            1,
            "month"
          );
          // date?.activeStartDate;
        }
      } else if (calender_no === "2") {
        if (date?.action === "next") {
          secondary_date_calculation = moment(date?.activeStartDate).subtract(
            1,
            "month"
          );
        } else if (date?.action === "prev") {
          secondary_date_calculation = moment(date?.activeStartDate).subtract(
            1,
            "month"
          );
          // date?.activeStartDate;
        }
      }
      setSecondary_date(secondary_date_calculation);
    }
    // You can perform any desired operations based on the next/prev button click here
    // For example, you can update some state or fetch data for the new date, etc.
  };

  return (
    <>
      <Calendar
        // value={selectedDate == "Invalid Date" ? null : selectedDate}
        value={selectedDate}
        onChange={showFixedDates ? null : handleDateSelect}
        minDate={new Date()}
        maxDate={maxSelectableDate}
        selectRange={false}
        className="custom-calendar"
        helperText="Please select a valid date."
        onViewChange={handleViewChange} // Attach the view change handler here
        onActiveStartDateChange={handleActiveStartDateChange} // Attach the active start date change handler here
        // prevLabel={() => {
        //   console.log("prevLabel");
        // }}
        tileClassName={({ date }) => {
          let matchFound = {bool:false};
          dataWithJSDateObjects.forEach((item) => {
            const itemDate = item.date; // Assuming 'date' is a Date object in your data
            if (itemDate.getTime() === date.getTime()) {
              // The item's date is equal to the target date
              // console.log(`Item with ID ${item.id} matches the target date.`);
              matchFound = {bool:true,single:Boolean(itemDate.getDate() <= 9)}; // Set the flag to true
            }
          });

          let now_selected_matchFound = {bool:false};
          if (selectedDateTime?.length > 0) {
            selectedDateTime.forEach((item) => {
              const itemDate = item.date; // Assuming 'date' is a Date object in your data
              if (itemDate.getTime() === date.getTime()) {
                // The item's date is equal to the target date
                // console.log(`Item with ID ${item.id} matches the target date.`);
                now_selected_matchFound = {bool:true, single:Boolean(itemDate.getDate() <= 9)}; // Set the flag to true
              }
            });
          }

          let duplicate_data_present = false;

          if (duplicates?.length > 0) {
            duplicates.forEach((item) => {
              const itemDate = item.date; // Assuming 'date' is a Date object in your data
              if (
                moment(itemDate).format("DD/MM/YYYY") ===
                moment(date).format("DD/MM/YYYY")
              ) {
                duplicate_data_present = true; // Set the flag to true
              }
            });
          }

          if (
            selectedDate &&
            moment(selectedDate).format("DD/MM/YYYY") ===
              moment(date).format("DD/MM/YYYY")
          ) {
            if (hideSelectedDayColor) {
              return null;
            } 
            else if(selectedDate.getDate() <= 9){
              return "react-calendar__tile--random-date-selected_single";
            }
            else if(selectedDate.getDate() > 9){
              return "react-calendar__tile--random-date-selected";
            }
          } 
          else if (matchFound.bool && !matchFound.single) {
            return "react-calendar__tile--random-date";
          }  
          else if (matchFound.bool && matchFound.single) {
            return "react-calendar__tile--random-date_single";
          }  
          else if (duplicate_data_present) {
            return "react-calendar__tile--random-date-duplicate";
          } 
          else if (isDaySelectedDouble(date) && !isTargetDateSingle(date) && !isTargetDateDouble(date)) {
            return "react-calendar__tile--random-date";
          } 
          else if (isDaySelectedSingle(date) && !isTargetDateDouble(date) && !isTargetDateSingle(date)) {
            return "react-calendar__tile--random-date_single";
          } 
          else if (isTargetDateDouble(date)) {
            return "react-calendar__tile--random-date";
          } 
          else if (isTargetDateSingle(date)) {
            return "react-calendar__tile--random-date_single";
          } 
          else if (now_selected_matchFound.bool && !now_selected_matchFound.single) {
            return "react-calendar__tile--random-date";
          } 
          else if (now_selected_matchFound.bool && now_selected_matchFound.single) {
            return "react-calendar__tile--random-date_single";
          } 
          else {
            return null;
          }
        }}
      />
    </>
  );
};

export default CalendarComponent;
