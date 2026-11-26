import fs from 'fs';
import path from 'path';

const sizes = [192, 512];

// Matches the site's logo mark: ">_" (the Header's Terminal icon) on the
// indigo accent background, no "azf" text since it needs to read at 16px.
const iconContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="#4f46e5"/>
  <path d="M150 170 L240 256 L150 342" stroke="#ffffff" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <line x1="270" y1="342" x2="372" y2="342" stroke="#ffffff" stroke-width="34" stroke-linecap="round"/>
</svg>
`;

const saveIcon = (size) => {
  const svgFile = `pwa-${size}x${size}.svg`;
  const content = iconContent.replace(/width="512" height="512"/, `width="${size}" height="${size}"`);
  fs.writeFileSync(path.join('public', svgFile), content);
  console.log(`Generated ${svgFile}`);
};

sizes.forEach(saveIcon);

// Standalone favicon (same mark, used directly by index.html).
fs.writeFileSync(path.join('public', 'favicon.svg'), iconContent.trim());
console.log('Generated favicon.svg');
