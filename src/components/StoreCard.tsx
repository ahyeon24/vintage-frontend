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

const TAG_COLORS: Record<string, string> = {
    '유러피안': '#8B7355',
    '일본빈티지': '#C4863A',
    'Y2K': '#C4608A',
    '밀리터리': '#6B7C52',
    '데님': '#4A6FA5',
    '혼합': '#9c4a2e',
};

const PRICE_TIER_LABEL: Record<string, string> = {
    LOW: '저가',
    MID: '중가',
    HIGH: '고가',
};

function getTagColor(tags: string[]): string {
    for (const tag of tags) {
        if (TAG_COLORS[tag]) return TAG_COLORS[tag];
    }
    return '#9c4a2e';
}

function StoreCard({ store, rank }: StoreCardProps) {
    const stripeColor = getTagColor(store.styleTags);

    return (
        <Link
            to={`/stores/${store.id}`}
            className="store-card"
            style={{ borderLeftColor: stripeColor }}
        >
            {rank !== undefined && (
                <span className="store-card__rank" style={{ color: stripeColor }}>
                    {rank}
                </span>
            )}
            <div className="store-card__thumbnail" />
            <div className="store-card__info">
                <h3 className="store-card__name">{store.name}</h3>
                <p className="store-card__address">{store.address}</p>
                {store.styleTags.length > 0 && (
                    <div className="store-card__tags">
                        {store.styleTags.map((tag, i) => (
                            <span key={tag} style={{ color: TAG_COLORS[tag] ?? '#9c4a2e' }}>
                                {i > 0 && ' · '}
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <span className="store-card__price">
                    {PRICE_TIER_LABEL[store.priceTier] ?? store.priceTier}
                </span>
            </div>
        </Link>
    );
}

export default StoreCard;
