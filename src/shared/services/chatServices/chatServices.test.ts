import { sendMessage } from "./";
import {ISendMessage} from "../../../components/chat/interfaces";
import {useCookies} from "react-cookie";
const [cookies] = useCookies(["user-token"]);
test("the data should be delivered", async () => {
	const res = await sendMessage(cookies["user-token"], {room_id: "1", message: "2"}  as ISendMessage);
	console.log(res);
	expect(res).not.toThrow(Error);
});
