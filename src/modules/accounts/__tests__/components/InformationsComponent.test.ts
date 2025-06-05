import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import InformationsComponent from '../../components/InformationsComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAccountStore } from '../../store/useAccountStore'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import type { Account } from '../../models/Account'
import { EnumGender } from '../../models/Account'
import { EnumMeasureWeight } from '../../models/Health'
import { useAccountService } from '../../services/useAccountService'
import type { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js'

const createMockAccount = (overrides: Partial<Account> = {}): Account => ({
    id: 1,
    user_id: '123e4567-e89b-12d3-a456-426614174000',
    firstname: 'test',
    lastname: 'test',
    email: 'test@test.com',
    password: 'hashedPassword',
    birthday: '1990-01-01',
    phone_number: '0123456789',
    gender: EnumGender.male,
    height: 180,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    is_active: true,
    health: {
        id: 1,
        height: 180,
        weight: 75,
        target_weight: 70,
        target_training: 3,
        measure_weight: EnumMeasureWeight.weekly
    },
    objectives: {
        id: 1,
        training_per_week: 3
    },
    role: {
        id: 1,
        name: 'user'
    },
    ...overrides
})

describe('InformationsComponent', () => {
    let wrapper: any
    let accountStore: any
    let authStore: any
    let pinia: any

    const createWrapper = () => {
        pinia = createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
                auth: {
                    account: createMockAccount()
                }
            }
        })

        return mount(InformationsComponent, {
            global: {
                plugins: [pinia]
            }
        })
    }

    beforeEach(async () => {
        wrapper = createWrapper()
        accountStore = useAccountStore()
        authStore = useAuthStore()
        await flushPromises()
    })

    describe('Rendu initial', () => {
        it('should display user information correctly', async () => {
            const account = createMockAccount()
            authStore.account = account
            await flushPromises()

            expect(wrapper.text()).toContain(account.firstname)
            expect(wrapper.text()).toContain(account.lastname)
            expect(wrapper.text()).toContain(account.email)
            expect(wrapper.text()).toContain(account.phone_number)
            expect(wrapper.text()).toContain('Homme') // Pour EnumGender.male
        })

        it('should show edit button initially', () => {
            const editButton = wrapper.find('button')
            expect(editButton.exists()).toBe(true)
            expect(editButton.text()).toContain('Modifier')
        })
    })

    describe('Mode édition', () => {
        it('should toggle edit mode when clicking edit button', async () => {
            const editButton = wrapper.find('button')
            await editButton.trigger('click')
            await flushPromises()

            expect(wrapper.find('input[type="text"]').exists()).toBe(true)
            expect(wrapper.find('select').exists()).toBe(true)
            expect(wrapper.find('button').text()).toContain('Annuler')
        })

        it('should show save and cancel buttons in edit mode', async () => {
            const editButton = wrapper.find('button')
            await editButton.trigger('click')
            await flushPromises()

            const buttons = wrapper.findAll('button')
            expect(buttons[1].text()).toContain('Annuler')
            expect(buttons[2].text()).toContain('Enregistrer')
        })
    })

    describe('Mise à jour des informations', () => {
        it('should update account information when saving', async () => {
            // Préparer les données de test
            const accountData = createMockAccount({
                firstname: 'testtest Updated',
                lastname: 'testtest',
                phone_number: '0987654321',
                gender: EnumGender.female
            })

            // Configurer le mock du store
            accountStore.updateAccount = vi.fn().mockResolvedValue(accountData)

            // Activer le mode édition
            const editButton = wrapper.find('button')
            await editButton.trigger('click')
            await flushPromises()

            // Remplir le formulaire
            const firstnameInput = wrapper.find('input[type="text"]')
            const lastnameInput = wrapper.findAll('input[type="text"]')[1]
            const phoneInput = wrapper.find('input[type="tel"]')
            const genderSelect = wrapper.find('select')

            await firstnameInput.setValue('testtest')
            await lastnameInput.setValue('testtest')
            await phoneInput.setValue('0987654321')
            await genderSelect.setValue(EnumGender.female)
            await flushPromises()

            // Sauvegarder
            const saveButton = wrapper.findAll('button')[2]
            await saveButton.trigger('click')
            await flushPromises()

            // Vérifier les appels
            expect(accountStore.updateAccount).toHaveBeenCalledWith(1, {
                firstname: 'testtest',
                lastname: 'testtest',
                phone_number: '0987654321',
                gender: EnumGender.female,
                email: 'test@test.com',
                birthday: '1990-01-01'
            })
            expect(authStore.account).toEqual(accountData)
        })

        it('should cancel editing and revert changes', async () => {
            const account = createMockAccount()
            authStore.account = account
            await flushPromises()

            // Activer le mode édition
            const editButton = wrapper.find('button')
            await editButton.trigger('click')
            await flushPromises()

            // Modifier les champs
            const firstnameInput = wrapper.find('input[type="text"]')
            await firstnameInput.setValue('Jane')
            await flushPromises()

            // Annuler
            const cancelButton = wrapper.findAll('button')[0]
            await cancelButton.trigger('click')
            await flushPromises()

            expect(wrapper.text()).toContain(account.firstname)
            expect(wrapper.text()).not.toContain('Jane')
        })
    })

    describe('Validation des champs', () => {
        it('should display phone number as "Non renseigné" when empty', async () => {
            const account = createMockAccount({ phone_number: '' })
            authStore.account = account
            await flushPromises()

            expect(wrapper.text()).toContain('Non renseigné')
        })

        it('should display gender as "Non renseigné" when not set', async () => {
            const account = createMockAccount({ gender: undefined })
            authStore.account = account
            await flushPromises()

            expect(wrapper.text()).toContain('Non renseigné')
        })
    })
})
