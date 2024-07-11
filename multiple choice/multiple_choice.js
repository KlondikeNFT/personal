document.addEventListener('DOMContentLoaded', () => {
    const activities = document.querySelectorAll('.activity[data-question][data-options][data-correct-answer][data-explanations]');
    const modal = document.getElementById('myModal');
    const modalClose = document.querySelector('.modal-close');
    const modalText = document.getElementById('modal-text');

    activities.forEach(activity => {
        const question = activity.dataset.question;
        const options = JSON.parse(activity.dataset.options);
        const correctAnswer = activity.dataset.correctAnswer;
        const explanations = JSON.parse(activity.dataset.explanations);
        const questionElement = activity.querySelector('.mc-question');
        const buttonsContainer = activity.querySelector('.mc-buttons');
        const feedbackElement = activity.querySelector('#mc-feedback');

        questionElement.textContent = question;

        if (buttonsContainer.childElementCount === 0) {
            options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('mc-answer');
                button.dataset.answer = option === correctAnswer ? 'correct' : 'incorrect';
                button.addEventListener('click', () => {
                    if (button.dataset.answer === 'correct') {
                        feedbackElement.textContent = 'Correct!';
                        feedbackElement.style.color = 'green';
                        button.classList.add('correct');
                        button.style.opacity = 0.5;
                        showModal(explanations[option]);
                        disableButtons(activity);
                    } else {
                        feedbackElement.textContent = 'Incorrect, try again.';
                        feedbackElement.style.color = 'red';
                        button.classList.add('incorrect');
                        button.style.opacity = 0.5;
                        showModal(explanations[option]);
                    }
                });
                buttonsContainer.appendChild(button);
            });
        }

        function disableButtons(activity) {
            activity.querySelectorAll('.mc-answer').forEach(button => {
                button.disabled = true;
                button.style.opacity = 0.5;
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
});
