import { useEffect, useState } from "react"
import "./Products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [topPriced, setTopPriced] = useState([false])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect( 
        () => {

            if (topPriced) {
                const topPricedProducts = products.filter(product => product.price > 2)
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

        <button
            onClick={
                () => {
                    setTopPriced(true)
                }
            }
        >Top Priced</button>

        <h2>List of Products</h2>

        <article className="products">
            {
                products.map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`}>
                            <header>{product.name}</header>
                            <footer>${product.price}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}