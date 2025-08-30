import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Clock } from "lucide-react";
//
//
//
//
//
//
//
export const pageMeta = {
	// Defina o autor da pagina
	authorName: "Juliano Cesar",
	// Defina o icone da pagina
	icon: "💜",
	// Defina o titulo da pagina
	title: "A Emakers Jr. é a melhor!",
	// Defina o texto da pagina
	text: "Me tornar membro dessa empresa junior me trouxe tantas oportunidades e apredizados que talvez eu nunca teria em outro lugar.",
	// Defina a animação desejada [fade-in, slide-up, bounce, typewriter]
	animation: "slide-up",
	// Defina o tipo de fundo da pagina [gradient, color]
	backgroundType: "gradient",
	// Defina o valor do fundo da pagina
	backgroundValue: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
	// Defina a cor da escrita
	primaryColor: "#ffffff",
	createdAt: "00:10",
};
//
//
//
//
//
//
//
const MessagePage = () => {
	const [showContent, setShowContent] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowContent(true);
		}, 300);
		return () => clearTimeout(timer);
	}, []);

	const getAnimationVariants = () => {
		switch (pageMeta.animation) {
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

	const TypewriterText = ({ text, delay = 0, speed = 50 }) => {
		const [displayText, setDisplayText] = useState("");
		const [index, setIndex] = useState(0);
		const [showCursor, setShowCursor] = useState(true);

		useEffect(() => {
			if (!showContent) return; // showContent do seu componente pai
			if (index >= text.length) {
				// Ao terminar, some com o cursor depois de 500ms
				const timer = setTimeout(() => setShowCursor(false), 500);
				return () => clearTimeout(timer);
			}

			const timer = setTimeout(() => {
				setDisplayText((prev) => prev + text[index]);
				setIndex((prev) => prev + 1);
			}, speed + Math.random() * 50);

			return () => clearTimeout(timer);
		}, [index, text, showContent, speed]);

		// Animação do cursor usando Framer Motion
		return (
			<span>
				{displayText}
				{showCursor && (
					<motion.span
						animate={{ opacity: [1, 0, 1] }}
						transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
						|
					</motion.span>
				)}
			</span>
		);
	};

	const backgroundStyle =
		pageMeta.backgroundType === "gradient"
			? { background: pageMeta.backgroundValue }
			: { backgroundColor: pageMeta.backgroundValue };

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
						{pageMeta.icon}
					</motion.div>

					{/* Título */}
					<motion.h1
						className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
						style={{ color: pageMeta.primaryColor }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}>
						{pageMeta.animation === "typewriter" ? (
							<TypewriterText text={pageMeta.title} delay={500} speed={80} />
						) : (
							pageMeta.title
						)}
					</motion.h1>

					{/* Texto principal */}
					<motion.div
						className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-3xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}>
						{pageMeta.animation === "typewriter" ? (
							<TypewriterText
								text={pageMeta.text}
								delay={pageMeta.title.length * 80 + 300} // sincroniza com o fim do título
								speed={50}
							/>
						) : (
							pageMeta.text
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
							<span>{pageMeta.authorName}</span>
						</div>
						<div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
						<div className="flex items-center gap-2">
							<Clock className="w-5 h-5" />
							<span>{pageMeta.createdAt}</span>
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
						style={{ backgroundColor: pageMeta.primaryColor }}
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

export default MessagePage;
