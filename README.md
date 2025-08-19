# PIXELPrompt

PIXELPrompt is a [Next.js](https://nextjs.org) app for discovering and sharing professional AI prompts for digital art, 3D renders, and character design. It features a curated, category-based gallery with markdown/MDX content, dynamic image grids, and optimized static export.

## Getting Started

## Getting Started

First, install dependencies and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the homepage by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Prompts and categories are managed via markdown/MDX files in the `content/` directory. Images are stored in `public/content/`.

## Features

- Category-based prompt gallery (markdown/MDX content)
- Responsive masonry and grid layouts
- Static export for fast, serverless hosting
- Custom callouts and Markdoc support

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository and clone your fork.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b my-feature
   ```
3. Add or edit prompts in the `content/` directory, or update code in `components/`, `lib/`, or `app/`.
4. Commit your changes and push your branch:
   ```bash
   git add .
   git commit -m "Describe your change"
   git push origin my-feature
   ```
5. Open a Pull Request on GitHub and describe your changes.

Please follow the existing code style and add tests or documentation where appropriate.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Markdoc Documentation](https://markdoc.dev/)
