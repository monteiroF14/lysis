import { FC, HTMLProps } from "react";

type FormProps = HTMLProps<HTMLFormElement>;

export const Form: FC<FormProps> = ({ children, ...props }) => {
	return <form {...props}>{children}</form>;
};
