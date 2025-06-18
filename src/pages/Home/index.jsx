import { useEffect, useState } from 'react';
import MenuCategory from '~/components/MenuCategory';
import MenuProduct from '~/components/MenuProduct';
import { updatedProducts } from '~/components/MenuProduct/Constains';
import MenuProductRecommender from '~/components/MenuProductRecommender';
import SliderImg from '~/components/SliderImg';
import { useStorage } from '~/Contexts';
import { GetRecommenedByUserId } from '~/services/Product';

function Home() {
    const { userData } = useStorage();

    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const resRecommendedProducts = await GetRecommenedByUserId({ UserId: userData?.id });
                setAllProducts(updatedProducts(resRecommendedProducts));
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [userData?.id]);
    return (
        <div className="max-w-[1100px] mx-auto px-2 sm:px-4 md:px-8 lg:px-8">
            <SliderImg />
            <MenuCategory />
            <MenuProductRecommender
                title="Sản phẩm đáng chú ý"
                loading={loading}
                allProducts={allProducts}
                setAllProducts={setAllProducts}
            />
            <MenuProduct title={'Sản phẩm mới nhất'} />
        </div>
    );
}

export default Home;
