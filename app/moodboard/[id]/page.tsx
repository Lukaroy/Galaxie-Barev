'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

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

function EditorPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const moodboardId = Array.isArray(params.id) ? params.id[0] : params.id;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvas = useRef<InstanceType<typeof import('fabric').Canvas> | null>(null);
  const initialized = useRef(false);

  const [ready, setReady] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [fabricLoaded, setFabricLoaded] = useState(false);
  const [canvasW, setCanvasW] = useState(() => Math.max(100, parseInt(searchParams.get('w') || '800')));
  const [canvasH, setCanvasH] = useState(() => Math.max(100, parseInt(searchParams.get('h') || '600')));
  const [bgColor, setBgColor] = useState('#ffffff');
  const [selected, setSelected] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const canvasAreaRef = useRef<HTMLDivElement>(null);

  // Canvas transform state (pan + zoom via CSS transforms, Photoshop-like)
  const [canvasTransform, setCanvasTransform] = useState({ x: 0, y: 0, scale: 0.75 });

  // Panning state
  const isPanning = useRef(false);
  const lastPanPos = useRef({ x: 0, y: 0 });
  const spacePressedRef = useRef(false);
  const viewportRestoredRef = useRef(false);

  // Save state
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [savedCanvasJson, setSavedCanvasJson] = useState<string | null>(null);
  const [canvasInitialized, setCanvasInitialized] = useState(false);

  // Text properties
  const [textFont, setTextFont] = useState('Arial');
  const [textBold, setTextBold] = useState(false);
  const [textItalic, setTextItalic] = useState(false);
  const [textSize, setTextSize] = useState(48);
  const [textColor, setTextColor] = useState('#000000');

  // Shape properties
  const [shapeFill, setShapeFill] = useState('#6366f1');
  const [shapeStroke, setShapeStroke] = useState('#4f46e5');
  const [shapeStrokeWidth, setShapeStrokeWidth] = useState(0);
  const [shapeOpacity, setShapeOpacity] = useState(100);

  // DB Fonts
  const [dbFonts, setDbFonts] = useState<{ id: number; name: string; url: string }[]>([]);

  // Layers
  interface LayerInfo { uid: number; type: string; label: string }
  const [layers, setLayers] = useState<LayerInfo[]>([]);
  const layerUid = useRef(0);

  // Load fabric.js dynamically
  useEffect(() => {
    import('fabric').then(mod => {
      fabric = mod;
      setFabricLoaded(true);
    });
  }, []);

  // Fetch fonts from DB and inject CSS
  useEffect(() => {
    fetch('/api/fonts')
      .then(r => (r.ok ? r.json() : []))
      .then((fonts: { id: number; name: string; url: string }[]) => {
        setDbFonts(fonts);
        fonts.forEach(font => {
          const linkId = `editor-font-${font.id}`;
          if (!document.getElementById(linkId)) {
            const link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';
            link.href = font.url;
            document.head.appendChild(link);
          }
        });
      })
      .catch(() => {});
  }, []);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUid(u?.uid || null);
      setReady(true);
    });
    return () => unsub();
  }, []);

  // Fetch moodboard data (canvas size + saved elements)
  useEffect(() => {
    if (!uid || !moodboardId) return;
    fetch(`/api/moodboards/${moodboardId}?userId=${uid}`)
      .then(r => (r.ok ? r.json() : null))
      .then((data: any) => {
        if (!data) return;
        if (data.canvasWidth) setCanvasW(data.canvasWidth);
        if (data.canvasHeight) setCanvasH(data.canvasHeight);
        if (data.bgColor) setBgColor(data.bgColor);
        // Restore viewport transform if saved
        if (data.viewportScale && data.viewportScale !== 1) {
          viewportRestoredRef.current = true;
          setCanvasTransform({
            x: data.viewportX || 0,
            y: data.viewportY || 0,
            scale: data.viewportScale,
          });
        }
        // Prefer loading from elements, fall back to canvasJson
        if (data.elements && data.elements.length > 0) {
          setSavedCanvasJson(JSON.stringify(data.elements.map((el: any) => el.fabricJson)));
        } else if (data.canvasJson) {
          setSavedCanvasJson(data.canvasJson);
        }
      })
      .catch(() => {});
  }, [uid, moodboardId]);

  // Load saved canvas data once canvas is ready
  useEffect(() => {
    if (!canvasInitialized || !savedCanvasJson || !fabricCanvas.current || !fabric) return;
    try {
      const parsed = JSON.parse(savedCanvasJson);
      // If it's an array of fabricJson strings (from elements), enqueue them
      if (Array.isArray(parsed)) {
        const loadNext = (index: number) => {
          if (index >= parsed.length) {
            fabricCanvas.current?.renderAll();
            return;
          }
          const objJson = typeof parsed[index] === 'string' ? JSON.parse(parsed[index]) : parsed[index];
          fabric!.util.enlivenObjects([objJson]).then((objects: any[]) => {
            objects.forEach((obj: any) => {
              obj.__uid = ++layerUid.current;
              fabricCanvas.current?.add(obj);
            });
            loadNext(index + 1);
          }).catch(() => loadNext(index + 1));
        };
        loadNext(0);
      } else {
        // Legacy: full canvas JSON
        fabricCanvas.current.loadFromJSON(parsed, () => {
          fabricCanvas.current?.renderAll();
        });
      }
    } catch (e) {
      console.error('Error loading saved canvas:', e);
    }
    setSavedCanvasJson(null);
  }, [canvasInitialized, savedCanvasJson]);

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
    setCanvasInitialized(true);

    const syncLayers = () => {
      const objs: any[] = canvas.getObjects();
      setLayers([...objs].reverse().map((obj: any, idx: number) => ({
        uid: (obj.__uid as number) ?? idx,
        type: obj.type as string,
        label: obj.type === 'i-text' ? ((obj.text as string)?.substring(0, 20) || 'Text') :
               obj.type === 'rect' ? 'Obdélník' :
               obj.type === 'circle' ? 'Kruh' :
               obj.type === 'image' ? 'Obrázek' : (obj.type as string),
      })));
    };

    canvas.on('selection:created', (e: any) => { setSelected(e.selected?.[0] || null); });
    canvas.on('selection:updated', (e: any) => { setSelected(e.selected?.[0] || null); });
    canvas.on('selection:cleared', () => { setSelected(null); });
    canvas.on('object:added', syncLayers);
    canvas.on('object:removed', syncLayers);
    
    return () => {
      canvas.dispose();
      fabricCanvas.current = null;
      initialized.current = false;
      setCanvasInitialized(false);
    };
  }, [fabricLoaded, uid]);

  // Cursor-centered wheel zoom on canvas area
  useEffect(() => {
    const el = canvasAreaRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const zoomFactor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
      setCanvasTransform(prev => {
        const newScale = Math.max(0.05, Math.min(10, prev.scale * zoomFactor));
        const ratio = newScale / prev.scale;
        return {
          x: mouseX - (mouseX - prev.x) * ratio,
          y: mouseY - (mouseY - prev.y) * ratio,
          scale: newScale,
        };
      });
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // Space key for hand tool (Photoshop-like pan)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement)) {
        e.preventDefault();
        spacePressedRef.current = true;
        if (fabricCanvas.current) {
          fabricCanvas.current.selection = false;
          (fabricCanvas.current as any).skipTargetFind = true;
          fabricCanvas.current.defaultCursor = 'grab';
          fabricCanvas.current.hoverCursor = 'grab';
        }
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        spacePressedRef.current = false;
        if (fabricCanvas.current) {
          fabricCanvas.current.selection = true;
          (fabricCanvas.current as any).skipTargetFind = false;
          fabricCanvas.current.defaultCursor = 'default';
          fabricCanvas.current.hoverCursor = 'move';
        }
      }
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  // Center canvas when initialized or canvas size changes (skip if viewport was restored from DB)
  useEffect(() => {
    if (!canvasAreaRef.current || !canvasInitialized) return;
    if (viewportRestoredRef.current) {
      viewportRestoredRef.current = false;
      return;
    }
    const rect = canvasAreaRef.current.getBoundingClientRect();
    const padding = 60;
    const scale = Math.min(
      (rect.width - padding * 2) / canvasW,
      (rect.height - padding * 2) / canvasH,
      1
    );
    setCanvasTransform({
      x: (rect.width - canvasW * scale) / 2,
      y: (rect.height - canvasH * scale) / 2,
      scale,
    });
  }, [canvasW, canvasH, canvasInitialized]);

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

  // Sync selected object props to local state
  useEffect(() => {
    if (!selected) return;
    if (selected.type === 'i-text') {
      setTextFont(selected.fontFamily || 'Arial');
      setTextBold(selected.fontWeight === 'bold');
      setTextItalic(selected.fontStyle === 'italic');
      setTextSize(selected.fontSize || 48);
      setTextColor((selected.fill as string) || '#000000');
    }
    if (selected.type === 'rect' || selected.type === 'circle') {
      setShapeFill((selected.fill as string) || '#6366f1');
      setShapeStroke((selected.stroke as string) || '#4f46e5');
      setShapeStrokeWidth(selected.strokeWidth ?? 0);
      setShapeOpacity(Math.round((selected.opacity ?? 1) * 100));
    }
  }, [selected]);

  // Update layers order after bring/send operations
  const updateLayers = () => {
    if (!fabricCanvas.current) return;
    const objs: any[] = fabricCanvas.current.getObjects();
    setLayers([...objs].reverse().map((obj: any, idx: number) => ({
      uid: (obj.__uid as number) ?? idx,
      type: obj.type as string,
      label: obj.type === 'i-text' ? ((obj.text as string)?.substring(0, 20) || 'Text') :
             obj.type === 'rect' ? 'Obdélník' :
             obj.type === 'circle' ? 'Kruh' :
             obj.type === 'image' ? 'Obrázek' : (obj.type as string),
    })));
  };

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
        img.__uid = ++layerUid.current;
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
        img.__uid = ++layerUid.current;
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
    (text as any).__uid = ++layerUid.current;
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
      stroke: 'transparent',
      strokeWidth: 0,
    });
    (rect as any).__uid = ++layerUid.current;
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
      stroke: 'transparent',
      strokeWidth: 0,
    });
    (circle as any).__uid = ++layerUid.current;
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
    updateLayers();
  };

  const sendBackward = () => {
    if (!fabricCanvas.current || !selected) return;
    fabricCanvas.current.sendObjectBackwards(selected);
    fabricCanvas.current.renderAll();
    updateLayers();
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

  const saveCanvas = async () => {
    if (!fabricCanvas.current || !uid || !moodboardId || isSaving) return;
    setIsSaving(true);
    try {
      // Collect all fabric objects as individual JSON
      const objects = fabricCanvas.current.getObjects();
      const elements = objects.map((obj: any) => obj.toJSON(['__uid']));
      const canvasJson = JSON.stringify(fabricCanvas.current.toJSON());
      
      console.log(`Saving moodboard ${moodboardId}: ${elements.length} elements, bgColor=${bgColor}`);
      
      const res = await fetch(`/api/moodboards/${moodboardId}?userId=${uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          canvasJson,
          canvasWidth: canvasW,
          canvasHeight: canvasH,
          bgColor,
          elements,
          viewportX: canvasTransform.x,
          viewportY: canvasTransform.y,
          viewportScale: canvasTransform.scale,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log('Save response:', data);
        setLastSaved(new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }));
      } else {
        const errData = await res.text();
        console.error('Save failed:', res.status, errData);
      }
    } catch (e) {
      console.error('Save error:', e);
    } finally {
      setIsSaving(false);
    }
  };

  // Ctrl+S save
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveCanvas();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [uid, moodboardId, canvasW, canvasH, isSaving]);

  // Canvas area panning (middle-click, space+drag, or drag on background)
  const handleCanvasAreaMouseDown = (e: React.MouseEvent) => {
    const isBackground = e.target === canvasAreaRef.current;
    if (e.button === 1 || (e.button === 0 && spacePressedRef.current) || (e.button === 0 && isBackground)) {
      e.preventDefault();
      isPanning.current = true;
      lastPanPos.current = { x: e.clientX, y: e.clientY };
      if (canvasAreaRef.current) {
        canvasAreaRef.current.style.cursor = 'grabbing';
      }
    }
  };

  const handleCanvasAreaMouseMove = (e: React.MouseEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - lastPanPos.current.x;
    const dy = e.clientY - lastPanPos.current.y;
    lastPanPos.current = { x: e.clientX, y: e.clientY };
    setCanvasTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  };

  const handleCanvasAreaMouseUp = () => {
    if (isPanning.current && canvasAreaRef.current) {
      canvasAreaRef.current.style.cursor = spacePressedRef.current ? 'grab' : 'default';
    }
    isPanning.current = false;
  };

  // Mobile notice
  if (isMobile) {
    return (
      <div className="mobile-editor-notice">
        <div className="notice-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="2" width="14" height="20" rx="2"/>
            <line x1="12" y1="18" x2="12" y2="18.01"/>
          </svg>
        </div>
        <h2>Desktop nutný</h2>
        <p>Editor moodboardu je dostupný pouze na počítači nebo tabletu. Na mobilu ho bohužel nelze používat.</p>
        <Link href="/moodboard" className="notice-btn">← Zpět na moodboardy</Link>
      </div>
    );
  }

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
          <Link href="/moodboard" style={{ color: '#888', fontSize: 13, textDecoration: 'none' }}>← Zpět</Link>
        </div>

        <div style={styles.topbarGroup}>
          <span style={{ color: '#888', fontSize: 13 }}>Plátno:</span>
          <span style={{ color: '#e2e8f0', fontSize: 13, background: '#1a1a24', padding: '8px 14px', borderRadius: 8, border: '1px solid #333' }}>
            {canvasW} × {canvasH} px
          </span>
        </div>

        <div style={styles.topbarGroup}>
          <button onClick={() => setCanvasTransform(prev => {
            const newScale = Math.max(0.05, prev.scale / 1.2);
            const el = canvasAreaRef.current;
            if (!el) return { ...prev, scale: newScale };
            const rect = el.getBoundingClientRect();
            const cx = rect.width / 2, cy = rect.height / 2;
            const ratio = newScale / prev.scale;
            return { x: cx - (cx - prev.x) * ratio, y: cy - (cy - prev.y) * ratio, scale: newScale };
          })} style={styles.btn}>−</button>
          <span style={{ color: '#888', minWidth: 50, textAlign: 'center' }}>{Math.round(canvasTransform.scale * 100)}%</span>
          <button onClick={() => setCanvasTransform(prev => {
            const newScale = Math.min(10, prev.scale * 1.2);
            const el = canvasAreaRef.current;
            if (!el) return { ...prev, scale: newScale };
            const rect = el.getBoundingClientRect();
            const cx = rect.width / 2, cy = rect.height / 2;
            const ratio = newScale / prev.scale;
            return { x: cx - (cx - prev.x) * ratio, y: cy - (cy - prev.y) * ratio, scale: newScale };
          })} style={styles.btn}>+</button>
        </div>

        <div style={styles.topbarGroup}>
          {lastSaved && (
            <span style={{ color: '#555', fontSize: 12 }}>Uloženo {lastSaved}</span>
          )}
          <button onClick={saveCanvas} disabled={isSaving} style={{ ...styles.exportBtn, background: isSaving ? '#444' : '#684d89' }}>
            {isSaving ? 'Ukládám...' : 'Uložit'}
          </button>
          <button onClick={exportPNG} style={styles.exportBtn}>
            Export PNG
          </button>
        </div>
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
            <h3 style={styles.sidebarTitle}>Přidat prvky</h3>
            <label style={styles.uploadBtn}>
              <input type="file" accept="image/*" onChange={addImage} hidden />
              Nahrat obrazek
            </label>
            <button onClick={addText} style={styles.toolBtn}>T  Text</button>
            <button onClick={addRect} style={styles.toolBtn}>□  Obdélník</button>
            <button onClick={addCircle} style={styles.toolBtn}>○  Kruh</button>
          </div>

          {layers.length > 0 && (
            <div style={styles.sidebarSection}>
              <h3 style={styles.sidebarTitle}>Vrstvy ({layers.length})</h3>
              {layers.map((layer, i) => (
                <div
                  key={`${layer.uid}-${i}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '7px 10px',
                    borderRadius: 6,
                    marginBottom: 4,
                    background: selected?.__uid === layer.uid ? 'rgba(104,77,137,0.25)' : 'transparent',
                    border: `1px solid ${selected?.__uid === layer.uid ? '#684d89' : '#2a2a3a'}`,
                    cursor: 'pointer',
                    fontSize: 13,
                    color: '#e2e8f0',
                    transition: 'all 0.15s',
                  }}
                  onClick={() => {
                    if (!fabricCanvas.current) return;
                    const objs = fabricCanvas.current.getObjects();
                    const obj = objs.find((o: any) => o.__uid === layer.uid);
                    if (obj) {
                      fabricCanvas.current.setActiveObject(obj);
                      fabricCanvas.current.renderAll();
                      setSelected(obj);
                    }
                  }}
                >
                  <span style={{ minWidth: 18, textAlign: 'center', fontSize: 14, opacity: 0.8 }}>
                    {layer.type === 'i-text' ? 'T' : layer.type === 'rect' ? '□' : layer.type === 'circle' ? '○' : '🖼'}
                  </span>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>
                    {layer.label}
                  </span>
                  <span style={{ fontSize: 10, color: '#555' }}>{i + 1}</span>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* CANVAS AREA — Photoshop-like infinite canvas with transform-based pan/zoom */}
        <main
          ref={canvasAreaRef}
          style={styles.canvasArea}
          onMouseDown={handleCanvasAreaMouseDown}
          onMouseMove={handleCanvasAreaMouseMove}
          onMouseUp={handleCanvasAreaMouseUp}
          onMouseLeave={handleCanvasAreaMouseUp}
        >
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate(${canvasTransform.x}px, ${canvasTransform.y}px) scale(${canvasTransform.scale})`,
            transformOrigin: '0 0',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
            borderRadius: 4,
            willChange: 'transform',
          }}>
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

                  <label style={styles.label}>Font</label>
                  <select
                    value={textFont}
                    style={{ ...styles.select, width: '100%', marginBottom: 10 }}
                    onChange={(e) => {
                      setTextFont(e.target.value);
                      selected.set('fontFamily', e.target.value);
                      fabricCanvas.current?.renderAll();
                    }}
                  >
                    <optgroup label="Systémové fonty">
                      {['Arial', 'Georgia', 'Verdana', 'Tahoma', 'Courier New', 'Times New Roman', 'Impact', 'Trebuchet MS'].map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </optgroup>
                    {dbFonts.length > 0 && (
                      <optgroup label="Fonty z databáze">
                        {dbFonts.map(f => (
                          <option key={f.id} value={f.name}>{f.name}</option>
                        ))}
                      </optgroup>
                    )}
                  </select>

                  <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                    <button
                      title="Tučné"
                      style={{ ...styles.btn, flex: 1, fontWeight: 'bold', fontSize: 15, background: textBold ? '#684d89' : '#1a1a24', borderColor: textBold ? '#684d89' : '#333' }}
                      onClick={() => {
                        const next = !textBold;
                        setTextBold(next);
                        selected.set('fontWeight', next ? 'bold' : 'normal');
                        fabricCanvas.current?.renderAll();
                      }}
                    >B</button>
                    <button
                      title="Kurzíva"
                      style={{ ...styles.btn, flex: 1, fontStyle: 'italic', fontSize: 15, background: textItalic ? '#684d89' : '#1a1a24', borderColor: textItalic ? '#684d89' : '#333' }}
                      onClick={() => {
                        const next = !textItalic;
                        setTextItalic(next);
                        selected.set('fontStyle', next ? 'italic' : 'normal');
                        fabricCanvas.current?.renderAll();
                      }}
                    >I</button>
                  </div>

                  <label style={styles.label}>Velikost (px)</label>
                  <input
                    type="number"
                    value={textSize}
                    min={8}
                    max={300}
                    style={styles.numInput}
                    onChange={(e) => {
                      const v = parseInt(e.target.value) || 48;
                      setTextSize(v);
                      selected.set('fontSize', v);
                      fabricCanvas.current?.renderAll();
                    }}
                  />
                  <label style={styles.label}>Barva</label>
                  <input
                    type="color"
                    value={textColor}
                    style={styles.colorPicker}
                    onChange={(e) => {
                      setTextColor(e.target.value);
                      selected.set('fill', e.target.value);
                      fabricCanvas.current?.renderAll();
                    }}
                  />
                </div>
              )}

              {(selected.type === 'rect' || selected.type === 'circle') && (
                <div style={{ marginTop: 16 }}>
                  <h3 style={styles.sidebarTitle}>Tvar</h3>
                  <label style={styles.label}>Výplně</label>
                  <input
                    type="color"
                    value={shapeFill}
                    style={styles.colorPicker}
                    onChange={(e) => {
                      setShapeFill(e.target.value);
                      selected.set('fill', e.target.value);
                      fabricCanvas.current?.renderAll();
                    }}
                  />

                  <label style={styles.label}>Barva ohračení</label>
                  <input
                    type="color"
                    value={shapeStroke === 'transparent' ? '#9872c7' : shapeStroke}
                    style={styles.colorPicker}
                    onChange={(e) => {
                      setShapeStroke(e.target.value);
                      selected.set('stroke', e.target.value);
                      if (selected.strokeWidth === 0) {
                        setShapeStrokeWidth(2);
                        selected.set('strokeWidth', 2);
                      }
                      fabricCanvas.current?.renderAll();
                    }}
                  />

                  <label style={styles.label}>Tloušťka ohraničení: {shapeStrokeWidth}px</label>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    value={shapeStrokeWidth}
                    style={{ width: '100%', marginBottom: 12 }}
                    onChange={(e) => {
                      const v = parseInt(e.target.value);
                      setShapeStrokeWidth(v);
                      selected.set('strokeWidth', v);
                      fabricCanvas.current?.renderAll();
                    }}
                  />

                  <label style={styles.label}>Průhlednost: {shapeOpacity}%</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={shapeOpacity}
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      const v = parseInt(e.target.value);
                      setShapeOpacity(v);
                      selected.set('opacity', v / 100);
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

export default function EditorPage() {
  return (
    <Suspense>
      <EditorPageContent />
    </Suspense>
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
    background: '#684d89',
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
    background: '#684d89',
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
    position: 'relative' as const,
    background: '#1a1a2e',
    backgroundImage: 'radial-gradient(circle, #2a2a4a 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    overflow: 'hidden',
    cursor: 'default',
  },
};