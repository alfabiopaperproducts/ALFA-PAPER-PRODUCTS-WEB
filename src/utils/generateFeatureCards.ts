export interface FeatureCardConfig {
  id: string;
  iconName: string;
  title: string;
  description: string;
  badge?: string;
  subtext?: string;
}

export const whyChooseFeaturesData: FeatureCardConfig[] = [
  {
    id: 'biodegradable',
    iconName: 'leaf',
    title: 'Biodegradable',
    description: 'Designed to naturally break down under suitable environmental conditions, leaving no permanent footprint.',
    badge: 'ECO FRIENDLY',
    subtext: 'Zero Permanent Microplastics'
  },
  {
    id: 'compostable',
    iconName: 'recycle',
    title: 'Compostable',
    description: 'Products developed with compostability and responsible organic disposal in mind for circular packaging.',
    badge: 'CIPET TESTED',
    subtext: 'Natural Organic Breakdown'
  },
  {
    id: 'plastic-free',
    iconName: 'shield',
    title: 'Plastic Free',
    description: 'Paper-based alternatives engineered to eliminate reliance on conventional single-use polymers.',
    badge: '100% PAPER',
    subtext: 'Clean Sustainable Substitute'
  },
  {
    id: 'recyclable',
    iconName: 'loop',
    title: 'Recyclable',
    description: 'Paper-based products that support responsible material recovery and circular economy loops wherever facilities exist.',
    badge: 'CIRCULAR PACKAGING',
    subtext: 'Recoverable Fiber Base'
  },
  {
    id: 'food-grade',
    iconName: 'food',
    title: 'Food-Grade Board',
    description: 'Manufactured using certified virgin food-contact materials safe for hot, cold, and moist food-service applications.',
    badge: 'FOOD SAFE',
    subtext: 'Virgin Certified Paperboard'
  },
  {
    id: 'oil-grease',
    iconName: 'droplet',
    title: 'Oil & Grease Resistant',
    description: 'Engineered barrier protection designed to handle demanding, oily, saucy and hot foods with zero leak-through.',
    badge: 'BARRIER PROTECTED',
    subtext: 'High Structural Integrity'
  },
  {
    id: 'env-responsible',
    iconName: 'globe',
    title: 'Environmentally Responsible',
    description: 'Created to assist modern commercial enterprises in transitioning to sustainable, lower-carbon packaging alternatives.',
    badge: 'RESPONSIBLE B2B',
    subtext: 'Supporting ESG Goals'
  },
  {
    id: 'cipet-tested',
    iconName: 'award',
    title: 'Compostability Tested',
    description: 'Our products have undergone rigorous compostability and quality verification at CIPET Kochi.',
    badge: 'GOVT. VERIFIED',
    subtext: 'CIPET Kochi Testing Done'
  }
];

// Helper to draw a rounded rectangle
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Wrap text onto multiple lines
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

// Draws iconic glyphs for each feature
function drawIcon(ctx: CanvasRenderingContext2D, name: string, cx: number, cy: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#399139';
  ctx.fillStyle = '#399139';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  switch (name) {
    case 'leaf':
      ctx.beginPath();
      ctx.moveTo(-16, 16);
      ctx.quadraticCurveTo(-16, -14, 16, -16);
      ctx.quadraticCurveTo(14, 16, -16, 16);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-16, 16);
      ctx.lineTo(6, -6);
      ctx.stroke();
      break;

    case 'recycle':
    case 'loop':
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0.4, 2.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 14, 2.7, 4.6);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 14, 5.0, 6.7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(10, 12); ctx.lineTo(15, 6); ctx.lineTo(6, 6);
      ctx.fill();
      break;

    case 'shield':
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(14, -10);
      ctx.lineTo(14, 2);
      ctx.quadraticCurveTo(14, 14, 0, 18);
      ctx.quadraticCurveTo(-14, 14, -14, 2);
      ctx.lineTo(-14, -10);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-5, 0); ctx.lineTo(-1, 5); ctx.lineTo(6, -4);
      ctx.stroke();
      break;

    case 'food':
      ctx.beginPath();
      ctx.moveTo(-6, -14); ctx.lineTo(-6, 14);
      ctx.moveTo(-11, -14); ctx.lineTo(-11, -4); ctx.lineTo(-1, -4); ctx.lineTo(-1, -14);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(7, -14); ctx.quadraticCurveTo(12, -8, 7, 2); ctx.lineTo(7, 14);
      ctx.stroke();
      break;

    case 'droplet':
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.quadraticCurveTo(14, 4, 12, 11);
      ctx.arc(0, 7, 12, 0.2, Math.PI - 0.2, false);
      ctx.quadraticCurveTo(-14, 4, 0, -16);
      ctx.stroke();
      break;

    case 'globe':
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-15, 0); ctx.lineTo(15, 0);
      ctx.moveTo(0, -15); ctx.lineTo(0, 15);
      ctx.stroke();
      break;

    case 'award':
    default:
      ctx.beginPath();
      ctx.arc(0, -5, 11, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-6, 5); ctx.lineTo(-9, 16); ctx.lineTo(0, 12); ctx.lineTo(9, 16); ctx.lineTo(6, 5);
      ctx.stroke();
      break;
  }

  ctx.restore();
}

/**
 * Generates an 800x600 high-definition PNG data URL representing a feature card
 */
export function generateFeatureCardImage(feat: FeatureCardConfig): string {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  const width = 800;
  const height = 600;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Crisp Card Background with subtle luxury gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.7, '#FDFBF7');
  bgGrad.addColorStop(1, '#F7F3EB');

  roundRect(ctx, 16, 16, width - 32, height - 32, 28);
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // Outer border
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#E3DCD1';
  ctx.stroke();

  // Subtle interior border
  roundRect(ctx, 24, 24, width - 48, height - 48, 22);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(57, 145, 57, 0.12)';
  ctx.stroke();

  // 2. Top Pill Badge (e.g. ECO FRIENDLY)
  if (feat.badge) {
    const badgeText = feat.badge;
    ctx.font = 'bold 15px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
    const badgeMetrics = ctx.measureText(badgeText);
    const badgeWidth = badgeMetrics.width + 30;
    const badgeHeight = 32;
    const badgeX = 54;
    const badgeY = 52;

    roundRect(ctx, badgeX, badgeY, badgeWidth, badgeHeight, 16);
    ctx.fillStyle = '#EAF5EA';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(57, 145, 57, 0.4)';
    ctx.stroke();

    ctx.fillStyle = '#2E7D32';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, badgeX + 15, badgeY + badgeHeight / 2);
  }

  // Heritage Watermark right-aligned
  ctx.font = 'bold 14px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = '#9CA3AF';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText('EST. 1985 • ALFA', width - 54, 68);

  // 3. Icon Box (76 x 76)
  const iconX = 54;
  const iconY = 114;
  const iconSize = 76;
  roundRect(ctx, iconX, iconY, iconSize, iconSize, 20);
  ctx.fillStyle = '#EBF7EB';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(57, 145, 57, 0.35)';
  ctx.stroke();

  drawIcon(ctx, feat.iconName, iconX + iconSize / 2, iconY + iconSize / 2);

  // 4. Feature Title
  ctx.font = 'bold 38px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#172218';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(feat.title, 54, 218);

  // Decorative Accent Bar below Title
  ctx.fillStyle = '#399139';
  roundRect(ctx, 54, 270, 56, 4, 2);
  ctx.fill();

  // 5. Feature Description
  ctx.font = 'normal 23px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#4B5563';
  ctx.textBaseline = 'top';
  const descLines = wrapText(ctx, feat.description, width - 110);
  let textY = 296;
  const lineHeight = 36;
  descLines.forEach((line) => {
    ctx.fillText(line, 54, textY);
    textY += lineHeight;
  });

  // 6. Bottom Trust Banner
  const footerY = height - 86;
  ctx.strokeStyle = '#E8E2D7';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(54, footerY);
  ctx.lineTo(width - 54, footerY);
  ctx.stroke();

  // Subtext highlight
  ctx.font = '600 16px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = '#2E7D32';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(`✓ ${feat.subtext || 'Verified Sustainable Paper'}`, 54, footerY + 36);

  // Tirur, Kerala tag
  ctx.font = '500 14px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.textAlign = 'right';
  ctx.fillText('ALFA PAPER PRODUCTS • KERALA', width - 54, footerY + 36);

  return canvas.toDataURL('image/png');
}

/**
 * Pre-generates all 8 gallery items for CircularGallery
 */
export function getWhyChooseGalleryItems(): { image: string; text: string }[] {
  return whyChooseFeaturesData.map((feat) => ({
    image: generateFeatureCardImage(feat),
    text: feat.title
  }));
}
