import format from "date-fns/format";
import ru from "date-fns/locale/ru";

export function formatOrderDate(originalDate) {
    return format(new Date(originalDate), 'd MMMM yyyy г', { locale: ru });
}