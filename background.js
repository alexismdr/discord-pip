chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get({}, (results) => {
    const files = ["script.js"]
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      world: "MAIN",
      files,
    });
  });
});
