const correctWord = 'BLOCKCHAIN';
let currentWord = '';

document.addEventListener('DOMContentLoaded', () => {
    const wordContainer = document.getElementById('word');
    const lettersContainer = document.querySelector('.letters');
    const feedback = document.getElementById('feedback');
    const modal = document.getElementById('myModal');
    const modalClose = document.querySelector('.modal-close');
    const modalText = document.getElementById('modal-text');
    const letters = ['B', 'V', 'Y', 'L', 'O', 'T', 'C', 'Z', 'K', 'C', 'F', 'H', 'J', 'A', 'T', 'I', 'S', 'N'];

    // Initialize empty spans for the word
    for (let i = 0; i < correctWord.length; i++) {
        const span = document.createElement('span');
        span.setAttribute('data-index', i);
        wordContainer.appendChild(span);
    }

    // Shuffle letters array
    shuffleArray(letters);

    // Create buttons for each letter
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.classList.add('letter');
        button.textContent = letter;
        lettersContainer.appendChild(button);
    });

    document.querySelectorAll('.letter').forEach(button => {
        button.addEventListener('click', () => {
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
        });
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

function updateWordDisplay() {
    const spans = document.querySelectorAll('#word span');
    spans.forEach((span, index) => {
        span.textContent = currentWord[index] || '';
    });
}

function checkWord() {
    const feedback = document.getElementById('feedback');
    if (currentWord === correctWord) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        document.querySelectorAll('.letter').forEach(button => {
            if (correctWord.includes(button.textContent)) {
                button.classList.add('correct');
            }
        });
        showModal('Correct! A blockchain is a decentralized digital ledger where transactions are recorded.');
    } else {
        feedback.textContent = 'Incorrect, try again.';
        feedback.style.color = 'red';
        resetGame();
    }
}

function resetGame() {
    currentWord = '';
    updateWordDisplay();
    document.querySelectorAll('.letter').forEach(button => {
        button.classList.remove('clicked', 'correct');
        button.style.opacity = 1;
        button.disabled = false;
    });
}

function showModal(message) {
    const modal = document.getElementById('myModal');
    const modalText = document.getElementById('modal-text');
    modalText.textContent = message;
    modal.style.display = 'flex';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
