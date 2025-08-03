const resultBox = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const scanner = new Html5Qrcode("reader");

function showMessage(html, isError = false) {
  resultBox.innerHTML = html;
  resultBox.style.color = isError ? 'red' : 'green';
  nextBtn.style.display = 'inline-block';
}

function startScanner() {
  scanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    qrCodeMessage => {
      scanner.stop();
      resultBox.innerHTML = "Validating ticket...";
      nextBtn.style.display = 'none';

      fetch("https://script.google.com/macros/s/AKfycbyK2Radk0l2uU58FVdfCK6ihN_KXyMCXh7FiUpKiUN9yTYaqG8_fn7ryMFWwuBe0G5l/exec?ref=" + encodeURIComponent(qrCodeMessage))
        .then(response => response.text())
        .then(html => {
          if (html.includes("Ticket not found")) {
            showMessage("❌ Ticket not found.", true);
          } else {
            showMessage("✅ Ticket valid and scanned.");
          }
        })
        .catch(err => {
          showMessage("❌ Error validating ticket.", true);
          console.error(err);
        });
    },
    errorMessage => {}  // Ignore scan errors
  ).catch(err => {
    resultBox.innerHTML = "Camera error: " + err;
  });
}

nextBtn.addEventListener("click", () => {
  resultBox.innerHTML = "Waiting for scan...";
  nextBtn.style.display = 'none';
  startScanner();
});

startScanner();