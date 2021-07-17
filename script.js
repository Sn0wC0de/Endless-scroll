const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
console

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray  = [];

// Unsplash API
let count = 4;
const apiKey = 'OYjdNS3yQnlR1ShNXrdSkkyHwnqrguoILTEfnUdaC2E'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count};`


//Helper function to set attribute on DOM elemet

function setAttributes (element, attributes)  {
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

//check if all images are loaded

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 10;

    }
}


//creates element for links & photos, add to DOM



function displayPhotos() {
    //Run function  for eatch
    photosArray.forEach((photo) => {
        imagesLoaded = 0;
        totalImages = photosArray.length;
        //create <a> to link  to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photos
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes( img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,

        })
        //Event listener check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);

        }
        

    )
}

//get photos from API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch (error) {
        //catch error here
    }
}
//check to see if scroling near bottom of page, Load more photos

window.addEventListener('scroll', ()=> {
    // console.log('total', totalImages)
    // console.log('loaded', imagesLoaded)
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready=false;
        getPhotos();
        
        
        
    }
})
getPhotos();