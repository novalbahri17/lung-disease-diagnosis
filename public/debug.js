// Debug script untuk memonitor perubahan DOM
console.log('=== DEBUGGING INFINITE REFRESH ===');

let refreshCount = 0;
let lastRefresh = Date.now();

// Monitor page reload
window.addEventListener('beforeunload', () => {
  refreshCount++;
  console.log(`🔄 Page reload #${refreshCount} detected at ${new Date().toLocaleTimeString()}`);
});

// Monitor DOM changes
const observer = new MutationObserver((mutations) => {
  const now = Date.now();
  if (now - lastRefresh > 1000) { // Log only if > 1 second since last log
    console.log(`🔍 DOM mutations detected: ${mutations.length} changes`);
    lastRefresh = now;
  }
});

// Start observing when DOM is ready
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
  });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  });
}

// Monitor React renders (if available)
if (window.React) {
  console.log('✅ React detected, monitoring renders...');
} else {
  console.log('❌ React not detected yet');
}

console.log('Debug script loaded. Check console for refresh/reload patterns.');
