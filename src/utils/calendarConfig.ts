import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";

export const getCalendarConfig = (locale: "fa" | "en") => ({
    calendar: locale === "fa" ? persian : gregorian,
    dateLocale: locale === "fa" ? persian_fa : gregorian_en,
});
