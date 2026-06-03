import React, { useEffect, useState } from "react";
import { Sliders } from "lucide-react";
import StudioPanel from "./components/StudioPanel";

// Fallback high-fidelity portrait of Michael Stuckey (actual Good Times album cover).
const FALLBACK_MODEL_URL = "https://i.scdn.co/image/ab67616d0000b273ec813baba3240ebc727aade6";
const LOCAL_ASSET_URL = "/file_000000005ec071f98c95ce7d8f9fa86c.png";

export default function App() {
  const [showStudio, setShowStudio] = useState<boolean>(false);

  // Section 1: Hero Settings (Photo)
  const [img1X, setImg1X] = useState<number>(0);
  const [img1Y, setImg1Y] = useState<number>(0);
  const [img1Scale, setImg1Scale] = useState<number>(100);
  const [img1Brightness, setImg1Brightness] = useState<number>(100);
  const [img1Contrast, setImg1Contrast] = useState<number>(100);
  const [uploadedImage1, setUploadedImage1] = useState<string | null>(null);
  const [heroImageSource, setHeroImageSource] = useState<string>(FALLBACK_MODEL_URL);

  // New Hero Settings (Text)
  const [textX, setTextX] = useState<number>(0);
  const [textY, setTextY] = useState<number>(0);
  const [textScale, setTextScale] = useState<number>(100);

  // Section 2: Bio Settings
  const [img2X, setImg2X] = useState<number>(0);
  const [img2Y, setImg2Y] = useState<number>(20);
  const [img2Scale, setImg2Scale] = useState<number>(115);
  const [img2Brightness, setImg2Brightness] = useState<number>(100);
  const [img2Contrast, setImg2Contrast] = useState<number>(100);
  const [uploadedImage2, setUploadedImage2] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load persistent configurations
  useEffect(() => {
    try {
      // Section 1: Photo Settings
      const s1Img = localStorage.getItem("stuckey_s1_img");
      if (s1Img) {
        setUploadedImage1(s1Img);
        setHeroImageSource(s1Img);
      } else {
        setHeroImageSource(LOCAL_ASSET_URL);
      }
      const s1X = localStorage.getItem("stuckey_s1_x");
      const s1Y = localStorage.getItem("stuckey_s1_y");
      const s1Scale = localStorage.getItem("stuckey_s1_scale");
      if (s1X) setImg1X(parseInt(s1X));
      if (s1Y) setImg1Y(parseInt(s1Y));
      if (s1Scale) setImg1Scale(parseInt(s1Scale));

      const s1Bright = localStorage.getItem("stuckey_s1_brightness");
      const s1Contra = localStorage.getItem("stuckey_s1_contrast");
      if (s1Bright) setImg1Brightness(parseInt(s1Bright));
      if (s1Contra) setImg1Contrast(parseInt(s1Contra));

      // Section 1: Text Settings
      const tX = localStorage.getItem("stuckey_text_x");
      const tY = localStorage.getItem("stuckey_text_y");
      const tScale = localStorage.getItem("stuckey_text_scale");
      if (tX) setTextX(parseInt(tX));
      if (tY) setTextY(parseInt(tY));
      if (tScale) setTextScale(parseInt(tScale));

      // Section 2: Bio Settings
      const s2Img = localStorage.getItem("stuckey_s2_img");
      if (s2Img) setUploadedImage2(s2Img);
      const s2X = localStorage.getItem("stuckey_s2_x");
      const s2Y = localStorage.getItem("stuckey_s2_y");
      const s2Scale = localStorage.getItem("stuckey_s2_scale");
      if (s2X) setImg2X(parseInt(s2X));
      if (s2Y) setImg2Y(parseInt(s2Y));
      if (s2Scale) setImg2Scale(parseInt(s2Scale));

      const s2Bright = localStorage.getItem("stuckey_s2_brightness");
      const s2Contra = localStorage.getItem("stuckey_s2_contrast");
      if (s2Bright) setImg2Brightness(parseInt(s2Bright));
      if (s2Contra) setImg2Contrast(parseInt(s2Contra));
    } catch (e) {
      console.warn("Could not read from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Safe reactive auto-save to localStorage (runs on every slider adjustment)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("stuckey_s1_x", img1X.toString());
      localStorage.setItem("stuckey_s1_y", img1Y.toString());
      localStorage.setItem("stuckey_s1_scale", img1Scale.toString());
      localStorage.setItem("stuckey_s1_brightness", img1Brightness.toString());
      localStorage.setItem("stuckey_s1_contrast", img1Contrast.toString());

      localStorage.setItem("stuckey_text_x", textX.toString());
      localStorage.setItem("stuckey_text_y", textY.toString());
      localStorage.setItem("stuckey_text_scale", textScale.toString());

      localStorage.setItem("stuckey_s2_x", img2X.toString());
      localStorage.setItem("stuckey_s2_y", img2Y.toString());
      localStorage.setItem("stuckey_s2_scale", img2Scale.toString());
      localStorage.setItem("stuckey_s2_brightness", img2Brightness.toString());
      localStorage.setItem("stuckey_s2_contrast", img2Contrast.toString());
    } catch (e) {
      console.warn("Could not auto-save to localStorage:", e);
    }
  }, [
    isLoaded,
    img1X,
    img1Y,
    img1Scale,
    img1Brightness,
    img1Contrast,
    textX,
    textY,
    textScale,
    img2X,
    img2Y,
    img2Scale,
    img2Brightness,
    img2Contrast,
  ]);


  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-start relative selection:bg-[#cbd133] selection:text-stone-900 overflow-x-hidden pt-12 md:pt-16 pb-12">
      
      {/* ==================== SEÇÃO 1: HERO WEB ==================== */}
      <section className="w-full max-w-6xl px-4 sm:px-6 md:px-8 mb-20 md:mb-28 relative">
        <div id="official-stuckey-hero" className="w-full rounded-[36px] overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl flex flex-col relative">
          
          {/* LIME-YELLOW TOP ROW */}
          <div className="w-full bg-[#cbd133] pt-12 pb-6 px-6 sm:px-10 md:px-14 flex flex-col justify-between relative overflow-hidden min-h-[460px] md:min-h-[500px]">
            {/* Soft backdrop vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            {/* MODEL PHOTO - DESIGNED NOT TO BE CUT OFF AT THE TOP */}
            <div className="absolute inset-0 z-10 flex items-end justify-center overflow-visible pointer-events-none mt-2">
              <div 
                className="w-full h-full relative transition-all duration-300 ease-out flex items-end justify-center overflow-visible"
                style={{
                  transform: `translate(${img1X}px, ${img1Y}px) scale(${img1Scale / 100})`,
                }}
              >
                <img 
                  src={heroImageSource} 
                  alt="Michael Stuckey" 
                  className="max-h-[110%] w-auto object-contain object-bottom pointer-events-none"
                  style={{ filter: `brightness(${img1Brightness}%) contrast(${img1Contrast}%)` }}
                  onError={() => {
                    if (heroImageSource !== FALLBACK_MODEL_URL) {
                      setHeroImageSource(FALLBACK_MODEL_URL);
                    }
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* MICHAEL STUCKEY HEADER TEXT - POSITIONED DYNAMICALLY IN THE YELLOW AREA */}
            <div 
              className="absolute z-20 flex flex-col items-center justify-center text-center select-none cursor-default transition-all duration-300 ease-out"
              style={{
                bottom: "34px",
                left: "50%",
                transform: `translate(calc(-50% + ${textX}px), ${textY}px) scale(${textScale / 100})`,
                transformOrigin: "bottom center",
              }}
            >
              {/* Giant "MICHAEL" in Metallic Chrome */}
              <h2 className="chrome-text text-[3.8rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[7.2rem] text-center uppercase tracking-tight leading-none pointer-events-none">
                MICHAEL
              </h2>
              {/* Giant "STUCKEY" below */}
              <h3 className="font-sans font-black text-[3rem] sm:text-[4rem] md:text-[5.4rem] lg:text-[6rem] text-white tracking-[0.1em] uppercase leading-none -mt-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] pointer-events-none">
                STUCKEY
              </h3>
            </div>
            
            {/* Decorative layout alignment element to complete the hero card aspect */}
            <div className="relative z-20 w-full mt-auto flex justify-between items-end border-b border-stone-950/10 pb-4">
            </div>
          </div>

          {/* BOTTOM DEEP PURPLE CONTAINER - FULLY NATURAL FLOW (NO SCROLLBAR) */}
          <div 
            className="w-full bg-gradient-to-b from-[#2e003c] to-[#15011c] px-6 py-10 sm:px-12 sm:py-14 md:px-16 md:py-16 relative flex flex-col justify-center"
            style={{
              clipPath: "polygon(0 4vw, 100% 0, 100% 100%, 0 100%)",
              marginTop: "-3vw"
            }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-purple-950/10 pointer-events-none mix-blend-overlay" />

            {/* Quotes container - Flows directly without internal scrollbars */}
            <div className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 pt-4 text-center md:text-left">
              
              {/* Quote 1 */}
              <div className="flex flex-col justify-between space-y-4">
                <p className="text-white text-[15px] sm:text-[17.5px] italic font-serif leading-relaxed tracking-wide">
                  "Michael has that unique something in his voice that sets him apart. -"
                </p>
                <p className="text-[11px] font-mono font-black text-amber-400 tracking-wider uppercase mt-auto">
                  - Vicki Lataillade, Gospel Music Mogul
                </p>
              </div>

              {/* Quote 2 */}
              <div className="flex flex-col justify-between space-y-4 border-t md:border-t-0 md:border-l border-purple-950/40 pt-6 md:pt-0 md:pl-6 lg:pl-8">
                <p className="text-white text-[15px] sm:text-[17.5px] italic font-serif leading-relaxed tracking-wide">
                  "..... This is a feel-good song that I will play because I like it".
                </p>
                <p className="text-[11px] font-mono font-black text-amber-400 tracking-wider uppercase mt-auto">
                  - Willie Mae McIver, CEO & President at COVENANT MEDIA GROUP
                </p>
              </div>

              {/* Quote 3 */}
              <div className="flex flex-col justify-between space-y-4 border-t md:border-t-0 md:border-l border-purple-950/40 pt-6 md:pt-0 md:pl-6 lg:pl-8">
                <p className="text-white text-[15px] sm:text-[17.5px] italic font-serif leading-relaxed tracking-wide">
                  "..... you have the talent, skill set and demeanor to make a major impact on the Gospel and the music community at large."
                </p>
                <p className="text-[11px] font-mono font-black text-amber-400 tracking-wider uppercase mt-auto">
                  - Attorney, Kendall Minter, Minter & Associates
                </p>
              </div>

            </div>
          </div>


        </div>



      </section>




      {/* ==================== SEÇÃO 2: BIOGRAFIA & VISÃO ==================== */}
      <section className="w-full max-w-6xl px-4 sm:px-6 md:px-8 relative">
        <div id="official-stuckey-bio" className="w-full rounded-[36px] overflow-hidden border border-stone-800 bg-[#cbd133] shadow-2xl flex flex-col relative text-stone-950">
          
          {/* MAIN TWO-COLUMN CONTENT GRID */}
          <div className="w-full px-6 py-12 sm:px-10 sm:py-16 md:px-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative z-10">
            
            {/* COLUMN 1: MODEL PORTRAIT & BIOGRAPHIC GRAPHIC */}
            <div className="md:col-span-5 flex flex-col justify-start relative">
              
              {/* Styled portrait frame matching image layout */}
              <div className="w-full aspect-[4/5] bg-stone-950/10 rounded-2xl border border-stone-950/10 relative overflow-hidden backdrop-blur-[1px] min-h-[380px]">
                
                {/* Slanted Dark Purple background elements inside the avatar border */}
                <div 
                  className="absolute inset-x-0 bottom-12 h-20 bg-[#2e003c] z-10 opacity-95 flex items-center justify-center transform -rotate-12 scale-110 shadow-lg border-y-2 border-stone-950/20"
                >
                  <span className="text-white/20 font-sans font-black tracking-widest text-[13px] uppercase select-none">
                    STUCKEY BIO
                  </span>
                </div>

                {/* THE MODEL PICTURE */}
                <div className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none overflow-visible">
                  <div 
                    className="w-full h-full relative transition-all duration-300 ease-out flex items-end justify-center overflow-visible"
                    style={{
                      transform: `translate(${img2X}px, ${img2Y}px) scale(${img2Scale / 100})`,
                    }}
                  >
                    {uploadedImage2 ? (
                      <img 
                        src={uploadedImage2} 
                        alt="Michael Stuckey Cutout" 
                        className="max-h-[110%] w-auto object-contain object-bottom pointer-events-none"
                        style={{ filter: `brightness(${img2Brightness}%) contrast(${img2Contrast}%)` }}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <img 
                        src={FALLBACK_MODEL_URL} 
                        alt="Michael Stuckey" 
                        className="max-h-[100%] w-auto object-contain object-bottom pointer-events-none"
                        style={{ filter: `brightness(${img2Brightness}%) contrast(${img2Contrast}%)` }}
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                </div>

              </div>

              {/* Decorative signature below the avatar */}
              <div className="mt-4 flex justify-between items-center px-1 font-mono text-[10px] uppercase tracking-wider text-stone-800 font-bold">
                <span>Cincinnati, OH</span>
                <span>U.S. Gospel Music</span>
              </div>
            </div>

            {/* COLUMN 2: BIO TEXT & WATERMARKS */}
            <div className="md:col-span-7 flex flex-col justify-start">
              
              {/* Header block with massive integrated typeface: "MICHAELSTUCKEY" */}
              <div className="flex flex-col sm:flex-row items-baseline justify-start gap-1 sm:gap-2 mb-8 select-none">
                <span className="font-sans font-black text-4xl sm:text-5xl md:text-6xl text-[#2e003c] tracking-tighter uppercase">
                  MICHAEL
                </span>
                <span className="font-sans font-black text-3.5xl sm:text-4.5xl md:text-5.5xl text-stone-100 tracking-[0.11em] uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,0.95)]">
                  STUCKEY
                </span>
              </div>

              {/* Beautiful fully responsive story flow */}
              <div className="space-y-6 text-stone-900 font-serif text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed tracking-wide font-medium">
                
                {/* Paragraph 1 */}
                <p className="border-l-3 border-[#2e003c] pl-4 italic">
                  Gospel’s newest contemporary artist, Michael Stuckey, has a classic sound with some <strong>“old school swag”</strong>. His music is set to take radio by storm! Tracks such as, “Good Times, “Promises of God” and “Father/Agnus Dei” are just a few numbers set to blaze the world.
                </p>

                {/* Paragraph 2 */}
                <p>
                  Hailing from Cincinnati, OH, Stuckey (as he is affectionately known) is a former lead singer for Stellar Award winner, Ricky Dillard & New G, being featured on “The Sweetest Name” with Grammy Award winner, Karen Clark-Sheard. Stuckey also formerly served as manager for the three-time GMA winning group, Isaac Simpson & DP and is currently founder/CEO of the Canadian Glass Awards.
                </p>

                {/* Paragraph 3 */}
                <p>
                  Moving into a new season of life, ministry, and music, Stuckey was lead by God to venture into the music industry as a solo artist. Stuckey’s sound is one given by God and birthed through his worship and personal time. His vocal range and power is captivating yet unique.
                </p>

                {/* Paragraph 4 - Callout Box with purple accent */}
                <div className="bg-[#2e003c] text-white p-5 rounded-2xl shadow-lg border border-purple-900 relative overflow-hidden mt-8 transform hover:scale-[1.01] transition-transform duration-200">
                  <div className="absolute right-3 bottom-1 text-white/5 font-serif font-black text-5xl">”</div>
                  <p className="font-serif italic text-[13px] sm:text-[15px] leading-relaxed relative z-10 text-stone-100">
                    Stuckey conveys to listeners, “In this season, you will learn how God brings you to a set place. That “baby” you’ve been carrying will soon be birthed. This is your birthing moment. Every song was written from that place, reminding us Who and Who’s we are!”
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Floating Gear button for personalization */}
      <button 
        onClick={() => setShowStudio(!showStudio)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#cbd133] hover:bg-[#b0be28] hover:scale-105 active:scale-95 text-stone-950 rounded-full shadow-2.5xl flex items-center justify-center transition-all duration-300 group ring-4 ring-[#cbd133]/20 cursor-pointer"
        title="Estúdio de Criação"
      >
        <Sliders className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
      </button>

      {/* Persistent Studio Drawer */}
      <StudioPanel
        isOpen={showStudio}
        onClose={() => setShowStudio(false)}
        img1X={img1X}
        setImg1X={setImg1X}
        img1Y={img1Y}
        setImg1Y={setImg1Y}
        img1Scale={img1Scale}
        setImg1Scale={setImg1Scale}
        img1Brightness={img1Brightness}
        setImg1Brightness={setImg1Brightness}
        img1Contrast={img1Contrast}
        setImg1Contrast={setImg1Contrast}
        uploadedImage1={uploadedImage1}
        setUploadedImage1={setUploadedImage1}
        setHeroImageSource={setHeroImageSource}
        fallbackUrl1={FALLBACK_MODEL_URL}
        textX={textX}
        setTextX={setTextX}
        textY={textY}
        setTextY={setTextY}
        textScale={textScale}
        setTextScale={setTextScale}
        img2X={img2X}
        setImg2X={setImg2X}
        img2Y={img2Y}
        setImg2Y={setImg2Y}
        img2Scale={img2Scale}
        setImg2Scale={setImg2Scale}
        img2Brightness={img2Brightness}
        setImg2Brightness={setImg2Brightness}
        img2Contrast={img2Contrast}
        setImg2Contrast={setImg2Contrast}
        uploadedImage2={uploadedImage2}
        setUploadedImage2={setUploadedImage2}
        fallbackUrl2={FALLBACK_MODEL_URL}
      />

    </div>
  );
}
