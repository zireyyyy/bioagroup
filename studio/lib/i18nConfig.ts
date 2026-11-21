// R28 VI-FIRST — switch to true (and redeploy the Studio) only after the translator Worker is deployed and the
// Sanity webhook points to it (docs/r28/VI_FIRST_CMS.md §6). While false, the Studio says honestly that automatic
// translation is not active yet.
export const I18N_AUTO_ACTIVE = false
export const PREVIEW_ORIGIN = 'https://cms-preview.bioagroup.pages.dev'
