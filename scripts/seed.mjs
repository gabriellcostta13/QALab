import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dataDir = join(root, "data");

const seed = {
  user: {
    name: "Estudante de QA",
    goal: "Montar portfolio com evidencias, bugs e casos de teste.",
  },
  projects: ["Loja Demo", "API de Login", "App de Tarefas"],
  generatedAt: new Date().toISOString(),
};

await mkdir(dataDir, { recursive: true });
await writeFile(join(dataDir, "seed.json"), JSON.stringify(seed, null, 2));

console.log("Seed criada em data/seed.json");
