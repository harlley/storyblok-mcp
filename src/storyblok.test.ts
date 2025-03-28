import { list_components } from './storyblok'

describe('list_components', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      STORYBLOK_SPACE_ID: 'test-space-id',
      STORYBLOK_API_KEY: 'test-api-key'
    }
    global.fetch = jest.fn()
  })

  afterEach(() => {
    process.env = originalEnv
    jest.resetAllMocks()
  })

  it('should fetch and return components from Storyblok', async () => {
    const mockComponents = [
      { name: 'component1', id: 1 },
      { name: 'component2', id: 2 }
    ]

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ components: mockComponents })
    })

    const result = await list_components()

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.storyblok.com/v1/spaces/test-space-id/components',
      {
        headers: {
          Authorization: 'Bearer test-api-key'
        }
      }
    )
    expect(result).toEqual(mockComponents)
  })
}) 