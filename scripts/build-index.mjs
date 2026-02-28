import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const htmlSourceDir = path.resolve('src/HTML');

const preferredOrder = [
  'Constants.js',
  'Helpers.js',
  'Classes/Pin.js',
  'Classes/DefinedPin.js',
  'Classes/Component.js',
  'Classes/Chain.js',
  'HarnessFunctions.js',
  'CreateChain.js',
  'ModifyChainFunctions.js',
  'Main.js',
  'Tests.js',
];

const allJsFiles = [];

function walk(dir, prefix = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      walk(path.join(dir, entry.name), path.join(prefix, entry.name));
      continue;
    }

    if (!entry.name.endsWith('.js') || entry.name === 'index.js') {
      continue;
    }

    allJsFiles.push(path.join(prefix, entry.name).replace(/\\/g, '/'));
  }
}

walk(distDir);

const preferredSet = new Set(preferredOrder);
const missingPreferred = preferredOrder.filter(
  file => !allJsFiles.includes(file)
);

if (missingPreferred.length > 0) {
  throw new Error(
    `Missing expected build outputs: ${missingPreferred.join(', ')}`
  );
}

const remainingFiles = allJsFiles
  .filter(file => !preferredSet.has(file))
  .sort((a, b) => a.localeCompare(b));

const orderedFiles = [...preferredOrder, ...remainingFiles];

const contents = orderedFiles
  .map(file => fs.readFileSync(path.join(distDir, file), 'utf8').trimEnd())
  .join('\n\n');

fs.writeFileSync(path.join(distDir, 'index.js'), `${contents}\n`, 'utf8');

if (fs.existsSync(htmlSourceDir)) {
  for (const entry of fs.readdirSync(htmlSourceDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) {
      continue;
    }

    fs.copyFileSync(
      path.join(htmlSourceDir, entry.name),
      path.join(distDir, entry.name)
    );
  }
}
