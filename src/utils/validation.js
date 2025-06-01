export function validateEmail(email) {
    if (!email) return 'O email é obrigatório';
    if (
        !email.toLowerCase().endsWith('@aluno.ifsp.edu.br') &&
        !email.toLowerCase().endsWith('@ifsp.edu.br')
    )
        return 'Use seu email institucional ...@aluno.ifsp.edu.br';
    return '';
}

export function validatePassword(password) {
    if (!password) return 'A senha é obrigatória';
    if (password.length < 8) return 'A senha deve ter no mínimo 8 caracteres';
    return '';
}

export function validateName(name) {
    if (!name) return 'O nome é obrigatório';
    return '';
}

export function validateNickname(nickname) {
    if (!nickname) return 'O apelido é obrigatório';
    return '';
}
