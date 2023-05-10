const downloadURL = sessionStorage.getItem('downloadURL');

if (!downloadURL) {
  location.href = 'index.html';
} else {
  sessionStorage.removeItem('downloadURL');

  document.querySelector('.form-field textarea').value = downloadURL;
  document.querySelector('#copy').dataset.clipboardText = downloadURL;
  new ClipboardJS('#copy').on('success', function (event) {
    event.clearSelection();
    notify({
      type: 'success',
      message: 'Copied',
    });
  });
}
