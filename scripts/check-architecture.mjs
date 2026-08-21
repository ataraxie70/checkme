import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, 'docs/architecture/ARCHITECTURE_MANIFEST.json'), 'utf8'),
);

const sourceExtensions = new Set(manifest.sourceExtensions);
const forbiddenExternal = manifest.forbiddenExternalImports;
const forbiddenInternal = manifest.forbiddenInternalImports;

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (['node_modules', 'dist', '.next', 'coverage', '.git'].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (sourceExtensions.has(path.extname(entry.name))) files.push(absolute);
  }
  return files;
}

function importsFrom(source) {
  const matches = source.matchAll(/(?:import|export)\s+(?:[^'\"]+?\s+from\s+)?['\"]([^'\"]+)['\"]/g);
  return [...matches].map((match) => match[1]);
}

const files = walk(root);
const violations = [];

for (const file of files) {
  const relative = path.relative(root, file).split(path.sep).join('/');
  const source = fs.readFileSync(file, 'utf8');
  const imports = importsFrom(source);

  for (const [prefix, banned] of Object.entries(forbiddenExternal)) {
    if (!relative.startsWith(prefix)) continue;
    for (const specifier of imports) {
      if (banned.some((value) => specifier.startsWith(value))) {
        violations.push(`${relative}: forbidden external import ${specifier}`);
      }
    }
  }

  for (const rule of forbiddenInternal) {
    if (!relative.startsWith(rule.from)) continue;
    for (const specifier of imports) {
      if (rule.to.some((value) => specifier.includes(value))) {
        violations.push(`${relative}: forbidden internal dependency ${specifier}`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error('Architecture violations detected:');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`Architecture check passed (${files.length} source files scanned).`);
