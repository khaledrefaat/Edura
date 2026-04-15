'use client';

import { User, UserCheck, UserCog, UserPlus } from 'lucide-react';
import { useState } from 'react';
import CustomButton from '@/components/custom-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AdminForm from './AdminForm';
import StudentForm from './StudentForm';
import TeacherForm from './TeacherForm';

type UserType = 'student' | 'teacher' | 'admin';

const userTypes: {
  value: UserType;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: 'student', label: 'Student', icon: User },
  { value: 'teacher', label: 'Teacher', icon: UserCheck },
  { value: 'admin', label: 'Admin', icon: UserCog },
];

export default function AddUserModal() {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<UserType>('student');

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

        {/* Type Selector */}
        <div className="flex gap-2 rounded-xl bg-muted p-1">
          {userTypes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedType(value)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === value
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Form */}
        {selectedType === 'student' && <StudentForm />}
        {selectedType === 'teacher' && <TeacherForm />}
        {selectedType === 'admin' && <AdminForm />}
      </DialogContent>
    </Dialog>
  );
}
