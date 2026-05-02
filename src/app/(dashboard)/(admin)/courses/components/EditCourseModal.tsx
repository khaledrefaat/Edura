"use client";

import { Pencil } from "lucide-react";
import { Suspense, use, useState } from "react";
import { getCourseDetails, getStudents, getTeachers } from "@/app/actions/courses";
import type { CourseDetails } from "@/app/actions/courses";
import EditCourseModalSkeleton from "@/components/skeleton/EditCourseModalSkeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { CourseRow } from "@/lib/dal";
import { type CourseFormValues } from "./course-form.utils";
import CourseForm from "./CourseForm";

type EditCourseData = [
  CourseDetails | null,
  { id: string; name: string }[],
  { id: string; name: string; email: string }[],
];

function EditCourseForm({
  promise,
  course,
  onClose,
}: {
  promise: Promise<EditCourseData>;
  course: CourseRow;
  onClose: () => void;
}) {
  const [details, teachers, students] = use(promise);

  return (
    <CourseForm
      defaultValues={{
        title: details?.title ?? "",
        description: details?.description ?? "",
        type: details?.type === "group" ? "Group" : "Private",
        teacherId: details?.teacher.id ?? "",
        startDate: details?.startDate ?? "",
        endDate: details?.endDate ?? "",
        daysOfWeek: details?.days ?? [],
        startTime: "",
        endTime: "",
        exceptionDates: details?.exceptionDates ?? [],
        selectedStudents: details?.students.map((s) => s.id) ?? [],
      }}
      teacherOptions={teachers.map((t) => ({ label: t.name, value: t.id }))}
      availableStudents={students.map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
      }))}
      onSubmit={async (values: CourseFormValues) => {
        // TODO: call updateCourse action when ready
        console.log("Update course:", course.id, values);
        return {};
      }}
      onClose={onClose}
      submitLabel="Save Changes"
      submitPendingLabel="Saving..."
    />
  );
}

export default function EditCourseModal({ course }: { course: CourseRow }) {
  const [open, setOpen] = useState(false);
  const [dataPromise, setDataPromise] = useState<Promise<EditCourseData> | null>(
    null,
  );

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (isOpen) {
      setDataPromise(
        Promise.all([
          getCourseDetails(course.id),
          getTeachers(),
          getStudents(),
        ]),
      );
    } else {
      setDataPromise(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className="p-2 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-lg transition-all"
          title="Edit course"
          type="button"
        >
          <Pencil className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Update the course details below.
          </DialogDescription>
        </DialogHeader>

        {dataPromise && (
          <Suspense fallback={<EditCourseModalSkeleton />}>
            <EditCourseForm
              promise={dataPromise}
              course={course}
              onClose={() => setOpen(false)}
            />
          </Suspense>
        )}
      </DialogContent>
    </Dialog>
  );
}
