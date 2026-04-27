import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/common/Calendar";

const getCalendarDate = (dateString: string) => {
  const today = new Date();
  if (dateString === "Today") return today;
  if (dateString === "Tomorrow") {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }
  if (dateString === "Wednesday") {
    const wednesday = new Date(today);
    const daysUntilWednesday = (3 - today.getDay() + 7) % 7 || 7;
    wednesday.setDate(wednesday.getDate() + daysUntilWednesday);
    return wednesday;
  }
  return today;
};

const calendarEvents = [
  {
    id: "1",
    title: "Advanced Mathematics",
    date: getCalendarDate("Today"),
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    zoomLink: "https://zoom.us/j/teacher123",
    students: 24,
  },
  {
    id: "2",
    title: "Private Tutoring - Algebra",
    date: getCalendarDate("Today"),
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    zoomLink: "https://zoom.us/j/teacher456",
    students: 1,
  },
  {
    id: "3",
    title: "Advanced Mathematics",
    date: getCalendarDate("Tomorrow"),
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    zoomLink: "https://zoom.us/j/teacher123",
    students: 24,
  },
  {
    id: "4",
    title: "Calculus Workshop",
    date: getCalendarDate("Wednesday"),
    startTime: "1:00 PM",
    endTime: "2:30 PM",
    zoomLink: "https://zoom.us/j/teacher789",
    students: 18,
  },
  {
    id: "5",
    title: "Statistics Fundamentals",
    date: (() => {
      const today = new Date();
      const thursday = new Date(today);
      const daysUntilThursday = (4 - today.getDay() + 7) % 7 || 7;
      thursday.setDate(thursday.getDate() + daysUntilThursday);
      return thursday;
    })(),
    startTime: "3:00 PM",
    endTime: "4:30 PM",
    zoomLink: "https://zoom.us/j/teacher999",
    students: 22,
  },
];

export function CalendarSection() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
        <h2 className="text-xl">Teaching Calendar</h2>
      </div>
      <Calendar events={calendarEvents} userRole="teacher" />
    </div>
  );
}
