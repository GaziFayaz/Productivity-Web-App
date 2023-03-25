import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";

const DatetimePicker = () => {
  var today = new Date();
  const [value, onChange] = useState(today);
  console.log(value);
  return (
    <div>
      <DateTimePicker value={value} onChange={onChange} />
    </div>
  );
};

export default DatetimePicker;
