import { motion } from "framer-motion";

const Footer = () => {
	return (
		<footer>
			<motion.h4
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", duration: 0.4 }}
				className="mt-4 text-xl font-semibold text-black mx-auto w-max p-2 drop-shadow"
			>
				Made with 💙 by{" "}
				<motion.a
					whileHover={{ scale: 1.1 }}
					href="https://github.com/RotrixLOL"
					target="_blank"
					rel="noreferrer noopener"
					className="text-blue-500"
				>
					RotrixX
				</motion.a>
			</motion.h4>
		</footer>
	);
};

export default Footer;
