// 资源路径处理函数
function getResourceUrl(path) {
    return new URL(path, window.location.origin).href;
}

// Celestia 类 - 封装每个实例的属性和方法
class Celestia {
    constructor(id) {
        // 创建元素
        this.element = document.createElement('div');
        this.element.className = 'celestia'; // 使用类选择器
        this.element.id = `celestia-${id}`; // 唯一 ID 区分实例

        // 初始状态
        this.isDragging = false;
        // 初始位置限制在可见区域内
        this.x = Math.random() * (window.innerWidth - 102); // 基于实际显示宽度计算
        this.y = Math.random() * (window.innerHeight - 102);
        
        // 图片配置
        this.images = [
            './img/songnixingyi.png',
            './img/texiaoyaowan.png',
            './img/wenhou.png',
            './img/xihuan.png'
        ];

        this.touchImages = [
            './img/danxin.png',
            './img/haixiu.png',
            './img/haoqi.png',
            './img/songnixingxing.png'
        ];

        // 音频配置
        this.sounds = [
            './audio/001.mp3',
            './audio/002.mp3',
            './audio/003.mp3',
            './audio/004.mp3',
            './audio/005.mp3',
            './audio/006.mp3',
            './audio/007.mp3',
            './audio/008.mp3',
            './audio/009.mp3'
        ];

        // 初始化
        this.init();
    }

    // 初始化实例
    init() {
        // 强制设置基础样式（防止外部样式冲突）
        this.element.style.position = 'fixed';
        this.element.style.width = '256px';
        this.element.style.height = '256px';
        this.element.style.backgroundSize = 'contain';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.zIndex = '9999';
        this.element.style.transform = 'scale(0.4)';
        this.element.style.pointerEvents = 'auto'; // 确保可以交互
        
        this.updatePosition();
        this.setRandomImage();
        this.setupEventListeners();
        this.startAutoBehaviors();

        // 确保添加到页面可见区域
        const container = document.body;
        if (container) {
            container.appendChild(this.element);
        } else {
            console.error('页面body元素不存在，无法添加实例');
        }
    }

    // 随机设置默认图片
    setRandomImage() {
        const src = this.images[Math.floor(Math.random() * this.images.length)];
        this.element.style.backgroundImage = `url('${src}')`;
    }

    // 随机设置触摸时的图片
    setRandomTouchImage() {
        const src = this.touchImages[Math.floor(Math.random() * this.touchImages.length)];
        this.element.style.backgroundImage = `url('${src}')`;
    }

    // 播放随机音频
    playRandomSound() {
        const src = this.sounds[Math.floor(Math.random() * this.sounds.length)];
        const sound = new Audio(src);
        sound.play().catch(e => console.log('音频播放失败:', e));
    }

    // 更新位置（精确边界检测）
    updatePosition() {
        // 计算实际显示尺寸（256px * 0.4缩放）
        const displayWidth = 256 * 0.4; // 102.4px
        const displayHeight = 256 * 0.4;
        
        // 计算最大可移动范围
        const maxX = window.innerWidth - displayWidth;
        const maxY = window.innerHeight - displayHeight;
        
        // 限制在窗口内（带缓冲值，避免贴边）
        this.x = Math.max(10, Math.min(this.x, maxX - 10));
        this.y = Math.max(10, Math.min(this.y, maxY - 10));
        
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    // 绑定事件监听
    setupEventListeners() {
        // 鼠标按下（开始拖拽）
        this.element.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.isDragging = true;
            this.element.style.transform = 'scale(0.5)';
            this.setRandomTouchImage();
            this.playRandomSound();
        });

        // 鼠标移动（拖拽中）
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            // 计算拖拽时的正确位置（基于缩放后的中心）
            this.x = e.clientX - (256 * 0.4 / 2);
            this.y = e.clientY - (256 * 0.4 / 2);
            this.updatePosition();
        });

        // 鼠标松开（结束拖拽）
        document.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                this.element.style.transform = 'scale(0.4)';
            }
        });
    }

    // 启动自动行为 - 添加随机初始延迟
    startAutoBehaviors() {
        // 为每个实例生成不同的随机延迟（0到2秒）
        const baseDelay = Math.random() * 2000;
        
        // 随机图片切换间隔（40-50秒）和随机初始延迟
        const imageInterval = 40000 + Math.random() * 10000; // 40-50秒随机
        setTimeout(() => {
            this.imageTimer = setInterval(() => {
                if (!this.isDragging) {
                    this.setRandomImage();
                }
            }, imageInterval);
        }, baseDelay + Math.random() * 3000); // 额外增加0-3秒随机延迟
        
        // 随机移动间隔（2-4秒）和随机初始延迟
        const moveInterval = 2000 + Math.random() * 2000; // 2-4秒随机
        setTimeout(() => {
            this.moveTimer = setInterval(() => {
                if (!this.isDragging) {
                    this.x += (Math.random() - 0.5) * 750;
                    this.y += (Math.random() - 0.5) * 750;
                    this.updatePosition();
                }
            }, moveInterval);
        }, baseDelay + Math.random() * 2000); // 额外增加0-2秒随机延迟
    }

    // 静态方法：预加载所有资源
    static preloadResources() {
        // 图片资源集合
        const allImages = [
            './img/songnixingyi.png',
            './img/texiaoyaowan.png',
            './img/wenhou.png',
            './img/xihuan.png',
            './img/danxin.png',
            './img/haixiu.png',
            './img/haoqi.png',
            './img/songnixingxing.png'
        ];

        // 预加载图片
        allImages.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => console.log(`图片预加载完成: ${src}`);
            img.onerror = () => console.error(`图片加载失败: ${src}`);
        });

        // 预加载音频
        const allSounds = [
            './audio/001.mp3',
            './audio/002.mp3',
            './audio/003.mp3',
            './audio/004.mp3',
            './audio/005.mp3',
            './audio/006.mp3',
            './audio/007.mp3',
            './audio/008.mp3',
            './audio/009.mp3'
        ];
        
        allSounds.forEach(src => {
            const audio = new Audio();
            // 使用事件监听方式处理加载错误，而非Promise
            audio.addEventListener('error', () => {
                console.error(`音频预加载失败: ${src}`, audio.error);
            });
            audio.addEventListener('loadeddata', () => {
                console.log(`音频预加载完成: ${src}`);
            });
            audio.src = src; // 设置src触发加载
        });
    }

    // 静态方法：批量创建实例
    static createMultiple(count) {
        // 确保页面加载完成后再创建
        if (document.readyState === 'complete') {
            for (let i = 0; i < count; i++) {
                new Celestia(i);
            }
        } else {
            window.addEventListener('load', () => {
                for (let i = 0; i < count; i++) {
                    new Celestia(i);
                }
            });
        }
    }
}
