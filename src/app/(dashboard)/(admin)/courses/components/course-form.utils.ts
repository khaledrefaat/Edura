import { z } from "zod";

export const DAYS_OF_WEEK = [
  { short: "Mon", full: "Monday" },
  { short: "Tue", full: "Tuesday" },
  { short: "Wed", full: "Wednesday" },
  { short: "Thu", full: "Thursday" },
  { short: "Fri", full: "Friday" },
  { short: "Sat", full: "Saturday" },
  { short: "Sun", full: "Sunday" },
];

export const courseFormSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["Group", "Private"]),
  teacherId: z.string().min(1, "Teacher is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  daysOfWeek: z.array(z.string()).min(1, "Select at least one day"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  exceptionDates: z.array(z.string()),
  selectedStudents: z.array(z.string()),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;

export const emptyCourseDefaults: CourseFormValues = {
  title: "",
  description: "",
  type: "Group",
  teacherId: "",
  startDate: "",
  endDate: "",
  daysOfWeek: [],
  startTime: "",
  endTime: "",
  exceptionDates: [],
  selectedStudents: [],
};
