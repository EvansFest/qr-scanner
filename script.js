function startScanner() {
  const html5QrCode = new Html5Qrcode("preview");
  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    html5QrCode.stop();
    document.getElementById("result").innerHTML = "Scanned: " + decodedText;

    // Lookup URL for scanned REF
    const lookupUrl = "https://script.google.com/macros/s/AKfycbxJPxi0bCJJFuUW6xPHMe7kWtPG8eQwRNR-IHLykVkwxwqMlMfJMNVco4Doune4rUOL/exec?ref=" + encodeURIComponent(decodedText);
    fetch(lookupUrl)
      .then(res => res.text())
      .then(html => {
        document.getElementById("result").innerHTML = html + '<br><button onclick="startScanner()">Next Scan</button>';
      })
      .catch(err => {
        document.getElementById("result").innerHTML = "<p style='color: red;'>Error loading ticket info.</p>";
      });
  };

  const config = { fps: 10, qrbox: 250 };
  html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
}
