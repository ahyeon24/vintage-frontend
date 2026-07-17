import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Store {
    id: number;
    name: string;
    address: string;
    priceTier: string;
    openHours: string;
    closedDays: string;
    isUnmanned: boolean;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: string;
}

function StoreDetail() {
    const { id } = useParams();
    const [store, setStore] = useState<Store | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/stores/${id}`)
            .then((response) => response.json())
            .then((data) => setStore(data));

        fetch(`http://localhost:8080/api/stores/${id}/reviews`)
            .then((response) => response.json())
            .then((data) => setReviews(data));
    }, [id]);

    if (!store) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <h1>{store.name}</h1>
            <p>주소: {store.address}</p>
            <p>가격대: {store.priceTier}</p>
            <p>영업시간: {store.openHours}</p>
            <p>휴무일: {store.closedDays}</p>
            <p>무인매장: {store.isUnmanned ? '예' : '아니오'}</p>

            <h2>리뷰 ({reviews.length})</h2>
            {reviews.length === 0 ? (
                <p>아직 리뷰가 없어요.</p>
            ) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            ⭐ {review.rating} - {review.comment}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default StoreDetail;