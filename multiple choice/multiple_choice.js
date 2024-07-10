document.addEventListener('DOMContentLoaded', () => {
    const feedback = document.getElementById('mc-feedback');
    const buttons = document.querySelectorAll('.mc-answer');
    const modal = document.getElementById('myModal');
    const modalClose = document.querySelector('.modal-close');
    const modalText = document.getElementById('modal-text');

    const explanations = {
        'It is made of paper': 'A physical form of money is not a cryptocurrency.',
        'It is digital money used online': 'Correct! A cryptocurrency is a digital or virtual form of money.',
        'It is used to buy candy': 'A type of banknote is not a cryptocurrency.',
        'It is a type of toy': 'A taco is not a cryptocurrency.'
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
            const explanation = explanations[button.textContent];

            if (userAnswer === 'correct') {
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
