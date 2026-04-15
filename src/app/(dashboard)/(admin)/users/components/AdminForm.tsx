'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomButton from '@/components/custom-button';
import FormInput from '@/components/form-input';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export default function AdminForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // TODO: handle admin creation via server action
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Form {...form}>
        <FormInput
          control={form.control}
          name="name"
          label="Name"
          placeholder="Enter full name"
        />

        <FormInput
          control={form.control}
          name="email"
          label="Email Address"
          type="email"
          placeholder="admin@example.com"
        />

        <FormInput
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
        />

        <DialogFooter>
          <CustomButton type="submit">Add Admin</CustomButton>
        </DialogFooter>
      </Form>
    </form>
  );
}
