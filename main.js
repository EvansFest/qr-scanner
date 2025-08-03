const video = document.getElementById('preview');
const resultBox = document.getElementById('result');

QrScanner.WORKER_PATH = 'qr-scanner-worker.min.js';

const scanner = new QrScanner(video, result => {
  scanner.stop();

  const ref = result.trim();
  resultBox.innerHTML = `🔍 Verifying ticket...`;

  fetch(`https://script.google.com/macros/s/AKfycbxJPxi0bCJJFuUW6xPHMe7kWtPG8eQwRNR-IHLykVkwxwqMlMfJMNVco4Doune4rUOL/exec?ref=${encodeURIComponent(ref)}`)
    .then(res => res.text())
    .then(html => {
      resultBox.innerHTML = html;
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next Scan';
      nextButton.onclick = () => {
        resultBox.innerHTML = 'Waiting for scan...';
        scanner.start();
      };
      resultBox.appendChild(nextButton);
    })
    .catch(err => {
      resultBox.innerHTML = `<span style="color:red;">❌ Error: ${err.message}</span>`;
    });

}, {
  highlightScanRegion: true,
  highlightCodeOutline: true
});

scanner.start();
