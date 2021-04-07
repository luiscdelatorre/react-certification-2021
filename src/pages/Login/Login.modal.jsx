import React, { useEffect, useState } from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';
import { useHistory } from 'react-router';
import { useAuth } from '../../providers/Auth';
import { useSessionData } from '../../providers/SessionData/SessionData.provider';
import { loginApi } from '../../api/login.api';
import Modal from '../../components/Modal';
import Styled from './Login.styles';

const LoginModal = () => {
  const { login, authenticated } = useAuth();
  const { setUser } = useSessionData();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    setIsModalVisible(true);
    if (authenticated) {
      history.push('/');
    }
  }, [authenticated, history]);

  const authenticate = (event) => {
    event.preventDefault();
    setLoading(true);
    if (form.username && form.password) {
      loginApi(form.username, form.password)
        .then((response) => {
          setIsModalVisible(false);
          login();
          setUser(response);
          history.push('/secret');
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    } else {
      setError('Username and password are required');
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { id } = event.target;
    form[id] = event.target.value;
    setForm(form);
  };

  return (
    <Modal title="Welcome back!" visible={isModalVisible}>
      <Styled.Form onSubmit={authenticate}>
        <Styled.FormGroup>
          <Styled.FormLabel htmlFor="username">Username </Styled.FormLabel>
          <Styled.FormInput
            data-testid="username"
            type="text"
            id="username"
            onChange={handleInputChange}
          />
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.FormLabel htmlFor="password">Password </Styled.FormLabel>
          <Styled.FormInput
            data-testid="password"
            type="password"
            id="password"
            onChange={handleInputChange}
          />
        </Styled.FormGroup>
        {error && <Styled.FormError>{error}</Styled.FormError>}
        <Styled.FormSubmit disabled={loading} type="submit" data-testid="btn-login">
          {loading ? (
            <Styled.Spinner>
              <CgSpinnerTwo />
            </Styled.Spinner>
          ) : (
            'Login'
          )}
        </Styled.FormSubmit>
      </Styled.Form>
    </Modal>
  );
};

export default LoginModal;
