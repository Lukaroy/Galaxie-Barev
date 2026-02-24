'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Dynamic import fabric to avoid SSR issues
let fabric: typeof import('fabric') | null = null;

const PRESETS: Record<string, { w: number; h: number }> = {
  'A4 na vysku': { w: 595, h: 842 },
  'A4 na sirku': { w: 842, h: 595 },
  'Instagram': { w: 1080, h: 1080 },
  'Story': { w: 1080, h: 1920 },
  'YouTube': { w: 1280, h: 720 },
  'Plakat': { w: 800, h: 1200 },
};

export default function EditorPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvas = useRef<InstanceType<typeof import('fabric').Canvas> | null>(null);
  const initialized = useRef(false);

  const [ready, setReady] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [fabricLoaded, setFabricLoaded] = useState(false);
  const [canvasW, setCanvasW] = useState(800);
  const [canvasH, setCanvasH] = useState(600);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [selected, setSelected] = useState<any>(null);
  const [zoom, setZoom] = useState(80);

  // Load fabric.js dynamically
  useEffect(() => {
    import('fabric').then(mod => {
      fabric = mod;
      setFabricLoaded(true);
    });
  }, []);

  // Auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUid(u?.uid || null);
      setReady(true);
    });
    return () => unsub();
  }, []);

  // Initialize canvas after fabric is loaded and user is authenticated
  useEffect(() => {
    if (!fabricLoaded || !fabric || !canvasRef.current || !uid || initialized.current) return;
    
    console.log('Initializing fabric canvas...');
    
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasW,
      height: canvasH,
      backgroundColor: bgColor,
      selection: true,
      preserveObjectStacking: true,
    });

    fabricCanvas.current = canvas;
    initialized.current = true;

    canvas.on('selection:created', (e: any) => {
      console.log('Selection created', e.selected?.[0]);
      setSelected(e.selected?.[0] || null);
    });
    canvas.on('selection:updated', (e: any) => {
      setSelected(e.selected?.[0] || null);
    });
    canvas.on('selection:cleared', () => {
      setSelected(null);
    });

    console.log('Fabric canvas initialized!');
    
    return () => {
      canvas.dispose();
      fabricCanvas.current = null;
      initialized.current = false;
    };
  }, [fabricLoaded, uid]);

  // Update canvas size
  useEffect(() => {
    if (!fabricCanvas.current) return;
    fabricCanvas.current.setDimensions({ width: canvasW, height: canvasH });
    fabricCanvas.current.renderAll();
  }, [canvasW, canvasH]);

  // Update background color
  useEffect(() => {
    if (!fabricCanvas.current) return;
    fabricCanvas.current.backgroundColor = bgColor;
    fabricCanvas.current.renderAll();
  }, [bgColor]);

  const handlePreset = (name: string) => {
    const p = PRESETS[name];
    if (p) {
      setCanvasW(p.w);
      setCanvasH(p.h);
    }
  };

  const addBgImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricCanvas.current || !fabric) return;
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      fabric!.FabricImage.fromURL(url).then((img: any) => {
        if (!fabricCanvas.current) return;
        const scaleX = canvasW / (img.width || 1);
        const scaleY = canvasH / (img.height || 1);
        const scale = Math.max(scaleX, scaleY);
        img.set({
          scaleX: scale,
          scaleY: scale,
          left: canvasW / 2,
          top: canvasH / 2,
          originX: 'center',
          originY: 'center',
          selectable: true,
        });
        fabricCanvas.current.add(img);
        fabricCanvas.current.sendObjectToBack(img);
        fabricCanvas.current.renderAll();
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricCanvas.current || !fabric) return;
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      fabric!.FabricImage.fromURL(url).then((img: any) => {
        if (!fabricCanvas.current) return;
        const maxSize = Math.min(canvasW, canvasH) * 0.4;
        const scale = Math.min(maxSize / (img.width || 1), maxSize / (img.height || 1));
        img.set({
          scaleX: scale,
          scaleY: scale,
          left: canvasW / 2,
          top: canvasH / 2,
          originX: 'center',
          originY: 'center',
        });
        fabricCanvas.current.add(img);
        fabricCanvas.current.setActiveObject(img);
        fabricCanvas.current.renderAll();
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const addText = () => {
    if (!fabricCanvas.current || !fabric) return;
    const text = new fabric.IText('Dvojklik pro editaci', {
      left: canvasW / 2,
      top: canvasH / 2,
      originX: 'center',
      originY: 'center',
      fontSize: 48,
      fontFamily: 'Arial',
      fill: '#000000',
    });
    fabricCanvas.current.add(text);
    fabricCanvas.current.setActiveObject(text);
    fabricCanvas.current.renderAll();
  };

  const addRect = () => {
    if (!fabricCanvas.current || !fabric) return;
    const rect = new fabric.Rect({
      left: canvasW / 2 - 50,
      top: canvasH / 2 - 50,
      width: 100,
      height: 100,
      fill: '#6366f1',
      stroke: '#4f46e5',
      strokeWidth: 2,
    });
    fabricCanvas.current.add(rect);
    fabricCanvas.current.setActiveObject(rect);
    fabricCanvas.current.renderAll();
  };

  const addCircle = () => {
    if (!fabricCanvas.current || !fabric) return;
    const circle = new fabric.Circle({
      left: canvasW / 2 - 40,
      top: canvasH / 2 - 40,
      radius: 40,
      fill: '#10b981',
      stroke: '#059669',
      strokeWidth: 2,
    });
    fabricCanvas.current.add(circle);
    fabricCanvas.current.setActiveObject(circle);
    fabricCanvas.current.renderAll();
  };

  const deleteSelected = () => {
    if (!fabricCanvas.current) return;
    const obj = fabricCanvas.current.getActiveObject();
    if (obj) {
      fabricCanvas.current.remove(obj);
      fabricCanvas.current.renderAll();
      setSelected(null);
    }
  };

  const bringForward = () => {
    if (!fabricCanvas.current || !selected) return;
    fabricCanvas.current.bringObjectForward(selected);
    fabricCanvas.current.renderAll();
  };

  const sendBackward = () => {
    if (!fabricCanvas.current || !selected) return;
    fabricCanvas.current.sendObjectBackwards(selected);
    fabricCanvas.current.renderAll();
  };

  const exportPNG = () => {
    if (!fabricCanvas.current) return;
    const dataURL = fabricCanvas.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2,
    });
    const link = document.createElement('a');
    link.download = 'poster.png';
    link.href = dataURL;
    link.click();
  };

  // Loading state
  if (!ready || !fabricLoaded) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner} />
        <p style={{ color: '#888', marginTop: 16 }}>Nacitani editoru...</p>
      </div>
    );
  }

  // Auth required
  if (!uid) {
    return (
      <div style={styles.authPage}>
        <h2 style={{ margin: 0, fontSize: 28, marginBottom: 12 }}>Prihlaste se</h2>
        <p style={{ color: '#888', marginBottom: 24 }}>Pro pouziti editoru plakatu se musite prihlasit</p>
        <button onClick={() => router.push('/prihlaseni')} style={styles.authBtn}>
          Prihlasit se
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* TOP BAR */}
      <header style={styles.topbar}>
        <div style={styles.topbarGroup}>
          <select 
            style={styles.select} 
            onChange={(e) => handlePreset(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>Rozmer platna</option>
            {Object.keys(PRESETS).map(k => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
          
          <input
            type="number"
            value={canvasW}
            onChange={(e) => setCanvasW(Math.max(100, parseInt(e.target.value) || 100))}
            style={styles.numInput}
            min={100}
            max={4000}
          />
          <span style={{ color: '#666' }}>×</span>
          <input
            type="number"
            value={canvasH}
            onChange={(e) => setCanvasH(Math.max(100, parseInt(e.target.value) || 100))}
            style={styles.numInput}
            min={100}
            max={4000}
          />
        </div>

        <div style={styles.topbarGroup}>
          <button onClick={() => setZoom(z => Math.max(20, z - 10))} style={styles.btn}></button>
          <span style={{ color: '#888', minWidth: 50, textAlign: 'center' }}>{zoom}%</span>
          <button onClick={() => setZoom(z => Math.min(200, z + 10))} style={styles.btn}>+</button>
        </div>

        <button onClick={exportPNG} style={styles.exportBtn}>
          Export PNG
        </button>
      </header>

      <div style={styles.main}>
        {/* LEFT SIDEBAR */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Pozadi</h3>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              style={styles.colorPicker}
            />
            <label style={styles.uploadBtn}>
              <input type="file" accept="image/*" onChange={addBgImage} hidden />
              Nahrat obrazek pozadi
            </label>
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Pridat prvky</h3>
            <label style={styles.uploadBtn}>
              <input type="file" accept="image/*" onChange={addImage} hidden />
              Nahrat obrazek
            </label>
            <button onClick={addText} style={styles.toolBtn}>T Text</button>
            <button onClick={addRect} style={styles.toolBtn}> Obdelnik</button>
            <button onClick={addCircle} style={styles.toolBtn}> Kruh</button>
          </div>
        </aside>

        {/* CANVAS AREA */}
        <main style={styles.canvasArea}>
          <div 
            style={{ 
              transform: `scale(${zoom / 100})`, 
              transformOrigin: 'center center',
              boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
            }}
          >
            <canvas ref={canvasRef} />
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside style={{ ...styles.sidebar, borderLeft: '1px solid #222', borderRight: 'none' }}>
          {selected ? (
            <div style={styles.sidebarSection}>
              <h3 style={styles.sidebarTitle}>Vybrany objekt</h3>
              <button onClick={bringForward} style={styles.toolBtn}> Posunout nahoru</button>
              <button onClick={sendBackward} style={styles.toolBtn}> Posunout dolu</button>
              <button onClick={deleteSelected} style={styles.deleteBtn}>Smazat</button>

              {selected.type === 'i-text' && (
                <div style={{ marginTop: 16 }}>
                  <h3 style={styles.sidebarTitle}>Text</h3>
                  <label style={styles.label}>Velikost</label>
                  <input
                    type="number"
                    defaultValue={selected.fontSize || 48}
                    min={8}
                    max={200}
                    style={styles.numInput}
                    onChange={(e) => {
                      selected.set('fontSize', parseInt(e.target.value) || 48);
                      fabricCanvas.current?.renderAll();
                    }}
                  />
                  <label style={styles.label}>Barva</label>
                  <input
                    type="color"
                    defaultValue={selected.fill || '#000000'}
                    style={styles.colorPicker}
                    onChange={(e) => {
                      selected.set('fill', e.target.value);
                      fabricCanvas.current?.renderAll();
                    }}
                  />
                </div>
              )}

              {(selected.type === 'rect' || selected.type === 'circle') && (
                <div style={{ marginTop: 16 }}>
                  <h3 style={styles.sidebarTitle}>Tvar</h3>
                  <label style={styles.label}>Barva</label>
                  <input
                    type="color"
                    defaultValue={selected.fill || '#6366f1'}
                    style={styles.colorPicker}
                    onChange={(e) => {
                      selected.set('fill', e.target.value);
                      fabricCanvas.current?.renderAll();
                    }}
                  />
                  <label style={styles.label}>Pruhlednost</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    defaultValue={(selected.opacity || 1) * 100}
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      selected.set('opacity', parseInt(e.target.value) / 100);
                      fabricCanvas.current?.renderAll();
                    }}
                  />
                </div>
              )}

              {selected.type === 'image' && fabric && (
                <div style={{ marginTop: 16 }}>
                  <h3 style={styles.sidebarTitle}>Obrazek</h3>
                  <label style={styles.label}>Jas</label>
                  <input
                    type="range"
                    min={-100}
                    max={100}
                    defaultValue={0}
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      const v = parseInt(e.target.value) / 100;
                      selected.filters = selected.filters?.filter((f: any) => f.type !== 'Brightness') || [];
                      selected.filters.push(new fabric!.filters.Brightness({ brightness: v }));
                      selected.applyFilters();
                      fabricCanvas.current?.renderAll();
                    }}
                  />
                  <label style={styles.label}>Kontrast</label>
                  <input
                    type="range"
                    min={-100}
                    max={100}
                    defaultValue={0}
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      const v = parseInt(e.target.value) / 100;
                      selected.filters = selected.filters?.filter((f: any) => f.type !== 'Contrast') || [];
                      selected.filters.push(new fabric!.filters.Contrast({ contrast: v }));
                      selected.applyFilters();
                      fabricCanvas.current?.renderAll();
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div style={styles.sidebarSection}>
              <p style={{ color: '#666', fontSize: 13, textAlign: 'center' }}>
                Kliknete na objekt pro upravu
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: '#0d0d12',
    color: '#e2e8f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#0d0d12',
  },
  spinner: {
    width: 48,
    height: 48,
    border: '4px solid #222',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  authPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#0d0d12',
    color: '#fff',
  },
  authBtn: {
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    padding: '14px 40px',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 500,
    cursor: 'pointer',
  },
  topbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: '14px 20px',
    background: '#111118',
    borderBottom: '1px solid #222',
  },
  topbarGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  select: {
    background: '#1a1a24',
    color: '#e2e8f0',
    border: '1px solid #333',
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 14,
    cursor: 'pointer',
  },
  numInput: {
    width: 75,
    background: '#1a1a24',
    color: '#e2e8f0',
    border: '1px solid #333',
    padding: '10px',
    borderRadius: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  btn: {
    background: '#1a1a24',
    color: '#e2e8f0',
    border: '1px solid #333',
    padding: '10px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 16,
  },
  exportBtn: {
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: 240,
    background: '#111118',
    borderRight: '1px solid #222',
    padding: 20,
    overflowY: 'auto',
  },
  sidebarSection: {
    marginBottom: 28,
  },
  sidebarTitle: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#888',
    margin: '0 0 14px 0',
  },
  label: {
    display: 'block',
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
    marginTop: 12,
  },
  colorPicker: {
    width: '100%',
    height: 40,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    marginBottom: 12,
  },
  uploadBtn: {
    display: 'block',
    background: '#1a1a24',
    border: '2px dashed #333',
    padding: 14,
    borderRadius: 10,
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: 13,
    marginBottom: 10,
    transition: 'border-color 0.2s',
  },
  toolBtn: {
    display: 'block',
    width: '100%',
    background: '#1a1a24',
    border: '1px solid #333',
    padding: 12,
    borderRadius: 8,
    color: '#e2e8f0',
    cursor: 'pointer',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'left',
    transition: 'background 0.2s',
  },
  deleteBtn: {
    display: 'block',
    width: '100%',
    background: '#dc2626',
    border: 'none',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
    marginTop: 8,
  },
  canvasArea: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0d0d12',
    overflow: 'auto',
    padding: 40,
  },
};