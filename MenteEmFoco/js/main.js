document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MODO NOTURNO ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        function applyTheme(theme) {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                themeToggle.innerHTML = "Mudar Tema ☀️";
            } else {
                body.classList.remove('dark-mode');
                themeToggle.innerHTML = "Mudar Tema 🌙";
            }
        }

        themeToggle.addEventListener('click', () => {
            let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });

        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
    }


    // --- LÓGICA DA FERRAMENTA DE RESPIRAÇÃO ---
    const startBtn = document.getElementById('start-breathing-btn');
    const circle = document.getElementById('breathing-circle');
    const instruction = document.getElementById('breathing-instruction');

    // Verifica se os elementos da ferramenta existem na página atual
    if (startBtn && circle && instruction) {
        
        let breathingInterval;
        let isBreathing = false;

        function startBreathingExercise() {
            // Define o ciclo de respiração
            function breathCycle() {
                instruction.textContent = 'Inspire lentamente...';
                circle.style.transform = 'scale(2)'; // Círculo cresce
                circle.style.transition = 'transform 8s ease-in-out';

                setTimeout(() => {
                    instruction.textContent = 'Segure...';
                    
                    setTimeout(() => {
                        instruction.textContent = 'Expire lentamente...';
                        circle.style.transform = 'scale(1)'; // Círculo diminui
                        circle.style.transition = 'transform 8s ease-in-out';
                    }, 4000); // 4 segundos segurando

                }, 8000); // 8 segundos inspirando
            }
            
            breathCycle(); // Inicia o primeiro ciclo
            breathingInterval = setInterval(breathCycle, 20000); // Repete a cada 20s (8+4+8)
        }

        startBtn.addEventListener('click', () => {
            if (!isBreathing) {
                isBreathing = true;
                startBtn.textContent = 'Parar';
                startBreathingExercise();
            } else {
                isBreathing = false;
                startBtn.textContent = 'Iniciar';
                clearInterval(breathingInterval);
                instruction.textContent = 'Exercício pausado. Clique em Iniciar para recomeçar.';
                circle.style.transform = 'scale(1)';
                circle.style.transition = 'transform 1s ease-in-out';
            }
        });
    }
});