
import { RegisterForm } from "../components/Register/RegisterForm";
import { Heading } from "../components/ui/Heading";

export function Register() {
	return (
		<section className="bg-zinc-50 dark:bg-zinc-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-zinc-800 dark:border-zinc-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<Heading level="main" variant="medium" className="text-red-500" centered>
							Sign up to lysis
						</Heading>
						<RegisterForm />
					</div>
				</div>
			</div>
		</section>
	);
}


