document.addEventListener('DOMContentLoaded', () => {
    const activities = document.querySelectorAll('.activity[data-question]');
    const modal = document.getElementById('myModal');
    const modalClose = document.querySelector('.modal-close');
    const modalText = document.getElementById('modal-text');

    // Initialize Select the Correct Term activities
    activities.forEach(activity => {
        const question = activity.dataset.question;
        const options = JSON.parse(activity.dataset.options);
        const correctAnswer = activity.dataset.correctAnswer;
        const explanation = activity.dataset.explanation;
        const questionElement = activity.querySelector('.fib-question');
        const buttonsContainer = activity.querySelector('.fib-buttons');
        const feedbackElement = activity.querySelector('#fib-feedback');

        questionElement.textContent = question;

        if (buttonsContainer.childElementCount === 0) { // Ensure buttons are created only once
            options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('fib-answer');
                button.addEventListener('click', () => {
                    if (option === correctAnswer) {
                        feedbackElement.textContent = 'Correct!';
                        feedbackElement.style.color = 'green';
                        button.classList.add('correct');
                        showModal(explanation);
                        disableButtons(activity);
                    } else {
                        feedbackElement.textContent = 'Incorrect, try again.';
                        feedbackElement.style.color = 'red';
                        button.disabled = true;
                        button.style.opacity = 0.5;
                    }
                });
                buttonsContainer.appendChild(button);
            });
        }
    });

    function disableButtons(activity) {
        activity.querySelectorAll('.fib-answer').forEach(button => {
            if (!button.classList.contains('correct')) {
                button.disabled = true;
                button.style.opacity = 0.5;
            }
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

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
