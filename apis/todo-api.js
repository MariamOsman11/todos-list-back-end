import { Router } from "express";
import { saveItemInCollection, getAllItemsFromCollection } from "../db-utilitis/mongo-wrapper.js";

const todoRouter = Router();

//create new
todoRouter.post('/todo', async (req, res) => {


    let obj = req.body;
    // saveItemInCollection('todo', obj)
    //     .then(result => {
    //         return res.json({ status: true })
    //     })
    //     .catch(error => {
    //         return res.json({ status: false })
    //     })


    //this is same as the above lines
    try {

        let result = await saveItemInCollection('todo', obj);
        return res.json({ status: true })

    } catch (e) {
        return res.json({ status: false })
    }


})

todoRouter.get('/todo', async (req, res) => {

    //to get all Items from database
    // let result = await getAllItemsFromCollection('todo')
    // return res.json(result)


    //this is same as the above two lines \\\ to get all Items from database
    getAllItemsFromCollection('todo', {})
        .then(result => {
            return res.json(result)
        })
        .catch(error => {
            return res.json([])
        })

})


export default todoRouter;

