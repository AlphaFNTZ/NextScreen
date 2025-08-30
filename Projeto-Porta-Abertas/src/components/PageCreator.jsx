import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Palette, Sparkles, Save } from "lucide-react";

const PageCreator = ({ onSavePage }) => {
	const [pageData, setPageData] = useState({
		title: "",
		text: "",
		authorName: "",
		primaryColor: "#8B5CF6", // Roxo padrão
		icon: "✨",
		backgroundType: "solid",
		backgroundValue: "#1F2937", // Cinza escuro padrão
		animation: "fade-in",
	});

	const colorOptions = [
		{ name: "Roxo Emakers", value: "#8B5CF6" },
		{ name: "Laranja Emakers", value: "#F97316" },
		{ name: "Roxo Escuro", value: "#6D28D9" },
		{ name: "Laranja Escuro", value: "#EA580C" },
		{ name: "Azul", value: "#3B82F6" },
		{ name: "Verde", value: "#10B981" },
		{ name: "Rosa", value: "#EC4899" },
		{ name: "Amarelo", value: "#F59E0B" },
	];

	const backgroundOptions = [
		{ name: "Cinza Escuro", value: "#1F2937" },
		{ name: "Preto", value: "#000000" },
		{ name: "Roxo Escuro", value: "#1E1B4B" },
		{ name: "Azul Escuro", value: "#1E3A8A" },
	];

	const gradientOptions = [
		{
			name: "Roxo para Laranja",
			value: "linear-gradient(135deg, #8B5CF6 0%, #F97316 100%)",
		},
		{
			name: "Roxo para Azul",
			value: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
		},
		{
			name: "Laranja para Rosa",
			value: "linear-gradient(135deg, #F97316 0%, #EC4899 100%)",
		},
		{
			name: "Escuro para Roxo",
			value: "linear-gradient(135deg, #1F2937 0%, #8B5CF6 100%)",
		},
	];

	const iconOptions = [
		"✨",
		"🚀",
		"💡",
		"🎯",
		"⚡",
		"🔥",
		"💫",
		"🌟",
		"🎨",
		"💻",
		"🎪",
		"🎭",
	];

	const animationOptions = [
		{ name: "Fade In", value: "fade-in" },
		{ name: "Slide Up", value: "slide-up" },
		{ name: "Bounce", value: "bounce" },
		{ name: "Type Writer", value: "typewriter" },
	];

	const handleInputChange = (field, value) => {
		setPageData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSave = () => {
		if (
			!pageData.title.trim() ||
			!pageData.text.trim() ||
			!pageData.authorName.trim()
		) {
			alert("Por favor, preencha todos os campos obrigatórios!");
			return;
		}

		const newPage = {
			...pageData,
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
		};

		onSavePage(newPage);

		// Reset form
		setPageData({
			title: "",
			text: "",
			authorName: "",
			primaryColor: "#8B5CF6",
			icon: "✨",
			backgroundType: "solid",
			backgroundValue: "#1F2937",
			animation: "fade-in",
		});
	};

	return (
		<Card className="w-full max-w-2xl mx-auto bg-gray-900 border-gray-700">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-white">
					<Sparkles className="w-6 h-6 text-purple-400" />
					Criar Sua Minipágina
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Título */}
				<div className="space-y-2">
					<Label htmlFor="title" className="text-white">
						Título da Página *
					</Label>
					<Input
						id="title"
						placeholder="Ex: Minha Tela, João Silva..."
						value={pageData.title}
						onChange={(e) => handleInputChange("title", e.target.value)}
						className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
					/>
				</div>

				{/* Nome do Autor */}
				<div className="space-y-2">
					<Label htmlFor="author" className="text-white">
						Seu Nome *
					</Label>
					<Input
						id="author"
						placeholder="Como você quer ser identificado?"
						value={pageData.authorName}
						onChange={(e) => handleInputChange("authorName", e.target.value)}
						className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
					/>
				</div>

				{/* Texto */}
				<div className="space-y-2">
					<Label htmlFor="text" className="text-white">
						Texto Personalizado *
					</Label>
					<Textarea
						id="text"
						placeholder="Sua frase de impacto, visão sobre tecnologia, ou qualquer mensagem..."
						value={pageData.text}
						onChange={(e) => handleInputChange("text", e.target.value)}
						className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
					/>
				</div>

				{/* Cor Principal */}
				<div className="space-y-2">
					<Label className="text-white flex items-center gap-2">
						<Palette className="w-4 h-4" />
						Cor Principal
					</Label>
					<div className="grid grid-cols-4 gap-2">
						{colorOptions.map((color) => (
							<button
								key={color.value}
								onClick={() => handleInputChange("primaryColor", color.value)}
								className={`w-full h-10 rounded-md border-2 cursor-pointer transition-all ${
									pageData.primaryColor === color.value
										? "border-white scale-105"
										: "border-gray-600 hover:border-gray-400"
								}`}
								style={{ backgroundColor: color.value }}
								title={color.name}
							/>
						))}
					</div>
				</div>

				{/* Ícone */}
				<div className="space-y-2">
					<Label className="text-white">Ícone/Emoji</Label>
					<div className="grid grid-cols-6 gap-2">
						{iconOptions.map((icon) => (
							<button
								key={icon}
								onClick={() => handleInputChange("icon", icon)}
								className={`w-full h-10 rounded-md border-2 text-xl cursor-pointer transition-all ${
									pageData.icon === icon
										? "border-white bg-white-900/30 scale-105"
										: "border-gray-600 hover:border-gray-400 bg-gray-800"
								}`}>
								{icon}
							</button>
						))}
					</div>
				</div>

				{/* Tipo de Background */}
				<div className="space-y-2">
					<Label className="text-white">Tipo de Fundo</Label>
					<RadioGroup
						value={pageData.backgroundType}
						onValueChange={(value) =>
							handleInputChange("backgroundType", value)
						}
						className="flex gap-4">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="solid" id="solid" />
							<Label htmlFor="solid" className="text-white">
								Cor Sólida
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="gradient" id="gradient" />
							<Label htmlFor="gradient" className="text-white">
								Gradiente
							</Label>
						</div>
					</RadioGroup>
				</div>

				{/* Background Options */}
				{pageData.backgroundType === "solid" ? (
					<div className="space-y-2">
						<Label className="text-white">Cor de Fundo</Label>
						<div className="grid grid-cols-4 gap-2">
							{backgroundOptions.map((bg) => (
								<button
									key={bg.value}
									onClick={() => handleInputChange("backgroundValue", bg.value)}
									className={`w-full h-10 rounded-md border-2 cursor-pointer transition-all ${
										pageData.backgroundValue === bg.value
											? "border-white scale-105"
											: "border-gray-600 hover:border-gray-400"
									}`}
									style={{ backgroundColor: bg.value }}
									title={bg.name}
								/>
							))}
						</div>
					</div>
				) : (
					<div className="space-y-2">
						<Label className="text-white">Gradiente</Label>
						<div className="grid grid-cols-2 gap-2">
							{gradientOptions.map((gradient) => (
								<button
									key={gradient.value}
									onClick={() =>
										handleInputChange("backgroundValue", gradient.value)
									}
									className={`w-full h-10 rounded-md border-2 cursor-pointer transition-all ${
										pageData.backgroundValue === gradient.value
											? "border-white scale-102"
											: "border-gray-600 hover:border-gray-400"
									}`}
									style={{ background: gradient.value }}
									title={gradient.name}
								/>
							))}
						</div>
					</div>
				)}

				{/* Animação */}
				<div className="space-y-2">
					<Label className="text-white">Animação de Entrada</Label>
					<Select
						value={pageData.animation}
						onValueChange={(value) => handleInputChange("animation", value)}>
						<SelectTrigger className="bg-gray-800 border-gray-600 text-white cursor-pointer">
							<SelectValue />
						</SelectTrigger>
						<SelectContent className="bg-gray-800 border-gray-600">
							{animationOptions.map((anim) => (
								<SelectItem
									key={anim.value}
									value={anim.value}
									className="text-white hover:bg-purple-700">
									{anim.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Botão Salvar */}
				<Button
					onClick={handleSave}
					className="w-full bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 cursor-pointer">
					<Save className="w-4 h-4 mr-2" />
					Salvar Minipágina
				</Button>
			</CardContent>
		</Card>
	);
};

export default PageCreator;
