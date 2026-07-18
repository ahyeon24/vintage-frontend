import { useEffect, useState } from 'react';
import StoreCard from '../components/StoreCard';
import BottomNav from '../components/BottomNav';
import './Saved.css';

interface Store {
    id: number;
    name: string;
    address: string;
    priceTier: string;
    styleTags: string[];
}

function Saved() {
    const [stores, setStores] = useState<Store[]>([]);
    const [savedStores, setSavedStores] = useState<Store[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/stores')
            .then((res) => res.json())
            .then((data: Store[]) => {
                setStores(data);
                const saved: number[] = JSON.parse(localStorage.getItem('savedStores') ?? '[]');
                setSavedStores(data.filter((s) => saved.includes(s.id)));
            });
    }, []);

    void stores;

    return (
        <div className="saved">
            <h1 className="saved__title">저장한 매장</h1>

            {savedStores.length === 0 ? (
                <div className="saved__empty">
                    <span className="saved__empty-icon">♡</span>
                    <p className="saved__empty-text">아직 저장한 매장이 없어요.</p>
                    <p className="saved__empty-sub">마음에 드는 매장을 저장해보세요.</p>
                </div>
            ) : (
                <div className="saved__list">
                    {savedStores.map((store) => (
                        <StoreCard key={store.id} store={store} />
                    ))}
                </div>
            )}

            <BottomNav />
        </div>
    );
}

export default Saved;
