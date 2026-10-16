const sharp = require('sharp');

async function main() {
  // Use bh-ventures-logo.jpeg, crop to square 830x830
  const size = 800;
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
  );

  await sharp('public/images/bh-ventures-logo.jpeg')
    .extract({ left: 19, top: 7, width: 830, height: 830 })
    .resize(size, size)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toFile('public/images/bh-ventures-circle-logo.png');

  console.log('bh-ventures-circle-logo.png created successfully!');
}

main().catch(console.error);
