export type EventName = "dagen" | "ettermiddagen";

export type NextEvent = {
    name: EventName;
    year: number;
};

export function getNextEvent(date = new Date()): NextEvent {
    const year = date.getFullYear();
    const januaryFirst = new Date(year, 0, 1);
    const mayFirst = new Date(year, 4, 1);

    return {
        name: date >= januaryFirst && date < mayFirst
            ? "ettermiddagen"
            : "dagen",
        year,
    };
}
