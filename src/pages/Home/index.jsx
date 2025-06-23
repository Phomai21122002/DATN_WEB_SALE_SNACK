import { useEffect, useState } from 'react';
import MenuCategory from '~/components/MenuCategory';
import MenuProduct from '~/components/MenuProduct';
import { updatedProducts } from '~/components/MenuProduct/Constains';
import MenuProductRecommender from '~/components/MenuProductRecommender';
import SliderImg from '~/components/SliderImg';
import { useStorage } from '~/Contexts';
import { GetRecommenedByUser, GetRecommenedByUserId } from '~/services/Product';

function Home() {
    const { userData, refRecommender, refNewest, refAllProduct } = useStorage();

    const [allProducts, setAllProducts] = useState([]);
    const [allProductHots, setAllProductHots] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                if (userData && Object.keys(userData).length > 0) {
                    const resRecommendedProducts = await GetRecommenedByUserId({ UserId: userData?.id });
                    setAllProducts(updatedProducts(resRecommendedProducts));
                    const resRecommendedProductsUser = await GetRecommenedByUser({ UserId: userData?.id });
                    setAllProductHots(updatedProducts(resRecommendedProductsUser));
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [userData]);

    return (
        <div className="max-w-[1100px] mx-auto px-2 sm:px-4 md:px-8 lg:px-8">
            <SliderImg />
            <MenuCategory />
            {userData && Object.keys(userData).length > 0 && (
                <>
                    <div ref={refRecommender} style={{ scrollMarginTop: '80px' }}>
                        <MenuProductRecommender
                            title="Sản phẩm đáng chú ý"
                            loading={loading}
                            allProducts={allProducts}
                            setAllProducts={setAllProducts}
                        />
                    </div>
                    <div ref={refNewest} style={{ scrollMarginTop: '80px' }}>
                        <MenuProductRecommender
                            title={'Sản phẩm hot nhất'}
                            loading={loading}
                            allProducts={allProductHots}
                            setAllProducts={setAllProductHots}
                        />
                    </div>
                </>
            )}
            <div ref={refAllProduct} style={{ scrollMarginTop: '80px' }}>
                <MenuProduct title={'Tất cả các sản phẩm'} />
            </div>
        </div>
    );
}

export default Home;
