import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDecisions } from '../context/DecisionContext';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../routes/routePaths';
import DecisionForm from '../components/Decision/DecisionForm';

const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

const BackButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #e2e2e2;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 24px;
    color: #666;

    &:hover {
        background: #f9f9f9;
    }
`;

const Header = styled.div`
    background: white;
    padding: 32px;
    border-radius: 12px;
    margin-bottom: 24px;
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: bold;
    color: #333;
    margin-bottom: 16px;
`;

const Meta = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    flex-wrap: wrap;
`;

const Badge = styled.span`
    background: ${props => props.color || '#e2e2e2'};
    color: ${props => props.textColor || '#333'};
    padding: 6px 16px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
`;

const AuthorBadge = styled(Badge)`
    background: #f0f0f0;
    color: #666;
`;

const DateText = styled.div`
    color: #999;
    font-size: 14px;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 16px;
`;

const EditButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #5833ffff;
    background: white;
    color: #5833ffff;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        background: #5833ffff;
        color: white;
    }
`;

const DeleteButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #ff4444;
    background: white;
    color: #ff4444;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        background: #ff4444;
        color: white;
    }
`;

const Section = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #f0f0f0;
`;

const Situation = styled.p`
    line-height: 1.8;
    color: #666;
    font-size: 15px;
`;

const OptionsGrid = styled.div`
    display: grid;
    gap: 16px;
`;

const OptionCard = styled.div`
    border: 2px solid ${props => props.isSelected ? '#5833ffff' : '#e2e2e2'};
    background: ${props => props.isSelected ? '#f3effdff' : 'white'};
    padding: 20px;
    border-radius: 8px;
`;

const OptionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const OptionName = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #333;
`;

const SelectedBadge = styled.span`
    background: #5833ffff;
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
`;

const OptionDetail = styled.div`
    margin-bottom: 12px;
`;

const DetailLabel = styled.div`
    font-size: 13px;
    font-weight: 600;
    color: #999;
    margin-bottom: 4px;
`;

const DetailContent = styled.div`
    font-size: 14px;
    color: #666;
    line-height: 1.6;
`;

const CriteriaGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
`;

const CriteriaItem = styled.div`
    padding: 16px;
    background: #f9f9f9;
    border-radius: 8px;
`;

const CriteriaName = styled.div`
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
`;

const CriteriaValue = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const CriteriaBar = styled.div`
    flex: 1;
    height: 8px;
    background: #e2e2e2;
    border-radius: 4px;
    overflow: hidden;
`;

const CriteriaFill = styled.div`
    height: 100%;
    width: ${props => (props.value / 5) * 100}%;
    background: #5833ffff;
    transition: width 0.3s;
`;

const CriteriaScore = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #5833ffff;
`;

const RetrospectiveForm = styled.div`
    margin-top: 16px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    margin-bottom: 12px;
    min-height: 80px;
    resize: vertical;
    outline: none;

    &:focus {
        border-color: #5833ffff;
    }
`;

const RadioGroup = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
`;

const RadioLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`;

const Button = styled.button`
    padding: 12px 24px;
    border: none;
    background: #5833ffff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        scale: 0.98;
    }

    &:disabled {
        background: #e2e2e2;
        color: #999;
        cursor: not-allowed;
    }
`;

const RetrospectiveContent = styled.div`
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-top: 16px;
`;

const RetrospectiveItem = styled.div`
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const LoginPrompt = styled.div`
    background: #fff9e6;
    border: 1px solid #ffd700;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    color: #666;
    margin-top: 16px;
`;

const EditModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
`;

const EditModalContent = styled.div`
    background: white;
    border-radius: 12px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 32px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
    font-size: 28px;
    font-weight: bold;
    color: #333;
`;

const CloseButton = styled.button`
    padding: 8px 16px;
    border: 1px solid #e2e2e2;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    color: #666;
    font-weight: 600;

    &:hover {
        background: #f9f9f9;
    }
`;

const DecisionDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getDecisionById, addRetrospective, deleteDecision, updateDecision } = useDecisions();
    const { currentUser, isAuthenticated } = useAuth();
    
    const [showRetrospectiveForm, setShowRetrospectiveForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [retrospectiveData, setRetrospectiveData] = useState({
        actualResult: '',
        wasCorrect: 'yes',
        improvements: ''
    });

    const decision = getDecisionById(id);

    if (!decision) {
        return (
            <Container>
                <p>결정을 찾을 수 없습니다.</p>
                <BackButton onClick={() => navigate(ROUTES.HOME)}>목록으로</BackButton>
            </Container>
        );
    }

    const isDecisionOwner = isAuthenticated && currentUser?.id === decision?.userId;

    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleAddRetrospective = () => {
        if (!isAuthenticated || !currentUser) {
            alert('로그인이 필요합니다.');
            return;
        }
        if (!isDecisionOwner || !currentUser) {
            alert('작성자만 회고를 작성할 수 있습니다.');
            return;
        }
        if (retrospectiveData.actualResult.trim() === '') {
            alert('실제 결과를 입력해주세요.');
            return;
        }
        const success = addRetrospective(decision.id, retrospectiveData, currentUser.id);
        if (success) {
            setShowRetrospectiveForm(false);
        } else {
            alert('회고 작성에 실패했습니다.');
        }
    };

    const handleDelete = () => {
        if (!isDecisionOwner || !currentUser) {
            alert('작성자만 삭제할 수 있습니다.');
            return;
        }
        if (window.confirm('정말로 이 결정을 삭제하시겠습니까?')) {
            const success = deleteDecision(decision.id, currentUser.id);
            if (success) {
                navigate(ROUTES.HOME);
            } else {
                alert('삭제에 실패했습니다.');
            }
        }
    };

    const handleEdit = () => {
        if (!isDecisionOwner || !currentUser) {
            alert('작성자만 수정할 수 있습니다.');
            return;
        }
        setShowEditModal(true);
    };

    const handleUpdateDecision = (updatedData) => {
        if (!currentUser) {
            alert('로그인이 필요합니다.');
            return;
        }
        const success = updateDecision(decision.id, updatedData, currentUser.id);
        if (success) {
            setShowEditModal(false);
            alert('수정되었습니다.');
        } else {
            alert('수정에 실패했습니다.');
        }
    };

    return (
        <Container>
            {/* 수정 모달 */}
            {showEditModal && (
                <EditModalOverlay onClick={() => setShowEditModal(false)}>
                    <EditModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <ModalTitle>의사결정 수정</ModalTitle>
                            <CloseButton onClick={() => setShowEditModal(false)}>
                                닫기
                            </CloseButton>
                        </ModalHeader>
                        <DecisionForm
                            onSubmit={handleUpdateDecision}
                            onCancel={() => setShowEditModal(false)}
                            initialData={{
                                title: decision.title,
                                type: decision.type,
                                situation: decision.situation,
                                options: decision.options,
                                finalChoice: decision.finalChoice,
                                criteria: decision.criteria
                            }}
                        />
                    </EditModalContent>
                </EditModalOverlay>
            )}

            <BackButton onClick={() => navigate(ROUTES.HOME)}>← 목록으로</BackButton>

            <Header>
                <Title>{decision.title}</Title>
                <Meta>
                    <Badge
                        color={decision.type === '팀' ? '#5833ffff' : '#24854cff'}
                        textColor="white"
                    >
                        {decision.type}
                    </Badge>
                    <AuthorBadge>
                        유저 : {decision.userName}
                        {isDecisionOwner && ' (나)'}
                    </AuthorBadge>
                    <DateText>{formatDate(decision.decisionDate)}</DateText>
                </Meta>

                {isDecisionOwner && (
                    <ActionButtons>
                        <EditButton onClick={handleEdit}>수정</EditButton>
                        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
                    </ActionButtons>
                )}
            </Header>

            <Section>
                <SectionTitle>상황 설명</SectionTitle>
                <Situation>{decision.situation}</Situation>
            </Section>

            <Section>
                <SectionTitle>선택지 비교</SectionTitle>
                <OptionsGrid>
                    {decision.options.map((option, index) => (
                        <OptionCard
                            key={index}
                            isSelected={option.name === decision.finalChoice}
                        >
                            <OptionHeader>
                                <OptionName>
                                    {option.name || `선택지 ${String.fromCharCode(65 + index)}`}
                                </OptionName>
                                {option.name === decision.finalChoice && (
                                    <SelectedBadge>최종 선택</SelectedBadge>
                                )}
                            </OptionHeader>

                            <OptionDetail>
                                <DetailLabel>장점</DetailLabel>
                                <DetailContent>{option.pros || '없음'}</DetailContent>
                            </OptionDetail>

                            <OptionDetail>
                                <DetailLabel>단점</DetailLabel>
                                <DetailContent>{option.cons || '없음'}</DetailContent>
                            </OptionDetail>

                            <OptionDetail>
                                <DetailLabel>위험 요소</DetailLabel>
                                <DetailContent>{option.risks || '없음'}</DetailContent>
                            </OptionDetail>
                        </OptionCard>
                    ))}
                </OptionsGrid>
            </Section>

            <Section>
                <SectionTitle>결정 기준</SectionTitle>
                <CriteriaGrid>
                    <CriteriaItem>
                        <CriteriaName>속도</CriteriaName>
                        <CriteriaValue>
                            <CriteriaBar>
                                <CriteriaFill value={decision.criteria.speed} />
                            </CriteriaBar>
                            <CriteriaScore>{decision.criteria.speed}/5</CriteriaScore>
                        </CriteriaValue>
                    </CriteriaItem>

                    <CriteriaItem>
                        <CriteriaName>비용</CriteriaName>
                        <CriteriaValue>
                            <CriteriaBar>
                                <CriteriaFill value={decision.criteria.cost} />
                            </CriteriaBar>
                            <CriteriaScore>{decision.criteria.cost}/5</CriteriaScore>
                        </CriteriaValue>
                    </CriteriaItem>

                    <CriteriaItem>
                        <CriteriaName>확장성</CriteriaName>
                        <CriteriaValue>
                            <CriteriaBar>
                                <CriteriaFill value={decision.criteria.scalability} />
                            </CriteriaBar>
                            <CriteriaScore>{decision.criteria.scalability}/5</CriteriaScore>
                        </CriteriaValue>
                    </CriteriaItem>

                    <CriteriaItem>
                        <CriteriaName>팀 역량</CriteriaName>
                        <CriteriaValue>
                            <CriteriaBar>
                                <CriteriaFill value={decision.criteria.teamCapability} />
                            </CriteriaBar>
                            <CriteriaScore>{decision.criteria.teamCapability}/5</CriteriaScore>
                        </CriteriaValue>
                    </CriteriaItem>
                </CriteriaGrid>
            </Section>

            <Section>
                <SectionTitle>결과 회고</SectionTitle>
                {!decision.retrospective && !showRetrospectiveForm && (
                    <div>
                        <p style={{ color: '#999', marginBottom: '16px' }}>
                            아직 회고가 작성되지 않았습니다.
                        </p>
                        {isDecisionOwner ? (
                            <Button onClick={() => setShowRetrospectiveForm(true)}>
                                회고 작성하기
                            </Button>
                        ) : (
                            <LoginPrompt>
                                {isAuthenticated 
                                    ? '작성자만 회고를 작성할 수 있습니다.' 
                                    : '회고를 작성하려면 로그인이 필요합니다.'}
                            </LoginPrompt>
                        )}
                    </div>
                )}

                {showRetrospectiveForm && (
                    <RetrospectiveForm>
                        <DetailLabel>실제 결과는 어땠나요?</DetailLabel>
                        <TextArea
                            value={retrospectiveData.actualResult}
                            onChange={(e) => setRetrospectiveData(prev => ({
                                ...prev,
                                actualResult: e.target.value
                            }))}
                            placeholder="결정 후 실제로 어떤 일이 일어났는지 작성해주세요..."
                        />

                        <DetailLabel>판단이 맞았나요?</DetailLabel>
                        <RadioGroup>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="wasCorrect"
                                    value="yes"
                                    checked={retrospectiveData.wasCorrect === 'yes'}
                                    onChange={(e) => setRetrospectiveData(prev => ({
                                        ...prev,
                                        wasCorrect: e.target.value
                                    }))}
                                />
                                예, 좋은 결정이었습니다
                            </RadioLabel>
                            <RadioLabel>
                                <input
                                    type="radio"
                                    name="wasCorrect"
                                    value="no"
                                    checked={retrospectiveData.wasCorrect === 'no'}
                                    onChange={(e) => setRetrospectiveData(prev => ({
                                        ...prev,
                                        wasCorrect: e.target.value
                                    }))}
                                />
                                아니요, 아쉬운 점이 있습니다
                            </RadioLabel>
                        </RadioGroup>

                        <DetailLabel>다음에 바꿀 점은?</DetailLabel>
                        <TextArea
                            value={retrospectiveData.improvements}
                            onChange={(e) => setRetrospectiveData(prev => ({
                                ...prev,
                                improvements: e.target.value
                            }))}
                            placeholder="다음에 비슷한 상황이 온다면 어떻게 하시겠습니까?"
                        />

                        <Button onClick={handleAddRetrospective}>회고 저장</Button>
                    </RetrospectiveForm>
                )}

                {decision.retrospective && (
                    <RetrospectiveContent>
                        <RetrospectiveItem>
                            <DetailLabel>실제 결과</DetailLabel>
                            <DetailContent>{decision.retrospective.actualResult}</DetailContent>
                        </RetrospectiveItem>

                        <RetrospectiveItem>
                            <DetailLabel>판단 평가</DetailLabel>
                            <DetailContent>
                                {decision.retrospective.wasCorrect === 'yes'
                                    ? '좋은 결정이었습니다'
                                    : '아쉬운 점이 있습니다'}
                            </DetailContent>
                        </RetrospectiveItem>

                        <RetrospectiveItem>
                            <DetailLabel>개선 사항</DetailLabel>
                            <DetailContent>{decision.retrospective.improvements}</DetailContent>
                        </RetrospectiveItem>

                        <RetrospectiveItem>
                            <DetailLabel>작성 날짜</DetailLabel>
                            <DetailContent>
                                {formatDate(decision.retrospective.updatedAt)}
                            </DetailContent>
                        </RetrospectiveItem>
                    </RetrospectiveContent>
                )}
            </Section>
        </Container>
    );
};

export default DecisionDetailPage;