export const validateCpf = (cpf: string): boolean => {
    if (!/^\d{11}$/.test(cpf) || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    const digits = [...cpf].map(v => +v);

    const d1 = 10 * digits
        .slice(0, 9)
        .map((v, i) => v * (10 - i))
        .reduce((p, c) => p + c) % 11;

    const d2 = 10 * digits
        .slice(0, 10)
        .map((v, i) => v * (11 - i))
        .reduce((p, c) => p + c) % 11;

    return d1 % 10 === digits[9] && d2 % 10 === digits[10];
}
