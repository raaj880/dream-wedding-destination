
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
			fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['SF Pro Display', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
			colors: {
        // Premium Card Colors - Black and Gold Theme
        'card-black': '#000000', // Pure black
        'card-gold': '#FFD700', // Pure gold
        'card-platinum': '#E5E4E2', // Platinum silver
        'card-dark-gray': '#202020', // Dark gray
        'card-charcoal': '#121212', // Charcoal
        'card-accent': '#FFA500', // Orange gold accent
        
        // Legacy colors mapped to black/gold theme
        'royal-plum': '#000000', // Black
        'blush-rose': '#FFD700', // Gold
        'regal-gold': '#FFD700', // Gold
        'ivory-white': '#FFFFFF', // White
        'charcoal-black': '#000000', // Pure Black
        'slate-gray': '#404040', // Dark Gray
        'vibrant-coral': '#FFD700', // Gold
        'soft-pink': '#FFD700', // Gold
        'deep-blue': '#000000', // Black
        'tinder-bg': '#000000', // Black background
        
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))', // Gold
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', // Bright Gold
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
					DEFAULT: 'hsl(var(--accent))', // Gold
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
			},
      boxShadow: {
        'card': '0 25px 50px rgba(255, 215, 0, 0.3), 0 0 0 1px rgba(255, 215, 0, 0.1)',
        'card-hover': '0 35px 60px rgba(255, 215, 0, 0.4), 0 0 0 1px rgba(255, 215, 0, 0.2)',
        'premium': '0 8px 32px rgba(255, 215, 0, 0.2)',
        'md_dark': '0 -4px 6px -1px rgba(255, 255, 255, 0.05), 0 -2px 4px -1px rgba(255, 255, 255, 0.03)',
      },
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'subtle-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        'gold-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'subtle-pulse': 'subtle-pulse 2s infinite ease-in-out',
        'gold-shimmer': 'gold-shimmer 2s infinite linear',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
