Webcam.set({
    width: 320,
    height: 240,
    image_format: "jpeg",
    jpeg_quality: 90,
  });
  
  function openWebcam() {
    Webcam.attach("#my_camera");
  }
  
  function takeSnapshot() {
    Webcam.snap(function (data_uri) {
      document.getElementById("webcam_image").value = data_uri;
      document.getElementById("snapshot").src = data_uri;
      document.getElementById("snapshot_container").style.display = "block";
  
      // Show notification
      var notification = document.getElementById("notification");
      notification.style.display = "block";
      
      // Automatically hide notification after 3 seconds
      setTimeout(() => {
        notification.style.display = "none";
      }, 5000);
    });
  }
  
  document
    .getElementById("webcamModal")
    .addEventListener("shown.bs.modal", openWebcam);
  document
    .getElementById("webcamModal")
    .addEventListener("hidden.bs.modal", () => Webcam.reset());
  