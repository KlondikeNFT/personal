document.addEventListener('DOMContentLoaded', () => {
    const feedback = document.getElementById('torf-feedback');
    const buttons = document.querySelectorAll('.torf-answer');
    const modal = document.getElementById('myModal');
    const modalClose = document.querySelector('.modal-close');
    const modalText = document.getElementById('modal-text');

    const explanations = {
        true: 'Correct! Cryptography is essential for securing cryptocurrency transactions.',
        false: 'Incorrect. Cryptography is indeed used to secure cryptocurrency transactions.'
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Reset all buttons
            buttons.forEach(btn => {
                btn.classList.remove('correct', 'incorrect');
                btn.disabled = false;
                btn.style.opacity = 1;
            });

            const userAnswer = button.getAttribute('data-answer');
            const explanation = explanations[userAnswer];
            const correctAnswer = 'true'; // Set the correct answer here

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
