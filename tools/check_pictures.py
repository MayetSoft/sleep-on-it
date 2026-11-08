"""Render a contact sheet of an Ants picture set and play each picture once.

Usage: python3 tools/check_pictures.py set-02 8802
(serves the repository on the given port, writes /tmp/<set>-sheet.png and prints one line per picture)
"""
import asyncio, subprocess, sys, time, os
from playwright.async_api import async_playwright

SET, PORT = sys.argv[1], int(sys.argv[2])
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SHEET = """(first)=>{
  const list=PICTURES.slice(first); const box=150, cols=8, cvs=document.createElement('canvas');
  cvs.width=cols*(box+10); cvs.height=Math.ceil(list.length/cols)*(box+30);
  const x2=cvs.getContext('2d'); x2.fillStyle=SOIL; x2.fillRect(0,0,cvs.width,cvs.height);
  list.forEach((f,k)=>{ const p=f.make(); const z=box/p.size; const X=(k%cols)*(box+10)+5, Y=Math.floor(k/cols)*(box+30)+5;
    for(let i=0;i<p.size*p.size;i++){ const v=p.px[i]; if(v<0) continue; x2.fillStyle=css(p.pal[v]); x2.fillRect(X+(i%p.size)*z, Y+Math.floor(i/p.size)*z, Math.ceil(z), Math.ceil(z)); }
    x2.fillStyle='#e8d8c4'; x2.font='12px monospace'; x2.fillText((first+k)+' '+f.name.slice(0,16)+' '+p.size+' t'+f.tier, X, Y+box+15); });
  cvs.id='sheet'; cvs.style.cssText='position:absolute;left:0;top:0;z-index:99'; document.body.appendChild(cvs);
  return cvs.height;
}"""
PLAY = """(pi)=>{
  const f=PICTURES[pi], p=f.make(); const used=new Set(); let px=0;
  for(const v of p.px) if(v>=0){ used.add(v); px++; }
  const unused=p.pal.length-used.size;
  const t0=performance.now(); buildLevel({pic:pi, mirror:false}, 12345); const build=Math.round(performance.now()-t0);
  let time=0; for(let fr=0; fr<40000 && state==='play'; fr++){ update(0.05); time+=0.05; if(fr%4==0) patientMove(Math.random); }
  return [pi, f.name, f.tier, p.size, px, used.size, unused, state, Math.round(time), build];
}"""

async def main():
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--directory", ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    try:
        async with async_playwright() as p:
            b = await p.chromium.launch(executable_path="/usr/bin/google-chrome")
            pg = await b.new_page(viewport={"width": 1300, "height": 900})
            errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
            await pg.goto(f"http://localhost:{PORT}/games/ants/"); await pg.wait_for_timeout(1200)
            await pg.evaluate("window.requestAnimationFrame=()=>0")
            first = await pg.evaluate("PICTURES.length")
            await pg.add_script_tag(url=f"/games/ants/pictures/{SET}.js")
            total = await pg.evaluate("PICTURES.length")
            names = await pg.evaluate("PICTURES.map(p=>p.name)")
            dup = sorted({n for n in names if names.count(n) > 1})
            print(f"{SET}: {total-first} pictures (indices {first}..{total-1}); duplicate names: {dup or 'none'}")
            h = await pg.evaluate(SHEET, first)
            await pg.set_viewport_size({"width": 1300, "height": max(900, h)})
            await pg.locator('#sheet').screenshot(path=f"/tmp/{SET}-sheet.png")
            print(f"sheet: /tmp/{SET}-sheet.png")
            print("index name tier size pixels colours_used colours_unused result seconds build_ms")
            for pi in range(first, total):
                print(await pg.evaluate(PLAY, pi))
            print("errors:", errs or "none")
            await b.close()
    finally:
        srv.terminate()

asyncio.run(main())
