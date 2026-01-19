const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const passwordDisplay = document.getElementById('password');
const strengthFill = document.getElementById('strengthFill');

const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
    updateStrength();
});

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);
downloadBtn.addEventListener('click', downloadPassword);

function updateStrength() {
    const length = +lengthSlider.value;
    let score = length * 2;
    if (uppercase.checked) score += 10;
    if (lowercase.checked) score += 10;
    if (numbers.checked) score += 12;
    if (symbols.checked) score += 18;

    const strength = Math.min(100, score);
    strengthFill.style.width = strength + "%";

    strengthFill.style.background =
        strength < 40 ? 'linear-gradient(90deg,#ff4444,#ff0066)' :
        strength < 70 ? 'linear-gradient(90deg,#ffaa00,#ff6600)' :
        'linear-gradient(90deg,#00ff88,#00ccff)';
}

function generatePassword() {
    let chars = '';
    if (uppercase.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase.checked) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers.checked) chars += '0123456789';
    if (symbols.checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) return passwordDisplay.textContent = "Select at least one option!";

    let pass = '';
    for (let i = 0; i < lengthSlider.value; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    passwordDisplay.textContent = pass;
    updateStrength();
}

function copyPassword() {
    const text = passwordDisplay.textContent;
    if (text.length < 10) return;

    navigator.clipboard.writeText(text);
    passwordDisplay.textContent = "COPIED! ⚡";
    setTimeout(() => passwordDisplay.textContent = text, 1500);
}

function downloadPassword() {
    const blob = new Blob([passwordDisplay.textContent], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `neon-password.txt`;
    a.click();
}

function createParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.width = p.style.height = Math.random() * 6 + 3 + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    document.getElementById('particles').appendChild(p);
    setTimeout(() => p.remove(), 15000);
}

setInterval(createParticle, 300);
updateStrength();

