"use client";

import { Suspense, use, useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
  CalendarOff,
  Clock,
  Eye,
  GraduationCap,
  Mail,
  Users,
} from "lucide-react";
import type { CourseRow } from "@/lib/dal";
import type { CourseDetails } from "@/app/actions/courses";
import { getCourseDetails } from "@/app/actions/courses";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import CourseDetailsSkeleton from "@/components/skeleton/CourseDetailsSkeleton";
import Link from "next/link";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ""}` : `${m}m`;
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function CourseDetailsDialog({
  course,
}: { course: CourseRow }) {
  const [open, setOpen] = useState(false);
  const [coursePromise, setCoursePromise] = useState<Promise<CourseDetails | null> | null>(null);

  useEffect(() => {
    if (open) {
      setCoursePromise(getCourseDetails(course.id));
    } else {
      setCoursePromise(null);
    }
  }, [open, course.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="p-2 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-lg transition-all"
          title="View course details"
          type="button"
        >
          <Eye className="w-5 h-5" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">{course.title}</DialogTitle>
          {course.description && (
            <DialogDescription>{course.description}</DialogDescription>
          )}
        </DialogHeader>

        {coursePromise ? (
          <Suspense fallback={<CourseDetailsSkeleton />}>
            <CourseDetailsContent coursePromise={coursePromise} />
          </Suspense>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function CourseDetailsContent({
  coursePromise,
}: { coursePromise: Promise<CourseDetails | null> }) {
  const details = use(coursePromise);

  if (!details) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
        Course not found
      </div>
    );
  }

  return (
    <div className="space-y-5 pt-2">
      {/* Info grid */}
      <div className="grid grid-cols-2 gap-3">
        <InfoRow
          icon={<BookOpen className="w-4 h-4 text-[#D4AF37]" />}
          label="Type"
        >
          <Badge
            className={
              details.type === "group"
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700"
            }
          >
            {capitalize(details.type)}
          </Badge>
        </InfoRow>

        <InfoRow
          icon={<Clock className="w-4 h-4 text-[#D4AF37]" />}
          label="Duration"
        >
          <span className="text-sm font-medium">
            {formatDuration(details.durationMinutes)}
          </span>
        </InfoRow>

        <InfoRow
          icon={<Calendar className="w-4 h-4 text-[#D4AF37]" />}
          label="Start"
        >
          <span className="text-sm font-medium">
            {formatDate(details.startDate)}
          </span>
        </InfoRow>

        <InfoRow
          icon={<Calendar className="w-4 h-4 text-[#D4AF37]" />}
          label="End"
        >
          <span className="text-sm font-medium">
            {formatDate(details.endDate)}
          </span>
        </InfoRow>
      </div>

      {/* Schedule days */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          Schedule Days
        </div>
        <div className="flex flex-wrap gap-1.5">
          {details.days.map((day) => (
            <span
              key={day}
              className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
            >
              {capitalize(day)}
            </span>
          ))}
        </div>
      </div>

      {/* Exception dates */}
      {details.exceptionDates.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarOff className="w-4 h-4 text-[#D4AF37]" />
            Exception Dates
          </div>
          <div className="flex flex-wrap gap-1.5">
            {details.exceptionDates.map((d) => (
              <span
                key={d}
                className="px-2.5 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-md"
              >
                {formatDate(d)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Teacher */}
      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
          Teacher
        </div>
        <div className="flex items-center justify-between">
          <Link href={`/teacher/${details.teacher.id}`} className="text-sm font-medium underline">
            {details.teacher.name}
          </Link>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Mail className="w-3 h-3" />
            {details.teacher.email}
          </span>
        </div>
      </div>

      {/* Students table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4 text-[#D4AF37]" />
            Enrolled Students
          </div>
          <Badge variant="secondary">{details.students.length}</Badge>
        </div>

        {details.students.length === 0 ? (
          <div className="text-sm text-gray-400 text-center py-4 border border-dashed rounded-lg">
            No students enrolled
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-3 py-2 font-medium text-gray-500">
                    Name
                  </th>
                  <th className="px-3 py-2 font-medium text-gray-500">
                    Email
                  </th>
                  <th className="px-3 py-2 font-medium text-gray-500 text-right">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {details.students.map((s) => (
                  <tr key={s.email} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium underline"><Link href={`/student/${s.id}`}>{s.name}</Link></td>
                    <td className="px-3 py-2 text-gray-500">{s.email}</td>
                    <td className="px-3 py-2 text-gray-400 text-right">
                      {s.joinedAt
                        ? formatDate(s.joinedAt.toISOString())
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-xs text-gray-400">{label}</span>
      {children}
    </div>
  );
}
