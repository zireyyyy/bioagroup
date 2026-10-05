# BIO-A GROUP — BRAND PALETTE AUTHORITY

Source authority:
- Owner-supplied legacy BIO-A website ZIP: ngoyennhi_217925w_1783733078
- Frontend source: assets/css/style.css
- Legacy CSS root variables and footer rules
- This file records source-derived brand colors for reuse in the current project.

## Mandatory rule

Before introducing or changing a BIO-A brand color:
1. read this file;
2. reuse an existing authority color when it fits the requested role;
3. do not invent a replacement green/cream simply for visual preference;
4. if a new value is truly required, document its source or owner approval here first.

Merywood remains the layout/runtime source-of-truth.
This file is color/brand authority only.

## Core palette

### Main dark green
- Hex: `#093D26`
- Legacy token: `--main-color`
- Use: dark text, deep brand accents, strong hover/background states.

### Secondary green
- Hex: `#136E47`
- Legacy token: `--color-sub`
- Use: secondary brand emphasis.

### Primary BIO-A green
- Hex: `#106E45`
- Legacy source usage: footer links, footer bottom, CTA backgrounds, BIO-A emphasis.
- Use: primary CTA, links, footer bottom, social/action emphasis.

### Cream
- Hex: `#F3F0E4`
- Legacy source usage: `.footer-top`, category section backgrounds.
- Use: main warm light background, especially footer top when matching legacy BIO-A.

### Ivory
- Hex: `#FCFEF1`
- Legacy source usage: light knowledge/service section backgrounds.
- Use: lighter warm surface/background.

### Soft green
- Hex: `#99D29F`
- Legacy source usage: soft accent/hover.
- Use: subtle accent only; not the primary green.

## Footer authority

Legacy BIO-A footer combination:
- Footer top background: `#F3F0E4`
- Footer navigation/link emphasis: `#106E45`
- Footer bottom background: `#106E45`
- Footer bottom text: white
- Dark supporting text/accent: `#093D26`

When footer top is cream/light:
- use regular/dark BIO-A logo, not the light/white logo.

When a surface is dark:
- use the light BIO-A logo.

## Current project token mapping

Where possible map current project tokens toward this authority:
- `--bioa-brand-main: #093D26`
- `--bioa-brand-sub: #136E47`
- `--bioa-brand-green: #106E45`
- `--bioa-brand-cream: #F3F0E4`
- `--bioa-brand-ivory: #FCFEF1`
- `--bioa-brand-sage: #99D29F`

Do not globally replace existing colors outside the active patch.
Color migration must remain scoped and regression-safe.
