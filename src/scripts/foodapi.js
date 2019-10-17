

// Chained together
// fetch gets data
// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         parsedFoods.forEach(food => {
            
//         let foodAsHTML = foodFactory(food)
            
//         console.log(foodFactory(food))
//         addFoodToDom(foodAsHTML)
//         })
//     })

   
// Once you have the barcode, you can use the Open Food Facts JSON API to get a plethora of information about that product. For example, the barcode for Jimmy Dean Pork Sausage is 0077900110726. I can take that barcode and query their API.
  
    // fetch("https://world.openfoodfacts.org/api/v0/product/0011150479547.json")
    // .then(response => response.json())
    // .then(productInfo => {
    //     0077900110726 
    //     console.log(productInfo);
    // })

//     Your job is to query the Open Food Facts API for each of your products, and list the following additional information.

// Ingredients
// Country of origin
// Calories per serving
// Fat per serving
// Sugar per serving
// Helpful hints: You will need to use the forEach array method to iterate your foods. Inside that forEach, you will need to perform another fetch to get the additional information. The barcode value must be interpolated inside the URL for the inner fetch.


 // Create a function which returns a string template. The template is the HTML representation for a food item.

 function foodFactory (food) {
    return `
    <div class='food-items'>
    <h1>${food.name}</h1>
    <section>${food.category}</section>
    <section>${food.ethnicity}</section>
    <section>${food.ingredients}<section>
    <section>${food.country}<section>
    <section>${food.calories}<section>
    <section>${food.fat}<section>
    <section>${food.sugar}<section>
    </div>
    `;
}

// Create a function that inserts an HTML representation of a food into the DOM

const addFoodToDom = (foodAsHTML) => {
    let div = document.querySelector('.foodList');
    div.innerHTML += foodAsHTML;
    return div; 
}

 
    fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            // Should have a `barcode` property

    //         // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    console.log(food)
                    const evaluateStoreProperties = (propertyJson, propertyStore) => {
                        if (productInfo.product[propertyJson]) {
                            food[propertyStore] = productInfo.product[propertyJson]
                          } else {
                            food[propertyStore] = `no ${propertyStore} listed`
                          }

                        }
                        evaluateStoreProperties('ingredients_text', 'ingredients')
                        evaluateStoreProperties('countries', 'country')
                        evaluateStoreProperties('calories', 'calories')
                    //    debugger 
                       if (productInfo.product.nutriments.fat) {
                           food.fat = productInfo.product.nutriments.fat
                       } else {
                           food.fat = `no fat listed`
                   }

                       if (productInfo.product.nutriments.sugars) {
                           food.sugar = productInfo.product.nutriments.sugars
                        } else {
                           food.sugar = `no sugar listed`
                   }
                     

                    
                    // console.log(food.barcode)

    // //                 // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

    // //                 // Add representation to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })