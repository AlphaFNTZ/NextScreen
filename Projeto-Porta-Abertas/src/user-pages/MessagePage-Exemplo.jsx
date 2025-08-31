import React, { useEffect, useState, useRef } from "react";
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
	title: "A verdadeira Capoeira",
	// Defina o seu primeiro nome
	authorName: "Julio Cesar",
	// Defina o ícone da página
	icon: "brasil",
	// Defina o texto da pagina
	text: "A capoeira é uma arte marcial brasileira, originada na cidade de Rio de Janeiro no tempo da escravidão, no seculo XXI, com o objetivo de combater o medo de ser atacado, usado como uma forma de expressão artística.",
	// Defina a animação desejada [fade-in; slide-up; bounce; typewriter]
	animation: "slide-up",
	// Defina o tipo de fundo da pagina [gradient; color]
	backgroundType: "color",
	// Defina o valor do fundo da página [#3f215d; linear-gradient(135deg, #667eea 0%, #764ba2 100%)]
	backgroundValue: "#001443",
	// Defina a cor do titulo [#ffffff]
	primaryColor: "#0022ff",
	// Defina a horas em que foi criada a sua pagina
	createdAt: "18:40",
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
	const [imageUrl, setImageUrl] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadImage = async () => {
			// 1. Crie uma chave única para o cache baseada no tema.
			const cacheKey = `unsplash_image_${pageMeta.icon}`;

			try {
				// 2. Verifique se a imagem já está no localStorage.
				const cachedImageUrl = localStorage.getItem(cacheKey);

				if (cachedImageUrl) {
					// 3. CACHE HIT: Se encontrou, use a imagem do cache e pronto!
					console.log("Imagem carregada do cache!");
					setImageUrl(cachedImageUrl);
					setIsLoading(false);
					return; // Encerra a função aqui, sem chamar a API.
				}

				// 4. CACHE MISS: Se não encontrou, continue para buscar na API.
				console.log("Cache miss. Buscando imagem na API...");
				const response = await fetch(
					`https://api.unsplash.com/photos/random?query=${pageMeta.icon}&client_id=hrW66a42K_qj8Cq7R3CaKrw5mesHDINV5pGHxkvyAkk`
				);

				if (!response.ok) {
					throw new Error(`Erro na API: ${response.statusText}`);
				}

				const data = await response.json();

				if (data && data.urls && data.urls.regular) {
					const newImageUrl = data.urls.regular;
					setImageUrl(newImageUrl);

					// 5. SALVAR NO CACHE: Guarde a nova URL no localStorage para o futuro.
					localStorage.setItem(cacheKey, newImageUrl);
					console.log("Imagem salva no cache.");
				} else {
					console.warn("API não retornou uma imagem válida.");
					// Aqui você pode definir uma imagem de fallback se quiser
				}
			} catch (error) {
				console.error("Falha ao carregar imagem:", error);
				// Lógica de fallback em caso de erro de rede
			} finally {
				// Garante que o loading termine, independentemente do resultado.
				setIsLoading(false);
			}
		};

		loadImage();
	}, [pageMeta.icon]);

	useEffect(() => {
		if (!isLoading) {
			const timer = setTimeout(() => {
				setShowContent(true);
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [isLoading]);

	if (isLoading) {
		return <div>Carregando imagem...</div>;
	}

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
			className="min-h-screen w-full flex flex-col relative overflow-hidden p-4 sm:p-8"
			style={backgroundStyle}>
			{/* Conteúdo principal */}
			<div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 text-center">
				{" "}
				{/* Ajuste no padding para mobile */}
				<motion.div
					variants={getAnimationVariants()}
					initial="hidden"
					animate={showContent ? "visible" : "hidden"}
					className="max-w-4xl w-full mx-auto space-y-8">
					{" "}
					{/* Adicionado w-full */}
					{/* Imagem (Ícone) */}
					<motion.div
						className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto" // Limita a largura máxima da imagem em telas grandes
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}>
						{/* A mágica acontece aqui! */}
						<div className="w-full h-36 sm:h-40 md:h-48 lg:h-56 bg-gray-700 rounded-2xl overflow-hidden shadow-lg">
							<img
								src={imageUrl}
								className="w-full h-full object-cover" // object-cover garante que a imagem preencha o espaço sem distorcer
								alt={`Imagem sobre ${pageMeta.icon}`}
							/>
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
							<TypewriterText
								text={pageMeta.text}
								delay={pageMeta.title.length * 80 + 300}
								speed={50}
							/>
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
