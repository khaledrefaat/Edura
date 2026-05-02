"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { createUser } from "@/app/actions/users";
import CustomButton from "@/components/common/CustomButton";
import FormInput from "@/components/common/FormInput";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  contactInfo: z.string().min(1, { message: "Contact info is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  status: z.enum(["Active", "Inactive"]),
});

interface TeacherFormProps {
  onSuccess?: () => void;
}

export default function TeacherForm({ onSuccess }: TeacherFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      contactInfo: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const result = await createUser({
        role: "teacher",
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.contactInfo,
        active: data.status === "Active",
      });

      if ("success" in result) {
        toast.success("Teacher created successfully");
        onSuccess?.();
      } else {
        toast.error(result.error);
      }
    });
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
          placeholder="teacher@example.com"
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
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password"
        />

        <DialogFooter>
          <CustomButton type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add Teacher"}
          </CustomButton>
        </DialogFooter>
      </Form>
    </form>
  );
}
