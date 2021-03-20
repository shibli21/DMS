import { FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  error: any;
  defaultValue?: any;
  inputProps?: InputProps;
};
export const InputField = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <FormControl id={props.name} isInvalid={props.error}>
    <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
    <Input
      type={props.type}
      name={props.name}
      defaultValue={props.defaultValue ? props.defaultValue : undefined}
      ref={ref}
      placeholder={props.placeholder}
      {...props.inputProps}
    />
    <FormErrorMessage>{props.error?.message}</FormErrorMessage>
  </FormControl>
));
