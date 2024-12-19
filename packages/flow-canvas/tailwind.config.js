import sharedConfig from '../../packages/tailwind-config/tailwind.config';

/** @type {import('tailwindcss').Config} */
export const presets = [sharedConfig];
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "../../packages/ui/src/**/*.{js,jsx,ts,tsx}"
];
