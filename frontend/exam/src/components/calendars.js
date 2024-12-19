import React, { useState } from 'react';
import Calendar from 'react-calendar';

const CalendarForm = () => {
    return (
      <>
        <Styles />
        <Calendar bordered cellClassName={date => (date.getDay() % 2 ? 'bg-gray' : undefined)} />
      </>
    );
  };
  
  const Styles = () => {
    return <style>{`.bg-gray { background-color: rgba(242, 242, 242, 0.3);}`}</style>;
  };

export default CalendarForm;