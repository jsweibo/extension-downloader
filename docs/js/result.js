const hintField = document.querySelector('.hint-field');
const downloadURL = sessionStorage.getItem('downloadURL');

if (!downloadURL) {
  location.href = 'index.html';
} else {
  sessionStorage.removeItem('downloadURL');

  document.querySelector('.form-field input').value = downloadURL;
  document.querySelector('#copy').dataset.clipboardText = downloadURL;
  new ClipboardJS('#copy').on('success', function (event) {
    event.clearSelection();
    hintField.classList.add('hint-field_visible');
    setTimeout(function () {
      hintField.classList.remove('hint-field_visible');
    }, 1e3);
  });
}
