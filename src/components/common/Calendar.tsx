'use client';

import { ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { useState } from 'react';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  zoomLink: string;
  students?: number;
  teacher?: string;
  type?: 'upcoming' | 'scheduled' | 'completed';
}

interface CalendarProps {
  events: CalendarEvent[];
  userRole?: 'teacher' | 'student';
}

export function Calendar({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } =
    getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDate = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const renderCalendarDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="aspect-square p-2 bg-gray-50 rounded-lg"
        ></div>,
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const today = isToday(day);

      days.push(
        <div
          key={day}
          className={`aspect-square p-2 rounded-lg border transition-all ${
            today
              ? 'border-[#D4AF37] bg-[#D4AF37]/5'
              : dayEvents.length > 0
                ? 'border-gray-200 bg-white hover:border-[#D4AF37]'
                : 'border-gray-100 bg-white'
          }`}
        >
          <div
            className={`text-sm mb-1 ${today ? 'text-[#D4AF37]' : 'text-gray-700'}`}
          >
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="w-full text-left px-2 py-1 bg-[#D4AF37] text-white text-xs rounded hover:bg-[#B8941F] transition-colors truncate"
                title={event.title}
                type="button"
              >
                {event.startTime} {event.title}
              </button>
            ))}
          </div>
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-sm text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          //   onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
            // onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl mb-4">{selectedEvent.title}</h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-900">
                  {selectedEvent.date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Time:</span>
                <span className="text-gray-900">
                  {selectedEvent.startTime} - {selectedEvent.endTime}
                </span>
              </div>

              {selectedEvent.teacher && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Teacher:</span>
                  <span className="text-gray-900">{selectedEvent.teacher}</span>
                </div>
              )}

              {selectedEvent.students !== undefined && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Students:</span>
                  <span className="text-gray-900">
                    {selectedEvent.students}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                type="button"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.open(selectedEvent.zoomLink, '_blank');
                  setSelectedEvent(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8941F] transition-colors shadow-md"
                type="button"
              >
                <Video className="w-4 h-4" />
                Join Zoom
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
