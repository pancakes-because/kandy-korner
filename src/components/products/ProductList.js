import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [topPriced, setTopPriced] = useState([false])

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect( 
        () => {

            if (topPriced) {
                const topPricedProducts = products.filter(product => product.price > 2.00)
                setProducts(topPricedProducts)
            } 
        },
        [topPriced]
    )


    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(response => response.json())
                .then((productArray) => {
                    setProducts(productArray)
                })
        },
        []
    )

    

    return <>

        { 
            kandyUserObject.staff 
                ? <>
                    <button onClick={ () => { setTopPriced(true) } } >Top Priced</button>
                    <button onClick={() => navigate("/product/create")}>Create Product</button>
                </>
                : ""
        } 


         {/* { 
            kandyUserObject.staff 
                ? <button onClick={ () => { setTopPriced(true) } } >Top Priced</button>
                : "" 
        }  */}

        {/* {    
            kandyUserObject.staff 
                ? <>
                    <button onClick={ () => { setTopPriced(true) } } >Top Priced</button>
                    <button onClick={ () => { setTopPriced(false) } } >Show All</button>
                </>
                : "" 
        }  */}

        {/* <button
            onClick={
                () => {
                    setTopPriced(true)
                }
            }
        >Top Priced</button> */}

        <h2>List of Products</h2>

        <article className="products">
            {
                products.map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`}>
                            <header>{product.name}</header>
                            <footer>${parseFloat(product.price).toFixed(2)}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}

/* praseFloat() reads the numbers after the decimal */ 
/* .toFixed() determine how many numbers after the decimial show; .toFixed(2) means format a number to two decimals places */ 