function getWebcamVideo() {
  const videos = Array.from(document.querySelectorAll('video'))
    .sort((v1, v2) => {
      const v1Rect = v1.getClientRects()[0]||{width:0,height:0};
      const v2Rect = v2.getClientRects()[0]||{width:0,height:0};
      return ((v2Rect.width * v2Rect.height) - (v1Rect.width * v1Rect.height));
    });

  if (videos.length === 0) {
    return;
  }
    
  videoNumber = window.prompt("Enter the webcam number you wish to display in PIP between 0 and " + (videos.length - 1).toString(), "0");
    
  if (!isNaN(parseInt(videoNumber))) {
    videoNumber = parseInt(videoNumber)
    if ((0 <= videoNumber) && (videoNumber <= videos.length - 1))
      return videos[videoNumber]; 
  }
      
  window.alert("Bad input, please re-try");
  return;
}

async function requestPictureInPicture(video) {
  await video.requestPictureInPicture();
  video.setAttribute('__pip__', true);
  video.addEventListener('leavepictureinpicture', event => {
    video.removeAttribute('__pip__');
  }, { once: true });
}

(async () => {
  const video = getWebcamVideo();
  if (!video) {
    return;
  }
  if (video.hasAttribute('__pip__')) {
    document.exitPictureInPicture();
    return;
  }
  await requestPictureInPicture(video);
})();
