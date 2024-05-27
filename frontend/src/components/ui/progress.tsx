import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

type ProgressProps = {
  barColor?: string,
  barHeight?: number
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root > & ProgressProps
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-zinc-800",
      className
    )}
    style={{ height: props.barHeight || 4 }}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("flex-1 w-full h-full transition-all bg-white")}
      style={{ transform: `translateX(-${100 - (value || 0)}%)`, backgroundColor: props.barColor || "white"}}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
