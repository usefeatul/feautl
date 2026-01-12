"use client";

import React, { useState, useEffect, useRef } from "react";
import SettingsCard from "../../../global/SettingsCard";
import { Globe2 } from "lucide-react";
import { toast } from "sonner";
import { client } from "@featul/api/client";
import { useRouter } from "next/navigation";
import TimezonePicker from "../../../wizard/TimezonePicker";
import { SettingsDialogShell } from "../../global/SettingsDialogShell";

type Props = {
    slug: string;
    initialTimezone?: string;
};

type ErrorResponse = {
    ok?: boolean;
    message?: string;
};

export default function TimezoneCard({ slug, initialTimezone }: Props) {
    const router = useRouter();
    const [timezone, setTimezone] = useState(initialTimezone || "UTC");
    const [now] = useState(new Date());
    const [_isPending, startTransition] = React.useTransition();
    const isInitialMount = useRef(true);
    const isUpdating = useRef(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        // Skip the first render to avoid updating on mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Skip if already updating to prevent duplicate calls
        if (isUpdating.current) return;

        // Skip if timezone matches the initial value (already in sync)
        if (timezone === initialTimezone) return;

        if (!slug || !timezone) return;

        // Optimistically update - the UI already shows the new timezone
        isUpdating.current = true;

        // Show loading toast
        const toastId = toast.loading("Updating timezone...");

        startTransition(async () => {
            try {
                const res = await client.workspace.updateTimezone.$post({
                    slug,
                    timezone,
                });
                const data = await res.json().catch(() => ({}));

                if (!res.ok || !('ok' in data) || !data.ok) {
                    const message = (data as ErrorResponse)?.message || "Failed to update timezone";
                    toast.error(message, { id: toastId });
                    // Revert to initial timezone on error
                    setTimezone(initialTimezone || "UTC");
                    isUpdating.current = false;
                    return;
                }

                // Add a 1 second delay so users can see the updating toast
                await new Promise(resolve => setTimeout(resolve, 1000));

                toast.success("Timezone updated", { id: toastId });
                setDialogOpen(false);
                router.refresh();

                // Reset the updating flag after a longer delay to ensure router.refresh completes
                setTimeout(() => {
                    isUpdating.current = false;
                }, 1000);
            } catch (error) {
                console.error("Failed to update timezone", error);
                toast.error("Failed to update timezone", { id: toastId });
                // Revert to initial timezone on error
                setTimezone(initialTimezone || "UTC");
                isUpdating.current = false;
            }
        });
    }, [timezone, slug, router, initialTimezone]);

    const friendlyTZ = (tz: string) => {
        const city = tz.split("/").slice(-1)[0]?.replace(/_/g, " ") ?? tz;
        return city;
    };

    const handleTimezoneChange = (newTimezone: string) => {
        setTimezone(newTimezone);
        setDialogOpen(false); // Close dialog immediately after selection
    };

    return (
        <>
            <SettingsCard
                icon={<Globe2 className="size-5 text-primary" />}
                title="Timezone"
                description={<span>Current timezone: <span className="font-medium text-black">{friendlyTZ(timezone)}</span>. All project graphs, ranges and timestamps will be matched to this timezone.</span>}
                buttonLabel="Change"
                onAction={() => setDialogOpen(true)}
            />

            <SettingsDialogShell
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Change Timezone"
                icon={<Globe2 className="w-4 h-4" />}
                width="default"
            >
                <TimezonePicker value={timezone} onChange={handleTimezoneChange} now={now} />
            </SettingsDialogShell>
        </>
    );
}
