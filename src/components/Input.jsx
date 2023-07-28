import { useState } from "react";
import { motion } from "framer-motion";
import SendIcon from "./SendIcon";

const Input = ({ handleNewMessage }) => {
	const [newMessage, setNewMessage] = useState("");

	return (
		<motion.div
			initial={{ y: "50vh" }}
			animate={{ y: 0 }}
			transition={{ type: "spring", stiffness: 50 }}
		>
			<div className="flex flex-row gap-2">
				<input
					type="search"
					id="search"
					className="block w-full p-4 text-3xl text-white rounded-lg bg-gray-900"
					placeholder="Make a question that can be responded with 'yes' or 'no'..."
					required
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleNewMessage(newMessage);
							setNewMessage("");
						}
					}}
					tabIndex={0}
				/>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					type="button"
					className="flex bg-blue-600 rounded-lg text-white justify-center p-2"
					onClick={() => {
						handleNewMessage(newMessage);
						setNewMessage("");
					}}
				>
					Send <SendIcon />
				</motion.button>
			</div>
		</motion.div>
	);
};

export default Input;
