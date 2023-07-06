const ORDER = require('../model/OrderModel');

// Create order route
const create_order_controller= async (req,res)=>{
    const {firstname,lastname,mobile,address,paymentMode} = req.body
    try{
        if(!firstname || !lastname || !mobile || !address || !paymentMode){
            res.json({status:"false",errMessage:"Fill everywhere"})
        }
        if(mobile.length > 11){
            res.json({status:"false",errMessage:"Mobile too long"})
        }
        const order = await ORDER.create(req.body)
            // const savedOrder = order.save()
            res.status(201).json(order)
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {
    create_order_controller
}