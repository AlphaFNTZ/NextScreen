import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { Button } from "./ui/button";

const PageViewer = ({ page, onBack }) => {
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		// Delay para mostrar o conteúdo com animação
		const timer = setTimeout(() => {
			setShowContent(true);
		}, 300);

		return () => clearTimeout(timer);
	}, []);

	const getAnimationVariants = () => {
		switch (page.animation) {
			case "fade-in":
				return {
					hidden: { opacity: 0 },
					visible: { opacity: 1, transition: { duration: 1 } },
				};
			case "slide-up":
				return {
					hidden: { opacity: 0, y: 50 },
					visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
				};
			case "bounce":
				return {
					hidden: { opacity: 0, scale: 0.8 },
					visible: {
						opacity: 1,
						scale: 1,
						transition: {
							duration: 0.6,
							type: "spring",
							bounce: 0.4,
						},
					},
				};
			case "typewriter":
				return {
					hidden: { opacity: 0 },
					visible: { opacity: 1, transition: { duration: 0.5 } },
				};
			default:
				return {
					hidden: { opacity: 0 },
					visible: { opacity: 1, transition: { duration: 1 } },
				};
		}
	};

	const TypewriterText = ({ text, delay = 0 }) => {
		const [displayText, setDisplayText] = useState("");
		const [currentIndex, setCurrentIndex] = useState(0);

		useEffect(() => {
			if (showContent && currentIndex < text.length) {
				const timer = setTimeout(() => {
					setDisplayText((prev) => prev + text[currentIndex]);
					setCurrentIndex((prev) => prev + 1);
				}, 50 + delay);

				return () => clearTimeout(timer);
			}
		}, [currentIndex, text, showContent, delay]);

		return <span>{displayText}</span>;
	};

	const backgroundStyle =
		page.backgroundType === "gradient"
			? { background: page.backgroundValue }
			: { backgroundColor: page.backgroundValue };

	return (
		<div
			className="min-h-screen w-full flex flex-col relative overflow-hidden"
			style={backgroundStyle}>
			{/* Conteúdo principal */}
			<div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
				<motion.div
					variants={getAnimationVariants()}
					initial="hidden"
					animate={showContent ? "visible" : "hidden"}
					className="max-w-4xl mx-auto space-y-8">
					{/* Ícone */}
					<motion.div
						className="text-8xl md:text-9xl mb-6"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}>
						{page.icon}
					</motion.div>

					{/* Título */}
					<motion.h1
						className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
						style={{ color: page.primaryColor }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}>
						{page.animation === "typewriter" ? (
							<TypewriterText text={page.title} delay={500} />
						) : (
							page.title
						)}
					</motion.h1>

					{/* Texto principal */}
					<motion.div
						className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-3xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}>
						{page.animation === "typewriter" ? (
							<TypewriterText
								text={page.text}
								delay={page.title.length * 50 + 1000}
							/>
						) : (
							page.text
						)}
					</motion.div>

					{/* Informações do autor */}
					<motion.div
						className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/70 text-lg mt-12"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1 }}>
						<div className="flex items-center gap-2">
							<User className="w-5 h-5" />
							<span>{page.authorName}</span>
						</div>
						<div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
						<div className="flex items-center gap-2">
							<Calendar className="w-5 h-5" />
							<span>
								{new Date(page.createdAt).toLocaleDateString("pt-BR")}
							</span>
						</div>
					</motion.div>
				</motion.div>
			</div>

			{/* Efeitos visuais de fundo */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Partículas flutuantes */}
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-2 h-2 rounded-full opacity-30"
						style={{ backgroundColor: page.primaryColor }}
						initial={{
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight,
							scale: 0,
						}}
						animate={{
							y: [null, -20, 20, -10, 0],
							scale: [0, 1, 0.8, 1.2, 1],
							opacity: [0, 0.6, 0.3, 0.8, 0.4],
						}}
						transition={{
							duration: 4 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default PageViewer;
