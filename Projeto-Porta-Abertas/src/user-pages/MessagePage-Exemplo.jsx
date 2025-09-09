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
	// Defina o titulo da pagina
	title: "Sussurros da Natureza",
	// Defina o seu primeiro nome
	authorName: "Julio Cesar",
	// Defina o ÍCONE (pode ser um emoji ou um componente de ícone)
	icon: "🍀",
	// Defina o texto da pagina
	text: "A natureza fala em silêncio. O farfalhar das folhas, o canto dos pássaros e o fluxo dos rios nos lembram de um equilíbrio mais antigo que a própria humanidade. Conectar-se à natureza é reconectar-se com a nossa essência.",
	// Defina a animação desejada
	animation: "slide-up",
	// Defina o tipo de fundo da pagina
	backgroundType: "gradient",
	// Defina o valor do fundo da página
	backgroundValue:
		"linear-gradient(135deg, #355c7d 0%, #6c5b7b 50%, #c06c84 100%)",
	// Defina a cor do titulo
	primaryColor: "#ffffff",
	// Defina a horas em que foi criada a sua pagina
	createdAt: "10:20",
	template: "MessagePage",
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

	// Efeito para mostrar o conteúdo após um pequeno atraso
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowContent(true);
		}, 300); // Um pequeno delay para a animação iniciar
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
					hidden: { opacity: 0, y: 200 },
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

	const TypewriterText = ({ text, speed = 50 }) => {
		const [displayText, setDisplayText] = useState("");
		const [index, setIndex] = useState(0);
		const [showCursor, setShowCursor] = useState(true);

		useEffect(() => {
			if (!showContent) return;
			if (index >= text.length) {
				const timer = setTimeout(() => setShowCursor(false), 500);
				return () => clearTimeout(timer);
			}

			const timer = setTimeout(() => {
				setDisplayText((prev) => prev + text[index]);
				setIndex((prev) => prev + 1);
			}, speed + Math.random() * 50);

			return () => clearTimeout(timer);
		}, [index, text, showContent, speed]);

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
			className="min-h-screen w-full flex flex-col relative overflow-hidden p-4 sm:p-8"
			style={backgroundStyle}>
			{/* Conteúdo principal */}
			<div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 text-center">
				<motion.div
					variants={getAnimationVariants()}
					initial="hidden"
					animate={showContent ? "visible" : "hidden"}
					className="max-w-4xl w-full mx-auto space-y-8">
					{/* Ícone */}
					<motion.div
						className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}>
						{/* Container do ícone */}
						<div className="w-full h-36 sm:h-40 md:h-48 lg:h-56 rounded-2xl flex items-center justify-center">
							<div className="text-white text-7xl sm:text-8xl md:text-9xl">
								{pageMeta.icon}
							</div>
						</div>
					</motion.div>
					{/* Título */}
					<motion.h1
						className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6"
						style={{ color: pageMeta.primaryColor }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}>
						{pageMeta.title}
					</motion.h1>
					{/* Texto principal */}
					<motion.div
						className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-full sm:max-w-2xl md:max-w-3xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}>
						{pageMeta.animation === "typewriter" ? (
							<TypewriterText text={pageMeta.text} speed={50} />
						) : (
							pageMeta.text
						)}
					</motion.div>
					{/* Informações do autor */}
					<motion.div
						className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-white/70 text-sm sm:text-base mt-8 sm:mt-12"
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

			{/* Efeitos visuais de fundo (opcional, mantido) */}
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-2 h-2 rounded-full opacity-30"
						style={{ backgroundColor: pageMeta.primaryColor }}
						initial={{
							x:
								Math.random() *
								(typeof window !== "undefined" ? window.innerWidth : 0),
							y:
								Math.random() *
								(typeof window !== "undefined" ? window.innerHeight : 0),
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
