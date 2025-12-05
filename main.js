// 加载视频配置并生成画廊
async function loadVideoGallery() {
    try {
        // 1. 加载视频配置
        const response = await fetch('/videos.json');
        const videos = await response.json();
        
        // 2. 更新视频数量显示
        document.getElementById('video-count').textContent = `共 ${videos.length} 条视频`;
        
        // 3. 生成视频卡片
        const gallery = document.getElementById('video-gallery');
        
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <div class="video-wrapper">
                    <video controls preload="metadata" playsinline>
                        <source src="/videos/${video.fileName}" type="video/mp4">
                        您的浏览器不支持视频播放
                    </video>
                    <div class="play-button">▶</div>
                </div>
                <div class="video-info">
                    <h3>#${video.id} ${video.title}</h3>
                    <p class="video-desc">${video.description}</p>
                    <div class="video-meta">
                        <span class="duration">${video.duration}</span>
                        <span class="file-name">${video.fileName}</span>
                    </div>
                </div>
            `;
            
            gallery.appendChild(videoCard);
            
            // 添加视频悬停效果
            const videoEl = videoCard.querySelector('video');
            const playBtn = videoCard.querySelector('.play-button');
            
            videoEl.addEventListener('play', () => playBtn.style.display = 'none');
            videoEl.addEventListener('pause', () => playBtn.style.display = 'block');
        });
        
        // 4. 更新最后修改日期
        document.getElementById('update-date').textContent = new Date().toLocaleDateString('zh-CN');
        
    } catch (error) {
        console.error('加载视频失败:', error);
        document.getElementById('video-gallery').innerHTML = 
            '<p class="error">⚠️ 视频加载失败，请刷新页面或检查网络连接</p>';
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadVideoGallery);