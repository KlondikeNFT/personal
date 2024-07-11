document.addEventListener('DOMContentLoaded', () => {
    const activities = document.querySelectorAll('.activity[data-question][data-options][data-correct-answer][data-explanation]');
    const modal = document.getElementById('myModal');
    const modalClose = document.querySelector('.modal-close');
    const modalText = document.getElementById('modal-text');

    activities.forEach(activity => {
        const question = activity.dataset.question;
        const options = JSON.parse(activity.dataset.options);
        const correctAnswer = activity.dataset.correctAnswer;
        const explanation = activity.dataset.explanation;
        const questionElement = activity.querySelector('.fib-question');
        const buttonsContainer = activity.querySelector('.fib-buttons');
        const feedbackElement = activity.querySelector('#fib-feedback');

        questionElement.textContent = question;

        if (buttonsContainer.childElementCount === 0) {
            options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('fib-answer');
                button.addEventListener('click', () => {
                    if (option === correctAnswer) {
                        feedbackElement.textContent = 'Correct!';
                        feedbackElement.style.color = 'green';
                        button.classList.add('correct');
                        button.style.opacity = 0.5;
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
