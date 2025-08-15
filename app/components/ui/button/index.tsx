import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/app/lib/utils/cn/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-primary-gradient text-[hsl(var(--primary-foreground))] hover:brightness-110",
        colorOutline: "", // custom handled via className below
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

interface AddButtonProps extends ButtonProps {
  color?: "blue" | "emerald" | "purple" | "primary";
}

const AddButton = React.forwardRef<HTMLButtonElement, AddButtonProps>(
  ({ color = "blue", className, ...props }, ref) => {
    const colors = {
      blue: {
        border: "border-blue-300 dark:border-blue-700",
        text: "text-blue-600 dark:text-blue-400",
        hoverBg: "hover:bg-blue-100/20 dark:hover:bg-blue-900/20",
        hoverBorder: "hover:border-blue-400 dark:hover:border-blue-500",
        hoverText: "hover:text-blue-700 dark:hover:text-blue-300",
      },
      emerald: {
        border: "border-emerald-300 dark:border-emerald-700",
        text: "text-emerald-600 dark:text-emerald-400",
        hoverBg: "hover:bg-emerald-100/20 dark:hover:bg-emerald-900/20",
        hoverBorder: "hover:border-emerald-400 dark:hover:border-emerald-500",
        hoverText: "hover:text-emerald-700 dark:hover:text-emerald-300",
      },
      purple: {
        border: "border-purple-300 dark:border-purple-700",
        text: "text-purple-600 dark:text-purple-400",
        hoverBg: "hover:bg-purple-100/20 dark:hover:bg-purple-900/20",
        hoverBorder: "hover:border-purple-400 dark:hover:border-purple-500",
        hoverText: "hover:text-purple-700 dark:hover:text-purple-300",
      },
      primary: {
        border: "border-primary dark:border-primary",
        text: "text-primary dark:text-primary",
        hoverBg: "hover:bg-primary/20 dark:hover:bg-primary/20",
        hoverBorder: "hover:border-primary dark:hover:border-primary",
        hoverText: "hover:text-primary dark:hover:text-primary",
      },
    };

    const c = colors[color];

    return (
      <Button
        variant="colorOutline"
        className={cn(
          "w-full border-dashed border-2 transition-colors duration-200",
          c.border,
          c.text,
          c.hoverBg,
          c.hoverBorder,
          c.hoverText,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
AddButton.displayName = "AddButton";

export { Button, AddButton, buttonVariants };
