import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { loginSuccess } from '../../features/auth/authSlice';
import './AuthPages.css';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await authService.login(values);
      
      // Mock login
      setTimeout(() => {
        const mockUser = {
          user_id: '1',
          username: values.username,
          email: 'user@example.com',
          role: 'user',
        };
        
        dispatch(loginSuccess(mockUser));
        navigate('/dashboard');
        setSubmitting(false);
      }, 1000);
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <h2 className="auth-title">Đăng nhập</h2>
      <p className="auth-subtitle">Chào mừng trở lại!</p>

      {error && <div className="error-message">{error}</div>}

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <Field
                id="username"
                name="username"
                type="text"
                className={`form-input ${errors.username && touched.username ? 'error' : ''}`}
                placeholder="Nhập tên đăng nhập"
              />
              {errors.username && touched.username && (
                <div className="field-error">{errors.username}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <Field
                id="password"
                name="password"
                type="password"
                className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
                placeholder="Nhập mật khẩu"
              />
              {errors.password && touched.password && (
                <div className="field-error">{errors.password}</div>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/forgot-password" className="link">Quên mật khẩu?</Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </Form>
        )}
      </Formik>

      <div className="auth-footer">
        <p>
          Chưa có tài khoản? <Link to="/register" className="link">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
