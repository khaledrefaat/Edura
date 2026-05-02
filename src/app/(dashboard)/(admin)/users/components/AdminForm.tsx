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
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

interface AdminFormProps {
  onSuccess?: () => void;
}

export default function AdminForm({ onSuccess }: AdminFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const result = await createUser({
        role: "admin",
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if ("success" in result) {
        toast.success("Admin created successfully");
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
          <CustomButton type="submit" disabled={isPending}>
            {isPending ? "Adding..." : "Add Admin"}
          </CustomButton>
        </DialogFooter>
      </Form>
    </form>
  );
}
