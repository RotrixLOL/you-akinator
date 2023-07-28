import { motion } from "framer-motion";

const ChatMessage = ({ msg, isMe }) => {
	const aiStyles = "bg-blue-500";
	const meStyles = "bg-gray-900";

	return (
		<motion.div
			initial={{ x: isMe ? "100vw" : "-100vw" }}
			animate={{ x: 0 }}
			transition={{ type: "spring", stiffness: 70, duration: 0.2 }}
			className={`text-white rounded-lg p-2 max-w-lg ${
				isMe ? meStyles : aiStyles
			}`}
		>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ type: "tween", ease: "easeIn" }}
			>
				{msg}
			</motion.p>
		</motion.div>
	);
};

export default ChatMessage;
