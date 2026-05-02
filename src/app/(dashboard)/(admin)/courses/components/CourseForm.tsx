"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon, Clock, Users, X } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/common/CustomButton";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import FormTextarea from "@/components/common/FormTextarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DAYS_OF_WEEK,
  courseFormSchema,
  type CourseFormValues,
} from "./course-form.utils";

export type CourseFormSubmitResult = { error?: string };

export default function CourseForm({
  defaultValues,
  teacherOptions,
  availableStudents,
  onSubmit,
  onClose,
  submitLabel,
  submitPendingLabel,
}: {
  defaultValues: CourseFormValues;
  teacherOptions: { label: string; value: string }[];
  availableStudents: { id: string; name: string; email: string }[];
  onSubmit: (values: CourseFormValues) => Promise<CourseFormSubmitResult>;
  onClose: () => void;
  submitLabel: string;
  submitPendingLabel: string;
}) {
  const [studentSearchTerm, setStudentSearchTerm] = useState("");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [showExceptionsCalendar, setShowExceptionsCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
  });

  const exceptions = form.watch("exceptionDates");
  const selectedStudents = form.watch("selectedStudents");

  function handleFormSubmit(values: CourseFormValues) {
    setError(null);
    startTransition(async () => {
      const result = await onSubmit(values);
      if (result.error) {
        setError(result.error);
        return;
      }
      onClose();
    });
  }

  const toggleExceptionDate = (dateStr: string) => {
    const current = form.getValues("exceptionDates");
    form.setValue(
      "exceptionDates",
      current.includes(dateStr)
        ? current.filter((d) => d !== dateStr)
        : [...current, dateStr],
    );
  };

  const toggleStudent = (studentId: string) => {
    const current = form.getValues("selectedStudents");
    form.setValue(
      "selectedStudents",
      current.includes(studentId)
        ? current.filter((id) => id !== studentId)
        : [...current, studentId],
    );
  };

  const filteredStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(studentSearchTerm.toLowerCase()),
  );

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
    const startDate = form.getValues("startDate");
    const endDate = form.getValues("endDate");
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isException = exceptions.includes(dateStr);
      const isInRange =
        startDate && endDate && dateStr >= startDate && dateStr <= endDate;

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => isInRange && toggleExceptionDate(dateStr)}
          disabled={!isInRange}
          className={`p-2 rounded-lg text-sm transition-all ${
            isException
              ? "bg-red-500 text-white"
              : isInRange
                ? "bg-gray-100 hover:bg-[#D4AF37] hover:text-white cursor-pointer"
                : "text-gray-300 cursor-not-allowed"
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
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-xs text-center text-gray-500 p-1">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
        <div className="mt-3 text-xs text-gray-600">
          <p>&#8226; Click dates to mark as exceptions (days off)</p>
          <p>&#8226; Red dates will be excluded from the schedule</p>
          {exceptions.length > 0 && (
            <p className="mt-2 text-red-600">
              {exceptions.length} exception{exceptions.length !== 1 ? "s" : ""}{" "}
              selected
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Course Information */}
        <div className="space-y-5">
          <h3 className="text-lg text-gray-900 border-b border-gray-200 pb-2">
            Course Information
          </h3>

          <FormInput
            control={form.control}
            name="title"
            label="Course Title"
            placeholder="e.g., Advanced Mathematics"
          />

          <FormTextarea
            control={form.control}
            name="description"
            label="Description"
            placeholder="Brief description of the course"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              control={form.control}
              name="type"
              label="Course Type"
              options={[
                { label: "Group Class", value: "Group" },
                { label: "Private Session", value: "Private" },
              ]}
            />
            <FormSelect
              control={form.control}
              name="teacherId"
              label="Assign Teacher"
              placeholder="Select a teacher"
              options={teacherOptions}
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="space-y-5">
          <h3 className="text-lg text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
            Schedule
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="startDate"
              label="Start Date"
              type="date"
            />
            <FormInput
              control={form.control}
              name="endDate"
              label="End Date"
              type="date"
            />
          </div>

          <FormField
            control={form.control}
            name="daysOfWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recurring Days</FormLabel>
                <div className="grid grid-cols-7 gap-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <button
                      key={day.short}
                      type="button"
                      onClick={() =>
                        field.onChange(
                          field.value.includes(day.short)
                            ? field.value.filter((d) => d !== day.short)
                            : [...field.value, day.short],
                        )
                      }
                      className={`py-3 px-2 rounded-xl text-sm transition-all ${
                        field.value.includes(day.short)
                          ? "bg-[#D4AF37] text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {day.short}
                    </button>
                  ))}
                </div>
                {field.value.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {field.value.join(", ")}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="startTime"
              label="Start Time"
              type="time"
              icon={Clock}
            />
            <FormInput
              control={form.control}
              name="endTime"
              label="End Time"
              type="time"
              icon={Clock}
            />
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
                  ? "Hide Calendar"
                  : "Select Exception Dates"}
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

          <FormField
            control={form.control}
            name="selectedStudents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Students</FormLabel>
                <FormControl>
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
                              setStudentSearchTerm("");
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm transition-colors border-b border-gray-100 last:border-b-0 ${
                              field.value.includes(student.id)
                                ? "bg-[#D4AF37]/10 text-[#D4AF37] font-medium"
                                : "hover:bg-gray-50"
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
                </FormControl>

                {selectedStudents.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedStudents.map((studentId) => {
                      const student = availableStudents.find(
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <CustomButton type="submit" disabled={isPending}>
            {isPending ? submitPendingLabel : submitLabel}
          </CustomButton>
        </div>
      </form>
    </Form>
  );
}
