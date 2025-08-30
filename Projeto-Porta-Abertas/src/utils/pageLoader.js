export const loadUserPages = () => {
	const modules = import.meta.glob("../user-pages/*.jsx", { eager: true });

	const pages = [];

	Object.entries(modules).forEach(([path, module]) => {
		const fileName = path.split("/").pop().replace(".jsx", "");

		const meta = module.pageMeta || {};
		const page = {
			id: fileName.toLowerCase(),
			title: meta.title || fileName.replace(/([A-Z])/g, " $1").trim(),
			component: module.default,
			fileName: fileName,
			createdAt: meta.createdAt || new Date().toISOString(),
			authorName: meta.authorName || "Desenvolvedor",
			icon: meta.icon || "🎨",
			text: meta.text || `Página personalizada criada no VSCode: ${fileName}`,
			backgroundType: meta.backgroundType || "gradient",
			backgroundValue:
				meta.backgroundValue ||
				"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
			primaryColor: meta.primaryColor || "#ffffff",
			animation: meta.animation || "fade-in",
		};

		pages.push(page);
	});

	return pages;
};
