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
}

const priceTierLabel: Record<string, string> = {
    LOW: '저가',
    MID: '중가',
    HIGH: '고가',
};

function StoreCard({ store }: StoreCardProps) {
    return (
        <Link to={`/stores/${store.id}`} className="store-card">
            <div className="store-card__thumbnail" />
            <div className="store-card__info">
                <h3 className="store-card__name">{store.name}</h3>
                <p className="store-card__address">{store.address}</p>
                {store.styleTags.length > 0 && (
                    <div className="store-card__tags">
                        {store.styleTags.map((tag, index) => (
                            <span key={tag}>
                                {index > 0 && ' · '}
                                <span className="store-card__tag">{tag}</span>
                            </span>
                        ))}
                    </div>
                )}
                <span className={`store-card__price store-card__price--${store.priceTier.toLowerCase()}`}>
                    {priceTierLabel[store.priceTier] ?? store.priceTier}
                </span>
            </div>
        </Link>
    );
}

export default StoreCard;