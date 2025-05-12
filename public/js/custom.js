// 这里编写自定义js脚本；将被静态引入到页面中
/**
 * 初始化点击爆炸效果
 * @param {Object} options 配置参数
 */
function initClickEffect(options = {}) {
    const config = {
        // 圆圈参数
        circleColor: 'random',   // 颜色（或CSS颜色值）
        circleSize: 100,        // 最大扩散尺寸（px）
        
        // 粒子参数
        particleCount: 20,      // 粒子数量
        particleSize: [2, 8],   // 粒子大小范围（px）
        particleDistance: [50, 150], // 飞散距离（px）
        particleSpeed: [100, 300],  // 粒子速度（px/秒）
        
        ...options // 自定义参数
    };

    document.addEventListener('click', (e) => {
        const { clientX: x, clientY: y } = e;
        
        // 1. 创建圆圈
        createCircle(x, y, config);
        
        // 2. 创建爆炸粒子
        createParticles(x, y, config);
    });

    // 创建圆圈
    function createCircle(x, y, config) {
        const circle = document.createElement('div');
        circle.className = 'click-circle';
        
        // 设置颜色
        circle.style.borderColor = config.circleColor === 'random' 
            ? `hsl(${Math.random() * 360}, 100%, 50%)` 
            : config.circleColor;
        
        // 设置动画属性
        circle.style.setProperty('--circle-size', `${config.circleSize}px`);
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        
        circle.addEventListener('animationend', () => circle.remove());
        document.body.appendChild(circle);
    }

    // 创建爆炸粒子
    function createParticles(x, y, config) {
        for (let i = 0; i < config.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            
            // 随机粒子属性
            const size = Math.random() * (config.particleSize[1] - config.particleSize[0]) + config.particleSize[0];
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (config.particleDistance[1] - config.particleDistance[0]) + config.particleDistance[0];
            const speed = Math.random() * (config.particleSpeed[1] - config.particleSpeed[0]) + config.particleSpeed[0];
            
            // 设置样式
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
            particle.style.setProperty('--duration', `${distance / speed}s`);
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            particle.addEventListener('animationend', () => particle.remove());
            document.body.appendChild(particle);
        }
    }
}

// 调用（默认参数）
initClickEffect();

// 如需自定义：
// initClickEffect({ 
//   circleColor: '#ff0000', 
//   particleCount: 30 
// });
