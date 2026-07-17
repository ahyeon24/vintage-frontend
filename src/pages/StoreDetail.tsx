import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './StoreDetail.css';

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

const priceTierLabel: Record<string, string> = {
    LOW: '저가',
    MID: '중가',
    HIGH: '고가',
};

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
        return <div className="store-detail__loading">로딩 중...</div>;
    }

    return (
        <div className="store-detail">
            <Link to="/" className="store-detail__back">← 목록으로</Link>

            <div className="store-detail__card">
                <div className="store-detail__thumbnail" />

                <div className="store-detail__header">
                    <h1 className="store-detail__name">{store.name}</h1>
                    <span className={`store-detail__price store-detail__price--${store.priceTier.toLowerCase()}`}>
              {priceTierLabel[store.priceTier] ?? store.priceTier}
            </span>
                </div>

                <p className="store-detail__address">{store.address}</p>

                <div className="store-detail__info-grid">
                    <div className="store-detail__info-item">
                        <span className="store-detail__info-label">영업시간</span>
                        <span className="store-detail__info-value">{store.openHours || '정보 없음'}</span>
                    </div>
                    <div className="store-detail__info-item">
                        <span className="store-detail__info-label">휴무일</span>
                        <span className="store-detail__info-value">{store.closedDays || '정보 없음'}</span>
                    </div>
                    {store.isUnmanned && (
                        <div className="store-detail__badge">무인 매장</div>
                    )}
                </div>
            </div>

            <div className="store-detail__reviews">
                <h2 className="store-detail__reviews-title">리뷰 ({reviews.length})</h2>

                {reviews.length === 0 ? (
                    <p className="store-detail__reviews-empty">아직 리뷰가 없어요.</p>
                ) : (
                    <ul className="store-detail__review-list">
                        {reviews.map((review) => (
                            <li key={review.id} className="store-detail__review-item">
                                <div className="store-detail__review-rating">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                                <p className="store-detail__review-comment">{review.comment}</p>
                                <span className="store-detail__review-date">
                        {review.createdAt.slice(0, 10)}
                      </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default StoreDetail;