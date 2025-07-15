import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'game-dark': '#0F172A',
                'game-dark-light': '#1E293B',
                'game-purple': '#8B5CF6',
                'board-light': '#D8BF86',
                'board-dark': '#334155',
                'piece-white': '#FFFFFF',
                'piece-black': '#1E293B',
                'sidebar-bg': 'rgba(30, 41, 59, 0.95)',
                'hover-bg': 'rgba(51, 65, 85, 0.3)',
            },
            boxShadow: {
                'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
            },
            keyframes: {
                'board-fade': {
                    'from': { opacity: '0', transform: 'scale(0.95)' },
                    'to': { opacity: '1', transform: 'scale(1)' }
                }
            },
            animation: {
                'board-fade': 'board-fade 0.6s ease-out'
            }
        },
    },
    plugins: [],
}

export default config