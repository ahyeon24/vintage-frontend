import { useEffect, useState } from 'react';
import StoreCard from '../components/StoreCard';
import './StoreList.css';

interface Store {
    id: number;
    name: string;
    address: string;
    priceTier: string;
    styleTags: string[];
}

function StoreList() {
    const [stores, setStores] = useState<Store[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/stores')
            .then((response) => response.json())
            .then((data) => setStores(data));
    }, []);

    return (
        <div className="store-list">
            <h1 className="store-list__title">내주변 매장</h1>
            <div className="store-list__grid">
                {stores.map((store) => (
                    <StoreCard key={store.id} store={store} />
                ))}
            </div>
        </div>
    );
}

export default StoreList;