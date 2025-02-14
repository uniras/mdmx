import { marked } from 'https://cdn.jsdelivr.net/npm/marked@13.0.1/lib/marked.esm.js';
import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/es/highlight.min.js';

document.addEventListener('htmx:afterRequest', function(event) {
    const targetElement = event.target;

    if (targetElement.classList.contains('markdown')) {
        const markdownText = event.detail.xhr.responseText;
        const htmlContent = marked.parse(markdownText);
        let swap = targetElement.getAttribute('hx-swap') || 'innerHTML';
        let target = event.detail.target;
        htmx.swap(target, htmlContent, { swapStyle: swap });
        hljs.highlightAll();
        htmx.process(target);
    }
});
