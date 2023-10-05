import { Router, Request, Response } from "express";

const router = Router();

const users = [
	{ id: 1, name: "monteiroF14" },
	{ id: 2, name: "bluueem" },
];

router.get("/", (req: Request, res: Response) => {
	res.json(users);
});

router.get("/:id", (req: Request, res: Response) => {
	const userId = parseInt(req.params.id, 10);
	const user = users.find((u) => u.id === userId);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	res.json(user);
});

router.post("/", (req: Request, res: Response) => {
	const newUser = req.body;
	users.push(newUser);
	res.status(201).json(newUser);
});

router.put("/:id", (req: Request, res: Response) => {
	const userId = parseInt(req.params.id, 10);
	const updatedUser = req.body;

	const userIndex = users.findIndex((u) => u.id === userId);

	if (userIndex === -1) {
		return res.status(404).json({ message: "User not found" });
	}

	users[userIndex] = { ...users[userIndex], ...updatedUser };

	res.json(users[userIndex]);
});

router.delete("/:id", (req: Request, res: Response) => {
	const userId = parseInt(req.params.id, 10);

	const userIndex = users.findIndex((u) => u.id === userId);

	if (userIndex === -1) {
		return res.status(404).json({ message: "User not found" });
	}

	const deletedUser = users.splice(userIndex, 1)[0];

	res.json(deletedUser);
});

export { router as userRouter };
