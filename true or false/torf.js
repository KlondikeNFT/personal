document.addEventListener('DOMContentLoaded', () => {
    const activities = document.querySelectorAll('.activity[data-correct-answer]');

    activities.forEach(activity => {
        const correctAnswer = activity.getAttribute('data-correct-answer');
        const explanationTrue = activity.getAttribute('data-explanation-true');
        const explanationFalse = activity.getAttribute('data-explanation-false');

        const buttons = activity.querySelectorAll('.torf-answer');
        const feedback = activity.querySelector('#torf-feedback');
        const modal = document.getElementById('myModal');
        const modalText = document.getElementById('modal-text');
        const modalClose = document.querySelector('.modal-close');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => {
                    btn.classList.remove('correct', 'incorrect');
                    btn.disabled = false;
                    btn.style.opacity = 1;
                });

                const userAnswer = button.getAttribute('data-answer');
                const explanation = userAnswer === 'true' ? explanationTrue : explanationFalse;

                if (userAnswer === correctAnswer) {
                    button.classList.add('correct');
                    button.style.opacity = 0.5;
                    feedback.textContent = 'Correct!';
                    feedback.style.color = 'green';
                    showModal(explanation);
                } else {
                    button.classList.add('incorrect');
                    button.style.opacity = 0.5;
                    feedback.textContent = 'Incorrect, try again.';
                    feedback.style.color = 'red';
                    showModal(explanation);
                }
            });
        });

        function showModal(message) {
            modalText.textContent = message;
            modal.style.display = 'flex';
        }

        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });
});
