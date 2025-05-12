// 这里编写自定义js脚本；将被静态引入到页面中
const fnExplosionEffect = function (options = {}) {
    document.documentElement.addEventListener("click", (event) => {
        const { pageX: x, pageY: y } = event;
        const particleCount = options.particleCount || 20; // 默认 20 个粒子
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(x, y);
        }
    });
};

function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.className = "explosion-particle";
    
    // 随机大小 (2px ~ 8px)
    const size = Math.random() * 7 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // 随机颜色 (RGB)
    particle.style.backgroundColor = `rgb(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)}
    )`;
    
    // 随机运动方向 (--tx, --ty)
    const angle = Math.random() * Math.PI * 2; // 0~360°
    const distance = Math.random() * 100 + 50; // 50px~150px
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);
    
    // 初始位置（鼠标点击点）
    particle.style.left = `${x - size / 2}px`;
    particle.style.top = `${y - size / 2}px`;
    
    // 动画结束后移除粒子
    particle.addEventListener("animationend", () => {
        particle.remove();
    });
    
    document.body.appendChild(particle);
}

// 调用示例
fnExplosionEffect({ particleCount: 30 }); // 可自定义粒子数量
