import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Store {
    id: number;
    name: string;
    address: string;
    priceTier: string;
}

function StoreList() {
    const [stores, setStores] = useState<Store[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/stores')
            .then((response) => response.json())
            .then((data) => setStores(data));
    }, []);

    return (
        <div>
            <h1>내주변 매장</h1>
            <ul>
                {stores.map((store) => (
                    <li key={store.id}>
                        <Link to={`/stores/${store.id}`}>
                            {store.name} - {store.address} ({store.priceTier})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StoreList;