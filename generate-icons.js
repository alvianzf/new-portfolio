import fs from 'fs';
import path from 'path';

const sizes = [192, 512];
const iconContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#ffffff"/>
  <circle cx="256" cy="256" r="200" fill="#e11d48"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="200" fill="white">A</text>
</svg>
`;

const saveIcon = (size) => {
  const svgFile = `pwa-${size}x${size}.svg`;
  const content = iconContent.replace(/width="512" height="512"/, `width="${size}" height="${size}"`);
  fs.writeFileSync(path.join('public', svgFile), content);
  console.log(`Generated ${svgFile}`);
};

sizes.forEach(saveIcon);
