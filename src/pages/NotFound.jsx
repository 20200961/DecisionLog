import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routePaths';

const Container = styled.div`
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px;
`;

const ErrorCode = styled.h1`
    font-size: 120px;
    font-weight: 900;
    color: #5833ffff;
    margin: 0;
    line-height: 1;
    text-shadow: 4px 4px 0px rgba(88, 51, 255, 0.1);
`;

const ErrorTitle = styled.h2`
    font-size: 32px;
    font-weight: 700;
    color: #333;
    margin: 24px 0 16px;
`;

const ErrorMessage = styled.p`
    font-size: 18px;
    color: #666;
    margin-bottom: 40px;
    max-width: 500px;
    line-height: 1.6;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
`;

const Button = styled.button`
    padding: 14px 32px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: translateY(0);
    }
`;

const PrimaryButton = styled(Button)`
    background: #5833ffff;
    color: white;

    &:hover {
        background: #3c16e4ff;
    }
`;

const SecondaryButton = styled(Button)`
    background: #f0f0f0;
    color: #333;

    &:hover {
        background: #e2e2e2;
    }
`;

const IconContainer = styled.div`
    font-size: 80px;
    margin-bottom: 24px;
    animation: float 3s ease-in-out infinite;

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }
`;

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(ROUTES.HOME);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Container>
            <ErrorCode>404</ErrorCode>
            <ErrorTitle>페이지를 찾을 수 없습니다</ErrorTitle>
            <ErrorMessage>
                요청하신 페이지가 존재하지 않거나, 삭제되었거나, 주소가 변경되었을 수 있습니다.
                URL을 다시 확인해주세요.
            </ErrorMessage>
            <ButtonGroup>
                <PrimaryButton onClick={handleGoHome}>
                    홈으로 가기
                </PrimaryButton>
                <SecondaryButton onClick={handleGoBack}>
                    이전 페이지
                </SecondaryButton>
            </ButtonGroup>
        </Container>
    );
};

export default NotFound;