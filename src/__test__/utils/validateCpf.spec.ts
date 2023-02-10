import { validateCpf } from "../../utils/validateCpf";

describe('CPF validation', () => {
    it('should validate a correct number', () => {
        const validNumber = '76197640031';
        expect(validateCpf(validNumber)).toBeTruthy();
    });

    it('should not validate if number contains non-digit characters', () => {
        const nonDigits = 'abcdefghijk';
        expect(validateCpf(nonDigits)).toBeFalsy();
    });

    it('should not validate if number has incorrect length', () => {
        const wrongLength = '761976400';
        expect(validateCpf(wrongLength)).toBeFalsy();
    });

    it('should not validate if all digits are the same', () => {
        const allTheSame = '11111111111';
        expect(validateCpf(allTheSame)).toBeFalsy();
    });

    it('should not validate if verification digits are wrong', () => {
        const wrongNumber = '76197640032';
        expect(validateCpf(wrongNumber)).toBeFalsy();
    });
});
