
const scanner = new Html5Qrcode("preview");

function onScanSuccess(decodedText) {
  if (decodedText.startsWith("REF")) {
    fetch(`https://script.google.com/macros/s/AKfycbyK2Radk0l2uU58FVdfCK6ihN_KXyMCXh7FiUpKiUN9yTYaqG8_fn7ryMFWwuBe0G5l/exec?ref=${decodedText}`)
      .then(response => response.text())
      .then(html => {
        document.getElementById("result").innerHTML = html;
      })
      .catch(err => {
        document.getElementById("result").innerHTML = "<p style='color:red;'>Error fetching ticket.</p>";
      });
  }
}

Html5Qrcode.getCameras().then(cameras => {
  if (cameras && cameras.length) {
    scanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250
      },
      onScanSuccess
    );
  }
}).catch(err => {
  document.getElementById("result").innerHTML = "<p style='color:red;'>Camera access denied.</p>";
});
