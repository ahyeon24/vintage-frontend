import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import StoreCard from '../components/StoreCard';
import BottomNav from '../components/BottomNav';
import './Home.css';

interface Store {
    id: number;
    name: string;
    address: string;
    priceTier: string;
    styleTags: string[];
}

const POPULAR_TAGS = ['유러피안', '일본빈티지', 'Y2K', '밀리터리', '데님'];

function Home() {
    const [stores, setStores] = useState<Store[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/stores')
            .then((res) => res.json())
            .then((data) => setStores(data));
    }, []);

    const featured = stores[0] ?? null;

    const filteredStores = useMemo(() => {
        return stores.filter((store) => {
            const matchesSearch =
                searchTerm.trim() === '' ||
                store.name.includes(searchTerm) ||
                store.address.includes(searchTerm);
            const matchesTag =
                selectedTag === null || store.styleTags.includes(selectedTag);
            return matchesSearch && matchesTag;
        });
    }, [stores, searchTerm, selectedTag]);

    const rankingStores = useMemo(() => stores.slice(0, 3), [stores]);

    const handleTagClick = (tag: string) => {
        setSelectedTag((prev) => (prev === tag ? null : tag));
    };

    return (
        <div className="home">
            <h1 className="home__greeting">
                아현님, 오늘은<br />어떤 골목을 발견해볼까요?
            </h1>

            <input
                className="home__search"
                type="text"
                placeholder="동네나 지역을 검색해보세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="home__tags">
                {POPULAR_TAGS.map((tag) => (
                    <button
                        key={tag}
                        className={`home__tag${selectedTag === tag ? ' home__tag--active' : ''}`}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {featured && !searchTerm && !selectedTag && (
                <section className="home__section">
                    <h2 className="home__section-title">이주의 발견</h2>
                    <Link to={`/stores/${featured.id}`} className="home__hero">
                        <div className="home__hero-thumbnail" />
                        <div className="home__hero-body">
                            <p className="home__hero-eyebrow">간판도 없이, 골목 안쪽에서</p>
                            <p className="home__hero-name">{featured.name}</p>
                            <p className="home__hero-desc">
                                아는 사람만 찾아오는 행궁동 골목의 숨은 빈티지 창고.
                                입소문으로만 퍼진 이곳을 소개합니다.
                            </p>
                            <span className="home__hero-cta">발견하기 →</span>
                        </div>
                    </Link>
                </section>
            )}

            <section className="home__section">
                <h2 className="home__section-title">새로 발견된 매장</h2>
                {filteredStores.length === 0 ? (
                    <p className="home__empty">조건에 맞는 매장이 없어요.</p>
                ) : (
                    <div className="home__list">
                        {filteredStores.map((store) => (
                            <StoreCard key={store.id} store={store} />
                        ))}
                    </div>
                )}
            </section>

            {rankingStores.length > 0 && !searchTerm && !selectedTag && (
                <section className="home__section">
                    <h2 className="home__section-title">이번 주 많이 저장된 매장</h2>
                    <div className="home__list">
                        {rankingStores.map((store, i) => (
                            <StoreCard key={store.id} store={store} rank={i + 1} />
                        ))}
                    </div>
                </section>
            )}

            <BottomNav />
        </div>
    );
}

export default Home;
