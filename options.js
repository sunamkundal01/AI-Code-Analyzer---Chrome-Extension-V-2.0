document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById("apiKey");
  const saveButton = document.getElementById("saveKey");
  const statusDiv = document.getElementById("status");

  // Load saved API key
  chrome.storage.local.get(["geminiApiKey"], (result) => {
    if (result.geminiApiKey) {
      apiKeyInput.value = result.geminiApiKey;
    }
  });

  // Save API key
  saveButton.addEventListener("click", () => {
    const apiKey = apiKeyInput.value.trim();

    if (!apiKey) {
      showStatus("Please enter an API Key", "error");
      return;
    }

    // Basic validation for API key format (Google API keys typically start with 'AI')
    if (!apiKey.startsWith("AI") || apiKey.length < 20) {
      showStatus("Invalid API Key format. Please check your key.", "error");
      return;
    }

    chrome.storage.local.set({ geminiApiKey: apiKey }, () => {
      if (chrome.runtime.lastError) {
        showStatus("Failed to save API Key. Please try again.", "error");
      } else {
        showStatus("API Key saved successfully!", "success");
      }
    });
  });

  function showStatus(message, type = "info") {
    statusDiv.textContent = message;
    statusDiv.className = type;

    setTimeout(() => {
      statusDiv.textContent = "";
      statusDiv.className = "";
    }, 3000);
  }
});
