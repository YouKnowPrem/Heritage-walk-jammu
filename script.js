// Mandala Loading Screen (Optimized timing for smoothness)
function handleMandalaLoading() {
    const loadingScreen = document.getElementById('loadingScreen');

    if (!loadingScreen) {
        document.body.classList.remove('loading');
        return;
    }

    // Add loading class to body to prevent scrolling
    document.body.classList.add('loading');

    // Hide loading screen after 2.5 seconds
    const hideTimer = setTimeout(() => {
        hideLoadingScreen();
    }, 2500);

    // Also hide on any click/touch
    loadingScreen.addEventListener('click', () => {
        clearTimeout(hideTimer);
        hideLoadingScreen();
    });

    function hideLoadingScreen() {
        // Fade out the loading screen
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Remove loading class from body to restore scrolling
        document.body.classList.remove('loading');
        
        // --- Tweak for Smoother Transition ---
        // Match the 0.4s CSS transition time + a 100ms buffer (500ms total) 
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500); // Removed after transition finishes
    }
}
// ... (The rest of the script.js remains unchanged) ...

// Emergency fallback to ensure loading screen always disappears
setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && loadingScreen.parentNode) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        loadingScreen.style.display = 'none';
        document.body.classList.remove('loading');
        
        // --- Tweak for Smoother Transition ---
        // Ensure removal after CSS transition (500ms buffer)
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500); 
    }
}, 5000); // 5 second absolute emergency fallback
