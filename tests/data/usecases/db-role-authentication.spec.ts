import { DbRoleAuthentication } from '@/data/usecases'
import { Decrypter, LoadUserByIdRepository } from '@/data/protocols'
import { mockUserModel } from '@/tests/domain/mocks'
import { mockDecrypterStub, mockLoadUserByIdRepository } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbRoleAuthentication
  decrypterStub: Decrypter
  loadUserByIdRepositoryStub: LoadUserByIdRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypterStub()
  const loadUserByIdRepositoryStub = mockLoadUserByIdRepository()
  const sut = new DbRoleAuthentication(decrypterStub, loadUserByIdRepositoryStub)
  return { sut, decrypterStub, loadUserByIdRepositoryStub }
}

describe('DbRoleAuthentication Data Usecase', () => {
  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.auth('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const decrypt = await sut.auth('any_token', 'any_role')
    expect(decrypt).toBeNull()
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.auth('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  test('Should call loadUserByIdRepository with correct value', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.auth('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return null if loadUserByIdRepository returns null', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const user = await sut.auth('any_token', 'any_role')
    expect(user).toBeNull()
  })

  test('Should return null if loadUserByIdRepository returns an user without role', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve({
      id: 'any_id',
      email: 'any_email',
      password: 'any_password'
    }))
    const user = await sut.auth('any_token', 'any_role')
    expect(user).toBeNull()
  })

  test('Should throw if loadUserByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.auth('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an user on success', async () => {
    const { sut } = makeSut()
    const user = await sut.auth('any_token', 'any_role')
    expect(user).toEqual(mockUserModel())
  })
})
