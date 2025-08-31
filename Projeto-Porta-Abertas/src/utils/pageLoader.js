export const loadUserPages = () => {
	// 1. Carrega todos os módulos da pasta 'user-pages' de forma síncrona.
	const modules = import.meta.glob("../user-pages/*.jsx", { eager: true });

	const pages = [];

	// 2. Itera sobre cada módulo carregado.
	Object.entries(modules).forEach(([path, module]) => {
		// Extrai o nome do arquivo sem a extensão (ex: "MessagePage").
		const fileName = path.split("/").pop().replace(".jsx", "");

		// Pega o objeto pageMeta do módulo. Se não existir, usa um objeto vazio.
		const meta = module.pageMeta || {};

		// 3. Constrói o objeto de página final.
		const page = {
			// ==================================================================
			// A CORREÇÃO PRINCIPAL ESTÁ AQUI
			// Copia TODAS as propriedades do pageMeta para o objeto page.
			// Isso garante que 'template', 'songTitle', 'sceneTitle', etc., sejam incluídos.
			...meta,
			// ==================================================================

			// 4. Define valores padrão (fallbacks) para propriedades essenciais,
			// caso elas não estejam definidas no pageMeta.
			id: fileName.toLowerCase(),
			component: module.default,
			fileName: fileName,

			// Se o meta não tiver um 'title', 'songTitle', etc., cria um a partir do nome do arquivo.
			title:
				meta.title ||
				meta.songTitle ||
				meta.sceneTitle ||
				fileName.replace(/([A-Z])/g, " $1").trim(),

			// Fallbacks para as outras propriedades, como você já tinha.
			createdAt: meta.createdAt || "00:00",
			authorName: meta.authorName || "Desenvolvedor",
			icon: meta.icon || "🎨",
			text:
				meta.text ||
				meta.quote ||
				meta.dialogue ||
				`Página personalizada criada no VSCode.`,
			backgroundType: meta.backgroundType || "gradient",
			backgroundValue:
				meta.backgroundValue ||
				"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
			primaryColor: meta.primaryColor || "#ffffff",
			animation: meta.animation || "fade-in",

			// Garante que a propriedade 'template' exista, usando o nome do arquivo como fallback.
			template: meta.template || fileName,
		};

		pages.push(page);
	});

	return pages;
};
