var Gl=Object.defineProperty;var Xl=(e,n,t)=>()=>{if(t)throw t[0];try{return e&&(n=e(e=0)),n}catch(a){throw t=[a],a}};var ql=(e,n)=>{for(var t in n)Gl(e,t,{get:n[t],enumerable:!0})};var fi={};ql(fi,{default:()=>zl});var zl,di=Xl(()=>{zl=`"use strict";(()=>{var Oe=self,Ee={width:0,height:0,left:0,top:0,hidden:!1,reducedMotion:!1,darkScheme:!1};for(let e of["HTMLElement","HTMLImageElement","HTMLVideoElement","HTMLCanvasElement","Element"])typeof Oe[e]!="function"&&(Oe[e]=class{});var Hn=e=>({addEventListener(t,n){e.has(t)||e.set(t,new Set),e.get(t).add(n)},removeEventListener(t,n){e.get(t)?.delete(n)}}),Wr=(e,t,n)=>{for(let a of[...e.get(t)??[]])a(n)},uo=new Map,Xn={...Hn(uo),load:()=>Promise.resolve([]),check:()=>!0,ready:Promise.resolve(),announce(e){Wr(uo,"loadingdone",Object.assign(new Event("loadingdone"),{fontfaces:[{family:e}]}))}},zn=new Map;Oe.document={...Hn(zn),get hidden(){return Ee.hidden},fonts:Xn,documentElement:null,body:null,createElement(e){if(e==="canvas")return new OffscreenCanvas(1,1);throw new Error(\`A glyph field in a worker cannot create a <\${e}>.\`)}};var qn=e=>{Ee.hidden=e,Wr(zn,"visibilitychange",new Event("visibilitychange"))};Oe.window=self;typeof Oe.devicePixelRatio!="number"&&(Oe.devicePixelRatio=1);var Nn=new Map,fo=e=>/reduced-motion/.test(e)?Ee.reducedMotion:/color-scheme:\\s*dark/.test(e)?Ee.darkScheme:!1;Oe.matchMedia=e=>{let t=Nn.get(e);t||Nn.set(e,t={matches:fo(e),events:new Map});let n=t;return{media:e,get matches(){return n.matches},...Hn(n.events)}};var Vn=(e,t)=>{Ee.reducedMotion=e,Ee.darkScheme=t;for(let[n,a]of Nn){let i=fo(n);i!==a.matches&&(a.matches=i,Wr(a.events,"change",Object.assign(new Event("change"),{matches:i,media:n})))}},Or=new Set;Oe.ResizeObserver=class{constructor(e){this.callback=e}observe(){Or.add(this.callback)}unobserve(){Or.delete(this.callback)}disconnect(){Or.delete(this.callback)}};var Br=new Set,jn=null,ho=!0;Oe.IntersectionObserver=class{constructor(e){this.callback=e}observe(e){jn=e,Br.add(this.callback),queueMicrotask(()=>this.callback([{target:e,isIntersecting:ho}]))}unobserve(){Br.delete(this.callback)}disconnect(){Br.delete(this.callback)}};var $n=(e,t,n,a)=>{let i=e!==Ee.width||t!==Ee.height;if(Object.assign(Ee,{width:e,height:t,left:n,top:a}),i)for(let l of[...Or])l([{target:jn}])},Kn=e=>{ho=e;for(let t of[...Br])t([{target:jn,isIntersecting:e}])},mo=(e,t)=>{if(e==="pointerleave"){Wr(zn,"pointerleave",new Event("pointerleave"));return}let n=Object.assign(new Event(e),t,{composedPath:()=>[]});Oe.dispatchEvent(n)};typeof Oe.requestAnimationFrame!="function"&&(Oe.requestAnimationFrame=e=>setTimeout(()=>e(performance.now()),16),Oe.cancelAnimationFrame=e=>clearTimeout(e));function po(e){let t=e;return Object.defineProperties(t,{clientWidth:{get:()=>Ee.width,configurable:!0},clientHeight:{get:()=>Ee.height,configurable:!0},ownerDocument:{value:void 0,configurable:!0}}),t.getBoundingClientRect=()=>({left:Ee.left,top:Ee.top,x:Ee.left,y:Ee.top,width:Ee.width,height:Ee.height,right:Ee.left+Ee.width,bottom:Ee.top+Ee.height}),t.setAttribute=()=>{},t.removeAttribute=()=>{},t.dataset={},t.style={},e}var Yn=e=>Object.keys(e.params);function go(e){if(!e.length)return null;let t=e.map((l,c)=>{let o=Yn(l);return\`struct Fx\${c}Params{\${o.length?o.map(f=>\`float \${f};\`).join(""):"float unused;"}};\`}).join(\`
\`),n=(l,c)=>{let o=Yn(l),f=o.length?o.map((d,m)=>\`uFx[\${c*2+(m>>2)}].\${"xyzw"[m&3]}\`).join(","):"0.";return\`Fx\${c}Params params=Fx\${c}Params(\${f});\`},a={displace:["vec2 at=sampleAt;","sampleAt=at;"],shade:["vec3 color=rgb;vec3 ink=fxInk;float inkAmount=fxInkAmount;float glyph=fxGlyph;","fxInk=ink;fxInkAmount=inkAmount;fxGlyph=glyph;"]},i=l=>e.map((c,o)=>c[l]?\`{// effect "\${c.name}"
\${n(c,o)}\${a[l][0]}
\${c[l]}
\${a[l][1]}}\`:"").filter(Boolean).join(\`
\`);return{declarations:\`uniform vec4 uFx[8];
uniform vec4 uFxPointer;
uniform float uFxTime;
\${t}\`,displace:i("displace"),shade:i("shade")}}function bo(e,t=new Float32Array(32)){return t.fill(0),e.slice(0,4).forEach((n,a)=>{Yn(n).forEach((i,l)=>{t[a*8+l]=n.params[i]})}),t}var zi={none:3,flow:1,orb:2,drift:4,swell:5,caustics:6,contour:7,aurora:8,ripple:9,halo:10,interference:11,mesh:12,cascade:13,constellation:14},vo=e=>zi[e]??3,yo=\`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}\`,Eo=e=>e?\`
const float VSCALE=6.;
vec4 decodeFluid(vec4 t){return vec4((t.xy*2.-1.)*VSCALE,t.z,t.w);}
vec4 encodeFluid(vec4 v){return vec4(clamp(v.xy/VSCALE*.5+.5,0.,1.),clamp(v.z,0.,1.),1.);}\`:\`
vec4 decodeFluid(vec4 t){return t;}
vec4 encodeFluid(vec4 v){return vec4(v.xyz,1.);}\`,Mo=e=>\`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uPrevious;
uniform vec2 uSize;
uniform float uAspect, uDt, uDecay, uEnergyDecay, uRadius, uSplat;
uniform vec2 uFrom, uTo, uForce;
out vec4 outColor;
\${Eo(e)}
float segment(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-8),0.,1.);return length(pa-ba*h);}
void main(){
  vec2 uv=gl_FragCoord.xy/uSize;
  vec4 here=decodeFluid(texture(uPrevious,uv));
  vec4 state=decodeFluid(texture(uPrevious,uv-uDt*here.xy*vec2(1./uAspect,1.)));
  state.xy*=exp(-uDt*uDecay);
  state.z*=exp(-uDt*uEnergyDecay);
  if(uSplat>.5){
    vec2 scale=vec2(uAspect,1.);
    float d=segment(uv*scale,uFrom*scale,uTo*scale);
    float g=exp(-d*d/(uRadius*uRadius));
    state.xy+=uForce*g;
    state.z=min(1.,state.z+g*min(1.,length(uForce)*.5+.08));
  }
  float speed=length(state.xy);
  if(speed>5.)state.xy*=5./speed;
  outColor=encodeFluid(state);
}\`,qi=e=>\`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uSource, uFluid;
uniform vec2 uResolution, uCell;
uniform float uCount, uBlend;
const float BAYER[16]=float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
uniform vec3 uRamp[6];
uniform float uRampCount;
// The gradient map: the tone run through the ramp's stops, evenly spaced, faintest first.
vec3 rampAt(float t){
  float x=clamp(t,0.,1.)*(uRampCount-1.);
  int i=int(min(floor(x),uRampCount-2.));
  vec3 a=uRamp[0],b=uRamp[1];
  for(int k=1;k<5;k++)if(k==i){a=uRamp[k];b=uRamp[k+1];}
  return mix(a,b,clamp(x-float(i),0.,1.));
}
uniform vec4 uSourceMap;
uniform int uScene;
uniform vec3 uInk, uHighlight;
uniform vec4 uBackground;
uniform float uBrightness, uContrast, uGamma, uInvert, uVignette, uSourceColor;
uniform float uRefraction, uGlow, uTime, uDrift, uFluidOn, uLod, uSaturation, uBackdrop, uShade, uHighlightAuto, uFluidMode;
uniform vec2 uFluidTexel;
uniform int uHoverMode;
uniform vec3 uLight;
uniform vec3 uTrail[12];
uniform float uLightRadius, uLightGain, uClock, uFlicker, uTrailAmount;
uniform sampler2D uTrailMap, uScope;
uniform float uScopeMode;
uniform vec2 uLevels;
// A moving source's levels, measured on the GPU (field-measure.ts), when uLevelsFromMap is set.
uniform sampler2D uLevelMap;
uniform float uLevelsFromMap;
// Shape sampling: each cell read in 3 by 5 parts and matched to the glyphs' own ink in those parts (see GlyphFieldOptions.sample).
uniform float uShapeOn, uShapeLod, uShapeTone, uShapeWindow, uShapeGate;
uniform sampler2D uShapes;
uniform int uMark;
uniform float uScale, uClearFeather, uClearShape, uOrder, uClearPointer;
// Text order by rows: each word's first glyph index and length, and how many words there are (0 reads the charset as one stream).
uniform vec2 uWords[8];
uniform float uWordCount;
uniform vec4 uClear;
uniform vec4 uPulse[4];
uniform sampler2D uTapMap;
uniform float uTapOn;
uniform sampler2D uClearMap;
uniform float uClearMapOn, uClearBend;
uniform vec2 uClearTexel;
layout(location=0) out vec4 outInk;
layout(location=1) out vec4 outUnder;
// The cell's light for bloom: its ink weighted by its tone, empty where the cell is blank. Only kept when bloom is on.
layout(location=2) out vec4 outGlow;
\${Eo(e)}
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
vec3 generated(vec2 uv,float aspect){
  vec2 p=(uv-.5)*vec2(aspect,1.)*uScale;
  if(uScene==1){
    float t=uTime*.08;
    vec2 q=vec2(fbm(p*1.6+t),fbm(p*1.6-t+3.1));
    return vec3(smoothstep(.28,.86,fbm(p*1.8+q*1.6+vec2(t*.6,-t*.4))));
  }
  if(uScene==2){
    float r=.36,d=length(p),a=uTime*.25;
    vec3 l=normalize(vec3(cos(a)*.8,.55,sin(a)*.6+.6));
    if(d<r){
      vec3 n=normalize(vec3(p.x,-p.y,sqrt(r*r-d*d)));
      float diffuse=max(dot(n,l),0.),rim=pow(1.-n.z,2.5);
      float lon=atan(n.x,n.z)+uTime*.35,lat=asin(clamp(n.y,-1.,1.));
      float bands=.5+.25*sin(lat*14.)+.25*sin(lon*6.);
      return vec3(clamp(diffuse*.85+rim*.5+bands*.12,0.,1.));
    }
    return vec3(exp(-pow((d-r)*9.,2.))*.35);
  }
  if(uScene==4){
    // Drift: a few broad lobes that wander slowly. Built for halftone, where large soft shapes read best.
    float t=uTime*.045;
    vec2 q=p*1.15;
    vec2 w=vec2(fbm(q*.7+vec2(t,-t*.7)),fbm(q*.7+vec2(4.3-t*.8,t+1.7)));
    float n=fbm(q+w*1.3+vec2(t*.4,t*.25));
    return vec3(smoothstep(.36,.74,n));
  }
  if(uScene==5){
    // Swell: three crossing swells, the second bent by the first, so crests roll diagonally instead of pooling.
    float t=uTime;
    float s=sin((dot(p,vec2(.94,.33))/.95-t/9.)*6.2831853);
    float c=sin((dot(p,vec2(.6,-.8))/.58-t/13.)*6.2831853+s*.9);
    float k=sin((dot(p,vec2(-.29,.96))/.36+t/17.)*6.2831853);
    return vec3(smoothstep(.3,.9,.5+.5*(s*.5+c*.35+k*.15)));
  }
  // The kit's background scenes. Each starts a little way in, so a reduced-motion still is already composed.
  float t=uTime+40.,px=uCell.y/uResolution.y*uScale;
  if(uScene==6){
    // Caustics: light focused by a moving water surface. Two layers of warped sine waves drift against each other; each draws
    // smooth filaments along its zero line, about a character wide. Where they cross the light lifts a little, never to a blot.
    float tt=t*.12,a=0.,b=0.;
    for(int l=0;l<2;l++){
      float f=float(l),sc=5.4+f*2.4;
      vec2 q=(l==0?p:mat2(.8,-.6,.6,.8)*p)*sc;
      q+=vec2(sin(q.y*.45+tt*(1.+f*.3)),cos(q.x*.4-tt*(.8+f*.4)))*1.3;
      float v=sin(q.x+1.4*sin(q.y*.7+tt))+sin(q.y*1.1+1.2*sin(q.x*.8-tt*1.3))*.9;
      float wv=max(fwidth(v),1e-4);
      float line=(1.-smoothstep(.2,1.5,abs(v)/wv))*(l==0?.78:.62)+exp(-abs(v)/(wv*5.))*.16;
      if(l==0)a=line;else b=line;
    }
    float pulse=.85+.15*sin(tt*3.+p.x*1.7-p.y*1.1);
    float light=max(a,b)+.3*min(a,b);
    return vec3(clamp(light*light*pulse,0.,.78));
  }
  if(uScene==7){
    // Contour: a slow terrain read as survey lines about a character wide at any size; every fifth is an index line.
    float tt=t*.02;
    vec2 q=p*1.15+vec2(tt,-tt*.6);
    float h=noise(q)*.62+noise(q*2.07+3.1)*.27+noise(q*4.3-tt+7.)*.11;
    h+=.08*sin(tt*2.+p.x*.8);
    float k=h*13.,w=max(fwidth(k),1e-4),d=abs(fract(k+.5)-.5)/w;
    float major=mod(floor(k+.5),5.)<.5?1.:0.;
    return vec3((1.-smoothstep(.35,1.25-major*.25,d))*mix(.55,1.,major));
  }
  if(uScene==8){
    // Aurora: three curtains at different distances hang from the top. Far ones sit higher and dimmer; the nearest is tallest
    // and brightest. Each folds slowly and is brightest along its lower hem, fading upward. The rays are set per character
    // column, so the curtains read as vertical strokes at any stage size, from a small card to a phone.
    float tt=t*.05,a=0.,cw=uCell.x/uResolution.x;
    float col=floor(uv.x/cw+.5);
    for(int n=0;n<3;n++){
      float f=float(n),near=f/2.;
      float x=p.x*(1.3-near*.4)+f*3.7;
      float hem=-.28+near*.3+.16*sin(x*1.3+tt*(.9+f*.25)+f*2.)+.045*sin(x*3.4-tt*1.5+f);
      float d=hem-p.y;
      float body=d>0.?exp(-d/(.14+near*.26))*(.45+.55*exp(-d/.03)):exp(-d*d/.0002);
      float fold=.5+.5*sin(x*2.1+tt*.9+f*1.7+.7*sin(x*.8-tt*.6));
      float ray=mix(hash(vec2(col,f*7.1)),noise(vec2(col*.18+f*9.,tt*.7+f)),.55);
      float layer=clamp(body*(.1+.9*fold*fold)*(.2+.8*ray)*(.4+near*.6)*4.2,0.,1.);
      a=1.-(1.-a)*(1.-layer);
    }
    return vec3(smoothstep(.12,.9,a));
  }
  if(uScene==9){
    // Ripple: still water. Drops land here and there, each a few rings that widen and fade; the pointer drops its own.
    float tone=0.,g=.72;
    vec2 q=p/g,id=floor(q);
    for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
      vec2 c=id+vec2(i,j),h=vec2(hash(c),hash(c+7.3));
      float period=5.+h.x*5.,age=fract(t*.3/period*4.+h.y);
      vec2 at=(c+.2+.6*h)*g;
      float d=length(p-at),r=age*.62;
      float rings=max(0.,cos((d-r)*34.))*exp(-pow((d-r)/.11,2.));
      tone+=rings*pow(1.-age,1.8)*smoothstep(0.,.06,age)*(.7+.3*h.x);
    }
    return vec3(clamp(tone*1.25,0.,1.));
  }
  if(uScene==10){
    // Halo: a slow breathing corona that frames the content, its rays turning. The ring fits the stage: wide on a desktop
    // hero, tall on a phone, so the whole halo stays on screen; the middle stays empty for a headline.
    vec2 r=vec2(min(.46,aspect*.4),min(.34,.36/max(aspect,.01)*.5+.2));
    vec2 e=p/r;
    float d=length(e),a=atan(e.y,e.x),tt=t*.07,k=min(r.x,r.y);
    float breathe=1.+.04*sin(tt*3.1);
    float rays=.5+.5*noise(vec2(a*3.2+tt,tt*.5))*(.6+.4*noise(vec2(a*7.-tt*1.2,3.+tt*.4)));
    float s=(d-breathe)*k;
    float rim=exp(-pow(s/.03,2.));
    float corona=exp(-max(0.,s)/(.1+.08*rays))*smoothstep(-.04,.015,s)*rays*smoothstep(.36,.12,s);
    return vec3(clamp(rim*(.55+.45*rays)+corona*.85,0.,1.));
  }
  if(uScene==11){
    // Interference: two ring grids from slowly orbiting centres. Where they cross, broad moire bands open and close.
    float tt=t*.05;
    vec2 a=vec2(-.3+.12*sin(tt),.07*cos(tt*1.3)),b=vec2(.3+.1*cos(tt*.8),-.06*sin(tt*1.1));
    float f=6.2831853/max(px*4.6,.004);
    float m=cos(length(p-a)*f)+cos(length(p-b)*f);
    return vec3(smoothstep(.7,2.,m));
  }
  if(uScene==12){
    // Mesh: four soft lights on slow Lissajous paths, a gradient mesh written in characters.
    float tt=t*.07,m=0.;
    for(int n=0;n<4;n++){
      float f=float(n)*1.7;
      vec2 c=vec2(.66*sin(tt*(.7+f*.13)+f),.34*cos(tt*(.9-f*.07)+f*1.3));
      float s=.3+.07*sin(tt+f);
      m+=exp(-dot(p-c,p-c)/(s*s))*(.8-float(n)*.1);
    }
    return vec3(smoothstep(.06,1.1,m));
  }
  if(uScene==13){
    // Cascade: streaks fall in three depths. Far ones are frequent, faint, short and slow; near ones rare, long, bright and
    // quick. Each has a bright head and a tail that fades behind it, and a column can carry two streaks at once.
    float tone=0.,cw=uCell.x/uResolution.x,ch=uCell.y/uResolution.y;
    float col=floor(uv.x/cw+.5);
    for(int n=0;n<3;n++){
      float f=float(n);
      for(int k=0;k<2;k++){
        float seed=f*13.1+float(k)*41.7,h=hash(vec2(col,seed));
        if(h<1.-(.5-f*.15))continue;
        float speed=(.045+f*.07)*(.75+.5*hash(vec2(col,seed+2.)));
        float tail=.12+f*.16,y=fract(t*speed+hash(vec2(col,seed+5.)))*(1.+tail*2.)-tail;
        float d=y-uv.y;
        if(d<0.||d>tail)continue;
        float head=d<ch*1.2?1.:0.;
        tone=max(tone,max(head*(.55+f*.22),pow(1.-d/tail,1.7)*(.28+f*.3)));
      }
    }
    return vec3(clamp(tone,0.,1.));
  }
  if(uScene==14){
    // Constellation: points wander in their own cells; neighbours close enough are linked by fine lines. Each point is a
    // bright core in a soft halo, so it reads at card size as well as full width.
    float g=.23,tt=t*.18;
    vec2 q=p/g,id=floor(q);
    vec2 pts[9];
    for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
      vec2 c=id+vec2(i,j);
      float h=hash(c),k=hash(c+3.7);
      pts[(j+1)*3+i+1]=c+.5+.36*vec2(sin(tt*(.6+h)+h*6.28),cos(tt*(.5+k)+k*6.28));
    }
    float line=0.,star=0.,lw=max(px/g,.02);
    for(int n=0;n<9;n++){
      vec2 e=q-pts[n];
      float d2=dot(e,e),tw=.8+.2*sin(tt*3.+float(n)*1.7);
      star=max(star,max(exp(-d2/(lw*lw*1.6)),.38*exp(-d2/(lw*lw*7.)))*tw);
      for(int m=n+1;m<9;m++){
        vec2 a=pts[n],ba=pts[m]-a;
        float len=length(ba);
        if(len>1.35)continue;
        float hh=clamp(dot(q-a,ba)/dot(ba,ba),0.,1.);
        float d=length(q-a-ba*hh);
        line=max(line,(1.-smoothstep(lw*.3,lw*.75,d))*smoothstep(1.35,.6,len)*.72);
      }
    }
    return vec3(clamp(max(line,star),0.,1.));
  }
  return vec3(0.);
}
// The source's brightness to the field's tone: levels, contrast and brightness, gamma, invert.
float transfer(float tone){
  vec2 levels=uLevelsFromMap>.5?texelFetch(uLevelMap,ivec2(0),0).rg:uLevels;
  tone=clamp((tone-levels.x)/max(levels.y-levels.x,.01),0.,1.);
  tone=clamp((tone-.5)*uContrast+.5+uBrightness,0.,1.);
  tone=pow(tone,1./uGamma);
  return uInvert>.5?1.-tone:tone;
}
// Hover scope: 1 where the pointer response may act. The map holds the source's soft subject coverage in alpha.
float hoverScope(vec2 uv){
  if(uScopeMode<.5||uScene!=0)return 1.;
  vec2 s=uv*uSourceMap.xy+uSourceMap.zw;
  vec4 scope=texture(uScope,clamp(s,0.,1.));
  // Red set: a source with no subject to key (measured on the GPU), where every scope acts everywhere.
  if(scope.r>.5)return 1.;
  float c=(s.x<0.||s.y<0.||s.x>1.||s.y>1.)?0.:scope.a;
  return uScopeMode<1.5?c:1.-c;
}
void main(){
  vec2 cell=floor(gl_FragCoord.xy);
  vec2 uv=(cell+.5)*uCell/uResolution;
  float aspect=uResolution.x/uResolution.y;
  float hs=hoverScope(uv);
  vec4 fluid=vec4(0.);
  // lift: signed tone change. The solver's flow brightens one side of each eddy and opens the other into gaps.
  float lift=0.,wake=0.,bend=1.,swirl=0.,speed=0.;
  if(uFluidOn>.5){
    vec4 raw=texture(uFluid,vec2(uv.x,1.-uv.y));
    if(uFluidMode>.5){
      vec2 v=raw.xy*uFluidTexel*vec2(aspect,1.)*hs;
      fluid=vec4(v,0.,1.);
      swirl=clamp(dot(v,vec2(.4,.65))*uGlow*.32,-.65,.65);
      speed=clamp(length(v)*uGlow*.055,0.,.38);
      bend=.4;
    } else {
      fluid=decodeFluid(raw);
      fluid.xyz*=hs;
      wake=clamp(fluid.z*uGlow,0.,1.);
      lift=wake*.55;
    }
  }
  vec2 drift=uDrift*.006*vec2(sin(uv.y*5.3+uTime*.6),cos(uv.x*4.1-uTime*.5));
  vec2 sampleAt=uv-vec2(fluid.x/aspect,-fluid.y)*uRefraction*bend+drift;
  float keep=0.;
  if(uClearMapOn>0.){
    // Text-shaped clear map: quiet right behind the content, and the field leans away from its edges so it flows round them.
    keep=texture(uClearMap,uv).r;
    vec2 t=uClearTexel*1.5;
    vec2 g=vec2(texture(uClearMap,uv+vec2(t.x,0.)).r-texture(uClearMap,uv-vec2(t.x,0.)).r,texture(uClearMap,uv+vec2(0.,t.y)).r-texture(uClearMap,uv-vec2(0.,t.y)).r);
    sampleAt+=g*vec2(1./aspect,1.)*uClearBend;
  }
  float spot=0.;
  if(uHoverMode==4||uHoverMode==5){
    vec2 d=(uv-uLight.xy)*vec2(aspect,1.);
    float q2=dot(d,d)/(uLightRadius*uLightRadius*2.2);
    // Loupe: flat-topped zoom with a soft rim. Reveal: a soft spot in the source's colours.
    if(uHoverMode==4) sampleAt-=(uv-uLight.xy)*exp(-q2*q2)*.45*uLight.z*min(1.,uLightGain*1.6)*hs;
    else spot=exp(-q2*1.6)*uLight.z*min(1.,uLightGain*1.6)*hs;
  }
  vec3 rgb,glow=vec3(0.);
  float sub[15];float subMean=-1.,subLo=0.,subHi=0.;
  if(uScene==0){
    vec2 s=sampleAt*uSourceMap.xy+uSourceMap.zw;
    bool inside=!(s.x<0.||s.y<0.||s.x>1.||s.y>1.);
    rgb=inside?textureLod(uSource,s,uLod).rgb:vec3(0.);
    if(uShapeOn>.5){
      vec2 cu=uCell/uResolution;
      subMean=0.;subLo=1.;subHi=0.;
      for(int j=0;j<5;j++)for(int i=0;i<3;i++){
        vec2 o=(vec2((float(i)+.5)/3.,(float(j)+.5)/5.)-.5)*cu,ss=(sampleAt+o)*uSourceMap.xy+uSourceMap.zw;
        float v=(ss.x<0.||ss.y<0.||ss.x>1.||ss.y>1.)?transfer(0.):transfer(dot(textureLod(uSource,ss,uShapeLod).rgb,vec3(.2126,.7152,.0722)));
        sub[j*3+i]=v;subMean+=v;subLo=min(subLo,v);subHi=max(subHi,v);
      }
      subMean/=15.;
    }
    if(uBackdrop>0.){
      vec2 b=(uv-vec2(fluid.x/aspect,-fluid.y)*uRefraction*bend*.5)*uSourceMap.xy+uSourceMap.zw;
      glow=(b.x<0.||b.y<0.||b.x>1.||b.y>1.)?vec3(0.):textureLod(uSource,b,uLod+3.).rgb*uBackdrop;
    }
  } else rgb=generated(sampleAt,aspect);
  float tone=transfer(dot(rgb,vec3(.2126,.7152,.0722)));
  // Shape sampling takes its tone from its parts, so the character's ink matches the cell's.
  if(subMean>=0.)tone=subMean;
  float flick=0.,trailFold=0.;
  // Reveal: under the spot the characters take the source's own colour and a little more ink.
  if(spot>0.)lift=spot*.22;
  if(uHoverMode==2){
    // Lantern: a soft light and its fading tail lift the characters they pass. Nothing moves the image.
    vec2 ap=vec2(aspect,1.),d=(uv-uLight.xy)*ap;
    float r2=uLightRadius*uLightRadius,glowL=uLight.z*exp(-dot(d,d)/r2);
    for(int i=0;i<12;i++){vec2 e=(uv-uTrail[i].xy)*ap;glowL+=uTrail[i].z*exp(-dot(e,e)/(r2*.55));}
    glowL=min(glowL,1.)*hs;
    float grain=fract(sin(dot(cell,vec2(12.9898,78.233)))*43758.5453);
    lift=glowL*uLightGain*(.7+.6*grain);
    wake=glowL*.4;
    // A few letters at the light's rim step up the ramp and back, as if being retyped.
    flick=uFlicker*step(.9,fract(grain*13.7+floor(uClock*7.+grain*5.)*.37))*glowL*(1.-glowL)*4.;
  }
  if(uHoverMode==3){
    // Trail: the studio's ink field, as a 16-bit density. Sparse marks fill in, dense marks open up.
    vec4 ink=texture(uTrailMap,uv);
    float density=(ink.r*65280.+ink.g*255.)/65535.*uTrailAmount;
    float t=clamp(density/.38,0.,1.);
    trailFold=t*t*(3.-2.*t)*hs;
  }
  if(uFluidMode>.5&&uHoverMode==1){
    // Dark ground: any motion lights the characters. Lit ground: the flow lights one side of each eddy and opens the other.
    // A little cell-to-cell grain keeps the lit area a shimmer of letters rather than a solid block.
    float grain=fract(sin(dot(cell,vec2(12.9898,78.233)))*43758.5453);
    lift=mix(abs(swirl)*.5+speed,swirl+speed*.35,smoothstep(.12,.55,tone))*(.65+.7*grain);
    wake=clamp(lift*1.6,0.,1.);
  }
  // The resting tone, before the pointer's response: a clear zone may quiet the one and keep part of the other.
  float calm=tone;
  tone=clamp(tone+lift,0.,1.);
  tone+=(1.-2.*tone)*trailFold;
  // Pulses: rings sent by the interface (field.pulse()), e.g. on a save or a notification.
  for(int i=0;i<4;i++){
    if(uPulse[i].w<=0.)continue;
    float dist=length((uv-uPulse[i].xy)*vec2(aspect,1.)),front=uPulse[i].z*.95;
    float ring=exp(-pow((dist-front)/.1,2.))*uPulse[i].w*exp(-uPulse[i].z*.85);
    tone=clamp(tone+ring*.85,0.,1.);
  }
  if(uTapOn>0.){
    // A surface tap: a signed lift (16 bits) and a glint, worked out on the CPU over the photo's own medium.
    vec4 tap=texture(uTapMap,uv);
    float lift=(tap.r*65280.+tap.g*255.)/65535.*2.-1.;
    tone=clamp(tone+(lift*1.25+tap.b)*uTapOn,0.,1.);
  }
  tone*=1.-uVignette*smoothstep(.35,1.05,length((uv-.5)*vec2(min(aspect,1.8),1.)*2.));
  if(uClearMapOn>0.)tone*=1.-uClearMapOn*smoothstep(0.,1.,keep);
  if(uClear.z>0.){
    // Clear zone: the field fades out around content so text above it stays readable.
    vec2 half_=uClear.zw*.5*vec2(aspect,1.),q=(uv-uClear.xy-uClear.zw*.5)*vec2(aspect,1.);
    float dz;
    if(uClearShape>.5){vec2 e=abs(q)-half_;dz=length(max(e,0.))+min(max(e.x,e.y),0.);}
    else dz=(length(q/max(half_,vec2(1e-4)))-1.)*min(half_.x,half_.y);
    float keepZone=smoothstep(0.,uClearFeather,dz);
    tone=calm*keepZone+(tone-calm)*mix(keepZone,1.,uClearPointer);
  }
  // Blend: a shade between two characters takes the upper one in the share of cells a 4x4 Bayer pattern gives it.
  float level=tone*(uCount-1.),upper=fract(level)>=.5?1.:0.;
  if(uBlend>.5&&tone>.02&&tone<.98){
    ivec2 q=ivec2(mod(gl_FragCoord.xy,4.));
    upper=fract(level)>(BAYER[q.y*4+q.x]+.5)/16.?1.:0.;
  }
  if(subMean>=0.&&uOrder<.5&&tone>.008){
    // Shape: among the characters near the cell's tone, the one whose ink in each part best matches the cell's parts after the
    // hovers' lift. Each glyph's ink is scaled to its place on the ramp, so shape decides among glyphs and the ramp keeps the tone.
    float n=uCount-1.,d=tone-subMean,best=1e9,c0=floor(tone*n+.5);
    upper=0.;
    level=c0;
    // A cell without an edge in it keeps the character its tone gives: shape only decides where there is shape to follow.
    if(subHi-subLo>=uShapeGate)for(int k=-6;k<=6;k++){
      float g=c0+float(k);
      if(abs(float(k))>uShapeWindow||g<1.||g>n)continue;
      float r=g/n,scale=r/max(texelFetch(uShapes,ivec2(15,int(g)),0).r,.004),e=0.;
      for(int i=0;i<15;i++){float q=clamp(sub[i]+d,0.,1.)-texelFetch(uShapes,ivec2(i,int(g)),0).r*scale;e+=q*q;}
      e=e/15.+uShapeTone*(tone-r)*(tone-r);
      if(e<best){best=e;level=g;}
    }
  }
  float index=min(uCount-1.,floor(level)+upper+(flick>.5&&tone>.02?1.:0.));
  if(uOrder>1.5){
    // Scatter order: each cell keeps one character picked from the charset by a hash of its place, and the tone sets how
    // strongly it shows rather than which character it is, so a field of letters brightens and fades like a lit screen.
    index=tone>.008?1.+min(uCount-2.,floor(hash(cell*.731+vec2(19.17,3.71))*(uCount-1.))):0.;
  } else if(uOrder>.5){
    // Text order: the charset after its blank is read in sequence along each row, each row a few letters on, so words stay
    // legible. Every letter is there; the tone sets how strongly it shows, so the words fade out toward the field's quiet edges.
    float n=max(1.,uCount-1.);
    index=tone>.015?1.+mod(cell.x+cell.y*(floor(n*.38)+1.),n):0.;
    if(uWordCount>.5&&tone>.015){
      // One word a row, repeated with a space between, rows taking the words in turn and each a few letters along.
      int k=int(mod(cell.y,uWordCount));
      vec2 word=uWords[0];
      for(int i=1;i<8;i++)if(i==k)word=uWords[i];
      float at=mod(cell.x+cell.y*3.,word.y+1.);
      index=at<word.y?word.x+at:0.;
    }
  }
  vec3 hue=rgb/max(max(rgb.r,rgb.g),max(rgb.b,.03));
  hue=mix(vec3(dot(hue,vec3(.2126,.7152,.0722))),hue,uSaturation);
  vec3 base=uRampCount>1.5?rampAt(tone):uInk;
  vec3 ink=mix(base*mix(1.,.3+.7*tone,uRampCount>1.5?0.:uShade),clamp(hue*(.38+.62*tone),0.,1.),uSourceColor);
  // Scatter, text and inlay carry the tone in the ink's strength, which the pixel pass reads back as opacity or tile shade.
  if(uOrder>1.5||(uOrder>.5&&uMark==0)||uMark==17)ink=mix(uInk,hue,uSourceColor)*tone;
  vec3 lifted=uHighlightAuto>.5?ink/max(max(ink.r,ink.g),max(ink.b,.06)):uHighlight;
  ink=mix(ink,lifted,wake*.7);
  if(spot>0.)ink=mix(ink,clamp(rgb/max(max(rgb.r,rgb.g),max(rgb.b,.08))*(.45+.55*tone),0.,1.),spot);
  float underAlpha=max(uBackground.a,min(1.,max(glow.r,max(glow.g,glow.b))));
  vec3 under=min(uBackground.rgb*uBackground.a+glow,vec3(underAlpha));
  // Glyphs keep their atlas index, exact in 8 bits; the other marks keep the tone, and empty where the charset is blank.
  outInk=vec4(ink,uMark==0||uMark==17?index/255.:uMark==1?(tone>.003?tone:0.):index>0.?max(tone,1./255.):0.);
  outUnder=vec4(under,underAlpha);
  // Highlights carry most of the light, as a lens blooms: the tone squared, so mid tones glow a little and shadows not at all.
  float lit=outInk.a>0.?tone*tone:0.;
  outGlow=vec4(ink*lit,lit);
}\`,Nr=(e,t=[])=>{let n=qi(e),a=go(t);if(!a)return n;let i=(c,o,f,d=!1)=>{let m=c.indexOf(o);if(m<0||c.indexOf(o,m+1)>=0)throw new Error(\`The cell pass lost its effect anchor: \${o}\`);return d?c.slice(0,m)+f+c.slice(m):c.slice(0,m+o.length)+f+c.slice(m+o.length)},l=i(n,"void main(){",\`\${a.declarations}
\`,!0);return l=i(l,"float aspect=uResolution.x/uResolution.y;",\`
  vec2 pointer=uFxPointer.xy;float pointerOn=uFxPointer.z,motion=uFxPointer.w,time=uFxTime;
  vec3 fxInk=vec3(0.);float fxInkAmount=0.,fxGlyph=0.;\`),l=i(l,\`+drift;
\`,\`\${a.displace}
\`),l=i(l,"  tone*=1.-uVignette*",\`\${a.shade}
  tone=clamp(tone,0.,1.);
\`,!0),l=i(l,"+(flick>.5&&tone>.02?1.:0.));",\`
  if(tone>.008)index=clamp(index+floor(fxGlyph+.5),tone>.008?1.:0.,uCount-1.);\`),l=i(l,"ink=mix(ink,lifted,wake*.7);",\`
  ink=mix(ink,clamp(fxInk,0.,1.),clamp(fxInkAmount,0.,1.));\`),l},Vi=\`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uAtlas, uCells, uUnder;
uniform vec2 uResolution, uCell, uPitch;
uniform float uColumns, uDotScale, uSourceColor;
uniform vec2 uDir;
uniform int uMark;
// Inlay accents: share of tiles, letter shuffle span, a seed that steps a few times a second, charset length.
uniform vec4 uInlay;
// Line marks: pitch in cell heights, weight, the share of cells that sparkle.
uniform vec4 uLine;
uniform vec4 uFade;
// Finishing passes: bloom amount and radius in cells, scanlines, grain; chromatic split, curvature, time, rows per scanline pair.
uniform vec4 uPost, uPost2;
uniform sampler2D uGlow;
out vec4 outColor;
const float BAYER[16]=float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
uniform vec3 uRamp[6];
uniform float uRampCount;
// The gradient map: the tone run through the ramp's stops, evenly spaced, faintest first.
vec3 rampAt(float t){
  float x=clamp(t,0.,1.)*(uRampCount-1.);
  int i=int(min(floor(x),uRampCount-2.));
  vec3 a=uRamp[0],b=uRamp[1];
  for(int k=1;k<5;k++)if(k==i){a=uRamp[k];b=uRamp[k+1];}
  return mix(a,b,clamp(x-float(i),0.,1.));
}
// The Studio's print defaults: roughness .35, seed 7, registration .2 and its coral second ink. The screen angle is uDir (-35deg).
const float ROUGH=.35,SEED=7.;
const vec3 SECOND=vec3(.925,.404,.322);
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
// Coverage of a signed distance given in device pixels.
float cover(float d){return clamp(.5-d,0.,1.);}
float box(vec2 p,vec2 lo,vec2 hi){vec2 a=clamp(p-lo,0.,1.)*clamp(hi-p,0.,1.);return a.x*a.y;}
float disc(vec2 p,vec2 c,float r){return r>.05?cover(length(p-c)-r):0.;}
float ellipse(vec2 p,vec2 c,vec2 r,float a){vec2 d=p-c;d=vec2(cos(a)*d.x+sin(a)*d.y,-sin(a)*d.x+cos(a)*d.y);float k=length(d/r);return cover((k-1.)*min(r.x,r.y));}
// World-anchored parallel cuts across direction d: period and width in cell heights, so lines run on from cell to cell.
float cuts(vec2 w,vec2 d,float period,float width,float px){
  if(width<=0.)return 0.;
  float proj=dot(vec2(-d.y,d.x),w);
  return cover((abs(fract(proj/period+.5)-.5)*period-width*.5)*px);
}
// Lays an ink over what is already down, multiplying where they overlap, as transparent inks do on paper.
void lay(inout vec3 rgb,inout float a,vec3 c,float k){
  float next=a+k*(1.-a);
  rgb=next>0.?(rgb*a*(1.-k)+mix(c,rgb*c,a)*k)/next:c;
  a=next;
}
vec4 drawAt(vec2 frag){
  vec2 DIR=uDir;
  // The pitch is the atlas cell, or a fractional one under cellFit 'fill', where each glyph sits centred in its stretched cell.
  vec2 cell=floor(frag/uPitch);
  vec4 ink=texelFetch(uCells,ivec2(cell),0),under=texelFetch(uUnder,ivec2(cell),0);
  vec2 local=frag-cell*uPitch;
  float coverage;
  vec3 rgb=ink.rgb;
  // Scatter and inlay: the cell's strength, read back from its ink, and the ink itself at full strength.
  float strength=1.;
  if(uFade.w>.5){
    float top=max(rgb.r,max(rgb.g,rgb.b));
    strength=uSourceColor>.5?top:clamp(top/max(max(uFade.r,max(uFade.g,uFade.b)),.004),0.,1.);
    rgb=uSourceColor>.5?rgb/max(top,.004):uFade.rgb;
  }
  if(uMark==0||uMark==17){
    float index=floor(ink.a*255.+.5);
    // Inlay shuffle: every tiled cell takes a letter from the upper charset, traded for a neighbour a few times a second, so a
    // tiled body flickers through its letters rather than banding by tone; the tile's shade still carries the tone.
    float hs=hash(cell*.917+uInlay.z*1.37);
    if(uMark==17&&uInlay.y>0.&&index>0.&&(index>=uInlay.w*.62||strength>=.2))index=clamp(max(index,ceil(uInlay.w*.62)+1.)+floor((hs-.5)*(2.*uInlay.y+1.)),ceil(uInlay.w*.62),uInlay.w-1.);
    ivec2 tile=ivec2(int(mod(index,uColumns)),int(floor(index/uColumns)));
    vec2 texel=floor(local-floor((uPitch-uCell)*.5));
    coverage=all(greaterThanEqual(texel,vec2(0.)))&&all(lessThan(texel,uCell))?texelFetch(uAtlas,tile*ivec2(uCell)+ivec2(texel),0).a:0.;
    if(uMark==17){
      // Inlay: a gapped tile in the ink, lighter the denser the cell, with its character set into it in a darker shade. Faint
      // cells keep only the character, so a shape's edge frays into specks; empty cells show a hairline grid.
      vec2 p=local+.5;
      float gap=max(1.,floor(min(uPitch.x,uPitch.y)*.08+.5));
      float plate=index>0.?smoothstep(.2,.32,strength)*box(p,vec2(0.),uPitch-gap):0.;
      // Tile and letter are the ink at two strengths over whatever ground lies below, so the inlay reads on light and dark pages:
      // the tile strengthens with the tone and the letter is cut back toward the ground.
      float face=(.18+.8*smoothstep(.05,.8,strength))*plate;
      // With shuffle on, tiles also vary a little in shade, as worn inlay does.
      if(uInlay.y>0.)face*=.8+.34*hs;
      float speck=coverage*min(1.,strength*6.)*(1.-plate);
      float grid=index>0.?0.:(1.-box(p,vec2(0.),uPitch-1.))*.035;
      float a=mix(face,face*.22,coverage*plate)+speck;
      // Accents: a few lit tiles carry a coloured letter, a tinted tile or a white glint, picked afresh with the seed.
      float ha=hash(cell*1.31+uInlay.z*.71+vec2(7.3,1.9));
      if(plate>0.&&ha<uInlay.x){
        float pick=hash(cell+uInlay.z*2.11+vec2(3.1,8.7));
        vec3 hue=pick<.16?vec3(.86,.27,.27):pick<.3?vec3(.92,.55,.2):pick<.42?vec3(.9,.78,.25):pick<.58?vec3(.35,.72,.38):pick<.72?vec3(.3,.72,.8):pick<.84?vec3(.32,.42,.92):vec3(.66,.42,.86);
        float kind=ha/uInlay.x;
        if(kind<.55){float k=coverage*plate;rgb=mix(rgb,hue,k);a=mix(a,1.,k);}
        else if(kind<.88){rgb=mix(rgb,hue,.55);}
        else{float k=coverage*plate;rgb=mix(rgb,vec3(1.),1.-k);a=mix(max(a,.96),face*.3,k);}
      }
      coverage=a>0.?a:grid;
    } else coverage*=strength;
  } else if(uMark==1){
    // Halftone: dot area follows tone, so midtones read true; edges are antialiased to one device pixel.
    float r=sqrt(ink.a)*min(uPitch.x,uPitch.y)*.5*uDotScale;
    coverage=ink.a>.003?clamp(r-length(local-uPitch*.5)+.5,0.,1.):0.;
  } else if(ink.a<=0.){
    coverage=0.;
  } else {
    float tone=ink.a,side=min(uPitch.x,uPitch.y);
    vec2 q=local/uPitch,c=uPitch*.5,p=local+.5;
    // Tiles fade with the tone in one ink, as the Studio's do; in source colour the colour already carries it.
    float fade=uSourceColor>.5?1.:tone,gap=max(.5,uPitch.x*.06),grain=hash(cell+SEED);
    vec2 w=(cell+q)*uPitch/uPitch.y;
    if(uMark==2)coverage=fade;
    else if(uMark==3)coverage=box(p,vec2(0.),uPitch-gap)*fade;
    else if(uMark==4){
      // Lego: a gapped brick, lit from above, with a raised stud ringed by its shadow.
      coverage=box(p,vec2(0.),uPitch-gap)*fade;
      rgb*=1.06-.14*q.y;
      float r=side*.28,d=length(local-c)-r,lit=clamp(dot(c-local,vec2(.6,.8))/r,-1.,1.);
      rgb=mix(rgb,mix(rgb,vec3(1.),.2+.12*lit),cover(d));
      rgb=mix(rgb,rgb*.72,cover(abs(d)-max(.5,side*.04)));
    } else if(uMark==5){
      // Voxel: an isometric cube; top, left and right faces at full, .72 and .42 strength.
      float h=.5*abs(q.x-.5);
      coverage=cover(-min(q.y-h,1.-h-q.y)*uPitch.y)*cover(-min(q.x,1.-q.x)*uPitch.x);
      coverage*=mix(q.x<.5?.72:.42,1.,cover((q.y-(.5-h))*uPitch.y))*fade;
    } else if(uMark==6){
      // Disco: a gapped mirror tile, its upper facet catching light and its lower in shade.
      coverage=box(p,vec2(0.),uPitch-gap)*fade;
      rgb=q.y<.35?mix(rgb,vec3(1.),.1+grain*.25):q.y>.65?rgb*.75:rgb;
    } else if(uMark==18){
      // Tick: a printed glow. A smooth wash carries the light; over it every cell holds one short upright tick whose strength
      // steps through four levels by a 4x4 ordered threshold, so the mid tones read as a crisp dither of ticks that brightens
      // toward the light and melts into the wash at its core. With a ramp the wash runs through it and the ticks sit a step up.
      ivec2 b=ivec2(mod(cell,4.));
      float th=(BAYER[b.y*4+b.x]+.5)/16.;
      float tw=max(1.,floor(uPitch.x*.28+.5)),tl=max(2.,floor(uPitch.y*.46+.5));
      vec2 lo=floor(c-vec2(tw,tl)*.5);
      float bar=box(p,lo,lo+vec2(tw,tl));
      float lvl=clamp(floor(tone*4.+th)/4.,0.,1.);
      float melt=1.-smoothstep(.7,.96,tone);
      float at=bar*melt*(.42+.58*lvl);
      bool ramped=uRampCount>1.5&&uSourceColor<.5;
      float aw=ramped?pow(smoothstep(.08,.88,tone),1.4):tone*tone*.92;
      vec3 W=ramped?rampAt(tone):rgb,T=ramped?rampAt(min(1.,lvl+.38)):rgb;
      float a=at+aw*(1.-at);
      rgb=a>0.?(T*at+W*aw*(1.-at))/a:W;
      coverage=a;
    } else if(uMark==19){
      // Bayer: one gapped square a cell, on or off by a 4x4 ordered threshold at two strengths, so a picture steps through
      // empty, half and full squares in the brand's tones, as pixel-dithered art does.
      ivec2 b=ivec2(mod(cell,4.));
      float th=(BAYER[b.y*4+b.x]+.5)/16.,g=max(1.,floor(min(uPitch.x,uPitch.y)*(1.-uDotScale)+.5));
      float lvl=tone>.5+th*.5?1.:tone>th*.5?.5:0.;
      // An empty cell keeps a small faint square, so the ground reads as a dot grid that the picture fills.
      vec2 d=floor(c-max(1.,floor(min(uPitch.x,uPitch.y)*.3))*.5);
      coverage=lvl>0.?box(p,vec2(0.),uPitch-g)*lvl:box(p,d,d+max(1.,floor(min(uPitch.x,uPitch.y)*.3)))*.35;
    } else if(uMark==7){
      // Dither: an ordered 4x4 Bayer screen at about five dots a cell, lit where the cell's tone passes the threshold.
      ivec2 b=ivec2(mod(floor(frag/max(1.,floor(side/5.))),4.));
      coverage=tone>(BAYER[b.y*4+b.x]+.5)/16.?1.:0.;
    } else if(uMark==8){
      // Hex: a flat-topped hexagon filling the cell.
      vec2 h=abs((local-c)/(uPitch*.49));
      coverage=cover(max(h.y-.866,h.x*.866+h.y*.5-.866)*side*.49)*fade;
    } else if(uMark==9){
      // LED: a round lamp with a soft halo and a specular glint, separated by an unlit matrix.
      float r=side*.39,d=length(local-c);
      coverage=max(cover(d-r),.3*exp(-pow(max(0.,d-r)/(side*.12),2.)))*fade;
      rgb=mix(rgb,vec3(1.),.35*disc(local,uPitch*vec2(.43,.4),side*.11));
    } else if(uMark==10){
      // CMYK: the cell's hue separated into offset cyan, magenta and yellow dots, each sized by its share of the tone. The
      // key screen carries the neutral share in the ink's own lightness, since a light ink on a dark page has no black.
      float top=max(rgb.r,max(rgb.g,rgb.b)),low=min(rgb.r,min(rgb.g,rgb.b));
      vec3 cmy=(top-rgb)/max(top,.001);
      float a=0.;vec3 col=vec3(1.);
      lay(col,a,vec3(top),disc(local,c,side*.48*sqrt(tone*low/max(top,.001))));
      lay(col,a,vec3(0.,1.,1.),disc(local,uPitch*vec2(.36,.36),side*.48*sqrt(tone*cmy.x)));
      lay(col,a,vec3(1.,0.,1.),disc(local,uPitch*vec2(.64,.36),side*.48*sqrt(tone*cmy.y)));
      lay(col,a,vec3(1.,1.,0.),disc(local,uPitch*vec2(.5,.66),side*.48*sqrt(tone*cmy.z)));
      rgb=col;coverage=a;
    } else if(uMark==11||uMark==16){
      // Stipple and pointillism: four jittered marks a cell, their size following the tone.
      coverage=0.;vec3 col=rgb;
      for(int m=0;m<4;m++){
        vec2 o=vec2(float(m%2),float(m/2));
        float j=hash(cell*2.+o+SEED),jy=hash(cell+o*11.+SEED+1.);
        vec2 at=((o+.5)/2.+(vec2(j,jy)-.5)*ROUGH*.28)*uPitch;
        float r=min(min(min(at.x,uPitch.x-at.x),min(at.y,uPitch.y-at.y)),side*min(.245,.21*sqrt(tone)*(1.-ROUGH*j*.35)));
        float k=uMark==11?disc(local,at,r):ellipse(local,at,vec2(r,r*.64),j*3.14159);
        if(uMark==16&&k>coverage)col=uSourceColor>.5?clamp(rgb+(j-.5)*ROUGH*.25*vec3(1.,-.4,-1.),0.,1.):rgb*(1.+(j-.5)*ROUGH*.5);
        coverage=max(coverage,k);
      }
      rgb=col;
    } else if(uMark==12||uMark==13){
      // Engraving and crosshatch: parallel cuts whose weight follows the tone; crossings join only in the darker tones.
      float cv=tone*(1.-ROUGH*grain*.3),px=uPitch.y,P=uLine.x,W=uLine.y*.72*P;
      coverage=cuts(w,DIR,P,min(.94*P,W*cv),px);
      if(uMark==13){
        coverage=max(coverage,cuts(w,vec2(-DIR.y,DIR.x),P,min(.94*P,W*max(0.,cv*1.5-.3)),px)*step(.2,cv));
        coverage=max(coverage,cuts(w,normalize(DIR+vec2(-DIR.y,DIR.x)),P,min(.94*P,W*max(0.,cv*2.-1.2)),px)*step(.6,cv));
      }
      // Sparkle: now and then a lit cell catches a small bright square, picked afresh a few times a second.
      if(uLine.z>0.&&tone>.2&&hash(cell*1.7+uInlay.z*.53)<uLine.z){float sq=max(1.,floor(side*.3+.5));vec2 lo=floor(c-sq*.5);float k=box(p,lo,lo+sq);coverage=max(coverage,k);rgb=mix(rgb,vec3(1.),k*.6);}
    } else if(uMark==14){
      // Woodblock: broad carved bands in five stepped weights, their edges wavering along the grain.
      float cv=ceil(tone*(1.-ROUGH*grain*.3)*5.)/5.,width=min(.94,.72*cv);
      float proj=dot(vec2(-DIR.y,DIR.x),w),line=floor(proj+.5),along=dot(DIR,w);
      float cut=sin(along*5.3+line*1.9+SEED)*.5+sin(along*13.1+line)*.25;
      coverage=cover((abs(proj-line)-width*.5*(1.+ROUGH*cut*.5))*uPitch.y);
    } else if(uMark==15){
      // Risograph: two offset screens, the main ink and the coral second ink, misregistered along the screen angle.
      float split=uSourceColor>.5?clamp(.5+(rgb.r-rgb.b)*.5,0.,1.):.5,r=side*min(.48,.44*sqrt(tone));
      float a=0.;vec3 col=rgb;
      lay(col,a,rgb,disc(local,c,r*sqrt(.35+(1.-split)*.65)));
      lay(col,a,SECOND,disc(local,c+DIR*.2*.38*side,r*sqrt(.3+split*.7)*(1.-ROUGH*hash(cell+SEED+13.)*.3)));
      rgb=col;coverage=a;
    } else coverage=0.;
  }
  return vec4(rgb*coverage+under.rgb*(1.-coverage),coverage+under.a*(1.-coverage));
}
void main(){
  vec2 frag=vec2(gl_FragCoord.x,uResolution.y-gl_FragCoord.y);
  if(uPost2.y>0.){
    // Curvature: the picture bows outward as on a tube, normalised so its corners stay near the frame; outside it is empty.
    vec2 q=frag/uResolution-.5;
    float k=uPost2.y*.5;
    q=q*(1.+k*dot(q,q)*vec2(1.,1.))/(1.+k*.5);
    frag=(q+.5)*uResolution;
    if(frag.x<0.||frag.y<0.||frag.x>=uResolution.x||frag.y>=uResolution.y){outColor=vec4(0.);return;}
  }
  vec4 c=drawAt(frag);
  if(uPost2.x>0.){
    // Chromatic split: red and blue drawn a little apart, more toward the edges.
    vec2 q=frag/uResolution-.5,d=q*dot(q,q)*uPost2.x*uResolution.y*.08+normalize(q+1e-5)*uPost2.x*1.5;
    vec4 r=drawAt(clamp(frag+d,vec2(0.),uResolution-1.)),b=drawAt(clamp(frag-d,vec2(0.),uResolution-1.));
    c=vec4(r.r,c.g,b.b,max(c.a,max(r.a,b.a)));
  }
  if(uPost.x>0.){
    // Bloom: the cells' light, blurred through its mip chain at two radii, laid over in screen-like fashion.
    vec2 uv=frag/uPitch/vec2(textureSize(uGlow,0));
    float l=log2(max(uPost.y,.5));
    vec3 g=textureLod(uGlow,uv,l).rgb*.55+textureLod(uGlow,uv,l+1.5).rgb*.45;
    vec3 add=g*uPost.x;
    c.rgb=c.rgb+add*(1.-c.rgb*.5);
    c.a=max(c.a,min(1.,max(add.r,max(add.g,add.b))));
  }
  if(uPost.z>0.){
    // Scanlines: two thin dark bands a text row, as on a tube.
    float s=.5-.5*cos(frag.y*6.2831853*uPost2.w/uPitch.y);
    c.rgb*=1.-uPost.z*.45*s;
  }
  if(uPost.w>0.){
    // Film grain, new each frame, in the drawn light only so a transparent ground stays clear.
    float n=hash(floor(frag)+fract(uPost2.z*7.13)*vec2(91.7,37.3))-.5;
    c.rgb=clamp(c.rgb+n*uPost.w*.22*c.a,0.,1.);
  }
  outColor=c;
}\`,xo=new Map;function fr(e,t=!1){let n=\`\${e}\${t?"p":""}\`,a=xo.get(n);return a||(a=Vi.replace("uniform int uMark;",\`const int uMark=\${e};\`),t||(a=a.replace("uniform vec4 uPost, uPost2;","const vec4 uPost=vec4(0.), uPost2=vec4(0.,0.,0.,2.);")),xo.set(n,a)),a}var yt=\`#version 300 es
precision highp float;
precision highp sampler2D;
uniform vec2 uTexel;
out vec4 outColor;
vec2 here(){return gl_FragCoord.xy*uTexel;}
\`,ji=yt+\`
uniform sampler2D uVelocity;
uniform vec2 uFrom, uTo, uForce;
uniform float uAspect, uRadius;
float segment(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-8),0.,1.);return length(pa-ba*h);}
void main(){
  vec2 uv=here(),scale=vec2(uAspect,1.);
  float d=segment(uv*scale,uFrom*scale,uTo*scale);
  outColor=vec4(texture(uVelocity,uv).xy+uForce*exp(-d*d/(uRadius*uRadius)),0.,1.);
}\`,$i=yt+\`
uniform sampler2D uVelocity;
void main(){
  vec2 uv=here();
  float l=texture(uVelocity,uv-vec2(uTexel.x,0.)).y,r=texture(uVelocity,uv+vec2(uTexel.x,0.)).y;
  float t=texture(uVelocity,uv+vec2(0.,uTexel.y)).x,b=texture(uVelocity,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4(.5*(r-l-t+b),0.,0.,1.);
}\`,Ki=yt+\`
uniform sampler2D uVelocity, uCurl;
uniform float uStrength, uDt;
void main(){
  vec2 uv=here();
  float l=texture(uCurl,uv-vec2(uTexel.x,0.)).x,r=texture(uCurl,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uCurl,uv+vec2(0.,uTexel.y)).x,b=texture(uCurl,uv-vec2(0.,uTexel.y)).x,c=texture(uCurl,uv).x;
  vec2 force=.5*vec2(abs(t)-abs(b),abs(r)-abs(l));
  force=force/(length(force)+1e-4)*uStrength*c;
  force.y=-force.y;
  outColor=vec4(clamp(texture(uVelocity,uv).xy+force*uDt,-1000.,1000.),0.,1.);
}\`,Yi=yt+\`
uniform sampler2D uVelocity;
void main(){
  vec2 uv=here(),c=texture(uVelocity,uv).xy;
  float l=texture(uVelocity,uv-vec2(uTexel.x,0.)).x,r=texture(uVelocity,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uVelocity,uv+vec2(0.,uTexel.y)).y,b=texture(uVelocity,uv-vec2(0.,uTexel.y)).y;
  if(uv.x-uTexel.x<0.)l=-c.x;
  if(uv.x+uTexel.x>1.)r=-c.x;
  if(uv.y+uTexel.y>1.)t=-c.y;
  if(uv.y-uTexel.y<0.)b=-c.y;
  outColor=vec4(.5*(r-l+t-b),0.,0.,1.);
}\`,Qi=yt+\`
uniform sampler2D uSource;
uniform float uAmount;
void main(){outColor=vec4(texture(uSource,here()).x*uAmount,0.,0.,1.);}\`,Zi=yt+\`
uniform sampler2D uPressure, uDivergence;
void main(){
  vec2 uv=here();
  float l=texture(uPressure,uv-vec2(uTexel.x,0.)).x,r=texture(uPressure,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uPressure,uv+vec2(0.,uTexel.y)).x,b=texture(uPressure,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4((l+r+b+t-texture(uDivergence,uv).x)*.25,0.,0.,1.);
}\`,Ji=yt+\`
uniform sampler2D uPressure, uVelocity;
void main(){
  vec2 uv=here();
  float l=texture(uPressure,uv-vec2(uTexel.x,0.)).x,r=texture(uPressure,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uPressure,uv+vec2(0.,uTexel.y)).x,b=texture(uPressure,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4(texture(uVelocity,uv).xy-vec2(r-l,t-b),0.,1.);
}\`,el=yt+\`
uniform sampler2D uVelocity;
uniform float uDt, uDissipation;
void main(){
  vec2 uv=here();
  vec2 back=uv-uDt*texture(uVelocity,uv).xy*uTexel;
  outColor=vec4(texture(uVelocity,back).xy/(1.+uDissipation*uDt),0.,1.);
}\`,tl=20;function To(e,t,n){let a={splat:t(ji),curl:t($i),vorticity:t(Ki),divergence:t(Yi),fade:t(Qi),pressure:t(Zi),gradient:t(Ji),advect:t(el)},i=Object.values(a),l=0,c=0,o=[],f=[],d=null,m=null,g=A=>{let r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,A),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,A),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,l,c,0,e.RGBA,e.HALF_FLOAT,null);let E=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,E),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE?(e.deleteFramebuffer(E),e.deleteTexture(r),null):(e.viewport(0,0,l,c),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),{texture:r,buffer:E})},w=A=>{A&&(e.deleteTexture(A.texture),e.deleteFramebuffer(A.buffer))},T=()=>{[...o,...f,d,m].forEach(w),o=[],f=[],d=m=null},M=(A,r)=>{let E=A.locations;return e.useProgram(A.program),e.bindFramebuffer(e.FRAMEBUFFER,r.buffer),e.uniform2f(E.uTexel,1/l,1/c),E},x=(A,r,E,L)=>{e.activeTexture(e.TEXTURE0+E),e.bindTexture(e.TEXTURE_2D,L),e.uniform1i(A[r],E)},F=()=>e.drawArrays(e.TRIANGLES,0,3),v=A=>{let r=A[0];A[0]=A[1],A[1]=r};return{resize(A,r){T(),l=A,c=r;let E=[g(e.LINEAR),g(e.LINEAR),g(e.NEAREST),g(e.NEAREST),g(e.NEAREST),g(e.NEAREST)];return e.bindFramebuffer(e.FRAMEBUFFER,null),E.some(L=>!L)?(E.forEach(w),!1):(o=[E[0],E[1]],f=[E[2],E[3]],d=E[4],m=E[5],!0)},ready(){return i.every(n)},step(A,r){if(!o.length||!d||!m)return;e.viewport(0,0,l,c);let E;A&&(E=M(a.splat,o[1]),x(E,"uVelocity",0,o[0].texture),e.uniform2f(E.uFrom,A.from[0],A.from[1]),e.uniform2f(E.uTo,A.to[0],A.to[1]),e.uniform2f(E.uForce,A.force[0],A.force[1]),e.uniform1f(E.uAspect,r.aspect),e.uniform1f(E.uRadius,r.radius),F(),v(o)),r.curl>0&&(E=M(a.curl,m),x(E,"uVelocity",0,o[0].texture),F(),E=M(a.vorticity,o[1]),x(E,"uVelocity",0,o[0].texture),x(E,"uCurl",1,m.texture),e.uniform1f(E.uStrength,r.curl),e.uniform1f(E.uDt,r.dt),F(),v(o)),E=M(a.divergence,d),x(E,"uVelocity",0,o[0].texture),F(),E=M(a.fade,f[1]),x(E,"uSource",0,f[0].texture),e.uniform1f(E.uAmount,.8),F(),v(f);for(let L=0;L<tl;L++)E=M(a.pressure,f[1]),x(E,"uPressure",0,f[0].texture),x(E,"uDivergence",1,d.texture),F(),v(f);E=M(a.gradient,o[1]),x(E,"uPressure",0,f[0].texture),x(E,"uVelocity",1,o[0].texture),F(),v(o),E=M(a.advect,o[1]),x(E,"uVelocity",0,o[0].texture),e.uniform1f(E.uDt,r.dt),e.uniform1f(E.uDissipation,r.dissipation),F(),v(o),e.bindFramebuffer(e.FRAMEBUFFER,null)},get velocity(){return o[0]?.texture??null},get size(){return[l,c]},release:T,dispose(){T(),i.forEach(({program:A})=>e.deleteProgram(A))}}}function Hr(e,t,n){let a=0;for(;Math.max(e>>a,t>>a)>n&&e>>a+1>=1&&t>>a+1>=1;)a++;return{level:a,width:Math.max(1,e>>a),height:Math.max(1,t>>a)}}function Fo(e){let t=null,n=null,a=null,i=0,l=0,c=0,o=!1,f=null,d=-1;return{get pending(){return!!a},request(m,g,w,T){if(a||o||!g||!w)return!1;let M=Hr(g,w,T);try{t??(t=e.createFramebuffer()),n??(n=e.createBuffer());let x=e.getParameter(e.FRAMEBUFFER_BINDING);if(e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,m,M.level),f!==m||d!==M.level){if(e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)return e.bindFramebuffer(e.FRAMEBUFFER,x),o=!0,!1;f=m,d=M.level}let F=M.width*M.height*4;return e.bindBuffer(e.PIXEL_PACK_BUFFER,n),F!==i&&(e.bufferData(e.PIXEL_PACK_BUFFER,F,e.STREAM_READ),i=F),e.pixelStorei(e.PACK_ALIGNMENT,4),e.readPixels(0,0,M.width,M.height,e.RGBA,e.UNSIGNED_BYTE,0),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0),e.bindFramebuffer(e.FRAMEBUFFER,x),a=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0),e.flush(),l=M.width,c=M.height,!!a}catch{return o=!0,!1}},poll(){if(!a)return null;let m=e.clientWaitSync(a,0,0);if(m!==e.ALREADY_SIGNALED&&m!==e.CONDITION_SATISFIED)return m===e.WAIT_FAILED&&(e.deleteSync(a),a=null,o=!0),null;e.deleteSync(a),a=null;let g=new Uint8Array(l*c*4);return e.bindBuffer(e.PIXEL_PACK_BUFFER,n),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,g),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),{data:g,width:l,height:c}},dispose(){a&&e.deleteSync(a),t&&e.deleteFramebuffer(t),n&&e.deleteBuffer(n),a=t=n=null}}}var rl=\`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}\`,wo=\`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uSource;
uniform int uLevel;
float lum(vec3 c){ return dot(c,vec3(.2126,.7152,.0722)); }
\`,nl=\`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uSource;
uniform int uLevel, uWidth;
void main(){
  vec4 c=texelFetch(uSource,ivec2(gl_VertexID%uWidth,gl_VertexID/uWidth),uLevel);
  float bin=floor(dot(c.rgb,vec3(.2126,.7152,.0722))*255.+.5);
  gl_Position=c.a*255.<8.?vec4(2.,2.,0.,1.):vec4((bin+.5)/128.-1.,0.,0.,1.);
  gl_PointSize=1.;
}\`,al=\`#version 300 es
precision highp float;
out vec4 o;
void main(){ o=vec4(1.); }\`,ol=\`#version 300 es
precision highp float;
uniform sampler2D uHistogram;
out vec4 o;
void main(){
  float count=0.;
  for(int v=0;v<256;v++)count+=texelFetch(uHistogram,ivec2(v,0),0).r;
  if(count<.5){o=vec4(0.,1.,0.,1.);return;}
  float low=1.,high=1.,seen=0.;bool lowFound=false;
  for(int v=0;v<256;v++){
    seen+=texelFetch(uHistogram,ivec2(v,0),0).r;
    if(!lowFound&&seen>=count*.02){low=float(v)/255.;lowFound=true;}
    if(seen>=count*.98){high=float(v)/255.;break;}
  }
  o=high-low<.08?vec4(0.,1.,0.,1.):vec4(low,high,0.,1.);
}\`,il=\`\${wo}
uniform ivec2 uSize;
out vec4 o;
void main(){
  int ring=max(1,int(floor(float(min(uSize.x,uSize.y))*.03+.5)));
  float clear=0.,sum=0.,square=0.,count=0.;
  for(int y=0;y<128;y++){
    if(y>=uSize.y)break;
    for(int x=0;x<128;x++){
      if(x>=uSize.x)break;
      vec4 c=texelFetch(uSource,ivec2(x,y),uLevel);
      if(c.a*255.<249.5)clear+=1.;
      if(x>=ring&&y>=ring&&x<uSize.x-ring&&y<uSize.y-ring)continue;
      float l=lum(c.rgb);sum+=l;square+=l*l;count+=1.;
    }
  }
  float ground=sum/max(1.,count);
  o=vec4(clear/float(uSize.x*uSize.y),ground,sqrt(max(0.,square/max(1.,count)-ground*ground)),1.);
}\`,ll=\`\${wo}
uniform sampler2D uStats;
out vec4 o;
void main(){
  vec4 stats=texelFetch(uStats,ivec2(0),0);
  vec4 c=texelFetch(uSource,ivec2(gl_FragCoord.xy),uLevel);
  if(stats.x>.01){o=vec4(0.,0.,0.,c.a);return;}
  if(stats.z>=.07){o=vec4(1.,0.,0.,1.);return;}
  float t=clamp((abs(lum(c.rgb)-stats.y)-.035)/.12,0.,1.);
  o=vec4(0.,0.,0.,t*t*(3.-2.*t));
}\`,sl=\`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform ivec2 uStep;
uniform int uRadius;
out vec4 o;
void main(){
  ivec2 at=ivec2(gl_FragCoord.xy),last=textureSize(uImage,0)-1;
  float sum=0.,total=0.;
  for(int k=-16;k<=16;k++){
    if(k<-2*uRadius||k>2*uRadius)continue;
    float w=float(2*uRadius+1-abs(k));
    sum+=texelFetch(uImage,clamp(at+uStep*k,ivec2(0),last),0).a*w;total+=w;
  }
  o=vec4(texelFetch(uImage,at,0).r,0.,0.,sum/total);
}\`,Qn=new WeakMap,ko=e=>{Qn.delete(e)};function Ao(e){if(!e.getExtension("EXT_color_buffer_float")||!e.getExtension("EXT_float_blend"))return null;let t=(v,A=rl)=>{let r=(re,J)=>{let ne=e.createShader(re);return e.shaderSource(ne,J),e.compileShader(ne),ne},E=e.createProgram(),L=r(e.VERTEX_SHADER,A),Y=r(e.FRAGMENT_SHADER,v);if(e.attachShader(E,L),e.attachShader(E,Y),e.linkProgram(E),e.deleteShader(L),e.deleteShader(Y),!e.getProgramParameter(E,e.LINK_STATUS))return e.deleteProgram(E),null;let Q=new Map;return{program:E,at:re=>(Q.has(re)||Q.set(re,e.getUniformLocation(E,re)),Q.get(re))}},n=Qn.get(e);n||Qn.set(e,n=new Map);let a=n,i=(v,A)=>{let r=a.get(v);if(r)return r;let E=A();if(!E)throw new Error("The glyph field could not build its GPU measure.");return a.set(v,E),E},l=[],c=(v,A,r,E)=>{let L=e.createTexture(),Y=e.createFramebuffer();e.bindTexture(e.TEXTURE_2D,L);for(let[re,J]of[[e.TEXTURE_MIN_FILTER,E],[e.TEXTURE_MAG_FILTER,E],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,re,J);let Q={texture:L,buffer:Y,width:0,height:0,format:v,type:A,base:r};return l.push(Q),Q},o=(v,A,r)=>{let E=v;v.width===A&&v.height===r||(v.width=A,v.height=r,e.bindTexture(e.TEXTURE_2D,v.texture),e.texImage2D(e.TEXTURE_2D,0,E.format,A,r,0,E.base,E.type,null),e.bindFramebuffer(e.FRAMEBUFFER,v.buffer),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,v.texture,0))},f=null,d=null,m=null,g=null,w=null,T=null,M=e.createVertexArray(),x=(v,A)=>{e.bindFramebuffer(e.FRAMEBUFFER,A.buffer),e.viewport(0,0,A.width,A.height),e.useProgram(v.program)},F=(v,A,r)=>{e.activeTexture(e.TEXTURE11),e.bindTexture(e.TEXTURE_2D,v),e.uniform1i(A.at(r),11)};return{get levels(){return d?.texture??null},get scope(){return T?.texture??null},measureLevels(v,A,r){let E=Hr(A,r,128),L=i("histogram",()=>t(al,nl)),Y=i("levels",()=>t(ol));f??(f=c(e.R32F,e.FLOAT,e.RED,e.NEAREST)),d??(d=c(e.RGBA32F,e.FLOAT,e.RGBA,e.NEAREST)),o(f,256,1),o(d,1,1),x(L,f),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),F(v,L,"uSource"),e.uniform1i(L.at("uLevel"),E.level),e.uniform1i(L.at("uWidth"),E.width),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(M),e.drawArrays(e.POINTS,0,E.width*E.height),e.disable(e.BLEND),x(Y,d),F(f.texture,Y,"uHistogram"),e.drawArrays(e.TRIANGLES,0,3)},measureScope(v,A,r){let E=Hr(A,r,128),L=Math.min(128,E.width),Y=Math.min(128,E.height),Q=i("stats",()=>t(il)),re=i("subject",()=>t(ll)),J=i("blur",()=>t(sl));m??(m=c(e.RGBA32F,e.FLOAT,e.RGBA,e.NEAREST)),g??(g=c(e.RGBA8,e.UNSIGNED_BYTE,e.RGBA,e.NEAREST)),w??(w=c(e.RGBA8,e.UNSIGNED_BYTE,e.RGBA,e.NEAREST)),T??(T=c(e.RGBA8,e.UNSIGNED_BYTE,e.RGBA,e.LINEAR)),o(m,1,1),o(g,L,Y),o(w,L,Y),o(T,L,Y),e.bindVertexArray(M),x(Q,m),F(v,Q,"uSource"),e.uniform1i(Q.at("uLevel"),E.level),e.uniform2i(Q.at("uSize"),L,Y),e.drawArrays(e.TRIANGLES,0,3),x(re,g),F(v,re,"uSource"),e.uniform1i(re.at("uLevel"),E.level),e.activeTexture(e.TEXTURE12),e.bindTexture(e.TEXTURE_2D,m.texture),e.uniform1i(re.at("uStats"),12),e.drawArrays(e.TRIANGLES,0,3);let ne=Math.min(8,Math.max(1,Math.round(Math.min(L,Y)*.02)));x(J,w),F(g.texture,J,"uImage"),e.uniform2i(J.at("uStep"),1,0),e.uniform1i(J.at("uRadius"),ne),e.drawArrays(e.TRIANGLES,0,3),x(J,T),F(w.texture,J,"uImage"),e.uniform2i(J.at("uStep"),0,1),e.drawArrays(e.TRIANGLES,0,3)},dispose(){for(let v of l)e.deleteTexture(v.texture),e.deleteFramebuffer(v.buffer);M&&e.deleteVertexArray(M),l.length=0,f=d=m=g=w=T=null}}}var cl=\`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}\`,Yt=new Set,Ro=new Set,Et=0,ra=0,So=null,Vr=120,No=new Float64Array(Vr),Qt=0,Ho=(e=Qt)=>{let t=Math.min(e,Qt),n=new Array(t);for(let a=0;a<t;a++)n[a]=No[(pr-t+a)%Vr];return n},Kt=0,pr=0,mr=1,Xr=0,Lo=0;function ul(e){Et=0,Kt&&e>Kt&&(No[pr%Vr]=e-Kt,pr++,Qt<Vr&&Qt++),Kt=e,ra=performance.now();let t=Yt;Yt=Ro,Ro=t;for(let a of t)try{a(e)}catch(i){typeof console<"u"&&console.error(i)}t.clear(),Mt?.endFrame(e);let n=performance.now()-ra;if(Xr=Xr*.9+n*.1,e-Lo>500){Lo=e;let a=zo(),i=!!Mt?.overloaded;(Xr>a*.5||i)&&mr<3?mr++:Xr<a*.2&&!i&&mr>1&&mr--}Yt.size||(Kt=0)}var Xo=()=>mr;function aa(e){Yt.add(e),Et&&So!==requestAnimationFrame&&(Et=0),Et||(So=requestAnimationFrame,Et=requestAnimationFrame(ul))}function oa(e){Yt.delete(e),!Yt.size&&Et&&(cancelAnimationFrame(Et),Et=0,Kt=0)}var Co=1e3/60,_o=-1/0;function zo(){if(Qt<20)return 1e3/60;if(pr-_o<15)return Co;_o=pr;let e=Ho().sort((t,n)=>t-n);return Co=Math.min(1e3/60,Math.max(1e3/360,e[Math.floor(e.length*.2)]))}var gr=new Set,ia=new Set,la=new Set,qo=new Set,sa=new Set,Zn=!1,Po=null,Jn=null,ea=null,zr=null,Do=e=>{let t=null;for(let n of gr){if(n.target===window){(!n.near||n.near()||n.inside)&&n.move(e);continue}t??(t=e.composedPath()),t.includes(n.target)?(n.inside=!0,n.move(e)):n.inside&&(n.inside=!1,n.leave())}},fl=()=>{for(let e of gr)e.inside=!1,e.leave()},hl=()=>{for(let e of[...ia])e()},dl=()=>{for(let e of[...la])e()},Go=()=>{for(let e of[...qo])e()},ml=e=>{for(let t of[...sa])t(e)},pl=()=>typeof document>"u"?void 0:document.fonts;function Io(){let e=gr.size+ia.size+la.size+qo.size+sa.size>0;if(typeof document>"u"||(Po!==document&&(Zn=!1,Po=document,Jn=ea=null,zr=null),e===Zn))return;Zn=e;let t=e?"addEventListener":"removeEventListener";if(typeof window<"u"&&(window[t]?.("pointermove",Do,{capture:!0,passive:!0}),window[t]?.("pointerdown",Do,{capture:!0,passive:!0})),document[t]?.("pointerleave",fl),document[t]?.("visibilitychange",hl),pl()?.[t]?.("loadingdone",ml),Jn??(Jn=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null),ea??(ea=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):null),Jn?.[t]?.("change",dl),ea?.[t]?.("change",Go),e){zr??(zr=typeof MutationObserver=="function"?new MutationObserver(Go):null);for(let n of[document.documentElement,document.body])n&&zr?.observe(n,{attributes:!0,attributeFilter:["class","data-theme","data-mode","style"]})}else zr?.disconnect()}var br=(e,t)=>(e.add(t),Io(),()=>{e.delete(t)&&Io()});function Vo(e){let t=e.target;if(typeof window>"u"||t===window||typeof document>"u")return br(gr,e);let n=t,a=n.getRootNode?.();if(n.ownerDocument===document&&(!a||a===document))return br(gr,e);let i=e.move,l=()=>e.leave();return n.addEventListener("pointermove",i,{passive:!0}),n.addEventListener("pointerdown",i,{passive:!0}),n.addEventListener("pointerleave",l),()=>{n.removeEventListener("pointermove",i),n.removeEventListener("pointerdown",i),n.removeEventListener("pointerleave",l)}}var jo=e=>br(ia,e),$o=e=>br(la,e);var Ko=e=>br(sa,e),hr=new Map,dr=null,ta=new Map,Yo=e=>t=>{for(let n of t)for(let a of[...e.get(n.target)??[]])a(n)},Qo=(e,t,n)=>{let a=e.get(t);return a?(a.add(n),!1):(e.set(t,new Set([n])),!0)},Zo=(e,t,n)=>{let a=e.get(t);return!a?.delete(n)||a.size?!1:(e.delete(t),!0)};function jr(e,t){return typeof ResizeObserver!="function"?()=>{}:(dr??(dr=new ResizeObserver(Yo(hr))),Qo(hr,e,t)?dr.observe(e):queueMicrotask(()=>{hr.get(e)?.has(t)&&t({target:e})}),()=>{Zo(hr,e,t)&&dr?.unobserve(e),hr.size||(dr?.disconnect(),dr=null)})}function Jo(e,t,n){if(typeof IntersectionObserver!="function")return()=>{};let a=ta.get(t);if(!a){let c=new Map;a={observer:new IntersectionObserver(Yo(c),{rootMargin:t}),watch:c},ta.set(t,a)}let{observer:i,watch:l}=a;return Qo(l,e,n)||i.unobserve(e),i.observe(e),()=>{Zo(l,e,n)&&i.unobserve(e),l.size||(i.disconnect(),ta.delete(t))}}var Uo=new WeakMap;function ca(e){let t=Uo.get(e);if(t)return t;let n={activeTexture:e.activeTexture.bind(e),bindTexture:e.bindTexture.bind(e),deleteTexture:e.deleteTexture.bind(e),useProgram:e.useProgram.bind(e),deleteProgram:e.deleteProgram.bind(e),bindFramebuffer:e.bindFramebuffer.bind(e),deleteFramebuffer:e.deleteFramebuffer.bind(e),viewport:e.viewport.bind(e),pixelStorei:e.pixelStorei.bind(e)},a=e.TEXTURE0,i=e.TEXTURE_2D,l=e.FRAMEBUFFER,c=[],o=-1,f,d,m="",g=new Map,w=()=>{c.length=0,o=-1,f=void 0,d=void 0,m="",g.clear()},T=e;return T.activeTexture=M=>{let x=M-a;x!==o&&(o=x,n.activeTexture(M))},T.bindTexture=(M,x)=>{if(M===i&&o>=0){if(c[o]===x)return;c[o]=x}else M===i&&(c.length=0);n.bindTexture(M,x)},T.deleteTexture=M=>{for(let x=0;x<c.length;x++)c[x]===M&&(c[x]=void 0);n.deleteTexture(M)},T.useProgram=M=>{M!==f&&(f=M,n.useProgram(M))},T.deleteProgram=M=>{M===f&&(f=void 0),n.deleteProgram(M)},T.bindFramebuffer=(M,x)=>{if(M===l){if(x===d)return;d=x}else d=void 0;n.bindFramebuffer(M,x)},T.deleteFramebuffer=M=>{M===d&&(d=void 0),n.deleteFramebuffer(M)},T.pixelStorei=(M,x)=>{g.get(M)!==x&&(g.set(M,x),n.pixelStorei(M,x))},T.viewport=(M,x,F,v)=>{let A=\`\${M},\${x},\${F},\${v}\`;A!==m&&(m=A,n.viewport(M,x,F,v))},Uo.set(e,w),w}var gl=3e3,Oo=256*1024*1024,bl=32,qr=[1,.85,.7,.58,.5],xr=class{constructor(t,n){this.gl=t;this.onChange=n;this.level=0;this.overloaded=!1;this.queries=[];this.open=null;this.drew=!1;this.gpuMs=[];this.cpuMs=[];this.changedAt=0;this.checkedAt=-1/0;this.frameNo=0;this.timer=t.getExtension("EXT_disjoint_timer_query_webgl2")}begin(){if(!this.drew&&(this.drew=!0,this.timer&&!this.open&&this.queries.length<4&&(this.frameNo++&7)===0)){let t=this.gl.createQuery();t&&(this.gl.beginQuery(this.timer.TIME_ELAPSED_EXT,t),this.open=t)}}end(t,n){let a=this.gl,i=this.timer;if(this.drew&&(this.cpuMs.push(n),this.cpuMs.length>60&&this.cpuMs.shift(),i&&this.open&&(a.endQuery(i.TIME_ELAPSED_EXT),this.queries.push({query:this.open,frame:t}),this.open=null)),this.drew=!1,i&&this.queries.length&&a.getQueryParameter(this.queries[0].query,a.QUERY_RESULT_AVAILABLE)){let l=a.getParameter(i.GPU_DISJOINT_EXT);for(;this.queries.length&&a.getQueryParameter(this.queries[0].query,a.QUERY_RESULT_AVAILABLE);){let{query:c}=this.queries.shift();l||(this.gpuMs.push(a.getQueryParameter(c,a.QUERY_RESULT)/1e6),this.gpuMs.length>60&&this.gpuMs.shift()),a.deleteQuery(c)}}this.adapt(t)}skip(){this.drew=!1}reset(){this.queries=[],this.open=null,this.gpuMs=[],this.cpuMs=[]}adapt(t){if(t-this.checkedAt<250)return;this.checkedAt=t;let n=zo(),a=this.gpuMs.length>=5&&Math.min(...this.gpuMs.slice(-5))>n*1.5,i=this.gpuMs.length>=10||a?this.gpuMs:null,l;if(i)l=i.slice().sort((o,f)=>o-f)[Math.floor(i.length*.75)]/n;else{if(Qt<30||this.cpuMs.length<10)return;let o=Ho(30).sort((d,m)=>d-m),f=this.cpuMs.slice().sort((d,m)=>d-m)[this.cpuMs.length>>1];l=o[Math.floor(o.length*.75)]/n>1.6&&f<n*.5?1:.5}if(this.overloaded=l>.8&&this.atMinimum,t-this.changedAt<(l>.8?800:4e3))return;let c=this.level;l>2?c=qr.length-1:l>.8&&c<qr.length-1?c++:l<.3&&c>0&&c--,c!==this.level&&(this.level=c,this.changedAt=t,this.gpuMs=[],this.cpuMs=[],this.onChange())}get scale(){return qr[this.level]}get atMinimum(){return this.level===qr.length-1}},na=class{constructor(){this.lost=!1;this.programs=new Map;this.atlases=new Map;this.vertex=null;this.vao=null;this.clients=new Set;this.parallel=null;this.lostTimer=0;this.renderer="";this.forgetState=()=>{};this.onLost=t=>{t.preventDefault(),this.lost=!0,this.forgetState(),this.reset();for(let n of[...this.clients])n.lost();clearTimeout(this.lostTimer),this.lostTimer=setTimeout(()=>{if(this.lost){this.canvas.removeEventListener?.("webglcontextlost",this.onLost),this.canvas.removeEventListener?.("webglcontextrestored",this.onRestored);try{this.create()}catch{return}this.restored()}},1e3)};this.onRestored=()=>{clearTimeout(this.lostTimer),this.lost=!1,this.forgetState(),this.restored()};this.idleTimer=0;this.create()}create(){let t=null,n=null,a={alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"};if(typeof document<"u"&&(t=document.createElement("canvas"),n=t.getContext("webgl2",a)),!n&&typeof OffscreenCanvas=="function")try{t=new OffscreenCanvas(1,1),n=t.getContext("webgl2",a)}catch{n=null}if(!n||!t)throw new Error("WebGL2 is not available for the glyph field.");this.canvas=t,this.gl=n,this.forgetState=ca(n),this.lost=!1,t.width=t.height=1,this.parallel=n.getExtension("KHR_parallel_shader_compile");let i=this.frames?.level??0;this.frames=new xr(n,()=>{for(let o of[...this.clients])o.rescale()}),this.frames.level=i;let l=n.getExtension("WEBGL_debug_renderer_info");this.renderer=String(n.getParameter(l?l.UNMASKED_RENDERER_WEBGL:n.RENDERER)??""),t.addEventListener?.("webglcontextlost",this.onLost),t.addEventListener?.("webglcontextrestored",this.onRestored);let c=!n.getExtension("EXT_color_buffer_float")&&!n.getExtension("EXT_color_buffer_half_float");this.program(Nr(c)),this.program(fr(0))}restored(){for(let t of[...this.clients])t.restored()}reset(){this.programs.clear(),this.atlases.clear(),this.vertex=null,this.vao=null,this.frames.reset()}join(t){this.clients.add(t),clearTimeout(this.idleTimer)}leave(t){if(this.clients.delete(t),this.clients.size){this.fit();return}this.lost||(this.canvas.width=this.canvas.height=1,this.frames.level=0),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>{this.clients.size||this.dispose()},gl)}dispose(){if(clearTimeout(this.lostTimer),this.canvas.removeEventListener?.("webglcontextlost",this.onLost),this.canvas.removeEventListener?.("webglcontextrestored",this.onRestored),!this.lost)try{this.gl.getExtension("WEBGL_lose_context")?.loseContext()}catch{}this.reset(),Mt===this&&(Mt=null)}program(t){let n=this.programs.get(t);if(n)return n;let a=this.gl,i=(f,d)=>{let m=a.createShader(f);return a.shaderSource(m,d),a.compileShader(m),m};this.vertex??(this.vertex=i(a.VERTEX_SHADER,cl));let l=a.createProgram(),c=i(a.FRAGMENT_SHADER,t);a.attachShader(l,this.vertex),a.attachShader(l,c),a.linkProgram(l);let o={program:l,locations:null,fragment:c};return this.programs.set(t,o),o}linked(t,n=!1){if(t.locations)return!0;let a=this.gl;if(!n&&this.parallel&&!a.getProgramParameter(t.program,this.parallel.COMPLETION_STATUS_KHR))return!1;if(!a.getProgramParameter(t.program,a.LINK_STATUS)){if(a.isContextLost())return!1;throw new Error(t.fragment&&a.getShaderInfoLog(t.fragment)||a.getProgramInfoLog(t.program)||"Glyph field program failed to link.")}let i={};for(let l=a.getProgramParameter(t.program,a.ACTIVE_UNIFORMS)-1;l>=0;l--){let c=a.getActiveUniform(t.program,l).name.replace(/\\[0\\]$/,"");i[c]=a.getUniformLocation(t.program,c)}return t.locations=i,!0}get canCompileInParallel(){return!!this.parallel}vertexArray(){return this.vao??(this.vao=this.gl.createVertexArray())}atlas(t,n,a){let i=this.atlases.get(t);if(i)i.refs||(this.atlases.delete(t),this.atlases.set(t,i));else{let l=this.gl,c=l.createTexture();l.bindTexture(l.TEXTURE_2D,c);for(let[o,f]of[[l.TEXTURE_MIN_FILTER,l.NEAREST],[l.TEXTURE_MAG_FILTER,l.NEAREST],[l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE],[l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE]])l.texParameteri(l.TEXTURE_2D,o,f);i={key:t,texture:c,refs:0,final:!1,users:new Set,bytes:0},this.atlases.set(t,i),this.paintAtlas(i,n)}return i.refs++,i.users.add(a),i}hasAtlas(t){return this.atlases.has(t)}paintAtlas(t,n){let a=this.gl,{image:i,final:l}=n();a.bindTexture(a.TEXTURE_2D,t.texture),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,i),t.bytes=i.width*i.height*4,t.final=l;for(let c of[...t.users])c()}releaseAtlas(t,n){!t||!t.users.delete(n)||--t.refs>0||this.evictAtlases()}evictAtlases(){let t=[...this.atlases.values()].filter(a=>!a.refs),n=t.length-bl;for(let a of t){if(n<=0&&!this.overBudget)break;n--,this.atlases.delete(a.key),this.lost||this.gl.deleteTexture(a.texture)}}fit(){if(this.lost)return;let t=1,n=1;for(let l of this.clients){let[c,o]=l.size();t=Math.max(t,c),n=Math.max(n,o)}let a=this.canvas,i=l=>Math.ceil(l/256)*256;a.width*a.height>i(t)*i(n)*2&&(a.width=i(t),a.height=i(n))}get bytes(){let t=this.canvas.width*this.canvas.height*4*2;for(let n of this.clients)t+=n.bytes();for(let n of this.atlases.values())t+=n.bytes;return t}get overBudget(){return this.bytes>Oo}get roomy(){return this.bytes<Oo*.85}begin(t,n){let a=this.canvas;if(a.width<t||a.height<n){let i=l=>Math.ceil(l/256)*256;a.width=Math.max(a.width,i(t)),a.height=Math.max(a.height,i(n))}this.frames.begin()}present(t,n,a){t.globalCompositeOperation="copy",t.imageSmoothingEnabled=!1,t.drawImage(this.canvas,0,this.canvas.height-a,n,a,0,0,n,a)}endFrame(t){if(this.lost){this.frames.skip();return}this.frames.end(t,performance.now()-ra)}get level(){return this.frames.level}get overloaded(){return this.frames.overloaded}get scale(){return this.frames.scale}get atMinimum(){return this.frames.atMinimum}},Mt=null,Bo=!1;function ei(){if(Mt||Bo)return Mt;try{Mt=new na}catch{Bo=!0}return Mt}var Wo=new WeakSet,ti=(e,t)=>{t?Wo.add(e):Wo.delete(e)};var xl=/^[\\u1100-\\u115f\\u2e80-\\ua4cf\\uac00-\\ud7a3\\uf900-\\ufaff\\ufe30-\\ufe4f\\uff00-\\uff60\\uffe0-\\uffe6]|^[\\u{20000}-\\u{3fffd}]/u,$r=e=>xl.test(e),ri='"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", YuGothic, "Noto Sans JP", "Noto Sans CJK JP", Meiryo, sans-serif';var Kr=class{constructor(t,n,a){this.previous=null;this.peak=0;this.width=t,this.height=n,this.span=a??Math.min(t,n);let i=t*n;this.pixels=new Uint8Array(i*4),this.signal=new Float32Array(i),this.offsetX=new Float32Array(i),this.offsetY=new Float32Array(i),this.driftX=new Float32Array(i),this.driftY=new Float32Array(i),this.u=new Float32Array(i),this.v=new Float32Array(i),this.ink=new Float32Array(i),this.a=new Float32Array(i),this.b=new Float32Array(i),this.c=new Float32Array(i),this.pressure=new Float32Array(i),this.pressureNext=new Float32Array(i),this.divergence=new Float32Array(i),this.curl=new Float32Array(i)}get active(){return this.peak>2e-4}clear(){for(let t of[this.u,this.v,this.ink,this.a,this.b,this.c,this.pressure,this.pressureNext,this.divergence,this.curl,this.signal,this.pixels,this.offsetX,this.offsetY,this.driftX,this.driftY])t.fill(0);this.previous=null,this.peak=0}leave(){this.previous=null}move(t,n,a,i=performance.now()){if(!Number.isFinite(t+n+a+i))return;t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n)),a=Math.max(.1,Math.min(1,a));let l=this.previous;if(this.previous={x:t,y:n,time:i},!l)return;let c=(t-l.x)*(this.width-1),o=(n-l.y)*(this.height-1),f=Math.hypot(c,o);if(f<.001)return;let d=this.span,m=i>l.time?Math.max(1/240,(i-l.time)/1e3):1/60,g=Math.min(12,f/d/m),w=1-Math.exp(-g/2.2),T=d*(.022+a*.075)*(.65+w*.95),M=Math.min(128,Math.max(1,Math.ceil(f/(T*.4)))),x=f/T*(.32+w*.22)/M,F=c/f,v=o/f,A=-v,r=F,E=f*(2+w*18)/M;for(let L=0;L<M;L++){let Y=(L+.5)/M,Q=(l.x+(t-l.x)*Y)*(this.width-1),re=(l.y+(n-l.y)*Y)*(this.height-1),J=Math.max(1,Math.floor(Q-T*3)),ne=Math.min(this.width-2,Math.ceil(Q+T*3)),_=Math.max(1,Math.floor(re-T*3)),ee=Math.min(this.height-2,Math.ceil(re+T*3));for(let K=_;K<=ee;K++)for(let S=J;S<=ne;S++){let D=((S-Q)*F+(K-re)*v)/T,Z=((S-Q)*A+(K-re)*r)/T,q=Math.exp(-D*D*.65-Z*Z*1.7),C=K*this.width+S;this.ink[C]=1-(1-this.ink[C])*Math.exp(-q*x);let U=1-Z*Z*.55,H=D*Z*.7;this.u[C]=Math.max(-80,Math.min(80,this.u[C]+(F*U+A*H)*q*E)),this.v[C]=Math.max(-80,Math.min(80,this.v[C]+(v*U+r*H)*q*E))}}this.peak=1}read(t,n,a){n=Math.max(.5,Math.min(this.width-1.5,n)),a=Math.max(.5,Math.min(this.height-1.5,a));let i=n|0,l=a|0,c=n-i,o=a-l,f=l*this.width+i;return(t[f]*(1-c)+t[f+1]*c)*(1-o)+(t[f+this.width]*(1-c)+t[f+this.width+1]*c)*o}sample(t,n){return this.read(this.signal,t*(this.width-1),n*(this.height-1))}displacement(t,n,a){a[0]=this.read(this.offsetX,t*(this.width-1),n*(this.height-1)),a[1]=this.read(this.offsetY,t*(this.width-1),n*(this.height-1))}step(t){if(!this.active||!Number.isFinite(t))return;let n=Math.max(0,Math.min(.05,t)),a=this.width,i=this.height;for(;n>1e-7;){let l=Math.min(.016666666666666666,n);n-=l;let c=Math.exp(-1.9*l),o=Math.exp(-3.2*l);for(let d=1;d<i-1;d++)for(let m=1;m<a-1;m++){let g=d*a+m,w=Math.max(.5,Math.min(a-1.5,m-this.u[g]*l)),T=Math.max(.5,Math.min(i-1.5,d-this.v[g]*l)),M=w|0,x=T|0,F=w-M,v=T-x,A=x*a+M,r=(1-F)*(1-v),E=F*(1-v),L=(1-F)*v,Y=F*v;this.a[g]=(this.u[A]*r+this.u[A+1]*E+this.u[A+a]*L+this.u[A+a+1]*Y)*c,this.b[g]=(this.v[A]*r+this.v[A+1]*E+this.v[A+a]*L+this.v[A+a+1]*Y)*c,this.c[g]=(this.ink[A]*r+this.ink[A+1]*E+this.ink[A+a]*L+this.ink[A+a+1]*Y)*o}[this.u,this.a]=[this.a,this.u],[this.v,this.b]=[this.b,this.v],[this.ink,this.c]=[this.c,this.ink];for(let d=1;d<i-1;d++)for(let m=1;m<a-1;m++){let g=d*a+m;this.curl[g]=(this.v[g+1]-this.v[g-1]-this.u[g+a]+this.u[g-a])*.5}for(let d=1;d<i-1;d++)for(let m=1;m<a-1;m++){let g=d*a+m,w=Math.abs(this.curl[g+1])-Math.abs(this.curl[g-1]),T=Math.abs(this.curl[g+a])-Math.abs(this.curl[g-a]),M=Math.hypot(w,T)+1e-4,x=this.curl[g]*l*10,F=Math.hypot(this.u[g],this.v[g]);this.u[g]+=T/M*x,this.v[g]-=w/M*x;let v=Math.min(1,F/(Math.hypot(this.u[g],this.v[g])+1e-6));this.u[g]*=v,this.v[g]*=v,this.divergence[g]=-.5*(this.u[g+1]-this.u[g-1]+this.v[g+a]-this.v[g-a])}this.pressure.fill(0);for(let d=0;d<4;d++){for(let m=1;m<i-1;m++)for(let g=1;g<a-1;g++){let w=m*a+g;this.pressureNext[w]=(this.divergence[w]+this.pressure[w-1]+this.pressure[w+1]+this.pressure[w-a]+this.pressure[w+a])*.25}[this.pressure,this.pressureNext]=[this.pressureNext,this.pressure]}let f=0;for(let d=1;d<i-1;d++)for(let m=1;m<a-1;m++){let g=d*a+m;this.u[g]=Math.max(-80,Math.min(80,this.u[g]-(this.pressure[g+1]-this.pressure[g-1])*.5)),this.v[g]=Math.max(-80,Math.min(80,this.v[g]-(this.pressure[g+a]-this.pressure[g-a])*.5)),this.driftX[g]+=(this.u[g]*3.6-58*this.offsetX[g]-12*this.driftX[g])*l,this.driftY[g]+=(this.v[g]*3.6-58*this.offsetY[g]-12*this.driftY[g])*l,this.offsetX[g]=Math.max(-2,Math.min(2,this.offsetX[g]+this.driftX[g]*l)),this.offsetY[g]=Math.max(-2,Math.min(2,this.offsetY[g]+this.driftY[g]*l)),this.signal[g]=1-Math.exp(-Math.hypot(this.u[g],this.v[g])*.06-this.ink[g]*.16),f=Math.max(f,this.signal[g])}this.peak=f}if(!this.active){this.clear();return}for(let l=0;l<this.ink.length;l++){let c=Math.round(Math.min(1,this.signal[l])*65535);this.pixels[l*4]=c>>>8,this.pixels[l*4+1]=c&255,this.pixels[l*4+2]=Math.round(128+this.offsetX[l]*63.5),this.pixels[l*4+3]=Math.round(128+this.offsetY[l]*63.5)}}};var ni=e=>e==="subject"||e==="outside"?e:"all";function ye(e,t,n,a,i){if(!(i<1))for(let l=0;l<2;l++){for(let c=0;c<a;c++){let o=0,f=c*n;for(let d=-i;d<=i;d++)o+=e[f+Math.max(0,Math.min(n-1,d))];for(let d=0;d<n;d++)t[f+d]=o/(i*2+1),o+=e[f+Math.min(n-1,d+i+1)]-e[f+Math.max(0,d-i)]}for(let c=0;c<n;c++){let o=0;for(let f=-i;f<=i;f++)o+=t[Math.max(0,Math.min(a-1,f))*n+c];for(let f=0;f<a;f++)e[f*n+c]=o/(i*2+1),o+=t[Math.min(a-1,f+i+1)*n+c]-t[Math.max(0,f-i)*n+c]}}}var ua=new Float32Array(0);function Yr(e,t,n,a,i){let l=t*n,c=i&&i.width===t&&i.height===n?i:{width:t,height:n,subject:new Float32Array(l),depth:new Float32Array(l),key:"none"},{subject:o,depth:f}=c,d=0;for(let M=0;M<l;M++)e[M*4+3]<250&&d++;let m=M=>(e[M*4]*.2126+e[M*4+1]*.7152+e[M*4+2]*.0722)/255,g="none",w=0;if(d>l*.01)g="alpha";else if(a)g="mask";else{let M=0,x=0,F=0,v=Math.max(1,Math.round(Math.min(t,n)*.03));for(let r=0;r<n;r++)for(let E=0;E<t;E++){if(E>=v&&r>=v&&E<t-v&&r<n-v)continue;let L=m(r*t+E);M+=L,x+=L*L,F++}w=M/Math.max(1,F),Math.sqrt(Math.max(0,x/Math.max(1,F)-w*w))<.07&&(g="ground")}for(let M=0;M<l;M++){let x=e[M*4+3]/255,F=m(M),v=1;if(g==="alpha")v=x;else if(g==="ground"){let A=Math.max(0,Math.min(1,(Math.abs(F-w)-.035)/.12));v=A*A*(3-2*A)}o[M]=v*(a?Math.max(0,Math.min(1,a[M])):1),f[M]=F*x}c.key=g,ua.length<l&&(ua=new Float32Array(l));let T=ua;return ye(o,T,t,n,Math.max(1,Math.round(Math.min(t,n)*.02))),ye(f,T,t,n,Math.max(1,Math.round(Math.min(t,n)*.035))),c}var Gt=11,Be=e=>Math.max(0,Math.min(1,e)),G=(e,t,n)=>{let a=Be((n-e)/(t-e));return a*a*(3-2*a)};function je(e,t,n=256){let a=0;for(let o=0;o<e.length;o++)e[o]>a&&(a=e[o]);if(a<=0)return 0;let i=new Uint32Array(n);for(let o=0;o<e.length;o++)i[Math.min(n-1,Math.floor(Math.max(0,e[o])/a*n))]++;let l=0,c=e.length*t;for(let o=0;o<n;o++)if(l+=i[o],l>=c)return(o+1)/n*a;return a}var vl=12e3,da=class{constructor(t){this.n=t;this.arrays=[];this.next=0}take(t){this.next===this.arrays.length&&this.arrays.push(new Float32Array(this.n));let n=this.arrays[this.next++];return t?n.set(t):n.fill(0),n}reset(){this.next=0}},Qr=null;function yl(e,t,n,a,i,l,c,o,f){let d=i*l,m=f.take(),g=S=>(Dt(S,m,i,l,c),S),w=(S,D)=>{let Z=f.take();for(let q=0;q<d;q++)Z[q]=S[q]*D[q];return g(Z)},T=g(f.take(t)),M=g(f.take(n)),x=g(f.take(a)),F=g(f.take(e)),v=w(t,t),A=w(t,n),r=w(t,a),E=w(n,n),L=w(n,a),Y=w(a,a),Q=w(t,e),re=w(n,e),J=w(a,e),ne=f.take(),_=f.take(),ee=f.take(),K=f.take();for(let S=0;S<d;S++){let D=Q[S]-T[S]*F[S],Z=re[S]-M[S]*F[S],q=J[S]-x[S]*F[S],C=v[S]-T[S]*T[S]+o,U=A[S]-T[S]*M[S],H=r[S]-T[S]*x[S],te=E[S]-M[S]*M[S]+o,le=L[S]-M[S]*x[S],pe=Y[S]-x[S]*x[S]+o,De=te*pe-le*le,V=H*le-U*pe,ae=U*le-H*te,Re=C*pe-H*H,Me=U*H-C*le,xe=C*te-U*U,Le=C*De+U*V+H*ae,Te=Math.abs(Le)>1e-12?1/Le:0;ne[S]=(De*D+V*Z+ae*q)*Te,_[S]=(V*D+Re*Z+Me*q)*Te,ee[S]=(ae*D+Me*Z+xe*q)*Te,K[S]=F[S]-ne[S]*T[S]-_[S]*M[S]-ee[S]*x[S]}g(ne),g(_),g(ee),g(K);for(let S=0;S<d;S++)e[S]=ne[S]*t[S]+_[S]*n[S]+ee[S]*a[S]+K[S]}function Dt(e,t,n,a,i){let l=i*2+1;for(let c=0;c<a;c++){let o=c*n,f=0;for(let d=-i;d<=i;d++)f+=e[o+Math.max(0,Math.min(n-1,d))];for(let d=0;d<n;d++)t[o+d]=f/l,f+=e[o+Math.min(n-1,d+i+1)]-e[o+Math.max(0,d-i)]}for(let c=0;c<n;c++){let o=0;for(let f=-i;f<=i;f++)o+=t[Math.max(0,Math.min(a-1,f))*n+c];for(let f=0;f<a;f++)e[f*n+c]=o/l,o+=t[Math.min(a-1,f+i+1)*n+c]-t[Math.max(0,f-i)*n+c]}}function fa(e,t,n,a,i,l,c){let o=n*a,f=c.take(),d=c.take(t),m=c.take(e),g=c.take(),w=c.take();for(let T=0;T<o;T++)g[T]=t[T]*t[T],w[T]=t[T]*e[T];Dt(d,f,n,a,i),Dt(m,f,n,a,i),Dt(g,f,n,a,i),Dt(w,f,n,a,i);for(let T=0;T<o;T++){let M=(w[T]-d[T]*m[T])/(g[T]-d[T]*d[T]+l);g[T]=M,w[T]=m[T]-M*d[T]}Dt(g,f,n,a,i),Dt(w,f,n,a,i);for(let T=0;T<o;T++)e[T]=g[T]*t[T]+w[T]}function ha(e,t,n,a,i,l=2){for(let c=0;c<l;c++){for(let o=0;o<a;o++)for(let f=0;f<n;f++){let d=o*n+f,m=e[d];f>0&&(m=Math.max(m,Math.min(t[d],e[d-1]*i))),o>0&&(m=Math.max(m,Math.min(t[d],e[d-n]*i),f>0?Math.min(t[d],e[d-n-1]*i):0,f<n-1?Math.min(t[d],e[d-n+1]*i):0)),e[d]=m}for(let o=a-1;o>=0;o--)for(let f=n-1;f>=0;f--){let d=o*n+f,m=e[d];f<n-1&&(m=Math.max(m,Math.min(t[d],e[d+1]*i))),o<a-1&&(m=Math.max(m,Math.min(t[d],e[d+n]*i),f>0?Math.min(t[d],e[d+n-1]*i):0,f<n-1?Math.min(t[d],e[d+n+1]*i):0)),e[d]=m}}}function Zr(e,t,n,a,i){for(let l=0;l<a;l++)for(let c=0;c<n;c++){let o=1;for(let f=Math.max(0,c-i);f<=Math.min(n-1,c+i);f++)o=Math.min(o,e[l*n+f]);t[l*n+c]=o}for(let l=0;l<a;l++)for(let c=0;c<n;c++){let o=1;for(let f=Math.max(0,l-i);f<=Math.min(a-1,l+i);f++)o=Math.min(o,t[f*n+c]);e[l*n+c]=o}}function El(e,t,n,a,i){let l=n*a,c=Math.min(n,a),o=i.take(),f=i.take(),d=i.take(),m=i.take(),g=i.take();for(let h=0;h<l;h++){let P=e[h*4+3]/255;g[h]=P,o[h]=t[h*4]/255*P,f[h]=t[h*4+1]/255*P,d[h]=t[h*4+2]/255*P,m[h]=(e[h*4]*.299+e[h*4+1]*.587+e[h*4+2]*.114)/255*P}let w=i.take(),T=(h,P)=>{let R=i.take(h);return ye(R,w,n,a,P),R},M=Math.max(2,Math.round(c*.04)),x=Math.max(M+2,Math.round(c*.12)),F=Math.max(2,Math.round(c*.05)),v=T(m,1),A=T(m,M),r=T(m,x),E=i.take(),L=i.take(),Y=i.take(),Q=i.take(),re=i.take();for(let h=0;h<a;h++)for(let P=0;P<n;P++){let R=h*n+P;E[R]=Math.abs(m[R]-v[R]),L[R]=Math.abs(v[R]-A[R]),Y[R]=Math.abs(A[R]-r[R]),Q[R]=Math.abs(m[h*n+Math.min(n-1,P+1)]-m[h*n+Math.max(0,P-1)]),re[R]=Math.abs(m[Math.min(a-1,h+1)*n+P]-m[Math.max(0,h-1)*n+P])}ye(E,w,n,a,F),ye(L,w,n,a,F),ye(Y,w,n,a,F),ye(Q,w,n,a,2),ye(re,w,n,a,2);let J=Math.max(.01,je(E,.9)+je(L,.9)),ne=T(o,1),_=T(f,1),ee=T(d,1),K=i.take(),S=i.take(),D=i.take(),Z=0;for(let h=0;h<l;h++){let P=ne[h],R=_[h],ge=ee[h],ce=Math.max(P,R,ge),j=Math.min(P,R,ge),ue=ce-j;D[h]=ce,S[h]=ce>.001?ue/ce:0,Z+=ue;let me=0;ue>1e-4&&(me=ce===P?((R-ge)/ue+6)%6:ce===R?(ge-P)/ue+2:(P-R)/ue+4),K[h]=me*60}let q=G(.02,.07,Z/l),C=Math.max(2,Math.round(a*.06)),U=new Float32Array(a);for(let h=0;h<a;h++){let P=0;for(let R=0;R<n;R++)P+=E[h*n+R]+L[h*n+R];U[h]=P/n}let H=.5,te=0;for(let h=Math.max(C,Math.round(a*.12));h<=Math.min(a-C,Math.round(a*.88));h++){let P=0,R=0,ge=0,ce=0;for(let X=0;X<n;X++){let ie=0,fe=0,Ce=0,Se=0,Ge=0,Ie=0;for(let _e=1;_e<=C;_e++){let lt=(h-_e)*n+X,Ze=(h+_e-1)*n+X;ie+=ne[lt],fe+=_[lt],Ce+=ee[lt],Se+=ne[Ze],Ge+=_[Ze],Ie+=ee[Ze]}let ze=(Math.abs(ie-Se)+Math.abs(fe-Ge)+Math.abs(Ce-Ie))/C;P+=ze,R+=ze>.12?1:0}let j=Math.max(2,Math.round(a*.15)),ue=Math.max(0,h-j),me=Math.min(a,h+j);for(let X=ue;X<h;X++)ge+=U[X];for(let X=h;X<me;X++)ce+=U[X];ge/=h-ue,ce/=me-h;let I=G(-.05,.3,(ce-ge)/(ce+ge+1e-4)),B=G(.08,.35,P/n)*(R/n)*I;B>te&&(te=B,H=h/a)}let le=G(.15,.45,te),pe=i.take(),De=i.take(),V=i.take();for(let h=0;h<l;h++)pe[h]=Math.min(o[h],f[h],d[h]);Zr(pe,w,n,a,1),ye(pe,w,n,a,M);for(let h=0;h<l;h++)De[h]=L[h]+Y[h];let ae=0,Re=0,Me=0;for(let h=0;h<l;h++)ae+=ne[h],Re+=_[h],Me+=ee[h];ae/=l,Re/=l,Me/=l;let xe=T(ne,M),Le=T(_,M),Te=T(ee,M),$e=T(ne,x),tt=T(_,x),O=T(ee,x);for(let h=0;h<l;h++){let P=Math.hypot(xe[h]-ae,Le[h]-Re,Te[h]-Me),R=Math.hypot(xe[h]-$e[h],Le[h]-tt[h],Te[h]-O[h]);V[h]=(P+R*1.5)*(.4+.6*S[h]*q+.4*(1-q))}let ve=i.take(),He=i.take(),Ke=i.take(),de=i.take(),Ye=i.take(),Xe=i.take(),Fe=i.take(),rt=i.take(),ht=i.take(),nt=i.take();for(let h=0;h<a;h++)for(let P=0;P<n;P++)nt[h*n+P]=Math.abs(m[Math.min(a-1,h+1)*n+P]-m[Math.max(0,h-1)*n+P]);ye(nt,w,n,a,1);for(let h=0;h<a;h++)for(let P=0;P<n;P++){let R=h*n+P,ge=(h+.5)/a,ce=K[R],j=S[R]*q,ue=D[R],me=E[R]+L[R],I=G(175,200,ce)*(1-G(250,275,ce))*G(.08,.25,j),B=(1-G(45,65,ce)+G(290,330,ce))*G(.2,.45,j)*G(.3,.55,ue),X=(1-G(.15,.35,j))*G(.45,.7,ue)*le,ie=(1-G(.08,.2,ue))*le,fe=le>.3?1-G(H,H+.1,ge):1-G(.4,.8,ge),Ce=1-G(.02,.06,me),Se=1-G(.03,.09,me);He[R]=Math.max(I*Ce,ie*.7*(1-G(.008,.025,me)),B*Se*.9)*fe,Ke[R]=Math.max(He[R],X*Ce*fe),ve[R]=h===0?He[R]:0,de[R]=G(150,172,ce)*(1-G(232,250,ce))*G(.25,.45,j),Fe[R]=G(1.3,2.2,(Q[R]+.004)/(re[R]+.004))*G(.35,.55,v[R])*(1-G(.1,.18,S[R]*q))*G(.025,.07,me)*G(.025,.045,nt[R]);let Ge=1-G(.18,.4,j),Ie=G(.55,.8,ue)*G(.05,.12,me);Ye[R]=Math.max(de[R],Ge*.85,Ie*.8)}ha(ve,He,n,a,.995,1),ha(ve,Ke,n,a,.8,1);let dt=0;for(let h=0;h<l;h++)dt+=ve[h];let at=dt>l*.04&&le>.3;if(at)for(let h=0;h<a;h++)for(let P=0;P<n;P++)de[h*n+P]*=G(H,H+.05,(h+.5)/a);if(at){let h=i.take(),P=i.take(),R=i.take();for(let I=0;I<l;I++)h[I]=xe[I]*.299+Le[I]*.587+Te[I]*.114;for(let I=0;I<a;I++)for(let B=0;B<n;B++)P[I*n+B]=v[Math.min(a-1,I+1)*n+B]-v[Math.max(0,I-1)*n+B];let ge=new Uint8Array(l);for(let I=1;I<a-1;I++)for(let B=0;B<n;B++){let X=Math.abs(P[I*n+B]),ie=X>.03;for(let fe=-3;fe<=3&&ie;fe++)fe&&I+fe>=0&&I+fe<a&&Math.abs(P[(I+fe)*n+B])>X&&(ie=!1);ge[I*n+B]=ie?1:0}let ce=(I,B,X,ie=!0)=>{let fe=xe[B]+Le[B]+Te[B]+.05,Ce=xe[X]+Le[X]+Te[X]+.05,Se=Math.abs(xe[B]/fe-xe[X]/Ce)+Math.abs(Le[B]/fe-Le[X]/Ce)+Math.abs(Te[B]/fe-Te[X]/Ce),Ge=Math.min(Math.abs(K[B]-K[X]),360-Math.abs(K[B]-K[X])),Ie=Math.max(1-G(.1,.25,Se),(1-G(15,35,Ge))*G(.15,.3,Math.min(S[B],S[X]))),ze=Math.max(G(2,3,(re[B]+.004)/(Q[B]+.004))*G(.015,.04,E[B]+L[B])*G(.4,.55,E[B]/(E[B]+L[B]+1e-4)),1-G(.12,.25,h[B]));return Ie*(ie?ze:1)*(1-G(h[X]*.82+.02,h[X]*1.02+.05,h[B]))},j=0,ue=0;for(let I=Math.max(3,Math.round(a*Math.max(.25,H)));I<Math.round(a*.88);I++){let B=0;for(let ie=0;ie<n;ie++)(ge[(I-1)*n+ie]||ge[I*n+ie]||ge[(I+1)*n+ie])&&B++;if(B<n*.5)continue;let X=0;for(let ie=I+1;ie<Math.min(a,2*I);ie++)for(let fe=0;fe<n;fe++)X+=ce(I,ie*n+fe,(2*I-ie)*n+fe);X>ue&&(ue=X,j=I)}let me=G(.05,.1,ue/l);if(me>0)for(let I=j+1;I<Math.min(a,2*j);I++)for(let B=0;B<n;B++){let X=I*n+B;rt[X]=ce(j,X,(2*j-I)*n+B)*me,ht[X]=ce(j,X,(2*j-I)*n+B,!1)*me,R[X]=rt[X]}ye(R,w,n,a,1);for(let I=0;I<l;I++)rt[I]=Math.max(rt[I],R[I]),de[I]=Math.max(de[I],rt[I])}let ot=T(de,x);for(let h=0;h<l;h++)de[h]*=G(.15,.35,ot[h]);let Tr=T(de,M);for(let h=0;h<l;h++){de[h]*=1-He[h]*.8;let P=Math.min(Math.abs(K[h]-200),360-Math.abs(K[h]-200));Xe[h]=G(.28,.45,S[h]*q)*G(55,80,P)*(1-G(.3,.6,ht[h]))}let Fr=T(Xe,M);for(let h=0;h<l;h++)Xe[h]=Math.max(Xe[h]*(1-(1-G(.15,.3,Fr[h]))*G(.55,.7,D[h])*G(.5,.65,S[h])),1-g[h]),Ye[h]=Math.min(Math.max(Ye[h],ht[h]*.9),Math.max(de[h],G(.25,.6,Tr[h])))*(1-ve[h])*(1-Xe[h]);ha(de,Ye,n,a,.97);let Bt=i.take(Fe),it=Math.max(2,Math.round(a*.12));for(let h=0;h<n;h++){let P=0;for(let R=-it;R<=it;R++)P+=Fe[Math.max(0,Math.min(a-1,R))*n+h];for(let R=0;R<a;R++)Bt[R*n+h]=P/(it*2+1),P+=Fe[Math.min(a-1,R+it+1)*n+h]-Fe[Math.max(0,R-it)*n+h]}ye(Bt,w,n,a,1);for(let h=0;h<l;h++)Fe[h]=G(.2,.45,Bt[h])*G(.2,.5,Fe[h]+Bt[h]*.5)*(1-ve[h]);fa(ve,m,n,a,Math.max(2,Math.round(c*.04)),.002,i),fa(de,m,n,a,Math.max(2,Math.round(c*.04)),.002,i),fa(Fe,m,n,a,Math.max(2,Math.round(c*.03)),.002,i),ye(Xe,w,n,a,1);for(let h=0;h<l;h++)ve[h]=G(.3,.7,ve[h])*g[h],Fe[h]=G(.3,.7,Fe[h])*g[h]*(1-ve[h]),de[h]=G(.3,.7,de[h])*(1-ve[h])*(1-Fe[h])*(1-G(.15,.4,Xe[h]));Zr(ve,w,n,a,2),Zr(de,w,n,a,2),Zr(Fe,w,n,a,1),ye(ve,w,n,a,1),ye(de,w,n,a,1),ye(Fe,w,n,a,1);let Qe=1/Math.max(.02,je(V,.97)),tr=1/Math.max(.01,je(De,.9)),mt=je(pe,.97),se=je(pe,.1),Ve=G(.06,.25,mt-se),ke=i.take();for(let h=0;h<a;h++)for(let P=0;P<n;P++){let R=h*n+P,ge=(P+.5)/n,ce=(h+.5)/a,j=Math.max(ve[R],de[R]),ue=E[R]+L[R]+Y[R],me=Be(((E[R]+L[R]*.6)/(ue+.004)-.25)/.55)*.6+Be((E[R]+L[R])/J)*.4,I=G(.04,.35,ue/J)*(1-j),B=Be((pe[R]-se)/Math.max(.05,mt-se))*.55+(1-Be(De[R]*tr))*.25+Be((ee[R]-ne[R])*2+.3)*.2*q,X=Ve*G(.12,.35,A[R])*(.4+.6*le),ie=ce<H?.45:.45+.55*G(0,1,(ce-H)/Math.max(.15,1-H)),fe=le*ie+(1-le)*(.5+(ce-.5)*.4),Ce=E[R]/(E[R]+L[R]+1e-4),Se=G(.2,.7,(E[R]+L[R])/J)*(.35+.65*le)*(1-j),Ge=1-Be(Math.hypot((ge-.5)*1.2,ce-.52)*1.5),Ie=Be(V[R]*Qe)*(.55+.45*Ge),ze=.3*I,_e=.25*X,lt=.12+.45*le,Ze=.12*Se,st=.35*(1-.4*le)*(1-j);ke[R]=(ze*me+_e*(1-B)+lt*fe+Ze*Be(1.6-Ce*1.6)+st*Ie+.08*.5)/(ze+_e+lt+Ze+st+.08)*(1-.85*ve[R])*(1-.45*de[R]*(1-le))}let At=Yr(e,n,a);if(At.key!=="none")for(let h=0;h<l;h++)ke[h]=At.subject[h]*.7+ke[h]*.3;return ye(ke,w,n,a,Math.max(1,Math.round(c*.03))),yl(ke,ne,_,ee,n,a,Math.max(2,Math.round(c*.07)),.004,i),{depth:ke,water:de,sky:ve,falls:Fe}}function Jr(e,t,n,a,i,l,c){if(t===l&&n===c)return e[i*l+a];let o=Math.max(0,Math.min(t-1,(a+.5)*t/l-.5)),f=Math.max(0,Math.min(n-1,(i+.5)*n/c-.5)),d=Math.min(t-2,Math.floor(o)),m=Math.min(n-2,Math.floor(f)),g=o-d,w=f-m;if(d<0||m<0)return e[Math.round(f)*t+Math.round(o)];let T=m*t+d,M=T+t;return(e[T]*(1-g)+e[T+1]*g)*(1-w)+(e[M]*(1-g)+e[M+1]*g)*w}function ai(e,t,n,a,i=e){let l=t*n,c=a?.length===l*Gt?a:new Float32Array(l*Gt);if(!l)return c;let o=Math.min(t,n),f=new Float32Array(l),d=new Float32Array(l),m=new Float32Array(l),g=new Float32Array(l),w=new Float32Array(l),T=new Float32Array(l);for(let C=0;C<l;C++){let U=e[C*4+3]/255;f[C]=(e[C*4]*.299+e[C*4+1]*.587+e[C*4+2]*.114)/255*U}d.set(f),ye(d,T,t,n,Math.max(1,Math.round(o*.012))),m.set(f),ye(m,T,t,n,Math.max(1,Math.round(o*.03)));for(let C=0;C<l;C++){g[C]=Math.abs(f[C]-d[C]);let U=Math.max(0,f[C]-.55)/.45;w[C]=U*U}ye(g,T,t,n,Math.max(1,Math.round(o*.02)));let M=1/Math.max(.02,je(g,.95));ye(w,T,t,n,Math.max(1,Math.round(o*.05)));let x=1/Math.max(.03,je(w,.98)),F=Math.max(1,Math.ceil(Math.sqrt(l/vl))),v=Math.max(1,Math.floor(t/F)),A=Math.max(1,Math.floor(n/F)),r=v*A,E=e,L=i;if(F>1){let C=new Uint8ClampedArray(r*4),U=i===e?C:new Uint8ClampedArray(r*4);for(let H=0;H<A;H++)for(let te=0;te<v;te++){let le=[0,0,0,0,0,0,0];for(let V=H*F;V<(H+1)*F;V++)for(let ae=te*F;ae<(te+1)*F;ae++){let Re=(V*t+ae)*4;for(let Me=0;Me<4;Me++)le[Me]+=e[Re+Me];if(U!==C)for(let Me=0;Me<3;Me++)le[4+Me]+=i[Re+Me]}let pe=(H*v+te)*4,De=F*F;for(let V=0;V<4;V++)C[pe+V]=le[V]/De;if(U!==C){for(let V=0;V<3;V++)U[pe+V]=le[4+V]/De;U[pe+3]=C[pe+3]}}E=C,L=U}Qr?.n!==r&&(Qr=new da(r)),Qr.reset();let{depth:Y,water:Q,sky:re,falls:J}=El(E,L,v,A,Qr),ne=je(Y,.03),_=je(Y,.97),ee=Math.max(.05,_-ne),K=0,S=0,D=0,Z=new Float32Array(l);for(let C=0;C<n;C++)for(let U=0;U<t;U++){let H=C*t+U,te=H*Gt,le=Be((Jr(Y,v,A,U,C,t,n)-ne)/ee);c[te+1]=le,c[te+8]=Be(Jr(Q,v,A,U,C,t,n)),c[te+9]=Be(Jr(re,v,A,U,C,t,n)),c[te+10]=Be(Jr(J,v,A,U,C,t,n));let pe=le*le*le*(.25+f[H]);K+=(U+.5)/t*pe,S+=(C+.5)/n*pe,D+=pe,Z[H]=Math.hypot(m[C*t+Math.min(t-1,U+1)]-m[C*t+Math.max(0,U-1)],m[Math.min(n-1,C+1)*t+U]-m[Math.max(0,C-1)*t+U])}K=D>0?Math.max(.3,Math.min(.7,K/D)):.5,S=D>0?Math.max(.3,Math.min(.7,S/D)):.5;let q=1/Math.max(.004,je(Z,.97));for(let C=0;C<n;C++)for(let U=0;U<t;U++){let H=C*t+U,te=H*Gt,le=(m[C*t+Math.min(t-1,U+1)]-m[C*t+Math.max(0,U-1)])*q,pe=(m[Math.min(n-1,C+1)*t+U]-m[Math.max(0,C-1)*t+U])*q;c[te]=m[H],c[te+2]=Math.min(1,w[H]*x),c[te+3]=Math.min(1,g[H]*M),c[te+4]=Math.max(-1,Math.min(1,-le)),c[te+5]=Math.max(-1,Math.min(1,-pe)),c[te+6]=K,c[te+7]=S}return c}var Zt=(e,t,n)=>{let a=Math.max(0,Math.min(1,(n-e)/(t-e)));return a*a*(3-2*a)},en=class{constructor(t,n){this.base=40;this.mass=0;this.calm=0;this.drift=[0,0];this.fade=3;this.age=0;this.peak=0;this.front=0;this.live=!1;this.bins=new Uint32Array(64);this.spare=new Float32Array(0);this.cols=Math.max(3,t|0),this.rows=Math.max(3,n|0);let a=this.cols*this.rows;this.h=new Float32Array(a),this.p=new Float32Array(a),this.speed=new Float32Array(a).fill(1),this.damp=new Float32Array(a).fill(1),this.wall=new Float32Array(a),this.trace=new Float32Array(a)}clear(){this.h.fill(0),this.p.fill(0),this.trace.fill(0),this.live=!1,this.peak=0}drop(t,n,a=1,i=3){let{cols:l,rows:c,h:o,p:f}=this,d=Math.max(1,i),m=Math.ceil(d*3);for(let g=Math.max(1,Math.floor(n-m));g<Math.min(c-1,Math.ceil(n+m));g++)for(let w=Math.max(1,Math.floor(t-m));w<Math.min(l-1,Math.ceil(t+m));w++){let T=w-t,M=g-n,x=(T*T+M*M)/(d*d),F=a*(1-x)*Math.exp(-x),v=g*l+w;o[v]+=F,f[v]+=F}this.age=0,this.live=!0,this.peak=Math.max(this.peak,a),this.front=Math.max(this.front,a)}step(t,n=1){if(!this.live||!(t>0))return this.live;t=Math.min(.05,t),this.age+=t;let{cols:a,rows:i,speed:l,damp:c,wall:o,trace:f}=this,d=Math.max(0,this.base*n),m=0;for(let _=0;_<l.length;_++)l[_]>m&&(m=l[_]);let g=Math.max(1,Math.min(8,Math.ceil(d*t*Math.sqrt(m)/.6))),w=this.calm,T=t/g,M=d*T*(d*T),x=this.mass*T*T,F=this.h,v=this.p;for(let _=0;_<g;_++){for(let K=1;K<i-1;K++)for(let S=1,D=K*a+1;S<a-1;S++,D++){let Z=F[D],q=F[D-1]+F[D+1]+F[D-a]+F[D+a]-4*Z,C=f[D],U=C>.02?Math.max(0,1-Math.abs(Z)/C):0,H=w*U*U*T,te=1-Math.min(.5,c[D]*T+H);v[D]=(Z+(Z-v[D])*te+M*l[D]*q-x*Z)*(1-o[D])*(1-Math.min(.5,H*.5))}let ee=F;F=v,v=ee}this.h=F,this.p=v;let A=this.drift[0]*t,r=this.drift[1]*t;(A||r)&&(this.carry(F,A,r),this.carry(v,A,r));for(let _=0;_<a;_++)F[_]=F[a+_]*.5,F[(i-1)*a+_]=F[(i-2)*a+_]*.5;for(let _=0;_<i;_++)F[_*a]=F[_*a+1]*.5,F[_*a+a-1]=F[_*a+a-2]*.5;let E=Math.exp(-t*this.fade),L=0;for(let _=0;_<F.length;_++){let ee=Math.abs(F[_]);ee>L&&(L=ee);let K=f[_]*E;f[_]=ee>=K?ee:K<1e-4?0:K}this.peak=L;let Y=this.bins.fill(0),Q=L*.05,re=0;for(let _=0;_<F.length;_++)F[_]>Q&&(Y[Math.min(63,F[_]/L*64|0)]++,re++);let J=0,ne=63;for(;ne>0&&(J+=Y[ne],!(J>=re*.08));ne--);return this.front=Math.max(L*.15,(ne+1)/64*L),L<.004?(this.clear(),!1):!0}carry(t,n,a){let{cols:i,rows:l}=this;this.spare.length!==t.length&&(this.spare=new Float32Array(t.length));let c=this.spare;for(let o=0,f=0;o<l;o++){let d=Math.min(l-1.001,Math.max(0,o-a)),m=d|0,g=d-m;for(let w=0;w<i;w++,f++){let T=Math.min(i-1.001,Math.max(0,w-n)),M=T|0,x=T-M,F=m*i+M;c[f]=(t[F]*(1-x)+t[F+1]*x)*(1-g)+(t[F+i]*(1-x)+t[F+i+1]*x)*g}}t.set(c)}slope(t,n){let{h:a,cols:i}=this,l=a.length;return n[0]=(a[Math.min(l-1,t+1)]-a[Math.max(0,t-1)])*.5,n[1]=(a[Math.min(l-1,t+i)]-a[Math.max(0,t-i)])*.5,n}};function ii(e,t,n=[-.5,-.8],a=e.cols,i=e.rows){let{cols:l,rows:c,speed:o,damp:f,wall:d}=e,m=Gt;if(t.length!==a*i*m)return n;let g=0,w=0,T=0;for(let M=0,x=0;M<c;M++){let F=Math.min(i-1,M*i/c|0);for(let v=0;v<l;v++,x++){let A=Math.min(a-1,v*a/l|0),r=(F*a+A)*m,E=t[r+3],L=t[r+8],Y=t[r+9],Q=t[r+2],re=t[r+1],J=A<a-1?m:0,ne=A>0?-m:0,_=F<i-1?a*m:0,ee=F>0?-a*m:0,K=Math.hypot(t[r+1+J]-t[r+1+ne],t[r+1+_]-t[r+1+ee]),S=Math.hypot(t[r+4],t[r+5]),D=Math.max(L,Y*.9),Z=1-Zt(.2,.8,E),q=Math.max(.12,Math.max(D,.2+.65*Z)*(1-.45*Zt(.55,.95,re)*(1-L)));o[x]=q*q;let C=Math.max(0,1-D);f[x]=.9*L+1.6*Y*(1-L)+C*(1.4+6.5*Zt(.25,.9,E)),d[x]=Math.min(.4,.35*Zt(.12,.35,K)*(1-L*.6)+.1*Zt(.6,1,S)*(1-D)),g+=(v/(l-1)-.5)*Q,w+=(M/(c-1)-.5)*Q,T+=Q}}if(oi(o,l,c,2),oi(f,l,c,1),T>.5){let M=Math.hypot(g,w);M/T>.02&&(n[0]=g/M,n[1]=w/M)}return n}function oi(e,t,n,a){let i=new Float32Array(e.length);for(let l=0;l<2;l++){let c=l?i:e,o=l?e:i;for(let f=0;f<n;f++)for(let d=0;d<t;d++){let m=0,g=0;for(let w=-a;w<=a;w++){let T=l?d:d+w,M=l?f+w:f;T<0||M<0||T>=t||M>=n||(m+=c[M*t+T],g++)}o[f*t+d]=m/g}}}function li(e,t,n,a,i=1,l=e.cols,c=e.rows){let{cols:o,rows:f,h:d,trace:m}=e,g=Gt,w=i/Math.max(.01,e.front),T=n[0],M=n[1],x=t.length===l*c*g;for(let F=0,v=0;F<f;F++){let A=Math.min(c-1,F*c/f|0);for(let r=0;r<o;r++,v++){let E=d[v]*w,L=(A*l+Math.min(l-1,r*l/o|0))*g,Y=x?t[L+9]:0,Q=x?Math.max(t[L+8],.75*(1-Zt(.1,.45,t[L+3]))*(1-Y)):0,re=Math.max(0,1-Math.max(Q,Y)),J=(d[r<o-1?v+1:v]-d[r>0?v-1:v])*.5*w,ne=(d[F<f-1?v+o:v]-d[F>0?v-o:v])*.5*w,_=-J*6+(x?t[L+4]*.35:0),ee=-ne*6+(x?t[L+5]*.35:0),K=_*T+ee*M,S=Math.max(-1,Math.min(1,K)),D=E>0?E:E*.45,Z=Q*(D*.8+S*.4*Math.min(1,Math.abs(E)*4))+Y*(Math.min(1,m[v]*w)*.3+D*.15)+re*(D*.55+S*.25*Math.min(1,Math.abs(E)*4)),q=Q*Math.max(0,S)**3*Math.min(1,Math.max(0,E)*3)*.9+re*Math.max(0,S)**4*Math.min(1,Math.max(0,E)*3)*.25;Z=Math.max(-1,Math.min(1,Z));let C=Math.round(Z*32767+32768);a[v*4]=C>>>8,a[v*4+1]=C&255,a[v*4+2]=Math.round(Math.min(1,q)*255),a[v*4+3]=255}}return a}var Ml=["none","flow","orb","drift","swell","caustics","contour","aurora","ripple","halo","interference","mesh","cascade","constellation"],It=["glyph","dot","pixel","mosaic","lego","voxel","disco","dither","hex","led","cmyk","stipple","engraving","crosshatch","woodblock","risograph","pointillism","inlay","tick","bayer"],Tl=[{value:"fluid",label:"Fluid",description:"An ink-in-water wake that bends the image and swirls the characters."},{value:"lantern",label:"Lantern",description:"A soft light follows the pointer and lifts the characters it passes, without distortion."},{value:"trail",label:"Trail",description:"The Asciify Trail: in the wake, sparse characters fill in and dense ones open up, then settle. No distortion."},{value:"loupe",label:"Loupe",description:"A glass loupe glides after the pointer and magnifies the characters it covers."},{value:"reveal",label:"Reveal",description:"Under a soft spotlight the characters take the source image's own colours. Best over a photo or video in one ink."},{value:"none",label:"Off",description:"The field stays still under the pointer."}],Fl={radius:.13,strength:.5,trail:.45,follow:12},wl={bloom:0,bloomRadius:2,scanlines:0,grain:0,chroma:0,curvature:0},kl={strength:.55,radius:.45},ft={radius:.075,force:1,dissipation:1.6,refraction:.03,glow:.55,resolution:128,curl:24},Al={charset:" .,:-=+*#%@",cellSize:12,cellAspect:1,cellFit:"pixel",font:'ui-monospace, "SF Mono", Menlo, Consolas, monospace',fontWeight:500,glyphScale:.8,mark:"glyph",dotScale:.9,markAngle:-35,accents:0,shuffle:0,sample:"area",linePitch:.5,lineWeight:1,sparkle:0,textRepeat:"flow",glyphOrder:"tone",color:"ink",ink:"#f3ba32",highlight:"auto",background:"transparent",brightness:0,contrast:1,gamma:1,invert:!1,levels:"auto",blend:"auto",saturation:1.1,ramp:[],shade:.5,backdrop:0,fit:"cover",focus:{x:.5,y:.5},vignette:0,drift:0,scene:"flow",scale:1,clear:!1,speed:1,hover:"fluid",fluid:ft,lantern:Fl,trail:kl,post:wl,scope:"all",tap:"surface",maxPixelRatio:2,respectReducedMotion:!0},z=(e,t,n,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):a,rn=(e,t)=>typeof e=="string"&&/^#([\\da-f]{3}|[\\da-f]{6})$/i.test(e.trim())?e.trim().toLowerCase():t,si=/^[\\u0020-\\u007e\\u00a0-\\u02ff\\u0370-\\u0482\\u048a-\\u052f\\u2010-\\u20cf\\u2100-\\u2bff]*$/,tn;function Tt(e){return nn(e).slice()}var vr=new Map;function nn(e){let t=vr.get(e);if(t)return t;let n=Rl(e);return vr.size>=32&&vr.delete(vr.keys().next().value),vr.set(e,n),n}function Rl(e){if(!si.test(e)&&tn===void 0){let n=Intl.Segmenter;tn=n?new n(void 0,{granularity:"grapheme"}):null}return(tn&&!si.test(e)?Array.from(tn.segment(e),n=>n.segment):Array.from(e)).filter(n=>n!==\`
\`&&n!=="\\r"&&n!=="	").slice(0,256)}function Sl(e){let t=Tt(e).filter(n=>n.trim());return t.length>0&&t.filter($r).length*2>t.length}var Ll=(e,t,n)=>{let a=It.includes(e)?e:t;return(a==="glyph"||a==="inlay")&&Sl(n)},Cl=(e,t)=>{if(!Array.isArray(e))return t;let n=e.map(a=>rn(a,"")).filter(Boolean).slice(0,6);return n.length>=2?n:[]};function ma(e={},t=Al){let n=typeof e.charset=="string"&&Tt(e.charset).length>=2?e.charset:t.charset,a=t.fluid||ft,i=e.fluid===void 0?t.fluid:e.fluid,l=i===!1?!1:(()=>{let m=i===!0||!i?a:{...a,...i};return{radius:z(m.radius,.005,.5,ft.radius),force:z(m.force,0,8,ft.force),dissipation:z(m.dissipation,.05,20,ft.dissipation),refraction:z(m.refraction,0,.5,ft.refraction),glow:z(m.glow,0,2,ft.glow),resolution:Math.round(z(m.resolution,16,512,ft.resolution)),curl:z(m.curl,0,80,ft.curl)}})(),c=Ml.includes(e.scene)?e.scene:t.scene,o=!!e.clear&&typeof e.clear=="object"&&("element"in e.clear||"nodeType"in e.clear||"rects"in e.clear),f=e.clear===void 0||o?t.clear:e.clear,d=f?{x:z(f.x,-.5,1.5,.25),y:z(f.y,-.5,1.5,.3),width:z(f.width,0,2,.5),height:z(f.height,0,2,.4),feather:z(f.feather,.005,1,.12),shape:f.shape==="rect"?"rect":"ellipse",pointer:z(f.pointer,0,1,0)}:!1;return{charset:n,cellSize:z(e.cellSize,1,96,t.cellSize),cellAspect:Ll(e.mark,t.mark,n)?Math.max(1,z(e.cellAspect,.3,2,t.cellAspect)):z(e.cellAspect,.3,2,t.cellAspect),cellFit:e.cellFit==="fill"||e.cellFit==="pixel"?e.cellFit:t.cellFit,font:typeof e.font=="string"&&e.font.trim()?e.font:t.font,fontWeight:Math.round(z(e.fontWeight,100,900,t.fontWeight)),glyphScale:z(e.glyphScale,.3,1.6,t.glyphScale),mark:It.includes(e.mark)?e.mark:t.mark,dotScale:z(e.dotScale,.1,1.4,t.dotScale),markAngle:z(e.markAngle,-360,360,t.markAngle),accents:z(e.accents,0,.3,t.accents),shuffle:z(e.shuffle,0,4,t.shuffle),sample:e.sample==="point"||e.sample==="area"||e.sample==="shape"?e.sample:t.sample,linePitch:z(e.linePitch,.2,4,t.linePitch),lineWeight:z(e.lineWeight,.2,3,t.lineWeight),sparkle:z(e.sparkle,0,.05,t.sparkle),textRepeat:e.textRepeat==="row"||e.textRepeat==="flow"?e.textRepeat:t.textRepeat,glyphOrder:e.glyphOrder==="text"||e.glyphOrder==="tone"||e.glyphOrder==="scatter"?e.glyphOrder:t.glyphOrder,color:e.color==="source"||e.color==="ink"?e.color:t.color,ink:rn(e.ink,t.ink),highlight:e.highlight==="auto"?"auto":rn(e.highlight,t.highlight),ramp:Cl(e.ramp,t.ramp),background:e.background==="transparent"?"transparent":rn(e.background,t.background),brightness:z(e.brightness,-1,1,t.brightness),contrast:z(e.contrast,0,4,t.contrast),gamma:z(e.gamma,.2,5,t.gamma),invert:typeof e.invert=="boolean"?e.invert:t.invert,levels:e.levels==="none"||e.levels==="auto"?e.levels:t.levels,blend:e.blend==="auto"||e.blend==="coarse"||e.blend==="on"||e.blend==="off"?e.blend:t.blend,saturation:z(e.saturation,0,3,t.saturation),shade:z(e.shade,0,1,t.shade),backdrop:z(e.backdrop,0,1,t.backdrop),fit:e.fit==="contain"||e.fit==="cover"?e.fit:t.fit,focus:{x:z(e.focus?.x,0,1,t.focus.x),y:z(e.focus?.y,0,1,t.focus.y)},vignette:z(e.vignette,0,1,t.vignette),drift:z(e.drift,0,2,t.drift),scene:c,scale:z(e.scale,.2,6,t.scale),clear:d,speed:z(e.speed,0,5,t.speed),hover:Tl.some(m=>m.value===e.hover)?e.hover:t.hover,fluid:l,lantern:{radius:z(e.lantern?.radius,.02,.6,t.lantern.radius),strength:z(e.lantern?.strength,0,1.5,t.lantern.strength),trail:z(e.lantern?.trail,0,3,t.lantern.trail),follow:z(e.lantern?.follow,1,60,t.lantern.follow)},trail:{strength:z(e.trail?.strength,0,1,t.trail.strength),radius:z(e.trail?.radius,.1,1,t.trail.radius)},post:{bloom:z(e.post?.bloom,0,2,t.post.bloom),bloomRadius:z(e.post?.bloomRadius,.5,8,t.post.bloomRadius),scanlines:z(e.post?.scanlines,0,1,t.post.scanlines),grain:z(e.post?.grain,0,1,t.post.grain),chroma:z(e.post?.chroma,0,1,t.post.chroma),curvature:z(e.post?.curvature,0,1,t.post.curvature)},scope:e.scope===void 0?t.scope:ni(e.scope),tap:e.tap==="ring"||e.tap==="none"||e.tap==="surface"?e.tap:t.tap,maxPixelRatio:z(e.maxPixelRatio,.5,4,t.maxPixelRatio),respectReducedMotion:typeof e.respectReducedMotion=="boolean"?e.respectReducedMotion:t.respectReducedMotion}}function pa(e,t,n,a,i,l={x:.5,y:.5}){if(!(e>0&&t>0&&n>0&&a>0))return{scale:[1,1],offset:[0,0]};let c=e/t,o=n/a,f=o>c,d=i==="cover"?f?[c/o,1]:[1,o/c]:f?[1,o/c]:[c/o,1],m=i==="cover"?[(1-d[0])*l.x,(1-d[1])*l.y]:[(1-d[0])*.5,(1-d[1])*.5];return{scale:d,offset:m}}function ci(e,t,n,a,i,l,c=8){if(!(n>=16&&a>=16&&e>0&&t>0&&i>0))return 1;let o=l==="cover"?Math.min(e/n,t/a):Math.max(e/n,t/a),f=c/i/o;return f>.5?1:2**-Math.floor(Math.log2(1/f))}function ui(e,t,n,a,i,l,c){if(e!=="fill"||!(i>0&&l>0))return[c.width,c.height];let o=t*a,f=o*n;return[i/Math.max(1,Math.floor(i/f+1e-6)),l/Math.max(1,Math.floor(l/o+1e-6))]}function an(e,t,n,a){let i=Math.max(2,Math.round(e*n)),l=Math.max(2,Math.round(i*t)),c=Math.min(16,Math.max(1,a)),o=Math.ceil(a/c);return{width:l,height:i,columns:c,rows:o,atlasWidth:c*l,atlasHeight:o*i}}function yr(e){let t=e.replace("#",""),n=t.length===3?t.split("").map(i=>i+i).join(""):t,a=Number.parseInt(n,16);return Number.isFinite(a)&&n.length===6?[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]:[0,0,0]}function ga(e){let t=new Uint32Array(256),n=0;for(let c=0;c+3<e.length;c+=4)e[c+3]<8||(t[Math.round(.2126*e[c]+.7152*e[c+1]+.0722*e[c+2])]++,n++);if(!n)return[0,1];let a=c=>{let o=0;for(let f=0;f<256;f++)if(o+=t[f],o>=n*c)return f/255;return 1},i=a(.02),l=a(.98);return l-i<.08?[0,1]:[i,l]}var Jt=e=>e.hover==="fluid"&&!e.fluid?"none":e.hover;function fi(e,t,n=24,a=.12,i="ellipse"){return e.width>0&&e.height>0?{x:(t.left-n-e.left)/e.width,y:(t.top-n-e.top)/e.height,width:(t.width+n*2)/e.width,height:(t.height+n*2)/e.height,feather:a,shape:i}:!1}function hi(e){let t=Tt(e),n=[];for(let a=0;a<t.length&&n.length<16;){if(!t[a].trim()){a++;continue}let i=a;for(;a<t.length&&t[a].trim();)a++;n.push(i,a-i)}return n}function di(e,t,n=256){let a=Math.min(.16666666666666666,n/Math.max(1,e,t));return[Math.max(2,Math.round(e*a)),Math.max(2,Math.round(t*a))]}function mi(e,t,n,a,i=8,l=28,c=new Uint8Array(n*a)){let o=n*a;if(c.length!==o&&(c=new Uint8Array(o)),c.fill(0),!(t.width>0&&t.height>0)||!e.length)return c;let f=n/t.width,d=a/t.height,m=Math.max(0,Math.round(l/2.56*f)),g=i+l*.5;for(let x of e){if(!(x.width>0&&x.height>0))continue;let F=Math.max(0,Math.round((x.left-g-t.left)*f)),v=Math.min(n,Math.round((x.left+x.width+g-t.left)*f)),A=Math.max(0,Math.round((x.top-g-t.top)*d)),r=Math.min(a,Math.round((x.top+x.height+g-t.top)*d));for(let E=A;E<r;E++)c.fill(255,(a-1-E)*n+F,(a-1-E)*n+Math.max(F,v))}if(!m)return c;let w=new Float32Array(Math.max(n,a)),T=new Float32Array(Math.max(n,a)+1),M=(x,F,v)=>{for(let A=0;A<3;A++){for(let r=0;r<x;r++)w[r]=c[v+r*F];T[0]=0;for(let r=0;r<x;r++)T[r+1]=T[r]+w[r];for(let r=0;r<x;r++){let E=Math.max(0,r-m),L=Math.min(x,r+m+1);c[v+r*F]=Math.round((T[L]-T[E])/(L-E))}}};for(let x=0;x<a;x++)M(n,1,x*n);for(let x=0;x<n;x++)M(a,n,x);return c}var _l=20,Pl=3,Dl=.15,Gl=/\\.(mp4|webm|mov|m4v|ogv)(\\?|#|$)/i;var Il=()=>{let e=typeof navigator>"u"?void 0:navigator;return 1e3/(!!e&&(e.hardwareConcurrency>0&&e.hardwareConcurrency<=2||!!e.deviceMemory&&e.deviceMemory<=2||!!e.connection?.saveData)?30:60)-2},Ul=3840*2160;var pi=new WeakMap;function wt(e,t){let n=pi.get(e);(!n||n.length!==t.length)&&pi.set(e,n=new Float64Array(t.length).fill(NaN));let a=!1;for(let i=0;i<t.length;i++)n[i]!==t[i]&&(a=!0,n[i]=t[i]);return a}var Ol=[new Float64Array(1),new Float64Array(2),new Float64Array(3),new Float64Array(4)],Mr=(e,t,n,a)=>{let i=a!==void 0?4:n!==void 0?3:t!==void 0?2:1,l=Ol[i-1];return l[0]=e,i>1&&(l[1]=t),i>2&&(l[2]=n),i>3&&(l[3]=a),l},N=(e,t,n)=>{t&&wt(t,Mr(n))&&e.uniform1f(t,n)},Ae=(e,t,n)=>{t&&wt(t,Mr(n))&&e.uniform1i(t,n)},We=(e,t,n,a)=>{t&&wt(t,Mr(n,a))&&e.uniform2f(t,n,a)},Bl=(e,t,n,a,i)=>{t&&wt(t,Mr(n,a,i))&&e.uniform3f(t,n,a,i)},Ft=(e,t,n,a,i,l)=>{t&&wt(t,Mr(n,a,i,l))&&e.uniform4f(t,n,a,i,l)},Wl=(e,t,n)=>{t&&wt(t,n)&&e.uniform2fv(t,n)},Er=(e,t,n)=>{t&&wt(t,n)&&e.uniform3fv(t,n)},xa=(e,t,n)=>{t&&wt(t,n)&&e.uniform4fv(t,n)},va=0,Nl=2,Hl=1280*720,on={alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance"},ya=(e,t)=>\`\${e.fontWeight} \${Math.max(1,t.height*e.glyphScale)}px \${e.font}\`,gi=(e,t)=>\`\${nn(e.charset).join("")}\\0\${ya(e,t)}\\0\${t.width}x\${t.height}x\${t.columns}\`;function Xl(e,t,n,a){let i=Math.min(globalThis.devicePixelRatio||1,e.maxPixelRatio,Math.sqrt(Ul/Math.max(1,t*n)));return a<1&&i>1?Math.max(1,i*a):i}var Ut={atlas:(e,t,n)=>xi(e,t,n),shapes:e=>zl(e)},bi=(e,t)=>gi(e,t);function xi(e,t,n){let a=Tt(e.charset),i=document.createElement("canvas");i.width=t.atlasWidth,i.height=t.atlasHeight;let l=i.getContext("2d");l.fillStyle="#fff",l.textAlign="center",l.textBaseline="alphabetic";let c=ya(e,t),o=Math.max(1,t.height*e.glyphScale),f=\`\${e.fontWeight} \${o}px \${ri}, \${e.font}\`;l.font=c;let d=l.measureText("M"),m=d.actualBoundingBoxAscent||t.height*e.glyphScale*.7,g=d.actualBoundingBoxDescent||0,w=(t.height+m-g)/2;a.forEach((x,F)=>{let v=F%t.columns*t.width+t.width/2,A=Math.floor(F/t.columns)*t.height+w,r=$r(x);if(l.save(),l.beginPath(),l.rect(v-t.width/2,A-w,t.width,t.height),l.clip(),r){l.font=f;let E=l.measureText(x),L=Math.max(E.width,(E.actualBoundingBoxLeft||0)+(E.actualBoundingBoxRight||0)),Y=(E.actualBoundingBoxAscent||o*.88)+(E.actualBoundingBoxDescent||o*.12),Q=Math.min(1,t.width*.94/Math.max(1,L),t.height*.94/Math.max(1,Y));l.translate(v,Math.floor(F/t.columns)*t.height+t.height/2),l.scale(Q,Q),l.translate(((E.actualBoundingBoxLeft||0)-(E.actualBoundingBoxRight||0))/2,((E.actualBoundingBoxAscent||o*.88)-(E.actualBoundingBoxDescent||o*.12))/2),l.fillText(x,0,0),l.font=c}else{let E=l.measureText(x).width;l.translate(v,A),E>t.width*.96&&l.scale(t.width*.96/E,1),l.fillText(x,0,0)}l.restore()});let T=!0,M=document.fonts;try{T=M?.check?M.check(c,a.join("")):!0}catch{}return n&&queueMicrotask(()=>{i.width=i.height=1}),{image:i,final:T}}function zl(e){let t=Tt(e.charset),n=new Uint8Array(t.length*16),a=an(60,e.cellAspect,1,t.length);try{let{image:i}=xi(e,a,!1),l=i,c=l.width,o=l.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,l.width,l.height).data;l.width=l.height=1,t.forEach((f,d)=>{let m=d%a.columns*a.width,g=Math.floor(d/a.columns)*a.height,w=new Float64Array(15),T=new Float64Array(15),M=0;for(let x=0;x<a.height;x++)for(let F=0;F<a.width;F++){let v=o[((g+x)*c+m+F)*4+3]/255,A=Math.min(4,Math.floor(x*5/a.height))*3+Math.min(2,Math.floor(F*3/a.width));w[A]+=v,T[A]++,M+=v}for(let x=0;x<15;x++)n[d*16+x]=Math.round(255*w[x]/Math.max(1,T[x]));n[d*16+15]=Math.round(255*M/(a.width*a.height))})}catch{}return n}var ql=(e,t)=>e.length===t.length&&e.every((n,a)=>n===t[a]);function vi(e,t={}){let n=s=>typeof HTMLElement<"u"&&s instanceof HTMLElement,a=s=>{let u=s.clear;return i(u)?{element:null,rest:{...s,clear:!1}}:n(u)?{element:{element:u},rest:{...s,clear:void 0}}:u&&typeof u=="object"&&n(u.element)?{element:u,rest:{...s,clear:void 0}}:{element:null,rest:s}},i=s=>!!s&&typeof s=="object"&&"rects"in s,l=a(t).element,c=i(t.clear)?t.clear:null,o=ma(a(t).rest),f=t.onError,d=e.ownerDocument,m=!d||typeof document>"u"||d===document,g=t.context??"auto",w=()=>{let s=e.clientWidth||0,u=e.clientHeight||0,b=Math.min(globalThis.devicePixelRatio||1,o.maxPixelRatio);return s*u*b*b},M=!m||g==="own"||g==="auto"&&va<Nl&&w()>=Hl?e.getContext("webgl2",on):null,x=!M&&m?ei():null,F=x?e.getContext("2d",{alpha:!0}):null,v=!!(x&&F),A=v?x.gl:M??e.getContext("webgl2",on);if(!A)throw new Error("WebGL2 is not available for the glyph field.");let r=A;v||va++;let E=ca(r),L=v?null:r.getContextAttributes(),Y=!!L&&Object.keys(on).every(s=>L[s]===on[s]),Q=v?null:new xr(r,()=>{Lt()&&he()}),re=()=>v?x.frames:Q;v&&ti(e,!0),e.setAttribute("role","img"),e.setAttribute("aria-label",t.label??"ASCII artwork"),e.dataset.renderer="glyph-field";let J=!1,ne=v?null:r.getExtension("KHR_parallel_shader_compile"),_=null,ee=null,K=null,S,D,Z=null,q=null,C=[],U=[],H=null,te=!1,le=null,pe=null,De=[],V=0,ae=0,Re=1,Me=0,xe=an(o.cellSize,o.cellAspect,1,2),Le=2,Te=0,$e=0,tt=0,O=null,ve=!1,He=null,Ke=0,de=0,Ye=0,Xe=null,Fe=0,rt=0,ht=0,nt=!0,dt=0,at=[0,1],ot=-1/0,Tr=-1/0,Fr=!1,Bt=Il(),it=new Float32Array(16),Qe=!1,tr=0,mt=0,se=!0,Ve=!1,ke=!1,At=!1,h=!1,P=!0,R=(t.effects??[]).slice(0,4),ge=!!t.live,ce=[],j={target:null,at:[-1,-1],presence:0,data:new Float32Array(32)},ue=null,me=null,I=1/60,B=0,X=0,ie=[],fe=new Float32Array(16),Ce=()=>{if(!l)return;let{element:s,padding:u=32,feather:b=.16,shape:y="rect",pointer:p=0}=l,k=fi(e.getBoundingClientRect(),s.getBoundingClientRect(),u,b,y),$=k&&p>0?{...k,pointer:Math.min(1,Math.max(0,p))}:k,W=o.clear;JSON.stringify(W)!==JSON.stringify($)&&(o={...o,clear:$},se=!0)},Se=null,Ge=new Uint8Array(0),Ie=0,ze=0,_e=!1,lt=null,Ze=new Float64Array(0),st=!0,Ti=()=>{if(!c){_e&&(_e=!1,se=!0);return}let s=c.rects,u=typeof s=="function"?s():s;if(u===lt&&!st)return;lt=u;let b=e.getBoundingClientRect(),[y,p]=di(b.width,b.height),k=new Float64Array(u.length*4+6);k[0]=b.left,k[1]=b.top,k[2]=b.width,k[3]=b.height,k[4]=c.padding??8,k[5]=c.softness??28,u.forEach((W,oe)=>{k[6+oe*4]=W.left,k[7+oe*4]=W.top,k[8+oe*4]=W.width,k[9+oe*4]=W.height});let $=!st&&k.length===Ze.length&&k.every((W,oe)=>W===Ze[oe]);st=!1,!($&&_e)&&(Ze=k,Ge=mi(u,b,y,p,k[4],k[5],Ge),!ke&&(Se??(Se=Je(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,Se),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),y!==Ie||p!==ze?r.texImage2D(r.TEXTURE_2D,0,r.R8,y,p,0,r.RED,r.UNSIGNED_BYTE,Ge):r.texSubImage2D(r.TEXTURE_2D,0,0,0,y,p,r.RED,r.UNSIGNED_BYTE,Ge),r.pixelStorei(r.UNPACK_ALIGNMENT,4),Ie=y,ze=p,_e=!0,se=!0))},Ta=()=>{se=!0,he()},Fa=!1,cn=()=>{let s=!!c&&typeof c.rects=="function"&&typeof window<"u"&&typeof window.addEventListener=="function";s!==Fa&&(Fa=s,s?window.addEventListener("scroll",Ta,{passive:!0,capture:!0}):window.removeEventListener("scroll",Ta,{capture:!0}))},un=s=>s==="lantern"||s==="loupe"||s==="reveal",we={target:null,at:null,strength:0,trail:[]},rr=new Float32Array(36),Ue=null,pt=null,wr=!1,wa=()=>{if(!V||!ae)return null;let s=V/ae,u=Math.round(s>=1?128:128*s),b=Math.round(s>=1?128/s:128);return(!Ue||Ue.width!==u||Ue.height!==b)&&(Ue=new Kr(u,b),pt||(pt=Je(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,pt),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,u,b,0,r.RGBA,r.UNSIGNED_BYTE,Ue.pixels),wr=!0),Ue},Fi=s=>{let u=wa();return!u||!u.active?!1:(u.step(s),r.bindTexture(r.TEXTURE_2D,pt),r.texSubImage2D(r.TEXTURE_2D,0,0,0,u.width,u.height,r.RGBA,r.UNSIGNED_BYTE,u.pixels),wr=!0,!0)},be=null,Wt=null,fn=new Uint8Array(0),gt=!1,nr=null,Nt=null,hn=-1,ka=[-.5,-.8],kr=[0,0],Aa=()=>{if(!(!be||!O))try{if(Nt??(Nt=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})),!Nt)return;let s=O instanceof HTMLVideoElement,u=s?be.cols>>1:be.cols,b=s?be.rows>>1:be.rows,y=Nt.canvas;y.width!==u||y.height!==b?(y.width=u,y.height=b):Nt.clearRect(0,0,u,b);let p=Ke||1,k=de||1;Nt.drawImage(O,et.offset[0]*p,et.offset[1]*k,et.scale[0]*p,et.scale[1]*k,0,0,u,b),nr=ai(Nt.getImageData(0,0,u,b).data,u,b,nr),kr[0]=u,kr[1]=b,ii(be,nr,ka,u,b)}catch{}},Ra=(s,u,b)=>{if(!V||!ae)return;let y=V/ae,p=Math.round(y>=1?128:128*y),k=Math.round(y>=1?128/y:128);(!be||be.cols!==p||be.rows!==k)&&(be=new en(p,k),nr=null,fn=new Uint8Array(p*k*4),Wt??(Wt=Je(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,Wt),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,p,k,0,r.RGBA,r.UNSIGNED_BYTE,null)),be.base=Math.min(p,k)*1.1,be.mass=0,be.calm=7,be.fade=1.6,Aa(),hn=ht,be.drop(s*(p-1),u*(k-1),b,2.2),he()},wi=s=>{if(!be?.live||!Wt)return gt?(gt=!1,!0):!1;O instanceof HTMLVideoElement&&hn!==ht&&(Aa(),hn=ht),be.step(s,.45+.55*Math.exp(-be.age/.7));let u=Math.min(1,Math.exp(-(be.age-.9)/.5));return u<.02?(be.clear(),gt=!1,!0):(li(be,nr??new Float32Array(0),ka,fn,u,kr[0],kr[1]),r.bindTexture(r.TEXTURE_2D,Wt),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texSubImage2D(r.TEXTURE_2D,0,0,0,be.cols,be.rows,r.RGBA,r.UNSIGNED_BYTE,fn),gt=!0,!0)},ki=(s,u)=>{let b=o.lantern,y=we.target;if(y){let k=we.at;if(!k)we.at=[y[0],y[1]];else if(bt())k[0]=y[0],k[1]=y[1];else{let oe=1-Math.exp(-b.follow*s);k[0]+=(y[0]-k[0])*oe,k[1]+=(y[1]-k[1])*oe}let $=we.at,W=we.trail[we.trail.length-1];b.trail>0&&(!W||u-W.born>28&&Math.hypot($[0]-W.x,$[1]-W.y)>.004)&&(we.trail.push({x:$[0],y:$[1],born:u}),we.trail.length>12&&we.trail.shift())}we.strength+=((y?1:0)-we.strength)*(1-Math.exp(-s*(y?9:5)));let p=we.trail;for(let k=p.length-1;k>=0;k--)b.trail>0&&u-p[k].born<b.trail*4e3||p.splice(k,1);rr.fill(0);for(let k=0;k<p.length;k++){let $=p[k];rr[k*3]=$.x,rr[k*3+1]=$.y,rr[k*3+2]=.55*Math.exp(-(u-$.born)/1e3/Math.max(.01,b.trail))}return we.strength>.003||p.length>0},dn=0,Sa=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,La=!!Sa?.matches,bt=()=>o.respectReducedMotion&&La,mn,Ai=new Promise(s=>{mn=s}),Rt=!0,Ht=s=>f?.(s instanceof Error?s:new Error(String(s))),Ca=(s,u)=>{let b=r.createShader(s);return De.push(b),r.shaderSource(b,u),r.compileShader(b),b},ar=s=>{if(v)return x.program(s);pe??(pe=Ca(r.VERTEX_SHADER,yo));let u=r.createProgram(),b=Ca(r.FRAGMENT_SHADER,s);return r.attachShader(u,pe),r.attachShader(u,b),r.linkProgram(u),{program:u,locations:null,fragment:b}},Ar=(s,u=!1)=>{if(s.locations)return!0;if(v)return x.linked(s,u);let{program:b,fragment:y}=s;if(!u&&ne&&!r.getProgramParameter(b,ne.COMPLETION_STATUS_KHR))return!1;if(!r.getProgramParameter(b,r.LINK_STATUS)){if(r.isContextLost())return!1;throw new Error(r.getShaderInfoLog(y)||r.getProgramInfoLog(b)||"Glyph field program failed to link.")}let p={};for(let k=r.getProgramParameter(b,r.ACTIVE_UNIFORMS)-1;k>=0;k--){let $=r.getActiveUniform(b,k).name.replace(/\\[0\\]$/,"");p[$]=r.getUniformLocation(b,$)}return s.locations=p,!0},pn=(s=!1)=>{if(!_||!ee)return!1;try{if(!Ar(_,s))return!1}catch(u){if(!R.length)throw u;let b=R.map(y=>y.name).join(", ");return Ln([]),Sr(),Ht(new Error(\`Field effects (\${b}) did not compile, so the field draws without them. \${u instanceof Error?u.message:String(u)}\`)),!1}return Ar(ee,s)},Je=s=>{let u=r.createTexture();return r.bindTexture(r.TEXTURE_2D,u),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,s===r.LINEAR_MIPMAP_LINEAR?r.LINEAR:s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),u},gn=()=>{q&&(r.deleteTexture(q.ink),r.deleteTexture(q.under),r.deleteFramebuffer(q.buffer),q.glow&&r.deleteTexture(q.glow),q=null)},_a=()=>ui(o.cellFit,o.cellSize,o.cellAspect,Re,V,ae,xe),Ri=()=>{let[s,u]=_a(),b=Math.ceil(V/s-1e-4),y=Math.ceil(ae/u-1e-4),p=o.post.bloom>0;if(q&&q.columns===b&&q.rows===y&&!!q.glow===p)return q;gn();let k=()=>{let ut=Je(r.NEAREST);return r.texStorage2D(r.TEXTURE_2D,1,J?r.RGBA8:r.RGBA16F,b,y),ut},$=k(),W=k(),oe=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,oe),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,$,0),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT1,r.TEXTURE_2D,W,0);let qe=null;return p&&(qe=Je(r.LINEAR_MIPMAP_LINEAR),r.texStorage2D(r.TEXTURE_2D,Math.floor(Math.log2(Math.max(b,y)))+1,r.RGBA8,b,y),r.bindFramebuffer(r.FRAMEBUFFER,oe),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT2,r.TEXTURE_2D,qe,0)),r.drawBuffers(qe?[r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1,r.COLOR_ATTACHMENT2]:[r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),q={ink:$,under:W,glow:qe,buffer:oe,columns:b,rows:y}},bn=()=>!!o.fluid&&Jt(o)==="fluid",xn=()=>{H?.release(),te=!1,C.forEach(s=>r.deleteTexture(s)),U.forEach(s=>r.deleteFramebuffer(s)),C=[],U=[]};function Pa(){K&&!v&&r.deleteProgram(K.program),K=ar(Mo(J)),v?H?.release():H?.dispose(),H=J?null:To(r,ar,s=>Ar(s))}let Da=()=>{xn();let s=o.fluid;if(!s||!bn()||!V||!ae)return;K||Pa();let u=s.resolution,b=V/ae;if(Te=b>=1?u:Math.max(8,Math.round(u*b)),$e=b>=1?Math.max(8,Math.round(u/b)):u,te=!!H&&H.resize(Te,$e),te){tt=0;return}let y=()=>{xn();for(let p=0;p<2;p++){let k=Je(r.LINEAR);r.texImage2D(r.TEXTURE_2D,0,J?r.RGBA8:r.RGBA16F,Te,$e,0,r.RGBA,J?r.UNSIGNED_BYTE:r.HALF_FLOAT,null);let $=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,$),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,k,0),C.push(k),U.push($)}return r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE};if(!y()){if(J)throw new Error("The glyph field could not allocate its fluid buffers.");J=!0,Sr(),Pa(),y()}for(let p of U)r.bindFramebuffer(r.FRAMEBUFFER,p),r.viewport(0,0,Te,$e),r.clearColor(J?.5:0,J?.5:0,0,1),r.clear(r.COLOR_BUFFER_BIT);r.bindFramebuffer(r.FRAMEBUFFER,null),tt=0},Rr=-1,or=!1,vn=s=>s.post.bloom>0||s.post.scanlines>0||s.post.grain>0||s.post.chroma>0||s.post.curvature>0;function Sr(){_&&!v&&r.deleteProgram(_.program),ee&&!v&&r.deleteProgram(ee.program),gn(),_=ar(Nr(J,R)),Rr=It.indexOf(o.mark),or=vn(o),ee=ar(fr(Rr,or)),(v?!x.canCompileInParallel:!ne)&&pn(!0)}let Ga=()=>ya(o,xe),yn=()=>{se=!0,he()},En=()=>gi(o,xe),Mn=()=>{if(Le=Tt(o.charset).length,xe=an(o.cellSize,o.cellAspect,Re,Le),Me=Re,v){let b=En();if(Z?.key!==b){let y=Z;Z=x.atlas(b,Tn,yn),x.releaseAtlas(y,yn),S=Z.texture}se=!0;return}let{image:u}=Tn();r.bindTexture(r.TEXTURE_2D,S),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,u),typeof u.getContext=="function"&&(u.width=u.height=1),se=!0};function Tn(){return Ut.atlas(o,xe,v)}let Ia=typeof document>"u"?void 0:document.fonts,Fn=()=>{if(!Ia?.load)return;let s=Ga();Ia.load(s,Tt(o.charset).join("")).then(()=>{if(!(Ve||ke||Ga()!==s)){if(_r++,!v){Mn(),he();return}Z&&!Z.final&&Z.key===En()&&x.paintAtlas(Z,Tn)}},()=>{})},Ua=s=>s.trim().replace(/^["']|["']$/g,"").toLowerCase(),Si=s=>{let u=s.fontfaces??[],b=o.font.split(",").map(Ua);u.some(y=>b.includes(Ua(y.family)))&&Fn()},wn=()=>{if(at=[0,1],Dr=!1,!(!O||o.levels==="none"))try{let s=document.createElement("canvas");s.width=s.height=64;let u=s.getContext("2d",{willReadFrequently:!0});O===Xe&&(u.imageSmoothingQuality="medium"),u.drawImage(O,0,0,64,64),at=ga(u.getImageData(0,0,64,64).data)}catch{at=[0,1]}},Xt=null,Lr=null,zt=!1,xt=-1/0,Cr=new Uint8Array(0),qt=null,kn=()=>{if(zt=!1,lr=!1,!O||o.scope==="all")return;let s=Ke||1,u=de||1,b=Math.max(8,Math.round(s>=u?96:96*s/u)),y=Math.max(8,Math.round(u>=s?96:96*u/s));try{if(qt??(qt=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})),!qt)return;let p=qt.canvas;p.width!==b||p.height!==y?(p.width=b,p.height=y):qt.clearRect(0,0,b,y),qt.drawImage(O,0,0,b,y),Oa(qt.getImageData(0,0,b,y).data,b,y)}catch{return}},Oa=(s,u,b)=>{if(zt=!1,lr=!1,!(!O||o.scope==="all")&&(Lr=Yr(s,u,b,null,Lr),Lr.key!=="none")){Cr.length!==u*b*4&&(Cr=new Uint8Array(u*b*4));for(let y=0;y<u*b;y++)Cr[y*4+3]=Math.round(Lr.subject[y]*255);Xt??(Xt=Je(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,Xt),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,u,b,0,r.RGBA,r.UNSIGNED_BYTE,Cr),zt=!0}},St=null,An="",_r=0,Ba="",Wa=null,Na=null,Ha=-1,vt=!1,Vt=null,ir={levels:!1,scope:!1},Pr=0,Rn=-1/0,ct,Dr=!1,lr=!1,Li=()=>{let s=Vt?.poll();s&&(ir.levels&&o.levels!=="none"&&(at=ga(s.data)),ir.scope&&Oa(s.data,s.width,s.height),(ir.levels||ir.scope)&&(se=!0))},Xa=null,za=0,qa=0,sr=()=>{if(!O)return;let s=performance.now(),u=O instanceof HTMLVideoElement||ge;u&&ct===void 0&&(ct=Ao(r));let b=u&&!!ct;u&&!b&&Li(),Pr++;let y=Pr-Rn>=8,p=!u||ot===-1/0?"now":s-ot>1500&&y&&o.levels!=="none"?"later":null,k=!u||xt===-1/0?"now":s-xt>160&&y&&o.scope!=="all"&&o.hover!=="none"?"later":null;!b&&p==="now"&&(wn(),ot=s),!b&&k==="now"&&(kn(),xt=s),r.bindTexture(r.TEXTURE_2D,D),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1);try{let $=O,W=$.videoWidth||$.naturalWidth||$.width,oe=$.videoHeight||$.naturalHeight||$.height;if(Xa===D&&za===W&&qa===oe&&W&&oe?r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,O):(r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,O),Xa=D,za=W,qa=oe),u?vt=!0:(r.generateMipmap(r.TEXTURE_2D),vt=!1),rt=W*oe*4*4/3,b){let jt=!!p&&o.levels!=="none",ur=!!k&&o.scope!=="all"&&o.hover!=="none";(jt||ur)&&(vt&&(r.generateMipmap(r.TEXTURE_2D),vt=!1),jt&&(ct.measureLevels(D,W,oe),Dr=!0),ur&&(ct.measureScope(D,W,oe),lr=!0,zt=!0),Rn=Pr,se=!0),p&&(ot=s),k&&(xt=s);return}let qe=p==="later",ut=k==="later";(qe||ut)&&!Vt?.pending&&(Vt??(Vt=Fo(r)),vt&&(r.generateMipmap(r.TEXTURE_2D),vt=!1),Vt.request(D,W,oe,128)?(ir={levels:qe,scope:ut},Rn=Pr,qe&&(ot=s),ut&&(xt=s)):(qe&&(wn(),ot=s),ut&&(kn(),xt=s)))}catch($){Ht($)}},Va=()=>{Vt=null,St=null,An="",J=!r.getExtension("EXT_color_buffer_float")&&!r.getExtension("EXT_color_buffer_half_float"),Sr(),le=v?x.vertexArray():r.createVertexArray(),v||(S=Je(r.NEAREST)),D=Je(r.LINEAR_MIPMAP_LINEAR),r.bindTexture(r.TEXTURE_2D,D),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,1,1,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),r.generateMipmap(r.TEXTURE_2D),V=ae=0,Me=0,Lt(),Fn(),O&&sr()};function Lt(){let s=e.clientWidth||e.clientHeight?{width:e.clientWidth,height:e.clientHeight}:e.getBoundingClientRect();Fr=!s.width||!s.height;let u=Xl(o,s.width,s.height,re().scale),b=Math.max(1,Math.round(s.width*u)),y=Math.max(1,Math.round(s.height*u));if(b===V&&y===ae&&u===Re)return!1;let p=!V||Math.abs(b/y-V/ae)>.01;return Re=u,V=b,ae=y,e.width=V,e.height=ae,Me!==Re&&Mn(),(p||bn()&&!C.length&&!te)&&Da(),se=!0,!0}let Ci=()=>h||X>=2&&!(O instanceof HTMLVideoElement)?!1:O instanceof HTMLVideoElement&&!O.paused&&!O.ended?!0:bt()?!1:!O&&o.scene!=="none"||o.drift>0||o.post.grain>0||R.some(u=>u.animate),_i=(s,u)=>{let b=o.fluid;if(!b||!U.length&&!te||(te?!H?.ready():!K||!Ar(K)))return;let y=V/ae,p=me;if(me=null,te&&H){let oe=5200*b.force*(bt()?.35:1);p&&(dn=u+Math.min(9,6/Math.max(.3,b.dissipation))*1e3),H.step(p?{from:p.from,to:p.to,force:[(p.to[0]-p.from[0])*oe,(p.to[1]-p.from[1])*oe]}:null,{dt:Math.min(s,1/60),radius:b.radius*1.1,curl:b.curl,dissipation:b.dissipation,aspect:y});return}let k=0,$=0;if(p){let oe=(bt()?1:3)*b.force;k=(p.to[0]-p.from[0])*y*oe*4,$=(p.to[1]-p.from[1])*oe*4,dn=u+7/Math.min(b.dissipation,b.dissipation*1.1)*1e3}let W=K.locations;r.bindFramebuffer(r.FRAMEBUFFER,U[1-tt]),r.viewport(0,0,Te,$e),r.useProgram(K.program),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,C[tt]),Ae(r,W.uPrevious,0),We(r,W.uSize,Te,$e),N(r,W.uAspect,y),N(r,W.uDt,s),N(r,W.uDecay,b.dissipation),N(r,W.uEnergyDecay,b.dissipation*1.1),N(r,W.uRadius,b.radius),N(r,W.uSplat,p?1:0),We(r,W.uFrom,p?.from[0]??0,p?.from[1]??0),We(r,W.uTo,p?.to[0]??0,p?.to[1]??0),We(r,W.uForce,k,$),r.drawArrays(r.TRIANGLES,0,3),tt=1-tt},ja=null,Gr=new Float32Array(18),cr=[0,0,0],$a=[1,1,1],Ka=[0,0,0,0],et=pa(1,1,1,1,"cover"),Ya=null,Qa=0,Za=0,Ja=0,eo=0,Pi=()=>{ja!==o&&(ja=o,cr=yr(o.ink),$a=yr(o.highlight==="auto"?"#ffffff":o.highlight),Ka=o.background==="transparent"?[0,0,0,0]:[...yr(o.background),1],Gr.fill(0),o.ramp.forEach((s,u)=>Gr.set(yr(s),u*3))),(Ya!==o||Qa!==V||Za!==ae||Ja!==Ke||eo!==de)&&(Ya=o,Qa=V,Za=ae,Ja=Ke,eo=de,et=pa(V,ae,Ke||1,de||1,o.fit,o.focus))},to=()=>{Pi(),v?x.begin(V,ae):Q.begin();let s=o.fluid,u=O&&Fe?xe.height/ae*Fe*et.scale[1]:1,b=o.sample==="point"?0:Math.max(0,Math.log2(Math.max(1,u))-.5);vt&&O&&(b>0||o.backdrop>0)&&(r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,D),r.generateMipmap(r.TEXTURE_2D),vt=!1);let y=Ri(),p=_.locations,k=ee.locations,$=Jt(o),W=!bt();r.bindFramebuffer(r.FRAMEBUFFER,y.buffer),r.viewport(0,0,y.columns,y.rows),r.useProgram(_.program),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,D),Ae(r,p.uSource,0),r.activeTexture(r.TEXTURE2),r.bindTexture(r.TEXTURE_2D,(te?H?.velocity:C[tt])??D),Ae(r,p.uFluid,2),r.activeTexture(r.TEXTURE3),r.bindTexture(r.TEXTURE_2D,pt??D),Ae(r,p.uTrailMap,3),r.activeTexture(r.TEXTURE6),r.bindTexture(r.TEXTURE_2D,(lr?ct?.scope:Xt)??D),Ae(r,p.uScope,6);let oe=Dr&&O&&o.levels==="auto"?ct?.levels??null:null;r.activeTexture(r.TEXTURE11),r.bindTexture(r.TEXTURE_2D,oe??D),Ae(r,p.uLevelMap,11),N(r,p.uLevelsFromMap,oe?1:0),r.activeTexture(r.TEXTURE7),r.bindTexture(r.TEXTURE_2D,Wt??D),Ae(r,p.uTapMap,7),N(r,p.uTapOn,gt&&O&&ve?1:0),N(r,p.uScopeMode,zt&&o.scope!=="all"?o.scope==="subject"?1:2:0),N(r,p.uFluidMode,te?1:0),Ae(r,p.uHoverMode,$==="fluid"?1:$==="lantern"?2:$==="trail"&&wr?3:$==="loupe"?4:$==="reveal"?5:0),N(r,p.uTrailAmount,o.trail.strength),Bl(r,p.uLight,we.at?.[0]??-1,we.at?.[1]??-1,un($)?we.strength:0),Er(r,p.uTrail,rr),N(r,p.uLightRadius,o.lantern.radius),N(r,p.uLightGain,o.lantern.strength),N(r,p.uClock,performance.now()/1e3),N(r,p.uFlicker,W?1:0),We(r,p.uFluidTexel,1/Math.max(1,Te),1/Math.max(1,$e)),We(r,p.uResolution,V,ae);let[qe,ut]=_a();We(r,p.uCell,qe,ut),N(r,p.uCount,Le),N(r,p.uBlend,o.blend==="on"||Le<=9&&(o.blend==="coarse"||o.blend==="auto"&&ve)?1:0),Ft(r,p.uSourceMap,et.scale[0],et.scale[1],et.offset[0],et.offset[1]),Ae(r,p.uScene,O?0:vo(o.scene)),Ae(r,p.uMark,It.indexOf(o.mark)),N(r,p.uOrder,o.glyphOrder==="text"?1:o.glyphOrder==="scatter"&&o.mark==="glyph"?2:0);let jt=o.sample==="shape"&&!!O&&o.mark==="glyph"&&o.glyphOrder!=="text"&&o.glyphOrder!=="scatter"&&xe.height>=8;if(jt){(Wa!==o||Na!==xe||Ha!==_r)&&(Wa=o,Na=xe,Ha=_r,Ba=\`\${En()}|\${_r}\`);let _t=Ba;if(An!==_t||!St){An=_t;let Pt=Ut.shapes(o);r.activeTexture(r.TEXTURE9),St??(St=Je(r.NEAREST)),r.bindTexture(r.TEXTURE_2D,St),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.texImage2D(r.TEXTURE_2D,0,r.R8,16,Math.max(1,Pt.length/16),0,r.RED,r.UNSIGNED_BYTE,Pt),r.pixelStorei(r.UNPACK_ALIGNMENT,4)}}r.activeTexture(r.TEXTURE9),r.bindTexture(r.TEXTURE_2D,jt&&St||D),Ae(r,p.uShapes,9),N(r,p.uShapeOn,jt?1:0),N(r,p.uShapeLod,Math.max(0,Math.log2(Math.max(1,u/5))-.5)),N(r,p.uShapeTone,_l),N(r,p.uShapeWindow,Pl),N(r,p.uShapeGate,Dl);let ur=o.glyphOrder==="text"&&o.textRepeat==="row"?hi(o.charset):[];it.fill(0),it.set(ur),Wl(r,p.uWords,it),N(r,p.uWordCount,ur.length/2),N(r,p.uScale,o.scale);let Pe=o.clear;Ft(r,p.uClear,Pe?Pe.x:0,Pe?Pe.y:0,Pe?Pe.width:0,Pe?Pe.height:0),N(r,p.uClearFeather,Pe?Pe.feather:.1),N(r,p.uClearShape,Pe&&Pe.shape==="rect"?1:0),N(r,p.uClearPointer,Pe?Pe.pointer??0:0),r.activeTexture(r.TEXTURE8),r.bindTexture(r.TEXTURE_2D,Se??D),Ae(r,p.uClearMap,8);let co=_e&&!!c&&!!Se;N(r,p.uClearMapOn,co?Math.min(1,Math.max(0,c.strength??.85)):0),N(r,p.uClearBend,co?Math.min(1,Math.max(0,c.bend??.5))*.035:0),We(r,p.uClearTexel,1/Math.max(1,Ie),1/Math.max(1,ze));let Xi=performance.now();fe.fill(0);for(let _t=0;_t<ie.length;_t++){let Pt=ie[_t],Ur=_t*4;fe[Ur]=Pt.x,fe[Ur+1]=Pt.y,fe[Ur+2]=(Xi-Pt.born)/1e3,fe[Ur+3]=Pt.strength}xa(r,p.uPulse,fe),Er(r,p.uInk,cr),Er(r,p.uRamp,Gr),N(r,p.uRampCount,o.color==="source"?0:o.ramp.length),Er(r,p.uHighlight,$a),N(r,p.uHighlightAuto,o.highlight==="auto"?1:0),xa(r,p.uBackground,Ka),N(r,p.uBrightness,o.brightness),N(r,p.uContrast,o.contrast),N(r,p.uGamma,o.gamma),N(r,p.uInvert,o.invert?1:0),N(r,p.uVignette,o.vignette),N(r,p.uSourceColor,o.color==="source"?1:0),N(r,p.uRefraction,s?s.refraction*(W?1:.25):0),N(r,p.uGlow,s?s.glow:0),N(r,p.uTime,mt),N(r,p.uDrift,W?o.drift:0),N(r,p.uFluidOn,s&&$==="fluid"&&(C.length||te)?1:0),N(r,p.uLod,b),N(r,p.uSaturation,o.saturation),N(r,p.uShade,o.shade),N(r,p.uBackdrop,O?o.backdrop:0),We(r,p.uLevels,O&&o.levels==="auto"?at[0]:0,O&&o.levels==="auto"?at[1]:1),R.length&&Gi(_.locations),r.bindVertexArray(le),r.drawArrays(r.TRIANGLES,0,3),y.glow&&(r.activeTexture(r.TEXTURE10),r.bindTexture(r.TEXTURE_2D,y.glow),r.generateMipmap(r.TEXTURE_2D)),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,V,ae),r.useProgram(ee.program),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,S),Ae(r,k.uAtlas,1),r.activeTexture(r.TEXTURE4),r.bindTexture(r.TEXTURE_2D,y.ink),Ae(r,k.uCells,4),r.activeTexture(r.TEXTURE5),r.bindTexture(r.TEXTURE_2D,y.under),Ae(r,k.uUnder,5),We(r,k.uResolution,V,ae),We(r,k.uCell,xe.width,xe.height),We(r,k.uPitch,qe,ut),N(r,k.uColumns,xe.columns),N(r,k.uDotScale,o.dotScale),We(r,k.uDir,Math.cos(o.markAngle*Math.PI/180),Math.sin(o.markAngle*Math.PI/180)),Ae(r,k.uMark,It.indexOf(o.mark)),Ft(r,k.uLine,o.linePitch,o.lineWeight,o.sparkle,0),Ft(r,k.uInlay,o.accents,o.shuffle,Math.floor(mt*7),nn(o.charset).length),N(r,k.uSourceColor,o.color==="source"?1:0),Er(r,k.uRamp,Gr),N(r,k.uRampCount,o.color==="source"?0:o.ramp.length),Ft(r,k.uFade,cr[0],cr[1],cr[2],o.mark==="inlay"||o.glyphOrder!=="tone"&&o.mark==="glyph"?1:0);let $t=o.post;r.activeTexture(r.TEXTURE10),r.bindTexture(r.TEXTURE_2D,y.glow??D),Ae(r,k.uGlow,10),Ft(r,k.uPost,y.glow?$t.bloom:0,$t.bloomRadius,$t.scanlines,$t.grain),Ft(r,k.uPost2,$t.chroma,$t.curvature,mt,2),r.drawArrays(r.TRIANGLES,0,3),v&&x.present(F,V,ae)},Sn=typeof document<"u"&&document.hidden,ro=()=>!Ve&&!ke&&!At&&!Fr&&(P||Rt)&&!Sn;function Ln(s){ce.forEach(b=>b()),R=s.slice(0,4);let u=()=>{se=!0,he()};ce=R.map(b=>b.subscribe(u)),R.length||(j.target=null,j.presence=0)}function Di(s){let u=j.target&&!h?1:0,b=!1;if(j.target){j.presence===0&&(j.at=[...j.target]);let y=1-Math.exp(-s/.035),p=j.target[0]-j.at[0],k=j.target[1]-j.at[1];Math.abs(p)+Math.abs(k)>1e-4&&(j.at=[j.at[0]+p*y,j.at[1]+k*y],b=!0)}if(j.presence!==u){let y=s/.15;j.presence=u>j.presence?Math.min(u,j.presence+y):Math.max(u,j.presence-y),b=!0}return b}function Gi(s){xa(r,s.uFx,bo(R,j.data)),Ft(r,s.uFxPointer,j.at[0],j.at[1],j.presence,bt()?0:1),N(r,s.uFxTime,mt)}Ln(R);let Ir=s=>{if(Qe=!1,!ro())return;let u=performance.now(),b=(s-tr)/1e3,y=Math.min(1/30,Math.max(1/480,b));tr=s,I=I*.9+Math.min(b,.25)*.1,B=I>1/24?B+1:0;try{re().overloaded&&X<2&&B>10&&(X=2),B>45&&X<2&&re().atMinimum&&(B=0,X++,X===1&&Re>1?(o={...o,maxPixelRatio:1},Lt()):X=2);let p=pn(),k=Ci();k&&(mt+=y*o.speed),ge&&O&&!(O instanceof HTMLVideoElement)&&!h&&(sr(),se=!0),O instanceof HTMLVideoElement&&O.readyState>=2&&nt&&("requestVideoFrameCallback"in O?nt=!1:nt=!0,sr(),ht++,se=!0);let $=Jt(o),W=$==="fluid"&&(me!==null||s<dn);if(W?_i(y,s):me=null,un($)&&(W=ki(y,s)||W),$==="trail"){let oe=!!Ue?.active;W=Fi(y)||W,oe&&!Ue?.active&&(se=!0)}if((be?.live||gt)&&(W=wi(y)||W,gt||(se=!0)),R.length&&Di(y)&&(W=!0),ie.length){for(let oe=ie.length-1;oe>=0;oe--)s-ie[oe].born>=2400&&ie.splice(oe,1);W=!0,ie.length||(se=!0)}c&&Ti(),p&&(W||se||k&&s-Tr>=Bt*Xo())&&(to(),Tr=s,se=!1,Rt&&(!Ye||O)&&(Rt=!1,mn())),(k||W||me||!p||ge&&O&&!h)&&(Qe=!0,aa(Ir)),Q&&!ke&&Q.end(s,performance.now()-u)}catch(p){At=!0,Ht(p)}};function he(){Qe||!ro()||(tr=performance.now(),Qe=!0,aa(Ir))}let Cn=(s,u)=>{let b=e.getBoundingClientRect();if(!b.width||!b.height)return null;let y=(s-b.left)/b.width,p=(u-b.top)/b.height;return y<-.05||y>1.05||p<-.05||p>1.05?null:[y,1-p]},_n=s=>{R.length&&!h&&(j.target=s?[s[0],1-s[1]]:null,he());let u=Jt(o);if(u==="none"||h){ue=null,we.target=null;return}if(un(u)){we.target=s?[s[0],1-s[1]]:null,ue=null,he();return}if(u==="trail"){let b=wa();if(!b)return;s?b.move(s[0],1-s[1],o.trail.radius,performance.now()):b.leave(),ue=null,he();return}if(!s){ue=null;return}ue&&(me=me?{from:me.from,to:s}:{from:ue,to:s}),ue=s,he()},Ii=s=>{s.type==="pointerdown"&&Oi(s);let u=Cn(s.clientX,s.clientY);no===window&&(ao.inside=!!u),_n(u)},Ui=()=>{ue=null,Ue?.leave(),j.target&&(j.target=null,he()),we.target&&(we.target=null,he())},no=t.interactionTarget??window,ao={target:no,move:Ii,leave:Ui,near:()=>P},Ct=[Vo(ao)];function Oi(s){if(o.tap==="none"||!O||!ve||h||Ve||bt()||s.button!==0||typeof Element<"u"&&s.target instanceof Element&&s.target.closest("button, a, input, select, summary, textarea, label"))return;let u=Cn(s.clientX,s.clientY);!u||u[0]<0||u[0]>1||u[1]<0||u[1]>1||(o.tap==="surface"?Ra(u[0],1-u[1],1):(ie=[...ie,{x:u[0],y:1-u[1],born:performance.now(),strength:1}].slice(-4),he()))}let Pn=()=>{let s=Lt();Ce(),c&&(st=!0,se=!0),(s||se)&&he()},Dn=l?jr(l.element,Pn):()=>{};Ct.push(jr(e,Pn),()=>Dn()),Ct.push(Jo(e,"25% 0px",s=>{P=s.isIntersecting,P&&(se=!0,he())})),Ct.push(jo(()=>{Sn=document.hidden,Sn||(se=!0,he())})),Ct.push($o(()=>{La=!!Sa?.matches,se=!0,he()})),Ct.push(Ko(Si)),cn(),Ct.push(()=>{c=null,cn()});let Gn=s=>{s?.preventDefault(),ke=!0,v||E(),Qe&&oa(Ir),Qe=!1},In=()=>{ke=!1,v?r=x.gl:E(),Q?.reset(),De.length=0,pe=null,Z=null,_=ee=K=null,q=null,C=[],U=[],H=null,te=!1,pt=null,Ue=null,wr=!1,Xt=null,zt=!1,Wt=null,be=null,gt=!1,ko(r),ct=void 0,Dr=lr=!1,Se=null,_e=!1,Ie=ze=0,st=!0;try{Va(),se=!0,he()}catch(s){Ht(s)}},oo={lost:()=>Gn(),restored:In,rescale:()=>{Lt()&&he()},size:()=>[V,ae],bytes:()=>{let s=J?4:8;return V*ae*4+rt+(q?q.columns*q.rows*(s*2+(q.glow?16/3:0)):0)+Te*$e*s*(te?6:C.length)+(Ue?Ue.width*Ue.height*4:0)}};v?x.join(oo):(e.addEventListener("webglcontextlost",Gn),e.addEventListener("webglcontextrestored",In));let Un=()=>{He&&(He.pause(),He.removeAttribute("src"),He.load(),He=null),dt&&O instanceof HTMLVideoElement&&"cancelVideoFrameCallback"in O&&O.cancelVideoFrameCallback(dt),dt=0},On=()=>{Xe?.close(),Xe=null},Bi=s=>{let u=s;if(!u.requestVideoFrameCallback)return;let b=()=>{Ve||O!==s||(nt=!0,he(),dt=u.requestVideoFrameCallback(b))};dt=u.requestVideoFrameCallback(b)},Wi=async s=>{let u=await createImageBitmap(s,{premultiplyAlpha:"none"}),b=[u.width,u.height],y=ci(u.width,u.height,V,ae,xe.height,o.fit);if(y===1)return{element:u,owned:!0,natural:b};try{return{element:await createImageBitmap(u,{resizeWidth:Math.max(1,Math.round(u.width*y)),resizeHeight:Math.max(1,Math.round(u.height*y)),resizeQuality:"medium",premultiplyAlpha:"none"}),owned:!0,natural:b}}finally{u.close()}},Bn=s=>new Promise((u,b)=>{let y=new Image;y.crossOrigin="anonymous",y.decoding="async",y.onload=()=>u({element:y,owned:!1}),y.onerror=()=>b(new Error("The glyph field could not load this image.")),y.src=s}),Ni=async s=>{if(typeof s!="string")return s instanceof HTMLImageElement&&!s.complete?s.decode().then(()=>({element:s,owned:!1})):s instanceof HTMLVideoElement&&s.readyState<2?new Promise((y,p)=>{s.addEventListener("loadeddata",()=>y({element:s,owned:!1}),{once:!0}),s.addEventListener("error",()=>p(new Error("The glyph field could not load this video.")),{once:!0})}):{element:s,owned:!1};if(Gl.test(s))return new Promise((y,p)=>{let k=document.createElement("video");k.crossOrigin="anonymous",k.muted=!0,k.loop=!0,k.playsInline=!0,k.preload="auto",k.addEventListener("loadeddata",()=>{k.play().catch(()=>{}),y({element:k,owned:!0})},{once:!0}),k.addEventListener("error",()=>p(new Error("The glyph field could not load this video.")),{once:!0}),k.src=s});if(typeof createImageBitmap!="function"||typeof fetch!="function")return Bn(s);let u;try{u=await(await fetch(s).then(y=>{if(!y.ok)throw new Error("The glyph field could not load this image.");return y})).blob()}catch(y){if(y instanceof Error&&y.message.startsWith("The glyph field"))throw y;return Bn(s)}if(!/svg/i.test(u.type))try{return await Wi(u)}catch{}let b=URL.createObjectURL(u);try{return await Bn(b)}finally{URL.revokeObjectURL(b)}},io=(s,u,b)=>{let{element:y,owned:p}=s;if(Ve||b!==Ye){p&&y instanceof HTMLVideoElement?(y.pause(),y.removeAttribute("src"),y.load()):p&&y.close();return}y!==O&&(Un(),On()),He=p&&y instanceof HTMLVideoElement?y:null,p&&!(y instanceof HTMLVideoElement)&&(Xe=y);let k=y!==O;O=y,ve=typeof u=="string"||u instanceof HTMLImageElement||u instanceof HTMLVideoElement,Fe=y instanceof HTMLVideoElement?y.videoHeight:y instanceof HTMLImageElement?y.naturalHeight:y.height,Ke=s.natural?.[0]??(y instanceof HTMLVideoElement?y.videoWidth:y instanceof HTMLImageElement?y.naturalWidth:y.width),de=s.natural?.[1]??Fe,nt=!0,k&&(ot=xt=-1/0),y instanceof HTMLVideoElement&&k&&Bi(y),ke||sr(),se=!0,he()},lo=(s,u)=>{Rt&&s===Ye&&(Rt=!1,mn()),Ht(u)},Hi=s=>typeof s!="string"&&!(s instanceof HTMLImageElement&&!s.complete)&&!(s instanceof HTMLVideoElement&&s.readyState<2),Wn=s=>{let u=++Ye;if(!s)return Un(),On(),O=null,Ke=de=Fe=rt=0,ve=!1,se=!0,he(),Promise.resolve();if(Hi(s)){try{io({element:s,owned:!1},s,u)}catch(b){lo(u,b)}return Promise.resolve()}return Ni(s).then(b=>io(b,s,u),b=>lo(u,b))};Va(),Ce();let so=t.source??null;return so?(Ye=1,Wn(so)):he(),{canvas:e,ready:Ai,get settings(){return o},update(s){let u=o,{element:b,rest:y}=a(s);if("clear"in s&&l?.element!==b?.element?(Dn(),l=b,Dn=b?jr(b.element,Pn):()=>{}):"clear"in s&&(l=b),"clear"in s){let $=i(s.clear)?s.clear:null;$!==c&&(c=$,st=!0,se=!0,cn(),he())}o=ma(b?{...y,clear:o.clear}:y,o),Ce(),s.label&&e.setAttribute("aria-label",s.label),o.maxPixelRatio!==u.maxPixelRatio&&Lt(),(o.charset!==u.charset||o.cellSize!==u.cellSize||o.cellAspect!==u.cellAspect||o.font!==u.font||o.fontWeight!==u.fontWeight||o.glyphScale!==u.glyphScale)&&(Mn(),Fn()),o.levels!==u.levels&&wn(),o.scope!==u.scope&&!ke&&(kn(),xt=performance.now()),((!!u.fluid&&Jt(u)==="fluid")!==bn()||o.fluid&&u.fluid&&o.fluid.resolution!==u.fluid.resolution)&&Da(),"source"in s&&Wn(s.source??null),"live"in s&&(ge=!!s.live),"effects"in s&&!ql(s.effects??[],R)?(Ln(s.effects??[]),ke||Sr()):(o.mark!==u.mark||vn(o)!==or)&&!ke&&(ee&&!v&&r.deleteProgram(ee.program),Rr=It.indexOf(o.mark),or=vn(o),ee=ar(fr(Rr,or))),se=!0,he()},setSource:Wn,pointer(s,u=0){if(s===null){_n(null);return}let b=e.getBoundingClientRect();_n(Cn(b.left+s,b.top+u))},redraw(){if(!(Ve||ke||At||!V))try{pn(!(Rt&&(v?x.canCompileInParallel:ne)))&&(ge&&O&&!(O instanceof HTMLVideoElement)&&sr(),to(),Rt||(se=!1))}catch(s){At=!0,Ht(s)}},pulse(s={}){if(Ve||bt())return;let u=e.getBoundingClientRect();if(!u.width||!u.height)return;let b=s.x??u.width/2,y=s.y??u.height/2;if(s.element){let k=s.element.getBoundingClientRect();b=k.left+k.width/2-u.left,y=k.top+k.height/2-u.top}let p=Math.max(0,Math.min(2,s.strength??1));if(o.tap==="surface"&&O&&ve){Ra(b/u.width,y/u.height,p);return}ie=[...ie,{x:b/u.width,y:y/u.height,born:performance.now(),strength:p}].slice(-4),he()},play(){h=!1,O instanceof HTMLVideoElement&&O.play().catch(()=>{}),se=!0,he()},pause(){h=!0,O instanceof HTMLVideoElement&&O.pause()},resize(){Lt()&&he()},destroy(){if(!Ve){if(Ve=!0,v||va--,Qe&&oa(Ir),Qe=!1,Ct.forEach(s=>s()),ce.forEach(s=>s()),v?x.leave(oo):(e.removeEventListener("webglcontextlost",Gn),e.removeEventListener("webglcontextrestored",In)),Un(),On(),O=null,!ke)if(xn(),gn(),r.deleteTexture(D),pt&&r.deleteTexture(pt),Xt&&r.deleteTexture(Xt),Vt?.dispose(),ct?.dispose(),St&&r.deleteTexture(St),Se&&r.deleteTexture(Se),v)x.releaseAtlas(Z,yn),H?.release();else{r.deleteTexture(S);for(let s of[_,ee,K])s&&r.deleteProgram(s.program);H?.dispose(),De.forEach(s=>r.deleteShader(s)),le&&r.deleteVertexArray(le),Y&&r.getExtension("WEBGL_lose_context")?.loseContext()}Z=null}}}}var kt=(e,t=[])=>self.postMessage(e,t),Ne=null,Ot=null,yi=null,er=!1,ln=new Map,Mi=new Map,sn=new Set,Vl=e=>\`\${e.charset}\\0\${e.fontWeight} \${e.font}\\0\${e.glyphScale}\`,jl=Ut.atlas,$l=Ut.shapes;Ut.atlas=(e,t,n)=>{let a=bi(e,t),i=ln.get(a);return i?{image:i,final:!0}:(sn.has(a)||(sn.add(a),kt({type:"atlas",key:a,settings:e,layout:t})),{...jl(e,t,n),final:!1})};Ut.shapes=e=>{let t=Vl(e),n=Mi.get(t);return n||(sn.has(\`shapes:\${t}\`)||(sn.add(\`shapes:\${t}\`),kt({type:"shapes",key:t,settings:e})),$l(e))};var Ei=()=>{let e=Ne?.settings.font.split(",")[0]?.trim().replace(/^["']|["']$/g,"");e&&Xn.announce(e)},Kl=e=>{let t="displayWidth"in e?e.displayWidth:e.width,n="displayHeight"in e?e.displayHeight:e.height;Ot??(Ot=new OffscreenCanvas(t,n)),(Ot.width!==t||Ot.height!==n)&&(Ot.width=t,Ot.height=n),yi??(yi=Ot.getContext("2d")),yi?.drawImage(e,0,0),e.close()};self.onmessage=({data:e})=>{try{switch(e.type){case"init":{self.devicePixelRatio=e.ratio,$n(...e.box),qn(e.hidden),Vn(e.reducedMotion,e.darkScheme),Kn(e.visible),er=e.streaming;let t=po(e.canvas);Ne=vi(t,{...e.options,context:"own",live:er,source:e.url??null,onError:n=>kt({type:"error",message:n.message})}),Ne.ready.then(()=>kt({type:"ready"}),n=>kt({type:"error",message:String(n?.message??n)}));break}case"box":$n(...e.box);break;case"visible":Kn(e.value);break;case"hidden":qn(e.value);break;case"media":Vn(e.reducedMotion,e.darkScheme);break;case"ratio":self.devicePixelRatio=e.value,Ne?.resize();break;case"pointer":mo(e.event,{clientX:e.clientX,clientY:e.clientY,pointerType:e.pointerType,buttons:e.buttons});break;case"frame":{if(Kl(e.frame),Ma||(Ma=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{Ma=!1,kt({type:"took"})}))),!Ne)break;e.streaming!==er&&(er=e.streaming,Ne.update({live:er})),(!er||!Ea)&&(Ne.setSource(Ot),Ea=!0);break}case"url":Ea=!1,Ne?.setSource(e.url);break;case"update":Ne?.update(e.options);break;case"call":{Ne?.[e.method]?.apply(Ne,e.args);break}case"atlas":ln.set(e.key,e.image),Ei();break;case"shapes":Mi.set(e.key,e.data),Ei();break;case"destroy":Ne?.destroy(),Ne=null;for(let t of ln.values())t.close();ln.clear(),self.close();break}}catch(t){kt({type:"error",message:String(t?.message??t)})}};var Ea=!1,Ma=!1;kt({type:"loaded"});})();
`});var lo=e=>Object.keys(e.params);function Hl(e){if(!e.length)return null;let n=e.map((o,l)=>{let c=lo(o);return`struct Fx${l}Params{${c.length?c.map(i=>`float ${i};`).join(""):"float unused;"}};`}).join(`
`),t={displace:["vec2 at=sampleAt;","sampleAt=at;"],shade:["vec3 color=rgb;vec3 ink=fxInk;float inkAmount=fxInkAmount;float glyph=fxGlyph;","fxInk=ink;fxInkAmount=inkAmount;fxGlyph=glyph;"]},a=o=>e.map((l,c)=>l[o]?`{// effect "${l.name}"
${((i,u)=>{let f=lo(i),h=f.length?f.map((M,b)=>`uFx[${2*u+(b>>2)}].${"xyzw"[3&b]}`).join(","):"0.";return`Fx${u}Params params=Fx${u}Params(${h});`})(l,c)}${t[o][0]}
${l[o]}
${t[o][1]}}`:"").filter(Boolean).join(`
`);return{declarations:`uniform vec4 uFx[8];
uniform vec4 uFxPointer;
uniform float uFxTime;
${n}`,displace:a("displace"),shade:a("shade")}}var Wl={none:3,flow:1,orb:2,drift:4,swell:5,caustics:6,contour:7,aurora:8,ripple:9,halo:10,interference:11,mesh:12,cascade:13,constellation:14},Ui=e=>e?`
const float VSCALE=6.;
vec4 decodeFluid(vec4 t){return vec4((t.xy*2.-1.)*VSCALE,t.z,t.w);}
vec4 encodeFluid(vec4 v){return vec4(clamp(v.xy/VSCALE*.5+.5,0.,1.),clamp(v.z,0.,1.),1.);}`:`
vec4 decodeFluid(vec4 t){return t;}
vec4 encodeFluid(vec4 v){return vec4(v.xyz,1.);}`,Ii=(e,n=[])=>{let t=(c=>`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uSource, uFluid;
uniform vec2 uResolution, uCell;
uniform float uCount, uBlend;
const float BAYER[16]=float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
uniform vec3 uRamp[6];
uniform float uRampCount;
// The gradient map: the tone run through the ramp's stops, evenly spaced, faintest first.
vec3 rampAt(float t){
  float x=clamp(t,0.,1.)*(uRampCount-1.);
  int i=int(min(floor(x),uRampCount-2.));
  vec3 a=uRamp[0],b=uRamp[1];
  for(int k=1;k<5;k++)if(k==i){a=uRamp[k];b=uRamp[k+1];}
  return mix(a,b,clamp(x-float(i),0.,1.));
}
uniform vec4 uSourceMap;
uniform int uScene;
uniform vec3 uInk, uHighlight;
uniform vec4 uBackground;
uniform float uBrightness, uContrast, uGamma, uInvert, uVignette, uSourceColor;
uniform float uRefraction, uGlow, uTime, uDrift, uFluidOn, uLod, uSaturation, uBackdrop, uShade, uHighlightAuto, uFluidMode;
uniform vec2 uFluidTexel;
uniform int uHoverMode;
uniform vec3 uLight;
uniform vec3 uTrail[12];
uniform float uLightRadius, uLightGain, uClock, uFlicker, uTrailAmount;
uniform sampler2D uTrailMap, uScope;
uniform float uScopeMode;
uniform vec2 uLevels;
// A moving source's levels, measured on the GPU (field-measure.ts), when uLevelsFromMap is set.
uniform sampler2D uLevelMap;
uniform float uLevelsFromMap;
// Shape sampling: each cell read in 3 by 5 parts and matched to the glyphs' own ink in those parts (see GlyphFieldOptions.sample).
uniform float uShapeOn, uShapeLod, uShapeTone, uShapeWindow, uShapeGate;
uniform sampler2D uShapes;
uniform int uMark;
uniform float uScale, uClearFeather, uClearShape, uOrder, uClearPointer;
// Text order by rows: each word's first glyph index and length, and how many words there are (0 reads the charset as one stream).
uniform vec2 uWords[8];
uniform float uWordCount;
uniform vec4 uClear;
uniform vec4 uPulse[4];
uniform sampler2D uTapMap;
uniform float uTapOn;
uniform sampler2D uClearMap;
uniform float uClearMapOn, uClearBend;
uniform vec2 uClearTexel;
layout(location=0) out vec4 outInk;
layout(location=1) out vec4 outUnder;
// The cell's light for bloom: its ink weighted by its tone, empty where the cell is blank. Only kept when bloom is on.
layout(location=2) out vec4 outGlow;
${Ui(c)}
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
vec3 generated(vec2 uv,float aspect){
  vec2 p=(uv-.5)*vec2(aspect,1.)*uScale;
  if(uScene==1){
    float t=uTime*.08;
    vec2 q=vec2(fbm(p*1.6+t),fbm(p*1.6-t+3.1));
    return vec3(smoothstep(.28,.86,fbm(p*1.8+q*1.6+vec2(t*.6,-t*.4))));
  }
  if(uScene==2){
    float r=.36,d=length(p),a=uTime*.25;
    vec3 l=normalize(vec3(cos(a)*.8,.55,sin(a)*.6+.6));
    if(d<r){
      vec3 n=normalize(vec3(p.x,-p.y,sqrt(r*r-d*d)));
      float diffuse=max(dot(n,l),0.),rim=pow(1.-n.z,2.5);
      float lon=atan(n.x,n.z)+uTime*.35,lat=asin(clamp(n.y,-1.,1.));
      float bands=.5+.25*sin(lat*14.)+.25*sin(lon*6.);
      return vec3(clamp(diffuse*.85+rim*.5+bands*.12,0.,1.));
    }
    return vec3(exp(-pow((d-r)*9.,2.))*.35);
  }
  if(uScene==4){
    // Drift: a few broad lobes that wander slowly. Built for halftone, where large soft shapes read best.
    float t=uTime*.045;
    vec2 q=p*1.15;
    vec2 w=vec2(fbm(q*.7+vec2(t,-t*.7)),fbm(q*.7+vec2(4.3-t*.8,t+1.7)));
    float n=fbm(q+w*1.3+vec2(t*.4,t*.25));
    return vec3(smoothstep(.36,.74,n));
  }
  if(uScene==5){
    // Swell: three crossing swells, the second bent by the first, so crests roll diagonally instead of pooling.
    float t=uTime;
    float s=sin((dot(p,vec2(.94,.33))/.95-t/9.)*6.2831853);
    float c=sin((dot(p,vec2(.6,-.8))/.58-t/13.)*6.2831853+s*.9);
    float k=sin((dot(p,vec2(-.29,.96))/.36+t/17.)*6.2831853);
    return vec3(smoothstep(.3,.9,.5+.5*(s*.5+c*.35+k*.15)));
  }
  // The kit's background scenes. Each starts a little way in, so a reduced-motion still is already composed.
  float t=uTime+40.,px=uCell.y/uResolution.y*uScale;
  if(uScene==6){
    // Caustics: light focused by a moving water surface. Two layers of warped sine waves drift against each other; each draws
    // smooth filaments along its zero line, about a character wide. Where they cross the light lifts a little, never to a blot.
    float tt=t*.12,a=0.,b=0.;
    for(int l=0;l<2;l++){
      float f=float(l),sc=5.4+f*2.4;
      vec2 q=(l==0?p:mat2(.8,-.6,.6,.8)*p)*sc;
      q+=vec2(sin(q.y*.45+tt*(1.+f*.3)),cos(q.x*.4-tt*(.8+f*.4)))*1.3;
      float v=sin(q.x+1.4*sin(q.y*.7+tt))+sin(q.y*1.1+1.2*sin(q.x*.8-tt*1.3))*.9;
      float wv=max(fwidth(v),1e-4);
      float line=(1.-smoothstep(.2,1.5,abs(v)/wv))*(l==0?.78:.62)+exp(-abs(v)/(wv*5.))*.16;
      if(l==0)a=line;else b=line;
    }
    float pulse=.85+.15*sin(tt*3.+p.x*1.7-p.y*1.1);
    float light=max(a,b)+.3*min(a,b);
    return vec3(clamp(light*light*pulse,0.,.78));
  }
  if(uScene==7){
    // Contour: a slow terrain read as survey lines about a character wide at any size; every fifth is an index line.
    float tt=t*.02;
    vec2 q=p*1.15+vec2(tt,-tt*.6);
    float h=noise(q)*.62+noise(q*2.07+3.1)*.27+noise(q*4.3-tt+7.)*.11;
    h+=.08*sin(tt*2.+p.x*.8);
    float k=h*13.,w=max(fwidth(k),1e-4),d=abs(fract(k+.5)-.5)/w;
    float major=mod(floor(k+.5),5.)<.5?1.:0.;
    return vec3((1.-smoothstep(.35,1.25-major*.25,d))*mix(.55,1.,major));
  }
  if(uScene==8){
    // Aurora: three curtains at different distances hang from the top. Far ones sit higher and dimmer; the nearest is tallest
    // and brightest. Each folds slowly and is brightest along its lower hem, fading upward. The rays are set per character
    // column, so the curtains read as vertical strokes at any stage size, from a small card to a phone.
    float tt=t*.05,a=0.,cw=uCell.x/uResolution.x;
    float col=floor(uv.x/cw+.5);
    for(int n=0;n<3;n++){
      float f=float(n),near=f/2.;
      float x=p.x*(1.3-near*.4)+f*3.7;
      float hem=-.28+near*.3+.16*sin(x*1.3+tt*(.9+f*.25)+f*2.)+.045*sin(x*3.4-tt*1.5+f);
      float d=hem-p.y;
      float body=d>0.?exp(-d/(.14+near*.26))*(.45+.55*exp(-d/.03)):exp(-d*d/.0002);
      float fold=.5+.5*sin(x*2.1+tt*.9+f*1.7+.7*sin(x*.8-tt*.6));
      float ray=mix(hash(vec2(col,f*7.1)),noise(vec2(col*.18+f*9.,tt*.7+f)),.55);
      float layer=clamp(body*(.1+.9*fold*fold)*(.2+.8*ray)*(.4+near*.6)*4.2,0.,1.);
      a=1.-(1.-a)*(1.-layer);
    }
    return vec3(smoothstep(.12,.9,a));
  }
  if(uScene==9){
    // Ripple: still water. Drops land here and there, each a few rings that widen and fade; the pointer drops its own.
    float tone=0.,g=.72;
    vec2 q=p/g,id=floor(q);
    for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
      vec2 c=id+vec2(i,j),h=vec2(hash(c),hash(c+7.3));
      float period=5.+h.x*5.,age=fract(t*.3/period*4.+h.y);
      vec2 at=(c+.2+.6*h)*g;
      float d=length(p-at),r=age*.62;
      float rings=max(0.,cos((d-r)*34.))*exp(-pow((d-r)/.11,2.));
      tone+=rings*pow(1.-age,1.8)*smoothstep(0.,.06,age)*(.7+.3*h.x);
    }
    return vec3(clamp(tone*1.25,0.,1.));
  }
  if(uScene==10){
    // Halo: a slow breathing corona that frames the content, its rays turning. The ring fits the stage: wide on a desktop
    // hero, tall on a phone, so the whole halo stays on screen; the middle stays empty for a headline.
    vec2 r=vec2(min(.46,aspect*.4),min(.34,.36/max(aspect,.01)*.5+.2));
    vec2 e=p/r;
    float d=length(e),a=atan(e.y,e.x),tt=t*.07,k=min(r.x,r.y);
    float breathe=1.+.04*sin(tt*3.1);
    float rays=.5+.5*noise(vec2(a*3.2+tt,tt*.5))*(.6+.4*noise(vec2(a*7.-tt*1.2,3.+tt*.4)));
    float s=(d-breathe)*k;
    float rim=exp(-pow(s/.03,2.));
    float corona=exp(-max(0.,s)/(.1+.08*rays))*smoothstep(-.04,.015,s)*rays*smoothstep(.36,.12,s);
    return vec3(clamp(rim*(.55+.45*rays)+corona*.85,0.,1.));
  }
  if(uScene==11){
    // Interference: two ring grids from slowly orbiting centres. Where they cross, broad moire bands open and close.
    float tt=t*.05;
    vec2 a=vec2(-.3+.12*sin(tt),.07*cos(tt*1.3)),b=vec2(.3+.1*cos(tt*.8),-.06*sin(tt*1.1));
    float f=6.2831853/max(px*4.6,.004);
    float m=cos(length(p-a)*f)+cos(length(p-b)*f);
    return vec3(smoothstep(.7,2.,m));
  }
  if(uScene==12){
    // Mesh: four soft lights on slow Lissajous paths, a gradient mesh written in characters.
    float tt=t*.07,m=0.;
    for(int n=0;n<4;n++){
      float f=float(n)*1.7;
      vec2 c=vec2(.66*sin(tt*(.7+f*.13)+f),.34*cos(tt*(.9-f*.07)+f*1.3));
      float s=.3+.07*sin(tt+f);
      m+=exp(-dot(p-c,p-c)/(s*s))*(.8-float(n)*.1);
    }
    return vec3(smoothstep(.06,1.1,m));
  }
  if(uScene==13){
    // Cascade: streaks fall in three depths. Far ones are frequent, faint, short and slow; near ones rare, long, bright and
    // quick. Each has a bright head and a tail that fades behind it, and a column can carry two streaks at once.
    float tone=0.,cw=uCell.x/uResolution.x,ch=uCell.y/uResolution.y;
    float col=floor(uv.x/cw+.5);
    for(int n=0;n<3;n++){
      float f=float(n);
      for(int k=0;k<2;k++){
        float seed=f*13.1+float(k)*41.7,h=hash(vec2(col,seed));
        if(h<1.-(.5-f*.15))continue;
        float speed=(.045+f*.07)*(.75+.5*hash(vec2(col,seed+2.)));
        float tail=.12+f*.16,y=fract(t*speed+hash(vec2(col,seed+5.)))*(1.+tail*2.)-tail;
        float d=y-uv.y;
        if(d<0.||d>tail)continue;
        float head=d<ch*1.2?1.:0.;
        tone=max(tone,max(head*(.55+f*.22),pow(1.-d/tail,1.7)*(.28+f*.3)));
      }
    }
    return vec3(clamp(tone,0.,1.));
  }
  if(uScene==14){
    // Constellation: points wander in their own cells; neighbours close enough are linked by fine lines. Each point is a
    // bright core in a soft halo, so it reads at card size as well as full width.
    float g=.23,tt=t*.18;
    vec2 q=p/g,id=floor(q);
    vec2 pts[9];
    for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
      vec2 c=id+vec2(i,j);
      float h=hash(c),k=hash(c+3.7);
      pts[(j+1)*3+i+1]=c+.5+.36*vec2(sin(tt*(.6+h)+h*6.28),cos(tt*(.5+k)+k*6.28));
    }
    float line=0.,star=0.,lw=max(px/g,.02);
    for(int n=0;n<9;n++){
      vec2 e=q-pts[n];
      float d2=dot(e,e),tw=.8+.2*sin(tt*3.+float(n)*1.7);
      star=max(star,max(exp(-d2/(lw*lw*1.6)),.38*exp(-d2/(lw*lw*7.)))*tw);
      for(int m=n+1;m<9;m++){
        vec2 a=pts[n],ba=pts[m]-a;
        float len=length(ba);
        if(len>1.35)continue;
        float hh=clamp(dot(q-a,ba)/dot(ba,ba),0.,1.);
        float d=length(q-a-ba*hh);
        line=max(line,(1.-smoothstep(lw*.3,lw*.75,d))*smoothstep(1.35,.6,len)*.72);
      }
    }
    return vec3(clamp(max(line,star),0.,1.));
  }
  return vec3(0.);
}
// The source's brightness to the field's tone: levels, contrast and brightness, gamma, invert.
float transfer(float tone){
  vec2 levels=uLevelsFromMap>.5?texelFetch(uLevelMap,ivec2(0),0).rg:uLevels;
  tone=clamp((tone-levels.x)/max(levels.y-levels.x,.01),0.,1.);
  tone=clamp((tone-.5)*uContrast+.5+uBrightness,0.,1.);
  tone=pow(tone,1./uGamma);
  return uInvert>.5?1.-tone:tone;
}
// Hover scope: 1 where the pointer response may act. The map holds the source's soft subject coverage in alpha.
float hoverScope(vec2 uv){
  if(uScopeMode<.5||uScene!=0)return 1.;
  vec2 s=uv*uSourceMap.xy+uSourceMap.zw;
  vec4 scope=texture(uScope,clamp(s,0.,1.));
  // Red set: a source with no subject to key (measured on the GPU), where every scope acts everywhere.
  if(scope.r>.5)return 1.;
  float c=(s.x<0.||s.y<0.||s.x>1.||s.y>1.)?0.:scope.a;
  return uScopeMode<1.5?c:1.-c;
}
void main(){
  vec2 cell=floor(gl_FragCoord.xy);
  vec2 uv=(cell+.5)*uCell/uResolution;
  float aspect=uResolution.x/uResolution.y;
  float hs=hoverScope(uv);
  vec4 fluid=vec4(0.);
  // lift: signed tone change. The solver's flow brightens one side of each eddy and opens the other into gaps.
  float lift=0.,wake=0.,bend=1.,swirl=0.,speed=0.;
  if(uFluidOn>.5){
    vec4 raw=texture(uFluid,vec2(uv.x,1.-uv.y));
    if(uFluidMode>.5){
      vec2 v=raw.xy*uFluidTexel*vec2(aspect,1.)*hs;
      fluid=vec4(v,0.,1.);
      swirl=clamp(dot(v,vec2(.4,.65))*uGlow*.32,-.65,.65);
      speed=clamp(length(v)*uGlow*.055,0.,.38);
      bend=.4;
    } else {
      fluid=decodeFluid(raw);
      fluid.xyz*=hs;
      wake=clamp(fluid.z*uGlow,0.,1.);
      lift=wake*.55;
    }
  }
  vec2 drift=uDrift*.006*vec2(sin(uv.y*5.3+uTime*.6),cos(uv.x*4.1-uTime*.5));
  vec2 sampleAt=uv-vec2(fluid.x/aspect,-fluid.y)*uRefraction*bend+drift;
  float keep=0.;
  if(uClearMapOn>0.){
    // Text-shaped clear map: quiet right behind the content, and the field leans away from its edges so it flows round them.
    keep=texture(uClearMap,uv).r;
    vec2 t=uClearTexel*1.5;
    vec2 g=vec2(texture(uClearMap,uv+vec2(t.x,0.)).r-texture(uClearMap,uv-vec2(t.x,0.)).r,texture(uClearMap,uv+vec2(0.,t.y)).r-texture(uClearMap,uv-vec2(0.,t.y)).r);
    sampleAt+=g*vec2(1./aspect,1.)*uClearBend;
  }
  float spot=0.;
  if(uHoverMode==4||uHoverMode==5){
    vec2 d=(uv-uLight.xy)*vec2(aspect,1.);
    float q2=dot(d,d)/(uLightRadius*uLightRadius*2.2);
    // Loupe: flat-topped zoom with a soft rim. Reveal: a soft spot in the source's colours.
    if(uHoverMode==4) sampleAt-=(uv-uLight.xy)*exp(-q2*q2)*.45*uLight.z*min(1.,uLightGain*1.6)*hs;
    else spot=exp(-q2*1.6)*uLight.z*min(1.,uLightGain*1.6)*hs;
  }
  vec3 rgb,glow=vec3(0.);
  float sub[15];float subMean=-1.,subLo=0.,subHi=0.;
  if(uScene==0){
    vec2 s=sampleAt*uSourceMap.xy+uSourceMap.zw;
    bool inside=!(s.x<0.||s.y<0.||s.x>1.||s.y>1.);
    rgb=inside?textureLod(uSource,s,uLod).rgb:vec3(0.);
    if(uShapeOn>.5){
      vec2 cu=uCell/uResolution;
      subMean=0.;subLo=1.;subHi=0.;
      for(int j=0;j<5;j++)for(int i=0;i<3;i++){
        vec2 o=(vec2((float(i)+.5)/3.,(float(j)+.5)/5.)-.5)*cu,ss=(sampleAt+o)*uSourceMap.xy+uSourceMap.zw;
        float v=(ss.x<0.||ss.y<0.||ss.x>1.||ss.y>1.)?transfer(0.):transfer(dot(textureLod(uSource,ss,uShapeLod).rgb,vec3(.2126,.7152,.0722)));
        sub[j*3+i]=v;subMean+=v;subLo=min(subLo,v);subHi=max(subHi,v);
      }
      subMean/=15.;
    }
    if(uBackdrop>0.){
      vec2 b=(uv-vec2(fluid.x/aspect,-fluid.y)*uRefraction*bend*.5)*uSourceMap.xy+uSourceMap.zw;
      glow=(b.x<0.||b.y<0.||b.x>1.||b.y>1.)?vec3(0.):textureLod(uSource,b,uLod+3.).rgb*uBackdrop;
    }
  } else rgb=generated(sampleAt,aspect);
  float tone=transfer(dot(rgb,vec3(.2126,.7152,.0722)));
  // Shape sampling takes its tone from its parts, so the character's ink matches the cell's.
  if(subMean>=0.)tone=subMean;
  float flick=0.,trailFold=0.;
  // Reveal: under the spot the characters take the source's own colour and a little more ink.
  if(spot>0.)lift=spot*.22;
  if(uHoverMode==2){
    // Lantern: a soft light and its fading tail lift the characters they pass. Nothing moves the image.
    vec2 ap=vec2(aspect,1.),d=(uv-uLight.xy)*ap;
    float r2=uLightRadius*uLightRadius,glowL=uLight.z*exp(-dot(d,d)/r2);
    for(int i=0;i<12;i++){vec2 e=(uv-uTrail[i].xy)*ap;glowL+=uTrail[i].z*exp(-dot(e,e)/(r2*.55));}
    glowL=min(glowL,1.)*hs;
    float grain=fract(sin(dot(cell,vec2(12.9898,78.233)))*43758.5453);
    lift=glowL*uLightGain*(.7+.6*grain);
    wake=glowL*.4;
    // A few letters at the light's rim step up the ramp and back, as if being retyped.
    flick=uFlicker*step(.9,fract(grain*13.7+floor(uClock*7.+grain*5.)*.37))*glowL*(1.-glowL)*4.;
  }
  if(uHoverMode==3){
    // Trail: the studio's ink field, as a 16-bit density. Sparse marks fill in, dense marks open up.
    vec4 ink=texture(uTrailMap,uv);
    float density=(ink.r*65280.+ink.g*255.)/65535.*uTrailAmount;
    float t=clamp(density/.38,0.,1.);
    trailFold=t*t*(3.-2.*t)*hs;
  }
  if(uFluidMode>.5&&uHoverMode==1){
    // Dark ground: any motion lights the characters. Lit ground: the flow lights one side of each eddy and opens the other.
    // A little cell-to-cell grain keeps the lit area a shimmer of letters rather than a solid block.
    float grain=fract(sin(dot(cell,vec2(12.9898,78.233)))*43758.5453);
    lift=mix(abs(swirl)*.5+speed,swirl+speed*.35,smoothstep(.12,.55,tone))*(.65+.7*grain);
    wake=clamp(lift*1.6,0.,1.);
  }
  // The resting tone, before the pointer's response: a clear zone may quiet the one and keep part of the other.
  float calm=tone;
  tone=clamp(tone+lift,0.,1.);
  tone+=(1.-2.*tone)*trailFold;
  // Pulses: rings sent by the interface (field.pulse()), e.g. on a save or a notification.
  for(int i=0;i<4;i++){
    if(uPulse[i].w<=0.)continue;
    float dist=length((uv-uPulse[i].xy)*vec2(aspect,1.)),front=uPulse[i].z*.95;
    float ring=exp(-pow((dist-front)/.1,2.))*uPulse[i].w*exp(-uPulse[i].z*.85);
    tone=clamp(tone+ring*.85,0.,1.);
  }
  if(uTapOn>0.){
    // A surface tap: a signed lift (16 bits) and a glint, worked out on the CPU over the photo's own medium.
    vec4 tap=texture(uTapMap,uv);
    float lift=(tap.r*65280.+tap.g*255.)/65535.*2.-1.;
    tone=clamp(tone+(lift*1.25+tap.b)*uTapOn,0.,1.);
  }
  tone*=1.-uVignette*smoothstep(.35,1.05,length((uv-.5)*vec2(min(aspect,1.8),1.)*2.));
  if(uClearMapOn>0.)tone*=1.-uClearMapOn*smoothstep(0.,1.,keep);
  if(uClear.z>0.){
    // Clear zone: the field fades out around content so text above it stays readable.
    vec2 half_=uClear.zw*.5*vec2(aspect,1.),q=(uv-uClear.xy-uClear.zw*.5)*vec2(aspect,1.);
    float dz;
    if(uClearShape>.5){vec2 e=abs(q)-half_;dz=length(max(e,0.))+min(max(e.x,e.y),0.);}
    else dz=(length(q/max(half_,vec2(1e-4)))-1.)*min(half_.x,half_.y);
    float keepZone=smoothstep(0.,uClearFeather,dz);
    tone=calm*keepZone+(tone-calm)*mix(keepZone,1.,uClearPointer);
  }
  // Blend: a shade between two characters takes the upper one in the share of cells a 4x4 Bayer pattern gives it.
  float level=tone*(uCount-1.),upper=fract(level)>=.5?1.:0.;
  if(uBlend>.5&&tone>.02&&tone<.98){
    ivec2 q=ivec2(mod(gl_FragCoord.xy,4.));
    upper=fract(level)>(BAYER[q.y*4+q.x]+.5)/16.?1.:0.;
  }
  if(subMean>=0.&&uOrder<.5&&tone>.008){
    // Shape: among the characters near the cell's tone, the one whose ink in each part best matches the cell's parts after the
    // hovers' lift. Each glyph's ink is scaled to its place on the ramp, so shape decides among glyphs and the ramp keeps the tone.
    float n=uCount-1.,d=tone-subMean,best=1e9,c0=floor(tone*n+.5);
    upper=0.;
    level=c0;
    // A cell without an edge in it keeps the character its tone gives: shape only decides where there is shape to follow.
    if(subHi-subLo>=uShapeGate)for(int k=-6;k<=6;k++){
      float g=c0+float(k);
      if(abs(float(k))>uShapeWindow||g<1.||g>n)continue;
      float r=g/n,scale=r/max(texelFetch(uShapes,ivec2(15,int(g)),0).r,.004),e=0.;
      for(int i=0;i<15;i++){float q=clamp(sub[i]+d,0.,1.)-texelFetch(uShapes,ivec2(i,int(g)),0).r*scale;e+=q*q;}
      e=e/15.+uShapeTone*(tone-r)*(tone-r);
      if(e<best){best=e;level=g;}
    }
  }
  float index=min(uCount-1.,floor(level)+upper+(flick>.5&&tone>.02?1.:0.));
  if(uOrder>1.5){
    // Scatter order: each cell keeps one character picked from the charset by a hash of its place, and the tone sets how
    // strongly it shows rather than which character it is, so a field of letters brightens and fades like a lit screen.
    index=tone>.008?1.+min(uCount-2.,floor(hash(cell*.731+vec2(19.17,3.71))*(uCount-1.))):0.;
  } else if(uOrder>.5){
    // Text order: the charset after its blank is read in sequence along each row, each row a few letters on, so words stay
    // legible. Every letter is there; the tone sets how strongly it shows, so the words fade out toward the field's quiet edges.
    float n=max(1.,uCount-1.);
    index=tone>.015?1.+mod(cell.x+cell.y*(floor(n*.38)+1.),n):0.;
    if(uWordCount>.5&&tone>.015){
      // One word a row, repeated with a space between, rows taking the words in turn and each a few letters along.
      int k=int(mod(cell.y,uWordCount));
      vec2 word=uWords[0];
      for(int i=1;i<8;i++)if(i==k)word=uWords[i];
      float at=mod(cell.x+cell.y*3.,word.y+1.);
      index=at<word.y?word.x+at:0.;
    }
  }
  vec3 hue=rgb/max(max(rgb.r,rgb.g),max(rgb.b,.03));
  hue=mix(vec3(dot(hue,vec3(.2126,.7152,.0722))),hue,uSaturation);
  vec3 base=uRampCount>1.5?rampAt(tone):uInk;
  vec3 ink=mix(base*mix(1.,.3+.7*tone,uRampCount>1.5?0.:uShade),clamp(hue*(.38+.62*tone),0.,1.),uSourceColor);
  // Scatter, text and inlay carry the tone in the ink's strength, which the pixel pass reads back as opacity or tile shade.
  if(uOrder>1.5||(uOrder>.5&&uMark==0)||uMark==17)ink=mix(uInk,hue,uSourceColor)*tone;
  vec3 lifted=uHighlightAuto>.5?ink/max(max(ink.r,ink.g),max(ink.b,.06)):uHighlight;
  ink=mix(ink,lifted,wake*.7);
  if(spot>0.)ink=mix(ink,clamp(rgb/max(max(rgb.r,rgb.g),max(rgb.b,.08))*(.45+.55*tone),0.,1.),spot);
  float underAlpha=max(uBackground.a,min(1.,max(glow.r,max(glow.g,glow.b))));
  vec3 under=min(uBackground.rgb*uBackground.a+glow,vec3(underAlpha));
  // Glyphs keep their atlas index, exact in 8 bits; the other marks keep the tone, and empty where the charset is blank.
  outInk=vec4(ink,uMark==0||uMark==17?index/255.:uMark==1?(tone>.003?tone:0.):index>0.?max(tone,1./255.):0.);
  outUnder=vec4(under,underAlpha);
  // Highlights carry most of the light, as a lens blooms: the tone squared, so mid tones glow a little and shadows not at all.
  float lit=outInk.a>0.?tone*tone:0.;
  outGlow=vec4(ink*lit,lit);
}`)(e),a=Hl(n);if(!a)return t;let o=(c,i,u,f=!1)=>{let h=c.indexOf(i);if(h<0||c.indexOf(i,h+1)>=0)throw new Error(`The cell pass lost its effect anchor: ${i}`);return f?c.slice(0,h)+u+c.slice(h):c.slice(0,h+i.length)+u+c.slice(h+i.length)},l=o(t,"void main(){",`${a.declarations}
`,!0);return l=o(l,"float aspect=uResolution.x/uResolution.y;",`
  vec2 pointer=uFxPointer.xy;float pointerOn=uFxPointer.z,motion=uFxPointer.w,time=uFxTime;
  vec3 fxInk=vec3(0.);float fxInkAmount=0.,fxGlyph=0.;`),l=o(l,`+drift;
`,`${a.displace}
`),l=o(l,"  tone*=1.-uVignette*",`${a.shade}
  tone=clamp(tone,0.,1.);
`,!0),l=o(l,"+(flick>.5&&tone>.02?1.:0.));",`
  if(tone>.008)index=clamp(index+floor(fxGlyph+.5),tone>.008?1.:0.,uCount-1.);`),l=o(l,"ink=mix(ink,lifted,wake*.7);",`
  ink=mix(ink,clamp(fxInk,0.,1.),clamp(fxInkAmount,0.,1.));`),l},Vl=`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uAtlas, uCells, uUnder;
uniform vec2 uResolution, uCell, uPitch;
uniform float uColumns, uDotScale, uSourceColor;
uniform vec2 uDir;
uniform int uMark;
// Inlay accents: share of tiles, letter shuffle span, a seed that steps a few times a second, charset length.
uniform vec4 uInlay;
// Line marks: pitch in cell heights, weight, the share of cells that sparkle.
uniform vec4 uLine;
uniform vec4 uFade;
// Finishing passes: bloom amount and radius in cells, scanlines, grain; chromatic split, curvature, time, rows per scanline pair.
uniform vec4 uPost, uPost2;
uniform sampler2D uGlow;
out vec4 outColor;
const float BAYER[16]=float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
uniform vec3 uRamp[6];
uniform float uRampCount;
// The gradient map: the tone run through the ramp's stops, evenly spaced, faintest first.
vec3 rampAt(float t){
  float x=clamp(t,0.,1.)*(uRampCount-1.);
  int i=int(min(floor(x),uRampCount-2.));
  vec3 a=uRamp[0],b=uRamp[1];
  for(int k=1;k<5;k++)if(k==i){a=uRamp[k];b=uRamp[k+1];}
  return mix(a,b,clamp(x-float(i),0.,1.));
}
// The Studio's print defaults: roughness .35, seed 7, registration .2 and its coral second ink. The screen angle is uDir (-35deg).
const float ROUGH=.35,SEED=7.;
const vec3 SECOND=vec3(.925,.404,.322);
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
// Coverage of a signed distance given in device pixels.
float cover(float d){return clamp(.5-d,0.,1.);}
float box(vec2 p,vec2 lo,vec2 hi){vec2 a=clamp(p-lo,0.,1.)*clamp(hi-p,0.,1.);return a.x*a.y;}
float disc(vec2 p,vec2 c,float r){return r>.05?cover(length(p-c)-r):0.;}
float ellipse(vec2 p,vec2 c,vec2 r,float a){vec2 d=p-c;d=vec2(cos(a)*d.x+sin(a)*d.y,-sin(a)*d.x+cos(a)*d.y);float k=length(d/r);return cover((k-1.)*min(r.x,r.y));}
// World-anchored parallel cuts across direction d: period and width in cell heights, so lines run on from cell to cell.
float cuts(vec2 w,vec2 d,float period,float width,float px){
  if(width<=0.)return 0.;
  float proj=dot(vec2(-d.y,d.x),w);
  return cover((abs(fract(proj/period+.5)-.5)*period-width*.5)*px);
}
// Lays an ink over what is already down, multiplying where they overlap, as transparent inks do on paper.
void lay(inout vec3 rgb,inout float a,vec3 c,float k){
  float next=a+k*(1.-a);
  rgb=next>0.?(rgb*a*(1.-k)+mix(c,rgb*c,a)*k)/next:c;
  a=next;
}
vec4 drawAt(vec2 frag){
  vec2 DIR=uDir;
  // The pitch is the atlas cell, or a fractional one under cellFit 'fill', where each glyph sits centred in its stretched cell.
  vec2 cell=floor(frag/uPitch);
  vec4 ink=texelFetch(uCells,ivec2(cell),0),under=texelFetch(uUnder,ivec2(cell),0);
  vec2 local=frag-cell*uPitch;
  float coverage;
  vec3 rgb=ink.rgb;
  // Scatter and inlay: the cell's strength, read back from its ink, and the ink itself at full strength.
  float strength=1.;
  if(uFade.w>.5){
    float top=max(rgb.r,max(rgb.g,rgb.b));
    strength=uSourceColor>.5?top:clamp(top/max(max(uFade.r,max(uFade.g,uFade.b)),.004),0.,1.);
    rgb=uSourceColor>.5?rgb/max(top,.004):uFade.rgb;
  }
  if(uMark==0||uMark==17){
    float index=floor(ink.a*255.+.5);
    // Inlay shuffle: every tiled cell takes a letter from the upper charset, traded for a neighbour a few times a second, so a
    // tiled body flickers through its letters rather than banding by tone; the tile's shade still carries the tone.
    float hs=hash(cell*.917+uInlay.z*1.37);
    if(uMark==17&&uInlay.y>0.&&index>0.&&(index>=uInlay.w*.62||strength>=.2))index=clamp(max(index,ceil(uInlay.w*.62)+1.)+floor((hs-.5)*(2.*uInlay.y+1.)),ceil(uInlay.w*.62),uInlay.w-1.);
    ivec2 tile=ivec2(int(mod(index,uColumns)),int(floor(index/uColumns)));
    vec2 texel=floor(local-floor((uPitch-uCell)*.5));
    coverage=all(greaterThanEqual(texel,vec2(0.)))&&all(lessThan(texel,uCell))?texelFetch(uAtlas,tile*ivec2(uCell)+ivec2(texel),0).a:0.;
    if(uMark==17){
      // Inlay: a gapped tile in the ink, lighter the denser the cell, with its character set into it in a darker shade. Faint
      // cells keep only the character, so a shape's edge frays into specks; empty cells show a hairline grid.
      vec2 p=local+.5;
      float gap=max(1.,floor(min(uPitch.x,uPitch.y)*.08+.5));
      float plate=index>0.?smoothstep(.2,.32,strength)*box(p,vec2(0.),uPitch-gap):0.;
      // Tile and letter are the ink at two strengths over whatever ground lies below, so the inlay reads on light and dark pages:
      // the tile strengthens with the tone and the letter is cut back toward the ground.
      float face=(.18+.8*smoothstep(.05,.8,strength))*plate;
      // With shuffle on, tiles also vary a little in shade, as worn inlay does.
      if(uInlay.y>0.)face*=.8+.34*hs;
      float speck=coverage*min(1.,strength*6.)*(1.-plate);
      float grid=index>0.?0.:(1.-box(p,vec2(0.),uPitch-1.))*.035;
      float a=mix(face,face*.22,coverage*plate)+speck;
      // Accents: a few lit tiles carry a coloured letter, a tinted tile or a white glint, picked afresh with the seed.
      float ha=hash(cell*1.31+uInlay.z*.71+vec2(7.3,1.9));
      if(plate>0.&&ha<uInlay.x){
        float pick=hash(cell+uInlay.z*2.11+vec2(3.1,8.7));
        vec3 hue=pick<.16?vec3(.86,.27,.27):pick<.3?vec3(.92,.55,.2):pick<.42?vec3(.9,.78,.25):pick<.58?vec3(.35,.72,.38):pick<.72?vec3(.3,.72,.8):pick<.84?vec3(.32,.42,.92):vec3(.66,.42,.86);
        float kind=ha/uInlay.x;
        if(kind<.55){float k=coverage*plate;rgb=mix(rgb,hue,k);a=mix(a,1.,k);}
        else if(kind<.88){rgb=mix(rgb,hue,.55);}
        else{float k=coverage*plate;rgb=mix(rgb,vec3(1.),1.-k);a=mix(max(a,.96),face*.3,k);}
      }
      coverage=a>0.?a:grid;
    } else coverage*=strength;
  } else if(uMark==1){
    // Halftone: dot area follows tone, so midtones read true; edges are antialiased to one device pixel.
    float r=sqrt(ink.a)*min(uPitch.x,uPitch.y)*.5*uDotScale;
    coverage=ink.a>.003?clamp(r-length(local-uPitch*.5)+.5,0.,1.):0.;
  } else if(ink.a<=0.){
    coverage=0.;
  } else {
    float tone=ink.a,side=min(uPitch.x,uPitch.y);
    vec2 q=local/uPitch,c=uPitch*.5,p=local+.5;
    // Tiles fade with the tone in one ink, as the Studio's do; in source colour the colour already carries it.
    float fade=uSourceColor>.5?1.:tone,gap=max(.5,uPitch.x*.06),grain=hash(cell+SEED);
    vec2 w=(cell+q)*uPitch/uPitch.y;
    if(uMark==2)coverage=fade;
    else if(uMark==3)coverage=box(p,vec2(0.),uPitch-gap)*fade;
    else if(uMark==4){
      // Lego: a gapped brick, lit from above, with a raised stud ringed by its shadow.
      coverage=box(p,vec2(0.),uPitch-gap)*fade;
      rgb*=1.06-.14*q.y;
      float r=side*.28,d=length(local-c)-r,lit=clamp(dot(c-local,vec2(.6,.8))/r,-1.,1.);
      rgb=mix(rgb,mix(rgb,vec3(1.),.2+.12*lit),cover(d));
      rgb=mix(rgb,rgb*.72,cover(abs(d)-max(.5,side*.04)));
    } else if(uMark==5){
      // Voxel: an isometric cube; top, left and right faces at full, .72 and .42 strength.
      float h=.5*abs(q.x-.5);
      coverage=cover(-min(q.y-h,1.-h-q.y)*uPitch.y)*cover(-min(q.x,1.-q.x)*uPitch.x);
      coverage*=mix(q.x<.5?.72:.42,1.,cover((q.y-(.5-h))*uPitch.y))*fade;
    } else if(uMark==6){
      // Disco: a gapped mirror tile, its upper facet catching light and its lower in shade.
      coverage=box(p,vec2(0.),uPitch-gap)*fade;
      rgb=q.y<.35?mix(rgb,vec3(1.),.1+grain*.25):q.y>.65?rgb*.75:rgb;
    } else if(uMark==18){
      // Tick: a printed glow. A smooth wash carries the light; over it every cell holds one short upright tick whose strength
      // steps through four levels by a 4x4 ordered threshold, so the mid tones read as a crisp dither of ticks that brightens
      // toward the light and melts into the wash at its core. With a ramp the wash runs through it and the ticks sit a step up.
      ivec2 b=ivec2(mod(cell,4.));
      float th=(BAYER[b.y*4+b.x]+.5)/16.;
      float tw=max(1.,floor(uPitch.x*.28+.5)),tl=max(2.,floor(uPitch.y*.46+.5));
      vec2 lo=floor(c-vec2(tw,tl)*.5);
      float bar=box(p,lo,lo+vec2(tw,tl));
      float lvl=clamp(floor(tone*4.+th)/4.,0.,1.);
      float melt=1.-smoothstep(.7,.96,tone);
      float at=bar*melt*(.42+.58*lvl);
      bool ramped=uRampCount>1.5&&uSourceColor<.5;
      float aw=ramped?pow(smoothstep(.08,.88,tone),1.4):tone*tone*.92;
      vec3 W=ramped?rampAt(tone):rgb,T=ramped?rampAt(min(1.,lvl+.38)):rgb;
      float a=at+aw*(1.-at);
      rgb=a>0.?(T*at+W*aw*(1.-at))/a:W;
      coverage=a;
    } else if(uMark==19){
      // Bayer: one gapped square a cell, on or off by a 4x4 ordered threshold at two strengths, so a picture steps through
      // empty, half and full squares in the brand's tones, as pixel-dithered art does.
      ivec2 b=ivec2(mod(cell,4.));
      float th=(BAYER[b.y*4+b.x]+.5)/16.,g=max(1.,floor(min(uPitch.x,uPitch.y)*(1.-uDotScale)+.5));
      float lvl=tone>.5+th*.5?1.:tone>th*.5?.5:0.;
      // An empty cell keeps a small faint square, so the ground reads as a dot grid that the picture fills.
      vec2 d=floor(c-max(1.,floor(min(uPitch.x,uPitch.y)*.3))*.5);
      coverage=lvl>0.?box(p,vec2(0.),uPitch-g)*lvl:box(p,d,d+max(1.,floor(min(uPitch.x,uPitch.y)*.3)))*.35;
    } else if(uMark==7){
      // Dither: an ordered 4x4 Bayer screen at about five dots a cell, lit where the cell's tone passes the threshold.
      ivec2 b=ivec2(mod(floor(frag/max(1.,floor(side/5.))),4.));
      coverage=tone>(BAYER[b.y*4+b.x]+.5)/16.?1.:0.;
    } else if(uMark==8){
      // Hex: a flat-topped hexagon filling the cell.
      vec2 h=abs((local-c)/(uPitch*.49));
      coverage=cover(max(h.y-.866,h.x*.866+h.y*.5-.866)*side*.49)*fade;
    } else if(uMark==9){
      // LED: a round lamp with a soft halo and a specular glint, separated by an unlit matrix.
      float r=side*.39,d=length(local-c);
      coverage=max(cover(d-r),.3*exp(-pow(max(0.,d-r)/(side*.12),2.)))*fade;
      rgb=mix(rgb,vec3(1.),.35*disc(local,uPitch*vec2(.43,.4),side*.11));
    } else if(uMark==10){
      // CMYK: the cell's hue separated into offset cyan, magenta and yellow dots, each sized by its share of the tone. The
      // key screen carries the neutral share in the ink's own lightness, since a light ink on a dark page has no black.
      float top=max(rgb.r,max(rgb.g,rgb.b)),low=min(rgb.r,min(rgb.g,rgb.b));
      vec3 cmy=(top-rgb)/max(top,.001);
      float a=0.;vec3 col=vec3(1.);
      lay(col,a,vec3(top),disc(local,c,side*.48*sqrt(tone*low/max(top,.001))));
      lay(col,a,vec3(0.,1.,1.),disc(local,uPitch*vec2(.36,.36),side*.48*sqrt(tone*cmy.x)));
      lay(col,a,vec3(1.,0.,1.),disc(local,uPitch*vec2(.64,.36),side*.48*sqrt(tone*cmy.y)));
      lay(col,a,vec3(1.,1.,0.),disc(local,uPitch*vec2(.5,.66),side*.48*sqrt(tone*cmy.z)));
      rgb=col;coverage=a;
    } else if(uMark==11||uMark==16){
      // Stipple and pointillism: four jittered marks a cell, their size following the tone.
      coverage=0.;vec3 col=rgb;
      for(int m=0;m<4;m++){
        vec2 o=vec2(float(m%2),float(m/2));
        float j=hash(cell*2.+o+SEED),jy=hash(cell+o*11.+SEED+1.);
        vec2 at=((o+.5)/2.+(vec2(j,jy)-.5)*ROUGH*.28)*uPitch;
        float r=min(min(min(at.x,uPitch.x-at.x),min(at.y,uPitch.y-at.y)),side*min(.245,.21*sqrt(tone)*(1.-ROUGH*j*.35)));
        float k=uMark==11?disc(local,at,r):ellipse(local,at,vec2(r,r*.64),j*3.14159);
        if(uMark==16&&k>coverage)col=uSourceColor>.5?clamp(rgb+(j-.5)*ROUGH*.25*vec3(1.,-.4,-1.),0.,1.):rgb*(1.+(j-.5)*ROUGH*.5);
        coverage=max(coverage,k);
      }
      rgb=col;
    } else if(uMark==12||uMark==13){
      // Engraving and crosshatch: parallel cuts whose weight follows the tone; crossings join only in the darker tones.
      float cv=tone*(1.-ROUGH*grain*.3),px=uPitch.y,P=uLine.x,W=uLine.y*.72*P;
      coverage=cuts(w,DIR,P,min(.94*P,W*cv),px);
      if(uMark==13){
        coverage=max(coverage,cuts(w,vec2(-DIR.y,DIR.x),P,min(.94*P,W*max(0.,cv*1.5-.3)),px)*step(.2,cv));
        coverage=max(coverage,cuts(w,normalize(DIR+vec2(-DIR.y,DIR.x)),P,min(.94*P,W*max(0.,cv*2.-1.2)),px)*step(.6,cv));
      }
      // Sparkle: now and then a lit cell catches a small bright square, picked afresh a few times a second.
      if(uLine.z>0.&&tone>.2&&hash(cell*1.7+uInlay.z*.53)<uLine.z){float sq=max(1.,floor(side*.3+.5));vec2 lo=floor(c-sq*.5);float k=box(p,lo,lo+sq);coverage=max(coverage,k);rgb=mix(rgb,vec3(1.),k*.6);}
    } else if(uMark==14){
      // Woodblock: broad carved bands in five stepped weights, their edges wavering along the grain.
      float cv=ceil(tone*(1.-ROUGH*grain*.3)*5.)/5.,width=min(.94,.72*cv);
      float proj=dot(vec2(-DIR.y,DIR.x),w),line=floor(proj+.5),along=dot(DIR,w);
      float cut=sin(along*5.3+line*1.9+SEED)*.5+sin(along*13.1+line)*.25;
      coverage=cover((abs(proj-line)-width*.5*(1.+ROUGH*cut*.5))*uPitch.y);
    } else if(uMark==15){
      // Risograph: two offset screens, the main ink and the coral second ink, misregistered along the screen angle.
      float split=uSourceColor>.5?clamp(.5+(rgb.r-rgb.b)*.5,0.,1.):.5,r=side*min(.48,.44*sqrt(tone));
      float a=0.;vec3 col=rgb;
      lay(col,a,rgb,disc(local,c,r*sqrt(.35+(1.-split)*.65)));
      lay(col,a,SECOND,disc(local,c+DIR*.2*.38*side,r*sqrt(.3+split*.7)*(1.-ROUGH*hash(cell+SEED+13.)*.3)));
      rgb=col;coverage=a;
    } else coverage=0.;
  }
  return vec4(rgb*coverage+under.rgb*(1.-coverage),coverage+under.a*(1.-coverage));
}
void main(){
  vec2 frag=vec2(gl_FragCoord.x,uResolution.y-gl_FragCoord.y);
  if(uPost2.y>0.){
    // Curvature: the picture bows outward as on a tube, normalised so its corners stay near the frame; outside it is empty.
    vec2 q=frag/uResolution-.5;
    float k=uPost2.y*.5;
    q=q*(1.+k*dot(q,q)*vec2(1.,1.))/(1.+k*.5);
    frag=(q+.5)*uResolution;
    if(frag.x<0.||frag.y<0.||frag.x>=uResolution.x||frag.y>=uResolution.y){outColor=vec4(0.);return;}
  }
  vec4 c=drawAt(frag);
  if(uPost2.x>0.){
    // Chromatic split: red and blue drawn a little apart, more toward the edges.
    vec2 q=frag/uResolution-.5,d=q*dot(q,q)*uPost2.x*uResolution.y*.08+normalize(q+1e-5)*uPost2.x*1.5;
    vec4 r=drawAt(clamp(frag+d,vec2(0.),uResolution-1.)),b=drawAt(clamp(frag-d,vec2(0.),uResolution-1.));
    c=vec4(r.r,c.g,b.b,max(c.a,max(r.a,b.a)));
  }
  if(uPost.x>0.){
    // Bloom: the cells' light, blurred through its mip chain at two radii, laid over in screen-like fashion.
    vec2 uv=frag/uPitch/vec2(textureSize(uGlow,0));
    float l=log2(max(uPost.y,.5));
    vec3 g=textureLod(uGlow,uv,l).rgb*.55+textureLod(uGlow,uv,l+1.5).rgb*.45;
    vec3 add=g*uPost.x;
    c.rgb=c.rgb+add*(1.-c.rgb*.5);
    c.a=max(c.a,min(1.,max(add.r,max(add.g,add.b))));
  }
  if(uPost.z>0.){
    // Scanlines: two thin dark bands a text row, as on a tube.
    float s=.5-.5*cos(frag.y*6.2831853*uPost2.w/uPitch.y);
    c.rgb*=1.-uPost.z*.45*s;
  }
  if(uPost.w>0.){
    // Film grain, new each frame, in the drawn light only so a transparent ground stays clear.
    float n=hash(floor(frag)+fract(uPost2.z*7.13)*vec2(91.7,37.3))-.5;
    c.rgb=clamp(c.rgb+n*uPost.w*.22*c.a,0.,1.);
  }
  outColor=c;
}`,mi=new Map;function so(e,n=!1){let t=`${e}${n?"p":""}`,a=mi.get(t);return a||(a=Vl.replace("uniform int uMark;",`const int uMark=${e};`),n||(a=a.replace("uniform vec4 uPost, uPost2;","const vec4 uPost=vec4(0.), uPost2=vec4(0.,0.,0.,2.);")),mi.set(t,a)),a}var fn=`#version 300 es
precision highp float;
precision highp sampler2D;
uniform vec2 uTexel;
out vec4 outColor;
vec2 here(){return gl_FragCoord.xy*uTexel;}
`,jl=fn+`
uniform sampler2D uVelocity;
uniform vec2 uFrom, uTo, uForce;
uniform float uAspect, uRadius;
float segment(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-8),0.,1.);return length(pa-ba*h);}
void main(){
  vec2 uv=here(),scale=vec2(uAspect,1.);
  float d=segment(uv*scale,uFrom*scale,uTo*scale);
  outColor=vec4(texture(uVelocity,uv).xy+uForce*exp(-d*d/(uRadius*uRadius)),0.,1.);
}`,$l=fn+`
uniform sampler2D uVelocity;
void main(){
  vec2 uv=here();
  float l=texture(uVelocity,uv-vec2(uTexel.x,0.)).y,r=texture(uVelocity,uv+vec2(uTexel.x,0.)).y;
  float t=texture(uVelocity,uv+vec2(0.,uTexel.y)).x,b=texture(uVelocity,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4(.5*(r-l-t+b),0.,0.,1.);
}`,Yl=fn+`
uniform sampler2D uVelocity, uCurl;
uniform float uStrength, uDt;
void main(){
  vec2 uv=here();
  float l=texture(uCurl,uv-vec2(uTexel.x,0.)).x,r=texture(uCurl,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uCurl,uv+vec2(0.,uTexel.y)).x,b=texture(uCurl,uv-vec2(0.,uTexel.y)).x,c=texture(uCurl,uv).x;
  vec2 force=.5*vec2(abs(t)-abs(b),abs(r)-abs(l));
  force=force/(length(force)+1e-4)*uStrength*c;
  force.y=-force.y;
  outColor=vec4(clamp(texture(uVelocity,uv).xy+force*uDt,-1000.,1000.),0.,1.);
}`,Kl=fn+`
uniform sampler2D uVelocity;
void main(){
  vec2 uv=here(),c=texture(uVelocity,uv).xy;
  float l=texture(uVelocity,uv-vec2(uTexel.x,0.)).x,r=texture(uVelocity,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uVelocity,uv+vec2(0.,uTexel.y)).y,b=texture(uVelocity,uv-vec2(0.,uTexel.y)).y;
  if(uv.x-uTexel.x<0.)l=-c.x;
  if(uv.x+uTexel.x>1.)r=-c.x;
  if(uv.y+uTexel.y>1.)t=-c.y;
  if(uv.y-uTexel.y<0.)b=-c.y;
  outColor=vec4(.5*(r-l+t-b),0.,0.,1.);
}`,Ql=fn+`
uniform sampler2D uSource;
uniform float uAmount;
void main(){outColor=vec4(texture(uSource,here()).x*uAmount,0.,0.,1.);}`,Jl=fn+`
uniform sampler2D uPressure, uDivergence;
void main(){
  vec2 uv=here();
  float l=texture(uPressure,uv-vec2(uTexel.x,0.)).x,r=texture(uPressure,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uPressure,uv+vec2(0.,uTexel.y)).x,b=texture(uPressure,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4((l+r+b+t-texture(uDivergence,uv).x)*.25,0.,0.,1.);
}`,Zl=fn+`
uniform sampler2D uPressure, uVelocity;
void main(){
  vec2 uv=here();
  float l=texture(uPressure,uv-vec2(uTexel.x,0.)).x,r=texture(uPressure,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uPressure,uv+vec2(0.,uTexel.y)).x,b=texture(uPressure,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4(texture(uVelocity,uv).xy-vec2(r-l,t-b),0.,1.);
}`,es=fn+`
uniform sampler2D uVelocity;
uniform float uDt, uDissipation;
void main(){
  vec2 uv=here();
  vec2 back=uv-uDt*texture(uVelocity,uv).xy*uTexel;
  outColor=vec4(texture(uVelocity,back).xy/(1.+uDissipation*uDt),0.,1.);
}`;function Ja(e,n,t){let a=0;for(;Math.max(e>>a,n>>a)>t&&e>>a+1>=1&&n>>a+1>=1;)a++;return{level:a,width:Math.max(1,e>>a),height:Math.max(1,n>>a)}}var Bi=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uSource;
uniform int uLevel;
float lum(vec3 c){ return dot(c,vec3(.2126,.7152,.0722)); }
`,ts=`${Bi}
uniform ivec2 uSize;
out vec4 o;
void main(){
  int ring=max(1,int(floor(float(min(uSize.x,uSize.y))*.03+.5)));
  float clear=0.,sum=0.,square=0.,count=0.;
  for(int y=0;y<128;y++){
    if(y>=uSize.y)break;
    for(int x=0;x<128;x++){
      if(x>=uSize.x)break;
      vec4 c=texelFetch(uSource,ivec2(x,y),uLevel);
      if(c.a*255.<249.5)clear+=1.;
      if(x>=ring&&y>=ring&&x<uSize.x-ring&&y<uSize.y-ring)continue;
      float l=lum(c.rgb);sum+=l;square+=l*l;count+=1.;
    }
  }
  float ground=sum/max(1.,count);
  o=vec4(clear/float(uSize.x*uSize.y),ground,sqrt(max(0.,square/max(1.,count)-ground*ground)),1.);
}`,ns=`${Bi}
uniform sampler2D uStats;
out vec4 o;
void main(){
  vec4 stats=texelFetch(uStats,ivec2(0),0);
  vec4 c=texelFetch(uSource,ivec2(gl_FragCoord.xy),uLevel);
  if(stats.x>.01){o=vec4(0.,0.,0.,c.a);return;}
  if(stats.z>=.07){o=vec4(1.,0.,0.,1.);return;}
  float t=clamp((abs(lum(c.rgb)-stats.y)-.035)/.12,0.,1.);
  o=vec4(0.,0.,0.,t*t*(3.-2.*t));
}`,Za=new WeakMap,Nn=new Set,pi=new Set,cn=0,co=0,gi=null,ra=120,Oi=new Float64Array(ra),Gn=0,Ni=(e=Gn)=>{let n=Math.min(e,Gn),t=new Array(n);for(let a=0;a<n;a++)t[a]=Oi[(xr-n+a)%ra];return t},Bn=0,xr=0,vr=1,Hr=0,vi=0;function rs(e){cn=0,Bn&&e>Bn&&(Oi[xr%ra]=e-Bn,xr++,Gn<ra&&Gn++),Bn=e,co=performance.now();let n=Nn;Nn=pi,pi=n;for(let a of n)try{a(e)}catch(o){typeof console<"u"&&console.error(o)}n.clear(),jt?.endFrame(e);let t=performance.now()-co;if(Hr=.9*Hr+.1*t,e-vi>500){vi=e;let a=Gi(),o=!!jt?.overloaded;(Hr>.5*a||o)&&vr<3?vr++:Hr<.2*a&&!o&&vr>1&&vr--}Nn.size||(Bn=0)}var uo=()=>vr;function $t(e){Nn.add(e),cn&&gi!==requestAnimationFrame&&(cn=0),cn||(gi=requestAnimationFrame,cn=requestAnimationFrame(rs))}function Yt(e){Nn.delete(e),!Nn.size&&cn&&(cancelAnimationFrame(cn),cn=0,Bn=0)}var xi=1e3/60,yi=-1/0;function Gi(){if(Gn<20)return 1e3/60;if(xr-yi<15)return xi;yi=xr;let e=Ni().sort((n,t)=>n-t);return xi=Math.min(1e3/60,Math.max(1e3/360,e[Math.floor(.2*e.length)]))}var yr=new Set,ho=new Set,fo=new Set,mo=new Set,po=new Set,eo=!1,Mi=null,Wr=null,Vr=null,ur=null,bi=e=>{let n=null;for(let t of yr){if(t.target===window){(!t.near||t.near()||t.inside)&&t.move(e);continue}n??(n=e.composedPath()),n.includes(t.target)?(t.inside=!0,t.move(e)):t.inside&&(t.inside=!1,t.leave())}},as=()=>{for(let e of yr)e.inside=!1,e.leave()},os=()=>{for(let e of[...ho])e()},is=()=>{for(let e of[...fo])e()},wi=()=>{for(let e of[...mo])e()},ls=e=>{for(let n of[...po])n(e)};function Ei(){let e=yr.size+ho.size+fo.size+mo.size+po.size>0;if(typeof document>"u"||(Mi!==document&&(eo=!1,Mi=document,Wr=Vr=null,ur=null),e===eo))return;eo=e;let n=e?"addEventListener":"removeEventListener";if(typeof window<"u"&&(window[n]?.("pointermove",bi,{capture:!0,passive:!0}),window[n]?.("pointerdown",bi,{capture:!0,passive:!0})),document[n]?.("pointerleave",as),document[n]?.("visibilitychange",os),(typeof document>"u"?void 0:document.fonts)?.[n]?.("loadingdone",ls),Wr??(Wr=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null),Vr??(Vr=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):null),Wr?.[n]?.("change",is),Vr?.[n]?.("change",wi),e){ur??(ur=typeof MutationObserver=="function"?new MutationObserver(wi):null);for(let t of[document.documentElement,document.body])t&&ur?.observe(t,{attributes:!0,attributeFilter:["class","data-theme","data-mode","style"]})}else ur?.disconnect()}var Xn=(e,n)=>(e.add(n),Ei(),()=>{e.delete(n)&&Ei()});function go(e){let n=e.target;if(typeof window>"u"||n===window||typeof document>"u")return Xn(yr,e);let t=n,a=t.getRootNode?.();if(t.ownerDocument===document&&(!a||a===document))return Xn(yr,e);let o=e.move,l=()=>e.leave();return t.addEventListener("pointermove",o,{passive:!0}),t.addEventListener("pointerdown",o,{passive:!0}),t.addEventListener("pointerleave",l),()=>{t.removeEventListener("pointermove",o),t.removeEventListener("pointerdown",o),t.removeEventListener("pointerleave",l)}}var oa=e=>Xn(ho,e),ia=e=>Xn(fo,e),br=e=>Xn(mo,e),hr=new Map,Un=null,to=new Map,Xi=e=>n=>{for(let t of n)for(let a of[...e.get(t.target)??[]])a(t)},qi=(e,n,t)=>{let a=e.get(n);return a?(a.add(t),!1):(e.set(n,new Set([t])),!0)},zi=(e,n,t)=>{let a=e.get(n);return!(!a?.delete(t)||a.size)&&(e.delete(n),!0)};function ta(e,n){return typeof ResizeObserver!="function"?()=>{}:(Un??(Un=new ResizeObserver(Xi(hr))),qi(hr,e,n)?Un.observe(e):queueMicrotask(()=>{hr.get(e)?.has(n)&&n({target:e})}),()=>{zi(hr,e,n)&&Un?.unobserve(e),hr.size||(Un?.disconnect(),Un=null)})}function Hi(e,n,t){if(typeof IntersectionObserver!="function")return()=>{};let a=to.get(n);if(!a){let c=new Map;a={observer:new IntersectionObserver(Xi(c),{rootMargin:n}),watch:c},to.set(n,a)}let{observer:o,watch:l}=a;return qi(l,e,t)||o.unobserve(e),o.observe(e),()=>{zi(l,e,t)&&o.unobserve(e),l.size||(o.disconnect(),to.delete(n))}}var Ti=new WeakMap;function Wi(e){let n=Ti.get(e);if(n)return n;let t={activeTexture:e.activeTexture.bind(e),bindTexture:e.bindTexture.bind(e),deleteTexture:e.deleteTexture.bind(e),useProgram:e.useProgram.bind(e),deleteProgram:e.deleteProgram.bind(e),bindFramebuffer:e.bindFramebuffer.bind(e),deleteFramebuffer:e.deleteFramebuffer.bind(e),viewport:e.viewport.bind(e),pixelStorei:e.pixelStorei.bind(e)},a=e.TEXTURE0,o=e.TEXTURE_2D,l=e.FRAMEBUFFER,c=[],i,u,f=-1,h="",M=new Map,b=()=>{c.length=0,f=-1,i=void 0,u=void 0,h="",M.clear()},v=e;return v.activeTexture=d=>{let g=d-a;g!==f&&(f=g,t.activeTexture(d))},v.bindTexture=(d,g)=>{if(d===o&&f>=0){if(c[f]===g)return;c[f]=g}else d===o&&(c.length=0);t.bindTexture(d,g)},v.deleteTexture=d=>{for(let g=0;g<c.length;g++)c[g]===d&&(c[g]=void 0);t.deleteTexture(d)},v.useProgram=d=>{d!==i&&(i=d,t.useProgram(d))},v.deleteProgram=d=>{d===i&&(i=void 0),t.deleteProgram(d)},v.bindFramebuffer=(d,g)=>{if(d===l){if(g===u)return;u=g}else u=void 0;t.bindFramebuffer(d,g)},v.deleteFramebuffer=d=>{d===u&&(u=void 0),t.deleteFramebuffer(d)},v.pixelStorei=(d,g)=>{M.get(d)!==g&&(M.set(d,g),t.pixelStorei(d,g))},v.viewport=(d,g,I,r)=>{let O=`${d},${g},${I},${r}`;O!==h&&(h=O,t.viewport(d,g,I,r))},Ti.set(e,b),b}var ss=268435456,jr=[1,.85,.7,.58,.5],Vi=class{constructor(e,n){this.gl=e,this.onChange=n,this.level=0,this.overloaded=!1,this.queries=[],this.open=null,this.drew=!1,this.gpuMs=[],this.cpuMs=[],this.changedAt=0,this.checkedAt=-1/0,this.frameNo=0,this.timer=e.getExtension("EXT_disjoint_timer_query_webgl2")}begin(){if(!this.drew&&(this.drew=!0,this.timer&&!this.open&&this.queries.length<4&&!(7&this.frameNo++))){let e=this.gl.createQuery();e&&(this.gl.beginQuery(this.timer.TIME_ELAPSED_EXT,e),this.open=e)}}end(e,n){let t=this.gl,a=this.timer;if(this.drew&&(this.cpuMs.push(n),this.cpuMs.length>60&&this.cpuMs.shift(),a&&this.open&&(t.endQuery(a.TIME_ELAPSED_EXT),this.queries.push({query:this.open,frame:e}),this.open=null)),this.drew=!1,a&&this.queries.length&&t.getQueryParameter(this.queries[0].query,t.QUERY_RESULT_AVAILABLE)){let o=t.getParameter(a.GPU_DISJOINT_EXT);for(;this.queries.length&&t.getQueryParameter(this.queries[0].query,t.QUERY_RESULT_AVAILABLE);){let{query:l}=this.queries.shift();o||(this.gpuMs.push(t.getQueryParameter(l,t.QUERY_RESULT)/1e6),this.gpuMs.length>60&&this.gpuMs.shift()),t.deleteQuery(l)}}this.adapt(e)}skip(){this.drew=!1}reset(){this.queries=[],this.open=null,this.gpuMs=[],this.cpuMs=[]}adapt(e){if(e-this.checkedAt<250)return;this.checkedAt=e;let n=Gi(),t=this.gpuMs.length>=5&&Math.min(...this.gpuMs.slice(-5))>1.5*n,a=this.gpuMs.length>=10||t?this.gpuMs:null,o;if(a)o=a.slice().sort((c,i)=>c-i)[Math.floor(.75*a.length)]/n;else{if(Gn<30||this.cpuMs.length<10)return;let c=Ni(30).sort((u,f)=>u-f),i=this.cpuMs.slice().sort((u,f)=>u-f)[this.cpuMs.length>>1];o=c[Math.floor(.75*c.length)]/n>1.6&&i<.5*n?1:.5}if(this.overloaded=o>.8&&this.atMinimum,e-this.changedAt<(o>.8?800:4e3))return;let l=this.level;o>2?l=jr.length-1:o>.8&&l<jr.length-1?l++:o<.3&&l>0&&l--,l!==this.level&&(this.level=l,this.changedAt=e,this.gpuMs=[],this.cpuMs=[],this.onChange())}get scale(){return jr[this.level]}get atMinimum(){return this.level===jr.length-1}},cs=class{constructor(){this.lost=!1,this.programs=new Map,this.atlases=new Map,this.vertex=null,this.vao=null,this.clients=new Set,this.parallel=null,this.lostTimer=0,this.renderer="",this.forgetState=()=>{},this.onLost=e=>{e.preventDefault(),this.lost=!0,this.forgetState(),this.reset();for(let n of[...this.clients])n.lost();clearTimeout(this.lostTimer),this.lostTimer=setTimeout(()=>{if(this.lost){this.canvas.removeEventListener?.("webglcontextlost",this.onLost),this.canvas.removeEventListener?.("webglcontextrestored",this.onRestored);try{this.create()}catch{return}this.restored()}},1e3)},this.onRestored=()=>{clearTimeout(this.lostTimer),this.lost=!1,this.forgetState(),this.restored()},this.idleTimer=0,this.create()}create(){let e=null,n=null,t={alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"};if(typeof document<"u"&&(e=document.createElement("canvas"),n=e.getContext("webgl2",t)),!n&&typeof OffscreenCanvas=="function")try{e=new OffscreenCanvas(1,1),n=e.getContext("webgl2",t)}catch{n=null}if(!n||!e)throw new Error("WebGL2 is not available for the glyph field.");this.canvas=e,this.gl=n,this.forgetState=Wi(n),this.lost=!1,e.width=e.height=1,this.parallel=n.getExtension("KHR_parallel_shader_compile");let a=this.frames?.level??0;this.frames=new Vi(n,()=>{for(let c of[...this.clients])c.rescale()}),this.frames.level=a;let o=n.getExtension("WEBGL_debug_renderer_info");this.renderer=String(n.getParameter(o?o.UNMASKED_RENDERER_WEBGL:n.RENDERER)??""),e.addEventListener?.("webglcontextlost",this.onLost),e.addEventListener?.("webglcontextrestored",this.onRestored);let l=!n.getExtension("EXT_color_buffer_float")&&!n.getExtension("EXT_color_buffer_half_float");this.program(Ii(l)),this.program(so(0))}restored(){for(let e of[...this.clients])e.restored()}reset(){this.programs.clear(),this.atlases.clear(),this.vertex=null,this.vao=null,this.frames.reset()}join(e){this.clients.add(e),clearTimeout(this.idleTimer)}leave(e){this.clients.delete(e),this.clients.size?this.fit():(this.lost||(this.canvas.width=this.canvas.height=1,this.frames.level=0),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>{this.clients.size||this.dispose()},3e3))}dispose(){if(clearTimeout(this.lostTimer),this.canvas.removeEventListener?.("webglcontextlost",this.onLost),this.canvas.removeEventListener?.("webglcontextrestored",this.onRestored),!this.lost)try{this.gl.getExtension("WEBGL_lose_context")?.loseContext()}catch{}this.reset(),jt===this&&(jt=null)}program(e){let n=this.programs.get(e);if(n)return n;let t=this.gl,a=(i,u)=>{let f=t.createShader(i);return t.shaderSource(f,u),t.compileShader(f),f};this.vertex??(this.vertex=a(t.VERTEX_SHADER,`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}`));let o=t.createProgram(),l=a(t.FRAGMENT_SHADER,e);t.attachShader(o,this.vertex),t.attachShader(o,l),t.linkProgram(o);let c={program:o,locations:null,fragment:l};return this.programs.set(e,c),c}linked(e,n=!1){if(e.locations)return!0;let t=this.gl;if(!n&&this.parallel&&!t.getProgramParameter(e.program,this.parallel.COMPLETION_STATUS_KHR))return!1;if(!t.getProgramParameter(e.program,t.LINK_STATUS)){if(t.isContextLost())return!1;throw new Error(e.fragment&&t.getShaderInfoLog(e.fragment)||t.getProgramInfoLog(e.program)||"Glyph field program failed to link.")}let a={};for(let o=t.getProgramParameter(e.program,t.ACTIVE_UNIFORMS)-1;o>=0;o--){let l=t.getActiveUniform(e.program,o).name.replace(/\[0\]$/,"");a[l]=t.getUniformLocation(e.program,l)}return e.locations=a,!0}get canCompileInParallel(){return!!this.parallel}vertexArray(){return this.vao??(this.vao=this.gl.createVertexArray())}atlas(e,n,t){let a=this.atlases.get(e);if(a)a.refs||(this.atlases.delete(e),this.atlases.set(e,a));else{let o=this.gl,l=o.createTexture();o.bindTexture(o.TEXTURE_2D,l);for(let[c,i]of[[o.TEXTURE_MIN_FILTER,o.NEAREST],[o.TEXTURE_MAG_FILTER,o.NEAREST],[o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE],[o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE]])o.texParameteri(o.TEXTURE_2D,c,i);a={key:e,texture:l,refs:0,final:!1,users:new Set,bytes:0},this.atlases.set(e,a),this.paintAtlas(a,n)}return a.refs++,a.users.add(t),a}hasAtlas(e){return this.atlases.has(e)}paintAtlas(e,n){let t=this.gl,{image:a,final:o}=n();t.bindTexture(t.TEXTURE_2D,e.texture),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,a),e.bytes=a.width*a.height*4,e.final=o;for(let l of[...e.users])l()}releaseAtlas(e,n){e&&e.users.delete(n)&&(--e.refs>0||this.evictAtlases())}evictAtlases(){let e=[...this.atlases.values()].filter(t=>!t.refs),n=e.length-32;for(let t of e){if(n<=0&&!this.overBudget)break;n--,this.atlases.delete(t.key),this.lost||this.gl.deleteTexture(t.texture)}}fit(){if(this.lost)return;let e=1,n=1;for(let o of this.clients){let[l,c]=o.size();e=Math.max(e,l),n=Math.max(n,c)}let t=this.canvas,a=o=>256*Math.ceil(o/256);t.width*t.height>a(e)*a(n)*2&&(t.width=a(e),t.height=a(n))}get bytes(){let e=this.canvas.width*this.canvas.height*4*2;for(let n of this.clients)e+=n.bytes();for(let n of this.atlases.values())e+=n.bytes;return e}get overBudget(){return this.bytes>ss}get roomy(){return this.bytes<2281701376e-1}begin(e,n){let t=this.canvas;if(t.width<e||t.height<n){let a=o=>256*Math.ceil(o/256);t.width=Math.max(t.width,a(e)),t.height=Math.max(t.height,a(n))}this.frames.begin()}present(e,n,t){e.globalCompositeOperation="copy",e.imageSmoothingEnabled=!1,e.drawImage(this.canvas,0,this.canvas.height-t,n,t,0,0,n,t)}endFrame(e){this.lost?this.frames.skip():this.frames.end(e,performance.now()-co)}get level(){return this.frames.level}get overloaded(){return this.frames.overloaded}get scale(){return this.frames.scale}get atMinimum(){return this.frames.atMinimum}},jt=null,ki=!1;function vo(){if(jt||ki)return jt;try{jt=new cs}catch{ki=!0}return jt}var ji=()=>jt,$i=new WeakSet,Yi=e=>$i.has(e),us=/^[\u1100-\u115f\u2e80-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe4f\uff00-\uff60\uffe0-\uffe6]|^[\u{20000}-\u{3fffd}]/u,Ki=e=>us.test(e),hs=class{constructor(e,n,t){this.previous=null,this.peak=0,this.width=e,this.height=n,this.span=t??Math.min(e,n);let a=e*n;this.pixels=new Uint8Array(4*a),this.signal=new Float32Array(a),this.offsetX=new Float32Array(a),this.offsetY=new Float32Array(a),this.driftX=new Float32Array(a),this.driftY=new Float32Array(a),this.u=new Float32Array(a),this.v=new Float32Array(a),this.ink=new Float32Array(a),this.a=new Float32Array(a),this.b=new Float32Array(a),this.c=new Float32Array(a),this.pressure=new Float32Array(a),this.pressureNext=new Float32Array(a),this.divergence=new Float32Array(a),this.curl=new Float32Array(a)}get active(){return this.peak>2e-4}clear(){for(let e of[this.u,this.v,this.ink,this.a,this.b,this.c,this.pressure,this.pressureNext,this.divergence,this.curl,this.signal,this.pixels,this.offsetX,this.offsetY,this.driftX,this.driftY])e.fill(0);this.previous=null,this.peak=0}leave(){this.previous=null}move(e,n,t,a=performance.now()){if(!Number.isFinite(e+n+t+a))return;e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n)),t=Math.max(.1,Math.min(1,t));let o=this.previous;if(this.previous={x:e,y:n,time:a},!o)return;let l=(e-o.x)*(this.width-1),c=(n-o.y)*(this.height-1),i=Math.hypot(l,c);if(i<.001)return;let u=this.span,f=a>o.time?Math.max(1/240,(a-o.time)/1e3):1/60,h=Math.min(12,i/u/f),M=1-Math.exp(-h/2.2),b=u*(.022+.075*t)*(.65+.95*M),v=Math.min(128,Math.max(1,Math.ceil(i/(.4*b)))),d=i/b*(.32+.22*M)/v,g=l/i,I=c/i,r=-I,O=g,Me=i*(2+18*M)/v;for(let A=0;A<v;A++){let D=(A+.5)/v,K=(o.x+(e-o.x)*D)*(this.width-1),se=(o.y+(n-o.y)*D)*(this.height-1),fe=Math.max(1,Math.floor(K-3*b)),be=Math.min(this.width-2,Math.ceil(K+3*b)),U=Math.max(1,Math.floor(se-3*b)),pe=Math.min(this.height-2,Math.ceil(se+3*b));for(let Q=U;Q<=pe;Q++)for(let _=fe;_<=be;_++){let C=((_-K)*g+(Q-se)*I)/b,J=((_-K)*r+(Q-se)*O)/b,Te=Math.exp(-C*C*.65-J*J*1.7),ve=Q*this.width+_;this.ink[ve]=1-(1-this.ink[ve])*Math.exp(-Te*d);let Ae=1-J*J*.55,Fe=C*J*.7;this.u[ve]=Math.max(-80,Math.min(80,this.u[ve]+(g*Ae+r*Fe)*Te*Me)),this.v[ve]=Math.max(-80,Math.min(80,this.v[ve]+(I*Ae+O*Fe)*Te*Me))}}this.peak=1}read(e,n,t){let a=0|(n=Math.max(.5,Math.min(this.width-1.5,n))),o=0|(t=Math.max(.5,Math.min(this.height-1.5,t))),l=n-a,c=t-o,i=o*this.width+a;return(e[i]*(1-l)+e[i+1]*l)*(1-c)+(e[i+this.width]*(1-l)+e[i+this.width+1]*l)*c}sample(e,n){return this.read(this.signal,e*(this.width-1),n*(this.height-1))}displacement(e,n,t){t[0]=this.read(this.offsetX,e*(this.width-1),n*(this.height-1)),t[1]=this.read(this.offsetY,e*(this.width-1),n*(this.height-1))}step(e){if(!this.active||!Number.isFinite(e))return;let n=Math.max(0,Math.min(.05,e)),t=this.width,a=this.height;for(;n>1e-7;){let o=Math.min(.016666666666666666,n);n-=o;let l=Math.exp(-1.9*o),c=Math.exp(-3.2*o);for(let u=1;u<a-1;u++)for(let f=1;f<t-1;f++){let h=u*t+f,M=Math.max(.5,Math.min(t-1.5,f-this.u[h]*o)),b=Math.max(.5,Math.min(a-1.5,u-this.v[h]*o)),v=0|M,d=0|b,g=M-v,I=b-d,r=d*t+v,O=(1-g)*(1-I),Me=g*(1-I),A=(1-g)*I,D=g*I;this.a[h]=(this.u[r]*O+this.u[r+1]*Me+this.u[r+t]*A+this.u[r+t+1]*D)*l,this.b[h]=(this.v[r]*O+this.v[r+1]*Me+this.v[r+t]*A+this.v[r+t+1]*D)*l,this.c[h]=(this.ink[r]*O+this.ink[r+1]*Me+this.ink[r+t]*A+this.ink[r+t+1]*D)*c}[this.u,this.a]=[this.a,this.u],[this.v,this.b]=[this.b,this.v],[this.ink,this.c]=[this.c,this.ink];for(let u=1;u<a-1;u++)for(let f=1;f<t-1;f++){let h=u*t+f;this.curl[h]=.5*(this.v[h+1]-this.v[h-1]-this.u[h+t]+this.u[h-t])}for(let u=1;u<a-1;u++)for(let f=1;f<t-1;f++){let h=u*t+f,M=Math.abs(this.curl[h+1])-Math.abs(this.curl[h-1]),b=Math.abs(this.curl[h+t])-Math.abs(this.curl[h-t]),v=Math.hypot(M,b)+1e-4,d=this.curl[h]*o*10,g=Math.hypot(this.u[h],this.v[h]);this.u[h]+=b/v*d,this.v[h]-=M/v*d;let I=Math.min(1,g/(Math.hypot(this.u[h],this.v[h])+1e-6));this.u[h]*=I,this.v[h]*=I,this.divergence[h]=-.5*(this.u[h+1]-this.u[h-1]+this.v[h+t]-this.v[h-t])}this.pressure.fill(0);for(let u=0;u<4;u++){for(let f=1;f<a-1;f++)for(let h=1;h<t-1;h++){let M=f*t+h;this.pressureNext[M]=.25*(this.divergence[M]+this.pressure[M-1]+this.pressure[M+1]+this.pressure[M-t]+this.pressure[M+t])}[this.pressure,this.pressureNext]=[this.pressureNext,this.pressure]}let i=0;for(let u=1;u<a-1;u++)for(let f=1;f<t-1;f++){let h=u*t+f;this.u[h]=Math.max(-80,Math.min(80,this.u[h]-.5*(this.pressure[h+1]-this.pressure[h-1]))),this.v[h]=Math.max(-80,Math.min(80,this.v[h]-.5*(this.pressure[h+t]-this.pressure[h-t]))),this.driftX[h]+=(3.6*this.u[h]-58*this.offsetX[h]-12*this.driftX[h])*o,this.driftY[h]+=(3.6*this.v[h]-58*this.offsetY[h]-12*this.driftY[h])*o,this.offsetX[h]=Math.max(-2,Math.min(2,this.offsetX[h]+this.driftX[h]*o)),this.offsetY[h]=Math.max(-2,Math.min(2,this.offsetY[h]+this.driftY[h]*o)),this.signal[h]=1-Math.exp(.06*-Math.hypot(this.u[h],this.v[h])-.16*this.ink[h]),i=Math.max(i,this.signal[h])}this.peak=i}if(this.active)for(let o=0;o<this.ink.length;o++){let l=Math.round(65535*Math.min(1,this.signal[o]));this.pixels[4*o]=l>>>8,this.pixels[4*o+1]=255&l,this.pixels[4*o+2]=Math.round(128+63.5*this.offsetX[o]),this.pixels[4*o+3]=Math.round(128+63.5*this.offsetY[o])}else this.clear()}};function Ze(e,n,t,a,o){if(!(o<1))for(let l=0;l<2;l++){for(let c=0;c<a;c++){let i=0,u=c*t;for(let f=-o;f<=o;f++)i+=e[u+Math.max(0,Math.min(t-1,f))];for(let f=0;f<t;f++)n[u+f]=i/(2*o+1),i+=e[u+Math.min(t-1,f+o+1)]-e[u+Math.max(0,f-o)]}for(let c=0;c<t;c++){let i=0;for(let u=-o;u<=o;u++)i+=n[Math.max(0,Math.min(a-1,u))*t+c];for(let u=0;u<a;u++)e[u*t+c]=i/(2*o+1),i+=n[Math.min(a-1,u+o+1)*t+c]-n[Math.max(0,u-o)*t+c]}}}var no=new Float32Array(0);function Qi(e,n,t,a,o){let l=n*t,c=o&&o.width===n&&o.height===t?o:{width:n,height:t,subject:new Float32Array(l),depth:new Float32Array(l),key:"none"},{subject:i,depth:u}=c,f=0;for(let d=0;d<l;d++)e[4*d+3]<250&&f++;let h=d=>(.2126*e[4*d]+.7152*e[4*d+1]+.0722*e[4*d+2])/255,M="none",b=0;if(f>.01*l)M="alpha";else if(a)M="mask";else{let d=0,g=0,I=0,r=Math.max(1,Math.round(.03*Math.min(n,t)));for(let O=0;O<t;O++)for(let Me=0;Me<n;Me++){if(Me>=r&&O>=r&&Me<n-r&&O<t-r)continue;let A=h(O*n+Me);d+=A,g+=A*A,I++}b=d/Math.max(1,I),Math.sqrt(Math.max(0,g/Math.max(1,I)-b*b))<.07&&(M="ground")}for(let d=0;d<l;d++){let g=e[4*d+3]/255,I=h(d),r=1;if(M==="alpha")r=g;else if(M==="ground"){let O=Math.max(0,Math.min(1,(Math.abs(I-b)-.035)/.12));r=O*O*(3-2*O)}i[d]=r*(a?Math.max(0,Math.min(1,a[d])):1),u[d]=I*g}c.key=M,no.length<l&&(no=new Float32Array(l));let v=no;return Ze(i,v,n,t,Math.max(1,Math.round(.02*Math.min(n,t)))),Ze(u,v,n,t,Math.max(1,Math.round(.035*Math.min(n,t)))),c}var fr=11,Et=e=>Math.max(0,Math.min(1,e)),ae=(e,n,t)=>{let a=Et((t-e)/(n-e));return a*a*(3-2*a)};function Pt(e,n,t=256){let a=0;for(let i=0;i<e.length;i++)e[i]>a&&(a=e[i]);if(a<=0)return 0;let o=new Uint32Array(t);for(let i=0;i<e.length;i++)o[Math.min(t-1,Math.floor(Math.max(0,e[i])/a*t))]++;let l=0,c=e.length*n;for(let i=0;i<t;i++)if(l+=o[i],l>=c)return(i+1)/t*a;return a}var fs=class{constructor(e){this.n=e,this.arrays=[],this.next=0}take(e){this.next===this.arrays.length&&this.arrays.push(new Float32Array(this.n));let n=this.arrays[this.next++];return e?n.set(e):n.fill(0),n}reset(){this.next=0}},$r=null;function kn(e,n,t,a,o){let l=2*o+1;for(let c=0;c<a;c++){let i=c*t,u=0;for(let f=-o;f<=o;f++)u+=e[i+Math.max(0,Math.min(t-1,f))];for(let f=0;f<t;f++)n[i+f]=u/l,u+=e[i+Math.min(t-1,f+o+1)]-e[i+Math.max(0,f-o)]}for(let c=0;c<t;c++){let i=0;for(let u=-o;u<=o;u++)i+=n[Math.max(0,Math.min(a-1,u))*t+c];for(let u=0;u<a;u++)e[u*t+c]=i/l,i+=n[Math.min(a-1,u+o+1)*t+c]-n[Math.max(0,u-o)*t+c]}}function ro(e,n,t,a,o,l,c){let i=t*a,u=c.take(),f=c.take(n),h=c.take(e),M=c.take(),b=c.take();for(let v=0;v<i;v++)M[v]=n[v]*n[v],b[v]=n[v]*e[v];kn(f,u,t,a,o),kn(h,u,t,a,o),kn(M,u,t,a,o),kn(b,u,t,a,o);for(let v=0;v<i;v++){let d=(b[v]-f[v]*h[v])/(M[v]-f[v]*f[v]+l);M[v]=d,b[v]=h[v]-d*f[v]}kn(M,u,t,a,o),kn(b,u,t,a,o);for(let v=0;v<i;v++)e[v]=M[v]*n[v]+b[v]}function ao(e,n,t,a,o,l=2){for(let c=0;c<l;c++){for(let i=0;i<a;i++)for(let u=0;u<t;u++){let f=i*t+u,h=e[f];u>0&&(h=Math.max(h,Math.min(n[f],e[f-1]*o))),i>0&&(h=Math.max(h,Math.min(n[f],e[f-t]*o),u>0?Math.min(n[f],e[f-t-1]*o):0,u<t-1?Math.min(n[f],e[f-t+1]*o):0)),e[f]=h}for(let i=a-1;i>=0;i--)for(let u=t-1;u>=0;u--){let f=i*t+u,h=e[f];u<t-1&&(h=Math.max(h,Math.min(n[f],e[f+1]*o))),i<a-1&&(h=Math.max(h,Math.min(n[f],e[f+t]*o),u>0?Math.min(n[f],e[f+t-1]*o):0,u<t-1?Math.min(n[f],e[f+t+1]*o):0)),e[f]=h}}}function Yr(e,n,t,a,o){for(let l=0;l<a;l++)for(let c=0;c<t;c++){let i=1;for(let u=Math.max(0,c-o);u<=Math.min(t-1,c+o);u++)i=Math.min(i,e[l*t+u]);n[l*t+c]=i}for(let l=0;l<a;l++)for(let c=0;c<t;c++){let i=1;for(let u=Math.max(0,l-o);u<=Math.min(a-1,l+o);u++)i=Math.min(i,n[u*t+c]);e[l*t+c]=i}}function ds(e,n,t,a,o){let l=t*a,c=Math.min(t,a),i=o.take(),u=o.take(),f=o.take(),h=o.take(),M=o.take();for(let m=0;m<l;m++){let q=e[4*m+3]/255;M[m]=q,i[m]=n[4*m]/255*q,u[m]=n[4*m+1]/255*q,f[m]=n[4*m+2]/255*q,h[m]=(.299*e[4*m]+.587*e[4*m+1]+.114*e[4*m+2])/255*q}let b=o.take(),v=(m,q)=>{let L=o.take(m);return Ze(L,b,t,a,q),L},d=Math.max(2,Math.round(.04*c)),g=Math.max(d+2,Math.round(.12*c)),I=Math.max(2,Math.round(.05*c)),r=v(h,1),O=v(h,d),Me=v(h,g),A=o.take(),D=o.take(),K=o.take(),se=o.take(),fe=o.take();for(let m=0;m<a;m++)for(let q=0;q<t;q++){let L=m*t+q;A[L]=Math.abs(h[L]-r[L]),D[L]=Math.abs(r[L]-O[L]),K[L]=Math.abs(O[L]-Me[L]),se[L]=Math.abs(h[m*t+Math.min(t-1,q+1)]-h[m*t+Math.max(0,q-1)]),fe[L]=Math.abs(h[Math.min(a-1,m+1)*t+q]-h[Math.max(0,m-1)*t+q])}Ze(A,b,t,a,I),Ze(D,b,t,a,I),Ze(K,b,t,a,I),Ze(se,b,t,a,2),Ze(fe,b,t,a,2);let be=Math.max(.01,Pt(A,.9)+Pt(D,.9)),U=v(i,1),pe=v(u,1),Q=v(f,1),_=o.take(),C=o.take(),J=o.take(),Te=0;for(let m=0;m<l;m++){let q=U[m],L=pe[m],ue=Q[m],_e=Math.max(q,L,ue),Ce=_e-Math.min(q,L,ue);J[m]=_e,C[m]=_e>.001?Ce/_e:0,Te+=Ce;let je=0;Ce>1e-4&&(je=_e===q?((L-ue)/Ce+6)%6:_e===L?(ue-q)/Ce+2:(q-L)/Ce+4),_[m]=60*je}let ve=ae(.02,.07,Te/l),Ae=Math.max(2,Math.round(.06*a)),Fe=new Float32Array(a);for(let m=0;m<a;m++){let q=0;for(let L=0;L<t;L++)q+=A[m*t+L]+D[m*t+L];Fe[m]=q/t}let Ue=.5,we=0;for(let m=Math.max(Ae,Math.round(.12*a));m<=Math.min(a-Ae,Math.round(.88*a));m++){let q=0,L=0,ue=0,_e=0;for(let ge=0;ge<t;ge++){let De=0,Se=0,$e=0,et=0,tt=0,Qe=0;for(let vt=1;vt<=Ae;vt++){let ht=(m-vt)*t+ge,It=(m+vt-1)*t+ge;De+=U[ht],Se+=pe[ht],$e+=Q[ht],et+=U[It],tt+=pe[It],Qe+=Q[It]}let kt=(Math.abs(De-et)+Math.abs(Se-tt)+Math.abs($e-Qe))/Ae;q+=kt,L+=kt>.12?1:0}let Ce=Math.max(2,Math.round(.15*a)),je=Math.max(0,m-Ce),We=Math.min(a,m+Ce);for(let ge=je;ge<m;ge++)ue+=Fe[ge];for(let ge=m;ge<We;ge++)_e+=Fe[ge];ue/=m-je,_e/=We-m;let z=ae(-.05,.3,(_e-ue)/(_e+ue+1e-4)),ee=ae(.08,.35,q/t)*(L/t)*z;ee>we&&(we=ee,Ue=m/a)}let de=ae(.15,.45,we),ie=o.take(),k=o.take(),H=o.take();for(let m=0;m<l;m++)ie[m]=Math.min(i[m],u[m],f[m]);Yr(ie,b,t,a,1),Ze(ie,b,t,a,d);for(let m=0;m<l;m++)k[m]=D[m]+K[m];let xe=0,oe=0,Le=0;for(let m=0;m<l;m++)xe+=U[m],oe+=pe[m],Le+=Q[m];xe/=l,oe/=l,Le/=l;let Ie=v(U,d),qe=v(pe,d),Ye=v(Q,d),ne=v(U,g),Jt=v(pe,g),Zt=v(Q,g);for(let m=0;m<l;m++){let q=Math.hypot(Ie[m]-xe,qe[m]-oe,Ye[m]-Le),L=Math.hypot(Ie[m]-ne[m],qe[m]-Jt[m],Ye[m]-Zt[m]);H[m]=(q+1.5*L)*(.4+.6*C[m]*ve+.4*(1-ve))}let ze=o.take(),pt=o.take(),en=o.take(),He=o.take(),_t=o.take(),Ft=o.take(),rt=o.take(),Ct=o.take(),Xt=o.take(),Dt=o.take();for(let m=0;m<a;m++)for(let q=0;q<t;q++)Dt[m*t+q]=Math.abs(h[Math.min(a-1,m+1)*t+q]-h[Math.max(0,m-1)*t+q]);Ze(Dt,b,t,a,1);for(let m=0;m<a;m++)for(let q=0;q<t;q++){let L=m*t+q,ue=(m+.5)/a,_e=_[L],Ce=C[L]*ve,je=J[L],We=A[L]+D[L],z=ae(175,200,_e)*(1-ae(250,275,_e))*ae(.08,.25,Ce),ee=(1-ae(45,65,_e)+ae(290,330,_e))*ae(.2,.45,Ce)*ae(.3,.55,je),ge=(1-ae(.15,.35,Ce))*ae(.45,.7,je)*de,De=(1-ae(.08,.2,je))*de,Se=de>.3?1-ae(Ue,Ue+.1,ue):1-ae(.4,.8,ue),$e=1-ae(.02,.06,We),et=1-ae(.03,.09,We);pt[L]=Math.max(z*$e,.7*De*(1-ae(.008,.025,We)),ee*et*.9)*Se,en[L]=Math.max(pt[L],ge*$e*Se),ze[L]=m===0?pt[L]:0,He[L]=ae(150,172,_e)*(1-ae(232,250,_e))*ae(.25,.45,Ce),rt[L]=ae(1.3,2.2,(se[L]+.004)/(fe[L]+.004))*ae(.35,.55,r[L])*(1-ae(.1,.18,C[L]*ve))*ae(.025,.07,We)*ae(.025,.045,Dt[L]);let tt=1-ae(.18,.4,Ce),Qe=ae(.55,.8,je)*ae(.05,.12,We);_t[L]=Math.max(He[L],.85*tt,.8*Qe)}ao(ze,pt,t,a,.995,1),ao(ze,en,t,a,.8,1);let Ut=0;for(let m=0;m<l;m++)Ut+=ze[m];let Yn=Ut>.04*l&&de>.3;if(Yn)for(let m=0;m<a;m++)for(let q=0;q<t;q++)He[m*t+q]*=ae(Ue,Ue+.05,(m+.5)/a);if(Yn){let m=o.take(),q=o.take(),L=o.take();for(let z=0;z<l;z++)m[z]=.299*Ie[z]+.587*qe[z]+.114*Ye[z];for(let z=0;z<a;z++)for(let ee=0;ee<t;ee++)q[z*t+ee]=r[Math.min(a-1,z+1)*t+ee]-r[Math.max(0,z-1)*t+ee];let ue=new Uint8Array(l);for(let z=1;z<a-1;z++)for(let ee=0;ee<t;ee++){let ge=Math.abs(q[z*t+ee]),De=ge>.03;for(let Se=-3;Se<=3&&De;Se++)Se&&z+Se>=0&&z+Se<a&&Math.abs(q[(z+Se)*t+ee])>ge&&(De=!1);ue[z*t+ee]=De?1:0}let _e=(z,ee,ge,De=!0)=>{let Se=Ie[ee]+qe[ee]+Ye[ee]+.05,$e=Ie[ge]+qe[ge]+Ye[ge]+.05,et=Math.abs(Ie[ee]/Se-Ie[ge]/$e)+Math.abs(qe[ee]/Se-qe[ge]/$e)+Math.abs(Ye[ee]/Se-Ye[ge]/$e),tt=Math.min(Math.abs(_[ee]-_[ge]),360-Math.abs(_[ee]-_[ge])),Qe=Math.max(1-ae(.1,.25,et),(1-ae(15,35,tt))*ae(.15,.3,Math.min(C[ee],C[ge]))),kt=Math.max(ae(2,3,(fe[ee]+.004)/(se[ee]+.004))*ae(.015,.04,A[ee]+D[ee])*ae(.4,.55,A[ee]/(A[ee]+D[ee]+1e-4)),1-ae(.12,.25,m[ee]));return Qe*(De?kt:1)*(1-ae(.82*m[ge]+.02,1.02*m[ge]+.05,m[ee]))},Ce=0,je=0;for(let z=Math.max(3,Math.round(a*Math.max(.25,Ue)));z<Math.round(.88*a);z++){let ee=0;for(let De=0;De<t;De++)(ue[(z-1)*t+De]||ue[z*t+De]||ue[(z+1)*t+De])&&ee++;if(ee<.5*t)continue;let ge=0;for(let De=z+1;De<Math.min(a,2*z);De++)for(let Se=0;Se<t;Se++)ge+=_e(z,De*t+Se,(2*z-De)*t+Se);ge>je&&(je=ge,Ce=z)}let We=ae(.05,.1,je/l);if(We>0)for(let z=Ce+1;z<Math.min(a,2*Ce);z++)for(let ee=0;ee<t;ee++){let ge=z*t+ee;Ct[ge]=_e(Ce,ge,(2*Ce-z)*t+ee)*We,Xt[ge]=_e(Ce,ge,(2*Ce-z)*t+ee,!1)*We,L[ge]=Ct[ge]}Ze(L,b,t,a,1);for(let z=0;z<l;z++)Ct[z]=Math.max(Ct[z],L[z]),He[z]=Math.max(He[z],Ct[z])}let Sr=v(He,g);for(let m=0;m<l;m++)He[m]*=ae(.15,.35,Sr[m]);let wa=v(He,d);for(let m=0;m<l;m++){He[m]*=1-.8*pt[m];let q=Math.min(Math.abs(_[m]-200),360-Math.abs(_[m]-200));Ft[m]=ae(.28,.45,C[m]*ve)*ae(55,80,q)*(1-ae(.3,.6,Xt[m]))}let Kn=v(Ft,d);for(let m=0;m<l;m++)Ft[m]=Math.max(Ft[m]*(1-(1-ae(.15,.3,Kn[m]))*ae(.55,.7,J[m])*ae(.5,.65,C[m])),1-M[m]),_t[m]=Math.min(Math.max(_t[m],.9*Xt[m]),Math.max(He[m],ae(.25,.6,wa[m])))*(1-ze[m])*(1-Ft[m]);ao(He,_t,t,a,.97);let gt=o.take(rt),qt=Math.max(2,Math.round(.12*a));for(let m=0;m<t;m++){let q=0;for(let L=-qt;L<=qt;L++)q+=rt[Math.max(0,Math.min(a-1,L))*t+m];for(let L=0;L<a;L++)gt[L*t+m]=q/(2*qt+1),q+=rt[Math.min(a-1,L+qt+1)*t+m]-rt[Math.max(0,L-qt)*t+m]}Ze(gt,b,t,a,1);for(let m=0;m<l;m++)rt[m]=ae(.2,.45,gt[m])*ae(.2,.5,rt[m]+.5*gt[m])*(1-ze[m]);ro(ze,h,t,a,Math.max(2,Math.round(.04*c)),.002,o),ro(He,h,t,a,Math.max(2,Math.round(.04*c)),.002,o),ro(rt,h,t,a,Math.max(2,Math.round(.03*c)),.002,o),Ze(Ft,b,t,a,1);for(let m=0;m<l;m++)ze[m]=ae(.3,.7,ze[m])*M[m],rt[m]=ae(.3,.7,rt[m])*M[m]*(1-ze[m]),He[m]=ae(.3,.7,He[m])*(1-ze[m])*(1-rt[m])*(1-ae(.15,.4,Ft[m]));Yr(ze,b,t,a,2),Yr(He,b,t,a,2),Yr(rt,b,t,a,1),Ze(ze,b,t,a,1),Ze(He,b,t,a,1),Ze(rt,b,t,a,1);let mn=1/Math.max(.02,Pt(H,.97)),Be=1/Math.max(.01,Pt(k,.9)),Tt=Pt(ie,.97),st=Pt(ie,.1),Fn=ae(.06,.25,Tt-st),ct=o.take();for(let m=0;m<a;m++)for(let q=0;q<t;q++){let L=m*t+q,ue=(q+.5)/t,_e=(m+.5)/a,Ce=Math.max(ze[L],He[L]),je=A[L]+D[L]+K[L],We=.6*Et(((A[L]+.6*D[L])/(je+.004)-.25)/.55)+.4*Et((A[L]+D[L])/be),z=ae(.04,.35,je/be)*(1-Ce),ee=.55*Et((ie[L]-st)/Math.max(.05,Tt-st))+.25*(1-Et(k[L]*Be))+.2*Et(2*(Q[L]-U[L])+.3)*ve,ge=Fn*ae(.12,.35,O[L])*(.4+.6*de),De=de*(_e<Ue?.45:.45+.55*ae(0,1,(_e-Ue)/Math.max(.15,1-Ue)))+(1-de)*(.5+.4*(_e-.5)),Se=A[L]/(A[L]+D[L]+1e-4),$e=ae(.2,.7,(A[L]+D[L])/be)*(.35+.65*de)*(1-Ce),et=1-Et(1.5*Math.hypot(1.2*(ue-.5),_e-.52)),tt=Et(H[L]*mn)*(.55+.45*et),Qe=.3*z,kt=.25*ge,vt=.12+.45*de,ht=.12*$e,It=.35*(1-.4*de)*(1-Ce);ct[L]=(Qe*We+kt*(1-ee)+vt*De+ht*Et(1.6-1.6*Se)+It*tt+.04)/(Qe+kt+vt+ht+It+.08)*(1-.85*ze[L])*(1-.45*He[L]*(1-de))}let pn=Qi(e,t,a);if(pn.key!=="none")for(let m=0;m<l;m++)ct[m]=.7*pn.subject[m]+.3*ct[m];return Ze(ct,b,t,a,Math.max(1,Math.round(.03*c))),(function(m,q,L,ue,_e,Ce,je,We,z){let ee=_e*Ce,ge=z.take(),De=re=>(kn(re,ge,_e,Ce,je),re),Se=(re,Oe)=>{let ft=z.take();for(let yt=0;yt<ee;yt++)ft[yt]=re[yt]*Oe[yt];return De(ft)},$e=De(z.take(q)),et=De(z.take(L)),tt=De(z.take(ue)),Qe=De(z.take(m)),kt=Se(q,q),vt=Se(q,L),ht=Se(q,ue),It=Se(L,L),Lr=Se(L,ue),Pr=Se(ue,ue),Qn=Se(q,m),Jn=Se(L,m),Ke=Se(ue,m),Bt=z.take(),ot=z.take(),xt=z.take(),tn=z.take();for(let re=0;re<ee;re++){let Oe=Qn[re]-$e[re]*Qe[re],ft=Jn[re]-et[re]*Qe[re],yt=Ke[re]-tt[re]*Qe[re],Mt=kt[re]-$e[re]*$e[re]+We,Rt=vt[re]-$e[re]*et[re],dt=ht[re]-$e[re]*tt[re],gn=It[re]-et[re]*et[re]+We,nn=Lr[re]-et[re]*tt[re],rn=Pr[re]-tt[re]*tt[re]+We,Zn=gn*rn-nn*nn,Sn=dt*nn-Rt*rn,er=Rt*nn-dt*gn,tr=Mt*rn-dt*dt,nr=Rt*dt-Mt*nn,_r=Mt*gn-Rt*Rt,St=Mt*Zn+Rt*Sn+dt*er,vn=Math.abs(St)>1e-12?1/St:0;Bt[re]=(Zn*Oe+Sn*ft+er*yt)*vn,ot[re]=(Sn*Oe+tr*ft+nr*yt)*vn,xt[re]=(er*Oe+nr*ft+_r*yt)*vn,tn[re]=Qe[re]-Bt[re]*$e[re]-ot[re]*et[re]-xt[re]*tt[re]}De(Bt),De(ot),De(xt),De(tn);for(let re=0;re<ee;re++)m[re]=Bt[re]*q[re]+ot[re]*L[re]+xt[re]*ue[re]+tn[re]})(ct,U,pe,Q,t,a,Math.max(2,Math.round(.07*c)),.004,o),{depth:ct,water:He,sky:ze,falls:rt}}function Kr(e,n,t,a,o,l,c){if(n===l&&t===c)return e[o*l+a];let i=Math.max(0,Math.min(n-1,(a+.5)*n/l-.5)),u=Math.max(0,Math.min(t-1,(o+.5)*t/c-.5)),f=Math.min(n-2,Math.floor(i)),h=Math.min(t-2,Math.floor(u)),M=i-f,b=u-h;if(f<0||h<0)return e[Math.round(u)*n+Math.round(i)];let v=h*n+f,d=v+n;return(e[v]*(1-M)+e[v+1]*M)*(1-b)+(e[d]*(1-M)+e[d+1]*M)*b}var In=(e,n,t)=>{let a=Math.max(0,Math.min(1,(t-e)/(n-e)));return a*a*(3-2*a)},ms=class{constructor(e,n){this.base=40,this.mass=0,this.calm=0,this.drift=[0,0],this.fade=3,this.age=0,this.peak=0,this.front=0,this.live=!1,this.bins=new Uint32Array(64),this.spare=new Float32Array(0),this.cols=Math.max(3,0|e),this.rows=Math.max(3,0|n);let t=this.cols*this.rows;this.h=new Float32Array(t),this.p=new Float32Array(t),this.speed=new Float32Array(t).fill(1),this.damp=new Float32Array(t).fill(1),this.wall=new Float32Array(t),this.trace=new Float32Array(t)}clear(){this.h.fill(0),this.p.fill(0),this.trace.fill(0),this.live=!1,this.peak=0}drop(e,n,t=1,a=3){let{cols:o,rows:l,h:c,p:i}=this,u=Math.max(1,a),f=Math.ceil(3*u);for(let h=Math.max(1,Math.floor(n-f));h<Math.min(l-1,Math.ceil(n+f));h++)for(let M=Math.max(1,Math.floor(e-f));M<Math.min(o-1,Math.ceil(e+f));M++){let b=M-e,v=h-n,d=(b*b+v*v)/(u*u),g=t*(1-d)*Math.exp(-d),I=h*o+M;c[I]+=g,i[I]+=g}this.age=0,this.live=!0,this.peak=Math.max(this.peak,t),this.front=Math.max(this.front,t)}step(e,n=1){if(!(this.live&&e>0))return this.live;e=Math.min(.05,e),this.age+=e;let{cols:t,rows:a,speed:o,damp:l,wall:c,trace:i}=this,u=Math.max(0,this.base*n),f=0;for(let U=0;U<o.length;U++)o[U]>f&&(f=o[U]);let h=Math.max(1,Math.min(8,Math.ceil(u*e*Math.sqrt(f)/.6))),M=this.calm,b=e/h,v=u*b*(u*b),d=this.mass*b*b,g=this.h,I=this.p;for(let U=0;U<h;U++){for(let Q=1;Q<a-1;Q++)for(let _=1,C=Q*t+1;_<t-1;_++,C++){let J=g[C],Te=g[C-1]+g[C+1]+g[C-t]+g[C+t]-4*J,ve=i[C],Ae=ve>.02?Math.max(0,1-Math.abs(J)/ve):0,Fe=M*Ae*Ae*b,Ue=1-Math.min(.5,l[C]*b+Fe);I[C]=(J+(J-I[C])*Ue+v*o[C]*Te-d*J)*(1-c[C])*(1-Math.min(.5,.5*Fe))}let pe=g;g=I,I=pe}this.h=g,this.p=I;let r=this.drift[0]*e,O=this.drift[1]*e;(r||O)&&(this.carry(g,r,O),this.carry(I,r,O));for(let U=0;U<t;U++)g[U]=.5*g[t+U],g[(a-1)*t+U]=.5*g[(a-2)*t+U];for(let U=0;U<a;U++)g[U*t]=.5*g[U*t+1],g[U*t+t-1]=.5*g[U*t+t-2];let Me=Math.exp(-e*this.fade),A=0;for(let U=0;U<g.length;U++){let pe=Math.abs(g[U]);pe>A&&(A=pe);let Q=i[U]*Me;i[U]=pe>=Q?pe:Q<1e-4?0:Q}this.peak=A;let D=this.bins.fill(0),K=.05*A,se=0;for(let U=0;U<g.length;U++)g[U]>K&&(D[Math.min(63,g[U]/A*64|0)]++,se++);let fe=0,be=63;for(;be>0&&(fe+=D[be],!(fe>=.08*se));be--);return this.front=Math.max(.15*A,(be+1)/64*A),!(A<.004)||(this.clear(),!1)}carry(e,n,t){let{cols:a,rows:o}=this;this.spare.length!==e.length&&(this.spare=new Float32Array(e.length));let l=this.spare;for(let c=0,i=0;c<o;c++){let u=Math.min(o-1.001,Math.max(0,c-t)),f=0|u,h=u-f;for(let M=0;M<a;M++,i++){let b=Math.min(a-1.001,Math.max(0,M-n)),v=0|b,d=b-v,g=f*a+v;l[i]=(e[g]*(1-d)+e[g+1]*d)*(1-h)+(e[g+a]*(1-d)+e[g+a+1]*d)*h}}e.set(l)}slope(e,n){let{h:t,cols:a}=this,o=t.length;return n[0]=.5*(t[Math.min(o-1,e+1)]-t[Math.max(0,e-1)]),n[1]=.5*(t[Math.min(o-1,e+a)]-t[Math.max(0,e-a)]),n}};function Ri(e,n,t,a){let o=new Float32Array(e.length);for(let l=0;l<2;l++){let c=l?o:e,i=l?e:o;for(let u=0;u<t;u++)for(let f=0;f<n;f++){let h=0,M=0;for(let b=-a;b<=a;b++){let v=l?f:f+b,d=l?u+b:u;v<0||d<0||v>=n||d>=t||(h+=c[d*n+v],M++)}i[u*n+f]=h/M}}}var Qr,ps=["none","flow","orb","drift","swell","caustics","contour","aurora","ripple","halo","interference","mesh","cascade","constellation"],On=["glyph","dot","pixel","mosaic","lego","voxel","disco","dither","hex","led","cmyk","stipple","engraving","crosshatch","woodblock","risograph","pointillism","inlay","tick","bayer"],gs=[{value:"fluid",label:"Fluid",description:"An ink-in-water wake that bends the image and swirls the characters."},{value:"lantern",label:"Lantern",description:"A soft light follows the pointer and lifts the characters it passes, without distortion."},{value:"trail",label:"Trail",description:"The Asciify Trail: in the wake, sparse characters fill in and dense ones open up, then settle. No distortion."},{value:"loupe",label:"Loupe",description:"A glass loupe glides after the pointer and magnifies the characters it covers."},{value:"reveal",label:"Reveal",description:"Under a soft spotlight the characters take the source image's own colours. Best over a photo or video in one ink."},{value:"none",label:"Off",description:"The field stays still under the pointer."}],vs={radius:.13,strength:.5,trail:.45,follow:12},xs={bloom:0,bloomRadius:2,scanlines:0,grain:0,chroma:0,curvature:0},ys={strength:.55,radius:.45},Vt={radius:.075,force:1,dissipation:1.6,refraction:.03,glow:.55,resolution:128,curl:24},Ms={charset:" .,:-=+*#%@",cellSize:12,cellAspect:1,cellFit:"pixel",font:'ui-monospace, "SF Mono", Menlo, Consolas, monospace',fontWeight:500,glyphScale:.8,mark:"glyph",dotScale:.9,markAngle:-35,accents:0,shuffle:0,sample:"area",linePitch:.5,lineWeight:1,sparkle:0,textRepeat:"flow",glyphOrder:"tone",color:"ink",ink:"#f3ba32",highlight:"auto",background:"transparent",brightness:0,contrast:1,gamma:1,invert:!1,levels:"auto",blend:"auto",saturation:1.1,ramp:[],shade:.5,backdrop:0,fit:"cover",focus:{x:.5,y:.5},vignette:0,drift:0,scene:"flow",scale:1,clear:!1,speed:1,hover:"fluid",fluid:Vt,lantern:vs,trail:ys,post:xs,scope:"all",tap:"surface",maxPixelRatio:2,respectReducedMotion:!0},ye=(e,n,t,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(t,Math.max(n,e)):a,na=(e,n)=>typeof e=="string"&&/^#([\da-f]{3}|[\da-f]{6})$/i.test(e.trim())?e.trim().toLowerCase():n,Ai=/^[\u0020-\u007e\u00a0-\u02ff\u0370-\u0482\u048a-\u052f\u2010-\u20cf\u2100-\u2bff]*$/;function un(e){return xo(e).slice()}var dr=new Map;function xo(e){let n=dr.get(e);if(n)return n;let t=(function(a){if(!Ai.test(a)&&Qr===void 0){let l=Intl.Segmenter;Qr=l?new l(void 0,{granularity:"grapheme"}):null}return(Qr&&!Ai.test(a)?Array.from(Qr.segment(a),l=>l.segment):Array.from(a)).filter(l=>l!==`
`&&l!=="\r"&&l!=="	").slice(0,256)})(e);return dr.size>=32&&dr.delete(dr.keys().next().value),dr.set(e,t),t}function bs(e){let n=un(e).filter(t=>t.trim());return n.length>0&&2*n.filter(Ki).length>n.length}var ws=(e,n,t)=>{let a=On.includes(e)?e:n;return(a==="glyph"||a==="inlay")&&bs(t)},Es=(e,n)=>{if(!Array.isArray(e))return n;let t=e.map(a=>na(a,"")).filter(Boolean).slice(0,6);return t.length>=2?t:[]};function Mr(e={},n=Ms){let t=typeof e.charset=="string"&&un(e.charset).length>=2?e.charset:n.charset,a=n.fluid||Vt,o=e.fluid===void 0?n.fluid:e.fluid,l=o!==!1&&(()=>{let M=o!==!0&&o?{...a,...o}:a;return{radius:ye(M.radius,.005,.5,Vt.radius),force:ye(M.force,0,8,Vt.force),dissipation:ye(M.dissipation,.05,20,Vt.dissipation),refraction:ye(M.refraction,0,.5,Vt.refraction),glow:ye(M.glow,0,2,Vt.glow),resolution:Math.round(ye(M.resolution,16,512,Vt.resolution)),curl:ye(M.curl,0,80,Vt.curl)}})(),c=ps.includes(e.scene)?e.scene:n.scene,i=!!e.clear&&typeof e.clear=="object"&&("element"in e.clear||"nodeType"in e.clear||"rects"in e.clear),u=e.clear===void 0||i?n.clear:e.clear,f=!!u&&{x:ye(u.x,-.5,1.5,.25),y:ye(u.y,-.5,1.5,.3),width:ye(u.width,0,2,.5),height:ye(u.height,0,2,.4),feather:ye(u.feather,.005,1,.12),shape:u.shape==="rect"?"rect":"ellipse",pointer:ye(u.pointer,0,1,0)};return{charset:t,cellSize:ye(e.cellSize,1,96,n.cellSize),cellAspect:ws(e.mark,n.mark,t)?Math.max(1,ye(e.cellAspect,.3,2,n.cellAspect)):ye(e.cellAspect,.3,2,n.cellAspect),cellFit:e.cellFit==="fill"||e.cellFit==="pixel"?e.cellFit:n.cellFit,font:typeof e.font=="string"&&e.font.trim()?e.font:n.font,fontWeight:Math.round(ye(e.fontWeight,100,900,n.fontWeight)),glyphScale:ye(e.glyphScale,.3,1.6,n.glyphScale),mark:On.includes(e.mark)?e.mark:n.mark,dotScale:ye(e.dotScale,.1,1.4,n.dotScale),markAngle:ye(e.markAngle,-360,360,n.markAngle),accents:ye(e.accents,0,.3,n.accents),shuffle:ye(e.shuffle,0,4,n.shuffle),sample:e.sample==="point"||e.sample==="area"||e.sample==="shape"?e.sample:n.sample,linePitch:ye(e.linePitch,.2,4,n.linePitch),lineWeight:ye(e.lineWeight,.2,3,n.lineWeight),sparkle:ye(e.sparkle,0,.05,n.sparkle),textRepeat:e.textRepeat==="row"||e.textRepeat==="flow"?e.textRepeat:n.textRepeat,glyphOrder:e.glyphOrder==="text"||e.glyphOrder==="tone"||e.glyphOrder==="scatter"?e.glyphOrder:n.glyphOrder,color:e.color==="source"||e.color==="ink"?e.color:n.color,ink:na(e.ink,n.ink),highlight:e.highlight==="auto"?"auto":na(e.highlight,n.highlight),ramp:Es(e.ramp,n.ramp),background:e.background==="transparent"?"transparent":na(e.background,n.background),brightness:ye(e.brightness,-1,1,n.brightness),contrast:ye(e.contrast,0,4,n.contrast),gamma:ye(e.gamma,.2,5,n.gamma),invert:typeof e.invert=="boolean"?e.invert:n.invert,levels:e.levels==="none"||e.levels==="auto"?e.levels:n.levels,blend:e.blend==="auto"||e.blend==="coarse"||e.blend==="on"||e.blend==="off"?e.blend:n.blend,saturation:ye(e.saturation,0,3,n.saturation),shade:ye(e.shade,0,1,n.shade),backdrop:ye(e.backdrop,0,1,n.backdrop),fit:e.fit==="contain"||e.fit==="cover"?e.fit:n.fit,focus:{x:ye(e.focus?.x,0,1,n.focus.x),y:ye(e.focus?.y,0,1,n.focus.y)},vignette:ye(e.vignette,0,1,n.vignette),drift:ye(e.drift,0,2,n.drift),scene:c,scale:ye(e.scale,.2,6,n.scale),clear:f,speed:ye(e.speed,0,5,n.speed),hover:gs.some(M=>M.value===e.hover)?e.hover:n.hover,fluid:l,lantern:{radius:ye(e.lantern?.radius,.02,.6,n.lantern.radius),strength:ye(e.lantern?.strength,0,1.5,n.lantern.strength),trail:ye(e.lantern?.trail,0,3,n.lantern.trail),follow:ye(e.lantern?.follow,1,60,n.lantern.follow)},trail:{strength:ye(e.trail?.strength,0,1,n.trail.strength),radius:ye(e.trail?.radius,.1,1,n.trail.radius)},post:{bloom:ye(e.post?.bloom,0,2,n.post.bloom),bloomRadius:ye(e.post?.bloomRadius,.5,8,n.post.bloomRadius),scanlines:ye(e.post?.scanlines,0,1,n.post.scanlines),grain:ye(e.post?.grain,0,1,n.post.grain),chroma:ye(e.post?.chroma,0,1,n.post.chroma),curvature:ye(e.post?.curvature,0,1,n.post.curvature)},scope:e.scope===void 0?n.scope:(h=e.scope,h==="subject"||h==="outside"?h:"all"),tap:e.tap==="ring"||e.tap==="none"||e.tap==="surface"?e.tap:n.tap,maxPixelRatio:ye(e.maxPixelRatio,.5,4,n.maxPixelRatio),respectReducedMotion:typeof e.respectReducedMotion=="boolean"?e.respectReducedMotion:n.respectReducedMotion};var h}function Fi(e,n,t,a,o,l={x:.5,y:.5}){if(!(e>0&&n>0&&t>0&&a>0))return{scale:[1,1],offset:[0,0]};let c=e/n,i=t/a,u=i>c,f=o==="cover"?u?[c/i,1]:[1,i/c]:u?[1,i/c]:[c/i,1];return{scale:f,offset:o==="cover"?[(1-f[0])*l.x,(1-f[1])*l.y]:[.5*(1-f[0]),.5*(1-f[1])]}}function aa(e,n,t,a){let o=Math.max(2,Math.round(e*t)),l=Math.max(2,Math.round(o*n)),c=Math.min(16,Math.max(1,a)),i=Math.ceil(a/c);return{width:l,height:o,columns:c,rows:i,atlasWidth:c*l,atlasHeight:i*o}}function Jr(e){let n=e.replace("#",""),t=n.length===3?n.split("").map(o=>o+o).join(""):n,a=Number.parseInt(t,16);return Number.isFinite(a)&&t.length===6?[(a>>16&255)/255,(a>>8&255)/255,(255&a)/255]:[0,0,0]}function Si(e){let n=new Uint32Array(256),t=0;for(let c=0;c+3<e.length;c+=4)e[c+3]<8||(n[Math.round(.2126*e[c]+.7152*e[c+1]+.0722*e[c+2])]++,t++);if(!t)return[0,1];let a=c=>{let i=0;for(let u=0;u<256;u++)if(i+=n[u],i>=t*c)return u/255;return 1},o=a(.02),l=a(.98);return l-o<.08?[0,1]:[o,l]}var mr=e=>e.hover!=="fluid"||e.fluid?e.hover:"none";function Ts(e,n,t=24,a=.12,o="ellipse"){return e.width>0&&e.height>0&&{x:(n.left-t-e.left)/e.width,y:(n.top-t-e.top)/e.height,width:(n.width+2*t)/e.width,height:(n.height+2*t)/e.height,feather:a,shape:o}}var Tn,ks=/\.(mp4|webm|mov|m4v|ogv)(\?|#|$)/i,Li=/swiftshader|llvmpipe|softpipe|software|basic render/i;function Rs(){if(Tn)return Tn;if(typeof document>"u"||globalThis.WebGL2RenderingContext===void 0)return Tn="none";try{let e=vo();if(e)return Tn=Li.test(e.renderer)?"software":"gpu";let n=document.createElement("canvas").getContext("webgl2");if(!n)return Tn="none";let t=n.getExtension("WEBGL_debug_renderer_info"),a=String(n.getParameter(t?t.UNMASKED_RENDERER_WEBGL:n.RENDERER)??"");return n.getExtension("WEBGL_lose_context")?.loseContext(),Tn=Li.test(a)?"software":"gpu"}catch{return Tn="none"}}var Pi=new WeakMap;function hn(e,n){let t=Pi.get(e);t&&t.length===n.length||Pi.set(e,t=new Float64Array(n.length).fill(NaN));let a=!1;for(let o=0;o<n.length;o++)t[o]!==n[o]&&(a=!0,t[o]=n[o]);return a}var As=[new Float64Array(1),new Float64Array(2),new Float64Array(3),new Float64Array(4)],wr=(e,n,t,a)=>{let o=a!==void 0?4:t!==void 0?3:n!==void 0?2:1,l=As[o-1];return l[0]=e,o>1&&(l[1]=n),o>2&&(l[2]=t),o>3&&(l[3]=a),l},me=(e,n,t)=>{n&&hn(n,wr(t))&&e.uniform1f(n,t)},lt=(e,n,t)=>{n&&hn(n,wr(t))&&e.uniform1i(n,t)},wt=(e,n,t,a)=>{n&&hn(n,wr(t,a))&&e.uniform2f(n,t,a)},sn=(e,n,t,a,o,l)=>{n&&hn(n,wr(t,a,o,l))&&e.uniform4f(n,t,a,o,l)},pr=(e,n,t)=>{n&&hn(n,t)&&e.uniform3fv(n,t)},oo=(e,n,t)=>{n&&hn(n,t)&&e.uniform4fv(n,t)},io=0,Zr={alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance"},yo=(e,n)=>`${e.fontWeight} ${Math.max(1,n.height*e.glyphScale)}px ${e.font}`,Ji=(e,n)=>`${xo(e.charset).join("")}\0${yo(e,n)}\0${n.width}x${n.height}x${n.columns}`;function Zi(e,n,t,a){let o=Math.min(globalThis.devicePixelRatio||1,e.maxPixelRatio,Math.sqrt(8294400/Math.max(1,n*t)));return a<1&&o>1?Math.max(1,o*a):o}var Fs=(e,n,t)=>la(e,n,t),Ss=e=>el(e);function la(e,n,t){let a=un(e.charset),o=document.createElement("canvas");o.width=n.atlasWidth,o.height=n.atlasHeight;let l=o.getContext("2d");l.fillStyle="#fff",l.textAlign="center",l.textBaseline="alphabetic";let c=yo(e,n),i=Math.max(1,n.height*e.glyphScale),u=`${e.fontWeight} ${i}px "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", YuGothic, "Noto Sans JP", "Noto Sans CJK JP", Meiryo, sans-serif, ${e.font}`;l.font=c;let f=l.measureText("M"),h=f.actualBoundingBoxAscent||n.height*e.glyphScale*.7,M=f.actualBoundingBoxDescent||0,b=(n.height+h-M)/2;a.forEach((g,I)=>{let r=I%n.columns*n.width+n.width/2,O=Math.floor(I/n.columns)*n.height+b,Me=Ki(g);if(l.save(),l.beginPath(),l.rect(r-n.width/2,O-b,n.width,n.height),l.clip(),Me){l.font=u;let A=l.measureText(g),D=Math.max(A.width,(A.actualBoundingBoxLeft||0)+(A.actualBoundingBoxRight||0)),K=(A.actualBoundingBoxAscent||.88*i)+(A.actualBoundingBoxDescent||.12*i),se=Math.min(1,.94*n.width/Math.max(1,D),.94*n.height/Math.max(1,K));l.translate(r,Math.floor(I/n.columns)*n.height+n.height/2),l.scale(se,se),l.translate(((A.actualBoundingBoxLeft||0)-(A.actualBoundingBoxRight||0))/2,((A.actualBoundingBoxAscent||.88*i)-(A.actualBoundingBoxDescent||.12*i))/2),l.fillText(g,0,0),l.font=c}else{let A=l.measureText(g).width;l.translate(r,O),A>.96*n.width&&l.scale(.96*n.width/A,1),l.fillText(g,0,0)}l.restore()});let v=!0,d=document.fonts;try{v=!d?.check||d.check(c,a.join(""))}catch{}return t&&queueMicrotask(()=>{o.width=o.height=1}),{image:o,final:v}}function el(e){let n=un(e.charset),t=new Uint8Array(16*n.length),a=aa(60,e.cellAspect,1,n.length);try{let{image:o}=la(e,a,!1),l=o,c=l.width,i=l.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,l.width,l.height).data;l.width=l.height=1,n.forEach((u,f)=>{let h=f%a.columns*a.width,M=Math.floor(f/a.columns)*a.height,b=new Float64Array(15),v=new Float64Array(15),d=0;for(let g=0;g<a.height;g++)for(let I=0;I<a.width;I++){let r=i[4*((M+g)*c+h+I)+3]/255,O=3*Math.min(4,Math.floor(5*g/a.height))+Math.min(2,Math.floor(3*I/a.width));b[O]+=r,v[O]++,d+=r}for(let g=0;g<15;g++)t[16*f+g]=Math.round(255*b[g]/Math.max(1,v[g]));t[16*f+15]=Math.round(255*d/(a.width*a.height))})}catch{}return t}var _i=()=>{};function tl(e,n={}){if(typeof document>"u"||e.ownerDocument!==document)return!1;let t=e.clientWidth,a=e.clientHeight;if(!t||!a)return!1;let o=vo();if(!o||o.lost)return!1;let{clear:l,source:c,interactionTarget:i,onError:u,label:f,...h}=n,M=Mr(h),b=aa(M.cellSize,M.cellAspect,Zi(M,t,a,o.scale),un(M.charset).length),v=Ji(M,b);if(o.hasAtlas(v))return!1;try{o.releaseAtlas(o.atlas(v,()=>la(M,b,!0),_i),_i)}catch{return!1}return!0}function sa(e={}){let n=Rs();return n==="gpu"||n==="software"&&!!e.allowSoftware}function nl(e,n={}){let t=s=>typeof HTMLElement<"u"&&s instanceof HTMLElement,a=s=>{let x=s.clear;return o(x)?{element:null,rest:{...s,clear:!1}}:t(x)?{element:{element:x},rest:{...s,clear:void 0}}:x&&typeof x=="object"&&t(x.element)?{element:x,rest:{...s,clear:void 0}}:{element:null,rest:s}},o=s=>!!s&&typeof s=="object"&&"rects"in s,l=a(n).element,c=o(n.clear)?n.clear:null,i=Mr(a(n).rest),u=n.onError,f=e.ownerDocument,h=!f||typeof document>"u"||f===document,M=n.context??"auto",b=!h||M==="own"||M==="auto"&&io<2&&(()=>{let s=e.clientWidth||0,x=e.clientHeight||0,y=Math.min(globalThis.devicePixelRatio||1,i.maxPixelRatio);return s*x*y*y})()>=921600?e.getContext("webgl2",Zr):null,v=!b&&h?vo():null,d=v?e.getContext("2d",{alpha:!0}):null,g=!(!v||!d),I=g?v.gl:b??e.getContext("webgl2",Zr);if(!I)throw new Error("WebGL2 is not available for the glyph field.");let r=I;g||io++;let O=Wi(r),Me=g?null:r.getContextAttributes(),A=!!Me&&Object.keys(Zr).every(s=>Me[s]===Zr[s]),D=g?null:new Vi(r,()=>{wn()&&Xe()}),K=()=>g?v.frames:D;g&&(s=>{$i.add(s)})(e),e.setAttribute("role","img"),e.setAttribute("aria-label",n.label??"ASCII artwork"),e.dataset.renderer="glyph-field";let se=!1,fe=g?null:r.getExtension("KHR_parallel_shader_compile"),be,U,pe=null,Q=null,_=null,C=null,J=null,Te=[],ve=[],Ae=null,Fe=!1,Ue=null,we=null,de=[],ie=0,k=0,H=1,xe=0,oe=aa(i.cellSize,i.cellAspect,1,2),Le=2,Ie=0,qe=0,Ye=0,ne=null,Jt=!1,Zt=null,ze=0,pt=0,en=0,He=null,_t=0,Ft=0,rt=0,Ct=!0,Xt=0,Dt=[0,1],Ut=-1/0,Yn=-1/0,Sr=!1,wa=(()=>{let s=typeof navigator>"u"?void 0:navigator;return 1e3/(s&&(s.hardwareConcurrency>0&&s.hardwareConcurrency<=2||s.deviceMemory&&s.deviceMemory<=2||s.connection?.saveData)?30:60)-2})(),Kn=new Float32Array(16),gt=!1,qt=0,mn=0,Be=!0,Tt=!1,st=!1,Fn=!1,ct=!1,pn=!0,m=(n.effects??[]).slice(0,4),q=!!n.live,L=[],ue={target:null,at:[-1,-1],presence:0,data:new Float32Array(32)},_e=null,Ce=null,je=1/60,We=0,z=0,ee=[],ge=new Float32Array(16),De=()=>{if(!l)return;let{element:s,padding:x=32,feather:y=.16,shape:w="rect",pointer:E=0}=l,F=Ts(e.getBoundingClientRect(),s.getBoundingClientRect(),x,y,w),p=F&&E>0?{...F,pointer:Math.min(1,Math.max(0,E))}:F,T=i.clear;JSON.stringify(T)!==JSON.stringify(p)&&(i={...i,clear:p},Be=!0)},Se=null,$e=new Uint8Array(0),et=0,tt=0,Qe=!1,kt=null,vt=new Float64Array(0),ht=!0,It=()=>{if(!c)return void(Qe&&(Qe=!1,Be=!0));let s=c.rects,x=typeof s=="function"?s():s;if(x===kt&&!ht)return;kt=x;let y=e.getBoundingClientRect(),[w,E]=(function(T,P,j=256){let B=Math.min(.16666666666666666,j/Math.max(1,T,P));return[Math.max(2,Math.round(T*B)),Math.max(2,Math.round(P*B))]})(y.width,y.height),F=new Float64Array(4*x.length+6);F[0]=y.left,F[1]=y.top,F[2]=y.width,F[3]=y.height,F[4]=c.padding??8,F[5]=c.softness??28,x.forEach((T,P)=>{F[6+4*P]=T.left,F[7+4*P]=T.top,F[8+4*P]=T.width,F[9+4*P]=T.height});let p=!ht&&F.length===vt.length&&F.every((T,P)=>T===vt[P]);ht=!1,p&&Qe||(vt=F,$e=(function(T,P,j,B,R=8,N=28,V=new Uint8Array(j*B)){let W=j*B;if(V.length!==W&&(V=new Uint8Array(W)),V.fill(0),!(P.width>0&&P.height>0&&T.length))return V;let he=j/P.width,le=B/P.height,Pe=Math.max(0,Math.round(N/2.56*he)),G=R+.5*N;for(let X of T){if(!(X.width>0&&X.height>0))continue;let $=Math.max(0,Math.round((X.left-G-P.left)*he)),Ee=Math.min(j,Math.round((X.left+X.width+G-P.left)*he)),ce=Math.max(0,Math.round((X.top-G-P.top)*le)),te=Math.min(B,Math.round((X.top+X.height+G-P.top)*le));for(let Re=ce;Re<te;Re++)V.fill(255,(B-1-Re)*j+$,(B-1-Re)*j+Math.max($,Ee))}if(!Pe)return V;let Y=new Float32Array(Math.max(j,B)),S=new Float32Array(Math.max(j,B)+1),Z=(X,$,Ee)=>{for(let ce=0;ce<3;ce++){for(let te=0;te<X;te++)Y[te]=V[Ee+te*$];S[0]=0;for(let te=0;te<X;te++)S[te+1]=S[te]+Y[te];for(let te=0;te<X;te++){let Re=Math.max(0,te-Pe),Ge=Math.min(X,te+Pe+1);V[Ee+te*$]=Math.round((S[Ge]-S[Re])/(Ge-Re))}}};for(let X=0;X<B;X++)Z(j,1,X*j);for(let X=0;X<j;X++)Z(B,j,X);return V})(x,y,w,E,F[4],F[5],$e),st||(Se??(Se=Ot(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,Se),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),w!==et||E!==tt?r.texImage2D(r.TEXTURE_2D,0,r.R8,w,E,0,r.RED,r.UNSIGNED_BYTE,$e):r.texSubImage2D(r.TEXTURE_2D,0,0,0,w,E,r.RED,r.UNSIGNED_BYTE,$e),r.pixelStorei(r.UNPACK_ALIGNMENT,4),et=w,tt=E,Qe=!0,Be=!0))},Lr=()=>{Be=!0,Xe()},Pr=!1,Qn=()=>{let s=!!c&&typeof c.rects=="function"&&typeof window<"u"&&typeof window.addEventListener=="function";s!==Pr&&(Pr=s,s?window.addEventListener("scroll",Lr,{passive:!0,capture:!0}):window.removeEventListener("scroll",Lr,{capture:!0}))},Jn=s=>s==="lantern"||s==="loupe"||s==="reveal",Ke={target:null,at:null,strength:0,trail:[]},Bt=new Float32Array(36),ot=null,xt=null,tn=!1,re=()=>{if(!ie||!k)return null;let s=ie/k,x=Math.round(s>=1?128:128*s),y=Math.round(s>=1?128/s:128);return ot&&ot.width===x&&ot.height===y||(ot=new hs(x,y),xt||(xt=Ot(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,xt),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,x,y,0,r.RGBA,r.UNSIGNED_BYTE,ot.pixels),tn=!0),ot},Oe=null,ft=null,yt=new Uint8Array(0),Mt=!1,Rt=null,dt=null,gn=-1,nn=[-.5,-.8],rn=[0,0],Zn=()=>{if(Oe&&ne)try{if(dt??(dt=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})),!dt)return;let s=ne instanceof HTMLVideoElement,x=s?Oe.cols>>1:Oe.cols,y=s?Oe.rows>>1:Oe.rows,w=dt.canvas;w.width!==x||w.height!==y?(w.width=x,w.height=y):dt.clearRect(0,0,x,y);let E=ze||1,F=pt||1;dt.drawImage(ne,Nt.offset[0]*E,Nt.offset[1]*F,Nt.scale[0]*E,Nt.scale[1]*F,0,0,x,y),Rt=(function(p,T,P,j,B=p){let R=T*P,N=j?.length===R*fr?j:new Float32Array(R*fr);if(!R)return N;let V=Math.min(T,P),W=new Float32Array(R),he=new Float32Array(R),le=new Float32Array(R),Pe=new Float32Array(R),G=new Float32Array(R),Y=new Float32Array(R);for(let ke=0;ke<R;ke++){let Ne=p[4*ke+3]/255;W[ke]=(.299*p[4*ke]+.587*p[4*ke+1]+.114*p[4*ke+2])/255*Ne}he.set(W),Ze(he,Y,T,P,Math.max(1,Math.round(.012*V))),le.set(W),Ze(le,Y,T,P,Math.max(1,Math.round(.03*V)));for(let ke=0;ke<R;ke++){Pe[ke]=Math.abs(W[ke]-he[ke]);let Ne=Math.max(0,W[ke]-.55)/.45;G[ke]=Ne*Ne}Ze(Pe,Y,T,P,Math.max(1,Math.round(.02*V)));let S=1/Math.max(.02,Pt(Pe,.95));Ze(G,Y,T,P,Math.max(1,Math.round(.05*V)));let Z=1/Math.max(.03,Pt(G,.98)),X=Math.max(1,Math.ceil(Math.sqrt(R/12e3))),$=Math.max(1,Math.floor(T/X)),Ee=Math.max(1,Math.floor(P/X)),ce=$*Ee,te=p,Re=B;if(X>1){let ke=new Uint8ClampedArray(4*ce),Ne=B===p?ke:new Uint8ClampedArray(4*ce);for(let mt=0;mt<Ee;mt++)for(let it=0;it<$;it++){let Lt=[0,0,0,0,0,0,0];for(let bt=mt*X;bt<(mt+1)*X;bt++)for(let Qa=it*X;Qa<(it+1)*X;Qa++){let hi=4*(bt*T+Qa);for(let Wt=0;Wt<4;Wt++)Lt[Wt]+=p[hi+Wt];if(Ne!==ke)for(let Wt=0;Wt<3;Wt++)Lt[4+Wt]+=B[hi+Wt]}let Gt=4*(mt*$+it),ui=X*X;for(let bt=0;bt<4;bt++)ke[Gt+bt]=Lt[bt]/ui;if(Ne!==ke){for(let bt=0;bt<3;bt++)Ne[Gt+bt]=Lt[4+bt]/ui;Ne[Gt+3]=ke[Gt+3]}}te=ke,Re=Ne}$r?.n!==ce&&($r=new fs(ce)),$r.reset();let{depth:Ge,water:Ve,sky:Je,falls:at}=ds(te,Re,$,Ee,$r),At=Pt(Ge,.03),_n=Pt(Ge,.97),Ka=Math.max(.05,_n-At),Cn=0,Dn=0,Ht=0,zr=new Float32Array(R);for(let ke=0;ke<P;ke++)for(let Ne=0;Ne<T;Ne++){let mt=ke*T+Ne,it=mt*fr,Lt=Et((Kr(Ge,$,Ee,Ne,ke,T,P)-At)/Ka);N[it+1]=Lt,N[it+8]=Et(Kr(Ve,$,Ee,Ne,ke,T,P)),N[it+9]=Et(Kr(Je,$,Ee,Ne,ke,T,P)),N[it+10]=Et(Kr(at,$,Ee,Ne,ke,T,P));let Gt=Lt*Lt*Lt*(.25+W[mt]);Cn+=(Ne+.5)/T*Gt,Dn+=(ke+.5)/P*Gt,Ht+=Gt,zr[mt]=Math.hypot(le[ke*T+Math.min(T-1,Ne+1)]-le[ke*T+Math.max(0,Ne-1)],le[Math.min(P-1,ke+1)*T+Ne]-le[Math.max(0,ke-1)*T+Ne])}Cn=Ht>0?Math.max(.3,Math.min(.7,Cn/Ht)):.5,Dn=Ht>0?Math.max(.3,Math.min(.7,Dn/Ht)):.5;let cr=1/Math.max(.004,Pt(zr,.97));for(let ke=0;ke<P;ke++)for(let Ne=0;Ne<T;Ne++){let mt=ke*T+Ne,it=mt*fr,Lt=(le[ke*T+Math.min(T-1,Ne+1)]-le[ke*T+Math.max(0,Ne-1)])*cr,Gt=(le[Math.min(P-1,ke+1)*T+Ne]-le[Math.max(0,ke-1)*T+Ne])*cr;N[it]=le[mt],N[it+2]=Math.min(1,G[mt]*Z),N[it+3]=Math.min(1,Pe[mt]*S),N[it+4]=Math.max(-1,Math.min(1,-Lt)),N[it+5]=Math.max(-1,Math.min(1,-Gt)),N[it+6]=Cn,N[it+7]=Dn}return N})(dt.getImageData(0,0,x,y).data,x,y,Rt),rn[0]=x,rn[1]=y,(function(p,T,P=[-.5,-.8],j=p.cols,B=p.rows){let{cols:R,rows:N,speed:V,damp:W,wall:he}=p,le=fr;if(T.length!==j*B*le)return P;let Pe=0,G=0,Y=0;for(let S=0,Z=0;S<N;S++){let X=Math.min(B-1,S*B/N|0);for(let $=0;$<R;$++,Z++){let Ee=Math.min(j-1,$*j/R|0),ce=(X*j+Ee)*le,te=T[ce+3],Re=T[ce+8],Ge=T[ce+9],Ve=T[ce+2],Je=T[ce+1],at=Ee<j-1?le:0,At=Ee>0?-le:0,_n=X<B-1?j*le:0,Ka=X>0?-j*le:0,Cn=Math.hypot(T[ce+1+at]-T[ce+1+At],T[ce+1+_n]-T[ce+1+Ka]),Dn=Math.hypot(T[ce+4],T[ce+5]),Ht=Math.max(Re,.9*Ge),zr=1-In(.2,.8,te),cr=Math.max(.12,Math.max(Ht,.2+.65*zr)*(1-.45*In(.55,.95,Je)*(1-Re)));V[Z]=cr*cr;let ke=Math.max(0,1-Ht);W[Z]=.9*Re+1.6*Ge*(1-Re)+ke*(1.4+6.5*In(.25,.9,te)),he[Z]=Math.min(.4,.35*In(.12,.35,Cn)*(1-.6*Re)+.1*In(.6,1,Dn)*(1-Ht)),Pe+=($/(R-1)-.5)*Ve,G+=(S/(N-1)-.5)*Ve,Y+=Ve}}if(Ri(V,R,N,2),Ri(W,R,N,1),Y>.5){let S=Math.hypot(Pe,G);S/Y>.02&&(P[0]=Pe/S,P[1]=G/S)}})(Oe,Rt,nn,x,y)}catch{}},Sn=(s,x,y)=>{if(!ie||!k)return;let w=ie/k,E=Math.round(w>=1?128:128*w),F=Math.round(w>=1?128/w:128);Oe&&Oe.cols===E&&Oe.rows===F||(Oe=new ms(E,F),Rt=null,yt=new Uint8Array(E*F*4),ft??(ft=Ot(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,ft),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,E,F,0,r.RGBA,r.UNSIGNED_BYTE,null)),Oe.base=1.1*Math.min(E,F),Oe.mass=0,Oe.calm=7,Oe.fade=1.6,Zn(),gn=rt,Oe.drop(s*(E-1),x*(F-1),y,2.2),Xe()},er=s=>{if(!Oe?.live||!ft)return!!Mt&&(Mt=!1,!0);ne instanceof HTMLVideoElement&&gn!==rt&&(Zn(),gn=rt),Oe.step(s,.45+.55*Math.exp(-Oe.age/.7));let x=Math.min(1,Math.exp(-(Oe.age-.9)/.5));return x<.02?(Oe.clear(),Mt=!1,!0):((function(y,w,E,F,p=1,T=y.cols,P=y.rows){let{cols:j,rows:B,h:R,trace:N}=y,V=p/Math.max(.01,y.front),W=E[0],he=E[1],le=w.length===T*P*11;for(let Pe=0,G=0;Pe<B;Pe++){let Y=Math.min(P-1,Pe*P/B|0);for(let S=0;S<j;S++,G++){let Z=R[G]*V,X=11*(Y*T+Math.min(T-1,S*T/j|0)),$=le?w[X+9]:0,Ee=le?Math.max(w[X+8],.75*(1-In(.1,.45,w[X+3]))*(1-$)):0,ce=Math.max(0,1-Math.max(Ee,$)),te=.5*(R[S<j-1?G+1:G]-R[S>0?G-1:G])*V,Re=.5*(R[Pe<B-1?G+j:G]-R[Pe>0?G-j:G])*V,Ge=(6*-te+(le?.35*w[X+4]:0))*W+(6*-Re+(le?.35*w[X+5]:0))*he,Ve=Math.max(-1,Math.min(1,Ge)),Je=Z>0?Z:.45*Z,at=Ee*(.8*Je+.4*Ve*Math.min(1,4*Math.abs(Z)))+$*(.3*Math.min(1,N[G]*V)+.15*Je)+ce*(.55*Je+.25*Ve*Math.min(1,4*Math.abs(Z))),At=Ee*Math.max(0,Ve)**3*Math.min(1,3*Math.max(0,Z))*.9+ce*Math.max(0,Ve)**4*Math.min(1,3*Math.max(0,Z))*.25;at=Math.max(-1,Math.min(1,at));let _n=Math.round(32767*at+32768);F[4*G]=_n>>>8,F[4*G+1]=255&_n,F[4*G+2]=Math.round(255*Math.min(1,At)),F[4*G+3]=255}}})(Oe,Rt??new Float32Array(0),nn,yt,x,rn[0],rn[1]),r.bindTexture(r.TEXTURE_2D,ft),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texSubImage2D(r.TEXTURE_2D,0,0,0,Oe.cols,Oe.rows,r.RGBA,r.UNSIGNED_BYTE,yt),Mt=!0,!0)},tr=0,nr=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,_r=!!nr?.matches,St=()=>i.respectReducedMotion&&_r,vn,Ol=new Promise(s=>{vn=s}),xn=!0,Ln=s=>u?.(s instanceof Error?s:new Error(String(s))),Co=(s,x)=>{let y=r.createShader(s);return de.push(y),r.shaderSource(y,x),r.compileShader(y),y},rr=s=>{if(g)return v.program(s);we??(we=Co(r.VERTEX_SHADER,`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}`));let x=r.createProgram(),y=Co(r.FRAGMENT_SHADER,s);return r.attachShader(x,we),r.attachShader(x,y),r.linkProgram(x),{program:x,locations:null,fragment:y}},Cr=(s,x=!1)=>{if(s.locations)return!0;if(g)return v.linked(s,x);let{program:y,fragment:w}=s;if(!x&&fe&&!r.getProgramParameter(y,fe.COMPLETION_STATUS_KHR))return!1;if(!r.getProgramParameter(y,r.LINK_STATUS)){if(r.isContextLost())return!1;throw new Error(r.getShaderInfoLog(w)||r.getProgramInfoLog(y)||"Glyph field program failed to link.")}let E={};for(let F=r.getProgramParameter(y,r.ACTIVE_UNIFORMS)-1;F>=0;F--){let p=r.getActiveUniform(y,F).name.replace(/\[0\]$/,"");E[p]=r.getUniformLocation(y,p)}return s.locations=E,!0},Ea=(s=!1)=>{if(!pe||!Q)return!1;try{if(!Cr(pe,s))return!1}catch(x){if(!m.length)throw x;let y=m.map(w=>w.name).join(", ");return Na([]),Ur(),Ln(new Error(`Field effects (${y}) did not compile, so the field draws without them. ${x instanceof Error?x.message:String(x)}`)),!1}return Cr(Q,s)},Ot=s=>{let x=r.createTexture();return r.bindTexture(r.TEXTURE_2D,x),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,s===r.LINEAR_MIPMAP_LINEAR?r.LINEAR:s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),x},Ta=()=>{J&&(r.deleteTexture(J.ink),r.deleteTexture(J.under),r.deleteFramebuffer(J.buffer),J.glow&&r.deleteTexture(J.glow),J=null)},Do=()=>(function(s,x,y,w,E,F,p){if(s!=="fill"||!(E>0&&F>0))return[p.width,p.height];let T=x*w,P=T*y;return[E/Math.max(1,Math.floor(E/P+1e-6)),F/Math.max(1,Math.floor(F/T+1e-6))]})(i.cellFit,i.cellSize,i.cellAspect,H,ie,k,oe),ka=()=>!!i.fluid&&mr(i)==="fluid",Ra=()=>{Ae?.release(),Fe=!1,Te.forEach(s=>r.deleteTexture(s)),ve.forEach(s=>r.deleteFramebuffer(s)),Te=[],ve=[]};function Uo(){_&&!g&&r.deleteProgram(_.program),_=rr((s=>`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uPrevious;
uniform vec2 uSize;
uniform float uAspect, uDt, uDecay, uEnergyDecay, uRadius, uSplat;
uniform vec2 uFrom, uTo, uForce;
out vec4 outColor;
${Ui(s)}
float segment(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-8),0.,1.);return length(pa-ba*h);}
void main(){
  vec2 uv=gl_FragCoord.xy/uSize;
  vec4 here=decodeFluid(texture(uPrevious,uv));
  vec4 state=decodeFluid(texture(uPrevious,uv-uDt*here.xy*vec2(1./uAspect,1.)));
  state.xy*=exp(-uDt*uDecay);
  state.z*=exp(-uDt*uEnergyDecay);
  if(uSplat>.5){
    vec2 scale=vec2(uAspect,1.);
    float d=segment(uv*scale,uFrom*scale,uTo*scale);
    float g=exp(-d*d/(uRadius*uRadius));
    state.xy+=uForce*g;
    state.z=min(1.,state.z+g*min(1.,length(uForce)*.5+.08));
  }
  float speed=length(state.xy);
  if(speed>5.)state.xy*=5./speed;
  outColor=encodeFluid(state);
}`)(se)),g?Ae?.release():Ae?.dispose(),Ae=se?null:(function(s,x,y){let w={splat:x(jl),curl:x($l),vorticity:x(Yl),divergence:x(Kl),fade:x(Ql),pressure:x(Jl),gradient:x(Zl),advect:x(es)},E=Object.values(w),F=0,p=0,T=[],P=[],j=null,B=null,R=G=>{let Y=s.createTexture();s.bindTexture(s.TEXTURE_2D,Y),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,G),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,G),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),s.texImage2D(s.TEXTURE_2D,0,s.RGBA16F,F,p,0,s.RGBA,s.HALF_FLOAT,null);let S=s.createFramebuffer();return s.bindFramebuffer(s.FRAMEBUFFER,S),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Y,0),s.checkFramebufferStatus(s.FRAMEBUFFER)!==s.FRAMEBUFFER_COMPLETE?(s.deleteFramebuffer(S),s.deleteTexture(Y),null):(s.viewport(0,0,F,p),s.clearColor(0,0,0,1),s.clear(s.COLOR_BUFFER_BIT),{texture:Y,buffer:S})},N=G=>{G&&(s.deleteTexture(G.texture),s.deleteFramebuffer(G.buffer))},V=()=>{[...T,...P,j,B].forEach(N),T=[],P=[],j=B=null},W=(G,Y)=>{let S=G.locations;return s.useProgram(G.program),s.bindFramebuffer(s.FRAMEBUFFER,Y.buffer),s.uniform2f(S.uTexel,1/F,1/p),S},he=(G,Y,S,Z)=>{s.activeTexture(s.TEXTURE0+S),s.bindTexture(s.TEXTURE_2D,Z),s.uniform1i(G[Y],S)},le=()=>s.drawArrays(s.TRIANGLES,0,3),Pe=G=>{let Y=G[0];G[0]=G[1],G[1]=Y};return{resize(G,Y){V(),F=G,p=Y;let S=[R(s.LINEAR),R(s.LINEAR),R(s.NEAREST),R(s.NEAREST),R(s.NEAREST),R(s.NEAREST)];return s.bindFramebuffer(s.FRAMEBUFFER,null),S.some(Z=>!Z)?(S.forEach(N),!1):(T=[S[0],S[1]],P=[S[2],S[3]],j=S[4],B=S[5],!0)},ready:()=>E.every(y),step(G,Y){if(!T.length||!j||!B)return;let S;s.viewport(0,0,F,p),G&&(S=W(w.splat,T[1]),he(S,"uVelocity",0,T[0].texture),s.uniform2f(S.uFrom,G.from[0],G.from[1]),s.uniform2f(S.uTo,G.to[0],G.to[1]),s.uniform2f(S.uForce,G.force[0],G.force[1]),s.uniform1f(S.uAspect,Y.aspect),s.uniform1f(S.uRadius,Y.radius),le(),Pe(T)),Y.curl>0&&(S=W(w.curl,B),he(S,"uVelocity",0,T[0].texture),le(),S=W(w.vorticity,T[1]),he(S,"uVelocity",0,T[0].texture),he(S,"uCurl",1,B.texture),s.uniform1f(S.uStrength,Y.curl),s.uniform1f(S.uDt,Y.dt),le(),Pe(T)),S=W(w.divergence,j),he(S,"uVelocity",0,T[0].texture),le(),S=W(w.fade,P[1]),he(S,"uSource",0,P[0].texture),s.uniform1f(S.uAmount,.8),le(),Pe(P);for(let Z=0;Z<20;Z++)S=W(w.pressure,P[1]),he(S,"uPressure",0,P[0].texture),he(S,"uDivergence",1,j.texture),le(),Pe(P);S=W(w.gradient,T[1]),he(S,"uPressure",0,P[0].texture),he(S,"uVelocity",1,T[0].texture),le(),Pe(T),S=W(w.advect,T[1]),he(S,"uVelocity",0,T[0].texture),s.uniform1f(S.uDt,Y.dt),s.uniform1f(S.uDissipation,Y.dissipation),le(),Pe(T),s.bindFramebuffer(s.FRAMEBUFFER,null)},get velocity(){return T[0]?.texture??null},get size(){return[F,p]},release:V,dispose(){V(),E.forEach(({program:G})=>s.deleteProgram(G))}}})(r,rr,s=>Cr(s))}let Io=()=>{Ra();let s=i.fluid;if(!(s&&ka()&&ie&&k))return;_||Uo();let x=s.resolution,y=ie/k;if(Ie=y>=1?x:Math.max(8,Math.round(x*y)),qe=y>=1?Math.max(8,Math.round(x/y)):x,Fe=!!Ae&&Ae.resize(Ie,qe),Fe)return void(Ye=0);let w=()=>{Ra();for(let E=0;E<2;E++){let F=Ot(r.LINEAR);r.texImage2D(r.TEXTURE_2D,0,se?r.RGBA8:r.RGBA16F,Ie,qe,0,r.RGBA,se?r.UNSIGNED_BYTE:r.HALF_FLOAT,null);let p=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,p),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,F,0),Te.push(F),ve.push(p)}return r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE};if(!w()){if(se)throw new Error("The glyph field could not allocate its fluid buffers.");se=!0,Ur(),Uo(),w()}for(let E of ve)r.bindFramebuffer(r.FRAMEBUFFER,E),r.viewport(0,0,Ie,qe),r.clearColor(se?.5:0,se?.5:0,0,1),r.clear(r.COLOR_BUFFER_BIT);r.bindFramebuffer(r.FRAMEBUFFER,null),Ye=0},Dr=-1,ar=!1,Aa=s=>s.post.bloom>0||s.post.scanlines>0||s.post.grain>0||s.post.chroma>0||s.post.curvature>0;function Ur(){pe&&!g&&r.deleteProgram(pe.program),Q&&!g&&r.deleteProgram(Q.program),Ta(),pe=rr(Ii(se,m)),Dr=On.indexOf(i.mark),ar=Aa(i),Q=rr(so(Dr,ar)),(g?v.canCompileInParallel:fe)||Ea(!0)}let Bo=()=>yo(i,oe),Fa=()=>{Be=!0,Xe()},Sa=()=>Ji(i,oe),La=()=>{if(Le=un(i.charset).length,oe=aa(i.cellSize,i.cellAspect,H,Le),xe=H,g){let y=Sa();if(C?.key!==y){let w=C;C=v.atlas(y,Pa,Fa),v.releaseAtlas(w,Fa),be=C.texture}return void(Be=!0)}let{image:x}=Pa();r.bindTexture(r.TEXTURE_2D,be),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,x),typeof x.getContext=="function"&&(x.width=x.height=1),Be=!0};function Pa(){return Fs(i,oe,g)}let Oo=typeof document>"u"?void 0:document.fonts,_a=()=>{if(!Oo?.load)return;let s=Bo();Oo.load(s,un(i.charset).join("")).then(()=>{if(!Tt&&!st&&Bo()===s){if(Or++,!g)return La(),void Xe();C&&!C.final&&C.key===Sa()&&v.paintAtlas(C,Pa)}},()=>{})},No=s=>s.trim().replace(/^["']|["']$/g,"").toLowerCase(),Ca=()=>{if(Dt=[0,1],Gr=!1,ne&&i.levels!=="none")try{let s=document.createElement("canvas");s.width=s.height=64;let x=s.getContext("2d",{willReadFrequently:!0});ne===He&&(x.imageSmoothingQuality="medium"),x.drawImage(ne,0,0,64,64),Dt=Si(x.getImageData(0,0,64,64).data)}catch{Dt=[0,1]}},yn=null,Ir=null,Pn=!1,an=-1/0,Br=new Uint8Array(0),Mn=null,Da=()=>{if(Pn=!1,ir=!1,!ne||i.scope==="all")return;let s=ze||1,x=pt||1,y=Math.max(8,Math.round(s>=x?96:96*s/x)),w=Math.max(8,Math.round(x>=s?96:96*x/s));try{if(Mn??(Mn=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})),!Mn)return;let E=Mn.canvas;E.width!==y||E.height!==w?(E.width=y,E.height=w):Mn.clearRect(0,0,y,w),Mn.drawImage(ne,0,0,y,w),Go(Mn.getImageData(0,0,y,w).data,y,w)}catch{return}},Go=(s,x,y)=>{if(Pn=!1,ir=!1,ne&&i.scope!=="all"&&(Ir=Qi(s,x,y,null,Ir),Ir.key!=="none")){Br.length!==x*y*4&&(Br=new Uint8Array(x*y*4));for(let w=0;w<x*y;w++)Br[4*w+3]=Math.round(255*Ir.subject[w]);yn??(yn=Ot(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,yn),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,x,y,0,r.RGBA,r.UNSIGNED_BYTE,Br),Pn=!0}},zt,on=null,Ua="",Or=0,Ia="",Xo=null,qo=null,zo=-1,ln=!1,bn=null,or={levels:!1,scope:!1},Nr=0,Ba=-1/0,Gr=!1,ir=!1,Ho=null,Wo=0,Vo=0,lr=()=>{if(!ne)return;let s=performance.now(),x=ne instanceof HTMLVideoElement||q;x&&zt===void 0&&(zt=(function(p){if(!p.getExtension("EXT_color_buffer_float")||!p.getExtension("EXT_float_blend"))return null;let T=($,Ee=`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}`)=>{let ce=(Je,at)=>{let At=p.createShader(Je);return p.shaderSource(At,at),p.compileShader(At),At},te=p.createProgram(),Re=ce(p.VERTEX_SHADER,Ee),Ge=ce(p.FRAGMENT_SHADER,$);if(p.attachShader(te,Re),p.attachShader(te,Ge),p.linkProgram(te),p.deleteShader(Re),p.deleteShader(Ge),!p.getProgramParameter(te,p.LINK_STATUS))return p.deleteProgram(te),null;let Ve=new Map;return{program:te,at:Je=>(Ve.has(Je)||Ve.set(Je,p.getUniformLocation(te,Je)),Ve.get(Je))}},P=Za.get(p);P||Za.set(p,P=new Map);let j=P,B=($,Ee)=>{let ce=j.get($);if(ce)return ce;let te=Ee();if(!te)throw new Error("The glyph field could not build its GPU measure.");return j.set($,te),te},R=[],N=($,Ee,ce,te)=>{let Re=p.createTexture(),Ge=p.createFramebuffer();p.bindTexture(p.TEXTURE_2D,Re);for(let[Je,at]of[[p.TEXTURE_MIN_FILTER,te],[p.TEXTURE_MAG_FILTER,te],[p.TEXTURE_WRAP_S,p.CLAMP_TO_EDGE],[p.TEXTURE_WRAP_T,p.CLAMP_TO_EDGE]])p.texParameteri(p.TEXTURE_2D,Je,at);let Ve={texture:Re,buffer:Ge,width:0,height:0,format:$,type:Ee,base:ce};return R.push(Ve),Ve},V=($,Ee,ce)=>{let te=$;$.width===Ee&&$.height===ce||($.width=Ee,$.height=ce,p.bindTexture(p.TEXTURE_2D,$.texture),p.texImage2D(p.TEXTURE_2D,0,te.format,Ee,ce,0,te.base,te.type,null),p.bindFramebuffer(p.FRAMEBUFFER,$.buffer),p.framebufferTexture2D(p.FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,$.texture,0))},W=null,he=null,le=null,Pe=null,G=null,Y=null,S=p.createVertexArray(),Z=($,Ee)=>{p.bindFramebuffer(p.FRAMEBUFFER,Ee.buffer),p.viewport(0,0,Ee.width,Ee.height),p.useProgram($.program)},X=($,Ee,ce)=>{p.activeTexture(p.TEXTURE11),p.bindTexture(p.TEXTURE_2D,$),p.uniform1i(Ee.at(ce),11)};return{get levels(){return he?.texture??null},get scope(){return Y?.texture??null},measureLevels($,Ee,ce){let te=Ja(Ee,ce,128),Re=B("histogram",()=>T(`#version 300 es
precision highp float;
out vec4 o;
void main(){ o=vec4(1.); }`,`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uSource;
uniform int uLevel, uWidth;
void main(){
  vec4 c=texelFetch(uSource,ivec2(gl_VertexID%uWidth,gl_VertexID/uWidth),uLevel);
  float bin=floor(dot(c.rgb,vec3(.2126,.7152,.0722))*255.+.5);
  gl_Position=c.a*255.<8.?vec4(2.,2.,0.,1.):vec4((bin+.5)/128.-1.,0.,0.,1.);
  gl_PointSize=1.;
}`)),Ge=B("levels",()=>T(`#version 300 es
precision highp float;
uniform sampler2D uHistogram;
out vec4 o;
void main(){
  float count=0.;
  for(int v=0;v<256;v++)count+=texelFetch(uHistogram,ivec2(v,0),0).r;
  if(count<.5){o=vec4(0.,1.,0.,1.);return;}
  float low=1.,high=1.,seen=0.;bool lowFound=false;
  for(int v=0;v<256;v++){
    seen+=texelFetch(uHistogram,ivec2(v,0),0).r;
    if(!lowFound&&seen>=count*.02){low=float(v)/255.;lowFound=true;}
    if(seen>=count*.98){high=float(v)/255.;break;}
  }
  o=high-low<.08?vec4(0.,1.,0.,1.):vec4(low,high,0.,1.);
}`));W??(W=N(p.R32F,p.FLOAT,p.RED,p.NEAREST)),he??(he=N(p.RGBA32F,p.FLOAT,p.RGBA,p.NEAREST)),V(W,256,1),V(he,1,1),Z(Re,W),p.clearColor(0,0,0,0),p.clear(p.COLOR_BUFFER_BIT),X($,Re,"uSource"),p.uniform1i(Re.at("uLevel"),te.level),p.uniform1i(Re.at("uWidth"),te.width),p.enable(p.BLEND),p.blendFunc(p.ONE,p.ONE),p.bindVertexArray(S),p.drawArrays(p.POINTS,0,te.width*te.height),p.disable(p.BLEND),Z(Ge,he),X(W.texture,Ge,"uHistogram"),p.drawArrays(p.TRIANGLES,0,3)},measureScope($,Ee,ce){let te=Ja(Ee,ce,128),Re=Math.min(128,te.width),Ge=Math.min(128,te.height),Ve=B("stats",()=>T(ts)),Je=B("subject",()=>T(ns)),at=B("blur",()=>T(`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform ivec2 uStep;
uniform int uRadius;
out vec4 o;
void main(){
  ivec2 at=ivec2(gl_FragCoord.xy),last=textureSize(uImage,0)-1;
  float sum=0.,total=0.;
  for(int k=-16;k<=16;k++){
    if(k<-2*uRadius||k>2*uRadius)continue;
    float w=float(2*uRadius+1-abs(k));
    sum+=texelFetch(uImage,clamp(at+uStep*k,ivec2(0),last),0).a*w;total+=w;
  }
  o=vec4(texelFetch(uImage,at,0).r,0.,0.,sum/total);
}`));le??(le=N(p.RGBA32F,p.FLOAT,p.RGBA,p.NEAREST)),Pe??(Pe=N(p.RGBA8,p.UNSIGNED_BYTE,p.RGBA,p.NEAREST)),G??(G=N(p.RGBA8,p.UNSIGNED_BYTE,p.RGBA,p.NEAREST)),Y??(Y=N(p.RGBA8,p.UNSIGNED_BYTE,p.RGBA,p.LINEAR)),V(le,1,1),V(Pe,Re,Ge),V(G,Re,Ge),V(Y,Re,Ge),p.bindVertexArray(S),Z(Ve,le),X($,Ve,"uSource"),p.uniform1i(Ve.at("uLevel"),te.level),p.uniform2i(Ve.at("uSize"),Re,Ge),p.drawArrays(p.TRIANGLES,0,3),Z(Je,Pe),X($,Je,"uSource"),p.uniform1i(Je.at("uLevel"),te.level),p.activeTexture(p.TEXTURE12),p.bindTexture(p.TEXTURE_2D,le.texture),p.uniform1i(Je.at("uStats"),12),p.drawArrays(p.TRIANGLES,0,3);let At=Math.min(8,Math.max(1,Math.round(.02*Math.min(Re,Ge))));Z(at,G),X(Pe.texture,at,"uImage"),p.uniform2i(at.at("uStep"),1,0),p.uniform1i(at.at("uRadius"),At),p.drawArrays(p.TRIANGLES,0,3),Z(at,Y),X(G.texture,at,"uImage"),p.uniform2i(at.at("uStep"),0,1),p.drawArrays(p.TRIANGLES,0,3)},dispose(){for(let $ of R)p.deleteTexture($.texture),p.deleteFramebuffer($.buffer);S&&p.deleteVertexArray(S),R.length=0,W=he=le=Pe=G=Y=null}}})(r));let y=x&&!!zt;x&&!y&&(()=>{let p=bn?.poll();p&&(or.levels&&i.levels!=="none"&&(Dt=Si(p.data)),or.scope&&Go(p.data,p.width,p.height),(or.levels||or.scope)&&(Be=!0))})(),Nr++;let w=Nr-Ba>=8,E=x&&Ut!==-1/0?s-Ut>1500&&w&&i.levels!=="none"?"later":null:"now",F=x&&an!==-1/0?s-an>160&&w&&i.scope!=="all"&&i.hover!=="none"?"later":null:"now";y||E!=="now"||(Ca(),Ut=s),y||F!=="now"||(Da(),an=s),r.bindTexture(r.TEXTURE_2D,U),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1);try{let p=ne,T=p.videoWidth||p.naturalWidth||p.width,P=p.videoHeight||p.naturalHeight||p.height;if(Ho===U&&Wo===T&&Vo===P&&T&&P?r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,ne):(r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,ne),Ho=U,Wo=T,Vo=P),x?ln=!0:(r.generateMipmap(r.TEXTURE_2D),ln=!1),Ft=T*P*4*4/3,y){let R=!!E&&i.levels!=="none",N=!!F&&i.scope!=="all"&&i.hover!=="none";return(R||N)&&(ln&&(r.generateMipmap(r.TEXTURE_2D),ln=!1),R&&(zt.measureLevels(U,T,P),Gr=!0),N&&(zt.measureScope(U,T,P),ir=!0,Pn=!0),Ba=Nr,Be=!0),E&&(Ut=s),void(F&&(an=s))}let j=E==="later",B=F==="later";!j&&!B||bn?.pending||(bn??(bn=(function(R){let N=null,V=null,W=null,he=0,le=0,Pe=0,G=!1,Y=null,S=-1;return{get pending(){return!!W},request(Z,X,$,Ee){if(W||G||!X||!$)return!1;let ce=Ja(X,$,Ee);try{N??(N=R.createFramebuffer()),V??(V=R.createBuffer());let te=R.getParameter(R.FRAMEBUFFER_BINDING);if(R.bindFramebuffer(R.FRAMEBUFFER,N),R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Z,ce.level),Y!==Z||S!==ce.level){if(R.checkFramebufferStatus(R.FRAMEBUFFER)!==R.FRAMEBUFFER_COMPLETE)return R.bindFramebuffer(R.FRAMEBUFFER,te),G=!0,!1;Y=Z,S=ce.level}let Re=ce.width*ce.height*4;return R.bindBuffer(R.PIXEL_PACK_BUFFER,V),Re!==he&&(R.bufferData(R.PIXEL_PACK_BUFFER,Re,R.STREAM_READ),he=Re),R.pixelStorei(R.PACK_ALIGNMENT,4),R.readPixels(0,0,ce.width,ce.height,R.RGBA,R.UNSIGNED_BYTE,0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,null,0),R.bindFramebuffer(R.FRAMEBUFFER,te),W=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0),R.flush(),le=ce.width,Pe=ce.height,!!W}catch{return G=!0,!1}},poll(){if(!W)return null;let Z=R.clientWaitSync(W,0,0);if(Z!==R.ALREADY_SIGNALED&&Z!==R.CONDITION_SATISFIED)return Z===R.WAIT_FAILED&&(R.deleteSync(W),W=null,G=!0),null;R.deleteSync(W),W=null;let X=new Uint8Array(le*Pe*4);return R.bindBuffer(R.PIXEL_PACK_BUFFER,V),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,X),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),{data:X,width:le,height:Pe}},dispose(){W&&R.deleteSync(W),N&&R.deleteFramebuffer(N),V&&R.deleteBuffer(V),W=N=V=null}}})(r)),ln&&(r.generateMipmap(r.TEXTURE_2D),ln=!1),bn.request(U,T,P,128)?(or={levels:j,scope:B},Ba=Nr,j&&(Ut=s),B&&(an=s)):(j&&(Ca(),Ut=s),B&&(Da(),an=s)))}catch(p){Ln(p)}},jo=()=>{bn=null,on=null,Ua="",se=!r.getExtension("EXT_color_buffer_float")&&!r.getExtension("EXT_color_buffer_half_float"),Ur(),Ue=g?v.vertexArray():r.createVertexArray(),g||(be=Ot(r.NEAREST)),U=Ot(r.LINEAR_MIPMAP_LINEAR),r.bindTexture(r.TEXTURE_2D,U),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,1,1,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),r.generateMipmap(r.TEXTURE_2D),ie=k=0,xe=0,wn(),_a(),ne&&lr()};function wn(){let s=e.clientWidth||e.clientHeight?{width:e.clientWidth,height:e.clientHeight}:e.getBoundingClientRect();Sr=!s.width||!s.height;let x=Zi(i,s.width,s.height,K().scale),y=Math.max(1,Math.round(s.width*x)),w=Math.max(1,Math.round(s.height*x));if(y===ie&&w===k&&x===H)return!1;let E=!ie||Math.abs(y/w-ie/k)>.01;return H=x,ie=y,k=w,e.width=ie,e.height=k,xe!==H&&La(),(E||ka()&&!Te.length&&!Fe)&&Io(),Be=!0,!0}let $o=null,Xr=new Float32Array(18),sr=[0,0,0],Yo=[1,1,1],Ko=[0,0,0,0],Nt=Fi(1,1,1,1,"cover"),Qo=null,Jo=0,Zo=0,ei=0,ti=0,ni=()=>{$o!==i&&($o=i,sr=Jr(i.ink),Yo=Jr(i.highlight==="auto"?"#ffffff":i.highlight),Ko=i.background==="transparent"?[0,0,0,0]:[...Jr(i.background),1],Xr.fill(0),i.ramp.forEach((Y,S)=>Xr.set(Jr(Y),3*S))),Qo===i&&Jo===ie&&Zo===k&&ei===ze&&ti===pt||(Qo=i,Jo=ie,Zo=k,ei=ze,ti=pt,Nt=Fi(ie,k,ze||1,pt||1,i.fit,i.focus)),g?v.begin(ie,k):D.begin();let s=i.fluid,x=ne&&_t?oe.height/k*_t*Nt.scale[1]:1,y=i.sample==="point"?0:Math.max(0,Math.log2(Math.max(1,x))-.5);ln&&ne&&(y>0||i.backdrop>0)&&(r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,U),r.generateMipmap(r.TEXTURE_2D),ln=!1);let w=(()=>{let[Y,S]=Do(),Z=Math.ceil(ie/Y-1e-4),X=Math.ceil(k/S-1e-4),$=i.post.bloom>0;if(J&&J.columns===Z&&J.rows===X&&!!J.glow===$)return J;Ta();let Ee=()=>{let Ve=Ot(r.NEAREST);return r.texStorage2D(r.TEXTURE_2D,1,se?r.RGBA8:r.RGBA16F,Z,X),Ve},ce=Ee(),te=Ee(),Re=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,Re),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ce,0),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT1,r.TEXTURE_2D,te,0);let Ge=null;return $&&(Ge=Ot(r.LINEAR_MIPMAP_LINEAR),r.texStorage2D(r.TEXTURE_2D,Math.floor(Math.log2(Math.max(Z,X)))+1,r.RGBA8,Z,X),r.bindFramebuffer(r.FRAMEBUFFER,Re),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT2,r.TEXTURE_2D,Ge,0)),r.drawBuffers(Ge?[r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1,r.COLOR_ATTACHMENT2]:[r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),J={ink:ce,under:te,glow:Ge,buffer:Re,columns:Z,rows:X}})(),E=pe.locations,F=Q.locations,p=mr(i),T=!St();r.bindFramebuffer(r.FRAMEBUFFER,w.buffer),r.viewport(0,0,w.columns,w.rows),r.useProgram(pe.program),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,U),lt(r,E.uSource,0),r.activeTexture(r.TEXTURE2),r.bindTexture(r.TEXTURE_2D,(Fe?Ae?.velocity:Te[Ye])??U),lt(r,E.uFluid,2),r.activeTexture(r.TEXTURE3),r.bindTexture(r.TEXTURE_2D,xt??U),lt(r,E.uTrailMap,3),r.activeTexture(r.TEXTURE6),r.bindTexture(r.TEXTURE_2D,(ir?zt?.scope:yn)??U),lt(r,E.uScope,6);let P=Gr&&ne&&i.levels==="auto"?zt?.levels??null:null;r.activeTexture(r.TEXTURE11),r.bindTexture(r.TEXTURE_2D,P??U),lt(r,E.uLevelMap,11),me(r,E.uLevelsFromMap,P?1:0),r.activeTexture(r.TEXTURE7),r.bindTexture(r.TEXTURE_2D,ft??U),lt(r,E.uTapMap,7),me(r,E.uTapOn,Mt&&ne&&Jt?1:0),me(r,E.uScopeMode,Pn&&i.scope!=="all"?i.scope==="subject"?1:2:0),me(r,E.uFluidMode,Fe?1:0),lt(r,E.uHoverMode,p==="fluid"?1:p==="lantern"?2:p==="trail"&&tn?3:p==="loupe"?4:p==="reveal"?5:0),me(r,E.uTrailAmount,i.trail.strength),((Y,S,Z,X,$)=>{S&&hn(S,wr(Z,X,$))&&Y.uniform3f(S,Z,X,$)})(r,E.uLight,Ke.at?.[0]??-1,Ke.at?.[1]??-1,Jn(p)?Ke.strength:0),pr(r,E.uTrail,Bt),me(r,E.uLightRadius,i.lantern.radius),me(r,E.uLightGain,i.lantern.strength),me(r,E.uClock,performance.now()/1e3),me(r,E.uFlicker,T?1:0),wt(r,E.uFluidTexel,1/Math.max(1,Ie),1/Math.max(1,qe)),wt(r,E.uResolution,ie,k);let[j,B]=Do();var R;wt(r,E.uCell,j,B),me(r,E.uCount,Le),me(r,E.uBlend,i.blend==="on"||Le<=9&&(i.blend==="coarse"||i.blend==="auto"&&Jt)?1:0),sn(r,E.uSourceMap,Nt.scale[0],Nt.scale[1],Nt.offset[0],Nt.offset[1]),lt(r,E.uScene,ne?0:(R=i.scene,Wl[R]??3)),lt(r,E.uMark,On.indexOf(i.mark)),me(r,E.uOrder,i.glyphOrder==="text"?1:i.glyphOrder==="scatter"&&i.mark==="glyph"?2:0);let N=i.sample==="shape"&&!!ne&&i.mark==="glyph"&&i.glyphOrder!=="text"&&i.glyphOrder!=="scatter"&&oe.height>=8;if(N&&(Xo===i&&qo===oe&&zo===Or||(Xo=i,qo=oe,zo=Or,Ia=`${Sa()}|${Or}`),Ua!==Ia||!on)){Ua=Ia;let Y=Ss(i);r.activeTexture(r.TEXTURE9),on??(on=Ot(r.NEAREST)),r.bindTexture(r.TEXTURE_2D,on),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.texImage2D(r.TEXTURE_2D,0,r.R8,16,Math.max(1,Y.length/16),0,r.RED,r.UNSIGNED_BYTE,Y),r.pixelStorei(r.UNPACK_ALIGNMENT,4)}r.activeTexture(r.TEXTURE9),r.bindTexture(r.TEXTURE_2D,N&&on||U),lt(r,E.uShapes,9),me(r,E.uShapeOn,N?1:0),me(r,E.uShapeLod,Math.max(0,Math.log2(Math.max(1,x/5))-.5)),me(r,E.uShapeTone,20),me(r,E.uShapeWindow,3),me(r,E.uShapeGate,.15);let V=i.glyphOrder==="text"&&i.textRepeat==="row"?(function(Y){let S=un(Y),Z=[];for(let X=0;X<S.length&&Z.length<16;){if(!S[X].trim()){X++;continue}let $=X;for(;X<S.length&&S[X].trim();)X++;Z.push($,X-$)}return Z})(i.charset):[];Kn.fill(0),Kn.set(V),((Y,S,Z)=>{S&&hn(S,Z)&&Y.uniform2fv(S,Z)})(r,E.uWords,Kn),me(r,E.uWordCount,V.length/2),me(r,E.uScale,i.scale);let W=i.clear;sn(r,E.uClear,W?W.x:0,W?W.y:0,W?W.width:0,W?W.height:0),me(r,E.uClearFeather,W?W.feather:.1),me(r,E.uClearShape,W&&W.shape==="rect"?1:0),me(r,E.uClearPointer,W?W.pointer??0:0),r.activeTexture(r.TEXTURE8),r.bindTexture(r.TEXTURE_2D,Se??U),lt(r,E.uClearMap,8);let he=Qe&&!!c&&!!Se;me(r,E.uClearMapOn,he?Math.min(1,Math.max(0,c.strength??.85)):0),me(r,E.uClearBend,he?.035*Math.min(1,Math.max(0,c.bend??.5)):0),wt(r,E.uClearTexel,1/Math.max(1,et),1/Math.max(1,tt));let le=performance.now();ge.fill(0);for(let Y=0;Y<ee.length;Y++){let S=ee[Y],Z=4*Y;ge[Z]=S.x,ge[Z+1]=S.y,ge[Z+2]=(le-S.born)/1e3,ge[Z+3]=S.strength}var Pe;oo(r,E.uPulse,ge),pr(r,E.uInk,sr),pr(r,E.uRamp,Xr),me(r,E.uRampCount,i.color==="source"?0:i.ramp.length),pr(r,E.uHighlight,Yo),me(r,E.uHighlightAuto,i.highlight==="auto"?1:0),oo(r,E.uBackground,Ko),me(r,E.uBrightness,i.brightness),me(r,E.uContrast,i.contrast),me(r,E.uGamma,i.gamma),me(r,E.uInvert,i.invert?1:0),me(r,E.uVignette,i.vignette),me(r,E.uSourceColor,i.color==="source"?1:0),me(r,E.uRefraction,s?s.refraction*(T?1:.25):0),me(r,E.uGlow,s?s.glow:0),me(r,E.uTime,mn),me(r,E.uDrift,T?i.drift:0),me(r,E.uFluidOn,s&&p==="fluid"&&(Te.length||Fe)?1:0),me(r,E.uLod,y),me(r,E.uSaturation,i.saturation),me(r,E.uShade,i.shade),me(r,E.uBackdrop,ne?i.backdrop:0),wt(r,E.uLevels,ne&&i.levels==="auto"?Dt[0]:0,ne&&i.levels==="auto"?Dt[1]:1),m.length&&(Pe=pe.locations,oo(r,Pe.uFx,(function(Y,S=new Float32Array(32)){return S.fill(0),Y.slice(0,4).forEach((Z,X)=>{lo(Z).forEach(($,Ee)=>{S[8*X+Ee]=Z.params[$]})}),S})(m,ue.data)),sn(r,Pe.uFxPointer,ue.at[0],ue.at[1],ue.presence,St()?0:1),me(r,Pe.uFxTime,mn)),r.bindVertexArray(Ue),r.drawArrays(r.TRIANGLES,0,3),w.glow&&(r.activeTexture(r.TEXTURE10),r.bindTexture(r.TEXTURE_2D,w.glow),r.generateMipmap(r.TEXTURE_2D)),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,ie,k),r.useProgram(Q.program),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,be),lt(r,F.uAtlas,1),r.activeTexture(r.TEXTURE4),r.bindTexture(r.TEXTURE_2D,w.ink),lt(r,F.uCells,4),r.activeTexture(r.TEXTURE5),r.bindTexture(r.TEXTURE_2D,w.under),lt(r,F.uUnder,5),wt(r,F.uResolution,ie,k),wt(r,F.uCell,oe.width,oe.height),wt(r,F.uPitch,j,B),me(r,F.uColumns,oe.columns),me(r,F.uDotScale,i.dotScale),wt(r,F.uDir,Math.cos(i.markAngle*Math.PI/180),Math.sin(i.markAngle*Math.PI/180)),lt(r,F.uMark,On.indexOf(i.mark)),sn(r,F.uLine,i.linePitch,i.lineWeight,i.sparkle,0),sn(r,F.uInlay,i.accents,i.shuffle,Math.floor(7*mn),xo(i.charset).length),me(r,F.uSourceColor,i.color==="source"?1:0),pr(r,F.uRamp,Xr),me(r,F.uRampCount,i.color==="source"?0:i.ramp.length),sn(r,F.uFade,sr[0],sr[1],sr[2],i.mark==="inlay"||i.glyphOrder!=="tone"&&i.mark==="glyph"?1:0);let G=i.post;r.activeTexture(r.TEXTURE10),r.bindTexture(r.TEXTURE_2D,w.glow??U),lt(r,F.uGlow,10),sn(r,F.uPost,w.glow?G.bloom:0,G.bloomRadius,G.scanlines,G.grain),sn(r,F.uPost2,G.chroma,G.curvature,mn,2),r.drawArrays(r.TRIANGLES,0,3),g&&v.present(d,ie,k)},Oa=typeof document<"u"&&document.hidden,ri=()=>!Tt&&!st&&!Fn&&!Sr&&(pn||xn)&&!Oa;function Na(s){L.forEach(y=>y()),m=s.slice(0,4);let x=()=>{Be=!0,Xe()};L=m.map(y=>y.subscribe(x)),m.length||(ue.target=null,ue.presence=0)}Na(m);let qr=s=>{if(gt=!1,!ri())return;let x=performance.now(),y=(s-qt)/1e3,w=Math.min(1/30,Math.max(1/480,y));qt=s,je=.9*je+.1*Math.min(y,.25),We=je>1/24?We+1:0;try{K().overloaded&&z<2&&We>10&&(z=2),We>45&&z<2&&K().atMinimum&&(We=0,z++,z===1&&H>1?(i={...i,maxPixelRatio:1},wn()):z=2);let E=Ea(),F=!ct&&(!(z>=2)||ne instanceof HTMLVideoElement)&&(!(!(ne instanceof HTMLVideoElement)||ne.paused||ne.ended)||!St()&&(!ne&&i.scene!=="none"||i.drift>0||i.post.grain>0||m.some(P=>P.animate)));F&&(mn+=w*i.speed),!q||!ne||ne instanceof HTMLVideoElement||ct||(lr(),Be=!0),ne instanceof HTMLVideoElement&&ne.readyState>=2&&Ct&&(Ct=!("requestVideoFrameCallback"in ne),lr(),rt++,Be=!0);let p=mr(i),T=p==="fluid"&&(Ce!==null||s<tr);if(T?((P,j)=>{let B=i.fluid;if(!B||!ve.length&&!Fe||(Fe?!Ae?.ready():!_||!Cr(_)))return;let R=ie/k,N=Ce;if(Ce=null,Fe&&Ae){let le=5200*B.force*(St()?.35:1);return N&&(tr=j+1e3*Math.min(9,6/Math.max(.3,B.dissipation))),void Ae.step(N?{from:N.from,to:N.to,force:[(N.to[0]-N.from[0])*le,(N.to[1]-N.from[1])*le]}:null,{dt:Math.min(P,1/60),radius:1.1*B.radius,curl:B.curl,dissipation:B.dissipation,aspect:R})}let V=0,W=0;if(N){let le=(St()?1:3)*B.force;V=(N.to[0]-N.from[0])*R*le*4,W=(N.to[1]-N.from[1])*le*4,tr=j+7/Math.min(B.dissipation,1.1*B.dissipation)*1e3}let he=_.locations;r.bindFramebuffer(r.FRAMEBUFFER,ve[1-Ye]),r.viewport(0,0,Ie,qe),r.useProgram(_.program),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,Te[Ye]),lt(r,he.uPrevious,0),wt(r,he.uSize,Ie,qe),me(r,he.uAspect,R),me(r,he.uDt,P),me(r,he.uDecay,B.dissipation),me(r,he.uEnergyDecay,1.1*B.dissipation),me(r,he.uRadius,B.radius),me(r,he.uSplat,N?1:0),wt(r,he.uFrom,N?.from[0]??0,N?.from[1]??0),wt(r,he.uTo,N?.to[0]??0,N?.to[1]??0),wt(r,he.uForce,V,W),r.drawArrays(r.TRIANGLES,0,3),Ye=1-Ye})(w,s):Ce=null,Jn(p)&&(T=((P,j)=>{let B=i.lantern,R=Ke.target;if(R){let V=Ke.at;if(V)if(St())V[0]=R[0],V[1]=R[1];else{let le=1-Math.exp(-B.follow*P);V[0]+=(R[0]-V[0])*le,V[1]+=(R[1]-V[1])*le}else Ke.at=[R[0],R[1]];let W=Ke.at,he=Ke.trail[Ke.trail.length-1];B.trail>0&&(!he||j-he.born>28&&Math.hypot(W[0]-he.x,W[1]-he.y)>.004)&&(Ke.trail.push({x:W[0],y:W[1],born:j}),Ke.trail.length>12&&Ke.trail.shift())}Ke.strength+=((R?1:0)-Ke.strength)*(1-Math.exp(-P*(R?9:5)));let N=Ke.trail;for(let V=N.length-1;V>=0;V--)B.trail>0&&j-N[V].born<4e3*B.trail||N.splice(V,1);Bt.fill(0);for(let V=0;V<N.length;V++){let W=N[V];Bt[3*V]=W.x,Bt[3*V+1]=W.y,Bt[3*V+2]=.55*Math.exp(-(j-W.born)/1e3/Math.max(.01,B.trail))}return Ke.strength>.003||N.length>0})(w,s)||T),p==="trail"){let P=!!ot?.active;T=(j=>{let B=re();return!(!B||!B.active||(B.step(j),r.bindTexture(r.TEXTURE_2D,xt),r.texSubImage2D(r.TEXTURE_2D,0,0,0,B.width,B.height,r.RGBA,r.UNSIGNED_BYTE,B.pixels),tn=!0,0))})(w)||T,P&&!ot?.active&&(Be=!0)}if((Oe?.live||Mt)&&(T=er(w)||T,Mt||(Be=!0)),m.length&&(function(P){let j=ue.target&&!ct?1:0,B=!1;if(ue.target){ue.presence===0&&(ue.at=[...ue.target]);let R=1-Math.exp(-P/.035),N=ue.target[0]-ue.at[0],V=ue.target[1]-ue.at[1];Math.abs(N)+Math.abs(V)>1e-4&&(ue.at=[ue.at[0]+N*R,ue.at[1]+V*R],B=!0)}if(ue.presence!==j){let R=P/.15;ue.presence=j>ue.presence?Math.min(j,ue.presence+R):Math.max(j,ue.presence-R),B=!0}return B})(w)&&(T=!0),ee.length){for(let P=ee.length-1;P>=0;P--)s-ee[P].born>=2400&&ee.splice(P,1);T=!0,ee.length||(Be=!0)}c&&It(),E&&(T||Be||F&&s-Yn>=wa*uo())&&(ni(),Yn=s,Be=!1,!xn||en&&!ne||(xn=!1,vn())),(F||T||Ce||!E||q&&ne&&!ct)&&(gt=!0,$t(qr)),D&&!st&&D.end(s,performance.now()-x)}catch(E){Fn=!0,Ln(E)}};function Xe(){!gt&&ri()&&(qt=performance.now(),gt=!0,$t(qr))}let Ga=(s,x)=>{let y=e.getBoundingClientRect();if(!y.width||!y.height)return null;let w=(s-y.left)/y.width,E=(x-y.top)/y.height;return w<-.05||w>1.05||E<-.05||E>1.05?null:[w,1-E]},Xa=s=>{m.length&&!ct&&(ue.target=s?[s[0],1-s[1]]:null,Xe());let x=mr(i);if(x==="none"||ct)return _e=null,void(Ke.target=null);if(Jn(x))return Ke.target=s?[s[0],1-s[1]]:null,_e=null,void Xe();if(x==="trail"){let y=re();return y?(s?y.move(s[0],1-s[1],i.trail.radius,performance.now()):y.leave(),_e=null,void Xe()):void 0}s?(_e&&(Ce=Ce?{from:Ce.from,to:s}:{from:_e,to:s}),_e=s,Xe()):_e=null},ai=n.interactionTarget??window,oi={target:ai,move:s=>{s.type==="pointerdown"&&(function(y){if(i.tap==="none"||!ne||!Jt||ct||Tt||St()||y.button!==0||typeof Element<"u"&&y.target instanceof Element&&y.target.closest("button, a, input, select, summary, textarea, label"))return;let w=Ga(y.clientX,y.clientY);!w||w[0]<0||w[0]>1||w[1]<0||w[1]>1||(i.tap==="surface"?Sn(w[0],1-w[1],1):(ee=[...ee,{x:w[0],y:1-w[1],born:performance.now(),strength:1}].slice(-4),Xe()))})(s);let x=Ga(s.clientX,s.clientY);ai===window&&(oi.inside=!!x),Xa(x)},leave:()=>{_e=null,ot?.leave(),ue.target&&(ue.target=null,Xe()),Ke.target&&(Ke.target=null,Xe())},near:()=>pn},En=[go(oi)],qa=()=>{let s=wn();De(),c&&(ht=!0,Be=!0),(s||Be)&&Xe()},za=l?ta(l.element,qa):()=>{};En.push(ta(e,qa),()=>za()),En.push(Hi(e,"25% 0px",s=>{pn=s.isIntersecting,pn&&(Be=!0,Xe())})),En.push(oa(()=>{Oa=document.hidden,Oa||(Be=!0,Xe())})),En.push(ia(()=>{_r=!!nr?.matches,Be=!0,Xe()})),En.push(Xn(po,s=>{let x=s.fontfaces??[],y=i.font.split(",").map(No);x.some(w=>y.includes(No(w.family)))&&_a()})),Qn(),En.push(()=>{c=null,Qn()});let Ha=s=>{s?.preventDefault(),st=!0,g||O(),gt&&Yt(qr),gt=!1},Wa=()=>{st=!1,g?r=v.gl:O(),D?.reset(),de.length=0,we=null,C=null,pe=Q=_=null,J=null,Te=[],ve=[],Ae=null,Fe=!1,xt=null,ot=null,tn=!1,yn=null,Pn=!1,ft=null,Oe=null,Mt=!1,(s=>{Za.delete(s)})(r),zt=void 0,Gr=ir=!1,Se=null,Qe=!1,et=tt=0,ht=!0;try{jo(),Be=!0,Xe()}catch(s){Ln(s)}},ii={lost:()=>Ha(),restored:Wa,rescale:()=>{wn()&&Xe()},size:()=>[ie,k],bytes:()=>{let s=se?4:8;return ie*k*4+Ft+(J?J.columns*J.rows*(2*s+(J.glow?16/3:0)):0)+Ie*qe*s*(Fe?6:Te.length)+(ot?ot.width*ot.height*4:0)}};g?v.join(ii):(e.addEventListener("webglcontextlost",Ha),e.addEventListener("webglcontextrestored",Wa));let Va=()=>{Zt&&(Zt.pause(),Zt.removeAttribute("src"),Zt.load(),Zt=null),Xt&&ne instanceof HTMLVideoElement&&"cancelVideoFrameCallback"in ne&&ne.cancelVideoFrameCallback(Xt),Xt=0},ja=()=>{He?.close(),He=null},Nl=async s=>{let x=await createImageBitmap(s,{premultiplyAlpha:"none"}),y=[x.width,x.height],w=(function(E,F,p,T,P,j,B=8){if(!(p>=16&&T>=16&&E>0&&F>0&&P>0))return 1;let R=B/P/(j==="cover"?Math.min(E/p,F/T):Math.max(E/p,F/T));return R>.5?1:2**-Math.floor(Math.log2(1/R))})(x.width,x.height,ie,k,oe.height,i.fit);if(w===1)return{element:x,owned:!0,natural:y};try{return{element:await createImageBitmap(x,{resizeWidth:Math.max(1,Math.round(x.width*w)),resizeHeight:Math.max(1,Math.round(x.height*w)),resizeQuality:"medium",premultiplyAlpha:"none"}),owned:!0,natural:y}}finally{x.close()}},$a=s=>new Promise((x,y)=>{let w=new Image;w.crossOrigin="anonymous",w.decoding="async",w.onload=()=>x({element:w,owned:!1}),w.onerror=()=>y(new Error("The glyph field could not load this image.")),w.src=s}),li=(s,x,y)=>{let{element:w,owned:E}=s;if(Tt||y!==en)return void(E&&w instanceof HTMLVideoElement?(w.pause(),w.removeAttribute("src"),w.load()):E&&w.close());w!==ne&&(Va(),ja()),Zt=E&&w instanceof HTMLVideoElement?w:null,!E||w instanceof HTMLVideoElement||(He=w);let F=w!==ne;ne=w,Jt=typeof x=="string"||x instanceof HTMLImageElement||x instanceof HTMLVideoElement,_t=w instanceof HTMLVideoElement?w.videoHeight:w instanceof HTMLImageElement?w.naturalHeight:w.height,ze=s.natural?.[0]??(w instanceof HTMLVideoElement?w.videoWidth:w instanceof HTMLImageElement?w.naturalWidth:w.width),pt=s.natural?.[1]??_t,Ct=!0,F&&(Ut=an=-1/0),w instanceof HTMLVideoElement&&F&&(p=>{let T=p;if(!T.requestVideoFrameCallback)return;let P=()=>{Tt||ne!==p||(Ct=!0,Xe(),Xt=T.requestVideoFrameCallback(P))};Xt=T.requestVideoFrameCallback(P)})(w),st||lr(),Be=!0,Xe()},si=(s,x)=>{xn&&s===en&&(xn=!1,vn()),Ln(x)},Ya=s=>{let x=++en;if(!s)return Va(),ja(),ne=null,ze=pt=_t=Ft=0,Jt=!1,Be=!0,Xe(),Promise.resolve();if((y=>!(typeof y=="string"||y instanceof HTMLImageElement&&!y.complete||y instanceof HTMLVideoElement&&y.readyState<2))(s)){try{li({element:s,owned:!1},s,x)}catch(y){si(x,y)}return Promise.resolve()}return(async y=>{if(typeof y!="string")return y instanceof HTMLImageElement&&!y.complete?y.decode().then(()=>({element:y,owned:!1})):y instanceof HTMLVideoElement&&y.readyState<2?new Promise((F,p)=>{y.addEventListener("loadeddata",()=>F({element:y,owned:!1}),{once:!0}),y.addEventListener("error",()=>p(new Error("The glyph field could not load this video.")),{once:!0})}):{element:y,owned:!1};if(ks.test(y))return new Promise((F,p)=>{let T=document.createElement("video");T.crossOrigin="anonymous",T.muted=!0,T.loop=!0,T.playsInline=!0,T.preload="auto",T.addEventListener("loadeddata",()=>{T.play().catch(()=>{}),F({element:T,owned:!0})},{once:!0}),T.addEventListener("error",()=>p(new Error("The glyph field could not load this video.")),{once:!0}),T.src=y});if(typeof createImageBitmap!="function"||typeof fetch!="function")return $a(y);let w;try{w=await(await fetch(y).then(F=>{if(!F.ok)throw new Error("The glyph field could not load this image.");return F})).blob()}catch(F){if(F instanceof Error&&F.message.startsWith("The glyph field"))throw F;return $a(y)}if(!/svg/i.test(w.type))try{return await Nl(w)}catch{}let E=URL.createObjectURL(w);try{return await $a(E)}finally{URL.revokeObjectURL(E)}})(s).then(y=>li(y,s,x),y=>si(x,y))};jo(),De();let ci=n.source??null;return ci?(en=1,Ya(ci)):Xe(),{canvas:e,ready:Ol,get settings(){return i},update(s){let x=i,{element:y,rest:w}=a(s);if("clear"in s&&l?.element!==y?.element?(za(),l=y,za=y?ta(y.element,qa):()=>{}):"clear"in s&&(l=y),"clear"in s){let p=o(s.clear)?s.clear:null;p!==c&&(c=p,ht=!0,Be=!0,Qn(),Xe())}i=Mr(y?{...w,clear:i.clear}:w,i),De(),s.label&&e.setAttribute("aria-label",s.label),i.maxPixelRatio!==x.maxPixelRatio&&wn(),i.charset===x.charset&&i.cellSize===x.cellSize&&i.cellAspect===x.cellAspect&&i.font===x.font&&i.fontWeight===x.fontWeight&&i.glyphScale===x.glyphScale||(La(),_a()),i.levels!==x.levels&&Ca(),i.scope===x.scope||st||(Da(),an=performance.now());var E,F;((!!x.fluid&&mr(x)==="fluid")!==ka()||i.fluid&&x.fluid&&i.fluid.resolution!==x.fluid.resolution)&&Io(),"source"in s&&Ya(s.source??null),"live"in s&&(q=!!s.live),"effects"in s&&(E=s.effects??[],F=m,E.length!==F.length||!E.every((p,T)=>p===F[T]))?(Na(s.effects??[]),st||Ur()):i.mark===x.mark&&Aa(i)===ar||st||(Q&&!g&&r.deleteProgram(Q.program),Dr=On.indexOf(i.mark),ar=Aa(i),Q=rr(so(Dr,ar))),Be=!0,Xe()},setSource:Ya,pointer(s,x=0){if(s===null)return void Xa(null);let y=e.getBoundingClientRect();Xa(Ga(y.left+s,y.top+x))},redraw(){if(!(Tt||st||Fn)&&ie)try{Ea(!(xn&&(g?v.canCompileInParallel:fe)))&&(!q||!ne||ne instanceof HTMLVideoElement||lr(),ni(),xn||(Be=!1))}catch(s){Fn=!0,Ln(s)}},pulse(s={}){if(Tt||St())return;let x=e.getBoundingClientRect();if(!x.width||!x.height)return;let y=s.x??x.width/2,w=s.y??x.height/2;if(s.element){let F=s.element.getBoundingClientRect();y=F.left+F.width/2-x.left,w=F.top+F.height/2-x.top}let E=Math.max(0,Math.min(2,s.strength??1));i.tap==="surface"&&ne&&Jt?Sn(y/x.width,w/x.height,E):(ee=[...ee,{x:y/x.width,y:w/x.height,born:performance.now(),strength:E}].slice(-4),Xe())},play(){ct=!1,ne instanceof HTMLVideoElement&&ne.play().catch(()=>{}),Be=!0,Xe()},pause(){ct=!0,ne instanceof HTMLVideoElement&&ne.pause()},resize(){wn()&&Xe()},destroy(){if(!Tt){if(Tt=!0,g||io--,gt&&Yt(qr),gt=!1,En.forEach(s=>s()),L.forEach(s=>s()),g?v.leave(ii):(e.removeEventListener("webglcontextlost",Ha),e.removeEventListener("webglcontextrestored",Wa)),Va(),ja(),ne=null,!st)if(Ra(),Ta(),r.deleteTexture(U),xt&&r.deleteTexture(xt),yn&&r.deleteTexture(yn),bn?.dispose(),zt?.dispose(),on&&r.deleteTexture(on),Se&&r.deleteTexture(Se),g)v.releaseAtlas(C,Fa),Ae?.release();else{r.deleteTexture(be);for(let s of[pe,Q,_])s&&r.deleteProgram(s.program);Ae?.dispose(),de.forEach(s=>r.deleteShader(s)),Ue&&r.deleteVertexArray(Ue),A&&r.getExtension("WEBGL_lose_context")?.loseContext()}C=null}}}}var gr,Ls=/\.(mp4|webm|mov|m4v|ogv)(\?|#|$)/i,Ci=null;function Ps(){if(gr!==void 0)return gr;try{let e=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1).getContext("webgl2"):null;gr=typeof Worker=="function"&&typeof HTMLCanvasElement=="function"&&"transferControlToOffscreen"in HTMLCanvasElement.prototype&&typeof createImageBitmap=="function"&&typeof URL.createObjectURL=="function"&&!!e,e?.getExtension("WEBGL_lose_context")?.loseContext()}catch{gr=!1}return gr}function Di(e){let n=e.clear,t=typeof HTMLElement=="function"&&(n instanceof HTMLElement||!!n&&typeof n=="object"&&n.element instanceof HTMLElement),a=!!n&&typeof n=="object"&&typeof n.rects=="function",o=e.interactionTarget;return!(e.effects?.length||t||a||o!=null&&o!==window)}var ea=e=>{let{source:n,onError:t,effects:a,interactionTarget:o,worker:l,label:c,...i}=e;return i};function _s(e,n){if(!Ps()||!Di(n))return null;let t={...n},a=Mr(ea(t)),o=null,l="",c=!1,i=!1,u=null,f=[],h=(k,H=[])=>{if(u||c)for(let xe of H)xe.close?.();else o&&i?o.postMessage(k,H):f.push({message:k,transfer:H})},M,b,v=new Promise((k,H)=>{M=k,b=H});v.catch(()=>{});let d=k=>{t.onError?t.onError(k):typeof console<"u"&&console.error(k)};e.setAttribute("role","img"),e.setAttribute("aria-label",t.label??"ASCII artwork"),e.dataset.renderer="glyph-field";let g=()=>{let k=e.getBoundingClientRect();return[e.clientWidth||k.width,e.clientHeight||k.height,k.left,k.top]},I=!0,r=()=>({reducedMotion:typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,darkScheme:typeof matchMedia=="function"&&matchMedia("(prefers-color-scheme: dark)").matches}),O=!1,Me=()=>{O||(O=!0,requestAnimationFrame(()=>{O=!1,h({type:"box",box:g()})}))},A=[ta(e,Me),Hi(e,"25% 0px",k=>{I=k.isIntersecting,h({type:"visible",value:I})}),oa(()=>h({type:"hidden",value:document.hidden})),ia(()=>h({type:"media",...r()})),br(()=>h({type:"media",...r()}))],D=()=>Me(),K=k=>h({type:"pointer",event:k.type,clientX:k.clientX,clientY:k.clientY,pointerType:k.pointerType,buttons:k.buttons}),se=()=>h({type:"pointer",event:"pointerleave",clientX:0,clientY:0});addEventListener("scroll",D,{passive:!0,capture:!0}),addEventListener("resize",D,{passive:!0}),addEventListener("pointermove",K,{passive:!0,capture:!0}),addEventListener("pointerdown",K,{passive:!0,capture:!0}),document.addEventListener("pointerleave",se),A.push(()=>{removeEventListener("scroll",D,{capture:!0}),removeEventListener("resize",D),removeEventListener("pointermove",K,{capture:!0}),removeEventListener("pointerdown",K,{capture:!0}),document.removeEventListener("pointerleave",se)});let fe,be=null,U=0,pe=!1,Q=!1,_=0,C=async(k,H,xe)=>{let oe=await k;xe!==U||c?oe.close():(H&&i&&!u&&(Q=!0,_=performance.now()),h({type:"frame",frame:oe,streaming:H},[oe]))},J=(k,H)=>{if(pe||H!==U||Q&&performance.now()-_<500||k instanceof HTMLVideoElement&&k.readyState<2)return;let xe;pe=!0;try{xe=k instanceof HTMLVideoElement&&typeof VideoFrame=="function"?new VideoFrame(k):createImageBitmap(k)}catch{return void(pe=!1)}C(xe,!0,H).finally(()=>{pe=!1})},Te=()=>{be?.(),be=null},ve=(k,H)=>{let xe=0,oe=!1,Le=()=>{oe||(J(k,H),Ie())},Ie=()=>{xe="requestVideoFrameCallback"in k?k.requestVideoFrameCallback(Le):requestAnimationFrame(Le)};Ie(),be=()=>{oe=!0,"cancelVideoFrameCallback"in k?k.cancelVideoFrameCallback(xe):cancelAnimationFrame(xe)}},Ae=null,Fe=()=>{Ae&&(Ae.pause(),Ae.removeAttribute("src"),Ae.load(),Ae=null)},Ue=null,we=async k=>{if(u)return u.setSource(k);let H=++U;if(Te(),Fe(),Ue=null,!k)return fe=void 0,void h({type:"url",url:null});if(typeof k=="string"&&!Ls.test(k))return fe=new URL(k,document.baseURI).href,void h({type:"url",url:fe});if(fe=void 0,typeof k=="string"){let xe=document.createElement("video");return Object.assign(xe,{crossOrigin:"anonymous",muted:!0,loop:!0,playsInline:!0,preload:"auto"}),await new Promise((oe,Le)=>{xe.addEventListener("loadeddata",()=>oe(),{once:!0}),xe.addEventListener("error",()=>Le(new Error("The glyph field could not load this video.")),{once:!0}),xe.src=k}).catch(oe=>{d(oe)}),H!==U?(xe.removeAttribute("src"),void xe.load()):(Ae=xe,xe.play().catch(()=>{}),void ve(xe,H))}if(k instanceof HTMLVideoElement)ve(k,H);else if(k instanceof HTMLCanvasElement)t.live?(Ue=k,((xe,oe)=>{let Le=0,Ie=()=>{Le=requestAnimationFrame(Ie),I&&!document.hidden&&J(xe,oe)};Le=requestAnimationFrame(Ie),be=()=>cancelAnimationFrame(Le)})(k,H)):await C(createImageBitmap(k),!1,H);else if(k instanceof HTMLImageElement){try{await k.decode()}catch{}await C(createImageBitmap(k),!1,H)}else await C(createImageBitmap(k),!1,H)},de=()=>{if(!c&&!u){for(let{transfer:k}of f)for(let H of k)H.close?.();f.length=0;try{u=nl(e,{...t,worker:!1}),u.ready.then(M,b)}catch(k){b(k),d(k)}}};(Ci??(Ci=Promise.resolve().then(()=>(di(),fi)).then(({default:k})=>k||null,()=>null))).then(k=>{if(c)return;if(!k)return void de();try{l=URL.createObjectURL(new Blob([k],{type:"text/javascript"})),o=new Worker(l)}catch{return void de()}let H=o,xe=setTimeout(()=>{i||(H.terminate(),o=null,de())},1e4);H.onerror=oe=>{oe.preventDefault(),i?d(new Error("The glyph field worker stopped.")):(clearTimeout(xe),H.terminate(),o=null,de())},H.onmessage=({data:oe})=>{if(oe.type==="loaded"){if(clearTimeout(xe),c)return;let Le;try{Le=e.transferControlToOffscreen()}catch{return H.terminate(),o=null,void de()}i=!0,H.postMessage({type:"init",canvas:Le,options:ea(t),ratio:globalThis.devicePixelRatio||1,box:g(),hidden:document.hidden,visible:I,...r(),streaming:!!Ue||!!be,url:fe},[Le]);for(let{message:Ie,transfer:qe}of f.splice(0))H.postMessage(Ie,qe)}else oe.type==="took"?Q=!1:oe.type==="ready"?M():oe.type==="error"?d(new Error(String(oe.message))):oe.type!=="atlas"&&oe.type!=="shapes"||(async Le=>{let Ie=document.fonts,qe=Le.settings;try{await Ie?.load(`${qe.fontWeight} 16px ${qe.font}`,qe.charset)}catch{}if(!c&&!u)if(Le.type==="atlas"&&Le.layout){let{image:Ye}=la(qe,Le.layout,!1),ne=await createImageBitmap(Ye);Ye.width=Ye.height=1,h({type:"atlas",key:Le.key,image:ne},[ne])}else{let Ye=el(qe);h({type:"shapes",key:Le.key,data:Ye},[Ye.buffer])}})(oe)}}),t.source!=null&&we(t.source);let ie=(k,...H)=>{u?u[k](...H):h({type:"call",method:k,args:H})};return{canvas:e,ready:v,get settings(){return u?u.settings:a},update(k){if(u)return void u.update(k);Di({...t,...k})||d(new Error("This change needs the page (effects, an element clear zone or another interaction target); the field in a worker leaves it out.")),t={...t,...k},a=Mr(ea(t));let H=ea(k);h({type:"update",options:H}),"source"in k?we(k.source??null):"live"in k&&Ue===null&&t.live&&we(t.source??null)},setSource:k=>(t={...t,source:k},we(k)),pointer(k,H){ie("pointer",k,H)},redraw(){Ue&&(pe=!1,Q=!1,J(Ue,U)),ie("redraw")},pulse(k={}){let{element:H,...xe}=k;if(H){let oe=H.getBoundingClientRect(),Le=e.getBoundingClientRect();ie("pulse",{...xe,x:oe.left+oe.width/2-Le.left,y:oe.top+oe.height/2-Le.top})}else ie("pulse",xe)},play(){ie("play")},pause(){ie("pause")},resize(){u?u.resize():h({type:"box",box:g()})},destroy(){if(c)return;u&&u.destroy(),h({type:"destroy"}),c=!0,U++,Te(),Fe(),A.forEach(H=>H());let k=o;k&&setTimeout(()=>k.terminate(),1e3),l&&URL.revokeObjectURL(l)}}}function rl(e,n={}){if(n.worker){let t=_s(e,n);if(t)return t}return nl(e,n)}var Eo={standard:{label:"Classic ASCII",chars:" .:-=+*#%@"},asciify:{label:"Asciify",chars:" .:-=+YCIFSA#@"},minimal:{label:"Minimal",chars:" .:+"},detailed:{label:"Detailed",chars:" .,:;-~=+*xX#%@"},letters:{label:"Letters",chars:" .liLTYCFSAWM"},technical:{label:"Technical",chars:" ._:;+/>=][{}*$#@"},blocks:{label:"Tonal blocks",chars:" \u2591\u2592\u2593\u2588"},braille:{label:"Braille",chars:" \u2801\u2803\u2807\u2847\u28C7\u28E7\u28F7\u28FF"},fish:{label:"Fish",chars:" .'-,:;txoSX%#8@"},kanji:{label:"Kanji (Japanese)",chars:" \u4E00\u4E8C\u4EBA\u5C0F\u5927\u4E2D\u65E5\u672C\u76EE\u7530\u9577\u9593\u8A9E\u66F8\u66DC\u9A5A\u9727"}};function Ro(e){if(e)return Object.prototype.hasOwnProperty.call(Eo,e)?Eo[e].chars:e.startsWith(" ")?e:" "+e}var Cs={ascii:{mark:"glyph",charset:" .:-=+*#%@"},blocks:{mark:"glyph",charset:" \u2591\u2592\u2593\u2588"},braille:{mark:"glyph",charset:" \u2801\u2803\u2807\u2847\u28C7\u28E7\u28F7\u28FF"},dots:{mark:"dot"},lines:{mark:"glyph",charset:" -\u2550\u256A\u256C"},cross:{mark:"glyph",charset:" \xB7+xX#"},diagonal:{mark:"glyph",charset:" /\u2571\u2573"},diamond:{mark:"glyph",charset:" \xB7\u25C7\u25C8\u25C6"},mixed:{mark:"glyph",charset:" .:+/\u25C7#@"},pixel:{mark:"pixel"},mosaic:{mark:"mosaic"},lego:{mark:"lego"},voxel:{mark:"voxel"},disco:{mark:"disco"},dither:{mark:"dither"},hex:{mark:"hex"},led:{mark:"led"},cmyk:{mark:"cmyk"},stipple:{mark:"stipple"},engraving:{mark:"engraving"},crosshatch:{mark:"crosshatch"},woodblock:{mark:"woodblock"},risograph:{mark:"risograph"},pointillism:{mark:"pointillism"}};var Ds=/\p{L}/u,Us=new Set(Object.values(Eo).map(e=>e.chars));var Is=new Set(["glyph","inlay"]),Er=e=>Is.has(e??"glyph"),Bs=e=>({cellSize:Math.max(7,e.cellSize??8),cellAspect:.62,glyphScale:.9}),ul=new WeakSet,hl=e=>{ul.add(e)},Wn=e=>e&&!ul.has(e)?e.current.charset:void 0;function Vn(e,n){let t=Ro(n);if(!t)return e;if(Er(e.mark))return{...e,charset:t,...ko(t,e)};let a={...e,...Bs(e)};return{...a,mark:"glyph",charset:t,...ko(t,a)}}var ca=null;var al=new Set;var ol=12,ut=new Set,Kt=null,kr=null,ha=0,Tr=-1e9,fa=0,da=0,Mo=!1,bo=!1,Os=()=>{let e=kr?.timeline?.currentTime;return typeof e=="number"?e:null};var wo=()=>typeof performance<"u"?performance.now():Date.now(),Ao=()=>typeof innerHeight=="number"?innerHeight:0;function pa(e,n=e.getBoundingClientRect()){if(e.isConnected===!1||typeof e.getClientRects=="function"&&e.getClientRects().length===0)return 1/0;let t=n.bottom<0?-n.bottom:n.top-Ao();return t>0?t:0}function Ns(){try{let e=kr?.querySelectorAll?.("dialog:modal");return e?.length?e[e.length-1]:null}catch{return null}}var Gs=1e8;function fl(e,n){if(e.eager)return void(e.wanted=!0);let t=Ao(),a=pa(e.host,n);!t||a<=2*t?e.wanted=!0:a>3*t&&(e.wanted=!1)}function Xs(e){let n=!1;for(let t of e)if(t?.target)for(let a of ut)a.host===t.target&&(fl(a,t.boundingClientRect??void 0),n=!0);n&&Hn()}var il=()=>Hn(),ga=0,ma=0,ll=()=>{let e=typeof scrollY=="number"?scrollY:0;e!==ma&&(ga=e>ma?1:-1),ma=e};function qs(e,n){return!n||!ga||e.getBoundingClientRect().top>0==ga>0?n:2*n}var ua=null,dl=e=>{ua!==e&&(ua?.removeEventListener?.("close",il,!0),ua?.removeEventListener?.("scroll",ll,!0),e?.addEventListener?.("close",il,!0),e?.addEventListener?.("scroll",ll,{capture:!0,passive:!0}),ua=e)},To=new WeakSet,qn=0;function Fo(){qn||typeof requestIdleCallback!="function"||(qn=requestIdleCallback(zs,{timeout:2e3}))}function zs(e){qn=0;let n=[...ut].filter(t=>!t.live&&t.prewarm&&!To.has(t)).sort((t,a)=>pa(t.host)-pa(a.host));for(let t of n){if(e.timeRemaining()<2&&!e.didTimeout)return void Fo();To.add(t);try{t.prewarm()}catch{}}}function Hs(e){kr!==e.doc&&(kr=e.doc,ut.clear(),ha=fa=da=ga=0,Tr=-1e9,ma=typeof scrollY=="number"?scrollY:0),dl(kr),ut.add(e);let n=(function(){let t=typeof IntersectionObserver=="function"?IntersectionObserver:null;if(!t)return null;if(Kt?.ctor!==t){Kt?.list.forEach(a=>a.disconnect()),Kt={ctor:t,list:["200% 0px","300% 0px","0px"].map(a=>new t(Xs,{rootMargin:a}))};for(let a of ut)Kt.list.forEach(o=>o.observe(a.host))}return Kt.list})();n?.forEach(t=>t.observe(e.host)),n?fl(e):e.wanted=!0,Hn(),e.live||Fo()}function Hn(e=!1){if(Mo)bo=!0;else{Mo=!0;try{do{bo=!1;let n=wo(),t=Os();(e||(t===null?n-Tr>16||n<Tr:t!==Tr))&&(Tr=t??n,fa=da=0);for(let d of ut)d.host.isConnected===!1&&(d.wanted=!1);for(let d of ut)d.live&&!d.wanted&&d.release();let a=[...ut].filter(d=>d.live&&!d.shared),o=Ns(),l=d=>!!o&&!o.contains(d.host),c=d=>pa(d.host)+(l(d)?Gs:0),i=d=>d.eager&&!l(d),u=()=>a.filter(d=>d.live&&!d.shared).map(d=>[d,c(d)+(i(d)?0:1e9)]).sort((d,g)=>g[1]-d[1]);for(let d=a.length-ol,g=d>0?u():[];d>0;d--)g.shift()?.[0].release();let f=ji(),h=1*Ao(),M=()=>[...ut].filter(d=>d.live&&d.shared&&c(d)>h).sort((d,g)=>c(g)-c(d));if(f?.overBudget)for(let d of M()){if(!f.overBudget)break;d.release()}let b=[...ut].filter(d=>d.wanted&&!d.live).map(d=>[d,d.eager?-1:c(d)]).map(([d,g])=>[d,g,g>0?qs(d.host,g):g]).sort((d,g)=>d[2]-g[2]),v=0;for(let[d,g]of b){if(!ut.has(d)||d.live)continue;if(f&&!f.roomy){let r=M()[0];if(!r||c(r)<=c(d)||(r.release(),!f.roomy))break}if(!d.eager&&(fa>=4||da>=2)&&(!e||v)){ha||(ha=requestAnimationFrame(()=>{ha=0,Hn(!0)}));break}if(a.filter(r=>r.live&&!r.shared).length>=ol){let r=u()[0]?.[0];if(!r||(i(r)?!d.eager||c(r)<=c(d):!d.eager&&c(r)<=g))break;r.release()}let I=wo();d.mount(),fa+=wo()-I,v++,d.eager||da++,d.live&&!d.shared&&a.push(d)}}while(bo)}finally{Mo=!1}}}var ml='ui-monospace, "SF Mono", Menlo, Consolas, monospace',sl=new Map,Ws=".:-=+*#%@";function Vs(e,n=ml){let t=`${n}\0${e}`,a=sl.get(t);if(a)return a;let o={max:1,mean:1};try{let l=typeof document>"u"?null:Object.assign(document.createElement("canvas"),{width:48,height:48}).getContext("2d",{willReadFrequently:!0});if(l&&typeof l.getImageData=="function"){l.font=`500 36px ${n}`,l.textAlign="center",l.textBaseline="middle";let c=b=>{l.clearRect(0,0,48,48),l.fillStyle="#000",l.fillText(b,24,25);let v=l.getImageData(0,0,48,48).data,d=0;for(let g=3;g<v.length;g+=4)d+=v[g];return d/255},i=b=>[...b].filter(v=>v.trim()).map(c),u=b=>b.reduce((v,d)=>v+d,0)/Math.max(1,b.length),f=i(e),h=i(Ws),M=c("@");f.length&&M>0&&u(h)>0&&(o={max:Math.max(...f)/M,mean:u(f)/u(h)})}}catch{}return sl.set(t,o),o}function ko(e,n){let{max:t,mean:a}=Vs(e,n.font??ml),o=n.glyphScale??.8,l=n.gamma??1,c=n.fontWeight??500;return t>1.15?{glyphScale:Math.max(.3,o*Math.max(.62,t**-.36)),gamma:l,fontWeight:c}:a>1.5?{glyphScale:Math.max(.3,o*a**-.25),gamma:l,fontWeight:c}:t<.85?{glyphScale:Math.min(1.6,o*Math.min(1.3,t**-.3)),gamma:l,fontWeight:t<.6?Math.max(c,700):c}:{glyphScale:o,gamma:l,fontWeight:c}}var zn=new WeakMap;function va(e,n){for(let t of zn.get(e)?.keys()??[])t.getAttribute("src")!==n&&(t.src=n)}function xa(e){let n=zn.get(e);zn.delete(e),n?.forEach(t=>t())}function Rr(e,n,t,a,o){let l=document.createElement("img");l.alt="",l.decoding="async",l.setAttribute("aria-hidden","true"),l.setAttribute("style",`${t};object-fit:cover`),l.style.opacity="1",l.dataset.asciiPoster="",l.src=n;let c=e.style.getPropertyValue("position"),i=typeof getComputedStyle=="function"&&getComputedStyle(e).position==="static";i&&e.style.setProperty("position","relative");let u=e.style.getPropertyValue("isolation"),f=/z-index:\s*-1/.test(t)&&typeof getComputedStyle=="function"&&getComputedStyle(e).isolation==="auto";f&&e.style.setProperty("isolation","isolate"),o?.parentElement===e?e.insertBefore(l,o):e.appendChild(l);let h=!1,M=()=>{h||(h=!0,l.remove(),zn.get(a)?.delete(l),i&&(c?e.style.setProperty("position",c):e.style.removeProperty("position")),f&&(u?e.style.setProperty("isolation",u):e.style.removeProperty("isolation")))},b=zn.get(a)??new Map;return b.set(l,M),zn.set(a,b),{show(v){l.style.opacity=v?"1":"0"},remove:M}}function cl(e){let n=document.createElement("canvas");for(let t of e.getAttributeNames?.()??[])t!=="width"&&t!=="height"&&n.setAttribute(t,e.getAttribute(t));return n.style.cssText=e.style.cssText,Object.assign(n.dataset,e.dataset),e.replaceWith?e.replaceWith(n):e.parentElement&&(e.parentElement.insertBefore(n,e),e.remove()),n}function ya(e){let{host:n,kit:t}=e,a,o=e.canvas,l=null,c=!1,i=!1,u=!1,f=!1,h={},M={},b=e.source,v=!1,d={},g=null,I=null,r=!1,O=null,Me=()=>{},A=!e.ownPoster&&t?.current.poster?Rr(n,t.current.poster,e.place,t,o):null,D=()=>{if(!ca||t?.current.globalLook===!1||t?.current.charset||!Er(M.mark)&&!e.glyphs||M.glyphOrder!=="scatter"&&!Us.has(M.charset??"")&&Ds.test(M.charset??""))return;let _=ca.style?Cs[ca.style]:void 0,C=_?.mark??(Er(M.mark)?M.mark??"glyph":"glyph"),J=Er(C)?ca.charset||(_&&"charset"in _?_.charset:void 0):void 0;return _||J?{mark:C,charset:J}:void 0},K=()=>({...e.glyphs?Object.fromEntries(Object.keys(e.glyphs()).map(_=>[_,M[_]]).filter(([,_])=>_!==void 0)):{},mark:M.mark??"glyph",charset:M.charset??" .,:-=+*#%@",glyphScale:M.glyphScale??.8,gamma:M.gamma??1,fontWeight:M.fontWeight??500}),se=_=>{if(!_.charset)return{...K(),mark:_.mark};let C=e.glyphs&&!Er(M.mark)?e.glyphs():{};return{...C,mark:_.mark,charset:_.charset,...ko(_.charset,{...M,...C})}},fe=()=>{let _=D(),C=_&&`${_.mark}\0${_.charset??""}`;return C===a?null:(a=C,_?se(_):K())},be={host:n,doc:document,eager:t?.current.lazy===!1,wanted:!1,live:!1,poster:!!A||!!e.ownPoster,mount(){if(i||l)return;c&&(o=e.canvas=cl(o)),c=!0,M={...e.options(),...h},a=void 0;let _=fe(),C;try{C=rl(o,{...M,..._,...b===void 0?{}:{source:b},onError:()=>{l===C&&U()}})}catch{return void U()}l=C,be.live=!0,be.shared=Yi(o);let J=o;if(be.shared)Me=()=>{};else{let Te=0,ve=()=>{l===C&&(A?.show(!0),clearTimeout(Te),Te=setTimeout(()=>{l===C&&o===J&&(be.release(),Hn())},1e3))},Ae=()=>{clearTimeout(Te),requestAnimationFrame(()=>requestAnimationFrame(()=>{l===C&&A?.show(!1)}))};J.addEventListener?.("webglcontextlost",ve),J.addEventListener?.("webglcontextrestored",Ae),Me=()=>{clearTimeout(Te),J.removeEventListener?.("webglcontextlost",ve),J.removeEventListener?.("webglcontextrestored",Ae)}}v&&C.pause(),C.ready.then(()=>{l===C&&(r=!0,A?.show(!1),g?.(),g=I=null)},()=>{}),e.onMount?.(C,o)},release(){if(!l)return;let _=l;l=null,be.live=!1,r=!1,Me(),O?.clear(),O=null,d=_.settings,_.destroy(),be.shared?i||(o.width=o.width,c=!1):((C=>{try{let J=C.getContext("webgl2");J&&!J.isContextLost?.()&&J.getExtension("WEBGL_lose_context")?.loseContext()}catch{}})(o),i||(o=e.canvas=cl(o),c=!1)),A?.show(!0),e.onRelease?.()},prewarm(){if(i||l)return;M={...e.options(),...h};let _=D();tl(o,{...M,..._?se(_):{}})}};function U(){u||(u=!0,pe(),f||e.onFail())}function pe(){i||(i=!0,be.release(),(function(_){ut.delete(_)&&([...ut].some(C=>C.host===_.host)||Kt?.list.forEach(C=>C.unobserve(_.host)),!ut.size&&Kt&&(Kt.list.forEach(C=>C.disconnect()),Kt=null),ut.size||(dl(null),qn&&typeof cancelIdleCallback=="function"&&cancelIdleCallback(qn),qn=0),Hn())})(be),al.delete(Q),o.remove(),u?A?.show(!0):A?.remove())}let Q={relook(){l||(ve=>{To.delete(ve),ut.has(ve)&&Fo()})(be);let _=fe();if(!_||!l)return;let C=l,J=r&&!(t?.current.reducedMotion??(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches));O?.clear(),O=null,J&&(C.redraw(),O=(function(ve,Ae){if(!ve.width||!ve.height||typeof document>"u")return null;let Fe=document.createElement("canvas");Fe.width=ve.width,Fe.height=ve.height;let Ue=Fe.getContext("2d");if(!Ue||typeof Fe.animate!="function")return null;try{Ue.drawImage(ve,0,0)}catch{return null}Fe.setAttribute("aria-hidden","true"),Fe.dataset.asciiSweep="",Fe.setAttribute("style",Ae);let we=document.createElement("span"),de,ie;we.setAttribute("aria-hidden","true"),we.dataset.asciiSweep="",we.setAttribute("style",`${Ae};right:auto;width:2px;margin-left:-1px;opacity:0;background:var(--ascii-sweep, #f3ba32);box-shadow:0 0 10px 1px color-mix(in srgb, var(--ascii-sweep, #f3ba32) 40%, transparent)`),ve.after(Fe,we);let k=()=>{de?.cancel(),ie?.cancel(),Fe.remove(),we.remove()};return{clear:k,reveal(){if(!Fe.isConnected)return;let H={duration:200,delay:40,easing:"cubic-bezier(.23,1,.32,1)",fill:"both"};de=Fe.animate([{clipPath:"inset(0% 0% 0% 0%)"},{clipPath:"inset(0% 0% 0% 100%)"}],H);let xe=ve.clientWidth||ve.getBoundingClientRect().width;ie=we.animate([{transform:"translateX(0px)",opacity:.35},{opacity:.35,offset:.7},{transform:`translateX(${xe}px)`,opacity:0}],H),de.onfinish=k}}})(o,e.place)),C.update(_);let Te=O;Te&&requestAnimationFrame(()=>requestAnimationFrame(()=>{O===Te&&l===C?Te.reveal():Te.clear()}))}};return{field:{get canvas(){return o},get ready(){return l?l.ready:I??(I=new Promise(_=>{g=_}))},get settings(){return l?.settings??d},update(_){if(h={...h,..._},M={...M,..._},!l)return;let C=fe(),J=D();l.update(J?{..._,...se(J)}:C?{..._,...C}:_)},setSource:_=>(b=_,l?l.setSource(_):Promise.resolve()),pointer(_,C){l?.pointer(_,C)},redraw(){l?.redraw()},pulse(_){l?.pulse(_)},play(){v=!1,l?.play()},pause(){v=!0,l?.pause()},resize(){l?.resize()},destroy(){pe()}},get canvas(){return o},get live(){return!!l},get failed(){return u},start(){al.add(Q),f=!0;try{Hs(be)}finally{f=!1}},destroy:pe}}var pl,js=(e,n=0,t=1)=>Math.min(t,Math.max(n,e));var Qt,Fr=()=>typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;var Ar={scene:"none",background:"transparent",color:"ink",levels:"none",fit:"cover",focus:{x:.5,y:.5},vignette:0,drift:0,hover:"none",shade:0,contrast:1,brightness:0,gamma:1,maxPixelRatio:2,clear:!1};function Rn(e,n,t){let a=(e??"").trim(),o=/^var\(\s*(--[\w-]+)\s*(?:,\s*(.+))?\)$/.exec(a);if(o?a=gl(n,o[1])||(o[2]??"").trim():a.startsWith("--")&&(a=gl(n,a)),!a)return t?Rn(t,n):null;if(/^#[\da-f]{6}$/i.test(a))return a.toLowerCase();if(/^#[\da-f]{3}$/i.test(a))return`#${[...a.slice(1)].map(f=>f+f).join("")}`.toLowerCase();let l=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(a);if(l)return vl([+l[1],+l[2],+l[3]]);if(Qt===void 0)try{Qt=typeof document>"u"?null:Object.assign(document.createElement("canvas"),{width:1,height:1}).getContext("2d",{willReadFrequently:!0})}catch{Qt=null}if(!Qt)return t?Rn(t,n):null;Qt.clearRect(0,0,1,1),Qt.fillStyle="#000",Qt.fillStyle=a,Qt.fillRect(0,0,1,1);let[c,i,u]=Qt.getImageData(0,0,1,1).data;return vl([c,i,u])}var gl=(e,n)=>typeof getComputedStyle=="function"?getComputedStyle(e).getPropertyValue(n).trim():"",vl=e=>`#${e.map(n=>Math.round(js(n,0,255)).toString(16).padStart(2,"0")).join("")}`,$s=e=>{let n=parseInt(e.slice(1,7),16);return[n>>16&255,n>>8&255,255&n]};function jn(e){let n=typeof getComputedStyle=="function"?getComputedStyle(e):null,t=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?/i.exec(n?.backgroundColor??"");if(t&&(t[4]===void 0?1:t[4].endsWith("%")?parseFloat(t[4])/100:parseFloat(t[4]))>=.5)return .2126*+t[1]+.7152*+t[2]+.0722*+t[3]<128;let a=Rn(n?.color??"",e);if(!a)return typeof matchMedia=="function"&&matchMedia("(prefers-color-scheme: dark)").matches;let[o,l,c]=$s(a);return .2126*o+.7152*l+.0722*c>140}function So(){let e=[];return{set(n,t,a){e.some(([o,l])=>o===n&&l===t)||e.push([n,t,n.style.getPropertyValue(t)]),n.style.setProperty(t,a)},restore(){for(let[n,t,a]of e.reverse())a?n.style.setProperty(t,a):n.style.removeProperty(t);e.length=0}}}function Ys(e,n){let t=e.getBoundingClientRect(),a=n.getBoundingClientRect(),o=t.width/(e.offsetWidth||t.width||1)||1;return{x:(a.left-t.left)/o,y:(a.top-t.top)/o,w:a.width/o,h:a.height/o}}function Lo(e,n){let t={...e,...n},a=e.look,o=n.look;return o&&(t.look=Object.fromEntries(Object.entries({...a,...o}).filter(([,l])=>l!==void 0))),t}var xl=new WeakMap;function yl(e){let{host:n,layer:t="over",outset:a=0,kit:o}=e;if(typeof document>"u")return null;let l=`position:absolute;left:${-a}px;top:${-a}px;width:calc(100% + ${2*a}px);height:calc(100% + ${2*a}px);pointer-events:none;z-index:${t==="under"?-1:"auto"}`;if(!sa())return o?.current.poster&&Rr(n,o.current.poster,l,o),null;let c=So(),i=document.createElement("canvas"),u=document.createElement("canvas"),f=u.getContext("2d");if(!f)return null;getComputedStyle(n).position==="static"&&c.set(n,"position","relative"),t==="under"&&c.set(n,"isolation","isolate"),i.setAttribute("aria-hidden","true"),i.dataset.asciiKit="";let h=i.style;h.position="absolute",h.left=h.top=-a+"px",h.width=h.height=`calc(100% + ${2*a}px)`,h.pointerEvents="none",h.zIndex=t==="under"?"-1":"",n.appendChild(i);let M=()=>{let we=getComputedStyle(n);D.canvas.style.borderRadius=[we.borderTopLeftRadius,we.borderTopRightRadius,we.borderBottomRightRadius,we.borderBottomLeftRadius].map(de=>a&&/^[\d.]+px$/.test(de)?`${parseFloat(de)+a}px`:de).join(" ")},b=jn(n),v=()=>Rn(e.ink(b),n)??Rn(getComputedStyle(n).color,n)??(b?"#d8d6cf":"#1d1d1b"),d=!1,g=!1,I=!0,r=!1,O=-1/0,Me=-1/0,A=go({target:n,move:we=>{Me=we.timeStamp},leave(){}}),D=ya({host:n,canvas:i,kit:o,place:l,options:()=>({...Vn({...Ar,...e.look()},Wn(o)),ink:v(),interactionTarget:n,label:""}),onMount:(we,de)=>{xl.set(de,U),de.removeAttribute("role"),de.removeAttribute("aria-label"),we.ready.then(Q,()=>{}),Q()},onRelease:()=>{d&&Yt(pe),d=!1},onFail:()=>{Ue(),e.onFail?.()}}),K=D.field;M();let se=()=>!!(e.reducedMotion()??Fr()),fe=we=>Ys(D.canvas,we),be=we=>{let de=D.canvas,ie=Math.max(1,de.clientWidth||n.clientWidth+2*a),k=Math.max(1,de.clientHeight||n.clientHeight+2*a),H=e.resolution??1,[xe,oe]=typeof H=="function"?H(ie,k):[Math.max(1,Math.round(ie*H)),Math.max(1,Math.round(k*H))];u.width===xe&&u.height===oe||(u.width=xe,u.height=oe),f.setTransform(1,0,0,1,0,0),f.globalAlpha=1,f.globalCompositeOperation="source-over",f.filter="none",f.fillStyle="#000",f.fillRect(0,0,xe,oe);let Le=!1;try{Le=e.paint({pen:f,width:xe,height:oe,w:ie,h:k,scale:xe/ie,now:we,still:se(),dark:b,box:fe})}catch(Ie){typeof console<"u"&&console.error(Ie)}return K.setSource(u),r||K.redraw(),Le};function U(){let we=D.canvas,de=Math.max(1,we.clientWidth||n.clientWidth+2*a),ie=Math.max(1,we.clientHeight||n.clientHeight+2*a),k=e.resolution??1,[H,xe]=typeof k=="function"?k(de,ie):[Math.max(1,Math.round(de*k)),Math.max(1,Math.round(ie*k))],oe=document.createElement("canvas");oe.width=H,oe.height=xe;let Le=oe.getContext("2d");if(!Le)return null;Le.fillStyle="#000",Le.fillRect(0,0,H,xe);try{e.paint({pen:Le,width:H,height:xe,w:de,h:ie,scale:H/de,now:performance.now(),still:!0,dark:b,box:fe})}catch{return null}return oe}function pe(we){if(d=!1,!(r||g||!D.live)){if(we-O<(pl??(pl=(()=>{let de=typeof navigator>"u"?void 0:navigator;return 1e3/(de&&(de.hardwareConcurrency>0&&de.hardwareConcurrency<=2||de.deviceMemory&&de.deviceMemory<=2||de.connection?.saveData)?30:60)-2})()))*uo()&&we-Me>1e3)return d=!0,void $t(pe);O=we,!be(we)||se()||!I||typeof document<"u"&&document.hidden||(d=!0,$t(pe))}}function Q(){d||r||g||!D.live||(d=!0,$t(pe))}xl.set(i,U);let _=typeof ResizeObserver=="function"?new ResizeObserver(()=>{M(),K.resize(),!D.live||r||g||be(performance.now()),Q()}):null;_?.observe(n);let C=typeof IntersectionObserver=="function"?new IntersectionObserver(([we])=>{I=we.isIntersecting,I&&Q()},{rootMargin:"64px"}):null;C?.observe(n);let J=oa(()=>{document.hidden||Q()}),Te=!1,ve=()=>{Te=!1,r||(b=jn(n),K.update({ink:v()}),e.onTheme?.(),Q())},Ae=br(()=>{Te||r||(Te=!0,$t(ve))}),Fe=ia(Q);function Ue(){r||(r=!0,d&&Yt(pe),Te&&Yt(ve),d=Te=!1,_?.disconnect(),C?.disconnect(),J(),A(),Ae(),Fe(),D.destroy(),c.restore(),u.width=u.height=1)}return D.start(),D.failed?(Ue(),null):{field:K,get canvas(){return D.canvas},get live(){return D.live},kick:Q,refresh(){r||(b=jn(n),K.update({...Vn({...Ar,...e.look()},Wn(o)),ink:v()}),Q())},still:se,dark:()=>b,box:fe,play(){g&&(g=!1,K.play(),Q())},pause(){g=!0,d&&Yt(pe),d=!1,K.pause()},destroy:Ue}}var An=(e,n,t,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(a,Math.max(t,e)):n;function Ml(e){return e==="dots"?" \xB7\u2219\u2022\u25CF":Ro(e)}function bl(e,n){if(!n||!n.preset||typeof n.preset.mount!="function")throw new TypeError("background() needs a preset, such as `aurora` imported from asciify-engine/kit.");let t=n.preset,a=n.poster,o=A=>({...A,poster:A.preset===t?a:void 0}),l={current:o({...n})};hl(l);let c=null,i=!1,u=!1,f=new Set,h=()=>{let A=l.current,D=A.preset;return{speed:An(A.speed,D.speed,0,5),cellSize:An(A.cellSize,D.cellSize,3,96),charset:Ml(A.charset),cursor:A.look?.hover!=="none"&&(A.cursor??D.cursor),tap:A.tap==="ring"||A.tap==="surface"?A.tap:void 0,mark:A.mark==="glyph"||A.mark==="dot"?A.mark:void 0,clear:A.clear??!1,clearMap:{padding:An(A.clearPadding,8,0,400),softness:An(A.clearSoftness,28,0,600),strength:An(A.clearStrength,.85,0,1)},dither:An(A.dither,0,0,1),accent:A.accent,text:A.text?.trim()||"ASCIIFY",look:A.look}},M=A=>{let D=l.current,K=D.palette;return(typeof K=="string"?K:K?.[A?"dark":"light"])??D.color??D.ink},b=()=>String(An(l.current.opacity,l.current.preset.opacity??1,0,1)),v=()=>!!(l.current.reducedMotion??Fr()),d=A=>{let D=null;if(D=l.current.preset.mount({host:e,kit:l,settings:h,ink:M,reducedMotion:()=>l.current.reducedMotion,onFail:()=>{c===D&&(c=null)}}),!D)return null;let K=D.canvas.style;return A&&(K.opacity="0",K.transition="opacity 320ms cubic-bezier(.16, 1, .3, 1)",D.canvas.offsetWidth),K.opacity=b(),i&&D.pause(),D},g={position:e.style.getPropertyValue("position"),isolation:e.style.getPropertyValue("isolation")},I=(A,D)=>{D?e.style.setProperty(A,D):e.style.removeProperty(A)},r=!1,O=A=>{r=!0,A.destroy(),c&&!u&&(typeof getComputedStyle=="function"&&getComputedStyle(e).position==="static"&&e.style.setProperty("position","relative"),e.style.setProperty("isolation","isolate"))},Me=A=>{if(u||!A||typeof A.mount!="function"||A===l.current.preset)return;l.current=o({...l.current,preset:A});let D=c;c=d(!!D&&!v()),D&&(K=>{if(v())return void O(K);K.canvas.style.transition="opacity 320ms cubic-bezier(.16, 1, .3, 1)",K.canvas.style.opacity="0";let se={run:K,timer:setTimeout(()=>{f.delete(se),O(K)},340)};f.add(se)})(D)};return c=d(!1),{get supported(){return!!c&&!u},get field(){return u?null:c?.field??null},get preset(){return l.current.preset},update(A){if(u||!A)return;let{preset:D,...K}=A;"poster"in K&&(a=K.poster),l.current=o(Lo(l.current,K)),K.poster&&l.current.poster&&va(l,K.poster),D&&D!==l.current.preset?Me(D):c&&(c.canvas.style.opacity=b(),c.refresh())},play(){!u&&i&&(i=!1,c?.play())},pause(){u||(i=!0,c?.pause())},setPreset:Me,destroy(){if(!u){u=!0;for(let A of f)clearTimeout(A.timer),A.run.destroy(),r=!0;f.clear(),c?.destroy(),c=null,r&&(I("position",g.position),I("isolation",g.isolation)),xa(l)}}}}function $n(e,n,t=!1){let a=e.clear;return typeof a=="function"||Array.isArray(a)?{rects:a,...e.clearMap}:a?{element:a,...n}:t}function wl(e){let{host:n,layer:t="under",kit:a}=e;if(typeof document>"u")return null;let o=`position:absolute;inset:0;width:100%;height:100%;pointer-events:none;border-radius:inherit;z-index:${t==="under"?-1:"auto"}`;if(!sa())return a?.current.poster&&!e.ownPoster&&Rr(n,a.current.poster,o,a),null;let l=So(),c=document.createElement("canvas");getComputedStyle(n).position==="static"&&l.set(n,"position","relative"),t==="under"&&l.set(n,"isolation","isolate"),c.dataset.asciiKit="",c.setAttribute("style",o),n.appendChild(c);let i=jn(n),u=!1,f=()=>{let O=e.reducedMotion();return O===!0?{speed:0,drift:0,respectReducedMotion:!0}:{respectReducedMotion:O!==!1}},h=()=>Rn(e.ink(i),n,i?"#d8d6cf":"#1d1d1b")??"#888888",M=ya({host:n,canvas:c,kit:a,place:o,ownPoster:e.ownPoster,glyphs:e.glyphs,source:e.source??null,options:()=>({...Vn({...Ar,...e.look(i)},Wn(a)),...f(),ink:h(),interactionTarget:n,label:e.label??""}),onMount:(O,Me)=>{e.label||(Me.removeAttribute("role"),Me.removeAttribute("aria-label"),Me.setAttribute("aria-hidden","true")),e.onMount?.()},onRelease:e.onRelease,onFail:()=>{r(),e.onFail?.()}}),b=M.field,v=!1,d=()=>{u||(i=jn(n),b.update({...Vn({...Ar,...e.look(i)},Wn(a)),...f(),ink:h()}))},g=()=>{v=!1,d()},I=br(()=>{v||u||(v=!0,$t(g))});function r(){u||(u=!0,v&&Yt(g),I(),M.destroy(),l.restore())}return M.start(),M.failed?(r(),null):{field:b,get canvas(){return M.canvas},get live(){return M.live},dark:()=>i,still:()=>!!(e.reducedMotion()??Fr()),refresh:d,destroy:r}}var Po=(e,n)=>e.cursor===!1?"none":typeof e.cursor=="string"?e.cursor:n;function _o(e,n,t,a){let o=null;if(o=wl({host:e.host,kit:e.kit,layer:"under",glyphs:a&&(()=>a(e.settings())),look:c=>{let i=e.settings();return{...n(i,c),...i.look}},ink:c=>e.ink(c)??(c?t.dark:t.light),reducedMotion:e.reducedMotion,onFail:()=>{o=null,e.onFail()}}),!o)return null;let l=o.canvas;return{get field(){return o?.field??null},get canvas(){return o?.canvas??l},refresh(){o?.refresh()},play(){o?.field.play()},pause(){o?.field.pause()},destroy(){o?.destroy(),o=null}}}var dn=()=>typeof innerWidth=="number"&&innerWidth<760,Ks={light:"#86847e",dark:"#7c7a74"},Ma={light:"#8f8d86",dark:"#64625d"},Qs=(e,n)=>e.mark??(e.charset||e.look?.charset?"glyph":n),El=e=>({font:'"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace',fontWeight:400,cellSize:e.cellSize,cellAspect:.62,glyphScale:.86}),Js=e=>({cellSize:e.cellSize,cellAspect:1,dotScale:.68}),Zs={x:.18,y:.2,width:.64,height:.6,feather:.3,shape:"ellipse",pointer:.8};function nt(e){let{scene:n,charset:t,hover:a,middle:o=Zs,feather:l=.3,graphite:c=Ks}=e,i=e.mark??"glyph";return{id:e.id,name:e.name,description:e.description,cellSize:e.cellSize,speed:e.speed??1,cursor:e.cursor??!0,opacity:e.opacity,mount(u){let f=_o(u,(b,v)=>{let d=Qs(b,i);return{scene:n,color:"ink",shade:0,background:"transparent",vignette:0,speed:b.speed,maxPixelRatio:2,levels:"none",blend:"on",...d==="dot"?{mark:"dot",...Js(b)}:{mark:"glyph",charset:b.charset??t,...El(b)},hover:Po(b,a),lantern:{radius:.16,strength:.75,trail:.9,follow:9},trail:{strength:1,radius:.42},fluid:{radius:.09,refraction:.03,glow:.6},clear:$n(b,{padding:0,feather:l,shape:"ellipse",pointer:.8},o),...e.tune?.(b,v)}},c,i==="dot"?b=>({...El(b),charset:t}):void 0);if(!f||!e.extra)return f;let h=e.extra(u,f),M=f.destroy.bind(f);return Object.assign(f,{destroy(){h(),M()}})}}}var Tl=nt({id:"halo",name:"Halo",description:"A corona breathes slowly round the middle, its rays turning; the centre stays empty for a headline.",cellSize:11,scene:"halo",charset:" .\xB7:-=+*",hover:"lantern",middle:!1,feather:.12});var kl=nt({id:"interference",name:"Interference",description:"Two fine ring grids from slowly orbiting centres; where they cross, moir\xE9 bands open and close.",cellSize:11,scene:"interference",charset:" .:-=+*#",hover:"lantern"});var Rl=nt({id:"mesh",name:"Mesh",description:"Four soft lights on slow paths: a gradient mesh written in characters.",cellSize:11,scene:"mesh",charset:" .:-=+*#%@",hover:"trail"});var Al=nt({id:"cascade",name:"Cascade",description:"Streaks fall in three depths: far ones faint and slow, near ones rare, bright and quick.",cellSize:11,scene:"cascade",charset:" .:;|",hover:"lantern",tune:()=>({blend:"off"}),middle:{x:.22,y:.25,width:.56,height:.5,feather:.3,shape:"ellipse"}});var Fl=nt({id:"constellation",name:"Constellation",description:"Points wander and neighbours close enough are linked by fine lines that come and go.",cellSize:11,scene:"constellation",charset:" .\xB7:+*#",hover:"lantern",tune:()=>({blend:"off"})});var Sl=nt({id:"swell",name:"Swell",description:"A fine grid that swells in slow rolling waves, quiet in the middle. Dots by default, or characters.",cellSize:10,opacity:.6,scene:"swell",mark:"dot",charset:" .:-=+*#",hover:"lantern",graphite:Ma,tune:()=>({scale:dn()?1.5:1,contrast:.62,brightness:-.19,blend:"auto",lantern:{radius:.12,strength:.5,trail:1,follow:8},trail:{strength:.7,radius:.35}})});var Ll=nt({id:"drift",name:"Drift",description:"Characters that drift slowly in broad lobes and stay clear around your content.",cellSize:11,scene:"drift",charset:" .:-=+*#",hover:"trail",graphite:Ma,middle:!1,feather:.2,tune:e=>({scale:dn()?e.mark==="dot"?1.8:1.6:1,brightness:e.mark==="dot"?0:.05,blend:"auto",lantern:{radius:.16,strength:.35,trail:.6,follow:9},trail:{strength:.9,radius:e.mark==="dot"?.4:.32},...e.clear?{clear:$n(e,{padding:32,feather:.2,shape:"rect"})}:{}})});var Pl={id:"field",name:"Field",description:"A word becomes the background, drawn by the GPU with a soft wake.",cellSize:13,speed:1,cursor:!0,mount:e=>_o(e,(n,t)=>({scene:"flow",levels:"auto",charset:n.charset??" .,:-+"+n.text.replace(/\s+/g,"").toUpperCase(),font:'"Geist", Arial, sans-serif',fontWeight:500,cellSize:n.cellSize,cellAspect:.8,glyphScale:.76,color:"ink",shade:t?dn()?.1:.4:0,background:"transparent",contrast:1.1,scale:dn()?1.6:1,brightness:dn()&&t?.08:0,vignette:0,speed:n.speed,maxPixelRatio:2,hover:Po(n,"trail"),fluid:{radius:.09,refraction:.04,glow:.7,dissipation:1.3},lantern:{radius:.13,strength:.6,trail:.5,follow:11},trail:{strength:.9,radius:.4}}),{light:"#9a9891",dark:"#7d7b75"})};var _l=class{constructor(e=1,n=3.5,t=!1){this.strokes=[],this.advected=[0,0,0],this.previous=null,this.energy=0,this.continuousWake=t,this.decayRate=n,this.aspect=Math.max(.25,Math.min(4,e));let a=t?96:64;this.columns=this.aspect>=1?a:Math.round(a*this.aspect),this.rows=this.aspect>=1?Math.round(a/this.aspect):a,this.front=new Float32Array(this.columns*this.rows*3),this.back=new Float32Array(this.front.length)}get active(){return this.energy>5e-4||this.strokes.length>0}move(e,n){if(!Number.isFinite(e+n))return;if(this.continuousWake&&!this.previous)return void(this.previous={x:e,y:n});let t=this.previous??{x:e-.004,y:n-.001},a=Math.max(-.09,Math.min(.09,e-t.x)),o=Math.max(-.09,Math.min(.09,n-t.y));if(this.previous={x:e,y:n},Math.abs(a)+Math.abs(o)<1e-4)return;let l=Math.min(1,25*Math.hypot(a*this.aspect,o)+.06);this.strokes.push({x:e,y:n,dx:a,dy:o,speed:l,fromX:t.x,fromY:t.y}),this.strokes.length>12&&this.strokes.shift()}leave(){this.previous=null}clear(){this.front.fill(0),this.back.fill(0),this.strokes.length=0,this.previous=null,this.energy=0}read(e,n,t,a){let o=Math.max(0,Math.min(this.columns-1.001,n*(this.columns-1))),l=Math.max(0,Math.min(this.rows-1.001,t*(this.rows-1))),c=Math.floor(o),i=Math.floor(l),u=o-c,f=l-i,h=3*(i*this.columns+c),M=h+3*this.columns,b=1-u,v=1-f;a[0]=(e[h]*b+e[h+3]*u)*v+(e[M]*b+e[M+3]*u)*f,a[1]=(e[h+1]*b+e[h+4]*u)*v+(e[M+1]*b+e[M+4]*u)*f,a[2]=(e[h+2]*b+e[h+5]*u)*v+(e[M+2]*b+e[M+5]*u)*f}sample(e,n,t){this.read(this.front,e,n,t)}step(e){if(!this.active)return;let n=Math.max(0,Math.min(.05,e)),t=Math.exp(-n*this.decayRate),a=Math.exp(-n*(this.decayRate+.5)),o=Math.max(1,this.aspect),l=Math.max(1,1/this.aspect),c=0;for(let i=0;i<this.rows;i++)for(let u=0;u<this.columns;u++){let f=3*(i*this.columns+u),h=u/(this.columns-1),M=i/(this.rows-1),b=this.continuousWake?.65:2,v=h-this.front[f]*n*b,d=M-this.front[f+1]*n*b;this.read(this.front,v,d,this.advected);let g=this.advected[0]*t,I=this.advected[1]*t,r=this.advected[2]*a;for(let O of this.strokes){let Me=(h-O.x)*o,A=(M-O.y)*l;if(this.continuousWake){let fe=(h-O.fromX)*o,be=(M-O.fromY)*l,U=(O.x-O.fromX)*o,pe=(O.y-O.fromY)*l,Q=Math.max(0,Math.min(1,(fe*U+be*pe)/(U*U+pe*pe||1)));Me=fe-U*Q,A=be-pe*Q;let _=Me*Me+A*A;if(_>.0225)continue;let C=Math.exp(-_/.0032),J=Math.hypot(O.dx*o,O.dy*l),Te=Math.min(.025,.55*J);g+=(4.2*O.dx-A*Te)*C,I+=(4.2*O.dy+Me*Te)*C,r=Math.max(r,Math.min(.7,18*J)*C);continue}let D=Me*Me+A*A;if(D>.045)continue;let K=Math.exp(-D/.0075),se=O.speed;g+=(2.8*O.dx-A*se*.16)*K,I+=(2.8*O.dy+Me*se*.16)*K,r+=se*K*.3}this.back[f]=Math.max(-.18,Math.min(.18,g)),this.back[f+1]=Math.max(-.18,Math.min(.18,I)),this.back[f+2]=Math.min(.8,r),c=Math.max(c,Math.abs(g),Math.abs(I),r)}[this.front,this.back]=[this.back,this.front],this.strokes.length=0,this.energy=c,this.active||this.clear()}},Cl=" .:+-=xICA$FY#@",ba=.58,ec=72649.5/59542.5,Dl={id:"fluid",name:"Fluid",description:"Flowing folds with a soft wake behind the cursor. The original Asciify hero.",cellSize:7,speed:1,cursor:!0,opacity:.7,mount:function(e){let{host:n}=e,t=new _l(1),a=1,o=12,l=0,c=!1,i=null,u=[],f=(v,d)=>((g,I,r)=>Math.max(g,Math.sqrt(I*r*ba/26e3)))(e.settings().cellSize,v,d),h=yl({host:n,kit:e.kit,layer:"under",look:()=>{let v=e.settings();return{mark:"glyph",charset:v.charset??Cl,font:'"JetBrains Mono", monospace',fontWeight:400,cellSize:f(n.clientWidth||1,n.clientHeight||1)/ba,cellAspect:ba,glyphScale:.9,cellFit:"fill",maxPixelRatio:1.5,clear:$n(v,{padding:8,feather:.22,shape:"ellipse"}),color:"ink",shade:0,levels:"none",fit:"cover",gamma:1,contrast:ec,brightness:-.0004316244699164449-.5/Math.max(1,Array.from(v.charset??Cl).length-1),...v.look}},ink:v=>e.ink(v)??"#8f8d86",resolution:(v,d)=>{let g=Math.max(192,Math.min(384,Math.ceil(Math.max(v,d*ba)/f(v,d)))),I=v/d;return I>=1?[g,Math.max(1,Math.round(g/I))]:[Math.max(1,Math.round(g*I)),g]},reducedMotion:e.reducedMotion,onFail:()=>e.onFail(),paint:({pen:v,width:d,height:g,w:I,h:r,now:O,still:Me})=>{let A=e.settings(),D=l?Math.min(.05,(O-l)/1e3):1/60;l=O,Me||(o+=D*A.speed);let K=I/r;if(Math.abs(K-a)>.01&&(t=new _l(K),a=K),Me||!A.cursor)t.clear(),u.length=0;else{let fe=n.getBoundingClientRect();if(fe.width&&fe.height)for(let be of u)t.move((be.x-fe.left)/fe.width,(be.y-fe.top)/fe.height);u.length=0,c&&(t.leave(),c=!1),t.step(D)}i&&i.width===d&&i.height===g||(i=v.createImageData(d,g));let se=i.data;(function(fe,be,U,pe,Q,_){let C=[0,0,0],J=_.active;for(let Te=0;Te<U;Te++)for(let ve=0;ve<be;ve++){let Ae=ve/be,Fe=Te/U;J&&_.sample(Ae,Fe,C);let Ue=(Ae-.5-C[0])*pe,we=Fe-.5-C[1],de=Ue+.22*Math.sin(5.2*we+.17*Q)+.15*Math.sin(2.4*Ue-3.1*we-.1*Q),ie=we+.19*Math.sin(3.5*Ue+.13*Q),k=Math.hypot(.8*de+.18,1.1*ie),H=.5+.5*Math.sin(14*k-2.8*de+1.4*Math.sin(5*ie)-.24*Q),xe=.5+.5*Math.sin(3.6*de-2.9*ie+.09*Q),oe=Math.max(0,Math.min(1,H*H*(.48+.32*xe)-.075+.75*C[2])),Le=Math.round(255*oe),Ie=4*(Te*be+ve);fe[Ie]=fe[Ie+1]=fe[Ie+2]=Le,fe[Ie+3]=255}})(se,d,g,K,o,t);for(let fe=0;fe<se.length;fe+=4){let be=se[fe]<10?0:Math.min(255,1.45*se[fe]);se[fe]=se[fe+1]=se[fe+2]=.299*be+be*(185/232)*.587,se[fe+3]=255}return v.putImageData(i,0,0),!0}});if(!h)return null;let M=v=>{if(v.target instanceof Element&&v.target.closest("button, a, input, select, summary, textarea"))return c=!0,void h.kick();u.push({x:v.clientX,y:v.clientY}),u.length>6&&u.shift(),h.kick()},b=()=>{c=!0,h.kick()};return n.addEventListener("pointermove",M),n.addEventListener("pointerdown",M),n.addEventListener("pointerleave",b),n.addEventListener("pointercancel",b),{get field(){return h.field},get canvas(){return h.canvas},refresh:()=>h.refresh(),play:()=>{l=0,h.play()},pause:()=>h.pause(),destroy(){n.removeEventListener("pointermove",M),n.removeEventListener("pointerdown",M),n.removeEventListener("pointerleave",b),n.removeEventListener("pointercancel",b),h.destroy()}}}};var Ul=nt({id:"caustics",name:"Caustics",description:"Light focused by moving water: fine bright lines that fold, part and meet again.",cellSize:11,scene:"caustics",charset:" .:-=+*#",hover:"lantern",tune:()=>({blend:"off",lantern:{radius:.14,strength:.22,trail:.8,follow:9}})});var Il=nt({id:"contour",name:"Contour",description:"Survey lines over a slowly shifting terrain, every fifth an index line.",cellSize:11,scene:"contour",charset:" .\xB7-~=",hover:"lantern"});var Bl=nt({id:"ripple",name:"Ripple",description:"Still water: drops land here and there and ring outward, and the pointer drops its own.",cellSize:11,scene:"ripple",charset:" .\xB7:-~=",hover:"none",extra(e,n){let{host:t}=e,a=-1e9,o=-1e4,l=-1e4,c=i=>{let u=performance.now();if(e.settings().cursor===!1||u-a<260||Math.hypot(i.clientX-o,i.clientY-l)<48)return;a=u,o=i.clientX,l=i.clientY;let f=n.canvas.getBoundingClientRect();n.field?.pulse({x:i.clientX-f.left,y:i.clientY-f.top,strength:.5})};return t.addEventListener("pointermove",c,{passive:!0}),()=>t.removeEventListener("pointermove",c)}});export{bl as background,Al as cascade,Ul as caustics,Fl as constellation,Il as contour,Ll as drift,Dl as fluid,Tl as halo,kl as interference,Rl as mesh,Bl as ripple,Sl as swell,Pl as wordField};
