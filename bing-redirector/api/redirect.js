import { URL } from 'url';

export default function handler(req, res) {
  const { dest, clickid } = req.query;

  // Check if the 'dest' parameter is provided
  if (!dest) {
    return res.status(400).send("Missing 'dest' query parameter.");
  }

  try {
    // Ensure 'dest' is a full URL
    const baseUrl = 'https://sord.helpdeskinld.com';
    const url = new URL(dest, baseUrl);  // This combines the base URL with the 'dest' parameter

    // Add UTM parameters
    url.searchParams.set('utm_source', 'bing');
    url.searchParams.set('utm_medium', 'cpc');
    url.searchParams.set('utm_campaign', 'sale');
    url.searchParams.set('utm_content', clickid || 'unknown');

    // Format the redirect URL like Google's URL format
    const googleRedirectUrl = `https://www.google.com/url?q=${encodeURIComponent(url.toString())}`;

    console.log(`[${new Date().toISOString()}] Redirecting to: ${googleRedirectUrl}`);

    // Perform the 302 redirect to Google-like URL
    res.writeHead(302, { Location: googleRedirectUrl });
    res.end();
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid 'dest' URL.");
  }
}
