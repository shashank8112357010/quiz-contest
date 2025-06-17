#!/usr/bin/env node

/**
 * Dependency Health Check Script
 * Verifies all required dependencies are properly installed and accessible
 */

import { existsSync } from "fs";
import { readFileSync } from "fs";
import { resolve } from "path";

const packageJsonPath = resolve(process.cwd(), "package.json");
const nodeModulesPath = resolve(process.cwd(), "node_modules");

// Read package.json
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

// Critical dependencies that must be available
const criticalDependencies = [
  "react",
  "react-dom",
  "react-router-dom",
  "@tanstack/react-query",
  "zustand",
  "firebase",
  "lucide-react",
  "tailwindcss",
  "vite",
];

// UI dependencies
const uiDependencies = [
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-progress",
  "@radix-ui/react-toast",
  "@radix-ui/react-avatar",
  "@radix-ui/react-slot",
  "@radix-ui/react-tabs",
  "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog",
  "@radix-ui/react-aspect-ratio",
  "@radix-ui/react-tooltip",
  "@radix-ui/react-label",
];

// Utility dependencies
const utilityDependencies = [
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "uuid",
  "framer-motion",
  "react-confetti",
  "sonner",
  "next-themes",
];

function checkDependency(depName) {
  const depPath = resolve(nodeModulesPath, depName);
  return existsSync(depPath);
}

function checkDependencyGroup(groupName, dependencies) {
  console.log(`\n📦 Checking ${groupName} dependencies...`);

  const results = dependencies.map((dep) => {
    const exists = checkDependency(dep);
    const status = exists ? "✅" : "❌";
    console.log(`  ${status} ${dep}`);
    return { name: dep, exists };
  });

  const missing = results.filter((r) => !r.exists);
  const total = results.length;
  const available = total - missing.length;

  console.log(`  📊 ${available}/${total} dependencies available`);

  if (missing.length > 0) {
    console.log(`  ⚠️  Missing: ${missing.map((m) => m.name).join(", ")}`);
  }

  return missing;
}

function generateInstallCommand(missingDeps) {
  if (missingDeps.length === 0) return null;

  const depList = missingDeps.map((dep) => dep.name).join(" ");
  return `npm install ${depList}`;
}

function main() {
  console.log("🔍 Quiz2Play Dependency Health Check\n");
  console.log(`📁 Project: ${packageJson.name} v${packageJson.version}`);
  console.log(
    `📁 Node modules: ${existsSync(nodeModulesPath) ? "✅ Found" : "❌ Missing"}`,
  );

  if (!existsSync(nodeModulesPath)) {
    console.log("\n❌ node_modules directory not found!");
    console.log("💡 Run: npm install");
    process.exit(1);
  }

  // Check all dependency groups
  const missingCritical = checkDependencyGroup(
    "Critical",
    criticalDependencies,
  );
  const missingUI = checkDependencyGroup("UI Components", uiDependencies);
  const missingUtility = checkDependencyGroup("Utilities", utilityDependencies);

  const allMissing = [...missingCritical, ...missingUI, ...missingUtility];

  console.log("\n📋 Summary:");

  if (allMissing.length === 0) {
    console.log("✅ All dependencies are properly installed!");
    console.log("🚀 Application should work correctly.");
  } else {
    console.log(`❌ ${allMissing.length} dependencies are missing.`);

    if (missingCritical.length > 0) {
      console.log(
        "🚨 Critical dependencies missing - application may not work!",
      );
    }

    const installCommand = generateInstallCommand(allMissing);
    console.log(`\n💡 To fix missing dependencies, run:`);
    console.log(`   ${installCommand}`);
  }

  // Check for potential issues
  console.log("\n🔧 Additional Checks:");

  // Check for conflicting dependencies
  const conflicts = [
    { name: "React versions", check: () => checkDependency("@types/react") },
  ];

  conflicts.forEach((conflict) => {
    const result = conflict.check();
    console.log(`  ${result ? "✅" : "⚠️ "} ${conflict.name}`);
  });

  // Exit with error code if critical dependencies are missing
  if (missingCritical.length > 0) {
    console.log("\n❌ Critical dependency check failed!");
    process.exit(1);
  }

  console.log("\n✅ Dependency check completed successfully!");
}

main();
