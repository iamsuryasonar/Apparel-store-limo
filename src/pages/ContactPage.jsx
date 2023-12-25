function ContactPage() {
    return (
        <>
            <div className="w-screen flex flex-col justify-center items-center">
                <div className="w-full h-[8rem] bg-red-50 flex justify-center items-center font-bold">CONTACT</div>
                <div className="w-5/6 h-[8rem] md:h-[20rem] my-10 flex flex-col justify-start md:flex-row md:justify-between md:items-center  gap-6">
                    <div className="flex flex-col justify-center items-start ">
                        <p className="font-light">EMAIL US</p>
                        <p className="font-bold"> customercare@limostore.in</p>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <p className="font-light">REACH US</p>
                        <p className="font-bold">LIMO STORE</p>
                        <p>NOONMATI, GANESH MANDIR PATH</p>
                        <p>GUWAHATI, ASSAM - 781002, INDIA</p>
                    </div>
                </div>
                <div className="w-5/6 md:h-[8rem] my-10 flex flex-col justify-start md:flex-row md:justify-between md:items-center  gap-6">
                    <div className="flex flex-col justify-center items-start ">
                        <p className="font-light">WHATSAPP US</p>
                        <p className="font-bold">+91-99999-99999</p>
                    </div>
                </div>
                <div className="w-5/6 my-10 flex flex-col items-center gap-6">
                    <form className="w-11/12 md:w-4/6 flex flex-col gap-6 font-light ">
                        <input type="text" placeholder='Full Name' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                        <input type="text" placeholder='Email' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></input>
                        <textarea type="text" placeholder='Message' className="p-1 border-[1px] rounded-sm border-black w-full placeholder:p-2 "></textarea>
                        <div className="flex flex-col justify-start">
                            <p className="py-2">Optional</p>
                            <label>Select an option</label>
                            <select className="border-[1px] rounded-sm border-black font-light p-1 bg-white">
                                <option className="font-light">Business Inquiry</option>
                                <option className="font-light">General Inquiry</option>
                                <option className="font-light">Bulk Orders</option>
                                <option className="font-light">Order Tracking</option>
                                <option className="font-light">Returns and Refunds</option>
                                <option className="font-light">Feedback</option>
                            </select>
                        </div>
                        <button className="py-2 bg-black text-white font-bold">SEND</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default ContactPage;