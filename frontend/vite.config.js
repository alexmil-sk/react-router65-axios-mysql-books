import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		watch: {
			usePolling: true //отвечает за рендер в браузере изменений в режиме dev
		},
		host: true,
		strictPort: true,
		port: 3000
	}
})
