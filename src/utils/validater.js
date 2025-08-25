const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/; // 영문 + 숫자 반드시 포함, 길이 8~20자 (특수문자는 허용 X)

export const registerValidater = ({ name, email, password, confirmPassword, setErrors }) => {
  setErrors({});
  const next = { name: '', email: '', password: '', confirmPassword: '', form: '' };

  if (!name.trim()) next.name = '이름을 입력해주세요.';
  else if (name.trim().length > 50) next.name = '이름은 50자 이하로 입력해주세요.';

  // Email
  if (!email.trim()) next.email = '이메일을 입력해주세요.';
  else if (!emailRegex.test(email.trim())) next.email = '올바른 이메일 형식이 아닙니다.';

  // Password
  if (!password) next.password = '비밀번호를 입력해주세요.';
  else if (!passwordRegex.test(password))
    next.password = '비밀번호는 8~20자, 영문과 숫자를 모두 포함해야 합니다.';

  // Confirm Password
  if (!confirmPassword) next.confirmPassword = '비밀번호 확인을 입력해주세요.';
  else if (password && confirmPassword !== password)
    next.confirmPassword = '비밀번호가 일치하지 않습니다.';

  setErrors(next);

  // 하나라도 메시지가 있으면 실패
  return Object.values(next).every((msg) => msg === '');
};

export const loginValidater = ({ email, password, setErrors }) => {
  setErrors({});
  const next = { email: '', password: '' };

  // Email
  if (!email.trim()) next.email = '이메일을 입력해주세요.';
  else if (!emailRegex.test(email.trim())) next.email = '올바른 이메일 형식이 아닙니다.';

  // Password
  if (!password) next.password = '비밀번호를 입력해주세요.';

  setErrors(next);

  // 하나라도 메시지가 있으면 실패
  return Object.values(next).every((msg) => msg === '');
};
