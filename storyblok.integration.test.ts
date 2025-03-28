import { config } from 'dotenv'
import { list_components } from './storyblok'

config()

describe('Storyblok Integration', () => {
  it('should fetch real components from Storyblok API', async () => {
    try {
      const components = await list_components()
      console.log('API Response:', components)
      expect(Array.isArray(components)).toBe(true)
      if (components.length > 0) {
        expect(components[0]).toHaveProperty('name')
        expect(components[0]).toHaveProperty('id')
      }
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  })
}) 