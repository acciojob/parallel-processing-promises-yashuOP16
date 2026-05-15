const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const loading = document.createElement("div");
loading.id = "loading";
document.body.appendChild(loading);

const error = document.createElement("div");
error.id = "error";
document.body.appendChild(error);

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    
    const img = document.createElement("img");

    img.src = url;

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(`Failed to load image: ${url}`);
    };
  });
}

async function downloadImages() {

  loading.innerText = "Loading...";

  output.innerHTML = "";
  error.innerHTML = "";

  try {

    const promises = images.map((image) => {
      return downloadImage(image.url);
    });

    const downloadedImages = await Promise.all(promises);

    loading.innerText = "";

    downloadedImages.forEach((img) => {
      output.appendChild(img);
    });

  } catch (err) {

    loading.innerText = "";
    error.innerText = err;
  }
}

downloadImages();