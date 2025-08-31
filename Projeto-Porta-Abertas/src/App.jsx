import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageGallery from "./components/PageGallery";
import PageViewer from "./components/PageViewer";
import { loadUserPages } from "./utils/pageLoader";
import { Button } from "./components/ui/button";
import { Sparkles, Home, Plus, Grid3X3, ArrowLeft } from "lucide-react";
import "./style/GlobalStyle.css";
import Logo from "./assets/logo_empresa.png";

function App() {
	const [pages, setPages] = useState([]);
	const [currentView, setCurrentView] = useState("home");
	const [selectedPage, setSelectedPage] = useState(null);

	useEffect(() => {
		const userPages = loadUserPages();
		setPages(userPages);
	}, []);

	const handleViewPage = (page) => {
		setSelectedPage(page);
		setCurrentView("view");
	};

	const handleBackToGallery = () => {
		setSelectedPage(null);
		setCurrentView("gallery");
	};

	const handleBackToHome = () => {
		setCurrentView("home");
	};

	const HomeView = () => (
		<motion.div
			className="absolute inset-0 h-screen w-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col"
			animate={{
				background: [
					"linear-gradient(135deg, #34025c, #36204d)",
					"linear-gradient(135deg, #650a89, #250a3f)",
					"linear-gradient(135deg, #632775, #6615b3)",
				],
			}}
			transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}>
			{/* Header */}
			<header className="p-6">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex items-center gap-3">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-800 rounded-lg flex items-center justify-center">
							<img src={Logo} alt="Logo" className="w-7 h-7 sm:w-9 sm:h-9" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-white">Emakers Jr.</h1>
							<p className="text-gray-300 text-sm">Soluções digitais</p>
						</div>
					</motion.div>
				</div>
			</header>

			{/* Hero Section */}
			<main className="flex-1 flex items-center justify-center p-6">
				<div className="max-w-4xl mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="space-y-8">
						{/* Logo/Icon principal */}
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
							className="text-8xl mb-8"></motion.div>

						{/* Título principal */}
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
							className="font-['Montserrat'] text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold text-white mb-6">
							Veja a sua
							<span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
								{" "}
								Minipágina
							</span>
						</motion.h1>

						{/* Subtítulo */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8 }}
							className="text-base sm:text-lg md:text-2xl text-gray-300 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
							Dê vida às suas ideias e mostre sua criatividade no mundo digital.
							Personalize cores, textos, animações e construa uma página única
							que represente você, com o apoio da nossa equipe.
						</motion.p>

						{/* Estatísticas */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1 }}
							className="flex flex-row items-center justify-center gap-6 sm:gap-8 text-center mt-12">
							<div className="flex items-center gap-3">
								<div className="hidden sm:flex w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
									<Grid3X3 className="w-6 h-6 text-purple-400" />
								</div>
								<div>
									<div className="text-2xl font-bold text-white">
										{pages.length}
									</div>
									<div className="text-gray-300 text-sm">Páginas Criadas</div>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className=" hidden sm:flex w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center">
									<Sparkles className="w-6 h-6 text-orange-400" />
								</div>
								<div>
									<div className="text-2xl font-bold text-white">∞</div>
									<div className="text-gray-300 text-sm">Possibilidades</div>
								</div>
							</div>
						</motion.div>

						{/* Botões de ação */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2 }}
							className="flex flex-row gap-4 justify-center mt-12">
							{pages.length > 0 && (
								<Button
									onClick={() => setCurrentView("gallery")}
									size="lg"
									variant="outline"
									className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 px-8 py-4 text-lg cursor-pointer">
									<Grid3X3 className="w-5 h-5 mr-2" />
									Ver Galeria ({pages.length})
								</Button>
							)}
						</motion.div>
					</motion.div>
				</div>
			</main>

			{/* Footer */}
			<footer className="p-4 sm:p-6 text-center text-xs sm:text-sm">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.4 }}
					className="text-gray-500 text-sm">
					Feito com ❤️ pela{" "}
					<span className="text-gray-300 font-semibold">Emakers Jr.</span>
				</motion.div>
			</footer>

			{/* Efeitos de fundo */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(30)].map((_, i) => {
					const size = Math.floor(Math.random() * 6) + 4; // tamanho 4px a 10px
					const startX = Math.random() * window.innerWidth;
					const delay = Math.random() * 5;
					const duration = 6 + Math.random() * 4;
					const color = "#932ae9";

					return (
						<motion.div
							key={i}
							className="absolute rounded-sm"
							style={{
								width: size,
								height: size,
								left: startX,
								backgroundColor: color,
							}}
							initial={{ y: -20, opacity: 0 }}
							animate={{
								y: [-20, window.innerHeight + 20],
								rotate: [0, 360],
								opacity: [0, 1, 1, 0],
							}}
							transition={{
								duration,
								delay,
								repeat: Infinity,
								ease: "linear",
							}}
						/>
					);
				})}
			</div>
		</motion.div>
	);

	const Navigation = () => (
		<div className="fixed top-4 left-4 z-50">
			<div className="flex gap-2">
				{currentView !== "home" && currentView !== "view" && (
					<Button
						onClick={handleBackToHome}
						variant="outline"
						size="sm"
						className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm cursor-pointer">
						<Home className="w-4 h-4 mr-2" />
						Início
					</Button>
				)}

				{currentView === "view" && (
					<Button
						onClick={handleBackToGallery}
						variant="outline"
						size="sm"
						className="bg-black/20 border-white/20 text-white hover:bg-black/40 backdrop-blur-sm cursor-pointer">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Voltar
					</Button>
				)}
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-900">
			<Navigation />

			<AnimatePresence mode="wait">
				{currentView === "home" && (
					<motion.div
						key="home"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}>
						<HomeView />
					</motion.div>
				)}

				{currentView === "gallery" && (
					<motion.div
						key="gallery"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6 pt-20">
						<div className="max-w-7xl mx-auto">
							<PageGallery pages={pages} onViewPage={handleViewPage} />
						</div>
					</motion.div>
				)}

				{currentView === "view" && selectedPage && (
					<motion.div
						key="view"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 1.05 }}
						transition={{ duration: 0.3 }}>
						<PageViewer page={selectedPage} onBack={handleBackToGallery} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default App;
