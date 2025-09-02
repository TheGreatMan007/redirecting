// api/redirect.jsexport default function handler(req, res) {
const { dest, clickid } = req.query;
if (!dest) {
return res.status(400).send("Missing 'dest' query
parameter.");
}
try {
const url = new URL(dest);
url.searchParams.set('utm_source', 'bing');
url.searchParams.set('utm_medium', 'cpc');
url.searchParams.set('utm_campaign', 'sale');
url.searchParams.set('utm_content', clickid || 'unknown');console.log(`[${new Date().toISOString()}] Redirecting to:${url.toString()} (clickid: ${clickid || 'N/A'})`);
res.writeHead(302, { Location: url.toString() });
res.end();
} catch (err) {
res.status(400).send("Invalid 'dest' URL.");
}
}