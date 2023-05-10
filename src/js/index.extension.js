const extensionStoreSelect = document.querySelector('#extensionStore');
const extensionIdInput = document.querySelector('#extensionId');

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const extensionStore = extensionStoreSelect.value;
  const extensionId = extensionIdInput.value;
  let downloadURL = '';
  switch (extensionStore) {
    case '0':
      downloadURL = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=94.0.4606.61&acceptformat=crx3&x=id%3D${extensionId}%26installsource%3Dondemand%26uc`;
      break;
    case '1':
      downloadURL = `https://edge.microsoft.com/extensionwebstorebase/v1/crx?response=redirect&x=id%3D${extensionId}%26installsource%3Dondemand%26uc`;
      break;
  }
  sessionStorage.setItem('downloadURL', downloadURL);
  location.href = 'result.html';
});

// parse url search string
if (location.search && URLSearchParams) {
  const extensionId = new URLSearchParams(location.search).get('extensionId');
  if (extensionId) {
    extensionIdInput.value = extensionId;
  }
}
