import QrScanner from './qr-scanner.min.js';
QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';

const videoElem = document.createElement('video');
document.getElementById('scanner').appendChild(videoElem);
const messageElem = document.getElementById('message');

const scanner = new QrScanner(videoElem, result => {
  messageElem.innerText = "Scanned: " + result;
  window.location.href = "https://script.google.com/macros/s/AKfycbxJPxi0bCJJFuUW6xPHMe7kWtPG8eQwRNR-IHLykVkwxwqMlMfJMNVco4Doune4rUOL/exec?ref=" + result;
}, {
  returnDetailedScanResult: true
});

scanner.start();