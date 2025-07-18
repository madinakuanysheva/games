// Armansu Dance - Простая версия без AI
// Только камера + видео + автоматическая победа в пиксельном стиле

class SimpleJustDance {
    constructor() {
        this.userCamera = null;
        this.danceVideo = null;
        this.currentScreen = 'mainScreen';
        this.isGameRunning = false;
        this.gameStartTime = null;
        
        this.init();
    }

    init() {
        console.log('🎮 Инициализация Armansu Dance...');
        this.setupElements();
        this.setupEventListeners();
        this.showScreen('mainScreen');
    }

    setupElements() {
        // Основные элементы
        this.screens = {
            mainScreen: document.getElementById('mainScreen'),
            gameScreen: document.getElementById('gameScreen'),
            resultsScreen: document.getElementById('resultsScreen'),
            cameraErrorScreen: document.getElementById('cameraErrorScreen')
        };

        // Видео элементы
        this.userCamera = document.getElementById('userCamera');
        this.danceVideo = document.getElementById('danceVideo');
        
        // Кнопки
        this.startButton = document.getElementById('startButton');
        this.pauseButton = document.getElementById('pauseButton');
        this.playAgainButton = document.getElementById('playAgainButton');
        this.backToMenuButton = document.getElementById('backToMenuButton');
        this.retryCamera = document.getElementById('retryCamera');
        this.backToMiniGame = document.getElementById('backToMiniGame');
        this.nextLevelButton = document.getElementById('nextLevelButton');
        this.quickCryButton = document.getElementById('quickCryButton');
        
        // Другие элементы
        this.countdown = document.getElementById('countdown');
    }

    setupEventListeners() {
        // Главное меню
        this.startButton?.addEventListener('click', () => this.startGame());
        
        // Игровые контролы
        this.pauseButton?.addEventListener('click', () => this.pauseGame());
        
        // Результаты
        this.playAgainButton?.addEventListener('click', () => this.startGame());
        this.backToMenuButton?.addEventListener('click', () => this.showScreen('mainScreen'));
        this.nextLevelButton?.addEventListener('click', () => {
            window.location.href = 'mentors_game.html';
        });
        this.quickCryButton?.addEventListener('click', () => {
            window.location.href = 'simple_voice_game.html?mentor=bahredin';
        });
        
        // Ошибка камеры
        this.retryCamera?.addEventListener('click', () => this.setupCamera());
        
        // Возврат к мини-игре
        this.backToMiniGame?.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        
        // Обработчик окончания видео
        if (this.danceVideo) {
            this.danceVideo.addEventListener('ended', () => this.endGame());
        }
    }

    showScreen(screenName) {
        console.log(`📱 Переход на экран: ${screenName}`);
        
        // Скрыть все экраны
        Object.values(this.screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
        });
        
        // Показать нужный экран
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
            this.currentScreen = screenName;
        }
    }

    async setupCamera() {
        console.log('📷 Настройка камеры...');
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                },
                audio: false
            });
            
            if (this.userCamera) {
                this.userCamera.srcObject = stream;
                console.log('✅ Камера подключена');
                return true;
            }
        } catch (error) {
            console.error('❌ Ошибка доступа к камере:', error);
            this.showScreen('cameraErrorScreen');
            return false;
        }
    }

    async startGame() {
        console.log('🎮 Запуск игры...');
        
        // Настроить камеру
        const cameraOk = await this.setupCamera();
        if (!cameraOk) return;
        
        // Перейти на игровой экран
        this.showScreen('gameScreen');
        
        // Запустить обратный отсчет
        await this.showCountdown();
        
        // Запустить видео и игру
        this.startGameplay();
    }

    async showCountdown() {
        const countdownElement = this.countdown;
        if (!countdownElement) return;
        
        const counts = ['3', '2', '1', 'ТАНЦУЙ!'];
        
        for (const count of counts) {
            countdownElement.textContent = count;
            countdownElement.style.opacity = '1';
            countdownElement.style.transform = 'scale(1.2)';
            
            await this.sleep(800);
            
            countdownElement.style.opacity = '0';
            countdownElement.style.transform = 'scale(0.8)';
            
            await this.sleep(200);
        }
        
        countdownElement.textContent = '';
    }

    startGameplay() {
        console.log('🎵 Начало танца!');
        
        this.isGameRunning = true;
        this.gameStartTime = Date.now();
        
        // Запустить танцевальное видео
        if (this.danceVideo) {
            this.danceVideo.currentTime = 0;
            this.danceVideo.play().catch(error => {
                console.error('Ошибка воспроизведения видео:', error);
            });
        }
        
        // Показать кнопку паузы
        if (this.pauseButton) {
            this.pauseButton.style.display = 'block';
        }
    }

    pauseGame() {
        console.log('⏸️ Пауза игры');
        
        if (this.danceVideo) {
            if (this.danceVideo.paused) {
                this.danceVideo.play();
                this.pauseButton.textContent = '⏸️ ПАУЗА';
            } else {
                this.danceVideo.pause();
                this.pauseButton.textContent = '▶️ ПРОДОЛЖИТЬ';
            }
        }
    }

    endGame() {
        console.log('🏁 Конец игры!');
        
        this.isGameRunning = false;
        
        // Скрыть кнопку паузы
        if (this.pauseButton) {
            this.pauseButton.style.display = 'none';
        }
        
        // Показать результаты через небольшую задержку
        setTimeout(() => {
            this.showResults();
        }, 1000);
    }

    showResults() {
        console.log('🎉 Показ результатов - все всегда побеждают!');
        
        // Добавить анимацию звезд
        const stars = document.querySelector('.stars');
        if (stars) {
            stars.style.animation = 'sparkle 2s ease-in-out infinite';
        }
        
        // Случайные мотивационные фразы в пиксельном стиле
        const motivationalTexts = [
            'ПРОДОЛЖАЙ ТАНЦЕВАТЬ!',
            'ТЫ СУПЕР!',
            'ОТЛИЧНЫЕ ДВИЖЕНИЯ!',
            'ТЫ ЗАЖИГАЕШЬ!',
            'НЕВЕРОЯТНЫЙ ТАНЕЦ!',
            'ТЫ ТАЛАНТ!',
            'БРАВО!',
            'ПОТРЯСАЮЩЕ!'
        ];
        
        const randomText = motivationalTexts[Math.floor(Math.random() * motivationalTexts.length)];
        const motivationalElement = document.querySelector('.motivational-text');
        if (motivationalElement) {
            motivationalElement.textContent = randomText;
        }
        
        this.showScreen('resultsScreen');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Очистка ресурсов
    cleanup() {
        if (this.userCamera && this.userCamera.srcObject) {
            const tracks = this.userCamera.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    }
}

// Запуск игры когда страница загружена
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Страница загружена, запуск Armansu Dance...');
    window.game = new SimpleJustDance();
});

// Очистка при закрытии страницы
window.addEventListener('beforeunload', () => {
    if (window.game) {
        window.game.cleanup();
    }
}); 