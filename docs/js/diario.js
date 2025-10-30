document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mood-chart')) {
        const moodButtons = document.querySelectorAll('.mood-btn');
        const saveButton = document.getElementById('save-mood');
        const ctx = document.getElementById('mood-chart').getContext('2d');
        let selectedMood = null;
        let moodChart;

        // Carrega dados do localStorage
        const moodData = JSON.parse(localStorage.getItem('moodTrackerData')) || {};

        function updateChart() {
            const labels = Object.keys(moodData).sort(); // Ordena as datas
            const data = labels.map(label => {
                // Mapeia humor para um valor numérico para o gráfico
                switch(moodData[label]) {
                    case 'feliz': return 5;
                    case 'normal': return 3;
                    case 'triste': return 1;
                    case 'ansioso': return 2;
                    case 'irritado': return 0;
                    default: return 3;
                }
            });

            const chartConfig = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Histórico de Humor',
                        data: data,
                        borderColor: 'rgba(0, 123, 255, 1)',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        fill: true,
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value, index, values) {
                                    switch(value) {
                                        case 5: return '😄 Feliz';
                                        case 3: return '😐 Normal';
                                        case 1: return '😢 Triste';
                                        case 2: return '😟 Ansioso';
                                        case 0: return '😠 Irritado';
                                        default: return '';
                                    }
                                }
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            };
            
            if (moodChart) {
                moodChart.destroy();
            }
            moodChart = new Chart(ctx, chartConfig);
        }

        moodButtons.forEach(button => {
            button.addEventListener('click', () => {
                moodButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                selectedMood = button.dataset.mood;
            });
        });

        saveButton.addEventListener('click', () => {
            if (selectedMood) {
                const today = new Date().toLocaleDateString('pt-BR'); // Formato DD/MM/AAAA
                moodData[today] = selectedMood;
                localStorage.setItem('moodTrackerData', JSON.stringify(moodData));
                alert('Humor salvo com sucesso!');
                updateChart();
            } else {
                alert('Por favor, selecione um humor.');
            }
        });

        // Inicializa o gráfico
        updateChart();
    }
});