

class storageService {
    setValue = (key: string, value: any) => {
        try {
            const serializedValue = JSON.stringify(value)
            localStorage.setItem(key, serializedValue)
        } catch (error) {
            throw new Error('store serialization failed')
        }
    }
    
    getValue = (key: string) => {
        try {
            const serializedValue = localStorage.getItem(key)
            if (!serializedValue) return
            return JSON.parse(serializedValue)
        } catch (error) {
            throw new Error('store deserialization failed')
        }
    }
    
    cleanAll = () => {
        if (typeof window === 'undefined') return
        try {
            localStorage.clear()
        } catch (error) {
            throw new Error('store deserialization failed')
        }
    }
}

const localStorageService = new storageService()

export default localStorageService