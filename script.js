const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = " !@#$%^&*()-_=+[]{}\\;':\",.<>/?|~`";

const lengthEl = document.querySelector("#length");
const LowercaseEl = document.querySelector("#Lowercase");
const UppercaseEl = document.querySelector("#Uppercase");
const NumbersEl = document.querySelector("#Numbers");
const SymbolEl = document.querySelector("#Symbol");
const generateBtn = document.querySelector("#generate");
const passwordEl = document.querySelector("#password");
const resetBtn = document.querySelector("#reset");
const copyBtn = document.querySelector("#copy");
const strengthLabel = document.querySelector("#strength-label");
const strengthBar = document.querySelector("#strength-bar");

function generatePassword() {
    let length = parseInt(lengthEl.value, 10);
    if (isNaN(length) || length < 8) {
        alert("Password length must be at least 8 characters.");
        return;
    }

    let characters = "";
    if (LowercaseEl.checked) characters += lowerCaseLetters;
    if (UppercaseEl.checked) characters += upperCaseLetters;
    if (NumbersEl.checked) characters += numbers;
    if (SymbolEl.checked) characters += symbols;

    if (!characters) {
        alert("Please select at least one character type!");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    passwordEl.value = password;

    updateStrength(password);
}

function resetForm() {
    passwordEl.value = "";
    lengthEl.value = 8;
    LowercaseEl.checked = true;
    UppercaseEl.checked = true;
    NumbersEl.checked = true;
    SymbolEl.checked = true;
    updateStrength("");
}

function copyToClipboard() {
    if (passwordEl.value) {
        navigator.clipboard.writeText(passwordEl.value)
            .then(() => alert("Password copied to clipboard!"))
            .catch(err => console.error("Failed to copy:", err));
    } else {
        alert("No password to copy!");
    }
}

function updateStrength(password) {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    if (hasLower) strength++;
    if (hasUpper) strength++;
    if (hasNumber) strength++;
    if (hasSymbol) strength++;

    strengthLabel.textContent = "Strength: " +
        (strength === 4 ? "Strong" : strength === 3 ? "Medium" : "Weak");
    
    strengthBar.className = "";
    strengthBar.classList.add(strength === 4 ? "strong" : strength === 3 ? "medium" : "weak");
}

generateBtn.addEventListener("click", generatePassword);
resetBtn.addEventListener("click", resetForm);
copyBtn.addEventListener("click", copyToClipboard);
