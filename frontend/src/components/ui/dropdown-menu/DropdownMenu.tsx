import type { 
  ComponentPropsWithoutRef, 
  ReactNode 
} from "react";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

type RootProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Root
> & {
  children: ReactNode;
};

type TriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Trigger
>;

type ContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

export const DropdownMenu = ({ 
  children,
  ...props 
}: RootProps) => {
  return (
    <DropdownMenuPrimitive.Root {...props}>
      {children}
    </DropdownMenuPrimitive.Root>
  );
};

export const DropdownMenuTrigger = ({
  children,
  ...props
}: TriggerProps) => {
  return (
    <DropdownMenuPrimitive.Trigger
      asChild
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
};

export const DropdownMenuContent = ({
  children,
  ...props
}: ContentProps) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content {...props}>
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};