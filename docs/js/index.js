const storeSelect = document.querySelector('#store');
const idInput = document.querySelector('#id');

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const store = storeSelect.value;
  const id = idInput.value;
  let downloadURL = '';
  switch (store) {
    case '0':
      downloadURL = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=94.0.4606.61&acceptformat=crx3&x=id%3D${id}%26installsource%3Dondemand%26uc`;
      break;
    case '1':
      downloadURL = `https://edge.microsoft.com/extensionwebstorebase/v1/crx?response=redirect&x=id%3D${id}%26installsource%3Dondemand%26uc`;
      break;
  }
  sessionStorage.setItem('downloadURL', downloadURL);
  location.href = 'result.html';
});

// parse url search string
if (location.search && URLSearchParams) {
  const sp = new URLSearchParams(location.search);
  const id = sp.get('id');
  if (id) {
    idInput.value = id;
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function (error) {
      console.log(error);
    });
  });
}
