"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import type { ComponentProps } from "react";

type DistributiveOmit<T, K extends keyof any> = T extends unknown
  ? Omit<T, K>
  : never;

type Props = DistributiveOmit<ComponentProps<typeof MagneticButton>, "variant">;

/** Hairline outline button. */
export function OutlineButton(props: Props) {
  return (
    <MagneticButton
      {...(props as ComponentProps<typeof MagneticButton>)}
      variant="outline"
    />
  );
}
