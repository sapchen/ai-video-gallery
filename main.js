// 添加到 main.js 顶部
function fixAssetPaths() {
  // 修复 CSS 链接
  const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
  cssLinks.forEach(link => {
    if (link.href.includes('localhost')) return;
    if (!link.href.includes('ai-video-gallery')) {
      link.href = link.href.replace('/style.css', '/ai-video-gallery/style.css');
    }
  });
  
  // 修复 JSON 数据路径
  window.VIDEO_DATA_PATH = `${BASE_PATH}videos.json`;
}


// 在文件顶部添加路径配置
const isLocalhost = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';

// 动态计算基础路径
const BASE_PATH = isLocalhost ? '/' : '/ai-video-gallery/';

// 视频加载时使用
const source = document.createElement('source');
source.src = `${BASE_PATH}videos/${video.fileName}`;


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
                        <source src="/ai-video-gallery/videos/${video.fileName}" type="video/mp4">
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
document.addEventListener('DOMContentLoaded', function() {
    loadVideoGallery();  // 原有函数
    initDynamicSubtitle(); // 新增的动态副标题函数
});

// 在 main.js 文件末尾添加以下代码（在 loadVideoGallery 函数定义之后）

function initDynamicSubtitle() {
    const subtitles = [
        "AI原生视觉实验室",
        "Synthetic Intelligence Visual Lab", 
        "神经网络生成档案馆",
        "11帧未来预览",
        "维度折叠中...",
        "参数空间可视化"
    ];
    
    const subtitleElement = document.querySelector('.subtitle');
    if (!subtitleElement) {
        console.warn('未找到.subtitle元素，请确保HTML中有对应元素');
        return;
    }
    
    let index = 0;
    
    // 初始显示第一个
    subtitleElement.textContent = subtitles[0];
    
    // 每3秒切换一次
    const interval = setInterval(() => {
        index = (index + 1) % subtitles.length;
        subtitleElement.style.opacity = '0.5';
        
        setTimeout(() => {
            subtitleElement.textContent = subtitles[index];
            subtitleElement.style.opacity = '1';
        }, 300);
    }, 3000);
    
    // 添加悬停暂停功能
    subtitleElement.addEventListener('mouseenter', () => {
        clearInterval(interval);
        subtitleElement.style.cursor = 'pointer';
    });
    
    subtitleElement.addEventListener('mouseleave', () => {
        // 重新启动定时器
        const newInterval = setInterval(() => {
            index = (index + 1) % subtitles.length;
            subtitleElement.style.opacity = '0.5';
            
            setTimeout(() => {
                subtitleElement.textContent = subtitles[index];
                subtitleElement.style.opacity = '1';
            }, 300);
        }, 3000);
        
        // 保存新的interval ID以便再次暂停
        subtitleElement.dataset.intervalId = newInterval;
    });
}

// 更新事件监听器
document.addEventListener('DOMContentLoaded', () => {
    fixAssetPaths();
    loadVideoGallery();
    initDynamicSubtitle();
    
    // 更新最后修改日期
    document.getElementById('update-date').textContent = new Date().toLocaleDateString('zh-CN');
});