function reloadIframe() {
    var iframe = document.getElementById('iframe');
    iframe.src = iframe.src; // Reload the iframe by resetting the 'src' attribute
}

setInterval(reloadIframe, 15000);//Value is in milliseconds, 1 second is 1,000 milliseconds.



function tryClickTextInIframe(iframeId, targetText) {
    const iframe = document.getElementById(iframeId);
    if (!iframe) return;

    const interval = setInterval(() => {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const elements = iframeDoc.querySelectorAll("*");

            for (let el of elements) {
                if (el.textContent.trim().toLowerCase() === targetText.toLowerCase()) {
                    el.click();
                    clearInterval(interval);
                    console.log(`Clicked on "${targetText}"`);
                    return;
                }
            }
        } catch (e) {
            // Cross-origin or still loading
            console.warn("Waiting for iframe to load or become accessible...");
        }
    }, 500); // Retry every 500ms
}

tryClickTextInIframe("iframe", "Month");