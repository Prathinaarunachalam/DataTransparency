chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let currentTab = tabs[0];
      if (currentTab && currentTab.url) {
        sendUrlToServer(currentTab.url);
      }
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getTotalScore') {
    // Get the tab ID and send the message to the content script
    const tabId = sender.tab.id;
    chrome.tabs.sendMessage(tabId, { action: 'getTotalScore' });
  }
});

function sendUrlToServer(url) {
  fetch('http://localhost:3000/api/get-url-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: url }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Total score received for URL:', url, 'Score:', data.totalScore);
      // Notify the popup with the total score
      chrome.runtime.sendMessage({ action: 'updatePopup', totalScore: data.totalScore });
    })
    .catch(error => {
      console.error('Error fetching total score for URL:', url, 'Error:', error);
      // Notify the popup with a default value
      chrome.runtime.sendMessage({ action: 'updatePopupDefault' });
    });
}
