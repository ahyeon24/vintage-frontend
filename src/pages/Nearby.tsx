import { useEffect, useRef, useState } from 'react';
import KakaoMap from '../components/KakaoMap';
import StoreCard from '../components/StoreCard';
import BottomNav from '../components/BottomNav';
import './Nearby.css';

interface Store {
    id: number;
    name: string;
    address: string;
    priceTier: string;
    styleTags: string[];
    latitude: number | null;
    longitude: number | null;
}

function Nearby() {
    const [stores, setStores] = useState<Store[]>([]);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/stores')
            .then((res) => res.json())
            .then((data) => setStores(data));
    }, []);

    const handleMarkerClick = (storeId: number) => {
        const el = document.getElementById(`store-card-${storeId}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('store-card--highlighted');
            setTimeout(() => el.classList.remove('store-card--highlighted'), 1500);
        }
    };

    return (
        <div className="nearby">
            <div className="nearby__map">
                <KakaoMap stores={stores} onMarkerClick={handleMarkerClick} />
            </div>

            <div className="nearby__sheet" ref={listRef}>
                <div className="nearby__sheet-handle" />
                <h2 className="nearby__sheet-title">
                    내 주변 매장
                    <span className="nearby__sheet-count">{stores.length}</span>
                </h2>
                <div className="nearby__list">
                    {stores.map((store) => (
                        <div key={store.id} id={`store-card-${store.id}`}>
                            <StoreCard store={store} />
                        </div>
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}

export default Nearby;
