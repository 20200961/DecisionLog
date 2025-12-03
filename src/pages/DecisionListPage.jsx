import React, { useState } from 'react';
import styled from 'styled-components';
import { useDecisions } from '../context/DecisionContext';
import DecisionForm from '../components/Decision/DecisionForm';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routePaths';

const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: 42px;
    font-weight: bold;
    margin-bottom: 24px;
    color: #333;
`;

const Stats = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
`;

const StatCard = styled.div`
    background: white;
    padding: 16px 24px;
    border-radius: 8px;
    flex: 1;
    min-width: 150px;
`;

const StatNumber = styled.div`
    font-size: 28px;
    font-weight: bold;
    color: #5833ffff;
    margin-bottom: 4px;
`;

const StatLabel = styled.div`
    font-size: 14px;
    color: #666;
`;

const ToggleButton = styled.button`
    padding: 12px 24px;
    border: none;
    background: #5833ffff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 24px;

    &:hover {
        scale: 0.98;
    }
`;

const DecisionList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const DecisionCard = styled(Link)`
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;
    border: 2px solid transparent;

    &:hover {
        border-color: #5833ffff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(88, 51, 255, 0.1);
    }
`;

const DecisionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 12px;
`;

const DecisionTitle = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
`;

const DecisionType = styled.span`
    background: ${props => props.type === '팀' ? '#5833ffff' : '#24854cff'};
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
`;

const DecisionDate = styled.div`
    font-size: 14px;
    color: #999;
    margin-bottom: 12px;
`;

const DecisionSituation = styled.p`
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const DecisionFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
`;

const FinalChoice = styled.div`
    font-size: 14px;
    color: #5833ffff;
    font-weight: 600;
`;

const RetrospectiveBadge = styled.span`
    background: ${props => props.$hasRetrospective ? '#10b981' : '#e2e2e2'};
    color: ${props => props.$hasRetrospective ? 'white' : '#666'};
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
`;

const EmptyMessage = styled.div`
    text-align: center;
    padding: 48px;
    color: #999;
    font-size: 16px;
`;

const DecisionListPage = () => {
    const { decisions, addDecision, getStats } = useDecisions();
    const [showForm, setShowForm] = useState(false);
    const stats = getStats();

    const handleAddDecision = (decisionData) => {
        addDecision(decisionData);
        setShowForm(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Container>
            <Title>의사결정 로그</Title>

            <Stats>
                <StatCard>
                    <StatNumber>{stats.total}</StatNumber>
                    <StatLabel>전체 결정</StatLabel>
                </StatCard>
                <StatCard>
                    <StatNumber>{stats.personal}</StatNumber>
                    <StatLabel>개인 결정</StatLabel>
                </StatCard>
                <StatCard>
                    <StatNumber>{stats.team}</StatNumber>
                    <StatLabel>팀 결정</StatLabel>
                </StatCard>
                <StatCard>
                    <StatNumber>{stats.withRetrospective}</StatNumber>
                    <StatLabel>회고 완료</StatLabel>
                </StatCard>
            </Stats>

            <ToggleButton onClick={() => setShowForm(!showForm)}>
                {showForm ? '취소' : '+ 새 결정 기록'}
            </ToggleButton>

            {showForm && (
                <DecisionForm
                    onSubmit={handleAddDecision}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <DecisionList>
                {decisions.length === 0 ? (
                    <EmptyMessage>
                        아직 기록된 의사결정이 없습니다.<br />
                        첫 번째 결정을 기록해보세요!
                    </EmptyMessage>
                ) : (
                    decisions.map(decision => (
                        <DecisionCard key={decision.id} to={ROUTES.DECISION_DETAIL(decision.id)}>
                            <DecisionHeader>
                                <div>
                                    <DecisionTitle>{decision.title}</DecisionTitle>
                                    <DecisionDate>{formatDate(decision.decisionDate)}</DecisionDate>
                                </div>
                                <DecisionType type={decision.type}>{decision.type}</DecisionType>
                            </DecisionHeader>

                            <DecisionSituation>{decision.situation}</DecisionSituation>

                            <DecisionFooter>
                                <FinalChoice>
                                    최종 선택: {decision.finalChoice || '미정'}
                                </FinalChoice>
                                <RetrospectiveBadge $hasRetrospective={decision.retrospective !== null}>
                                    {decision.retrospective ? '회고 완료' : '회고 대기'}
                                </RetrospectiveBadge>
                            </DecisionFooter>
                        </DecisionCard>
                    ))
                )}
            </DecisionList>
        </Container>
    );
};

export default DecisionListPage;