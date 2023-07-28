import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

import ChatMessage from "./ChatMessage";
import Input from "./Input";

import { getRandomWord } from "../services/randomWord";
import { aiRespond } from "../services/ai";

const toastOptions = {
	position: "top-right",
	className: "text-4xl mt-4 mr-4",
	success: { icon: "🔥", duration: 3000 },
};

// TODO: Have a way to finish the chat, a restart button would be good
const Chat = ({ apiKey }) => {
	const [messages, setMessages] = useState([]);
	const [randomWord, setRandomWord] = useState("");
	const chatContainerRef = useRef(null);

	useEffect(() => {
		const getWord = async () => {
			const response = await getRandomWord();
			setRandomWord(response.word);
		};
		toast.promise(
			getWord(),
			{
				loading: "Loading word...",
				success: "We have the word!",
				error: "Error while getting the word",
			},
			toastOptions,
		);
	}, []);

	useEffect(() => {
		const callAI = async (word) => {
			const res = await aiRespond(apiKey, word, messages);

			setMessages((currentMessages) => [
				...currentMessages,
				{ text: res.replace(/-?\s?ai:/gi, "").split("user:")[0], type: "ai" },
			]);
			chatContainerRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		};
		const lastMessage = messages[messages.length - 1];
		if (lastMessage && lastMessage.type === "user") {
			toast.promise(
				callAI(randomWord),
				{
					loading: "AI is thinking...",
					success: "AI responded!",
					error:
						"Error! Maybe your API key is invalid or you reached the limit.",
				},
				toastOptions,
			);
		}
	}, [messages]);

	const handleNewMessage = async (text) => {
		if (!text) return;
		setMessages((currentMessages) => [
			...currentMessages,
			{ text, type: "user" },
		]);
		chatContainerRef.current.scrollIntoView({
			behavior: "smooth",
			block: "end",
		});
	};

	return (
		<section>
			<div className="w-[60vw] mb-8 grid gap-4" ref={chatContainerRef}>
				<ChatMessage msg="Hi, I'll think a random word and you have to guess it by asking me. Good luck!" />
				{messages.map((message, i) => (
					<div
						key={i}
						className={`flex message-${
							message.type === "ai" ? "left" : "right"
						}`}
					>
						<ChatMessage msg={message.text} isMe={message.type === "user"} />
					</div>
				))}
			</div>
			<Input handleNewMessage={handleNewMessage} />
		</section>
	);
};

export default Chat;
