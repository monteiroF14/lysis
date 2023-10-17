import { Button } from "./Button";

export const LoginButton = () => {
	const signIn = () => {};

	return <Button onClick={() => signIn()}>Sign in</Button>;
};

export const LogoutButton = () => {
	const signOut = () => {};

	return <Button onClick={() => signOut()}>Sign Out</Button>;
};
