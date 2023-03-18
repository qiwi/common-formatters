const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')
const fg = require('fast-glob')

const entries = fg.sync(['src/main/ts/**/*.ts'])
const esmConfig = {
  entryPoints: entries,
  outdir: './target/esm',
  bundle: false,
  minify: false,
  sourcemap: false,
  platform: 'node',
  target: 'ES2020',
  format: 'esm',
  plugins: [nodeExternalsPlugin()],
  tsconfig: './src/main/ts/tsconfig.json'
}

const cjsConfig = {
  ...esmConfig,
  outdir: './target/cjs',
  platform: 'node',
  target: 'es6',
  format: 'cjs',
}

const config = process.argv.includes('--cjs')
  ? cjsConfig
  : esmConfig

esbuild
  .build(config)
  .catch(() => process.exit(1))
