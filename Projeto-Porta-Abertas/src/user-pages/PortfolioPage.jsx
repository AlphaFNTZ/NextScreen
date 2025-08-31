import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Instagram } from "lucide-react";
import {
	SiJavascript,
	SiReact,
	SiNodedotjs,
	SiPython,
	SiMongodb,
	SiPostgresql,
	SiDocker,
	SiAmazon,
} from "react-icons/si";
//
//
//
//
//
//
//
export const pageMeta = {
	// Defina o seu nome
	title: "Juliano C. F. Ramos",
	// Defina o seu primeiro nome
	authorName: "Juliano",
	// Defina o ícone da página
	icon: "👨‍💻",
	// Defina um pequeno texto de apresentação
	text: "Desenvolvedor Full Stack apaixonado por criar soluções web e mobile modernas.",
	// Defina o seu nickname do GitHub
	github: "AlphaFNTZ",
	// Defina o seu @ do Instagram
	instagram: "cesarx_0",
	// Defina a animação desejada [fade-in; slide-up; bounce]
	animation: "bounce",
	// Defina o tipo de fundo da página [gradient; color]
	backgroundType: "color",
	// Defina o valor do fundo da página [#3f215d; linear-gradient(135deg, #667eea 0%, #764ba2 100%)]
	backgroundValue: "#3f215d",
	// Defina a cor do titulo [#ffffff]
	primaryColor: "#ffffff",
	// Defina as suas habilidades [JavaScript; React; Node.js; Python; MongoDB; PostgreSQL; Docker; AWS]
	skills: ["JavaScript", "React", "Node.js"],
	createdAt: "23:45",
	template: "PortfolioPage",
};
//
//
//
//
//
//
//
const PortfolioPage = () => {
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShowContent(true), 300);
		return () => clearTimeout(timer);
	}, []);

	const iconsMap = {
		JavaScript: <SiJavascript />,
		React: <SiReact />,
		"Node.js": <SiNodedotjs />,
		Python: <SiPython />,
		MongoDB: <SiMongodb />,
		PostgreSQL: <SiPostgresql />,
		Docker: <SiDocker />,
		AWS: <SiAmazon />,
	};

	const getAnimationVariants = () => {
		switch (pageMeta.animation) {
			case "fade-in":
				return {
					hidden: { opacity: 0 },
					visible: { opacity: 1, transition: { duration: 1 } },
				};
			case "slide-up":
				return {
					hidden: { opacity: 0, y: 200 },
					visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
				};
			case "bounce":
				return {
					hidden: { opacity: 0, scale: 0.8 },
					visible: {
						opacity: 1,
						scale: 1,
						transition: { duration: 0.6, type: "spring", bounce: 0.4 },
					},
				};
			default:
				return {
					hidden: { opacity: 0 },
					visible: { opacity: 1, transition: { duration: 1 } },
				};
		}
	};

	const backgroundStyle =
		pageMeta.backgroundType === "gradient"
			? { background: pageMeta.backgroundValue }
			: { backgroundColor: pageMeta.backgroundValue };

	return (
		<div
			className="min-h-screen w-full flex flex-col relative overflow-hidden"
			style={backgroundStyle}>
			<div className="flex flex-col justify-center items-center h-screen mx-auto px-4 sm:px-6 py-8 sm:py-12">
				{/* Header */}
				<motion.div
					variants={getAnimationVariants()}
					initial="hidden"
					animate={showContent ? "visible" : "hidden"}
					className="text-center mb-5">
					<div className="w-24 h-24 sm:w-32 sm:h-32 bg-purple-800 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center text-5xl sm:text-6xl overflow-hidden">
						<img
							src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${pageMeta.authorName}`}
							className="w-full h-full object-cover"
							alt="avatar"
						/>
					</div>
					<h1
						className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4"
						style={{ color: pageMeta.primaryColor }}>
						{pageMeta.title}
					</h1>
					<p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-xs sm:max-w-md text-center">
						{pageMeta.text}
					</p>

					{/* Social Links */}
					<div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
						<motion.a
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							href={`https://github.com/${pageMeta.github}`}
							className="p-2 sm:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
							<Github className="w-5 h-5 sm:w-6 sm:h-6" />
						</motion.a>
						<motion.a
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							href={`https://www.instagram.com/${pageMeta.instagram}`}
							className="p-2 sm:p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
							<Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
						</motion.a>
					</div>
				</motion.div>

				{/* Skills Section */}
				<motion.div className="mt-10 sm:mt-20 text-center">
					<h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
						Habilidades
					</h2>
					<div className="flex flex-wrap justify-center gap-4 sm:gap-6">
						{pageMeta.skills.map((skillName, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
								className="p-3 sm:p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl"
								title={skillName}>
								{iconsMap[skillName] || skillName}
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default PortfolioPage;
