import  {useState, useEffect} from 'react';

interface Product {
    category: string;

}

interface FetchResponses {
    products: Product[];
}

const SideBar = () => {

    const [categories, setCategories] = useState<string[]>([]);   
    // example keywords. TODO replace this with your own data
    const [keywords ] = useState<string[]>([
        "Computer Vision",
        "Computer Graphics",
        "Computer Architecture",
        "Computer Networks",
        "Computer Security",
        "Computer Science",
        "Software Engineering"
    ]);

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await fetch('https://dummyjson.com/products');
                const data: FetchResponses  = await response.json();
                const uniqueCategories = Array.from(new Set(data.products.map((product) => product.category)));
                setCategories(uniqueCategories);
            }catch (error) {
                console.error("Error fetching categories:", error);
            }
        };


        fetchCategories();
    }, []);

    return <div className = "w-64 p-5 h-sreen">
        <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

        <section>
            <input type="text" className="border-2 rounded px-2 sm:mb-0" placeholder="Search Product" />

            <div className="flex justify-center itemes-center pt-2 mb-2">
                <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full h-[16px]" placeholder='Min'/>
                <input type="text" className="border-2 mr-2 px-5 py-3 mb-3 w-full h-[16px]" placeholder='Max'/>
            </div>

            <div className='mb-5'>
                <h2 className="text-xl font-semibold mb-3">Categories</h2>
            </div>

            
            <section>
                {categories.map((category, index) => (
                    <label key = {index} className='block mb-2'>
                        <input type="radio" name="category" value={category} className="mr-2 w-[16px] h-[16px]"/>
                        {category.toUpperCase()}
                    </label>
                ))}
            </section>

            <div className="mb-5">
                <h2 className="text-xl font-semibold mb-3">Keywords</h2>
                <div>
                    {keywords.map((keyword, index) => (
                        <button key={index} className='block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200'>
                            <input type="checkbox" name="keyword" value={keyword} className="mr-2 w-[16px] h-[16px]"/>
                            {keyword.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            <button className = "w-full bg-black text-white py-2 rounded hover:bg-gray-700 transition duration-500 ease-in-out"> Reset Filters</button>
        </section>
    </div>
}

export default SideBar;