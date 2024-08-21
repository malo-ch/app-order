"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
const product =  {
        "name": "Burger",
        "user_name":"",
        "q_max": 10,
        "q_min": 1,
        "current_quantity": 1,
        "commentaries":"",
        "features":[
          {
            "name":"Steak",
            "type":"amount",
            "q_min":1,
            "q_max":2,
            "mandatory":true,
            "current_value":1
            
        },
            {
                "name":"Fromage",
                "type":"list",
                "values":["Cheddar","Toastinette","Mimolette"],
                "mandatory":false,
                "onlyone":true,
                "current_value":[]
                
            },
            {
                "name":"Toppings",
                "type":"list",
                "values":["Laitue","Tomate","Onions","Cornichons","Piments"],
                "mandatory":false,
                "onlyone":false,
                "current_value":[]
            },
            {
                "name":"Sauces",
                "type":"list",
                "values":["Ketchup","Burger"],
                "mandatory":false,
                "onlyone":false,
                "current_value":[]

            },

        ]
    }


   
export function Burger_custom() {
const [order, setorder] = useState(product)
const [hasorder, sethasorder] = useState(false)
const [templateOrder, settemplateOrder] = useState(product)
function FeatureComponent( feature :any) {

  let content;


  
  const modifyOrderList = (featurename:any, value:any, onlyone:any) => {
    // Create a deep copy of the order state
    const tempOrder :any= { ...order };
    const featureIndex = tempOrder.features.findIndex((feature:any) => feature.name === featurename);
  
    
    if (featureIndex !== -1) {
      const feature = tempOrder.features[featureIndex];
  if(onlyone){
    feature.current_value = [value]
  }else{
      if (feature.current_value.includes(value)) {
        // Remove the value from the current_value array
        feature.current_value = feature.current_value.filter((item:any) => item !== value);
      } else {
        // Add the value to the current_value array
        feature.current_value.push(value);
      }
    }
  
      // Update the feature in the tempOrder
      tempOrder.features[featureIndex] = feature;
  
      // Set the state with the updated order
      setorder(tempOrder);
      console.log(order)
    }
  };

  const modifyOrderAmount = (featurename:any, value:any) => {
    const tempOrder :any= { ...order };
    const featureIndex = tempOrder.features.findIndex((feature:any) => feature.name === featurename);
  
    
    if (featureIndex !== -1) {
      const feature = tempOrder.features[featureIndex];
      feature.current_value = value;
      tempOrder.features[featureIndex] = feature;
  
      // Set the state with the updated order
      setorder(tempOrder);
      console.log(order)

    }}
  
  switch (feature.type) {
    case 'list':
      content =   <div className="mb-4">
      <label htmlFor="cheese" className="block font-medium mb-2">
        {feature.name}
      </label>
      <div className="flex flex-wrap gap-2">
       {feature.values.map((value:any) => (
       <div className="flex items-center">
       <input
         type="checkbox"
         id="cheddar"
         name="cheese"
         value={value}
/*             checked={cheese.includes("cheddar")}
         onChange={handleCheeseChange} */
         
         checked={feature.current_value.includes(value)}
          onChange={()=>(modifyOrderList(feature.name, value, feature.onlyone))}
         className="mr-2"
       />
       <label htmlFor="cheddar">{value}</label>
     </div>))  
      }

      </div>
    </div>
      break;
    case 'amount':
      content =   <div className="mb-4">
      <label htmlFor="patty" className="block font-medium mb-2">
        {feature.name}
      </label>
      <div className="flex items-center">
        <input
          type="number"
          id="patty"
          name="patty"
       /*    value={patty}
          onChange={handlePattyChange} */
          value = {feature.current_value}
onChange={(e)=>(modifyOrderAmount(feature.name, e.target.value))}
          defaultValue={feature.q_min}
          min={feature.q_min}
          max={feature.q_max}
          className="mr-2 w-20 text-center"
        />
        <span>{feature.name}</span>
      </div>
    </div>
      break;

  }

  return content
}
 


  const handleNameChange = (e:any) => {

    const tempOrder :any= { ...order };
    tempOrder.user_name = e.target.value;
    setorder(tempOrder);

  }
  const handleQuantityChange = (e:any) => {
    const tempOrder :any= { ...order };
    tempOrder.current_quantity = Number(e.target.value);
    setorder(tempOrder);

  }



  const handleCommentaryChange = (e:any) => {
    const tempOrder :any= { ...order };
    tempOrder.commentaries = e.target.value;
    setorder(tempOrder);

  }
  const handleSubmit = (e:any) => {
    e.preventDefault()
    //post to an api

    fetch('/api/setorders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data:order, method:"setorder"})
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
        setorder(templateOrder)
        sethasorder(true)
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  console.log(order)
  }
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Orderz by malo-ch</h1>
      </header>
    




      <main className="container mx-auto py-12 px-4 md:px-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {!hasorder? <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Construisez Votre {product.name}</h2>
            <form onSubmit={handleSubmit}>
              {order.features.map((feature:any) => (

                //can i put an if statement here to check if the feature is a list or amount
                //if it is a list then render the checkboxes
                //if it is an amount then render the input field
                //if it is a list and mandatory is true then render the checkboxes with a required attribute
               
                <div> {FeatureComponent(feature)}</div>))}





              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-2">
                  Nom
                </label>
                <Input
                  type="text"
                  id="name"
                  value={order.user_name}
                  onChange={handleNameChange}
                  placeholder="Entre ton nom"
                  className="w-full"
required={true}


                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-2">
                  Commentaires
                </label>
                <Input
                  type="text"
                  id="commentaires"
                  value={order.commentaries}
                  onChange={handleCommentaryChange}
                  placeholder="Commentaires particuliers"
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block font-medium mb-2">
                  Quantité
                </label>
                <Input
                  type="number"
                  id="quantity"
                  value={order.current_quantity}
                  max={order.q_max}
                  min={order.q_min}
                  onChange={handleQuantityChange}
    
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Commander Maintenant
              </Button>
            </form>
          </div>
:<div className="bg-card p-6 rounded-lg shadow-md">
   <h2 className="text-xl font-bold mb-4">Merci pour ta commande</h2>
<div className="flex gap-4"><Button type="submit" className="w-full" onClick={()=>sethasorder(false)}>
               Effectuer une nouvelle commande
              </Button></div>
</div>} 
{/*           {JSON.stringify(order)} */}
        {/*   <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Votre Burger Personnalisé</h2>
            <div className="flex items-center justify-center mb-4">
              <img
                src="/placeholder.svg"
                alt="Burger"
                width={200 * patty}
                height={200}
                className="object-contain"
                style={{ aspectRatio: (200 * patty) / 200, objectFit: "cover" }}
              />
            </div>
            <div className="mb-2">
              <span className="font-medium">Steak :</span> {patty} Steak{patty > 1 ? "s" : ""}
            </div>
            <div className="mb-2">
              <span className="font-medium">Fromage :</span> {cheese.length > 0 ? cheese.join(", ") : "Aucun"}
            </div>
            <div className="mb-2">
              <span className="font-medium">Garnitures :</span> {toppings.length > 0 ? toppings.join(", ") : "Aucune"}
            </div>
            <div className="mb-2">
              <span className="font-medium">Sauces :</span> {sauces.length > 0 ? sauces.join(", ") : "Aucune"}
            </div>
            <div className="mb-2">
              <span className="font-medium">Nom :</span> {name || "Anonyme"}
            </div>
            <div className="mb-2">
              <span className="font-medium">Quantité :</span> {quantity}
            </div>
          </div> */}
        </section>
      </main>


      
    </div>
  )
}
