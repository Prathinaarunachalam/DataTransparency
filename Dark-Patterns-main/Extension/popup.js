document.addEventListener('DOMContentLoaded', function () {
    // Get the current tab ID
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tabId = tabs[0].id;
  
      // Send a message to the background script to get the total score
      chrome.runtime.sendMessage({ action: 'getTotalScore', tabId: tabId });
    });
  });
  
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
  