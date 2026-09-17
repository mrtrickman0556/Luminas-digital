import { Product } from '../types';

export function downloadProductFile(product: Product, orderNumber?: string) {
  let fileContent = product.downloadContent || '';

  if (!fileContent) {
    fileContent = `# ${product.title}
${product.subtitle ? `## ${product.subtitle}\n` : ''}
Published by Lumina Digital
Format: ${product.format} | Deliverable: ${product.pagesOrCount}
Order ID: ${orderNumber || 'LUM-DEMO'}
License: Personal & Commercial Single-User License

--- WHAT'S INCLUDED ---
${(product.whatsIncluded || []).map((item, idx) => `${idx + 1}. ${item}`).join('\n')}

--- KEY BENEFITS ---
${(product.keyBenefits || []).map((item, idx) => `- ${item}`).join('\n')}

--- ACCESS & SUPPORT ---
For updates and customer support, reach out to support@luminadigital.com
Thank you for supporting independent digital education.
`;
  }

  // Determine mime type based on filename
  const filename = product.downloadFilename || `${product.slug}-lumina-digital.txt`;
  let mimeType = 'text/plain;charset=utf-8';
  if (filename.endsWith('.json')) {
    mimeType = 'application/json;charset=utf-8';
  } else if (filename.endsWith('.pdf')) {
    mimeType = 'text/plain;charset=utf-8';
  }

  const blob = new Blob([fileContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export const downloadDigitalProduct = downloadProductFile;
