// DOM elements
const textInput = document.getElementById('textInput');
const textPreview = document.getElementById('textPreview');
const fontFamilySelect = document.getElementById('fontFamily');
const fontSizeSelect = document.getElementById('fontSize'); // Changed to select
const colorCircles = document.querySelectorAll(".color");
const selectedColorInput = document.getElementById('selectedColor');
const calculateCostButton = document.getElementById('calculateCostButton');
const estimatedCostInput = document.getElementById('estimatedCost');
// Update preview function
function updatePreview() {
    const text = textInput.value;
    const fontFamily = fontFamilySelect.value;
    const fontSize = fontSizeSelect.value; // Get value directly from select

    textPreview.style.fontFamily = fontFamily;
    textPreview.style.fontSize = fontSize; // No need for .value
    textPreview.textContent = text;
}

// Call the function after DOM has loaded to update preview initially
updatePreview();
colorCircles.forEach(circle => {
    // Add click event listener to each color circle
    circle.addEventListener('click', function() {
        // Get the selected color from the clicked color circle
        const selectedColor = circle.style.backgroundColor;
        // Set the text color in the preview to the selected color
        textPreview.style.color = selectedColor;
        // Set the value of the hidden input field to the selected color
        selectedColorInput.value = selectedColor;
    });
});
// Event listeners
textInput.addEventListener('input', updatePreview);
fontFamilySelect.addEventListener('change', updatePreview);
fontSizeSelect.addEventListener('change', updatePreview); // Changed to change event
//popup
document.addEventListener("DOMContentLoaded", function() {
    const openButton = document.getElementById("openPopup");
    const closeButton = document.getElementById("closePopup");
    const popup = document.getElementById("popup");

    openButton.addEventListener("click", () => {
        popup.style.display = "flex";
    });

    closeButton.addEventListener("click", () => {
        popup.style.display = "none";
    });

});



// document.addEventListener("click", () => {
//     const cost = document.getElementById('estimatedCost');
//     const textInput = document.getElementById('textInput');
//     textInput.addEventListener("input", () => {
//         const words = textInput.value.length();
//         console.log(words);
//     })
//     console.log("button was clicked");
// })
// function calculateWordCount(text) {
//     return text.trim().split(/\s+/).length;
// }
// function calculateEstimatedCost() {
//     const text = textInput.value.trim();
//     const wordCount = calculateWordCount(text);
//     const fontSize = fontSizeSelect.value;
//     const pricing = {
//         small: 400,
//         medium: 600,
//         large: 900,
//     };
//     return pricing[fontSize] * wordCount || 0;
// }
// function updateEstimatedCost() {
//     const estimatedCost = calculateEstimatedCost();
//     estimatedCostInput.value = estimatedCost;
// }
// calculateCostButton.addEventListener('click', function(event) {
//     updateEstimatedCost();
// });
document.getElementById('calculateCostButton').addEventListener('click', function() {
    const textInput = document.getElementById('textInput').value;
    const fontSize = document.getElementById('fontSize').value;
    const wordCount = textInput.trim().split(/\s+/).length;
    const pricing = {
        small: 400,
        medium: 600,
        large: 900,
    };
    const estimatedCost = pricing[fontSize] * wordCount || 0;
    document.getElementById('estimatedCost').value = estimatedCost;
});

// Event listener for opening the popup
document.getElementById("openPopup").addEventListener("click", function() {
    const popup = document.getElementById("popup");
    const estimatedCost = document.getElementById("estimatedCost").value;
    const popupEstimatedCost = document.getElementById("popupEstimatedCost");
    popupEstimatedCost.textContent = estimatedCost;
    popup.style.display = "flex";
});

// Event listener for closing the popup
document.getElementById("closePopup").addEventListener("click", function() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
});
