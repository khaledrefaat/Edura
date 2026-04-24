'use client';

import { Calendar as CalendarIcon, Clock, Plus, Users, X } from 'lucide-react';
import { useState } from 'react';
import CustomButton from '@/components/common/CustomButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const DAYS_OF_WEEK = [
  { short: 'Mon', full: 'Monday' },
  { short: 'Tue', full: 'Tuesday' },
  { short: 'Wed', full: 'Wednesday' },
  { short: 'Thu', full: 'Thursday' },
  { short: 'Fri', full: 'Friday' },
  { short: 'Sat', full: 'Saturday' },
  { short: 'Sun', full: 'Sunday' },
];

const AVAILABLE_STUDENTS = [
  { id: '4', name: 'John Smith', email: 'john.smith@student.edu' },
  { id: '5', name: 'Emma Wilson', email: 'emma.wilson@student.edu' },
  { id: '6', name: 'Oliver Brown', email: 'oliver.brown@student.edu' },
  { id: '7', name: 'Sophia Martinez', email: 'sophia.martinez@student.edu' },
  { id: '8', name: 'Liam Anderson', email: 'liam.anderson@student.edu' },
];

const TEACHERS = ['Dr. Sarah Johnson', 'Prof. Michael Chen', 'Ms. Emily Davis'];

export default function AddCoursesModal() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Group' as 'Group' | 'Private',
    teacher: '',
  });

  const [schedule, setSchedule] = useState({
    startDate: '',
    endDate: '',
    daysOfWeek: [] as string[],
    startTime: '',
    endTime: '',
    exceptions: [] as string[],
  });

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [showExceptionsCalendar, setShowExceptionsCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const toggleDayOfWeek = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter((d) => d !== day)
        : [...prev.daysOfWeek, day],
    }));
  };

  const toggleExceptionDate = (dateStr: string) => {
    setSchedule((prev) => ({
      ...prev,
      exceptions: prev.exceptions.includes(dateStr)
        ? prev.exceptions.filter((d) => d !== dateStr)
        : [...prev.exceptions, dateStr],
    }));
  };

  const toggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId],
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with server action
    setOpen(false);
  };

  const filteredStudents = AVAILABLE_STUDENTS.filter(
    (student) =>
      student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(studentSearchTerm.toLowerCase()),
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return {
      daysInMonth: lastDay.getDate(),
      startingDayOfWeek: firstDay.getDay(),
    };
  };

  const renderExceptionsCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isException = schedule.exceptions.includes(dateStr);
      const isInRange =
        schedule.startDate &&
        schedule.endDate &&
        dateStr >= schedule.startDate &&
        dateStr <= schedule.endDate;

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => isInRange && toggleExceptionDate(dateStr)}
          disabled={!isInRange}
          className={`p-2 rounded-lg text-sm transition-all ${
            isException
              ? 'bg-red-500 text-white'
              : isInRange
                ? 'bg-gray-100 hover:bg-[#D4AF37] hover:text-white cursor-pointer'
                : 'text-gray-300 cursor-not-allowed'
          }`}
        >
          {day}
        </button>,
      );
    }

    return (
      <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            &larr;
          </button>
          <span className="font-medium">{monthName}</span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            &rarr;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="text-xs text-center text-gray-500 p-1">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
        <div className="mt-3 text-xs text-gray-600">
          <p>&#8226; Click dates to mark as exceptions (days off)</p>
          <p>&#8226; Red dates will be excluded from the schedule</p>
          {schedule.exceptions.length > 0 && (
            <p className="mt-2 text-red-600">
              {schedule.exceptions.length} exception
              {schedule.exceptions.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CustomButton>
          <Plus className="w-5 h-5" />
          Create Course
        </CustomButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new course.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Information */}
          <div className="space-y-5">
            <h3 className="text-lg text-gray-900 border-b border-gray-200 pb-2">
              Course Information
            </h3>

            <div>
              <label
                htmlFor="title"
                className="block text-sm mb-2 text-gray-700"
              >
                Course Title
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Advanced Mathematics"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm mb-2 text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of the course"
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm mb-2 text-gray-700"
                >
                  Course Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as 'Group' | 'Private',
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                >
                  <option value="Group">Group Class</option>
                  <option value="Private">Private Session</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="teacher"
                  className="block text-sm mb-2 text-gray-700"
                >
                  Assign Teacher
                </label>
                <select
                  id="teacher"
                  value={formData.teacher}
                  onChange={(e) =>
                    setFormData({ ...formData, teacher: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  required
                >
                  <option value="">Select a teacher</option>
                  {TEACHERS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-5">
            <h3 className="text-lg text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
              Schedule
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm mb-2 text-gray-700"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={schedule.startDate}
                  onChange={(e) =>
                    setSchedule({ ...schedule, startDate: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm mb-2 text-gray-700"
                >
                  End Date
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={schedule.endDate}
                  onChange={(e) =>
                    setSchedule({ ...schedule, endDate: e.target.value })
                  }
                  min={schedule.startDate}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <span className="block text-sm mb-3 text-gray-700">
                Recurring Days
              </span>
              <div className="grid grid-cols-7 gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <button
                    key={day.short}
                    type="button"
                    onClick={() => toggleDayOfWeek(day.short)}
                    className={`py-3 px-2 rounded-xl text-sm transition-all ${
                      schedule.daysOfWeek.includes(day.short)
                        ? 'bg-[#D4AF37] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day.short}
                  </button>
                ))}
              </div>
              {schedule.daysOfWeek.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {schedule.daysOfWeek.join(', ')}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startTime"
                  className="flex text-sm mb-2 text-gray-700 items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-[#D4AF37]" /> Start Time
                </label>
                <input
                  id="startTime"
                  type="time"
                  value={schedule.startTime}
                  onChange={(e) =>
                    setSchedule({ ...schedule, startTime: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="flex text-sm mb-2 text-gray-700 items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-[#D4AF37]" /> End Time
                </label>
                <input
                  id="endTime"
                  type="time"
                  value={schedule.endTime}
                  onChange={(e) =>
                    setSchedule({ ...schedule, endTime: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="block text-sm text-gray-700">
                  Exceptions (Days Off)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setShowExceptionsCalendar(!showExceptionsCalendar)
                  }
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  {showExceptionsCalendar
                    ? 'Hide Calendar'
                    : 'Select Exception Dates'}
                </button>
              </div>
              {showExceptionsCalendar && renderExceptionsCalendar()}
            </div>
          </div>

          {/* Students */}
          <div className="space-y-5">
            <h3 className="text-lg text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#D4AF37]" />
              Students
            </h3>

            <div>
              <span className="block text-sm mb-2 text-gray-700">
                Add Students
              </span>
              <div className="relative">
                <input
                  type="text"
                  value={studentSearchTerm}
                  onChange={(e) => setStudentSearchTerm(e.target.value)}
                  onFocus={() => setShowStudentDropdown(true)}
                  onBlur={() =>
                    setTimeout(() => setShowStudentDropdown(false), 200)
                  }
                  placeholder="Search students by name or email"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                />
                {filteredStudents.length > 0 && showStudentDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto z-10">
                    {filteredStudents.map((student) => (
                      <button
                        key={student.id}
                        type="button"
                        onClick={() => {
                          toggleStudent(student.id);
                          setStudentSearchTerm('');
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors border-b border-gray-100 last:border-b-0 ${
                          selectedStudents.includes(student.id)
                            ? 'bg-[#D4AF37]/10 text-[#D4AF37] font-medium'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div>{student.name}</div>
                        <div className="text-xs text-gray-500">
                          {student.email}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedStudents.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedStudents.map((studentId) => {
                    const student = AVAILABLE_STUDENTS.find(
                      (s) => s.id === studentId,
                    );
                    return student ? (
                      <span
                        key={studentId}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm"
                      >
                        {student.name}
                        <button
                          type="button"
                          onClick={() => toggleStudent(studentId)}
                          className="hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8941F] transition-colors shadow-md"
            >
              Create Course
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
