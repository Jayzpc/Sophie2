// added script.js as type module in index.html because await is used

// swagger documentation
//	<figure>
//	HTML -----------> <img src="assets/images/${imageURL}" alt="${altText}">
// modify the line above to match your data structure
// <img src="${imageURL}" alt="${altText}">


//				<figcaption>${title}</figcaption>
//			</figure>

// use try / catch to handle errors

/** 
 * @param {number|null} category
 * @param {string} selector
 * @param {boolean} [isTrash] // Optional parameter to indicate if the gallery is for trash items use square brackets to indicate optional parameter
 * @returns {Promise<void>}
 *
*/
async function displayGallery(category, selector = '.gallery', isTrash) {

    //where the data is going
    // const portfolioElement = document.getElementById('portfolio')


    try {

        const response = await fetch('http://localhost:5678/api/works')
        if (response.ok) {
            const data = await response.json()
            //This will look for first element in portfolio with name gallery
            const galleryElement = document.querySelector(selector)
            // console.log(data) or displayData(data);




            // Loop through each item in the data array
            let result = ''
            galleryElement.innerHTML = result;
            // Build the HTML structure for each item speicifying what to show
            // the word item is the type of data from swagger documentation
            data.forEach(item => {

                //if we want a particular item ex item.category.Id === 1 add this line
                // you 
                //if (item.categoryId === 1) { 
                // || is logical OR
                if (item.categoryId === category || !category) {


                    //      result += `<figure>
                    // <img src="${item.imageUrl}" alt="${item.title}">
                    //  <figcaption>"${item.title}"</figcaption>
                    // </figure>`
                    if (isTrash) {

                        const figure = document.createElement('figure');
                        const img = document.createElement('img')
                        const figcaption = document.createElement('figcaption')
                        const trash = document.createElement('button');




                        figure.append(trash, img, figcaption)
                        img.src = item.imageUrl
                        img.alt = item.title
                        figcaption.textContent = item.title
                        trash.innerHTML = '<i class="fa-solid fa-trash"></i>'

                        galleryElement.appendChild(figure)


                        trash.addEventListener('click', async (event) => {
                            trash.innerHTML = '<i class="fa-solid fa-trash"></i>';
                            console.log(`Deleting item with ID: ${item.id}`); // when looking at the console I should see more info like tom video at 14.26
                           
                           // now that we got the id we can make a delete request to the backend to delete the item from the database and then remove it from the gallery
                           fetch(`http://localhost:5678/api/works/${item.id}`, {
                           method: 'DELETE',
                           })
                           // now to handle the response from the backend
                            .then(response => {
                                if (response.status === 200) {
                                    figure.remove()
                                    return  
                                    // check console see which response you get from the backend and if the item is removed from the gallery

                                } else if (response.status === 401) {
                                    window.location.href = 'login.html'
                                  //  console.error(`Failed to delete item with ID: ${item.id}. Status: ${response.status}`);


                                } else if (response.status === 500) {
                                    console.error(`Server error while deleting item with ID: ${item.id}. Status: ${response.status}`);
                                    // error 500 is a server error which means there is an issue with the backend and not the frontend so we can log the error to the console and maybe display a message to the user


                                }
                            })
})
                    } else {
                        result += `<figure>
            <img src="${item.imageUrl}" alt="${item.title}">
           <figcaption>"${item.title}"</figcaption>
            </figure>`

                    }
                }

                if (!isTrash)
                    galleryElement.innerHTML = result;

            })

        }
    } catch (error) {

        console.error(error)
    }
}

// Call the function to display the gallery when the page loads
// if you want to filter by category add a number in the brackets
// inital call to display all items in the gallery on main page
displayGallery(null, "#portfolio-gallery")

const galleryModal = document.getElementById('galleryModal')
const galleryModalBtn = document.getElementById("gallery-popover")
const galleryFormButton = document.getElementById('gallery-form-button')

galleryModalBtn.addEventListener('click', () => {
    displayGallery(null, ".galleryDelete .gallery", true)
})

galleryFormButton.addEventListener('click', () => {
    const galleryDeleteElement = galleryModal.querySelector('.galleryDelete')
    const galleryFormElement = galleryModal.querySelector('.galleryForm')

    galleryDeleteElement.classList.remove('show')
    galleryFormElement.classList.add('show')

    /*
          const modalpop = document.querySelector('galleryModal.galleryDelete');
            // Clear the gallery before displaying new or filtered works
            modalpop.innerHTML = 'result';
    const figure = document.createElement('figure');
    const trash = document.createElement('button');
    trash.addEventListener('click', async (event) => {
                trash.innerHTML = '<i class="fa-solid fa-trash"></i>';
    
                /*trash.textContent = "trash"; //  
                trash.classList.add('trash');
                figure.classList.add('positioned-element');
                const modalimg = document.createElement('img');
                /*const figcaption = document.createElement('figcaption');
    
                figure.appendChild(trash);
    
                modalimg.src = item.imageUrl;
                modalimg.classList.add('modalimage');
                            figure.appendChild(modalimg);
                /*figure.appendChild(figcaption);
                modalpop.appendChild(figure);
    modalpop.appendChild(item.categoryId);*/

})



// Example usage: display all items
//displayGallery();