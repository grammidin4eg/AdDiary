let errorTextMap = null;
export function getErrorText(error, lang) {
    if (!error) {
        return '';
    }
    let text = error.message;
    if (error.code && (lang === 'ru')) {
        if (!errorTextMap) {
            errorTextMap = new Map();
            errorTextMap.set('auth/email-already-in-use', 'Пользователь с такой электронной почтой уже существует.');
            errorTextMap.set('auth/user-not-found', 'Пользователь с такой электронной почтой не зарегистрирован.');
            errorTextMap.set('auth/wrong-password', 'Неверный пароль');
            //errorTextMap.set('', '');            
        }

        if (errorTextMap.has(error.code)) {
            text = errorTextMap.get(error.code);
        }
    }
    return text;
}