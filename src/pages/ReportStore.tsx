import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportStore.css';

const STYLE_TAGS = ['유러피안', '일본빈티지', 'Y2K', '밀리터리', '데님', '럭셔리빈티지', '스트릿빈티지', '혼합·다양'];
const PRICE_TIERS = [
    { value: 'LOW', label: '저가 (~3만원)' },
    { value: 'MID', label: '중가 (3~7만원)' },
    { value: 'HIGH', label: '고가 (7만원~)' },
];

function ReportStore() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        address: '',
        locationHint: '',
        priceTier: '',
        openHours: '',
        closedDays: '',
        isUnmanned: false,
        reporterMemo: '',
    });
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('http://localhost:8080/api/reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    priceTier: form.priceTier || null,
                    styleTags: selectedTags,
                }),
            });

            if (!res.ok) throw new Error();
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="report-success">
                <span className="report-success__icon">✓</span>
                <h2 className="report-success__title">제보해주셔서 감사해요!</h2>
                <p className="report-success__desc">검토 후 골목옷장에 등록할게요.</p>
                <button className="report-success__btn" onClick={() => navigate('/')}>
                    홈으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="report">
            <div className="report__topbar">
                <button className="report__back" onClick={() => navigate(-1)}>← 뒤로</button>
                <h1 className="report__title">매장 제보</h1>
            </div>

            <p className="report__desc">
                아직 지도에 없는 골목 빈티지샵을 알고 계신가요?<br />
                알려주시면 직접 확인 후 등록해드릴게요.
            </p>

            <form className="report__form" onSubmit={handleSubmit}>
                <div className="report__field">
                    <label className="report__label">매장 이름 <span className="report__required">*</span></label>
                    <input
                        className="report__input"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="예: 문지문 빈티지"
                        required
                    />
                </div>

                <div className="report__field">
                    <label className="report__label">주소 <span className="report__required">*</span></label>
                    <input
                        className="report__input"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="예: 수원시 팔달구 행궁로 32"
                        required
                    />
                </div>

                <div className="report__field">
                    <label className="report__label">위치 힌트</label>
                    <input
                        className="report__input"
                        name="locationHint"
                        value={form.locationHint}
                        onChange={handleChange}
                        placeholder="예: 벽화마을 골목 안쪽, 간판 없음"
                    />
                </div>

                <div className="report__field">
                    <label className="report__label">스타일 태그</label>
                    <div className="report__tags">
                        {STYLE_TAGS.map(tag => (
                            <button
                                key={tag}
                                type="button"
                                className={`report__tag${selectedTags.includes(tag) ? ' report__tag--active' : ''}`}
                                onClick={() => toggleTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="report__field">
                    <label className="report__label">가격대</label>
                    <div className="report__radio-group">
                        {PRICE_TIERS.map(tier => (
                            <label key={tier.value} className="report__radio-label">
                                <input
                                    type="radio"
                                    name="priceTier"
                                    value={tier.value}
                                    checked={form.priceTier === tier.value}
                                    onChange={handleChange}
                                />
                                {tier.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="report__field-row">
                    <div className="report__field">
                        <label className="report__label">영업시간</label>
                        <input
                            className="report__input"
                            name="openHours"
                            value={form.openHours}
                            onChange={handleChange}
                            placeholder="예: 13:00 - 20:00"
                        />
                    </div>
                    <div className="report__field">
                        <label className="report__label">휴무일</label>
                        <input
                            className="report__input"
                            name="closedDays"
                            value={form.closedDays}
                            onChange={handleChange}
                            placeholder="예: 월요일"
                        />
                    </div>
                </div>

                <div className="report__field">
                    <label className="report__checkbox-label">
                        <input
                            type="checkbox"
                            name="isUnmanned"
                            checked={form.isUnmanned}
                            onChange={handleChange}
                        />
                        무인 매장이에요
                    </label>
                </div>

                <div className="report__field">
                    <label className="report__label">제보 메모</label>
                    <textarea
                        className="report__textarea"
                        name="reporterMemo"
                        value={form.reporterMemo}
                        onChange={handleChange}
                        placeholder="추가로 알려주실 내용이 있으면 적어주세요."
                        rows={3}
                    />
                </div>

                {status === 'error' && (
                    <p className="report__error">제보 중 오류가 발생했어요. 다시 시도해주세요.</p>
                )}

                <button
                    className="report__submit"
                    type="submit"
                    disabled={status === 'loading'}
                >
                    {status === 'loading' ? '제보 중...' : '제보하기'}
                </button>
            </form>
        </div>
    );
}

export default ReportStore;
