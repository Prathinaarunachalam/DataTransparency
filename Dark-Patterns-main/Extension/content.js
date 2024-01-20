chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'updatePopup') {
    const totalScore = request.totalScore;

    // Display the total score in the popup with colored text
    displayTotalScore(totalScore);
  } else if (request.action === 'updatePopupDefault') {
    // Display "Total Score: 0% Not Available" in red text
    displayTotalScore(0, true);
  }
});

function displayTotalScore(totalScore, notAvailable) {
  const scoreElement = document.getElementById('totalScore');

  // Set the color class based on the total score
  let colorClass = '';
  if (notAvailable) {
    colorClass = 'red';
    scoreElement.textContent = 'Total Score: 0% Not Available';
  } else {
    if (totalScore >= 70) {
      colorClass = 'green';
    } else if (totalScore >= 40) {
      colorClass = 'orange';
    } else {
      colorClass = 'red';
    }

    // Update the text content
    scoreElement.textContent = `Total Score: ${totalScore}%`;
  }

  // Apply the color class to the element
  scoreElement.className = colorClass;
}

// Call displayTotalScore with the default value (0%) when the content script is loaded
displayTotalScore(0, true);
