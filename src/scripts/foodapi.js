
 // Create a function which returns a string template. The template is the HTML representation for a food item.

 function foodFactory (food) {
    return `
    <div class='food-items'>
    <h1>${food.name}</h1>
    <section>${food.category}</section>
    <section>${food.ethnicity}</section>
    <section>${food.id}</section>
    </div>
    `;
}

// Create a function that inserts an HTML representation of a food into the DOM

const addFoodToDom = (foodAsHTML) => {
    let div = document.querySelector('.foodList');
    div.innerHTML += foodAsHTML;
    return div; 
}

// Chained together
// fetch gets data
fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            
        let foodAsHTML = foodFactory(food)
            
        console.log(foodFactory(food))
        addFoodToDom(foodAsHTML)
        })
    })

   


 

  