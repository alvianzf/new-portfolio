// Blogger read-only API access. This key ships in the client bundle, so it is
// public by design — it MUST be referrer-restricted to alvianzf.id in Google
// Cloud Console. Rotate it there and set VITE_BLOGGER_API_KEY to override.
export const BLOGGER_API_KEY =
  import.meta.env.VITE_BLOGGER_API_KEY || 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
export const BLOG_ID = '369044396031799467';
