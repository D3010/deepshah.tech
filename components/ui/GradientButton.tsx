"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import type { ComponentProps } from "react";

type DistributiveOmit<T, K extends keyof any> = T extends unknown
  ? Omit<T, K>
  : never;

type Props = DistributiveOmit<ComponentProps<typeof MagneticButton>, "variant">;

/** Brand-gradient pill button with magnetic hover. */
export function GradientButton(props: Props) {
  return (
    <MagneticButton
      {...(props as ComponentProps<typeof MagneticButton>)}
      variant="primary"
    />
  );
}
