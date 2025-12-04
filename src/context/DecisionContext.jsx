import React, { createContext, useContext, useState, useEffect } from 'react';

const DecisionContext = createContext();

export const useDecisions = () => {
    const context = useContext(DecisionContext);
    return context;
};

export const DecisionProvider = ({ children }) => {
    const [decisions, setDecisions] = useState(() => {
        const savedDecisions = localStorage.getItem('all_decisions');
        return savedDecisions ? JSON.parse(savedDecisions) : [];
    });

    useEffect(() => {
        localStorage.setItem('all_decisions', JSON.stringify(decisions));
    }, [decisions]);

    const addDecision = (decisionData, userId, userName) => {
        const newDecision = {
            id: Date.now(),
            userId: userId, 
            userName: userName, 
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

    const deleteDecision = (id, userId) => {
        const decision = decisions.find(d => d.id === id);
        if (decision && decision.userId === userId) {
            setDecisions(prev => prev.filter(decision => decision.id !== id));
            return true;
        }
        return false;
    };

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

    const getDecisionById = (id) => {
        return decisions.find(decision => decision.id === parseInt(id));
    };

    const getUserDecisions = (userId) => {
        return decisions.filter(d => d.userId === userId);
    };

    const getStats = () => {
        const total = decisions.length;
        const personal = decisions.filter(d => d.type === '개인').length;
        const team = decisions.filter(d => d.type === '팀').length;
        const withRetrospective = decisions.filter(d => d.retrospective !== null).length;

        return { total, personal, team, withRetrospective };
    };

    const getUserStats = (userId) => {
        const userDecisions = decisions.filter(d => d.userId === userId);
        const total = userDecisions.length;
        const personal = userDecisions.filter(d => d.type === '개인').length;
        const team = userDecisions.filter(d => d.type === '팀').length;
        const withRetrospective = userDecisions.filter(d => d.retrospective !== null).length;

        return { total, personal, team, withRetrospective };
    };
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