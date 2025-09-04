import "@fortawesome/fontawesome-free/css/all.min.css";
import "./src/styles/prism-theme.css";

// Add copy buttons to code blocks
export const onRouteUpdate = () => {
  const addCopyButtons = () => {
    const codeBlocks = document.querySelectorAll('pre[class*="language-"]');
    
    codeBlocks.forEach((codeBlock) => {
      // Skip if copy button already exists
      if (codeBlock.querySelector('.code-copy-button')) {
        return;
      }

      const code = codeBlock.querySelector('code');
      if (!code) return;

      const codeText = code.textContent || code.innerText || '';
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-button';
      copyButton.title = 'Copy code';
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');
      
      // Copy icon SVG
      copyButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>
      `;
      
      // Check icon SVG for success state
      const checkIcon = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      `;
      
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(codeText);
          
          // Show success state
          copyButton.innerHTML = checkIcon;
          copyButton.title = 'Copied!';
          copyButton.style.background = 'rgba(34, 197, 94, 0.2)';
          copyButton.style.borderColor = 'rgba(34, 197, 94, 0.4)';
          copyButton.style.color = '#22c55e';
          
          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
            `;
            copyButton.title = 'Copy code';
            copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
            copyButton.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            copyButton.style.color = '#f8f8f2';
          }, 2000);
          
        } catch (err) {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = codeText;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
            document.execCommand('copy');
            
            // Show success state
            copyButton.innerHTML = checkIcon;
            copyButton.title = 'Copied!';
            copyButton.style.background = 'rgba(34, 197, 94, 0.2)';
            copyButton.style.borderColor = 'rgba(34, 197, 94, 0.4)';
            copyButton.style.color = '#22c55e';
            
            setTimeout(() => {
              copyButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
              `;
              copyButton.title = 'Copy code';
              copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
              copyButton.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              copyButton.style.color = '#f8f8f2';
            }, 2000);
            
          } catch (fallbackErr) {
            console.error('Failed to copy code:', fallbackErr);
          }
          
          document.body.removeChild(textArea);
        }
      });
      
      // Add the copy button to the code block
      codeBlock.appendChild(copyButton);
    });
  };

  // Add copy buttons after a small delay to ensure DOM is ready
  setTimeout(addCopyButtons, 100);
};
