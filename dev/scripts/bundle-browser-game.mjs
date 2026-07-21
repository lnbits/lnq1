import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {dirname, relative, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const extensionDir = resolve(scriptDir, '..', '..')
const srcDir = resolve(extensionDir, 'static/game/src')
const entryPath = resolve(srcDir, 'index.js')
const outPath = resolve(extensionDir, 'static/game.bundle.js')

const importPattern = /import\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"];\s*/g
const reExportPattern = /export\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"];\s*/g

const moduleVar = path =>
  `__sf_${relative(srcDir, path).replace(/[^a-zA-Z0-9_$]/g, '_')}`

const resolveImport = (fromPath, specifier) => {
  const resolved = resolve(dirname(fromPath), specifier)
  return resolved.endsWith('.js') ? resolved : `${resolved}.js`
}

const parseExportList = list =>
  list
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
    .map(item => {
      const parts = item.split(/\s+as\s+/)
      return {local: parts[0].trim(), exported: (parts[1] || parts[0]).trim()}
    })

const modules = new Map()

async function loadModule(path) {
  if (modules.has(path)) return modules.get(path)
  const source = await readFile(path, 'utf8')
  const module = {
    path,
    source,
    deps: [],
    namespaceImports: [],
    exports: []
  }
  modules.set(path, module)

  for (const match of source.matchAll(importPattern)) {
    const clause = match[1].trim()
    const dep = resolveImport(path, match[2])
    module.deps.push(dep)
    const namespaceMatch = clause.match(/^\*\s+as\s+([a-zA-Z_$][\w$]*)$/)
    if (namespaceMatch) {
      module.namespaceImports.push({name: namespaceMatch[1], dep})
    }
  }

  for (const match of source.matchAll(new RegExp(`^\\s*${reExportPattern.source}`, 'gm'))) {
    const dep = resolveImport(path, match[2])
    module.deps.push(dep)
    module.exports.push(...parseExportList(match[1]))
  }

  for (const match of source.matchAll(
    /^\s*export\s+(?:const|let|var|class|function)\s+([a-zA-Z_$][\w$]*)/gm
  )) {
    module.exports.push({local: match[1], exported: match[1]})
  }

  for (const dep of module.deps) {
    await loadModule(dep)
  }
  return module
}

function orderedModules() {
  const ordered = []
  const seen = new Set()

  function visit(path) {
    if (seen.has(path)) return
    seen.add(path)
    const module = modules.get(path)
    for (const dep of module.deps) visit(dep)
    ordered.push(module)
  }

  visit(entryPath)
  return ordered
}

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function transform(module) {
  let code = module.source

  for (const namespaceImport of module.namespaceImports) {
    const namespace = moduleVar(namespaceImport.dep)
    code = code.replace(
      new RegExp(`\\b${escapeRegExp(namespaceImport.name)}\\.`, 'g'),
      `${namespace}.`
    )
  }

  code = code
    .replace(importPattern, '')
    .replace(new RegExp(`^\\s*${reExportPattern.source}`, 'gm'), '')
    .replace(/^(\s*)export\s+(const|let|var|class|function)\s+/gm, '$1$2 ')
    .replace(/^\s*export\s*\{[^}]+\};?\s*/gm, '')

  const uniqueExports = [
    ...new Map(module.exports.map(item => [item.exported, item])).values()
  ]
  const namespace =
    uniqueExports.length > 0
      ? `\nconst ${moduleVar(module.path)} = {\n${uniqueExports
          .map(item => `\t${JSON.stringify(item.exported)}: ${item.local}`)
          .join(',\n')}\n};\n`
      : ''

  return `// ${relative(extensionDir, module.path)}\n${code.trim()}\n${namespace}`
}

await loadModule(entryPath)

const bundle = `${orderedModules().map(transform).join('\n\n')}\n`

await mkdir(dirname(outPath), {recursive: true})
await writeFile(outPath, bundle, 'utf8')
