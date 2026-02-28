import cleanup from 'rollup-plugin-cleanup';
import license from 'rollup-plugin-license';
import prettier from 'rollup-plugin-prettier';
import typescript from 'rollup-plugin-typescript2';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

function getTsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getTsFiles(file));
    } else if (file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const inputFiles = getTsFiles('src');

export default {
  input: inputFiles,
  output: {
    dir: 'dist',
    format: 'es',
    preserveModules: true,
  },
  plugins: [
    cleanup({ comments: 'none', extensions: ['.ts'] }),
    license({
      banner: {
        content: {
          file: fileURLToPath(new URL('license-header.txt', import.meta.url)),
        },
      },
    }),
    typescript(),
    prettier({ parser: 'typescript' }),
  ],
  context: 'this',
};
