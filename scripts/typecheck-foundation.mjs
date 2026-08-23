import { spawnSync } from "node:child_process";

const result = spawnSync(process.execPath, ["--check", "apps/api/src/runtime.mjs"], { stdio: "inherit" });
if (result.status !== 0) process.exit(result.status ?? 1);

console.log("typecheck-foundation: PASS (runtime syntax gate; TypeScript compiler will replace this gate when the TS toolchain is introduced)");
