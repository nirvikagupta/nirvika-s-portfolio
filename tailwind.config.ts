
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
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
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for Nirvika's portfolio
				nirvika: {
					primary: '#f8c5d0',
					secondary: '#f3a9c2',
					accent: '#e3a0d6',
					'bg-light': '#fae0eb',
					'text': '#5c3754',
					'cursor': '#830c4f',
					'purple-light': '#d8bfd8',
					'sparkle': '#FF80AB',
					'mint': '#CCFFCC',
					'yellow': '#FFE082',
					'lavender': '#D0A9F5',
					'babyblue': '#81D4FA',
					'nirvika-primary': '#fdf6f0',
					'nirvika-text': '#333333',
					'nirvika-purple-light': '#d8b4fe',
					'nirvika-accent': '#f472b6',
					'nirvika-bg-light': '#fefefe',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fadeInZoom': {
					from: { opacity: '0', transform: 'scale(0.9)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'floatText': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(10px)' }
				},
				'fadeOut': {
					from: { opacity: '1', transform: 'scale(1)' },
					to: { opacity: '0', transform: 'scale(2)' }
				},
				'spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'pop': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'70%': { transform: 'scale(1.1)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'sparkle': {
					'0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
					'50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' },
					'100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' }
				},
				'bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-25px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-zoom': 'fadeInZoom 1.5s ease-in-out',
				'float-text': 'floatText 3s infinite alternate',
				'fade-out': 'fadeOut 0.5s linear',
				'spin': 'spin 10s linear infinite',
				'pop': 'pop 0.8s ease-out forwards',
				'sparkle': 'sparkle 2s infinite',
				'bounce': 'bounce 2s infinite'
			},
			backgroundImage: {
				'gradient-pink-purple': 'linear-gradient(to right, #ffdee2 0%, #d3b0e3 100%)',
				'gradient-y2k': 'linear-gradient(45deg, #f8c5d0, #CCE5FF, #CCFFE5, #FFFFE0)',
				'gradient-sparkle': 'linear-gradient(135deg, #FFC0CB, #FFB6C1, #FF69B4, #FF1493)',
			},
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
				'loubag': ['Loubag', 'Arial Black', 'sans-serif'],
				'tan-newyork': ['Tan New York', 'Georgia', 'serif'],
				'kaoly': ['Kaoly Demo', 'cursive', 'sans-serif'],
				'silvergarden': ['"Silver Garden"', 'cursive'],
				'brice': ['"Brice Semi Expanded"', 'sans-serif'],
				'amoria': ['"Amoria"', 'cursive'],

			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
