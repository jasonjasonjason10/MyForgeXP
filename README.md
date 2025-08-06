# SET UP TAILWIND

- Run in your terminal "npm i"

- Edit "vite.config.js":

```shell
  export default defineConfig({
    plugins: [react(), tailwindcss()],
  })
```

- Go into your CSS file (only 1 CSS file needed globally)

```shell
  @import "tailwindcss";
```
