import React, { createContext, useContext, useState, useEffect } from 'react';

const DecisionContext = createContext();

export const useDecisions = () => {
    const context = useContext(DecisionContext);
    return context;
};

export const DecisionProvider = ({ children }) => {
    // 모든 사용자의 의사결정을 하나의 배열로 관리
    const [decisions, setDecisions] = useState(() => {
        const savedDecisions = localStorage.getItem('all_decisions');
        return savedDecisions ? JSON.parse(savedDecisions) : [];
    });

    // 의사결정 데이터 저장
    useEffect(() => {
        localStorage.setItem('all_decisions', JSON.stringify(decisions));
    }, [decisions]);

    // 의사결정 생성 (로그인 필요)
    const addDecision = (decisionData, userId, userName) => {
        const newDecision = {
            id: Date.now(),
            userId: userId, // 작성자 ID
            userName: userName, // 작성자 이름
            title: decisionData.title,
            decisionDate: new Date().toISOString(),
            type: decisionData.type,
            situation: decisionData.situation,
            options: decisionData.options,
            finalChoice: decisionData.finalChoice,
            criteria: decisionData.criteria,
            retrospective: null,
            createdAt: new Date().toISOString(),
        };

        setDecisions(prev => [newDecision, ...prev]);
        return newDecision;
    };

    // 의사결정 삭제 (본인만 가능)
    const deleteDecision = (id, userId) => {
        const decision = decisions.find(d => d.id === id);
        if (decision && decision.userId === userId) {
            setDecisions(prev => prev.filter(decision => decision.id !== id));
            return true;
        }
        return false;
    };

    // 의사결정 수정 (본인만 가능)
    const updateDecision = (id, updateData, userId) => {
        const decision = decisions.find(d => d.id === id);
        if (decision && decision.userId === userId) {
            setDecisions(prev =>
                prev.map(decision =>
                    decision.id === id ? { ...decision, ...updateData } : decision
                )
            );
            return true;
        }
        return false;
    };

    // 회고 추가/수정 (본인만 가능)
    const addRetrospective = (id, retrospectiveData, userId) => {
        const decision = decisions.find(d => d.id === id);
        if (decision && decision.userId === userId) {
            setDecisions(prev =>
                prev.map(decision =>
                    decision.id === id
                        ? {
                            ...decision,
                            retrospective: {
                                actualResult: retrospectiveData.actualResult,
                                wasCorrect: retrospectiveData.wasCorrect,
                                improvements: retrospectiveData.improvements,
                                updatedAt: new Date().toISOString(),
                            }
                        }
                        : decision
                )
            );
            return true;
        }
        return false;
    };

    // ID로 의사결정 찾기 (모든 사용자 접근 가능)
    const getDecisionById = (id) => {
        return decisions.find(decision => decision.id === parseInt(id));
    };

    // 특정 사용자의 의사결정만 가져오기
    const getUserDecisions = (userId) => {
        return decisions.filter(d => d.userId === userId);
    };

    // 전체 통계 가져오기
    const getStats = () => {
        const total = decisions.length;
        const personal = decisions.filter(d => d.type === '개인').length;
        const team = decisions.filter(d => d.type === '팀').length;
        const withRetrospective = decisions.filter(d => d.retrospective !== null).length;

        return { total, personal, team, withRetrospective };
    };

    // 특정 사용자의 통계 가져오기
    const getUserStats = (userId) => {
        const userDecisions = decisions.filter(d => d.userId === userId);
        const total = userDecisions.length;
        const personal = userDecisions.filter(d => d.type === '개인').length;
        const team = userDecisions.filter(d => d.type === '팀').length;
        const withRetrospective = userDecisions.filter(d => d.retrospective !== null).length;

        return { total, personal, team, withRetrospective };
    };

    // 작성자 확인
    const isOwner = (decisionId, userId) => {
        const decision = decisions.find(d => d.id === decisionId);
        return decision && decision.userId === userId;
    };

    const value = {
        decisions,
        addDecision,
        deleteDecision,
        updateDecision,
        addRetrospective,
        getDecisionById,
        getUserDecisions,
        getStats,
        getUserStats,
        isOwner,
    };

    return (
        <DecisionContext.Provider value={value}>
            {children}
        </DecisionContext.Provider>
    );
};