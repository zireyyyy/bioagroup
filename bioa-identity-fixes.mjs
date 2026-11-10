// Business identity — public pages still exposed Merywood mailboxes (Careers
// careers@merywood.com, Privacy/Cookie info@Merywood.ee), partly hidden behind
// Cloudflare e-mail obfuscation. Applicants/data subjects must not be sent to a
// third party: each Merywood address is replaced by the canonical BIO-A mailbox.
// Other text of those pages is NOT changed here (legal/careers content = owner gates
// LEGAL-1 / CAREERS-1, docs/LEGAL_CONTENT_BLOCKERS.md).
import { BUSINESS } from './bioa-business.mjs';

const isMerywood = s => /@merywood\./i.test(s);
const cfDecode = hex => {
  if (!/^[0-9a-f]{4,}$/i.test(hex || '')) return '';
  const k = parseInt(hex.slice(0, 2), 16); let s = '';
  for (let i = 2; i < hex.length; i += 2) s += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ k);
  return s;
};

export function applyIdentityFixes($){
  const mail = BUSINESS.email;
  // <a href="/cdn-cgi/l/email-protection#<hex>"><span class="__cf_email__" data-cfemail>…</span></a>
  $('a[href^="/cdn-cgi/l/email-protection#"]').each((_, el) => {
    const a = $(el);
    if (!isMerywood(cfDecode(a.attr('href').split('#')[1]))) return;
    a.attr('href', 'mailto:' + mail);
    a.find('.__cf_email__[data-cfemail]').replaceWith(mail);
  });
  // <a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="<hex>">…</a>
  $('.__cf_email__[data-cfemail]').each((_, el) => {
    const e = $(el);
    if (!isMerywood(cfDecode(e.attr('data-cfemail')))) return;
    if (el.name === 'a') e.replaceWith('<a href="mailto:' + mail + '">' + mail + '</a>');
    else e.replaceWith(mail);
  });
  $('[data-copy]').each((_, el) => { if (isMerywood($(el).attr('data-copy'))) $(el).attr('data-copy', mail); });
  $('a[href^="mailto:"]').each((_, el) => { if (isMerywood($(el).attr('href'))) $(el).attr('href', 'mailto:' + mail); });
  applyIdentityMeta($);
}

// SEO/head identity: og:url named merywood.com on every page; WordPress discovery links
// (oEmbed, REST, shortlink) and the Merywood favicon (apple-touch-icon, Windows tile) and
// one og:image still pointed to Merywood. og:url follows the BIO-A canonical; the others are
// removed (no BIO-A PNG icon exists yet = owner asset decision, see docs/BUSINESS_IDENTITY.md).
const MW = /^https?:\/\/(www\.)?merywood\.com/i;
const DROP_LINK_RELS = new Set(['alternate', 'shortlink', 'https://api.w.org/', 'edituri', 'wlwmanifest', 'pingback', 'apple-touch-icon', 'icon', 'shortcut icon']);
export function applyIdentityMeta($){
  const canonical = $('link[rel="canonical"]').attr('href') || '';
  if (canonical.startsWith(BUSINESS.domain)){
    $('meta[property="og:url"]').attr('content', canonical);
    $('meta[property="url"]').each((_, el) => { if (MW.test($(el).attr('content') || '')) $(el).attr('content', canonical); });
  }
  $('link[href]').each((_, el) => {
    const l = $(el);
    if (MW.test(l.attr('href')) && DROP_LINK_RELS.has((l.attr('rel') || '').toLowerCase())) l.remove();
  });
  $('meta[name="msapplication-TileImage"]').each((_, el) => { if (MW.test($(el).attr('content') || '')) $(el).remove(); });
  const ogImage = $('meta[property="og:image"]');
  if (ogImage.length && MW.test(ogImage.attr('content') || '')) $('meta[property^="og:image"]').remove();
}
