import { sendMessage } from "./";

test("the data should be delivered", async () => {
	const res = await sendMessage("token", "hello");
	console.log(res);
	expect(res).not.toThrow(Error);
});
