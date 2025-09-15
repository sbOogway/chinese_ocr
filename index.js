// import { createWorker } from "tesseract.js";

const video = document.getElementById("video");

async function startCamera() {
  try {
    const stream = navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    });
    video.srcObject = stream;
    await video.play();
  } catch (err) {
    console.error(err);
  }

   // OCR worker as a callable async function
   async function runOCR() {
    const worker = await Tesseract.createWorker({
      logger: m => console.log(m), // optional
    });
    await worker.loadLanguage("chi_sim"); // example Chinese simplified
    await worker.initialize("chi_sim");
    // capture a frame from the video to a canvas
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 400;
    canvas.height = video.videoHeight || 400;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    const { data: { text } } = await worker.recognize(dataUrl);
    console.log("OCR text:", text);
    await worker.terminate();
    return text;
  }

  // call OCR when ready (example: after 1s)
  setTimeout(() => runOCR().catch(console.error), 1000);

}

startCamera();
