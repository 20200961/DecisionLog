import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    background: white;
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 24px;
`;

const FormSection = styled.div`
    margin-bottom: 24px;
`;

const Label = styled.label`
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    outline: none;

    &:focus {
        border-color: #5833ffff;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    outline: none;
    min-height: 100px;
    resize: vertical;

    &:focus {
        border-color: #5833ffff;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 12px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    outline: none;
    background: white;
    cursor: pointer;

    &:focus {
        border-color: #5833ffff;
    }
`;

const OptionCard = styled.div`
    background: #f9f9f9;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
`;

const OptionInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 8px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    outline: none;

    &:focus {
        border-color: #5833ffff;
    }
`;

const SmallTextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 8px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    outline: none;
    min-height: 60px;
    resize: vertical;

    &:focus {
        border-color: #5833ffff;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;

const Button = styled.button`
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;

    &:hover {
        scale: 0.98;
    }
`;

const PrimaryButton = styled(Button)`
    background: #5833ffff;
    color: white;
`;

const SecondaryButton = styled(Button)`
    background: #e2e2e2;
    color: #333;
`;

const AddOptionButton = styled(Button)`
    background: #f0f0f0;
    color: #5833ffff;
    width: 100%;
    margin-top: 8px;
`;

const RemoveOptionButton = styled(Button)`
    background: #ffe2e2;
    color: #ff4444;
    padding: 6px 12px;
    font-size: 12px;
`;

const OptionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`;

const CriteriaSlider = styled.div`
    margin-bottom: 16px;
`;

const SliderLabel = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    font-size: 14px;
`;

const Slider = styled.input`
    width: 100%;
`;

const DecisionForm = ({ onSubmit, onCancel, initialData = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        type: '개인',
        situation: '',
        options: [
            { name: '', pros: '', cons: '', risks: '' },
            { name: '', pros: '', cons: '', risks: '' }
        ],
        finalChoice: '',
        criteria: {
            speed: 3,
            cost: 3,
            scalability: 3,
            teamCapability: 3
        }
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...formData.options];
        newOptions[index][field] = value;
        setFormData(prev => ({
            ...prev,
            options: newOptions
        }));
    };

    const addOption = () => {
        setFormData(prev => ({
            ...prev,
            options: [...prev.options, { name: '', pros: '', cons: '', risks: '' }]
        }));
    };

    const removeOption = (index) => {
        if (formData.options.length > 2) {
            const newOptions = formData.options.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                options: newOptions
            }));
        }
    };

    const handleCriteriaChange = (criterion, value) => {
        setFormData(prev => ({
            ...prev,
            criteria: {
                ...prev.criteria,
                [criterion]: parseInt(value)
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim() === '' || formData.situation.trim() === '') {
            alert('제목과 상황 설명은 필수입니다.');
            return;
        }
        onSubmit(formData);
    };

    return (
        <FormContainer>
            <div>
                <FormSection>
                    <Label>결정 제목 *</Label>
                    <Input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="예: React를 선택한 이유"
                    />
                </FormSection>

                <FormSection>
                    <Label>결정 유형 *</Label>
                    <Select
                        value={formData.type}
                        onChange={(e) => handleChange('type', e.target.value)}
                    >
                        <option value="개인">개인</option>
                        <option value="팀">팀</option>
                    </Select>
                </FormSection>

                <FormSection>
                    <Label>상황 설명 (왜 이 선택을 해야 했는지) *</Label>
                    <TextArea
                        value={formData.situation}
                        onChange={(e) => handleChange('situation', e.target.value)}
                        placeholder="이 결정을 해야 했던 배경과 맥락을 설명해주세요..."
                    />
                </FormSection>

                <FormSection>
                    <Label>선택지</Label>
                    {formData.options.map((option, index) => (
                        <OptionCard key={index}>
                            <OptionHeader>
                                <strong>선택지 {String.fromCharCode(65 + index)}</strong>
                                {formData.options.length > 2 && (
                                    <RemoveOptionButton type="button" onClick={() => removeOption(index)}>
                                        삭제
                                    </RemoveOptionButton>
                                )}
                            </OptionHeader>
                            <OptionInput
                                type="text"
                                value={option.name}
                                onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
                                placeholder="선택지 이름 (예: React 사용)"
                            />
                            <SmallTextArea
                                value={option.pros}
                                onChange={(e) => handleOptionChange(index, 'pros', e.target.value)}
                                placeholder="장점"
                            />
                            <SmallTextArea
                                value={option.cons}
                                onChange={(e) => handleOptionChange(index, 'cons', e.target.value)}
                                placeholder="단점"
                            />
                            <SmallTextArea
                                value={option.risks}
                                onChange={(e) => handleOptionChange(index, 'risks', e.target.value)}
                                placeholder="위험 요소"
                            />
                        </OptionCard>
                    ))}
                    <AddOptionButton type="button" onClick={addOption}>
                        + 선택지 추가
                    </AddOptionButton>
                </FormSection>

                <FormSection>
                    <Label>최종 선택</Label>
                    <Select
                        value={formData.finalChoice}
                        onChange={(e) => handleChange('finalChoice', e.target.value)}
                    >
                        <option value="">선택하세요</option>
                        {formData.options.map((option, index) => (
                            <option key={index} value={option.name || `선택지 ${String.fromCharCode(65 + index)}`}>
                                {option.name || `선택지 ${String.fromCharCode(65 + index)}`}
                            </option>
                        ))}
                    </Select>
                </FormSection>

                <FormSection>
                    <Label>결정 기준 (비중)</Label>
                    <CriteriaSlider>
                        <SliderLabel>
                            <span>속도</span>
                            <span>{formData.criteria.speed}/5</span>
                        </SliderLabel>
                        <Slider
                            type="range"
                            min="1"
                            max="5"
                            value={formData.criteria.speed}
                            onChange={(e) => handleCriteriaChange('speed', e.target.value)}
                        />
                    </CriteriaSlider>

                    <CriteriaSlider>
                        <SliderLabel>
                            <span>비용</span>
                            <span>{formData.criteria.cost}/5</span>
                        </SliderLabel>
                        <Slider
                            type="range"
                            min="1"
                            max="5"
                            value={formData.criteria.cost}
                            onChange={(e) => handleCriteriaChange('cost', e.target.value)}
                        />
                    </CriteriaSlider>

                    <CriteriaSlider>
                        <SliderLabel>
                            <span>확장성</span>
                            <span>{formData.criteria.scalability}/5</span>
                        </SliderLabel>
                        <Slider
                            type="range"
                            min="1"
                            max="5"
                            value={formData.criteria.scalability}
                            onChange={(e) => handleCriteriaChange('scalability', e.target.value)}
                        />
                    </CriteriaSlider>

                    <CriteriaSlider>
                        <SliderLabel>
                            <span>팀 역량</span>
                            <span>{formData.criteria.teamCapability}/5</span>
                        </SliderLabel>
                        <Slider
                            type="range"
                            min="1"
                            max="5"
                            value={formData.criteria.teamCapability}
                            onChange={(e) => handleCriteriaChange('teamCapability', e.target.value)}
                        />
                    </CriteriaSlider>
                </FormSection>

                <ButtonGroup>
                    {onCancel && (
                        <SecondaryButton type="button" onClick={onCancel}>
                            취소
                        </SecondaryButton>
                    )}
                    <PrimaryButton type="button" onClick={handleSubmit}>
                        {initialData ? '수정 완료' : '결정 기록하기'}
                    </PrimaryButton>
                </ButtonGroup>
            </div>
        </FormContainer>
    );
};

export default DecisionForm;