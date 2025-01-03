import sharedConfig from '../tailwind-config/tailwind.config';

/** @type {import('tailwindcss').Config} */
export const presets = [sharedConfig];
export const content = [
  "src/**/*.{ts,tsx}",
];
