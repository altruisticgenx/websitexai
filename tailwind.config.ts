import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	screens: {
  		xs: '475px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px'
  	},
  	extend: {
  		fontFamily: {
  			heading: [
  				'Montserrat',
  				'Work Sans',
  				'ui-sans-serif',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			],
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			],
  			mono: [
  				'Inconsolata',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			],
  			serif: [
  				'Lora',
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			]
  		},
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
  			aquamarine: {
  				'50': 'hsl(168, 100%, 97%)',
  				'100': 'hsl(168, 100%, 88%)',
  				'200': 'hsl(168, 100%, 77%)',
  				'300': 'hsl(168, 100%, 64%)',
  				'400': 'hsl(168, 89%, 53%)',
  				'500': 'hsl(168, 100%, 42%)',
  				'600': 'hsl(168, 100%, 34%)',
  				'700': 'hsl(168, 100%, 27%)',
  				'800': 'hsl(173, 95%, 21%)',
  				'900': 'hsl(173, 84%, 19%)',
  				'950': 'hsl(175, 100%, 11%)'
  			},
  			'deep-blue': {
  				DEFAULT: 'hsl(207, 77%, 23%)',
  				light: 'hsl(207, 70%, 35%)',
  				dark: 'hsl(207, 77%, 15%)'
  			},
  			'teal-accent': {
  				DEFAULT: 'hsl(179, 78%, 42%)',
  				light: 'hsl(179, 78%, 55%)',
  				dark: 'hsl(179, 78%, 30%)'
  			},
  			'warm-orange': {
  				DEFAULT: 'hsl(35, 100%, 55%)',
  				light: 'hsl(35, 100%, 65%)',
  				dark: 'hsl(35, 100%, 45%)'
  			},
  			'light-bg': {
  				DEFAULT: 'hsl(65, 43%, 95%)',
  				darker: 'hsl(65, 30%, 90%)'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          "base-100": "oklch(97% 0.014 308.299)",
          "base-200": "oklch(94% 0.033 307.174)",
          "base-300": "oklch(90% 0.063 306.703)",
          "base-content": "oklch(38% 0.176 304.987)",
          "primary": "oklch(87% 0.01 258.338)",
          "primary-content": "oklch(13% 0.028 261.692)",
          "secondary": "oklch(80% 0.105 251.813)",
          "secondary-content": "oklch(28% 0.091 267.935)",
          "accent": "oklch(83% 0.128 66.29)",
          "accent-content": "oklch(26% 0.079 36.259)",
          "neutral": "oklch(49% 0.265 301.924)",
          "neutral-content": "oklch(97% 0.014 308.299)",
          "info": "oklch(78% 0.154 211.53)",
          "info-content": "oklch(30% 0.056 229.695)",
          "success": "oklch(77% 0.152 181.912)",
          "success-content": "oklch(27% 0.046 192.524)",
          "warning": "oklch(82% 0.189 84.429)",
          "warning-content": "oklch(27% 0.077 45.635)",
          "error": "oklch(70% 0.191 22.216)",
          "error-content": "oklch(25% 0.092 26.042)",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "0.5rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
} satisfies Config;
