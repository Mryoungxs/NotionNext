// 这里编写自定义js脚本；将被静态引入到页面中
/**
 * 初始化点击特效
 * @param {Object} options 配置对象（可选）
 */
function initClickEffect(options = {}) {
    // ============= 参数合并 =============
    const config = {
        // 圆圈参数
        circleColor: 'random',   // 颜色（或具体颜色值如'#ff0000'）
        circleSize: 100,         // 最大扩散尺寸（px）
        circleDuration: 0.8,     // 动画时长（秒）
        
        // 粒子参数
        particleCount: 20,       // 粒子数量
        particleSize: [2, 12],   // 粒子大小范围（px）
        particleDistance: [50, 150], // 飞散距离范围（px）
        particleSpeed: [100, 300],  // 粒子速度范围（px/秒）
        explosionDelay: 100,     // 粒子延迟出现时间（ms）
        
        ...options // 用户自定义参数覆盖默认值
    };

    // ============= 点击事件监听 =============
    document.addEventListener('click', (e) => {
        const { clientX: x, clientY: y } = e;
        
        // 1. 创建扩散圆圈
        createCircle(x, y, config);
        
        // 2. 延迟创建爆炸粒子（避免与圆圈动画重叠）
        setTimeout(() => {
            createParticles(x, y, config);
        }, config.explosionDelay);
    });

    // ============= 工具函数 =============
    /**
     * 生成指定范围内的随机数
     */
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * 创建扩散圆圈
     */
    function createCircle(x, y, config) {
        const circle = document.createElement('div');
        circle.className = 'click-circle';
        
        // 设置颜色
        if (config.circleColor === 'random') {
            circle.style.borderColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        } else {
            circle.style.borderColor = config.circleColor;
        }
        
        // 设置动画属性
        circle.style.setProperty('--circle-size', `${config.circleSize}px`);
        circle.style.animation = `circleExpand ${config.circleDuration}s ease-out forwards`;
        
        // 设置初始位置
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        
        // 动画结束后清理
        circle.addEventListener('animationend', () => circle.remove());
        
        document.body.appendChild(circle);
    }

    /**
     * 创建爆炸粒子
     */
    function createParticles(x, y, config) {
        for (let i = 0; i < config.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            
            // 随机粒子属性
            const size = randomInRange(...config.particleSize);
            const angle = Math.random() * Math.PI * 2;
            const distance = randomInRange(...config.particleDistance);
            const speed = randomInRange(...config.particleSpeed);
            const duration = distance / speed;
            
            // 设置样式
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.left = `${x - size / 2}px`;
            particle.style.top = `${y - size / 2}px`;
            
            // 动画结束后移除
            particle.addEventListener('animationend', () => particle.remove());
            
            document.body.appendChild(particle);
        }
    }
}

// ============= 初始化调用 =============
initClickEffect({
    circleColor: 'random',
    circleSize: 70,
    particleCount: 30,
    particleSpeed: [40, 100],
    particleDistance: [80, 200]
});
