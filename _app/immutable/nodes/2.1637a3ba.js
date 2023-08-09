import{N as Pe,O as fe,S as K,i as Q,s as Z,e as j,b as M,H as ee,g as O,v as te,d as V,f as ne,h as E,o as le,k as I,l as N,m as A,n as H,P as he,E as L,Q as G,R as me,T as _e,U as re,M as x,a as S,c as B,V as Ve,W as de,X as F,q as X,y as Ne,Y as J,r as Y,z as Ae,A as Me,Z as ge,_ as ye,B as Se,$ as qe,u as pe,w as ve}from"../chunks/index.7ff5f637.js";import{w as se}from"../chunks/index.9aebe0c3.js";function Be(l){const e=l-1;return e*e*e+1}function be(l,{delay:e=0,duration:t=400,easing:n=Pe}={}){const r=+getComputedStyle(l).opacity;return{delay:e,duration:t,easing:n,css:s=>`opacity: ${s*r}`}}function $(l,{delay:e=0,duration:t=400,easing:n=Be,x:r=0,y:s=0,opacity:i=0}={}){const a=getComputedStyle(l),c=+a.opacity,f=a.transform==="none"?"":a.transform,g=c*(1-i),[d,y]=fe(r),[h,v]=fe(s);return{delay:e,duration:t,easing:n,css:(k,b)=>`
			transform: ${f} translate(${(1-k)*d}${y}, ${(1-k)*h}${v});
			opacity: ${c-g*b}`}}function we(l){let e,t,n,r,s,i,a,c,f,g;return{c(){e=I("button"),t=I("img"),this.h()},l(d){e=N(d,"BUTTON",{class:!0});var y=A(e);t=N(y,"IMG",{class:!0,src:!0,alt:!0}),y.forEach(E),this.h()},h(){H(t,"class","detail-image svelte-17ms1nj"),he(t.src,n=l[3])||H(t,"src",n),H(t,"alt",l[2]),H(e,"class","image-detail-mask svelte-17ms1nj")},m(d,y){M(d,e,y),L(e,t),c=!0,f||(g=ee(e,"click",l[9]),f=!0)},p(d,y){l=d,(!c||y&8&&!he(t.src,n=l[3]))&&H(t,"src",n),(!c||y&4)&&H(t,"alt",l[2])},i(d){c||(G(()=>{c&&(s&&s.end(1),r=me(t,l[5],{}),r.start())}),G(()=>{c&&(a&&a.end(1),i=me(e,be,{duration:100}),i.start())}),c=!0)},o(d){r&&r.invalidate(),s=_e(t,$,l[4]),i&&i.invalidate(),a=_e(e,be,{duration:l[1]}),c=!1},d(d){d&&E(e),d&&s&&s.end(),d&&a&&a.end(),f=!1,g()}}}function We(l){let e,t,n,r,s=l[0]&&we(l);return{c(){s&&s.c(),e=j()},l(i){s&&s.l(i),e=j()},m(i,a){s&&s.m(i,a),M(i,e,a),t=!0,n||(r=ee(window,"keydown",l[6]),n=!0)},p(i,[a]){i[0]?s?(s.p(i,a),a&1&&O(s,1)):(s=we(i),s.c(),O(s,1),s.m(e.parentNode,e)):s&&(te(),V(s,1,1,()=>{s=null}),ne())},i(i){t||(O(s),t=!0)},o(i){V(s),t=!1},d(i){s&&s.d(i),i&&E(e),n=!1,r()}}}const Ee="image-detail-button";function Ue(l,e,t){let n,r,{element:s}=e,{visible:i=!1}=e,{durationIn:a=250}=e,{durationOut:c=500}=e;const f={duration:c,y:50};le(()=>{const h=s.parentElement;if(!h||h.tagName==="BUTTON"&&h.className===Ee)return;const v=document.createElement("button");v.addEventListener("click",()=>t(0,i=!0)),v.className=Ee,h.insertBefore(v,s),v.appendChild(s)});const g=h=>{const v=s.getBoundingClientRect(),k=h.getBoundingClientRect(),b=v.x-k.x,m=v.y-k.y,_=v.width/k.width,T=v.height/k.height;return{css:(D,U)=>`
				translate: ${U*b}px ${U*m}px;
				scale: ${_+D*(1-_)} ${T+D*(1-T)};
			`,duration:a,easing:Be}},d=h=>{i&&h.key==="Escape"&&t(0,i=!1)},y=()=>t(0,i=!1);return l.$$set=h=>{"element"in h&&t(7,s=h.element),"visible"in h&&t(0,i=h.visible),"durationIn"in h&&t(8,a=h.durationIn),"durationOut"in h&&t(1,c=h.durationOut)},l.$$.update=()=>{l.$$.dirty&128&&t(3,n=s.src),l.$$.dirty&128&&t(2,r=s.alt)},[i,c,r,n,f,g,d,s,a,y]}class Re extends K{constructor(e){super(),Q(this,e,Ue,We,Z,{element:7,visible:0,durationIn:8,durationOut:1})}}function ze(l,e,t){let n,{mathContainer:r}=e,s=1;const i=()=>{s!==1?t(1,s=1):(t(1,s=r.clientWidth/r.scrollWidth),r.scrollTo({left:0,top:0,behavior:"smooth"}))};return le(()=>{t(0,r.onclick=()=>i(),r),i()}),l.$$set=a=>{"mathContainer"in a&&t(0,r=a.mathContainer)},l.$$.update=()=>{l.$$.dirty&1&&(n=r.firstElementChild),l.$$.dirty&3&&r.classList.toggle("fit",s!==1),l.$$.dirty&2&&(n.style.scale=s.toString())},[r,s]}class Xe extends K{constructor(e){super(),Q(this,e,ze,null,Z,{mathContainer:0})}}const Ye=l=>{const e=l.querySelectorAll('a[href^="#"]:not([data-is-citation])'),t=Array.from(e.values()).map(n=>{const r=()=>{try{var s=l.querySelector(n.getAttribute("href")??"_")}catch{return}s&&(ie.set(s),Oe.set(n))};return n.addEventListener("mouseenter",r),r});return{destroy:()=>{e.forEach((n,r)=>n.removeEventListener("mouseenter",t[r]))}}},ie=se(null),Oe=(()=>{const l=se(null),e=()=>{l.set(null),ie.set(null)};return{subscribe:l.subscribe,set:t=>{const n=re(l);n&&n.removeEventListener("mouseleave",e),t==null||t.addEventListener("mouseleave",e),l.set(t)}}})();function ke(l){let e,t,n,r,s,i,a;return{c(){e=I("div"),t=I("div"),n=S(),r=I("div"),this.h()},l(c){e=N(c,"DIV",{style:!0,class:!0});var f=A(e);t=N(f,"DIV",{class:!0});var g=A(t);g.forEach(E),n=B(f),r=N(f,"DIV",{class:!0}),A(r).forEach(E),f.forEach(E),this.h()},h(){H(t,"class","content"),H(r,"class","gradient"),H(e,"style",l[5]),H(e,"class","preview svelte-46vjkm"),G(()=>l[13].call(e))},m(c,f){M(c,e,f),L(e,t),t.innerHTML=l[3],L(e,n),L(e,r),s=Ve(e,l[13].bind(e)),a=!0},p(c,f){(!a||f&8)&&(t.innerHTML=c[3]),(!a||f&32)&&H(e,"style",c[5])},i(c){a||(G(()=>{a&&(i||(i=de(e,$,{y:20},!0)),i.run(1))}),a=!0)},o(c){i||(i=de(e,$,{y:20},!1)),i.run(0),a=!1},d(c){c&&E(e),s(),c&&i&&i.end()}}}function je(l){let e,t,n=l[4]&&l[2]&&ke(l);return{c(){n&&n.c(),e=j()},l(r){n&&n.l(r),e=j()},m(r,s){n&&n.m(r,s),M(r,e,s),t=!0},p(r,[s]){r[4]&&r[2]?n?(n.p(r,s),s&20&&O(n,1)):(n=ke(r),n.c(),O(n,1),n.m(e.parentNode,e)):n&&(te(),V(n,1,1,()=>{n=null}),ne())},i(r){t||(O(n),t=!0)},o(r){V(n),t=!1},d(r){n&&n.d(r),r&&E(e)}}}function Ge(l,e,t){let n,r,s,i,a,c,f;x(l,Oe,m=>t(11,c=m)),x(l,ie,m=>t(12,f=m));let g=0,d=0,y,h,v=!1,k;function b(){y=this.clientWidth,h=this.clientHeight,t(0,y),t(1,h)}return l.$$.update=()=>{if(l.$$.dirty&4096&&t(2,n=f),l.$$.dirty&2048&&t(10,r=c),l.$$.dirty&516&&(n?t(9,k=setTimeout(()=>t(8,v=!0),500)):(t(8,v=!1),clearTimeout(k))),l.$$.dirty&260&&t(4,s=v&&n),l.$$.dirty&1235&&s&&r){const m=r.getBoundingClientRect();t(6,g=m.x+window.scrollX+m.width/2-y/2),m.y<window.innerHeight/2?t(7,d=m.y+m.height):t(7,d=m.y-m.height-h),t(6,g=Math.max(0,Math.min(window.innerWidth-y,g))),t(7,d=Math.max(0,Math.min(window.innerHeight-h,d))),t(6,g+=window.scrollX),t(7,d+=window.scrollY)}l.$$.dirty&192&&t(5,i=`--x: ${g}px; top: ${d}px;`),l.$$.dirty&12&&t(3,a=(()=>{let _="",T=n;for(let D=0;T&&D<3;D++)_+=T.outerHTML,T=T.nextElementSibling;return _})())},[y,h,n,a,s,i,g,d,v,k,r,c,f,b]}class Ke extends K{constructor(e){super(),Q(this,e,Ge,je,Z,{})}}const Qe=l=>e=>{e.preventDefault();let t=null;try{t=document.querySelector(l.hash)}catch{}t&&(e.preventDefault(),t.scrollIntoView({behavior:"smooth"}),z.update(n=>n.concat({scrollPosition:window.scrollY,toHash:l.hash})))},z=se([]),Le=l=>{const e=l.detail;window.scrollTo({top:re(z)[e].scrollPosition,behavior:"smooth"}),z.update(t=>[...t.slice(0,e),...t.slice(e+1)])},Ze=l=>{window.addEventListener("popstate",n=>{re(z).length&&n.preventDefault()}),l.addEventListener("history:restore",Le);const e=l.querySelectorAll('a[href^="#"]'),t=Array.from(e.values()).map(n=>{const r=Qe(n);return n.addEventListener("click",r),r});return{destroy:()=>{e.forEach((n,r)=>n.removeEventListener("click",t[r])),l.removeEventListener("history:restore",Le)}}};function Te(l,e,t){const n=l.slice();return n[15]=e[t],n[17]=t,n}function Ce(l,e,t){const n=l.slice();return n[18]=e[t],n}function He(l){let e,t;return e=new Re({props:{element:l[18]}}),{c(){Ne(e.$$.fragment)},l(n){Ae(e.$$.fragment,n)},m(n,r){Me(e,n,r),t=!0},p(n,r){const s={};r&4&&(s.element=n[18]),e.$set(s)},i(n){t||(O(e.$$.fragment,n),t=!0)},o(n){V(e.$$.fragment,n),t=!1},d(n){Se(e,n)}}}function Ie(l){let e,t=l[15].scrollPosition+"",n,r,s,i,a=l[15].toHash+"",c,f,g,d,y,h,v;function k(){return l[11](l[17])}return{c(){e=I("li"),n=X(t),r=S(),s=I("br"),i=S(),c=X(a),f=S(),g=I("button"),d=X("restore"),y=S()},l(b){e=N(b,"LI",{});var m=A(e);n=Y(m,t),r=B(m),s=N(m,"BR",{}),i=B(m),c=Y(m,a),f=B(m),g=N(m,"BUTTON",{});var _=A(g);d=Y(_,"restore"),_.forEach(E),y=B(m),m.forEach(E)},m(b,m){M(b,e,m),L(e,n),L(e,r),L(e,s),L(e,i),L(e,c),L(e,f),L(e,g),L(g,d),L(e,y),h||(v=ee(g,"click",k),h=!0)},p(b,m){l=b,m&8&&t!==(t=l[15].scrollPosition+"")&&pe(n,t),m&8&&a!==(a=l[15].toHash+"")&&pe(c,a)},d(b){b&&E(e),h=!1,v()}}}function Fe(l){let e,t,n,r,s=`<style scoped>${l[6]}</style>`,i,a,c,f,g,d,y,h,v=l[7].html+"",k,b,m,_,T,D,U,oe,q=l[2],p=[];for(let o=0;o<q.length;o+=1)p[o]=He(Ce(l,q,o));const De=o=>V(p[o],1,1,()=>{p[o]=null});b=new Ke({});let R=l[3],C=[];for(let o=0;o<R.length;o+=1)C[o]=Ie(Te(l,R,o));return{c(){e=I("div");for(let o=0;o<p.length;o+=1)p[o].c();t=S(),n=I("div"),r=new F(!1),i=S(),a=new F(!1),c=S(),f=I("section"),g=I("h2"),d=X("Bibliography"),y=S(),h=new F(!1),k=S(),Ne(b.$$.fragment),m=S(),_=I("nav"),T=I("ul");for(let o=0;o<C.length;o+=1)C[o].c();this.h()},l(o){e=N(o,"DIV",{class:!0});var w=A(e);for(let W=0;W<p.length;W+=1)p[W].l(w);w.forEach(E),t=B(o),n=N(o,"DIV",{class:!0});var u=A(n);r=J(u,!1),i=B(u),a=J(u,!1),c=B(u),f=N(u,"SECTION",{class:!0});var P=A(f);g=N(P,"H2",{});var ae=A(g);d=Y(ae,"Bibliography"),ae.forEach(E),y=B(P),h=J(P,!1),P.forEach(E),u.forEach(E),k=B(o),Ae(b.$$.fragment,o),m=B(o),_=N(o,"NAV",{class:!0});var ce=A(_);T=N(ce,"UL",{});var ue=A(T);for(let W=0;W<C.length;W+=1)C[W].l(ue);ue.forEach(E),ce.forEach(E),this.h()},h(){H(e,"class","image-details"),r.a=i,a.a=c,h.a=null,H(f,"class","bibliography svelte-gxmup"),H(n,"class","container svelte-gxmup"),H(_,"class","svelte-gxmup")},m(o,w){M(o,e,w);for(let u=0;u<p.length;u+=1)p[u]&&p[u].m(e,null);l[9](e),M(o,t,w),M(o,n,w),r.m(s,n),L(n,i),a.m(l[5],n),L(n,c),L(n,f),L(f,g),L(g,d),L(f,y),h.m(v,f),l[10](n),M(o,k,w),Me(b,o,w),M(o,m,w),M(o,_,w),L(_,T);for(let u=0;u<C.length;u+=1)C[u]&&C[u].m(T,null);D=!0,U||(oe=[ge(Ze.call(null,n)),ge(Ye.call(null,n))],U=!0)},p(o,[w]){if(w&4){q=o[2];let u;for(u=0;u<q.length;u+=1){const P=Ce(o,q,u);p[u]?(p[u].p(P,w),O(p[u],1)):(p[u]=He(P),p[u].c(),O(p[u],1),p[u].m(e,null))}for(te(),u=q.length;u<p.length;u+=1)De(u);ne()}if(w&24){R=o[3];let u;for(u=0;u<R.length;u+=1){const P=Te(o,R,u);C[u]?C[u].p(P,w):(C[u]=Ie(P),C[u].c(),C[u].m(T,null))}for(;u<C.length;u+=1)C[u].d(1);C.length=R.length}},i(o){if(!D){for(let w=0;w<q.length;w+=1)O(p[w]);O(b.$$.fragment,o),D=!0}},o(o){p=p.filter(Boolean);for(let w=0;w<p.length;w+=1)V(p[w]);V(b.$$.fragment,o),D=!1},d(o){o&&E(e),ye(p,o),l[9](null),o&&E(t),o&&E(n),l[10](null),o&&E(k),Se(b,o),o&&E(m),o&&E(_),ye(C,o),U=!1,qe(oe)}}}function Je(l,e,t){let n;x(l,z,_=>t(3,n=_));let r,s,i=[];const a=_=>{r.dispatchEvent(new CustomEvent("history:restore",{detail:_}))};let{data:c}=e;const{html:f,css:g,headings:d,bibliography:y}=c,h=()=>{const _=r.querySelectorAll(".math.math-display");for(const T of _)T.scrollWidth<=T.clientWidth||new Xe({target:T,props:{mathContainer:T}})},v=()=>{t(2,i=Array.from(r.querySelectorAll("img")))};le(()=>{h(),v()});function k(_){ve[_?"unshift":"push"](()=>{s=_,t(1,s)})}function b(_){ve[_?"unshift":"push"](()=>{r=_,t(0,r)})}const m=_=>a(_);return l.$$set=_=>{"data"in _&&t(8,c=_.data)},[r,s,i,n,a,f,g,y,c,k,b,m]}class et extends K{constructor(e){super(),Q(this,e,Je,Fe,Z,{data:8})}}export{et as component};