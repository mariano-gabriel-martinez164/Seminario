import { useState } from "react";

export function useDatesState() {
    const today = new Date();
    const monthLater = new Date();
    monthLater.setMonth(today.getMonth() + 1);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(monthLater);
    return [startDate, setStartDate, endDate, setEndDate];
}