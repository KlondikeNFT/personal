document.addEventListener('DOMContentLoaded', () => {
    const activities = document.querySelectorAll('.activity[data-pairs]');
    const colors = ['#4CAF50', '#2196F3', '#FFEB3B', '#FF5722', '#9C27B0'];

    activities.forEach(activity => {
        const pairs = JSON.parse(activity.dataset.pairs);
        const termsContainer = activity.querySelector('.mp-terms');
        const definitionsContainer = activity.querySelector('.mp-definitions');
        const feedback = activity.querySelector('#mp-feedback');
        let selectedTerm = null;
        let selectedDefinition = null;
        let colorIndex = 0;

        // Clear existing buttons to avoid duplication
        termsContainer.innerHTML = '';
        definitionsContainer.innerHTML = '';

        // Shuffle pairs
        const shuffledTerms = shuffleArray(pairs.slice());
        const shuffledDefinitions = shuffleArray(pairs.slice());

        // Create buttons for terms
        shuffledTerms.forEach(pair => {
            const button = document.createElement('button');
            button.textContent = pair.term;
            button.classList.add('mp-button');
            button.addEventListener('click', () => handleTermClick(button, pair));
            termsContainer.appendChild(button);
        });

        // Create buttons for definitions
        shuffledDefinitions.forEach(pair => {
            const button = document.createElement('button');
            button.textContent = pair.definition;
            button.classList.add('mp-button');
            button.addEventListener('click', () => handleDefinitionClick(button, pair));
            definitionsContainer.appendChild(button);
        });

        function handleTermClick(button, pair) {
            if (selectedTerm && selectedTerm !== button) {
                selectedTerm.style.opacity = 1;
            }
            selectedTerm = button;
            button.style.opacity = 0.5;
            checkMatch();
        }

        function handleDefinitionClick(button, pair) {
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
                const termObject = pairs.find(pair => pair.term === termText);

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
            const allCorrect = Array.from(activity.querySelectorAll('.mp-button')).every(button => button.classList.contains('correct'));
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
});
