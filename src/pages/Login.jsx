import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routePaths';

const Container = styled.div`
    max-width: 450px;
    margin: 80px auto;
`;

const Card = styled.div`
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    text-align: center;
`;

const Subtitle = styled.p`
    font-size: 14px;
    color: #666;
    text-align: center;
    margin-bottom: 32px;
`;

const TabContainer = styled.div`
    display: flex;
    gap: 0;
    margin-bottom: 32px;
    border-bottom: 2px solid #f0f0f0;
`;

const Tab = styled.button`
    flex: 1;
    padding: 12px 0;
    border: none;
    background: none;
    cursor: pointer;
    font-weight: 600;
    color: ${props => props.$active ? '#5833ffff' : '#999'};
    border-bottom: 2px solid ${props => props.$active ? '#5833ffff' : 'transparent'};
    margin-bottom: -2px;
    transition: all 0.2s;

    &:hover {
        color: #5833ffff;
    }
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #333;
`;

const Input = styled.input`
    padding: 12px 16px;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    font-size: 15px;
    outline: none;
    transition: all 0.2s;

    &:focus {
        border-color: #5833ffff;
        box-shadow: 0 0 0 3px rgba(88, 51, 255, 0.1);
    }

    &::placeholder {
        color: #999;
    }
`;

const Button = styled.button`
    padding: 14px;
    border: none;
    border-radius: 8px;
    background: #5833ffff;
    color: white;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 8px;

    &:hover {
        background: #3c16e4ff;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(88, 51, 255, 0.3);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background: #e2e2e2;
        cursor: not-allowed;
        transform: none;
    }
`;

const ErrorMessage = styled.div`
    padding: 12px;
    background: #fee;
    border: 1px solid #fcc;
    border-radius: 8px;
    color: #c33;
    font-size: 14px;
    text-align: center;
`;

const SuccessMessage = styled.div`
    padding: 12px;
    background: #efe;
    border: 1px solid #cfc;
    border-radius: 8px;
    color: #3c3;
    font-size: 14px;
    text-align: center;
`;

const Login = () => {
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (mode === 'login') {
                // 로그인
                if (!formData.email || !formData.password) {
                    setError('이메일과 비밀번호를 입력해주세요.');
                    return;
                }
                
                login(formData.email, formData.password);
                setSuccess('로그인 성공!');
                setTimeout(() => navigate(ROUTES.HOME), 1000);
            } else {
                // 회원가입
                if (!formData.name || !formData.email || !formData.password) {
                    setError('모든 필드를 입력해주세요.');
                    return;
                }

                if (formData.password !== formData.confirmPassword) {
                    setError('비밀번호가 일치하지 않습니다.');
                    return;
                }

                register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });
                
                setSuccess('회원가입 성공! 로그인되었습니다.');
                setTimeout(() => navigate(ROUTES.HOME), 1000);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setError('');
        setSuccess('');
    };

    return (
        <Container>
            <Card>
                <Title>Decision Log</Title>
                <Subtitle>의사결정의 모든 순간을 기록하세요</Subtitle>

                <TabContainer>
                    <Tab 
                        $active={mode === 'login'} 
                        onClick={() => switchMode('login')}
                        type="button"
                    >
                        로그인
                    </Tab>
                    <Tab 
                        $active={mode === 'register'} 
                        onClick={() => switchMode('register')}
                        type="button"
                    >
                        회원가입
                    </Tab>
                </TabContainer>

                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}

                <Form as="div">
                    {mode === 'register' && (
                        <FormGroup>
                            <Label>이름</Label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="홍길동"
                            />
                        </FormGroup>
                    )}

                    <FormGroup>
                        <Label>이메일</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>비밀번호</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={mode === 'register' ? '비밀번호를 입력하세요' : '비밀번호 입력'}
                        />
                    </FormGroup>

                    {mode === 'register' && (
                        <FormGroup>
                            <Label>비밀번호 확인</Label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="비밀번호를 다시 입력해주세요"
                            />
                        </FormGroup>
                    )}

                    <Button type="button" onClick={handleSubmit}>
                        {mode === 'login' ? '로그인' : '회원가입'}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;