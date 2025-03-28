import 'isomorphic-fetch'

interface StoryblokComponent {
  name: string
  id: number
  schema: ComponentSchema
  display_name?: string
  is_root?: boolean
  is_nestable?: boolean
}

interface StoryblokResponse {
  components: StoryblokComponent[]
}

interface ComponentField {
  type: string
  options?: any
}

interface ComponentSchema {
  [key: string]: ComponentField
}

interface CreateComponentPayload {
  component: {
    name: string
    display_name?: string
    schema: ComponentSchema
    is_root?: boolean
    is_nestable?: boolean
  }
}

interface UpdateComponentPayload {
  component: {
    name?: string
    display_name?: string
    schema?: ComponentSchema
    is_root?: boolean
    is_nestable?: boolean
  }
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

export const create_component = async (name: string, schema: ComponentSchema, options: { display_name?: string, is_root?: boolean, is_nestable?: boolean } = {}) => {
  const spaceId = process.env.STORYBLOK_SPACE_ID
  const apiKey = process.env.STORYBLOK_API_KEY
  
  if (!spaceId || !apiKey) {
    throw new Error('Missing required environment variables: STORYBLOK_SPACE_ID or STORYBLOK_API_KEY')
  }

  const payload: CreateComponentPayload = {
    component: {
      name,
      schema,
      ...options
    }
  }

  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${spaceId}/components`, {
    method: 'POST',
    headers: {
      "Authorization": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Storyblok API error: ${response.status} ${error}`)
  }
  
  return await response.json()
}

export const update_component = async (componentId: number, updates: { name?: string, schema?: ComponentSchema, display_name?: string, is_root?: boolean, is_nestable?: boolean }) => {
  const spaceId = process.env.STORYBLOK_SPACE_ID
  const apiKey = process.env.STORYBLOK_API_KEY
  
  if (!spaceId || !apiKey) {
    throw new Error('Missing required environment variables: STORYBLOK_SPACE_ID or STORYBLOK_API_KEY')
  }

  const payload: UpdateComponentPayload = {
    component: {
      ...updates,
      // Pass the schema update directly to the API
      ...(updates.schema && { schema: updates.schema })
    }
  }

  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${spaceId}/components/${componentId}`, {
    method: 'PUT',
    headers: {
      "Authorization": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Storyblok API error: ${response.status} ${error}`)
  }
  
  return await response.json()
}