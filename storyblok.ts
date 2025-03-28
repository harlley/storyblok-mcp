import 'isomorphic-fetch'

interface StoryblokComponent {
  name: string
  id: number
}

interface StoryblokResponse {
  components: StoryblokComponent[]
}

export const list_components = async (): Promise<StoryblokComponent[]> => {
  const spaceId = process.env.STORYBLOK_SPACE_ID
  const apiKey = process.env.STORYBLOK_API_KEY
  
  if (!spaceId || !apiKey) {
    throw new Error('Missing required environment variables: STORYBLOK_SPACE_ID or STORYBLOK_API_KEY')
  }

  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${spaceId}/components`, {
    headers: {
      "Authorization": apiKey
    }
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Storyblok API error: ${response.status} ${error}`)
  }
  
  const data = await response.json() as StoryblokResponse
  return data.components
}