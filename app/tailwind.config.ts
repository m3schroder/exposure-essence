import { type Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
	content: ['./src/**/*.{js,jsx,mdx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		fontSize: {
			xs: ['0.75rem', { lineHeight: '1rem' }],
			sm: ['0.875rem', { lineHeight: '1.5rem' }],
			base: ['1rem', { lineHeight: '1.75rem' }],
			lg: ['1.125rem', { lineHeight: '1.75rem' }],
			xl: ['1.25rem', { lineHeight: '2rem' }],
			'2xl': ['1.5rem', { lineHeight: '2.25rem' }],
			'3xl': ['1.75rem', { lineHeight: '2.25rem' }],
			'4xl': ['2rem', { lineHeight: '2.5rem' }],
			'5xl': ['2.5rem', { lineHeight: '4rem' }],
			'6xl': ['3rem', { lineHeight: '3.5rem' }],
			'7xl': ['5rem', { lineHeight: '5.5rem' }],
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'4xl': '2.5rem',
			},
			borderWidth: {
				1: '1px'
			},
			fontFamily: {
				helvetica: ['Helvetica', 'Arial', 'sans']
			},
		},
	},
	plugins: [tailwindcssAnimate]
} satisfies Config
