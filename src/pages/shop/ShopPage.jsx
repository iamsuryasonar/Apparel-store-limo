import CategoryComponent from './components/CategoryComponent'
import ProductPage from '../ProductPage'
function ShopPage() {
    let categoryName = 'co-ords';
    return (
        <div>
            <CategoryComponent categoryName={categoryName} />
            {/* <ProductPage /> */}
        </div>
    )
}

export default ShopPage