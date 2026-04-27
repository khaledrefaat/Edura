"use client";

import { User, UserCheck, UserCog, UserPlus } from "lucide-react";
import { useState } from "react";
import CustomButton from "@/components/common/CustomButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdminForm from "./AdminForm";
import StudentForm from "./StudentForm";
import TabSwitcher, { type Tab } from "./TabsSwitcher";
import TeacherForm from "./TeacherForm";

const userTypes: Tab[] = [
  { value: "student", label: "Student", icon: User },
  { value: "teacher", label: "Teacher", icon: UserCheck },
  { value: "admin", label: "Admin", icon: UserCog },
];

export default function AddUserModal() {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<UserRole>("student");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CustomButton>
          <UserPlus className="w-5 h-5" />
          Add New User
        </CustomButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Select a user type and fill in the details.
          </DialogDescription>
        </DialogHeader>

        <TabSwitcher
          tabs={userTypes}
          value={selectedType}
          onChange={setSelectedType as unknown as (value: string) => void}
          // className="w-full max-w-xs" // You can pass custom width classes too!
        />

        {/* Form */}
        {selectedType === "student" && <StudentForm />}
        {selectedType === "teacher" && <TeacherForm />}
        {selectedType === "admin" && <AdminForm />}
      </DialogContent>
    </Dialog>
  );
}
