"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, LockKeyhole } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomButton from "@/components/common/CustomButton";
import FormInput from "@/components/common/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { type SignInState, signIn } from "../actions";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean(),
});

export default function SignInForm() {
  const [serverState, setServerState] = useState<SignInState>({});
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("rememberMe", values.rememberMe ? "on" : "off");

    startTransition(async () => {
      const result = await signIn(formData);
      setServerState(result);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          control={form.control}
          name="email"
          label="Email Address"
          type="email"
          placeholder="admin@edura.com"
          icon={AtSign}
        />

        <FormInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          icon={LockKeyhole}
          showPasswordToggle
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-gray-600 cursor-pointer">
                  Remember me
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {serverState.message && (
          <p className="text-sm text-red-500 text-center">
            {serverState.message}
          </p>
        )}

        <CustomButton type="submit" variant="primary" loading={isPending}>
          Sign In
        </CustomButton>
      </form>
    </Form>
  );
}
