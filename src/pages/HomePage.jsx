import ProductCart from "../components/ProductCart";
import Footer from '../components/Footer'
import Subscribe from "../components/Subscribe";
import InstagramWrapper from "../components/InstagramWrapper";
function HomePage() {
    //Todo: page banner,
    //Todo: two image with text(quote etc) above them instagram
    //Todo: links with images, subscribe email form, footer.
    return (
        <div className="flex flex-col  items-center">
            <img className="w-full h-[42rem] object-cover" src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            <div className="w-11/12 mt-36 flex flex-col justify-center gap-8 lg:grid lg:grid-cols-4 ">
                <ProductCart />
                <ProductCart />
                <ProductCart />
                <ProductCart />
            </div>
            <>
                <img className="w-full mt-36 h-[28rem] object-cover" src='https://plus.unsplash.com/premium_photo-1674748732558-ec38737e30ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                <img className="w-full h-[22rem] object-cover" src='https://plus.unsplash.com/premium_photo-1674921631244-66e47b989131?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </>
            <InstagramWrapper />
            <Subscribe />
            <Footer />
        </div>
    )
}

export default HomePage; 