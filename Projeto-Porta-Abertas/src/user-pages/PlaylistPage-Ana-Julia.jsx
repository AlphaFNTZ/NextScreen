import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clapperboard, User, Film } from "lucide-react";
//
//
//
//
//
//
//
export const pageMeta = {
	// Título da cena ou do filme
	title: "Elementos",
	// Uma linha de diálogo ou descrição da cena
	text: "Eu achei o filme muito legal, pois fala sobre uma paixão entre a água e o fogo.",
	// Palavra-chave para o VÍDEO de fundo
	videoQuery: "florest",
	// Nome do "diretor" (o usuário)
	authorName: "Ana Julia",
	// Gênero do filme para dar um toque extra
	genre: "Desenho",
	// Cor principal para detalhes e legendas
	primaryColor: "#58a00a", // Um azul elétrico
	// Fundo da página (será sobreposto pelo vídeo)
	backgroundColor: "#000000",
	createdAt: "13:06",
	template: "PlaylistPage",
};
//
//
//
//
//
//
//

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const MovieScenePage = () => {
	const [videoUrl, setVideoUrl] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadVideo = async () => {
			// 1. Crie uma chave de cache única para a busca de vídeo.
			const cacheKey = `pexels_video_${pageMeta.videoQuery}`;

			try {
				// 2. Verifique se a URL do vídeo já está no localStorage.
				const cachedVideoUrl = localStorage.getItem(cacheKey);

				if (cachedVideoUrl) {
					// 3. CACHE HIT: Se encontrou, use o vídeo do cache.
					console.log("Vídeo carregado do cache!");
					setVideoUrl(cachedVideoUrl);
					setIsLoading(false);
					return; // Encerra a função, sem chamar a API.
				}

				// 4. CACHE MISS: Se não, busque na API da Pexels.
				console.log("Cache miss. Buscando vídeo na API da Pexels...");
				const response = await fetch(
					`https://api.pexels.com/videos/search?query=${pageMeta.videoQuery}&per_page=1&orientation=landscape`,
					{
						headers: {
							Authorization: PEXELS_API_KEY,
						},
					}
				);

				if (!response.ok) {
					throw new Error(`Erro na API da Pexels: ${response.statusText}`);
				}

				const data = await response.json();

				if (data.videos && data.videos.length > 0) {
					const videoFile =
						data.videos[0].video_files.find((f) => f.quality === "hd") ||
						data.videos[0].video_files[0];

					const newVideoUrl = videoFile.link;
					setVideoUrl(newVideoUrl);

					// 5. SALVAR NO CACHE: Guarde a nova URL no localStorage.
					localStorage.setItem(cacheKey, newVideoUrl);
					console.log("Vídeo salvo no cache.");
				} else {
					console.warn("Pexels não retornou um vídeo para a busca.");
				}
			} catch (error) {
				console.error(error);
				// Lógica de fallback aqui
			} finally {
				setIsLoading(false);
			}
		};

		if (PEXELS_API_KEY) {
			loadVideo();
		} else {
			console.error("Chave da API da Pexels não encontrada.");
			setIsLoading(false);
		}
	}, []);

	if (isLoading) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center bg-black">
				<p className="text-white animate-pulse">Cena em preparação...</p>
			</div>
		);
	}

	return (
		<div
			className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden"
			style={{ backgroundColor: pageMeta.backgroundColor }}>
			{/* Vídeo de Fundo */}
			{videoUrl && (
				<video
					key={videoUrl}
					className="absolute top-0 left-0 w-full h-full object-cover z-0"
					src={videoUrl}
					autoPlay
					loop
					muted
					playsInline
					disablePictureInPicture
					controls={false}
				/>
			)}

			{/* Overlay escuro para garantir a legibilidade */}
			<div className="absolute top-0 left-0 w-full h-full bg-black/60 sm:bg-black/50 z-10" />

			{/* Conteúdo da Cena */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1.5 }}
				className="relative z-20 w-full max-w-xl sm:max-w-2xl md:max-w-3xl text-center space-y-4 sm:space-y-6 text-white px-2">
				<div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm uppercase tracking-widest text-white/70">
					<Film className="w-3 h-3 sm:w-4 sm:h-4" />
					<span>{pageMeta.genre}</span>
				</div>

				<h1
					className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif font-bold"
					style={{ color: pageMeta.primaryColor }}>
					{pageMeta.title}
				</h1>

				<p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-2">
					"{pageMeta.text}"
				</p>

				<div className="border-t border-white/20 w-1/2 sm:w-1/4 mx-auto my-2 sm:my-4" />

				<div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-white/80">
					<Clapperboard className="w-4 h-4 sm:w-5 sm:h-5" />
					<span>
						Dirigido por <strong>{pageMeta.authorName}</strong>
					</span>
				</div>
			</motion.div>
		</div>
	);
};

export default MovieScenePage;
