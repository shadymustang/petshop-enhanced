const http = require('http');
const https = require('https');
const { URL } = require('url');
const ports = Array.from({length:11}, (_,i)=>3000+i);
(async ()=>{
  for (const port of ports) {
    const url = `http://localhost:${port}/`;
    try {
      const html = await fetchUrl(url);
      console.log('PORT_OK', port);
      const fs = require('fs');
      fs.writeFileSync('tmp_site_root.html', html, 'utf8');
      const imgRe = /<img[^>]+src=["']?([^"'> ]+)/g;
      const imgs = new Set();
      let m;
      while ((m = imgRe.exec(html)) !== null) imgs.add(m[1]);
      if (imgs.size===0) { console.log('No <img> tags found in root HTML'); process.exit(0); }
      for (const i of imgs) {
        const u = i.startsWith('http') ? i : (i.startsWith('/') ? `http://localhost:${port}${i}` : `http://localhost:${port}/${i}`);
        try {
          const code = await headUrl(u);
          console.log('OK:', u, '->', code);
        } catch (e) {
          console.log('ERR:', u, '->', e.message);
        }
      }
      process.exit(0);
    } catch (e) {
      // console.log('port', port, 'no server');
    }
  }
  console.log('NO_SERVER_FOUND');
})();

function fetchUrl(u){
  return new Promise((res,rej)=>{
    http.get(u,(r)=>{
      let body=''; r.on('data',c=>body+=c); r.on('end',()=>res(body));
    }).on('error',rej);
  });
}
function headUrl(u){
  return new Promise((res,rej)=>{
    const url = new URL(u);
    const getter = url.protocol === 'https:' ? https : http;
    const opts = {method:'HEAD', hostname:url.hostname, port:url.port, path:url.pathname + url.search, timeout:5000};
    const req = getter.request(opts, (r)=>{ res(r.statusCode); });
    req.on('error', rej);
    req.on('timeout', ()=>{ req.destroy(new Error('timeout')) });
    req.end();
  });
}
