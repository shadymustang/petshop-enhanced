
  # Next.js Multi-Page Starter (Community)

  This is a code bundle for Next.js Multi-Page Starter (Community). The original project is available at https://www.figma.com/design/l4p1qScxVHmOERwZ6iN5jx/Next.js-Multi-Page-Starter--Community-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Build / run / debug (commands discovered)

   - Dev server: `npm run dev` -> runs `vite` and opens browser at port 3000 (see `vite.config.ts`).
   - Build: `npm run build` -> `vite build`, outputs to `build/`.
   - There are no test scripts or typecheck scripts in `package.json`. Type errors are handled by Vite/SWC during dev/build. If you add a formal type-check step, run `npx tsc --noEmit` after adding `tsconfig.json`.

  Quick checks for Next dev server and images
  - Start the dev server: 
    - On Windows PowerShell: `npm run dev` (uses `next dev`) and note the listening port in the output.
  - Verify the root HTML is served and list image statuses (run from the repo root):
    - `node ./scripts/check_site.js` will probe ports 3000..3010, save the root HTML to `tmp_site_root.html`, and print HTTP status codes for each `<img>` src it finds.
  - To allow `next/image` to load external Unsplash images, `next.config.js` includes `images.domains = ['images.unsplash.com']`.
  