export default {
  async fetch(request) {
    const url = new URL(request.url);

    // 1. 代理 JSON
    if (url.pathname === '/api/apps.json') {
      const resp = await fetch('https://f.ffurry.cc.cd/apps.json');
      return new Response(resp.body, resp, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
    }

    // 2. 代理 APK
    if (url.pathname === '/proxy') {
      const target = url.searchParams.get('url');
      if (!target) return new Response('missing url', { status: 400 });
      const resp = await fetch(target);
      return new Response(resp.body, resp, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Disposition': 'attachment'
        }
      });
    }

    // 3. 预检
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS'
        }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};
