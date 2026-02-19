/** @type {import('postcss-load-config').Config} */
export default (ctx) => ({
  from: ctx.file,
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
})
