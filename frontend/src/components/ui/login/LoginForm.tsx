import { Form } from "react-router-dom";
import { Button } from "../Button";
import { Input } from "../Input";
import { FC, HTMLProps } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost:3001";

export const FormSection: FC<HTMLProps<HTMLDivElement>> = ({ children, ...props }) => {
	return (
		<section className="space-y-2" {...props}>
			{children}
		</section>
	);
};

export const FormLabel: FC<HTMLProps<HTMLLabelElement>> = ({ children, ...props }) => {
	return (
		<label className="text-sm font-medium text-white" {...props}>
			{children}
		</label>
	);
};

export function LoginForm() {
	return (
		<Form method="POST" action={`${API_URL}/login`} className="flex flex-col gap-4">
			<FormSection>
				<FormLabel htmlFor="email">Your email</FormLabel>
				<Input type="email" name="email" id="email" placeholder="your-email@email.com" required />
			</FormSection>
			<FormSection>
				<FormLabel htmlFor="email">Your email</FormLabel>
				<Input type="password" name="password" id="password" placeholder="••••••••" required />
			</FormSection>

			<Button type="submit" variant="secondary" size="large">
				Sign in
			</Button>

			<p className="text-white">
				Don't have an account yet?{" "}
				<a href="register" className="font-bold">
					Sign up
				</a>
			</p>
		</Form>
	);
}
