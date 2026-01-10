"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@featul/auth/client";
import { Button } from "@featul/ui/components/button";
import Link from "next/link";
import { toast } from "sonner";
import { OtpStep } from "./OtpStep";

export default function Verify() {
  const router = useRouter();
  const params = useSearchParams();
  const rawRedirect = params.get("redirect") || "";
  const redirect = rawRedirect.startsWith("/") ? rawRedirect : "/start";
  const initialEmail = useMemo(() => params.get("email") || "", [params]);
  const [email, setEmail] = useState(initialEmail);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
  }, [initialEmail]);

  const resend = async () => {
    setIsResending(true);
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email: email.trim(),
        type: "email-verification",
      });
      toast.success("Verification code sent");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to send code";
      toast.error(msg);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (code: string) => {
    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email: email.trim(),
        otp: code,
      });
      if (error) {
        toast.error(error.message || "Verification failed");
        return { success: false, error: error.message || "Verification failed" };
      }
      toast.success("Email verified");
      router.push(redirect);
      return { success: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid or expired code";
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  return (
    <section className="flex min-h-screen bg-background px-4 sm:px-6 py-8 sm:py-12">
      <div className="bg-background m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-6 sm:p-8 pb-5 sm:pb-6">
          <div className="text-left">
            <h1 className="mb-2 mt-4 text-xl sm:text-2xl font-semibold text-left">
              Verify your email
            </h1>
            <p className="text-xs sm:text-sm text-accent mb-2 text-left">
              Enter the code sent to your email
            </p>
          </div>

          <div className="mt-6 space-y-6">
            <OtpStep
              onVerify={handleVerify}
              onResend={resend}
              isResending={isResending}
            />
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm sm:text-base">
            Already verified?
            <Button asChild variant="link" className="px-2">
              <Link
                href={
                  rawRedirect
                    ? `/auth/sign-in?redirect=${encodeURIComponent(rawRedirect)}`
                    : "/auth/sign-in"
                }
              >
                Sign in
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}
