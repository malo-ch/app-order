import { json } from "stream/consumers";

const ordersDb ={
    current_prod:["Burger"],
    Orders:[]
}
let lastid=1
export default (req, res) => {
    //How to console log the request body in post
    console.log(req.body);
    const { method,data } = req.body
//turn data into a json object
    
    switch (method){
    case "setorder" :
        
    console.log(typeof data)
        
        
        data.id=lastid++
        ordersDb.Orders.push(data)

        
        console.log(ordersDb)
 return res.status(200).json({ name: 'John Doe' })
case "getorder":
    return res.status(200).json(ordersDb.Orders)
    
case "decreasequantity":
    const id =data.id
    console.log(id)
    if(!id) return console.log("no id")
    console.log(id)
    //find the order, and add one less quantity
if(ordersDb.Orders.find(order=>order.id==id).current_quantity==1 ){
    console.log("filtered")
    ordersDb.Orders=ordersDb.Orders.filter(order=>order.id!=id)
}else {
    ordersDb.Orders.find(order=>order.id==id).current_quantity--
}
res.status(200).json(ordersDb.Orders)
    
    break
    }}
    