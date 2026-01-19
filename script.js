const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const passwordDisplay = document.getElementById('password');
const strengthFill = document.getElementById('strengthFill');


lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
    updateStrength();
});


function updateStrength() {
    const length = parseInt(lengthSlider.value);
    const hasUpper = document.getElementById('uppercase').checked;
    const hasLower = document.getElementById('lowercase').checked;
    const hasNum = document.getElementById('numbers').checked;
    const hasSym = document.getElementById('symbols').checked;


    let score = length * 2;
    if (hasUpper) score += 10;
    if (hasLower) score += 10;
    if (hasNum) score += 12;
    if (hasSym) score += 18;
    const strength = Math.min(100, score);

    strengthFill.style.width = `${strength}%`;
    if (strength < 40) strengthFill.style.background = 'linear-gradient(90deg, #ff4444, #ff0066)';
    else if (strength < 70) strengthFill.style.background = 'linear-gradient(90deg, #ffaa00, #ff6600)';
    else strengthFill.style.background = 'linear-gradient(90deg, #00ff88, #00ccff)';
}


function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const num = '0123456789';
    const sym = '!@#$%^&*()_+-=[]{}|;:,.<>?';


    let chars = '';
    if (document.getElementById('uppercase').checked) chars += upper;
    if (document.getElementById('lowercase').checked) chars += lower;
    if (document.getElementById('numbers').checked) chars += num;
    if (document.getElementById('symbols').checked) chars += sym;


    if (chars === '') {
        passwordDisplay.textContent = "Select at least one option!";
        return;
    }


    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwordDisplay.textContent = password;
    updateStrength();
    }

function copyPassword() {
    const text = passwordDisplay.textContent;
    if (text.length < 10 || text.includes("Select")) return;

    navigator.clipboard.writeText(text).then(() => {
        const original = text;
        passwordDisplay.textContent = "COPIED! ⚡";
        setTimeout(() => passwordDisplay.textContent = original, 2000);
    });
}


function downloadPassword() {
    const text = passwordDisplay.textContent;
    if (text.length < 10 || text.includes("Select")) return;

        
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neon-password-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}


    // Create particles
    
function createParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    p.style.animationDuration = `${Math.random() * 8 + 6}s`;
    p.style.animationDelay = `${Math.random() * 4}s`;
    document.getElementById('particles').appendChild(p);
    setTimeout(() => p.remove(), 15000);
}


setInterval(createParticle, 300);
    for(let i = 0; i < 20; i++) createParticle();

updateStrength();
