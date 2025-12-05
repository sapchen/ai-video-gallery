(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const l="/ai-video-gallery/";console.log("Base URL:",l);async function a(){try{const o=await fetch(`${l}videos.json`);if(!o.ok)throw new Error(`HTTP ${o.status}: ${o.statusText}`);const t=await o.json();document.getElementById("video-count").textContent=`共 ${t.length} 条视频`;const r=document.getElementById("video-gallery");t.forEach(s=>{const e=document.createElement("div");e.className="video-card",e.innerHTML=`
                <div class="video-wrapper">
                    <video controls preload="metadata" playsinline>
                        <!-- 使用动态路径，而不是硬编码 -->
                        <source src="${l}videos/${s.fileName}" type="video/mp4">
                        您的浏览器不支持视频播放
                    </video>
                    <div class="play-button">▶</div>
                </div>
                <div class="video-info">
                    <h3>#${s.id} ${s.title}</h3>
                    <p class="video-desc">${s.description}</p>
                    <div class="video-meta">
                        <span class="duration">${s.duration}</span>
                        <span class="file-name">${s.fileName}</span>
                    </div>
                </div>
            `,r.appendChild(e);const n=e.querySelector("video"),i=e.querySelector(".play-button");n.addEventListener("play",()=>{i.style.display="none"}),n.addEventListener("pause",()=>{i.style.display="flex"}),i.addEventListener("click",()=>{n.play()})}),document.getElementById("update-date").textContent=new Date().toLocaleDateString("zh-CN")}catch(o){console.error("加载视频失败:",o),document.getElementById("video-gallery").innerHTML='<p class="error">⚠️ 视频加载失败，请刷新页面或检查网络连接</p>'}}function c(){const o=["AI原生视觉实验室","Synthetic Intelligence Visual Lab","神经网络生成档案馆","11帧未来预览","维度折叠中...","参数空间可视化"],t=document.querySelector(".subtitle");if(!t){console.warn("未找到.subtitle元素，请确保HTML中有对应元素");return}let r=0;t.textContent=o[0];const s=setInterval(()=>{r=(r+1)%o.length,t.style.opacity="0.5",setTimeout(()=>{t.textContent=o[r],t.style.opacity="1"},300)},3e3);t.addEventListener("mouseenter",()=>{clearInterval(s),t.style.cursor="pointer"}),t.addEventListener("mouseleave",()=>{const e=setInterval(()=>{r=(r+1)%o.length,t.style.opacity="0.5",setTimeout(()=>{t.textContent=o[r],t.style.opacity="1"},300)},3e3);t.dataset.intervalId=e})}document.addEventListener("DOMContentLoaded",()=>{a(),c()});
