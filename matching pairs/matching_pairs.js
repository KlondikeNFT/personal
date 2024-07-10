const terms = [
    { term: 'Cryptocurrency', definition: 'A digital or virtual form of currency that uses cryptography for security.' },
    { term: 'Digital Currency', definition: 'Money that exists only in digital form, not in physical form.' },
    { term: 'Blockchain', definition: 'A decentralized digital ledger where transactions are recorded.' },
    { term: 'Cryptography', definition: 'The practice of secure communication in the presence of third parties.' }
];

const colors = ['#4CAF50', '#2196F3', '#FFEB3B', '#FF5722', '#9C27B0'];
let selectedTerm = null;
let selectedDefinition = null;
let colorIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const termsContainer = document.querySelector('.mp-terms');
    const definitionsContainer = document.querySelector('.mp-definitions');
    const feedback = document.getElementById('mp-feedback');

    // Shuffle terms array
    const shuffledTerms = shuffleArray(terms.slice());
    const shuffledDefinitions = shuffleArray(terms.slice());

    // Create buttons for each term on the left side
    shuffledTerms.forEach(term => {
        const button = document.createElement('button');
        button.textContent = term.term;
        button.classList.add('mp-button');
        button.addEventListener('click', () => handleTermClick(button, term));
        termsContainer.appendChild(button);
    });

    // Create buttons for each definition on the right side
    shuffledDefinitions.forEach(term => {
        const button = document.createElement('button');
        button.textContent = term.definition;
        button.classList.add('mp-button');
        button.addEventListener('click', () => handleDefinitionClick(button, term));
        definitionsContainer.appendChild(button);
    });

    function handleTermClick(button, term) {
        if (selectedTerm && selectedTerm !== button) {
            selectedTerm.style.opacity = 1;
        }

        selectedTerm = button;
        button.style.opacity = 0.5;
        checkMatch();
    }

    function handleDefinitionClick(button, term) {
        if (selectedDefinition && selectedDefinition !== button) {
            selectedDefinition.style.opacity = 1;
        }

        selectedDefinition = button;
        button.style.opacity = 0.5;
        checkMatch();
    }

    function checkMatch() {
        if (selectedTerm && selectedDefinition) {
            const termText = selectedTerm.textContent;
            const definitionText = selectedDefinition.textContent;
            const termObject = terms.find(t => t.term === termText);

            if (termObject && termObject.definition === definitionText) {
                const color = colors[colorIndex % colors.length];
                selectedTerm.classList.add('correct');
                selectedDefinition.classList.add('correct');
                selectedTerm.style.backgroundColor = color;
                selectedDefinition.style.backgroundColor = color;
                selectedTerm.style.opacity = 0.5;
                selectedDefinition.style.opacity = 0.5;
                selectedTerm.disabled = true;
                selectedDefinition.disabled = true;
                selectedTerm = null;
                selectedDefinition = null;
                colorIndex++;
                feedback.textContent = '';
                checkCompletion();
            } else {
                feedback.textContent = 'Incorrect, try again.';
                feedback.style.color = 'red';
                setTimeout(() => {
                    selectedTerm.style.opacity = 1;
                    selectedDefinition.style.opacity = 1;
                    selectedTerm = null;
                    selectedDefinition = null;
                }, 1000);
            }
        }
    }

    function checkCompletion() {
        const allCorrect = Array.from(document.querySelectorAll('.mp-button')).every(button => button.classList.contains('correct'));
        if (allCorrect) {
            feedback.textContent = 'All pairs matched correctly!';
            feedback.style.color = 'green';
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
