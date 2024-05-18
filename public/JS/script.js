// // DOM elements
// const textInput = document.getElementById('textInput');
// const textPreview = document.getElementById('textPreview');
// const fontFamilySelect = document.getElementById('fontFamily');
// const fontSizeSelect = document.getElementById('fontSize'); // Changed to select
// const colorCircles = document.querySelectorAll(".color");
// const selectedColorInput = document.getElementById('selectedColor');
// const calculateCostButton = document.getElementById('calculateCostButton');
// const estimatedCostInput = document.getElementById('estimatedCost');
// // Update preview function
// function updatePreview() {
//     const text = textInput.value;
//     const fontFamily = fontFamilySelect.value;
//     const fontSize = fontSizeSelect.value; // Get value directly from select

//     textPreview.style.fontFamily = fontFamily;
//     textPreview.style.fontSize = fontSize; // No need for .value
//     textPreview.textContent = text;
// }
// colorCircles.forEach(circle => {
//     circle.addEventListener('click', function() {
//         const selectedColor = circle.style.backgroundColor;
//         textPreview.style.color = selectedColor;
//         selectedColorInput.value = selectedColor;

//         // Update text shadow to match the selected color with less intense glow
//         textPreview.style.textShadow = `0 0 3px ${selectedColor}, 
//                                         0 0 6px ${selectedColor}, 
//                                         0 0 9px ${selectedColor}, 
//                                         0 0 12px ${selectedColor}`;
//     });
// });

// // Event listeners
// textInput.addEventListener('input', updatePreview);
// fontFamilySelect.addEventListener('change', updatePreview);
// fontSizeSelect.addEventListener('change', updatePreview); // Changed to change event
// //popup
// document.addEventListener("DOMContentLoaded", function() {
//     const openButton = document.getElementById("openPopup");
//     const closeButton = document.getElementById("closePopup");
//     const popup = document.getElementById("popup");

//     openButton.addEventListener("click", () => {
//         popup.style.display = "flex";
//     });

//     closeButton.addEventListener("click", () => {
//         popup.style.display = "none";
//     });

// });
// document.getElementById('calculateCostButton').addEventListener('click', function() {
//     const textInput = document.getElementById('textInput').value;
//     const fontSize = document.getElementById('fontSize').value;
//     const wordCount = textInput.trim().split(/\s+/).length;
//     const pricing = {
//         small: 400,
//         medium: 600,
//         large: 900,
//     };
//     const estimatedCost = pricing[fontSize] * wordCount || 0;
//     document.getElementById('estimatedCost').value = estimatedCost;
// });

// // Event listener for opening the popup
// document.getElementById("openPopup").addEventListener("click", function() {
//     const popup = document.getElementById("popup");
//     const estimatedCost = document.getElementById("estimatedCost").value;
//     const popupEstimatedCost = document.getElementById("popupEstimatedCost");
//     popupEstimatedCost.textContent = estimatedCost;
//     popup.style.display = "flex";
// });

// // Event listener for closing the popup
// document.getElementById("closePopup").addEventListener("click", function() {
//     const popup = document.getElementById("popup");
//     popup.style.display = "none";
// });

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

colorCircles.forEach(circle => {
    circle.addEventListener('click', function() {
        const selectedColor = circle.style.backgroundColor;
        textPreview.style.color = selectedColor;
        selectedColorInput.value = selectedColor;

        // Update text shadow to match the selected color with less intense glow
        textPreview.style.textShadow = `0 0 3px ${selectedColor}, 
                                        0 0 6px ${selectedColor}, 
                                        0 0 9px ${selectedColor}, 
                                        0 0 12px ${selectedColor}`;
    });
});

// Event listeners
textInput.addEventListener('input', updatePreview);
fontFamilySelect.addEventListener('change', updatePreview);
fontSizeSelect.addEventListener('change', updatePreview); // Changed to change event

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

// Event listener for calculating cost
calculateCostButton.addEventListener('click', function() {
    const textInputValue = textInput.value;
    const fontSize = fontSizeSelect.value;
    const wordCount = textInputValue.trim().split(/\s+/).length;

    // Pricing details
    const pricing = {
        small: 400,
        medium: 600,
        large: 900,
    };

    // Calculate estimated cost
    const estimatedCost = pricing[fontSize] * wordCount || 0;

    // Update estimated cost input
    estimatedCostInput.value = estimatedCost;
});
