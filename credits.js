const credits = document.querySelector("#credits");
credits.innerHTML = photos.map((photo, index) => `<li>
  <h2>${photo.title}</h2>
  <p lang="en">${photo.name} — ${photo.author}</p>
  <p><a href="${photo.licenseUrl}" target="_blank" rel="noopener">${photo.license}</a></p>
  <p>
    <a href="${photo.source}" target="_blank" rel="noopener">掲載ページ</a> ·
    <a href="${photo.original}" target="_blank" rel="noopener">元画像URL</a> ·
    <a href="${photo.download}" target="_blank" rel="noopener">取得した画像URL</a> ·
    <a href="${photo.file}">同梱画像</a>
    ${index === 5 ? ' · <a href="https://www.geograph.org.uk/photo/930881" target="_blank" rel="noopener">Geograph掲載ページ</a>' : ""}
  </p>
</li>`).join("");
