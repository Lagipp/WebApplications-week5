console.log("client.js up and running");



fetch("/recipe/omelette")
  .then(response => response.json())
  .then(data => {

    const header = document.getElementsByClassName("header")[0];
    const wrappingDiv = document.getElementsByClassName("wrapper")[0];

    const unorderedList = document.createElement("ul");
    const unorderedList2 = document.createElement("ul");

    instructionsArray = data.instructions.length;
    ingredientsArray = data.instructions.length;


    // Changing the name 
    header.innerHTML = data.name;


    // Adding the ingredients from JSON to an unordered list 
    for (m = 0; m < ingredientsArray; m++)
    {
        let listItem = document.createElement("li");
        listItem.innerHTML = data.ingredients[m];
        unorderedList.append(listItem);
    }
    wrappingDiv.appendChild(unorderedList);
    

    // Adding the instructions from JSON to an unordered list 
    for (p = 0; p < instructionsArray; p++)
    {
        let listItem = document.createElement("li");
        listItem.innerHTML = data.instructions[p];
        unorderedList2.append(listItem);
    }
    wrappingDiv.appendChild(unorderedList2);

  });


  const recipeTextArea = document.getElementById("name-text");
  const ingredientsTextArea = document.getElementById("ingredients-text");
  const instructionsTextArea = document.getElementById("instructions-text");
  
  const addIngredientsButton = document.getElementById("add-ingredient");
  const addInstructionsButton = document.getElementById("add-instruction");
  const addSubmitButton = document.getElementById("submit");


  /* JSON object for saving values */
  let dataList = { name: "", ingredients: [], instructions: [] };



  /* creating eventListeners for the buttons */



  addIngredientsButton.addEventListener("click", function () {

    /* splitting the values by newline */
    let ingrInput = ingredientsTextArea.value.split(/\r\n|\r|\n/);


    /* checking if the text-area is empty */

    if (ingrInput == "")
    {
      console.log("*** ERR: empty string in 'ingredients-textArea");
    } else 
    {
      dataList.ingredients.push(ingrInput);
    }

    console.log("== DEBUG: inside datalist.ingredients: " + JSON.stringify(dataList.ingredients));
  });


  addInstructionsButton.addEventListener("click", function() {

    /* splitting the values by newline */
    let instrInput = instructionsTextArea.value.split(/\r\n|\r|\n/);


    /* checking if the text-area is empty */

    if (instrInput == "")
    {
      console.log("*** ERR: empty string in 'instructions-textArea");
    } else
    {
      dataList.instructions.push(instrInput);
    }
    console.log("== DEBUG: inside datalist.instructions: " + JSON.stringify(dataList.instructions));
  });


  addSubmitButton.addEventListener("click", function() {
    
    if (recipeTextArea.value != "")
    {
      let recipeInput = recipeTextArea.value;
      dataList.name = recipeInput;      // redundant? why do this?
    }
    else
    {
      console.log("*** ERR: empty string in 'recipe-textArea");
    }

    console.log("== DEBUG: before fetch in 'submit'-button");

    
    fetch("/recipe", {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataList),
    })
    .then(response => response.json())
    .then(
      console.log("== DEBUG: inside second '.then' in fetch()"),
      console.log(dataList))
      //return dataList;
      //dataList => 
  }
  
    );

