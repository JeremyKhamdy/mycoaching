import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../store/useAuthStore'
import { supabase } from '@/shared/services/supabaseClient'
import { useAccountService } from '@/modules/accounts/services/useAccountService'
import type { Account } from '@/modules/accounts/models/Account'
import type { Session, User, AuthError } from '@supabase/supabase-js'
import { EnumGender } from '@/modules/accounts/models/Account'
import { EnumMeasureWeight } from '@/modules/accounts/models/Health'
import { flushPromises } from '@vue/test-utils'

// Mock de Supabase
vi.mock('@/shared/services/supabaseClient', () => ({
    supabase: {
        auth: {
            getSession: vi.fn(),
            signInWithPassword: vi.fn(),
            signOut: vi.fn(),
            signInWithOtp: vi.fn(),
            verifyOtp: vi.fn()
        }
    }
}))

// Mock du service Account
vi.mock('@/modules/accounts/services/useAccountService', () => ({
    useAccountService: vi.fn(() => ({
        getAccount: vi.fn(),
        getAccounts: vi.fn(),
        postAccount: vi.fn(),
        patchAccount: vi.fn()
    }))
}))

// Mock de vue-toastification
vi.mock('vue-toastification', () => ({
    useToast: vi.fn(() => ({
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn()
    })),
    POSITION: {
        BOTTOM_RIGHT: 'bottom-right'
    }
}))

// Helpers pour les tests
const createMockUser = (overrides: Partial<User> = {}): User => ({
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@test.com',
    created_at: '2024-01-01',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    role: 'authenticated',
    ...overrides
})

const createMockSession = (overrides: Partial<Session> = {}): Session => ({
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expires_at: 1234567890,
    expires_in: 3600,
    token_type: 'bearer',
    user: createMockUser(),
    ...overrides
})

const createMockAccount = (overrides: Partial<Account> = {}): Account => ({
    id: 1,
    user_id: '123e4567-e89b-12d3-a456-426614174000',
    firstname: 'test',
    lastname: 'test',
    email: 'test@test.com',
    password: 'hashedPassword',
    height: 180,
    gender: EnumGender.male,
    birthday: '1990-01-01',
    phone_number: '1234567890',
    createdAt: '1999-01-01',
    updatedAt: '1999-01-01',
    is_active: true,
    health: {
        id: 1,
        height: 180,
        weight: 75,
        target_weight: 76,
        target_training: 5,
        measure_weight: EnumMeasureWeight.weekly
    },
    objectives: {
        id: 1,
        training_per_week: 5
    },
    role: {
        id: 1,
        name: 'user'
    },
    ...overrides
})

const createMockAuthError = (message: string): any => ({
    message,
    status: 400,
    name: 'AuthError',
    code: 'invalid_credentials',
    __isAuthError: true
})

describe('useAuthStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    describe('initialization', () => {
        it('should initialize with default values', () => {
            const store = useAuthStore()
            expect(store.user).toBeNull()
            expect(store.account).toBeNull()
            expect(store.actualSession).toBeNull()
            expect(store.loading).toBe(false)
            expect(store.loadingSession).toBe(false)
            expect(store.error).toBeNull()
            expect(store.pendingVerification).toBe(false)
            expect(store.pendingVerificationEmail).toBe('')
        })
    })

    describe('isAdmin', () => {
        it('should return true when user is admin', () => {
            const store = useAuthStore()
            store.account = createMockAccount({ role: { id: 1, name: 'ROLE_ADMIN' } })
            expect(store.isAdmin()).toBe(true)
        })

        it('should return false when user is not admin', () => {
            const store = useAuthStore()
            store.account = createMockAccount()
            expect(store.isAdmin()).toBe(false)
        })
    })

    describe('fetchUser', () => {
        it('should fetch user and account successfully', async () => {
            const mockUser = createMockUser()
            const mockSession = createMockSession({ user: mockUser })
            const mockAccount = createMockAccount()

            vi.mocked(supabase.auth.getSession).mockResolvedValue({
                data: { session: mockSession },
                error: null
            })

            const getAccountMock = vi.fn().mockResolvedValue({ data: mockAccount, error: null })
            vi.mocked(useAccountService).mockReturnValue({
                getAccount: getAccountMock,
                getAccounts: vi.fn(),
                postAccount: vi.fn(),
                patchAccount: vi.fn()
            })

            const store = useAuthStore()
            await store.fetchUser()
            await flushPromises()

            expect(supabase.auth.getSession).toHaveBeenCalled()
            expect(getAccountMock).toHaveBeenCalledWith(mockUser.id)
            expect(store.user).toEqual(mockUser)
            expect(store.account).toEqual(mockAccount)
            expect(store.actualSession).toEqual(mockSession)
            expect(store.loadingSession).toBe(false)
        })

        it('should handle error when fetching user', async () => {
            const mockError = createMockAuthError('Session error')

            vi.mocked(supabase.auth.getSession).mockResolvedValue({
                data: { session: null },
                error: mockError
            })

            const store = useAuthStore()
            await store.fetchUser()
            await flushPromises()

            expect(store.error).toBe(mockError.message)
            expect(store.loadingSession).toBe(false)
        })
    })

    describe('signIn', () => {
        it('should sign in successfully', async () => {
            const mockUser = createMockUser()
            const mockSession = createMockSession({ user: mockUser })

            vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
                data: { user: mockUser, session: mockSession },
                error: null
            })

            const store = useAuthStore()
            const result = await store.signIn('test@test.com', 'password')
            await flushPromises()

            expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
                email: 'test@test.com',
                password: 'password'
            })
            expect(store.user).toEqual(mockUser)
            expect(store.actualSession).toEqual(mockSession)
            expect(store.loading).toBe(false)
            expect(result).toEqual({ user: mockUser, session: mockSession })
        })

        it('should handle error when signing in', async () => {
            const mockError = createMockAuthError('Invalid credentials')

            vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
                data: { user: null, session: null },
                error: mockError
            })

            const store = useAuthStore()
            await store.signIn('test@test.com', 'wrong-password')
            await flushPromises()

            expect(store.error).toBe(mockError.message)
            expect(store.loading).toBe(false)
        })
    })

    describe('signOut', () => {
        it('should sign out successfully', async () => {
            const store = useAuthStore()
            store.user = createMockUser()
            store.account = createMockAccount()
            store.actualSession = createMockSession()

            await store.signOut()
            await flushPromises()

            expect(supabase.auth.signOut).toHaveBeenCalled()
            expect(store.user).toBeNull()
            expect(store.account).toBeNull()
            expect(store.actualSession).toBeNull()
            expect(store.pendingVerification).toBe(false)
            expect(store.pendingVerificationEmail).toBe('')
        })
    })

    describe('sendOTP', () => {
        it('should send OTP successfully', async () => {
            vi.mocked(supabase.auth.signInWithOtp).mockResolvedValue({
                data: { user: null, session: null },
                error: null
            })

            const store = useAuthStore()
            await store.sendOTP('test@test.com')
            await flushPromises()

            expect(supabase.auth.signInWithOtp).toHaveBeenCalledWith({
                email: 'test@test.com',
                options: { shouldCreateUser: false }
            })
            expect(store.pendingVerification).toBe(true)
            expect(store.pendingVerificationEmail).toBe('test@test.com')
            expect(store.loading).toBe(false)
        })

        it('should handle error when sending OTP', async () => {
            const mockError = createMockAuthError('Failed to send OTP')

            vi.mocked(supabase.auth.signInWithOtp).mockResolvedValue({
                data: { user: null, session: null },
                error: mockError
            })

            const store = useAuthStore()
            await store.sendOTP('test@test.com')
            await flushPromises()

            expect(store.error).toBe(mockError.message)
            expect(store.loading).toBe(false)
        })
    })

    describe('verifyOTP', () => {
        it('should verify OTP successfully', async () => {
            const mockUser = createMockUser()
            const mockSession = createMockSession({ user: mockUser })
            const mockAccount = createMockAccount()

            vi.mocked(supabase.auth.verifyOtp).mockResolvedValue({
                data: { user: mockUser, session: mockSession },
                error: null
            })

            const getAccountMock = vi.fn().mockResolvedValue({ data: mockAccount, error: null })
            vi.mocked(useAccountService).mockReturnValue({
                getAccount: getAccountMock,
                getAccounts: vi.fn(),
                postAccount: vi.fn(),
                patchAccount: vi.fn()
            })

            const store = useAuthStore()
            store.pendingVerification = true
            store.pendingVerificationEmail = 'test@test.com'

            await store.verifyOTP('123456')
            await flushPromises()

            expect(supabase.auth.verifyOtp).toHaveBeenCalledWith({
                email: 'test@test.com',
                token: '123456',
                type: 'email'
            })
            expect(getAccountMock).toHaveBeenCalledWith(mockUser.id)
            expect(store.user).toEqual(mockUser)
            expect(store.account).toEqual(mockAccount)
            expect(store.actualSession).toEqual(mockSession)
            expect(store.pendingVerification).toBe(false)
            expect(store.pendingVerificationEmail).toBe('')
            expect(store.loadingSession).toBe(false)
        })

        it('should throw error when no verification is pending', async () => {
            const store = useAuthStore()
            store.pendingVerification = false

            await expect(store.verifyOTP('123456')).rejects.toThrow(
                'Aucune vérification en attente'
            )
        })

        it('should handle error when verifying OTP', async () => {
            const mockError = createMockAuthError('Invalid OTP')

            vi.mocked(supabase.auth.verifyOtp).mockResolvedValue({
                data: { user: null, session: null },
                error: mockError
            })

            const store = useAuthStore()
            store.pendingVerification = true
            store.pendingVerificationEmail = 'test@test.com'

            await store.verifyOTP('123456')
            await flushPromises()

            expect(store.error).toBe(mockError.message)
            expect(store.loadingSession).toBe(true)
        })
    })
})
