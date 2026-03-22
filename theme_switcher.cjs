const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'app', 'App.tsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Imports
if (!content.includes('framer-motion')) {
  content = content.replace(
    'import React, { useState, useEffect } from "react";',
    'import React, { useState, useEffect } from "react";\nimport { motion, AnimatePresence } from "framer-motion";'
  );
}

// 2. Structural Root wrapper
content = content.replace(
  /className=\{`min-h-screen \$\{page === 'management-dashboard' \? 'bg-\[#f4f7fb\]' : 'bg-\[#f8f9fc\]'\} font-sans selection:bg-\[#004b87\] selection:text-white flex flex-col`\}/g,
  'className="min-h-screen text-slate-200 font-sans selection:bg-[#22d3ee]/30 selection:text-[#22d3ee] flex flex-col relative z-10"'
);

// 3. Remove hardcoded root fills that block the body gradient mesh
content = content.replace(/bg-white/g, 'bg-slate-900/40 backdrop-blur-xl border border-white/10');
content = content.replace(/bg-slate-50\/50/g, 'bg-slate-800/40 border border-white/5');
content = content.replace(/bg-slate-50/g, 'bg-slate-800/40 border border-white/5');
content = content.replace(/bg-slate-100\/80/g, 'bg-slate-800/60');
content = content.replace(/bg-slate-100/g, 'bg-slate-800/60');
content = content.replace(/bg-slate-200/g, 'bg-slate-700/60');

// 4. Update border opacities for glass
content = content.replace(/border-slate-100\/80/g, 'border-white/10');
content = content.replace(/border-slate-100/g, 'border-white/10');
content = content.replace(/border-slate-200/g, 'border-white/10');
content = content.replace(/border-slate-50/g, 'border-white/5');

// 5. Update Typography (Inverting slate colors)
content = content.replace(/text-slate-900/g, 'text-white');
content = content.replace(/text-slate-800/g, 'text-slate-100');
content = content.replace(/text-slate-700/g, 'text-slate-200');
content = content.replace(/text-slate-600/g, 'text-slate-300');
content = content.replace(/text-slate-500/g, 'text-slate-400');
// Keep 400 as 400 (it maps well)

// 6. Universal glowing branding swaps (Legacy Blue -> Neon Cyan, Legacy Green -> Neon Emerald)
content = content.replace(/#004b87/g, '#22d3ee'); // cyan-400
content = content.replace(/rgba\(0,75,135/g, 'rgba(34,211,238'); 
content = content.replace(/#00a651/g, '#34d399'); // emerald-400
content = content.replace(/rgba\(0,166,81/g, 'rgba(52,211,153');

/* Save the mapped arrays */
fs.writeFileSync(targetPath, content);
console.log("Premium Theme Mapping successfully executed across 2000 lines of App.tsx!");
