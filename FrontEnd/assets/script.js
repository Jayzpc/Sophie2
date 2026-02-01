// added script.js as type module in index.html because await is used

// swagger documentation
//	<figure>
//	HTML -----------> <img src="assets/images/${imageURL}" alt="${altText}">
// modify the line above to match your data structure
// <img src="${imageURL}" alt="${altText}">


//				<figcaption>${title}</figcaption>
//			</figure>

// use try / catch to handle errors

async function displayGallery(category, selector = '.gallery') {

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
            // Build the HTML structure for each item speicifying what to show
            // the word item is the type of data from swagger documentation
            data.forEach(item => {

                //if we want a particular item ex item.category.Id === 1 add this line
                // you 
                //if (item.categoryId === 1) { 
                // || is logical OR
                if (item.categoryId === category || !category) {


                    result += `<figure>
            <img src="${item.imageUrl}" alt="${item.title}">
            <figcaption>"${item.title}"</figcaption>
            </figure>`
                }
            })


            galleryElement.innerHTML = result;

        }

    } catch (error) {

        console.error(error)
    }
}

// Call the function to display the gallery when the page loads
// if you want to filter by category add a number in the brackets
 displayGallery(null, "#portfolio-gallery")

const galleryModal = document.getElementById('galleryModal')
const galleryModalBtn = document.getElementById("gallery-popover")
const galleryFormButton = document.getElementById('gallery-form-button')

galleryModalBtn.addEventListener('click', () => {
   displayGallery (null, ".galleryDelete .gallery")
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