import { spawnSync } from "node:child_process";
import { crypto } from "bun";

const isWindows = process.platform === "win32";
const binPath = isWindows ? "./test_cli_runner.exe" : "./test_cli_runner";

function getGoldenHash(input) {
  return new Bun.CryptoHasher("sha256").update(input).digest("hex");
}

function getClHash(input) {
  const result = spawnSync(binPath, [input], { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`CLI failed with status ${result.status}: ${result.stderr}`);
  }
  return result.stdout.trim();
}

function verify(input) {
  const golden = getGoldenHash(input);
  const cli = getClHash(input);

  if (golden === cli) {
    console.log(`[MATCH] Input: "${input}" (len: ${input.length})`);
    return true;
  } else {
    console.error(`[MISMATCH] Input: "${input}" (len: ${input.length})`);
    console.error(`  Expected: ${golden}`);
    console.error(`  Actual:   ${cli}`);
    return false;
  }
}

function generateRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Edge case testing
const edgeCases = [0, 55, 56, 63, 64];
console.log("--- Running Edge Case Tests ---");
for (const len of edgeCases) {
  const input = generateRandomString(len);
  if (!verify(input)) process.exit(1);
}

// Random stress test
console.log("\n--- Running Random Stress Tests (100 iterations) ---");
for (let i = 0; i < 100; i++) {
  const input = generateRandomString(64);
  if (!verify(input)) process.exit(1);
}

console.log("\nAll tests passed!");
