import { parseAbsolute, parseAbsoluteToLocal } from "@internationalized/date";

const toInputDate = (date: string) => {

    const formattedDate = parseAbsoluteToLocal(date.replace(" ", "T") + "+07:00")
    return formattedDate; 
};

export { toInputDate }
