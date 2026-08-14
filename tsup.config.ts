import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  treeshake: true,
  // CSS imported from component files (e.g. `import "./Button.css"`) is
  // collected and emitted as a single dist/index.css. Consumers import it
  // once at the root of their app: `import "ds-tf-ds/styles.css"`.
  injectStyle: false,
  external: ["react", "react-dom"],
});
