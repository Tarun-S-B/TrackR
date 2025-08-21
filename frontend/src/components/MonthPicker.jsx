import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const MonthPicker = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium">
        {/* Month: &nbsp; */}
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="mt-1 block w-36 rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-center"
        />
      </label>
    </div>
  );
};

export default MonthPicker;
