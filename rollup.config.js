import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
// import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

const packageJson = require("./package.json");

const config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: false,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: false,
        browser: true,
      }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      json(),
      terser(),
      css({
        output: "styles.css",
      }),
      // copy({
      //   targets: [
      //     {
      //       src: "../../node_modules/@fontsource/work-sans/files/*",
      //       dest: "./dist/cjs/files",
      //     },
      //     {
      //       src: "../../node_modules/@fontsource/work-sans/files/*",
      //       dest: "./dist/esm/files",
      //     },
      //   ],
      // }),
    ],
    external: [
      "react",
      "react-dom",
      "@solana/pay",
      "@solana/spl-token",
      "@solana/wallet-adapter-react",
      "@solana/wallet-adapter-react-ui",
      "@solana/web3.js",
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts.default()],
    external: [/\.css$/], // ignore .css file
  },
];

export default config;
