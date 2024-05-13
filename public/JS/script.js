console.log("This script is working");

//for customize.ejs

// DOM elements
const textInput = document.getElementById('textInput');
const textPreview = document.getElementById('textPreview');
const fontFamilySelect = document.getElementById('fontFamily');
const fontSizeInput = document.getElementById('fontSize');



// Update preview function
 function updatePreview() {
    const text = textInput.value;
    const fontFamily = fontFamilySelect.value;
    const fontSize = fontSizeInput.value + 'px';
    
    textPreview.style.fontFamily = fontFamily;
    textPreview.style.fontSize = fontSize;
    textPreview.textContent = text;
}
// Event listeners
textInput.addEventListener('input', updatePreview);
fontFamilySelect.addEventListener('change', updatePreview);
fontSizeInput.addEventListener('input', updatePreview);
