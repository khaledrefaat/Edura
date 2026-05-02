"use client";

import { LogOut } from "lucide-react";
import { useTransition } from "react";
import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mt-auto mx-auto p-4">
      <button
        type="button"
        aria-label="logout"
        disabled={isPending}
        onClick={() => startTransition(() => logout())}
        className="p-3 rounded-full border border-primary w-max mx-auto cursor-pointer disabled:opacity-50"
      >
        <LogOut className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
}
