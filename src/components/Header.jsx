import { motion } from "framer-motion";

const Header = () => {
	return (
		<motion.div
			initial={{ y: "-100%" }}
			animate={{ y: 0 }}
			transition={{ type: "spring", bounce: 2, stiffness: 40 }}
			className="bg-zinc-900 px-6"
		>
			<h1 className="xs:text-4xl sm:text-5xl md:text-8xl flex justify-center font-bold text-white">
				You Akinator
			</h1>
		</motion.div>
	);
};

export default Header;
