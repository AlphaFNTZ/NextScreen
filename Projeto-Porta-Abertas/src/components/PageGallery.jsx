import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { User, Calendar, Eye, Sparkles, Grid3X3, List } from "lucide-react";

const PageGallery = ({ pages, onViewPage, onCreateNew }) => {
	const [viewMode, setViewMode] = useState("grid"); // 'grid' ou 'list'
	const [sortBy, setSortBy] = useState("newest"); // 'newest', 'oldest', 'alphabetical'

	const sortedPages = [...pages].sort((a, b) => {
		switch (sortBy) {
			case "oldest":
				return new Date(a.createdAt) - new Date(b.createdAt);
			case "alphabetical":
				return a.title.localeCompare(b.title);
			case "newest":
			default:
				return new Date(b.createdAt) - new Date(a.createdAt);
		}
	});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	};

	const PageCard = ({ page, index }) => {
		const backgroundStyle =
			page.backgroundType === "gradient"
				? { background: page.backgroundValue }
				: { backgroundColor: page.backgroundValue };

		return (
			<motion.div
				variants={cardVariants}
				whileHover={{ scale: 1.02, y: -5 }}
				whileTap={{ scale: 0.98 }}
				className="group cursor-pointer"
				onClick={() => onViewPage(page)}>
				<Card className="overflow-hidden bg-gray-900 border-gray-700 hover:border-white transition-all duration-300 pr-2.5 pl-2.5">
					{/* Preview da página */}
					<div
						className="w-[100%] h-32 relative flex items-center justify-center self-center rounded-md"
						style={backgroundStyle}>
						<div className="text-center">
							<div className="text-3xl mb-2">{page.icon}</div>
							<div
								className="text-sm font-semibold truncate px-2"
								style={{ color: page.primaryColor }}>
								{page.title}
							</div>
						</div>

						{/* Overlay no hover */}
						<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
							<Button
								size="sm"
								className="bg-white/20 hover:bg-white/30 text-white border-white/30 cursor-pointer">
								<Eye className="w-4 h-4 mr-2" />
								Visualizar
							</Button>
						</div>
					</div>

					<CardContent className="p-4">
						<div className="space-y-3">
							{/* Título e texto preview */}
							<div>
								<h3 className="font-semibold text-white text-lg truncate">
									{page.title}
								</h3>
								<p className="text-gray-400 text-sm line-clamp-2 mt-1">
									{page.text}
								</p>
							</div>

							{/* Informações do autor e data */}
							<div className="flex items-center justify-between text-xs text-gray-500">
								<div className="flex items-center gap-1">
									<User className="w-3 h-3" />
									<span className="truncate max-w-[100px]">
										{page.authorName}
									</span>
								</div>
								<div className="flex items-center gap-1">
									<Calendar className="w-3 h-3" />
									<span>
										{new Date(page.createdAt).toLocaleDateString("pt-BR")}
									</span>
								</div>
							</div>

							{/* Tags de animação e background */}
							<div className="flex gap-2 flex-wrap">
								<Badge
									variant="secondary"
									className="text-xs bg-gray-800 text-gray-300">
									{page.animation === "fade-in" && "Fade In"}
									{page.animation === "slide-up" && "Slide Up"}
									{page.animation === "bounce" && "Bounce"}
									{page.animation === "typewriter" && "Typewriter"}
								</Badge>
								<Badge
									variant="secondary"
									className="text-xs bg-gray-800 text-gray-300">
									{page.backgroundType === "gradient"
										? "Gradiente"
										: "Cor Sólida"}
								</Badge>
							</div>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		);
	};

	if (pages.length === 0) {
		return (
			<div className="text-center py-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="max-w-md mx-auto">
					<div className="text-6xl mb-4">🎨</div>
					<h3 className="text-2xl font-bold text-white mb-2">
						Nenhuma página criada ainda
					</h3>
					<p className="text-gray-400 mb-6">
						Seja o primeiro a criar uma minipágina personalizada!
					</p>
					<Button
						onClick={onCreateNew}
						className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white">
						<Sparkles className="w-4 h-4 mr-2" />
						Criar Primeira Página
					</Button>
				</motion.div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header com controles */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h2 className="text-3xl font-bold text-white mb-2">
						Galeria de Páginas
					</h2>
					<p className="text-gray-400">
						{pages.length} página{pages.length !== 1 ? "s" : ""} criada
						{pages.length !== 1 ? "s" : ""}
					</p>
				</div>

				<div className="flex items-center gap-3">
					{/* Ordenação */}
					<select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
						className="bg-gray-800 border-gray-600 text-white rounded-md px-3 py-2 text-sm cursor-pointer">
						<option value="newest">Mais Recentes</option>
						<option value="oldest">Mais Antigas</option>
						<option value="alphabetical">Alfabética</option>
					</select>

					{/* Modo de visualização */}
					<div className="flex bg-gray-800 rounded-md p-1">
						<button
							onClick={() => setViewMode("grid")}
							className={`p-2 rounded cursor-pointer ${
								viewMode === "grid"
									? "bg-purple-600 text-white"
									: "text-gray-400 hover:text-white"
							}`}>
							<Grid3X3 className="w-4 h-4" />
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`p-2 rounded cursor-pointer ${
								viewMode === "list"
									? "bg-purple-600 text-white"
									: "text-gray-400 hover:text-white"
							}`}>
							<List className="w-4 h-4" />
						</button>
					</div>

					{/* Botão criar nova */}
					<Button
						onClick={onCreateNew}
						className="bg-purple-600 hover:bg-purple-500 text-white cursor-pointer">
						<Sparkles className="w-4 h-4 mr-2" />
						Nova Página
					</Button>
				</div>
			</div>

			{/* Grid de páginas */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className={
					viewMode === "grid"
						? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
						: "space-y-4"
				}>
				{sortedPages.map((page, index) => (
					<PageCard key={page.id} page={page} index={index} />
				))}
			</motion.div>
		</div>
	);
};

export default PageGallery;
