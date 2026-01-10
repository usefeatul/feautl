"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@featul/ui/components/opt";
import { LoadingButton } from "@/components/global/loading-button";

type OtpStepProps = {
  onVerify: (code: string) => Promise<{ success: boolean; error?: string }>;
  onResend: () => Promise<void>;
  isResending?: boolean;
};

export function OtpStep({ onVerify, onResend, isResending = false }: OtpStepProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    setError("");

    if (code.trim().length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }

    setIsVerifying(true);
    try {
      const result = await onVerify(code.trim());
      if (!result.success && result.error) {
        setError(result.error);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-3">
      <InputOTP
        maxLength={6}
        value={code}
        onChange={(value) => {
          setCode(value);
          setSubmitted(false);
          setError("");
        }}
        containerClassName="justify-center gap-2"
        aria-label="One-time password"
        aria-invalid={submitted && Boolean(error)}
        aria-describedby={submitted && error ? "code-error" : undefined}
      >
        <InputOTPGroup>
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className="h-10 w-9 text-base"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p className="text-xs text-accent text-center">
        Enter your one-time password.
      </p>
      {submitted && error && (
        <p id="code-error" className="text-destructive text-center text-xs">
          {error}
        </p>
      )}
      <LoadingButton
        className="w-full"
        type="button"
        onClick={handleSubmit}
        loading={isVerifying}
      >
        Continue
      </LoadingButton>
      <LoadingButton
        className="w-full"
        type="button"
        variant="outline"
        onClick={onResend}
        loading={isResending}
      >
        Resend Code
      </LoadingButton>
    </div>
  );
}
