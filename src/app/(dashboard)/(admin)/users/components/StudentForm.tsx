'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomButton from '@/components/common/CustomButton';
import FormInput from '@/components/common/FormInput';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  contactInfo: z.string().min(1, { message: 'Contact info is required' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  status: z.enum(['Active', 'Inactive']),
});

export default function StudentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      contactInfo: '',
      dateOfBirth: '',
      password: '',
      status: 'Active',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // TODO: handle student creation via server action
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Form {...form}>
        <FormInput
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Enter full name"
        />

        <FormInput
          control={form.control}
          name="email"
          label="Email Address"
          type="email"
          placeholder="student@example.com"
        />

        <FormInput
          control={form.control}
          name="contactInfo"
          label="Contact Info (Phone)"
          type="tel"
          placeholder="+1 (555) 123-4567"
        />

        <FormInput
          control={form.control}
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
        />

        <FormInput
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
        />

        <DialogFooter>
          <CustomButton type="submit">Add Student</CustomButton>
        </DialogFooter>
      </Form>
    </form>
  );
}
