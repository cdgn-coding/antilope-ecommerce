import React from 'react';
import Layout from '@components/Layout';
import styles from './Explore.module.css';
import useProducts from '@hooks/useProducts';
import ProductCard from '@components/ProductCard';
import Link from '@components/Link';
import Pagination from '@components/Pagination';
import { Product } from '@models/Product';

const renderCard = (product: Product) => (
    <Link key={Math.random()} href={`/products/${product.sku}`}>
        <div className={styles.product}>
            <ProductCard {...product} />
        </div>
    </Link>
);

const Explore = () => {
    const {
        data,
        totalPages,
        page,
        loading,
        onSearch,
        onNext,
        onPrevious,
        onSelectCategory,
    } = useProducts();
    return (
        <Layout
            withSecondaryMenu
            onSearch={onSearch}
            loading={loading}
            withoutCategoryLinks
            onSelectCategory={onSelectCategory}
        >
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.productList}>
                        {data?.map(renderCard)}
                    </div>
                </div>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onNext={onNext}
                    onPrevious={onPrevious}
                />
            </div>
        </Layout>
    )
}

export default Explore;