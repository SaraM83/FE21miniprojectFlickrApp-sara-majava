

const myKey = 'a708311d89f5e9313eca5a346b380b7a';
const btn = document.querySelector('button');

btn.addEventListener( 'click', 
    function(){
        const userInput = document.querySelector('#search');
        const pagesInput = document.querySelector('#rdBtn'); 
        searchPic(userInput.value, pagesInput.value);
    }
);


function searchPic(pic, pages){
    const url = `https://www.flickr.com/services/rest/?api_key=${myKey}&method=flickr.photos.search&text=${pic}&format=json&nojsoncallback=3&per_page=${pages}&page=4`; 

    fetch(url).then(
        function(response){
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                throw 'Something went wrong'; 
            }
        }

    ).then(
        function(data){
            let picsArray = data; 
            const photoArray = picsArray.photos.photo; 
            getImageUrl(photoArray);   
        }
    ).catch(
        function(error) {
            console.log(error); 
        }
    )
}

function getImageUrl(object){ 
    for(let i = 0; i < object.length; i++) {
        let photo = object[i];
        let size = 'm';
        let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
        console.log(imgUrl);
        displayImg(imgUrl); 
    }

}
 
function displayImg(url){
    let img = document.createElement('img');
    img.src = url;

    const div = document.querySelector('div'); 
    div.appendChild(img);
    img.style.margin = '10px'; 

}