// Page navigation
function showPage(pageId) {

    // Hide all pages
    const pages = document.querySelectorAll('.page');

    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);
}


// TASK 1 - SORTING HAT
function selectOption(taskNum, button) {

    // Remove selected class from all options
    const options = button.parentElement.querySelectorAll('.option-btn');

    options.forEach(opt => {
        opt.classList.remove('selected');
    });

    // Add selected class
    button.classList.add('selected');

    // Show response
    const response = document.getElementById('response' + taskNum);
    response.classList.remove('hidden');

    // Show continue button
    const continueBtn = document.getElementById('continue' + taskNum);
    continueBtn.classList.remove('hidden');
}


// TASK 2 - SPELL CHALLENGE
function checkSpell(event) {

    const input = document.getElementById('spellInput');
    const response = document.getElementById('spellResponse');
    const continueBtn = document.getElementById('continue2');

    const spell = input.value.trim().toLowerCase();

    if (event.key === 'Enter') {

        if (spell === 'expecto patronum') {

            response.textContent =
                '✨ You are officially smarter than Ron Weasley. ✨';

            response.classList.remove('hidden');
            response.style.color = '#ffd700';

            continueBtn.classList.remove('hidden');

            input.disabled = true;

        } else {

            response.textContent =
                '❌ Try again! Even Neville could do this.';

            response.classList.remove('hidden');
            response.style.color = '#ef4444';

            setTimeout(() => {
                response.classList.add('hidden');
            }, 2000);
        }
    }
}


// TASK 3 - POTION CHOICE
function selectPotion(potion) {

    const response = document.getElementById('potionResponse');
    const continueBtn = document.getElementById('continue3');

    // Remove selected class
    const potions = document.querySelectorAll('.potion-btn');

    potions.forEach(p => {
        p.classList.remove('selected');
    });

    // Add selected class
    event.target.classList.add('selected');

    if (potion === 'love') {

        response.textContent =
            '💜 Excellent choice. Side effects may include unexpected date invitations.';

        response.style.color = '#ffd700';

        continueBtn.classList.remove('hidden');

    } else {

        response.textContent =
            '🧪 Interesting choice... but not quite right for this mission.';

        response.style.color = '#f4e4bc';
    }

    response.classList.remove('hidden');
}


// OPEN LETTER
function openLetter() {

    const letterContent = document.getElementById('letterContent');
    const seal = document.querySelector('.seal');

    letterContent.classList.remove('hidden');

    seal.style.display = 'none';
}


// YES BUTTON
function celebrate() {

    // SEND EMAIL NOTIFICATION
    fetch("https://api.web3forms.com/submit", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            access_key: "285ee79d-fed9-40f5-b70c-d276e76ca2be",

            subject: "SHE PRESSED YES 💜",

            message:
                "She clicked YES on the Hogwarts website."
        })
    });

    // Create confetti
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }

    // Show celebration page
    showPage('celebration');
}


// CREATE CONFETTI
function createConfetti() {

    const confetti = document.createElement('div');

    confetti.classList.add('confetti');

    // Random position
    confetti.style.left =
        Math.random() * 100 + 'vw';

    // Random colors
    confetti.style.background = [

        '#ffd700',
        '#ff6b6b',
        '#4ecdc4',
        '#45b7d1',
        '#96e6a1'

    ][Math.floor(Math.random() * 5)];

    confetti.style.animationDelay =
        Math.random() * 2 + 's';

    document.body.appendChild(confetti);

    // Remove after animation
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}


// NO BUTTON DODGE
const denialMessages = [

    'This option has been banned by Dumbledore.',
    'Nice try.',
    'The Ministry refuses this response.',
    'Even Voldemort wouldn\'t approve.',
    'The Sorting Hat is disappointed.',
    'This choice has been Confunded.',
    'Error 404: Answer unavailable.'

];

let denialIndex = 0;


function dodgeNo() {

    const noBtn = document.getElementById('noBtn');

    // Move button to random position
    const maxX =
        window.innerWidth - noBtn.offsetWidth - 50;

    const maxY =
        window.innerHeight - noBtn.offsetHeight - 50;

    const randomX =
        Math.random() * maxX;

    const randomY =
        Math.random() * maxY;

    noBtn.style.position = 'fixed';

    noBtn.style.left =
        randomX + 'px';

    noBtn.style.top =
        randomY + 'px';

    noBtn.style.zIndex = '1000';

    // Change funny text
    noBtn.textContent =
        denialMessages[denialIndex];

    denialIndex =
        (denialIndex + 1) % denialMessages.length;
}


// RESET NO BUTTON WHEN PAGE CHANGES
const observer = new MutationObserver((mutations) => {

    mutations.forEach((mutation) => {

        if (
            mutation.target.classList.contains('active')
        ) {

            const noBtn =
                document.getElementById('noBtn');

            if (noBtn) {

                noBtn.style.position = 'relative';

                noBtn.style.left = 'auto';

                noBtn.style.top = 'auto';

                noBtn.style.zIndex = 'auto';

                noBtn.textContent = 'NO';
            }
        }
    });
});


// Observe all pages
document.querySelectorAll('.page').forEach(page => {

    observer.observe(page, {

        attributes: true,

        attributeFilter: ['class']

    });
});