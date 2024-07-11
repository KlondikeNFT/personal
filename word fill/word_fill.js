document.addEventListener('DOMContentLoaded', () => {
    const activities = document.querySelectorAll('.activity[data-word]');
    const modal = document.getElementById('myModal');
    const modalClose = document.querySelector('.modal-close');
    const modalText = document.getElementById('modal-text');

    activities.forEach(activity => {
        const correctWord = activity.dataset.word;
        let currentWord = '';
        const letters = JSON.parse(activity.dataset.letters);
        const explanation = activity.dataset.explanation;
        const wordContainer = activity.querySelector('.word');
        const lettersContainer = activity.querySelector('.letters');
        const feedback = activity.querySelector('#feedback');

        // Initialize empty spans for the word
        if (wordContainer.childElementCount === 0) {
            for (let i = 0; i < correctWord.length; i++) {
                const span = document.createElement('span');
                span.setAttribute('data-index', i);
                wordContainer.appendChild(span);
            }
        }

        // Shuffle letters array
        if (lettersContainer.childElementCount === 0) {
            shuffleArray(letters);

            // Create buttons for each letter
            letters.forEach(letter => {
                const button = document.createElement('button');
                button.classList.add('letter');
                button.textContent = letter;
                lettersContainer.appendChild(button);
                button.addEventListener('click', () => handleLetterClick(button));
            });
        }

        function handleLetterClick(button) {
            if (button.classList.contains('clicked')) {
                // Remove letter from currentWord and reset button
                const letter = button.textContent;
                currentWord = currentWord.replace(letter, '');
                updateWordDisplay();
                button.classList.remove('clicked');
                button.style.opacity = 1;
            } else {
                if (currentWord.length < correctWord.length) {
                    const letter = button.textContent;
                    currentWord += letter;
                    updateWordDisplay();
                    button.classList.add('clicked');
                    button.style.opacity = 0.5;
                    if (currentWord.length === correctWord.length) {
                        checkWord();
                    }
                }
            }
        }

        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });

        function updateWordDisplay() {
            const spans = wordContainer.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.textContent = currentWord[index] || '';
            });
        }

        function checkWord() {
            if (currentWord === correctWord) {
                feedback.textContent = 'Correct!';
                feedback.style.color = 'green';
                activity.querySelectorAll('.letter').forEach(button => {
                    if (correctWord.includes(button.textContent)) {
                        button.classList.add('correct');
                    }
                });
                showModal(explanation);
            } else {
                feedback.textContent = 'Incorrect, try again.';
                feedback.style.color = 'red';
                resetGame();
            }
        }

        function resetGame() {
            currentWord = '';
            updateWordDisplay();
            activity.querySelectorAll('.letter').forEach(button => {
                button.classList.remove('clicked', 'correct');
                button.style.opacity = 1;
                button.disabled = false;
            });
        }

        function showModal(message) {
            modalText.textContent = message;
            modal.style.display = 'flex';
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    });
});
