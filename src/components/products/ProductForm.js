import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */

    const [product, update] = useState({
        description: "",
        productType: "", 
        price: parseFloat().toFixed(2) 
    }) 

    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // console.log("You clicked the button")

        // TODO: Create the object to be saved to the API

        /* 
            {
                "name": "Milk Chocolate Stars",
                "price": 2,
                "typeId": 2,
                "locationId": 3
            } 
        */ 

            const productToSendToAPI = {
                userId: kandyUserObject.id, 
                description: product.description,
                // productType: product.productType,
                price: product.price
                // locationId: ""
            }


        // TODO: Perform the fetch() to POST the object to the API

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(productToSendToAPI)

        })
            .then(response => response.json())
            .then(() => {
                navigate("/products") 
            })

    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of Candy"
                        value={product.description}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productType">Product Type:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of Candy Type"
                        value={product.productType}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.productType = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="$0.00"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.price = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Product
            </button>
        </form>
    )
}