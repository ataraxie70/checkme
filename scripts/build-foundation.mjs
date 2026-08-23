import { access } from "node:fs/promises";

for (const path of ["apps/api/src/runtime.mjs", "apps/worker/src/runtime.mjs", "packages/config/src/index.mjs", "packages/observability/src/index.mjs"]) {
  await access(path);
}

console.log("build-foundation: PASS");
