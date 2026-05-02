"use client";

import { Plus } from "lucide-react";
import { Suspense, use, useState } from "react";
import { createCourse, getStudents, getTeachers } from "@/app/actions/courses";
import CustomButton from "@/components/common/CustomButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditCourseModalSkeleton from "@/components/skeleton/EditCourseModalSkeleton";
import { emptyCourseDefaults, type CourseFormValues } from "./course-form.utils";
import CourseForm from "./CourseForm";

type AddCourseData = [
  { id: string; name: string }[],
  { id: string; name: string; email: string }[],
];

function AddCourseForm({
  promise,
  onClose,
}: {
  promise: Promise<AddCourseData>;
  onClose: () => void;
}) {
  const [teachers, students] = use(promise);

  return (
    <CourseForm
      defaultValues={emptyCourseDefaults}
      teacherOptions={teachers.map((t) => ({ label: t.name, value: t.id }))}
      availableStudents={students.map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
      }))}
      onSubmit={async (values: CourseFormValues) => {
        const result = await createCourse(values);
        if (result.error) return { error: result.error };
        return {};
      }}
      onClose={onClose}
      submitLabel="Create Course"
      submitPendingLabel="Creating..."
    />
  );
}

export default function AddCoursesModal() {
  const [open, setOpen] = useState(false);
  const [dataPromise, setDataPromise] = useState<Promise<AddCourseData> | null>(
    null,
  );

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (isOpen) {
      setDataPromise(Promise.all([getTeachers(), getStudents()]));
    } else {
      setDataPromise(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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

        {dataPromise && (
          <Suspense fallback={<EditCourseModalSkeleton />}>
            <AddCourseForm
              promise={dataPromise}
              onClose={() => setOpen(false)}
            />
          </Suspense>
        )}
      </DialogContent>
    </Dialog>
  );
}
