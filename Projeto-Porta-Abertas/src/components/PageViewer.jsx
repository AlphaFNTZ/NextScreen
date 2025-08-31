import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PageViewer = ({ page, onBack }) => {
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowContent(true);
		}, 300);
		return () => clearTimeout(timer);
	}, []);

	if (page.component) {
		const PageComponent = page.component;
		return (
			<div className="min-h-screen w-full relative">
				{/* Renderizar o componente da página */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}>
					<PageComponent />
				</motion.div>
			</div>
		);
	}
};

export default PageViewer;
