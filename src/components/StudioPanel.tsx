import React from "react";
import { Sliders, Upload, RotateCcw, Save, Trash2, X, Sparkles, Eye, Image as ImageIcon } from "lucide-react";

interface StudioPanelProps {
  isOpen: boolean;
  onClose: () => void;

  // Hero Image
  img1X: number;
  setImg1X: (val: number) => void;
  img1Y: number;
  setImg1Y: (val: number) => void;
  img1Scale: number;
  setImg1Scale: (val: number) => void;
  img1Brightness: number;
  setImg1Brightness: (val: number) => void;
  img1Contrast: number;
  setImg1Contrast: (val: number) => void;
  uploadedImage1: string | null;
  setUploadedImage1: (val: string | null) => void;
  setHeroImageSource: (val: string) => void;
  fallbackUrl1: string;

  // Hero Name Text
  textX: number;
  setTextX: (val: number) => void;
  textY: number;
  setTextY: (val: number) => void;
  textScale: number;
  setTextScale: (val: number) => void;

  // Bio Image
  img2X: number;
  setImg2X: (val: number) => void;
  img2Y: number;
  setImg2Y: (val: number) => void;
  img2Scale: number;
  setImg2Scale: (val: number) => void;
  img2Brightness: number;
  setImg2Brightness: (val: number) => void;
  img2Contrast: number;
  setImg2Contrast: (val: number) => void;
  uploadedImage2: string | null;
  setUploadedImage2: (val: string | null) => void;
  fallbackUrl2: string;
}

const compressAndSaveImage = (base64Str: string, callback: (compressed: string) => void) => {
  // If baseline base64 is already small (e.g. < 500kb), skip canvas processing to preserve pristine resolution.
  if (base64Str.length < 500000) {
    callback(base64Str);
    return;
  }
  
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const MAX_WIDTH = 1000;
    const MAX_HEIGHT = 1000;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      try {
        // Preserves transparency of model's background
        const compressedData = canvas.toDataURL("image/png");
        callback(compressedData);
      } catch (e) {
        callback(base64Str);
      }
    } else {
      callback(base64Str);
    }
  };
  img.onerror = () => {
    callback(base64Str);
  };
  img.src = base64Str;
};

export default function StudioPanel({
  isOpen,
  onClose,

  // Hero Image
  img1X,
  setImg1X,
  img1Y,
  setImg1Y,
  img1Scale,
  setImg1Scale,
  img1Brightness,
  setImg1Brightness,
  img1Contrast,
  setImg1Contrast,
  uploadedImage1,
  setUploadedImage1,
  setHeroImageSource,
  fallbackUrl1,

  // Hero Name
  textX,
  setTextX,
  textY,
  setTextY,
  textScale,
  setTextScale,

  // Bio Image
  img2X,
  setImg2X,
  img2Y,
  setImg2Y,
  img2Scale,
  setImg2Scale,
  img2Brightness,
  setImg2Brightness,
  img2Contrast,
  setImg2Contrast,
  uploadedImage2,
  setUploadedImage2,
  fallbackUrl2,
}: StudioPanelProps) {
  const [activeTab, setActiveTab] = React.useState<"hero" | "text" | "bio">("hero");
  const [showSaveAlert, setShowSaveAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleHeroPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        compressAndSaveImage(base64Data, (compressed) => {
          setUploadedImage1(compressed);
          setHeroImageSource(compressed);
          try {
            localStorage.setItem("stuckey_s1_img", compressed);
            setErrorMessage(null);
          } catch (err) {
            console.error("Quota storage exceeded when storing hero image", err);
            setErrorMessage("A imagem é muito grande para guardar no navegador. Tente carregar uma foto menor ou mais leve.");
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearHeroPhoto = () => {
    setUploadedImage1(null);
    setHeroImageSource(fallbackUrl1);
    try {
      localStorage.removeItem("stuckey_s1_img");
    } catch (_) {}
  };

  const handleBioPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        compressAndSaveImage(base64Data, (compressed) => {
          setUploadedImage2(compressed);
          try {
            localStorage.setItem("stuckey_s2_img", compressed);
            setErrorMessage(null);
          } catch (err) {
            console.error("Quota storage exceeded when storing bio image", err);
            setErrorMessage("A imagem de biografia é muito grande. Tente carregar uma foto menor ou mais leve.");
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearBioPhoto = () => {
    setUploadedImage2(null);
    try {
      localStorage.removeItem("stuckey_s2_img");
    } catch (_) {}
  };

  const handleSaveAll = () => {
    try {
      // Save Hero Photo Settings
      localStorage.setItem("stuckey_s1_x", img1X.toString());
      localStorage.setItem("stuckey_s1_y", img1Y.toString());
      localStorage.setItem("stuckey_s1_scale", img1Scale.toString());
      localStorage.setItem("stuckey_s1_brightness", img1Brightness.toString());
      localStorage.setItem("stuckey_s1_contrast", img1Contrast.toString());

      // Save Text Settings
      localStorage.setItem("stuckey_text_x", textX.toString());
      localStorage.setItem("stuckey_text_y", textY.toString());
      localStorage.setItem("stuckey_text_scale", textScale.toString());

      // Save Bio Photo Settings
      localStorage.setItem("stuckey_s2_x", img2X.toString());
      localStorage.setItem("stuckey_s2_y", img2Y.toString());
      localStorage.setItem("stuckey_s2_scale", img2Scale.toString());
      localStorage.setItem("stuckey_s2_brightness", img2Brightness.toString());
      localStorage.setItem("stuckey_s2_contrast", img2Contrast.toString());

      setShowSaveAlert(true);
      setErrorMessage(null);
      setTimeout(() => {
        setShowSaveAlert(false);
      }, 3000);
    } catch (err) {
      console.error("Error saving configurations to local storage", err);
      setErrorMessage("Erro ao guardar dados no navegador. Verifique se o modo anônimo está desativado.");
    }
  };

  const handleResetCurrentTab = () => {
    if (activeTab === "hero") {
      setImg1X(0);
      setImg1Y(0);
      setImg1Scale(100);
      setImg1Brightness(100);
      setImg1Contrast(100);
    } else if (activeTab === "text") {
      setTextX(0);
      setTextY(0);
      setTextScale(100);
    } else if (activeTab === "bio") {
      setImg2X(0);
      setImg2Y(20);
      setImg2Scale(115);
      setImg2Brightness(100);
      setImg2Contrast(100);
    }
  };

  return (
    <div id="studio-editor-overlay" className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm transition-all duration-300">
      <div 
        id="studio-editor-container"
        className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[680px] animate-in slide-in-from-bottom duration-300"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-stone-800 px-6 py-4.5 bg-stone-900">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#cbd133]" />
            <h2 className="font-sans font-black text-lg text-white uppercase tracking-wider">
              Estúdio de Criação
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* CONTROLS AREA CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          
          {/* TAB BAR SELECTOR */}
          <div className="flex bg-stone-950/60 p-1.5 rounded-2xl border border-stone-800/80">
            <button
              onClick={() => setActiveTab("hero")}
              className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                activeTab === "hero" 
                ? "bg-[#cbd133] text-stone-950" 
                : "text-stone-400 hover:text-white"
              }`}
            >
              Foto do Hero
            </button>
            <button
              onClick={() => setActiveTab("text")}
              className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                activeTab === "text" 
                ? "bg-[#cbd133] text-stone-950" 
                : "text-stone-400 hover:text-white"
              }`}
            >
              Nome Michael
            </button>
            <button
              onClick={() => setActiveTab("bio")}
              className={`flex-1 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                activeTab === "bio" 
                ? "bg-[#cbd133] text-stone-950" 
                : "text-stone-400 hover:text-white"
              }`}
            >
              Foto da Bio
            </button>
          </div>

          {/* TAB 1: HERO PHOTO CONTROLS */}
          {activeTab === "hero" && (
            <div className="space-y-5">
              {/* Image Upload Block */}
              <div className="space-y-2">
                <label className="text-xs font-black text-amber-400 uppercase tracking-widest block">
                  Foto Transparente (Original)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-stone-950 hover:bg-stone-950/80 border border-stone-800 rounded-2xl cursor-pointer text-sm font-semibold hover:text-[#cbd133] transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Selecionar e Carregar Foto</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleHeroPhotoUpload}
                      className="hidden" 
                    />
                  </label>
                  {uploadedImage1 && (
                    <button 
                      onClick={clearHeroPhoto}
                      className="p-3 bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-900/40 rounded-2xl transition-colors"
                      title="Excluir Foto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <p className="text-[10px] font-mono text-stone-500 leading-tight">
                  Selecione seu arquivo transparente, eg. <code className="text-[#cbd133]">file_000000005ec071f98c95ce7d8f9fa86c.png</code> de sua galeria.
                </p>
              </div>

              {/* SLIDERS */}
              <div className="space-y-4 pt-2 border-t border-stone-800/60">
                {/* Scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Escala (Zoom)</span>
                    <span className="text-[#cbd133] font-bold">{img1Scale}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="250" 
                    value={img1Scale} 
                    onChange={(e) => setImg1Scale(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>

                {/* Translate X */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Posição Horizontal (X)</span>
                    <span className="text-[#cbd133] font-bold">{img1X}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="-300" 
                    max="300" 
                    value={img1X} 
                    onChange={(e) => setImg1X(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>

                {/* Translate Y */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Posição Vertical (Y)</span>
                    <span className="text-[#cbd133] font-bold">{img1Y}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="-300" 
                    max="300" 
                    value={img1Y} 
                    onChange={(e) => setImg1Y(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>

                {/* Brightness */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Brilho</span>
                    <span className="text-[#cbd133] font-bold">{img1Brightness}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="150" 
                    value={img1Brightness} 
                    onChange={(e) => setImg1Brightness(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>

                {/* Contrast */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Contraste</span>
                    <span className="text-[#cbd133] font-bold">{img1Contrast}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="150" 
                    value={img1Contrast} 
                    onChange={(e) => setImg1Contrast(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO TEXT NAME CONTROLS */}
          {activeTab === "text" && (
            <div className="space-y-5">
              <p className="text-xs text-stone-400 font-serif leading-relaxed">
                Ajuste o posicionamento do texto metálico de "MICHAEL STUCKEY" sobre a seção amarela para ficar exatamente alinhado com sua foto editada.
              </p>

              {/* SLIDERS */}
              <div className="space-y-4 pt-2 border-t border-stone-800/60">
                {/* Scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Escala de Fonte</span>
                    <span className="text-[#cbd133] font-bold">{textScale}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="40" 
                    max="180" 
                    value={textScale} 
                    onChange={(e) => setTextScale(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>

                {/* Translate X */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Posição Horizontal (X)</span>
                    <span className="text-[#cbd133] font-bold">{textX}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="-200" 
                    max="200" 
                    value={textX} 
                    onChange={(e) => setTextX(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>

                {/* Translate Y */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Posição Vertical (Y)</span>
                    <span className="text-[#cbd133] font-bold">{textY}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="-200" 
                    max="200" 
                    value={textY} 
                    onChange={(e) => setTextY(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BIO PHOTO CONTROLS */}
          {activeTab === "bio" && (
            <div className="space-y-5">
              {/* Bio Image Upload */}
              <div className="space-y-2">
                <label className="text-xs font-black text-amber-400 uppercase tracking-widest block">
                  Foto Transparente da Biografia
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-stone-950 hover:bg-stone-950/80 border border-stone-800 rounded-2xl cursor-pointer text-sm font-semibold hover:text-[#cbd133] transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Carregar Foto da Bio</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleBioPhotoUpload}
                      className="hidden" 
                    />
                  </label>
                  {uploadedImage2 && (
                    <button 
                      onClick={clearBioPhoto}
                      className="p-3 bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-900/40 rounded-2xl transition-colors"
                      title="Excluir Foto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* SLIDERS */}
              <div className="space-y-4 pt-2 border-t border-stone-800/60">
                {/* Scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Escala (Zoom)</span>
                    <span className="text-[#cbd133] font-bold">{img2Scale}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="250" 
                    value={img2Scale} 
                    onChange={(e) => setImg2Scale(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>

                {/* Translate X */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Posição Horizontal (X)</span>
                    <span className="text-[#cbd133] font-bold">{img2X}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="-200" 
                    max="200" 
                    value={img2X} 
                    onChange={(e) => setImg2X(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>

                {/* Translate Y */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Posição Vertical (Y)</span>
                    <span className="text-[#cbd133] font-bold">{img2Y}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="-200" 
                    max="200" 
                    value={img2Y} 
                    onChange={(e) => setImg2Y(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>

                {/* Brightness */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Brilho</span>
                    <span className="text-[#cbd133] font-bold">{img2Brightness}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="150" 
                    value={img2Brightness} 
                    onChange={(e) => setImg2Brightness(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>

                {/* Contrast */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-400">Contraste</span>
                    <span className="text-[#cbd133] font-bold">{img2Contrast}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="150" 
                    value={img2Contrast} 
                    onChange={(e) => setImg2Contrast(parseInt(e.target.value))} 
                    className="w-full accent-[#cbd133]"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* FEEDBACK BLOCK */}
        {showSaveAlert && (
          <div className="bg-emerald-950/80 border-t border-emerald-900 px-6 py-2.5 flex items-center justify-center gap-2">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest animate-pulse">
              ✓ Configurações Salvas com Sucesso!
            </span>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-955/80 border-t border-red-900 px-6 py-2.5 flex items-center justify-center gap-2">
            <span className="text-xs font-black text-red-400 uppercase tracking-wide text-center">
              ⚠ {errorMessage}
            </span>
          </div>
        )}

        {/* BOTTOM ACTION BUTTONS */}
        <div className="border-t border-stone-800 bg-stone-900/40 p-6 flex gap-3">
          <button
            onClick={handleResetCurrentTab}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-stone-800 hover:bg-stone-750 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Zerar Valores</span>
          </button>
          
          <button
            onClick={handleSaveAll}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#cbd133] hover:bg-[#b0be28] text-stone-950 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
          >
            <Save className="h-4 w-4" />
            <span>Salvar Tudo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
