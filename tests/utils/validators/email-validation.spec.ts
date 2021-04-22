import { EmailValidation } from '@/utils/validators/email-validation'
import { EmailValidator } from '@/utils/protocols/email-validator'
import { InvalidParamError } from '@/presentation/errors'
import { mockEmailValidatorStub } from '@/tests/utils/mocks'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidatorStub()
  const sut = new EmailValidation('email', emailValidatorStub)
  return { sut, emailValidatorStub }
}

describe('Email Validation', () => {
  test('Should call EmailValidator with correct value', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@mail.com' })
    expect(isValidSpy).toBeCalledWith('any_email@mail.com')
  })

  test('Should return an InvalidParamError if EmailValidator fails', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })

  test('Should not return if succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toBeFalsy()
  })
})
