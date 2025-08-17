const Celestia = document.getElementById('Celestia');
let isDragging = false;
let CelestiaX = 50, CelestiaY = 50;

function getResourceUrl(path){
  return new URL(path, window.location.origin).href;
}

// 宠物图片配置
const CelestiaImages = [
  './img/songnixingyi.png',
  './img/texiaoyaowan.png',
  './img/wenhou.png',
  './img/xihuan.png'
];

const CelestiaTouchImages = [
  './img/danxin.png',
  './img/haixiu.png',
  './img/haoqi.png',
  './img/songnixingxing.png'
];

// 音频文件配置
const CelestiaSounds = [
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

// 初始位置
updatePosition();

// 随机选择宠物图片
function getRandomImage() {
  return CelestiaImages[Math.floor(Math.random() * CelestiaImages.length)];
}

function getRandomTouchImage() {
  return CelestiaTouchImages[Math.floor(Math.random() * CelestiaTouchImages.length)];
}

// 播放随机语音
function playRandomSound() {
  const sound = new Audio(CelestiaSounds[Math.floor(Math.random() * CelestiaSounds.length)]);
  sound.play();
}

// 设置宠物图片 - 已修复此处语法错误
function setCelestiaImage(src) {
  Celestia.style.backgroundImage = `url('${src}')`;  // 使用模板字符串
}

// 初始化设置随机图片
setCelestiaImage(getRandomImage());

// 每45秒更换一次宠物图片
setInterval(() => {
  if (!isDragging) {
    setCelestiaImage(getRandomImage());
  }
}, 45000); // 45秒

// 自动移动（每3秒换方向）
setInterval(() => {
    if (isDragging) return;
    CelestiaX += (Math.random() - 0.5) * 200;
    CelestiaY += (Math.random() - 0.5) * 200;
    updatePosition();
}, 3000);

// 拖拽功能
Celestia.addEventListener('mousedown', (e) => {
  isDragging = true;
  Celestia.style.transform = 'scale(0.5)'; // 点击反馈

  // 点击更换图片
  setCelestiaImage(getRandomTouchImage());

  // 点击播放语音
  playRandomSound();
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  CelestiaX = e.clientX - 128;
  CelestiaY = e.clientY - 128;
  updatePosition();
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  Celestia.style.transform = 'scale(0.4)';
});

// 边界检测
function updatePosition() {
  const scaledWidth = 128; // 256px * 0.5 scale
  const maxX = window.innerWidth - scaledWidth;
  const maxY = window.innerHeight - scaledWidth;
  CelestiaX = Math.max(0, Math.min(CelestiaX, maxX));
  CelestiaY = Math.max(0, Math.min(CelestiaY, maxY));
  Celestia.style.left = `${CelestiaX}px`;
  Celestia.style.top = `${CelestiaY}px`;
}

// 预加载资源
window.addEventListener('load', () => {
  // 预加载所有图片
  CelestiaImages.forEach(src => {
    new Image().src = src;
  });

  CelestiaTouchImages.forEach(src => {
    new Image().src = src;
  });
  
  // 预加载所有音频
  CelestiaSounds.forEach(src => {
    new Audio(src);
  });
});