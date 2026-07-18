import { useEffect, useState } from 'react';
import StoreCard from '../components/StoreCard';
import BottomNav from '../components/BottomNav';
import './Nearby.css';

interface Store {
    id: number;
    name: string;
    address: string;
    priceTier: string;
    styleTags: string[];
}

function Nearby() {
    const [stores, setStores] = useState<Store[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/stores')
            .then((res) => res.json())
            .then((data) => setStores(data));
    }, []);

    return (
        <div className="nearby">
            <div className="nearby__map">
                <div className="nearby__map-grid" />
                <div className="nearby__map-center">
                    <div className="nearby__map-pin">◎</div>
                    <p className="nearby__map-label">행궁동 중심</p>
                </div>
                <span className="nearby__map-badge">지도 SDK 연동 예정</span>
            </div>

            <div className="nearby__sheet">
                <div className="nearby__sheet-handle" />
                <h2 className="nearby__sheet-title">
                    내 주변 매장
                    <span className="nearby__sheet-count">{stores.length}</span>
                </h2>
                <div className="nearby__list">
                    {stores.map((store) => (
                        <StoreCard key={store.id} store={store} />
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}

export default Nearby;
