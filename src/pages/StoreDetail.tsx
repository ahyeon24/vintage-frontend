import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import KakaoMap from '../components/KakaoMap';
import './StoreDetail.css';

interface Store {
    id: number;
    name: string;
    address: string;
    priceTier: string;
    openHours: string;
    closedDays: string;
    isUnmanned: boolean;
    hasCustomRepair: boolean;
    styleTags: string[];
    latitude: number | null;
    longitude: number | null;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: string;
}

const PRICE_TIER_LABEL: Record<string, string> = {
    LOW: '저가',
    MID: '중가',
    HIGH: '고가',
};

function getSaved(): number[] {
    const stored = localStorage.getItem('savedStores');
    return stored ? JSON.parse(stored) : [];
}

function StoreDetail() {
    const { id } = useParams();
    const [store, setStore] = useState<Store | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/api/stores/${id}`)
            .then((res) => res.json())
            .then((data) => setStore(data));

        fetch(`http://localhost:8080/api/stores/${id}/reviews`)
            .then((res) => res.json())
            .then((data) => setReviews(data));

        setIsSaved(getSaved().includes(Number(id)));
    }, [id]);

    const toggleSave = () => {
        const saved = getSaved();
        const numId = Number(id);
        const next = saved.includes(numId)
            ? saved.filter((i) => i !== numId)
            : [...saved, numId];
        localStorage.setItem('savedStores', JSON.stringify(next));
        setIsSaved(!isSaved);
    };

    if (!store) {
        return <div className="store-detail__loading">로딩 중...</div>;
    }

    return (
        <div className="store-detail">
            <div className="store-detail__topbar">
                <Link to="/" className="store-detail__back">← 뒤로</Link>
                <button
                    className={`store-detail__save${isSaved ? ' store-detail__save--active' : ''}`}
                    onClick={toggleSave}
                    aria-label={isSaved ? '저장 취소' : '저장'}
                >
                    {isSaved ? '♥' : '♡'} {isSaved ? '저장됨' : '저장'}
                </button>
            </div>

            <div className="store-detail__thumbnail" />

            <div className="store-detail__content">
                <div className="store-detail__header">
                    <div>
                        <h1 className="store-detail__name">{store.name}</h1>
                        <p className="store-detail__address">{store.address}</p>
                    </div>
                    <span className="store-detail__price">
                        {PRICE_TIER_LABEL[store.priceTier] ?? store.priceTier}
                    </span>
                </div>

                {store.styleTags && store.styleTags.length > 0 && (
                    <div className="store-detail__tags">
                        {store.styleTags.map((tag) => (
                            <span key={tag} className="store-detail__tag">{tag}</span>
                        ))}
                    </div>
                )}

                <div className="store-detail__badges">
                    {store.isUnmanned && (
                        <span className="store-detail__badge store-detail__badge--unmanned">무인매장</span>
                    )}
                    {store.hasCustomRepair && (
                        <span className="store-detail__badge store-detail__badge--repair">수선 가능</span>
                    )}
                </div>

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
                        <div className="store-detail__info-item">
                            <span className="store-detail__info-label">운영 방식</span>
                            <span className="store-detail__info-value">셀프 결제</span>
                        </div>
                    )}
                </div>

                <div className="store-detail__map">
                    <KakaoMap
                        stores={[{
                            id: store.id,
                            name: store.name,
                            address: store.address,
                            latitude: store.latitude,
                            longitude: store.longitude,
                        }]}
                        level={3}
                    />
                </div>

                <div className="store-detail__reviews">
                    <h2 className="store-detail__reviews-title">리뷰 {reviews.length}</h2>

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
        </div>
    );
}

export default StoreDetail;
