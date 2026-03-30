'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AtSign, LockKeyhole } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomButton from '@/components/custom-button';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean(),
});

export default function FormData() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <Form {...form}>
        <FormInput
          control={form.control}
          name="email"
          label="Email Address"
          type="email"
          placeholder="admin@edumanage.com"
          icon={AtSign}
        />

        <FormInput
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={LockKeyhole}
        />

        {/* Remember Me */}
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center cursor-pointer gap-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="checkbox"
                />
                <Label htmlFor="checkbox" className="text-gray-600">
                  Remember me
                </Label>
              </div>
            </div>
          )}
        />

        {/* Sign In Button */}
        <CustomButton type="submit" variant="primary">
          Sign In
        </CustomButton>
      </Form>
    </form>
  );
}
