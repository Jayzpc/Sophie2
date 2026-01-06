// added script.js as type module in index.html because await is used

// swagger documentation
//	<figure>
//				<img src="assets/images/${imageURL}" alt="${altText}">
// modify the line above to match your data structure
// <img src="${imageURL}" alt="${altText}">


//				<figcaption>${title}</figcaption>
//			</figure>

// use try / catch to handle errors

async function displayGallery(category) {

//where the data is going
const portfolioElement = document.getElementById('portfolio')


try {
    
    const response = await fetch('http://localhost:5678/api/works')
    if (response.ok) {
     const data = await response.json()
                //This will look for first element in portfolio with name gallery
    const galleryElement = portfolioElement.querySelector('.gallery')
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
    if (item.categoryId === category || category === undefined) {


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
displayGallery();