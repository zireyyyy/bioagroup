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

Legacy BIO-A source combination (historical reference):
- Footer top background: `#F3F0E4`
- Footer navigation/link emphasis: `#106E45`
- Footer bottom background: `#106E45`

### Current owner-approved website footer treatment

The owner runtime-tested the legacy cream-top treatment and rejected it because the footer content became visually submerged.

Current footer authority therefore overrides the historical footer combination:

- Footer background: `#116F47` — exact fill used by the current BIO-A logo asset.
- Footer foreground text/icons: `#FDFEF5` — matches the accepted email-surface cream.
- Footer logo: `assets/bioa-full-light.svg`.
- Light logo internal fills: `#F3F0E4` and `#FCFEF1`.
- Social controls use translucent cream on the logo-green background; hover may invert to cream background + logo green.

This footer override is owner-directed and is authoritative for the current website.

Do not revert footer top to cream unless the owner explicitly reopens the color treatment.

When a general surface is dark:
- use the light BIO-A logo.

When a general surface is light:
- use the regular BIO-A logo unless a component-specific owner rule overrides it.

## Current project token mapping

Where possible map current project tokens toward this authority:
- `--bioa-brand-logo-green: #116F47` — exact current logo fill
- `--bioa-footer-cream: #FDFEF5` — owner-approved footer foreground
- `--bioa-brand-main: #093D26`
- `--bioa-brand-sub: #136E47`
- `--bioa-brand-green: #106E45`
- `--bioa-brand-cream: #F3F0E4`
- `--bioa-brand-ivory: #FCFEF1`
- `--bioa-brand-sage: #99D29F`

Do not globally replace existing colors outside the active patch.
Color migration must remain scoped and regression-safe.
