import { describe, it, expect, vi, beforeEach } from 'vitest'
import { EnumMeasureWeight, type Health } from '../../models/Health'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import HealthComponent from '../../components/HealthComponent.vue'
import { useAccountStore } from '../../store/useAccountStore'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import type { Account } from '../../models/Account'
import { EnumGender } from '../../models/Account'
import UiInputNumber from '@/shared/ui/inputs/UiInputNumber.vue'
import UiSelect from '@/shared/ui/select/UiSelect.vue'

const createMockHealth = (overrides: Partial<Health> = {}): Health => ({
    id: 1,
    height: 180,
    weight: 75,
    target_weight: 78,
    target_training: 5,
    measure_weight: EnumMeasureWeight.daily,
    ...overrides
})

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
    health: createMockHealth(),
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

describe('HealthComponent', () => {
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
                    account: null
                }
            }
        })

        return mount(HealthComponent, {
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

    describe('État initial', () => {
        it('should show "Aucune donnée de santé" when no health data exists', async () => {
            authStore.account = createMockAccount({ health: undefined })
            await flushPromises()

            expect(wrapper.text()).toContain('Aucune donnée de santé')
            expect(wrapper.text()).toContain('Ajouter mes informations')
            expect(wrapper.find('button').text()).toContain('Ajouter mes informations')
        })

        it('should display health data when it exists', async () => {
            const account = createMockAccount()
            authStore.account = account
            await flushPromises()

            expect(wrapper.text()).toContain('Statistiques de Santé')
            expect(wrapper.text()).toContain('Objectifs de Santé')
            expect(wrapper.text()).toContain('75') // weight
            expect(wrapper.text()).toContain('180') // height
            expect(wrapper.text()).toContain('78') // target_weight
            expect(wrapper.text()).toContain('5') // target_training
        })
    })

    describe('Mode édition', () => {
        it('should toggle edit mode when clicking edit button', async () => {
            authStore.account = createMockAccount()
            await flushPromises()

            const editButton = wrapper.find('button')
            await editButton.trigger('click')
            await flushPromises()

            expect(wrapper.find('form').exists()).toBe(true)
            expect(wrapper.find('input[type="number"]').exists()).toBe(true)
            expect(wrapper.find('select').exists()).toBe(true)
        })

        it('should show save and cancel buttons in edit mode', async () => {
            authStore.account = createMockAccount()
            await flushPromises()

            const editButton = wrapper.find('button')
            await editButton.trigger('click')
            await flushPromises()

            const buttons = wrapper.findAll('button')
            expect(buttons[1].text()).toContain('Annuler')
            expect(buttons[2].text()).toContain('Enregistrer')
        })
    })

    describe('Formulaire', () => {
        it('should initialize form with current health data', async () => {
            const health = createMockHealth()
            authStore.account = createMockAccount({ health })
            await flushPromises()

            // S'assurer que les données sont bien initialisées
            expect(authStore.account?.health).toBeDefined()
            expect(authStore.account?.health?.weight).toBe(75)
            expect(authStore.account?.health?.height).toBe(180)
            expect(authStore.account?.health?.target_weight).toBe(78)
            expect(authStore.account?.health?.target_training).toBe(5)
            expect(authStore.account?.health?.measure_weight).toBe(EnumMeasureWeight.daily)

            const editButton = wrapper.find('button')
            await editButton.trigger('click')

            const inputs = wrapper.findAllComponents(UiInputNumber)
            const weightInput = inputs[0]
            const heightInput = inputs[1]
            const targetWeightInput = inputs[2]
            const targetTrainingInput = inputs[3]
            const measureSelect = wrapper.findComponent(UiSelect)

            // Vérifier que les composants sont bien montés
            expect(weightInput.exists()).toBe(true)
            expect(heightInput.exists()).toBe(true)
            expect(targetWeightInput.exists()).toBe(true)
            expect(targetTrainingInput.exists()).toBe(true)
            expect(measureSelect.exists()).toBe(true)

            // Vérifier les props
            expect(weightInput.props('modelValue')).toBe(75)
            expect(heightInput.props('modelValue')).toBe(180)
            expect(targetWeightInput.props('modelValue')).toBe(78)
            expect(targetTrainingInput.props('modelValue')).toBe(5)
            expect(measureSelect.props('modelValue')).toBe(EnumMeasureWeight.daily)
        })

        it('should validate form fields', async () => {
            authStore.account = createMockAccount()
            await flushPromises()

            const editButton = wrapper.find('button')
            await editButton.trigger('click')
            await flushPromises()

            const inputs = wrapper.findAllComponents(UiInputNumber)
            const weightInput = inputs[0]
            await weightInput.setValue(-1)
            await flushPromises()

            expect(weightInput.props('modelValue')).toBe(-1)
        })
    })

    describe('Mise à jour des données', () => {
        it('should update health data when saving', async () => {
            const health = createMockHealth()
            authStore.account = createMockAccount({ health })
            await flushPromises()

            const updatedHealth = createMockHealth({
                weight: 80,
                height: 185,
                measure_weight: EnumMeasureWeight.weekly,
                target_weight: 78,
                target_training: 5
            })
            accountStore.updateHealth = vi.fn().mockResolvedValue(updatedHealth)

            // Activer le mode édition
            const editButton = wrapper.find('button')
            await editButton.trigger('click')
            await flushPromises()

            // Modifier les données
            const inputs = wrapper.findAllComponents(UiInputNumber)
            const weightInput = inputs[0]
            const heightInput = inputs[1]
            const measureSelect = wrapper.findComponent(UiSelect)

            await weightInput.setValue(80)
            await heightInput.setValue(185)
            await measureSelect.setValue(EnumMeasureWeight.weekly)
            await flushPromises()

            // Soumettre le formulaire
            const form = wrapper.find('form')
            expect(form.exists()).toBe(true)
            await form.trigger('submit')
            await flushPromises()

            expect(accountStore.updateHealth).toHaveBeenCalledWith(1, {
                weight: 80,
                height: 185,
                measure_weight: EnumMeasureWeight.weekly,
                target_weight: 78,
                target_training: 5
            })
        })

        it('should cancel editing and revert changes', async () => {
            const health = createMockHealth()
            authStore.account = createMockAccount({ health })
            await flushPromises()

            // Activer le mode édition
            const editButton = wrapper.find('button')
            await editButton.trigger('click')
            await flushPromises()

            // Modifier les données
            const weightInput = wrapper.find('input[type="number"]')
            await weightInput.setValue(80)
            await flushPromises()

            // Annuler
            const cancelButton = wrapper.findAll('button')[1]
            await cancelButton.trigger('click')
            await flushPromises()

            expect(wrapper.text()).toContain('75') // Vérifie que le poids est revenu à sa valeur initiale
        })
    })

    describe('Calculs', () => {
        it('should calculate BMI correctly', async () => {
            const health = createMockHealth({ weight: 75, height: 180 })
            authStore.account = createMockAccount({ health })
            await flushPromises()

            // IMC = poids (kg) / (taille (m) * taille (m))
            // 75 / (1.80 * 1.80) = 23.15
            expect(wrapper.find('p[id="IMC"]').text()).toContain('23.1')
        })

        it('should display "Non calculable" when height or weight is missing', async () => {
            const health = createMockHealth({ weight: undefined, height: undefined })
            authStore.account = createMockAccount({ health })
            await flushPromises()

            expect(wrapper.text()).toContain('Non calculable')
        })
    })

    describe('Interactions', () => {
        it('should disable edit button while editing', async () => {
            authStore.account = createMockAccount()
            await flushPromises()

            const editButton = wrapper.find('button')
            await editButton.trigger('click')
            await flushPromises()

            expect(editButton.attributes('disabled')).toBeDefined()
        })

        it('should handle frequency selection', async () => {
            const health = createMockHealth()
            authStore.account = createMockAccount({ health })
            await flushPromises()

            const editButton = wrapper.find('button')
            await editButton.trigger('click')
            await flushPromises()

            const measureSelect = wrapper.find('select')
            await measureSelect.setValue(EnumMeasureWeight.monthly)
            await flushPromises()

            expect(measureSelect.element.value).toBe(EnumMeasureWeight.monthly)
        })
    })
})
