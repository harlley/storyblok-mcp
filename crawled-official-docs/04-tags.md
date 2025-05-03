# Tags

Tags are string values that can be utilized to tag stories in a space, contributing to content organization and discovery, SEO, navigation, etc.

**Endpoint**: `/v1/spaces/:space_id/tags/`

## Overview

- [The Tag Object](#the-tag-object)
- [Retrieve Multiple Tags](#retrieve-multiple-tags)
- [Create a Tag](#create-a-tag)
- [Update a Tag](#update-a-tag)
- [Delete a Tag](#delete-a-tag)
- [Tag Bulk Association](#tag-bulk-association)

---

## The Tag Object

The following object represents a tag.

### Properties

| Property        | Type   | Description                              |
|----------------|--------|------------------------------------------|
| name           | string | The complete name provided for the tag   |
| taggings_count | number | How many times this tag has been assigned to a story |

#### Example Object
```json
{
  "name": "Editor's Choice",
  "taggings_count": 11
}
```

---

## Retrieve Multiple Tags

This endpoint returns an array of tag objects from a space.

```
https://mapi.storyblok.com/v1/spaces/:space_id/tags/
```

### Path Parameters

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| :space_id | number | Yes      | Numeric ID of a space    |

### Query Parameters

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| search    | string | No       | Parameter to search by tag name |

### Response Properties

| Property | Type           | Description                              |
|----------|----------------|------------------------------------------|
| tags     | The Tag Object[] | An array of tag objects                  |

#### Example Request with `search` query parameter
```bash
curl "https://mapi.storyblok.com/v1/spaces/606/tags/?search=article" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

#### Example Request with `all_tags` parameter
```bash
curl "https://mapi.storyblok.com/v1/spaces/606/stories/?all_tags=true" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Create a Tag

You can create a tag, and optionally add it to a story.

```
https://mapi.storyblok.com/v1/spaces/:space_id/tags/
```

### Path Parameters

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| :space_id | number | Yes      | Numeric ID of a space    |

### Request Body Properties

| Property  | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| name      | string | Yes      | New tag name             |
| story_id  | number | No       | ID of the story          |

### Response Properties

| Property | Type | Description |
|----------|------|-------------|
| (none)   |      |             |

#### Example Request
```bash
curl "https://mapi.storyblok.com/v1/spaces/606/tags" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -d '{
    "tag": {
      "name": "Editor's Choice",
      "story_id": 202
    }
  }'
```

---

## Update a Tag

This endpoint can be used to edit the name of a tag.

```
https://mapi.storyblok.com/v1/spaces/:space_id/tags/:id
```

### Path Parameters

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| :space_id | number | Yes      | Numeric ID of a space    |
| :id       | number | Yes      | The numeric id of a tag  |

### Request Body Properties

| Property | Type   | Required | Description              |
|----------|--------|----------|--------------------------|
| id       | number | Yes      | Name of the tag (for Management API, the id of a tag refers to its name) |
| tag      | object | Yes      | An object with the new tag name       |

### Example Request
```bash
curl "https://mapi.storyblok.com/v1/spaces/606/stories/2141" \
  -X PUT \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "Editor's Choice",
    "tag": {
      "name": "Editorial"
    }
  }'
```

---

## Delete a Tag

Delete a tag from a space.

```
https://mapi.storyblok.com/v1/spaces/:space_id/tags/:id
```

### Path Parameters

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| :space_id | number | Yes      | Numeric ID of a space    |
| :id       | number | Yes      | The name of the tag you want to delete (for Management API, the id of a tag refers to its name) |

### Response Properties

| Property | Type           | Description                              |
|----------|----------------|------------------------------------------|
| story    | The Story Object | A single story object                    |

#### Example Request
```bash
curl "https://mapi.storyblok.com/v1/spaces/606/stories/2141" \
  -X DELETE \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -d ""
```

---

## Tag Bulk Association

This endpoint is used to add a tag to multiple stories at once.

```
https://mapi.storyblok.com/v1/spaces/:space-id/tags/bulk_association
```

### Path Parameters

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| :space_id | number | Yes      | Numeric ID of a space    |

### Request Body Properties

| Property | Type                  | Description                                                                 |
|----------|----------------------|-----------------------------------------------------------------------------|
| tags     | object (stories[])   | An array of objects, each with a story_id and tag_list (array of tag names) |

#### Example Request
```bash
curl "https://mapi.storyblok.com/v1/spaces/296898/tags/bulk_association" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -d '{
    "tags": {
      "stories": [
        { "story_id": 614542121, "tag_list": ["Featured article", "Newsroom"] },
        { "story_id": 614544107, "tag_list": ["Blog", "Archive", "Marketing"] },
        { "story_id": 614543950, "tag_list": ["Featured article", "Newsroom"] }
      ]
    }
  }'
```
