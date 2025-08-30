import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";

// https://vite.dev/config/
export default defineConfig({
	base: "/NextScreen/",
	plugins: [react(), tailwindcss(), jsxLocPlugin()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		host: "0.0.0.0",
		port: 5173,
	},
});
