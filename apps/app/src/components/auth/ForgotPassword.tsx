"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@featul/auth/client";
import { Button } from "@featul/ui/components/button";
import { Input } from "@featul/ui/components/input";
import { Label } from "@featul/ui/components/label";
import Link from "next/link";
import { toast } from "sonner";
import { LoadingButton } from "@/components/global/loading-button";
import { OtpStep } from "./OtpStep";
import {
  strongPasswordPattern,
  getPasswordError,
} from "@featul/auth/password";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [verifiedCode, setVerifiedCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<"request" | "otp" | "password">("request");

  const sendResetCode = async () => {
    setIsSending(true);
    setError("");
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: email.trim(),
        type: "forget-password",
      });
      if (error) {
        setError(error.message || "Failed to send reset code");
        toast.error(error.message || "Failed to send reset code");
        return;
      }
      setStep("otp");
      toast.success("Reset code sent");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to send reset code";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async (code: string) => {
    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email: email.trim(),
        otp: code,
      });
      if (error) {
        toast.error(error.message || "Invalid or expired code");
        return { success: false, error: error.message || "Invalid or expired code" };
      }
      setVerifiedCode(code);
      setStep("password");
      return { success: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid or expired code";
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const resetPassword = async () => {
    setIsResetting(true);
    setError("");
    setSubmitted(true);
    try {
      const pwdErr = getPasswordError(password);
      if (pwdErr) {
        setError(pwdErr);
        toast.error(pwdErr);
        return;
      }
      const { error } = await authClient.emailOtp.resetPassword({
        email: email.trim(),
        otp: verifiedCode,
        password,
      });
      if (error) {
        setError(error.message || "Reset failed");
        toast.error(error.message || "Reset failed");
        return;
      }
      toast.success("Password reset", { duration: 2000 });
      await new Promise((r) => setTimeout(r, 600));
      await authClient.signIn.email(
        { email: email.trim(), password, callbackURL: "/start" },
        {
          onError: (ctx) => {
            if (ctx.error.status === 403) {
              toast.info("Please verify your email");
              router.push(`/auth/verify?email=${encodeURIComponent(email.trim())}`);
              return;
            }
            setError(ctx.error.message);
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            setTimeout(() => toast.success("Signed in"), 400);
            router.push("/start");
          },
        }
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Reset failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <section className="flex min-h-screen bg-background px-4 sm:px-6 py-8 sm:py-12">
      <form
        noValidate
        className="bg-background m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
        onSubmit={(e) => {
          e.preventDefault();
          if (step === "request") {
            sendResetCode();
          } else if (step === "password") {
            resetPassword();
          }
        }}
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-6 sm:p-8 pb-5 sm:pb-6">
          <div className="text-left">
            <h1 className="mb-2 mt-4 text-xl sm:text-2xl font-semibold text-left">
              {step === "password" ? "Set new password" : "Forgot your password"}
            </h1>
            <p className="text-xs sm:text-sm text-accent mb-2 text-left">
              {step === "request" && "Enter your email to receive a reset code"}
              {step === "otp" && "Enter the code sent to your email"}
              {step === "password" && "Choose a strong password"}
            </p>
          </div>

          <div className="mt-6 space-y-6">
            {step === "request" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email" className="block text-sm">
                    Email
                  </Label>
                  <Input
                    type="email"
                    required
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <LoadingButton
                  className="w-full"
                  type="submit"
                  loading={isSending}
                >
                  Send Reset Code
                </LoadingButton>
              </>
            )}

            {step === "otp" && (
              <OtpStep
                onVerify={handleVerifyOtp}
                onResend={sendResetCode}
                isResending={isSending}
              />
            )}

            {step === "password" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password" className="block text-sm">
                    New Password
                  </Label>
                  <Input
                    type="password"
                    required
                    id="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="placeholder:text-accent/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pattern={strongPasswordPattern}
                    title="8+ chars, uppercase, lowercase, number and symbol"
                    aria-invalid={submitted && Boolean(getPasswordError(password))}
                    aria-describedby={
                      submitted && getPasswordError(password)
                        ? "reset-password-error"
                        : undefined
                    }
                  />
                  {submitted && getPasswordError(password) && (
                    <p id="reset-password-error" className="text-destructive text-xs">
                      {getPasswordError(password)}
                    </p>
                  )}
                  {submitted && error && !getPasswordError(password) && (
                    <p className="text-destructive text-xs">{error}</p>
                  )}
                </div>
                <LoadingButton className="w-full" type="submit" loading={isResetting}>
                  Reset Password
                </LoadingButton>
              </>
            )}
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm sm:text-base">
            Remembered your password?
            <Button asChild variant="link" className="px-2">
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
