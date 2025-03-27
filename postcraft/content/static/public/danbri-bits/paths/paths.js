const story = document.getElementById('story');
const choices = document.getElementById('choices');
let expandingDiv = null;
let startY = 0;
let choiceIndex = -1;
let animationInProgress = false;

let animationFrame = null;
let animationStartTime = 0;
const ANIMATION_DURATION = 500; // ms

const scenarios = [
    {
        text: "You find a hidden cave entrance. It's dark inside, but you hear strange noises.",
        choices: [
            { emoji: "🕯️", label: "Enter cave" },
            { emoji: "👂", label: "Investigate sounds" },
            { emoji: "🚶", label: "Keep walking" }
        ]
    },
    {
        text: "You come across a magical talking tree. It offers you a gift.",
        choices: [
            { emoji: "🎁", label: "Accept gift" },
            { emoji: "🧠", label: "Ask for wisdom" },
            { emoji: "🙅", label: "Politely decline" }
        ]
    },
    {
        text: "You reach a serene lake with crystal clear water. There's a boat nearby.",
        choices: [
            { emoji: "🚣", label: "Take the boat" },
            { emoji: "🏊", label: "Swim in the lake" },
            { emoji: "🏖️", label: "Rest on the shore" }
        ]
    }
];

let currentScenario = 0;

function startExpanding(index, y) {
    if (animationInProgress) return;
    animationInProgress = true;
    choiceIndex = index;
    startY = y;
    const choice = choices.children[index];
    const rect = choice.getBoundingClientRect();
    expandingDiv = document.createElement('div');
    expandingDiv.className = 'expanding';
    expandingDiv.style.backgroundColor = getComputedStyle(choice).backgroundColor;
    expandingDiv.style.left = `${rect.left}px`;
    expandingDiv.style.width = `${rect.width}px`;
    expandingDiv.innerHTML = choice.innerHTML;
    document.body.appendChild(expandingDiv);
}

function updateExpanding(progress) {
    if (!expandingDiv) return;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    expandingDiv.style.height = `${0.4 * window.innerHeight + 0.6 * window.innerHeight * clampedProgress}px`;
    const horizontalProgress = Math.max(0, (progress - 0.5) * 2);
    expandingDiv.style.left = `${(1 - horizontalProgress) * (choiceIndex * (window.innerWidth / 3))}px`;
    expandingDiv.style.width = `${window.innerWidth / 3 + (window.innerWidth * 2 / 3) * horizontalProgress}px`;

    const colorFadeProgress = Math.min(1, progress * 1.25);
    const opacity = 1 - Math.pow(colorFadeProgress, 2);
    expandingDiv.style.backgroundColor = expandingDiv.style.backgroundColor.replace(/[\d.]+\)$/g, `${opacity})`);

    story.style.opacity = 1 - clampedProgress;
    choices.style.opacity = 1 - clampedProgress;

    const emoji = expandingDiv.querySelector('.choice-emoji');
    emoji.style.fontSize = `${80 + 120 * clampedProgress}px`;
    emoji.style.filter = `grayscale(${100 - 100 * clampedProgress}%) opacity(${0.7 + 0.3 * clampedProgress})`;
}

function animateExpansion(timestamp) {
    if (!animationStartTime) animationStartTime = timestamp;
    const progress = (timestamp - animationStartTime) / ANIMATION_DURATION;

    updateExpanding(progress);

    if (progress < 1) {
        animationFrame = requestAnimationFrame(animateExpansion);
    } else {
        cancelAnimationFrame(animationFrame);
        finishExpanding();
    }
}

function finishExpanding() {
    if (!expandingDiv) return;
    expandingDiv.style.height = '100%';
    expandingDiv.style.left = '0';
    expandingDiv.style.width = '100%';
    story.style.opacity = '0';
    choices.style.opacity = '0';

    setTimeout(() => {
        expandingDiv.style.backgroundColor = 'rgba(0,0,0,0)';
    }, 500);

    setTimeout(() => {
        currentScenario = (currentScenario + 1) % scenarios.length;
        const newScenario = scenarios[currentScenario];
        story.textContent = newScenario.text;

        const newChoices = document.createElement('div');
        newChoices.className = 'new-choices';
        newChoices.innerHTML = newScenario.choices.map((choice, index) => `
            <div class="choice" id="choice-${['left', 'middle', 'right'][index]}">
                <div class="choice-emoji">${choice.emoji}</div>
                <div class="choice-label">${choice.label}</div>
            </div>
        `).join('');
        document.body.appendChild(newChoices);

        setTimeout(() => {
            expandingDiv.style.opacity = '0';
            newChoices.style.opacity = '1';
            story.style.opacity = '1';
            Array.from(newChoices.children).forEach((choice, index) => {
                setTimeout(() => {
                    choice.style.opacity = '1';
                    choice.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 500);

        setTimeout(() => {
            expandingDiv.remove();
            expandingDiv = null;
            choices.innerHTML = newChoices.innerHTML;
            choices.style.opacity = '1';
            newChoices.remove();
            animationInProgress = false;
        }, 1000);
    }, 1000);
}

let touchStartTime = 0;
let touchStartY = 0;

choices.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    touchStartTime = Date.now();
    touchStartY = touch.clientY;
    const clickedChoice = document.elementFromPoint(touch.clientX, touch.clientY).closest('.choice');
    if (clickedChoice) {
        choiceIndex = Array.from(choices.children).indexOf(clickedChoice);
        startExpanding(choiceIndex, touch.clientY);
    }
});

document.addEventListener('touchmove', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    const progress = 1 - ((touch.clientY - 0.4 * window.innerHeight) / (touchStartY - 0.4 * window.innerHeight));
    updateExpanding(progress);
});

document.addEventListener('touchend', (event) => {
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration < 300) { // Short touch, treat as a click
        cancelAnimationFrame(animationFrame);
        animationStartTime = 0;
        animationFrame = requestAnimationFrame(animateExpansion);
    } else if (expandingDiv) {
        finishExpanding();
    }
});

// Add event listener for mousedown event
choices.addEventListener('mousedown', (event) => {
    touchStartTime = Date.now();
    touchStartY = event.clientY;
    const clickedChoice = document.elementFromPoint(event.clientX, event.clientY).closest('.choice');
    if (clickedChoice) {
        choiceIndex = Array.from(choices.children).indexOf(clickedChoice);
        startExpanding(choiceIndex, event.clientY);
    }
});

// Add event listener for mousemove event
document.addEventListener('mousemove', (event) => {
    event.preventDefault();
    const progress = 1 - ((event.clientY - 0.4 * window.innerHeight) / (touchStartY - 0.4 * window.innerHeight));
    updateExpanding(progress);
});

// Add event listener for mouseup event
document.addEventListener('mouseup', (event) => {
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration < 300) { // Short touch, treat as a click
        cancelAnimationFrame(animationFrame);
        animationStartTime = 0;
        animationFrame = requestAnimationFrame(animateExpansion);
    } else if (expandingDiv) {
        finishExpanding();
    }
});