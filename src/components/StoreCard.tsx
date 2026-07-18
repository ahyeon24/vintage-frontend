import { Link } from 'react-router-dom';
import './StoreCard.css';

interface Store {
    id: number;
    name: string;
    address: string;
    priceTier: string;
    styleTags: string[];
}

interface StoreCardProps {
    store: Store;
    rank?: number;
}

const PRICE_TIER_LABEL: Record<string, string> = {
    LOW: '저가',
    MID: '중가',
    HIGH: '고가',
};

function StoreCard({ store, rank }: StoreCardProps) {
    return (
        <Link to={`/stores/${store.id}`} className="store-card">
            {rank !== undefined && <span className="store-card__rank">{rank}</span>}
            <div className="store-card__body">
                <div className="store-card__top">
                    <h3 className="store-card__name">{store.name}</h3>
                    <span className="store-card__price">
                        {PRICE_TIER_LABEL[store.priceTier] ?? store.priceTier}
                    </span>
                </div>
                <p className="store-card__address">ⓘ {store.address}</p>
                {store.styleTags.length > 0 && (
                    <div className="store-card__tags">
                        {store.styleTags.map((tag, i) => (
                            <span key={tag}>
                                {i > 0 && <span className="store-card__tag-dot">·</span>}
                                <span className="store-card__tag">{tag}</span>
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="store-card__thumbnail" />
        </Link>
    );
}

export default StoreCard;
