# Stories

A content entry is called a story inside Storyblok.
The stories endpoint allows you to manage all content entries of your Storyblok space. You can use it to import, export, or modify content.

Endpoint: `/v1/spaces/:space_id/stories/`

## Overview

- [The Story Object](#the-story-object)
- [The Unpublished Story Object](#the-unpublished-story-object)
- [Retrieve One Story](#retrieve-one-story)
- [Get Unpublished Dependencies](#get-unpublished-dependencies)
- [Retrieve Multiple Stories](#retrieve-multiple-stories)
- [Create a Story](#create-a-story)
- [Create and manage folders](#create-and-manage-folders)
- [Update a Story](#update-a-story)
- [Delete a Story](#delete-a-story)
- [Duplicate a Story](#duplicate-a-story)
- [Publish a Story](#publish-a-story)
- [Unpublish a Story](#unpublish-a-story)
- [Export a Story](#export-a-story)
- [Import a Story](#import-a-story)
- [Translate a Story by AI](#translate-a-story-by-ai)
- [Internationalization for Stories](#internationalization-for-stories)
- [Get Story Versions (New)](#get-story-versions-new)
- [Get Story Versions (Legacy)](#get-story-versions-legacy)
- [Compare a Story Version](#compare-a-story-version)

---

## The Story Object

This is an object representing your content entry. One story object can be of different types, called content types, and is able to contain components along with the content. You define the fields and nestability of your content types to achieve your content structure.
You can use this object to build up your entities when migrating or importing content.

### Properties

| Property                      | Type     | Description                                                                                                                               |
| ----------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                          | number   | Numeric id of the story                                                                                                                   |
| `name`                        | string   | The complete name provided for the story                                                                                                  |
| `parent_id`                   | number   | ID of the parent folder                                                                                                                   |
| `group_id`                    | string   | Group ID (UUID string), shared between stories defined as alternates                                                                      |
| `alternates`                  | object[] | An array containing objects that provide basic data of the stories defined as alternates of the current story                         |
| `created_at`                  | string   | Creation date (Format: `yyyy-MM-dd'T'HH:mm:ssZ`)                                                                                           |
| `deleted_at`                  | string   | Deleted date (Format: `YYYY-mm-dd HH:MM`)                                                                                                 |
| `sort_by_date`                | string   | Date defined in the story's entry configuration (Format: `YYYY-mm-dd HH:MM`)                                                              |
| `tag_list`                    | string[] | Array of tag names                                                                                                                        |
| `updated_at`                  | string   | Latest update date (Format: `yyyy-MM-dd'T'HH:mm:ssZ`)                                                                                     |
| `published_at`                | string   | Latest publishing date (Format: `yyyy-MM-dd'T'HH:mm:ssZ`)                                                                                 |
| `uuid`                        | string   | Generated UUID string                                                                                                                     |
| `is_folder`                   | boolean  | `true` if the instance constitutes a folder                                                                                               |
| `content`                     | object   | An object containing the field data associated with the specific story type's specific content structure. Also includes a `component` property with the story type's technical name. |
| `published`                   | boolean  | `true` if a story is currently published, even if it has unpublished changes.                                                             |
| `slug`                        | string   | The slug specific for the story                                                                                                           |
| `path`                        | string   | Value of the real path defined in the story's entry configuration (usually, this value is only required for Storyblok's Visual Editor)      |
| `full_slug`                   | string   | The full slug of the story, combining the parent folder(s) and the designated story slug                                                  |
| `default_root`                | string   | Component name which will be used as default content type for this folders entries                                                        |
| `disable_fe_editor`           | boolean  | Is side by side editor disabled for all entries in folder                                                                                 |
| `parent`                      | object   | Essential parent information as object (resolved from `parent_id`)                                                                        |
| `is_startpage`                | boolean  | `true` if the story is defined as root for the folder                                                                                     |
| `unpublished_changes`         | boolean  | Story has unpublished changes; saved but not published                                                                                    |
| `meta_data`                   | object   | Object to store non-editable data that is exclusively maintained with the [Management API](/docs/api/management/getting-started/organization) |
| `imported_at`                 | string   | Latest import date (Format: `YYYY-mm-dd HH:MM`)                                                                                           |
| `preview_token`               | object   | Preview token                                                                                                                             |
| `pinned`                      | boolean  | To pin the story in the toolbar                                                                                                           |
| `breadcrumbs`                 | object[] | Array of resolved subset of [link objects](#core-resources/the-link-object) (one per path segment / parent)                             |
| `first_published_at`          | string   | First publishing date (Format: `yyyy-MM-dd'T'HH:mm:ssZ`)                                                                                  |
| `last_author`                 | object   | Last author                                                                                                                               |
| `last_author_id`              | number   | Id of the last Author                                                                                                                     |
| `translated_slugs`            | object[] | Array of translated slug objects (if the app [Translatable Slugs](https://www.storyblok.com/apps/translatable-slugs) is installed)         |
| `translated_slugs_attributes` | object[] | Array of translated slug attributes objects (if the app [Translatable Slugs](https://www.storyblok.com/apps/translatable-slugs) is installed) to change translated slugs when creating or updating a story |
| `localized_paths`             | object[] | An array of translated path objects                                                                                                       |
| `position`                    | number   | Numeric representation of the story's position in the folder                                                                              |
| `release_id`                  | number   | ID of the current release (can be requested with the `from_release` API parameter)                                                        |
| `scheduled_dates`             | string   | Scheduled publishing date (Format: `YYYY-mm-dd HH:MM`)                                                                                    |
| `favourite_for_user_ids`      | number[] | Array of user IDs who have added the story in their favorites                                                                             |

#### The `alternates` Object
Each object in the `alternates` array has the following properties:

| Property    | Type    | Description                                                                      |
| ----------- | ------- | -------------------------------------------------------------------------------- |
| `id`        | number  | The numeric ID                                                                   |
| `name`      | string  | The complete name provided for the story                                         |
| `slug`      | string  | The slug specific for the story                                                  |
| `published` | boolean | `true` if a story is currently published, even if it has unpublished changes.    |
| `full_slug` | string  | The full slug of the story, combining the parent folder(s) and the designated story slug |
| `is_folder` | boolean | `true` if the instance constitutes a folder                                      |

#### The `preview_token` Object
| Property    | Type   | Description                                                                             |
| ----------- | ------ | --------------------------------------------------------------------------------------- |
| `token`     | string | The token passed to the editor as preview parameter to allow edit mode verification     |
| `timestamp` | string | Timestamp passed to the editor as preview parameter to allow edit mode verification |

#### The `breadcrumbs` Object
Each object in the `breadcrumbs` array has the following properties:

| Property          | Type     | Description                                                                                                                                |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`              | number   | Story ID                                                                                                                                   |
| `name`            | string   | The complete name provided for the story                                                                                                   |
| `parent_id`       | number   | ID of the parent folder                                                                                                                    |
| `disable_fe_editor` | boolean  | Is side by side editor disabled for all entries in folder                                                                                  |
| `path`            | string   | Value of the real path defined in the story's entry configuration (usually, this value is only required for Storyblok's Visual Editor)       |
| `slug`            | string   | The slug specific for the story                                                                                                            |
| `translated_slugs`| object[] | Array of translated slug objects (if the app [Translatable Slugs](https://www.storyblok.com/apps/translatable-slugs) is installed)          |

##### The `breadcrumbs.translated_slugs` Object
Each object in the `breadcrumbs.translated_slugs` array has the following properties:

| Property   | Type    | Description                                                                        |
| ---------- | ------- | ---------------------------------------------------------------------------------- |
| `story_id` | number  | ID of the story                                                                    |
| `lang`     | string  | Language code of the current language (can be requested with the `language` API parameter) |
| `slug`     | string  | The slug specific for the story                                                  |
| `name`     | string  | The complete name provided for the story                                         |
| `published`| boolean | `true` if a story is currently published, even if it has unpublished changes.      |

#### The `last_author` Object
| Property        | Type   | Description                        |
| --------------- | ------ | ---------------------------------- |
| `id`            | number | Last author user object numeric id |
| `userid`        | string | Last author userid/username        |
| `friendly_name` | string | Friendly name of last author       |

#### The `translated_slugs` Object (Top Level)
Each object in the `translated_slugs` array has the following properties:

| Property   | Type    | Description                                                                        |
| ---------- | ------- | ---------------------------------------------------------------------------------- |
| `story_id` | number  | ID of the story                                                                    |
| `lang`     | string  | Language code of the current language (can be requested with the `language` API parameter) |
| `slug`     | string  | The slug specific for the story                                                  |
| `name`     | string  | The complete name provided for the story                                         |
| `published`| boolean | `true` if a story is currently published, even if it has unpublished changes.      |

#### The `translated_slugs_attributes` Object
Each object in the `translated_slugs_attributes` array has the following properties:

| Property   | Type    | Description                                                                        |
| ---------- | ------- | ---------------------------------------------------------------------------------- |
| `id`       | number  | The numeric ID                                                                     |
| `lang`     | string  | Language code of the current language (can be requested with the `language` API parameter) |
| `slug`     | string  | The slug specific for the story                                                  |
| `name`     | string  | The complete name provided for the story                                         |
| `published`| boolean | `true` if a story is currently published, even if it has unpublished changes.      |

#### The `localized_paths` Object
Each object in the `localized_paths` array has the following properties:

| Property   | Type    | Description                                                                                                                              |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `path`     | string  | Value of the real path defined in the story's entry configuration (usually, this value is only required for Storyblok's Visual Editor) |
| `name`     | string  | The complete name provided for the story                                                                                                 |
| `lang`     | string  | Language code of the current language (can be requested with the `language` API parameter)                                             |
| `published`| boolean | `true` if a story is currently published, even if it has unpublished changes.                                                            |

### Example Object

```json
{
  "story": {
    "name": "My third post",
    "parent_id": 0,
    "group_id": "2b29b0e9-bf7a-4443-b250-aa52a7ec64f2",
    "alternates": [],
    "created_at": "2023-05-29T09:53:40.231Z",
    "deleted_at": null,
    "sort_by_date": null,
    "tag_list": [],
    "updated_at": "2024-04-26T10:25:22.669Z",
    "published_at": "2024-04-26T10:25:22.654Z",
    "id": 369689,
    "uuid": "039508c6-e9fa-42b5-b952-c7d96ab6099d",
    "is_folder": false,
    "content": {
      "_uid": "98cccd01-f807-4494-996d-c6b0de2045a5",
      "component": "your_content_type"
      // fields you define yourself are in here
    },
    "published": true,
    "slug": "my-third-post",
    "path": null,
    "full_slug": "posts/my-third-post", // automatically generated
    "default_root": null,
    "disable_fe_editor": false,
    "parent": {
      "id": 369683,
      "slug": "posts",
      "name": "Posts",
      "disable_fe_editor": true,
      "uuid": "dcfcc350-e63e-4232-8dcb-ba4b8e70799d"
    },
    "is_startpage": false,
    "unpublished_changes": false,
    "meta_data": null,
    "imported_at": "2024-03-11T13:13:14.711Z",
    "preview_token": {
      "token": "279395174a25be38b702f9ec90d08a960e1a5a84",
      "timestamp": "1714129418"
    },
    "pinned": false,
    "breadcrumbs": [], // resolved full_slug parts
    "first_published_at": "2023-06-06T08:47:05.426Z",
    "last_author": {
      "id": 10961,
      "userid": "user@storyblok.com",
      "friendly_name": "Chakit Arora"
    },
    "last_author_id": 10961,
    "translated_slugs": [
      {
        "lang": "de",
        "slug": "the-german-blog-slug",
        "name": null,
        "published": null
      }
    ],
    "localized_paths": [
      {
        "path": "the-german-blog-slug",
        "name": null,
        "lang": "de",
        "published": true
      }
      // All locales present
    ],
    "position": 0,
    "scheduled_dates": "2024-05-08T18:59:00.000Z",
    "favourite_for_user_ids": [
      110930
    ]
  }
}
```
*Note: Corrected typos `disble_fe_editor` to `disable_fe_editor` in the example JSON based on the property table.*
*Note: The property table lists `scheduled_dates` but describes the format for `scheduled_at`. The example uses `scheduled_dates`. Kept example property name.*
*Note: The property table lists `translated_slugs_attributes` but it's not present in the example object. This property is likely only used for write operations.*

---

## The Unpublished Story Object

This is an object representing an unpublished story.

### Properties

| Property              | Type    | Description                                                                                                             |
| --------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `id`                  | number  | Numeric id of the story                                                                                                 |
| `name`                | string  | The complete name provided for the story                                                                                |
| `parent_id`           | number  | ID of the parent folder                                                                                                 |
| `updated_at`          | string  | Latest update date (Format: `yyyy-MM-dd\'T\'HH:mm:ssZ`)                                                                   |
| `published_at`        | string  | Latest publishing date (Format: `yyyy-MM-dd\'T\'HH:mm:ssZ`)                                                               |
| `published`           | boolean | `true` if a story is currently published, even if it has unpublished changes.                                           |
| `slug`                | string  | The slug specific for the story                                                                                         |
| `path`                | string  | Value of the real path defined in the story\'s entry configuration (usually, this value is only required for Storyblok\'s Visual Editor) |
| `full_slug`           | string  | The full slug of the story, combining the parent folder(s) and the designated story slug                                  |
| `unpublished_changes` | boolean | Story has unpublished changes; saved but not published                                                                  |

*Note: This list seems incomplete compared to the full Story Object. The official documentation page for this specific object only lists these properties.*

### Example Object

```json
{
    "story": {
        "name": "My third post",
        "parent_id": 0,
        "group_id": "2b29b0e9-bf7a-4443-b250-aa52a7ec64f2",
        "alternates": [],
        "created_at": "2023-05-29T09:53:40.231Z",
        "deleted_at": null,
        "sort_by_date": null,
        "tag_list": [],
        "updated_at": "2024-04-26T10:25:22.669Z",
        "published_at": "2024-04-26T10:25:22.654Z",
        "id": 369689,
        "uuid": "039508c6-e9fa-42b5-b952-c7d96ab6099d",
        "is_folder": false,
        "content": {
          "_uid": "98cccd01-f807-4494-996d-c6b0de2045a5",
          "component": "your_content_type"
          // fields you define yourself are in here
        },
        "published": true,
        "slug": "my-third-post",
        "path": null,
        "full_slug": "posts/my-third-post", // automatically generated
        "default_root": null,
        "disable_fe_editor": false, // Corrected typo from 'disble_fe_editor'
        "parent": {
          "id": 369683,
          "slug": "posts",
          "name": "Posts",
          "disable_fe_editor": true, // Corrected typo from 'disble_fe_editor'
          "uuid": "dcfcc350-e63e-4232-8dcb-ba4b8e70799d"
        },
        "is_startpage": false,
        "unpublished_changes": false,
        "meta_data": null,
        "imported_at": "2024-03-11T13:13:14.711Z",
        "preview_token": {
            "token": "279395174a25be38b702f9ec90d08a960e1a5a84",
            "timestamp": "1714129418"
        },
        "pinned": false,
        "breadcrumbs": [], // resolved full_slug parts
        "first_published_at": "2023-06-06T08:47:05.426Z",
        "last_author": {
            "id": 10961,
            "userid": "user@storyblok.com",
            "friendly_name": "Chakit Arora"
        },
        "last_author_id": 10961,
        "translated_slugs": [
            {
                "lang": "de",
                "slug": "the-german-blog-slug",
                "name": null,
                "published": null
            }
        ],
        "localized_paths": [
            {
                "path": "the-german-blog-slug",
                "name": null,
                "lang": "de",
                "published": true
            }
            // All locales present
        ],
        "position": 0,
        "scheduled_dates": "2024-05-08T18:59:00.000Z",
        "favourite_for_user_ids": [
            110930
        ]
    }
}
```
*Note: The example object provided in the official documentation for the "Unpublished Story Object" appears to be identical to the example for the main "Story Object", including properties not listed in the "Unpublished Story Object" properties table (like `group_id`, `alternates`, `content`, etc.) and showing `published: true` and `unpublished_changes: false`. This seems contradictory. I have included the example as shown in the official docs but added this note.*
*Note: Corrected typos `disble_fe_editor` to `disable_fe_editor` in the example JSON based on the property table of the main Story Object.*

---

## Retrieve One Story

This endpoint returns a single, fully loaded story object by providing a specific numeric id.

`GET https://mapi.storyblok.com/v1/spaces/:space_id/stories/:story_id`

### Path Parameters

| Parameter   | Type   | Required | Description          |
| ----------- | ------ | -------- | -------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space|
| `:story_id` | number | Yes      | Numeric id of story |

### Response Properties

| Property | Type           | Description                                                                                                                               |
| -------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `story`  | The Story Object | A single [story object](https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/the-story-object). You will receive a fully loaded story object as response. |

*Note: The official documentation page for this specific endpoint does not list any Query Parameters. The link provided for the response story object points to the Content Delivery API documentation.*

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Get Unpublished Dependencies

This endpoint is used to get unpublished dependencies of a story.

`POST https://mapi.storyblok.com/v1/spaces/:space_id/stories/unpublished_dependencies`

### Path Parameters

| Parameter   | Type   | Required | Description          |
| ----------- | ------ | -------- | -------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space|

### Request Body Properties

| Property    | Type     | Required | Description                                                                                           |
| ----------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `story_ids` | number[] | Yes      | List of story IDs                                                                                     |
| `release_id`| number   | No       | ID of a release. If this is passed, the endpoint looks for unpublished dependencies in this specific release. |

### Response Properties

| Property              | Type                             | Description                                   |
| --------------------- | -------------------------------- | --------------------------------------------- |
| `unpublished_stories` | The Unpublished Story Object[] | An array of story objects that are unpublished |

*Note: The specific structure of the items within `unpublished_stories` should follow [The Unpublished Story Object](#the-unpublished-story-object) definition, although that definition itself has noted inconsistencies in the official docs.*

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/unpublished_dependencies" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -d '{
    "story_ids": [522672112, 534980620]
  }'
```

---

## Retrieve Multiple Stories

This endpoint returns an array of story objects **without** `content`. Stories can be filtered with the parameters below. The response is [paged](/docs/api/management/getting-started/pagination).

With the query parameter of `with_summary=1`, it allows you to get the root-level or same-level attributes from multiple stories. If there is no flag set, `content_summary` objects on stories will be empty. It can be used to access some field-types inside the content that are served with the multiple stories.

`GET https://mapi.storyblok.com/v1/spaces/:space_id/stories/`

### Path Parameters

| Parameter   | Type   | Required | Description          |
| ----------- | ------ | -------- | -------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space|

### Query Parameters

| Parameter          | Type           | Description                                                                                                                                                                                                                                                                                                                         |
| ------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page`             | number         | Current page of stories                                                                                                                                                                                                                                                                                                             |
| `per_page`         | number         | Results per page. Max `100`. Default `25`.                                                                                                                                                                                                                                                                                        |
| `contain_component`| string         | Filters by component in all levels of the content. Allows comma separated value for multiple components                                                                                                                                                                                                                           |
| `text_search`      | string         | Filter by a term using full text search                                                                                                                                                                                                                                                                                             |
| `sort_by`          | string         | Sort entries by specific attribute and order with `content.YOUR_FIELD:asc` and `content.YOUR_FIELD:desc`. To sort integers append `:int`. To sort floats append `:float`. Possible values are all root attributes of the entry (`position` and `parent_position` are special invisible attributes) and all fields of your content type inside `content` with a dot as separator. Example: 'position:asc', 'parent_position:asc', 'content.your_custom_field:asc', 'content.your_number_field:asc:int', 'created_at:desc'. |
| `pinned`           | boolean        | Filter by pinned stories if '1'                                                                                                                                                                                                                                                                                                   |
| `excluding_ids`    | string         | Exclude specific stories by providing their IDs as a comma-separated string. Example: `excluding_ids=335015953,335015954`                                                                                                                                                                                                       |
| `by_ids`           | string         | Filter by ids (comma separated)                                                                                                                                                                                                                                                                                                     |
| `by_uuids`         | string         | Retrieve specific stories by providing their UUIDs as a comma-separated string. Example: `by_uuids=a78b2116-c26d-4d23-9cbe-fec477847b0e,9683820e-fc17-429e-ba23-eb41f26c0776`                                                                                                                                          |
| `with_tag`         | string         | Filter by specific tag(s). Multiple tags can be provided as a comma-separated string (treated like an OR operator). Examples: `with_tag=featured`, `with_tag=featured,editors_choice`                                                                                                                                      |
| `folder_only`      | boolean        | Filter by folders only                                                                                                                                                                                                                                                                                                              |
| `story_only`       | boolean        | Filter by stories only                                                                                                                                                                                                                                                                                                              |
| `with_parent`      | number         | Filter by parent `id`                                                                                                                                                                                                                                                                                                               |
| `starts_with`      | string         | Filter stories starting with a specific slug                                                                                                                                                                                                                                                                                        |
| `in_trash`         | boolean        | Filter by items in the trash folder                                                                                                                                                                                                                                                                                                 |
| `search`           | string         | Filter by search term                                                                                                                                                                                                                                                                                                               |
| `filter_query`     | string / object| Filter by specific attribute(s) of your content type. See [Content Delivery API Documentation](https://www.storyblok.com/docs/api/content-delivery/v2#filter-queries/overview).                                                                                                                                                        |
| `in_release`       | number         | Filter items by the release id                                                                                                                                                                                                                                                                                                      |
| `is_published`     | boolean        | `true` for entries that are currently published; `false` for those that are currently not published or unpublished                                                                                                                                                                                                              |
| `by_slugs`         | string         | Retrieve stories by comma-separated `full_slug`. It is possible to specify wildcards by using `*`. Examples: `by_slugs=posts/my-third-post,posts/my-second-post`, `by_slugs=posts/*`                                                                                                                                            |
| `mine`             | boolean        | Filters all the stories assigned to the current user whose token is being used                                                                                                                                                                                                                                                  |
| `excluding_slugs`  | string         | Exclude stories by specifying comma-separated values of `full_slug`. It is possible to specify wildcards by using `*`. Examples: `excluding_slugs=posts/my-third-post,posts/my-second-post`, `excluding_slugs=posts/*`                                                                                                               |
| `in_workflow_stages`| number        | Retrieve stories that are in a particular workflow stage by providing a comma-separated list of workflow stage IDs. Workflow stage IDs can be retrieved via the [Management API](/docs/api/management/core-resources/workflow-stage/workflow-stage). Example: `in_workflow_stages=325604,325605`                                         |
| `by_uuids_ordered` | string         | Retrieve specific stories by providing their UUIDs as a comma-separated string. The order of the stories in the response matches the order in which the UUIDs are listed. Example: `by_uuids_ordered=a78b2116-c26d-4d23-9cbe-fec477847b0e,9683820e-fc17-429e-ba23-eb41f26c0776`                                                             |
| `with_slug`        | string         | Filter by exact slug. Make sure to use the full slug.                                                                                                                                                                                                                                                                           |
| `with_summary`     | number         | If added (set to `1`), returns `content_summary` object with relevant information. Default: `0`                                                                                                                                                                                                                                 |
| `scheduled_at_gt`  | string         | Filter stories that are scheduled after the provided date (Format: `yyyy-MM-dd'T'HH:mm:ssZ`)                                                                                                                                                                                                                                 |
| `scheduled_at_lt`  | string         | Filter stories that are scheduled before the provided date (Format: `yyyy-MM-dd'T'HH:mm:ssZ`)                                                                                                                                                                                                                                 |
| `favourite`        | boolean        | Filter by your favourites.                                                                                                                                                                                                                                                                                                      |
| `reference_search` | string         | Filter by references. Can be used for texts (partial search supported) and other references like assets. Example - stories with specific asset. For stories with a specific asset, complete URL of an asset is recommended for specific results. Names are also valid but will include the results found with content search as well. |

*Note: Several parameters related to resolving links, assets, and relations present in previous versions are not listed on the current dedicated documentation page for this endpoint.*

### Response

Returns an array of [Story objects](#the-story-object) in the `stories` property, without the `content` field unless `with_summary=1` is used. Pagination information is provided in the response headers (`Total`, `Per-Page`, `Link`).

```json
{
  "stories": [
    {
      // ... story object 1 (without content field by default) ...
    },
    {
      // ... story object 2 (without content field by default) ...
    }
    // ...
  ]
}
```

### Example Requests

**Basic Request:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

**Request with `text_search`:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/?text_search=My+fulltext+search" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

**Request with `by_uuids`:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/?by_uuids=UUID1,UUID2" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Create a Story

You can set most of the fields that are available in the story object, below we only list the properties in the example and the possible required fields. Stories are not published by default. If you want to create a published story add the parameter `publish` with the value `1`.

You can save any data in the `story[content]` attribute, and use it in the editor, as long as you follow these rules:
*   The `story[content]` property needs to be an object at the root level
*   Every object inside needs to have the property `"component":"your_components_name"`
*   Only nest components using arrays, except if you want to build a [custom field type](https://www.storyblok.com/plugins).
*   Every nested object which is a `component` or [custom field type](https://www.storyblok.com/plugins) needs a `_uid` property.
This lets you import data and define the schema of your components afterwards in the interface where necessary.

`POST https://mapi.storyblok.com/v1/spaces/:space_id/stories/`

### Path Parameters

| Parameter   | Type   | Required | Description          |
| ----------- | ------ | -------- | -------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space|

### Request Body Properties

| Property   | Type            | Required | Description                                                                                                    |
| ---------- | --------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `story`    | The Story Object| Yes      | A [story object](#the-story-object) containing the desired properties for the new story. See table below for common properties. |
| `publish`  | number          | No       | Should the story be published immediately (set `1` to publish)                                                  |
| `release_id`| number         | No       | ID of the release to add the story to.                                                                           |

**Common `story` Object Properties for Creation:**

| Property                      | Type     | Required | Description                                                                                                         |
| ----------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `name`                        | string   | Yes      | Name of the story.                                                                                                  |
| `slug`                        | string   | Yes      | Slug for the story. Must be unique within its folder.                                                               |
| `content`                     | object   | Yes      | The content object, following the rules above (must include `component`).                                            |
| `parent_id`                   | number   | No       | ID of the parent folder. Default: `0` (root).                                                                       |
| `is_folder`                   | boolean  | No       | Set to `true` to create a folder.                                                                                   |
| `is_startpage`                | boolean  | No       | Define this story as the startpage/root entry for its folder.                                                       |
| `default_root`                | string   | No       | If creating a folder (`is_folder: true`), define the default component for new stories within it.                     |
| `disable_fe_editor`           | boolean  | No       | If creating a folder (`is_folder: true`), disable the visual editor for stories in this folder.                       |
| `path`                        | string   | No       | Define a custom path for the visual editor.                                                                         |
| `tag_list`                    | string[] | No       | Array of tag names to apply.                                                                                        |
| `meta_data`                   | object   | No       | Custom non-editable key/value data.                                                                                 |
| `sort_by_date`                | string   | No       | Set a date for sorting purposes (Format: `YYYY-mm-dd HH:MM`).                                                       |
| `position`                    | number   | No       | Define the position within the folder.                                                                              |
| `first_published_at`          | string   | No       | Set the initial publish date (Format: `yyyy-MM-dd'T'HH:mm:ssZ`). Only effective if `publish: 1` is also sent.      |
| `translated_slugs_attributes` | object[] | No       | Array of [translated slug attributes objects](#the-translated_slugs_attributes-object) for internationalization.    |
| `lang_code`                   | string   | No       | If creating a translated version, specify the language code. Needs `group_id` as well.                               |
| `group_id`                    | string   | No       | If creating a translated version, provide the `uuid` of the original story. Needs `lang_code` as well.               |

### Response Properties

| Property | Type           | Description                                                                                                                                                           |
| -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story`  | The Story Object | The created [story object](https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/the-story-object). (Link points to Content Delivery API docs). |

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -d '{
    "story": {
      "name": "Story Name",
      "slug": "story-name",
      "content": {
        "component": "page",
        "body": []
      }
    },
    "publish": 1
  }'
```

---

## Create and manage folders

Use the Story endpoint to create and manage content folders.

`POST/PUT https://mapi.storyblok.com/v1/spaces/:space_id/stories/` (Use POST to create, PUT to update)

You can use a small subset of properties from the Story Object to push new folders into your space or modify their configurations:
*   Use `name` and `slug` to identify the folder.
*   Always pass `true` to the `is_folder` property in the Request Body.
*   Use `parent_id` to determine where the folder should be created.
*   You can also update existent folders to accept only specific content types (see examples).

### Path Parameters

| Parameter   | Type   | Required | Description          |
| ----------- | ------ | -------- | -------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space|

### Request Body Properties

| Property | Type           | Description                                                                                                                                                              |
| -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `story`  | The Story Object | A [story object](#the-story-object) containing the folder properties. Key properties for folders are `name`, `slug`, `is_folder: true`, `parent_id`, `default_root`, `content.content_types`. |

### Response Properties

| Property | Type           | Description                                                                                                                                                           |
| -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story`  | The Story Object | The created or updated folder [story object](https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/the-story-object). (Link points to Content Delivery API docs). |

### Example Requests

**Create a new folder:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -d '{
    "story": {
      "name": "A new folder",
      "slug": "a-new-folder",
      "is_folder": true,
      "parent_id": 0
    }
  }'
```

**Create a folder restricted to 'article' content type:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -d '{
    "story": {
      "name": "Article Folder",
      "slug": "article-folder",
      "is_folder": true,
      "parent_id": 0,
      "default_root": "article"
    }
  }'
```

**Update a folder to restrict content types:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/FOLDER_STORY_ID" \
  -X PUT \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "story": {
      "name": "Categories",
      "slug": "categories",
      "is_folder": true,
      "parent_id": 0,
      "content": {
        "content_types": ["category"],
        "lock_subfolders_content_types": false
      }
    }
  }'
```

---

## Update a Story

This endpoint can be used for migrations, updates (e.g. if you changed your component structure), or bulk actions. If you want to publish your story immediately, add the parameter `publish` with the value `1` to the object.

To set alternate versions of a story, you can set the `group_id` equal to the `group_id` of the story (or stories) that should be the alternate(s). Two stories are alternates with each other when their group IDs are the same.

`PUT https://mapi.storyblok.com/v1/spaces/:space_id/stories/:story_id`

### Path Parameters

| Parameter   | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space |
| `:story_id` | number | Yes      | The numeric id of story |

### Request Body Properties

| Property     | Type           | Description                                                                                                                                                                                                                                                                           |
| ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story`      | The Story Object | A single [story object](#the-story-object) containing the properties you want to update. Include only the fields you wish to change. Common editable fields include `name`, `slug`, `content`, `parent_id`, `is_startpage`, `tag_list`, `meta_data`, `sort_by_date`, `position`, etc. |
| `group_id`   | string         | Group ID (UUID string), shared between stories defined as alternates. Use this to link translations.                                                                                                                                                                                  |
| `force_update`| string        | If this is `"1"`, the request can overwrite a locked story. Note that a user currently editing the story (which is why it was locked) will encounter a content conflict model. Importantly, note that `force_update` does not work when editing is locked for the workflow stage that the story currently is in. |
| `release_id` | number         | Numeric ID of release (optional)                                                                                                                                                                                                                                                      |
| `publish`    | number         | Should the story be published immediately (set `1` to publish)                                                                                                                                                                                                                        |
| `lang`       | string         | Language code to publish the story individually (must be enabled in the space settings)                                                                                                                                                                                               |
| `move`       | number         | *Previously documented, but not present on current page:* Set to the target `folder_id` to move the story. Should be included alongside `"parent_id": FOLDER_ID` inside the `story` object.                                                                                      |

*Note: To prevent overwriting concurrent edits, it's recommended to include the `updated_at` timestamp (retrieved from a previous GET request) within the `story` object in your PUT request. The API will reject the update if the story has been modified since that timestamp, unless `force_update="1"` is used.*

### Response Properties

| Property | Type           | Description                                                                                                                                                           |
| -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story`  | The Story Object | The updated [story object](https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/the-story-object). (Link points to Content Delivery API docs). |

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID" \
  -X PUT \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "story": {
      "name": "Updated Story Name",
      "slug": "story-name",
      "id": STORY_ID,
      "content": {
        "component": "page",
        "body": []
      }
    },
    "force_update": "1",
    "publish": 1
  }'
```

---

## Delete a Story

Delete a content entry by using its numeric id.

`DELETE https://mapi.storyblok.com/v1/spaces/:space_id/stories/:story_id`

### Path Parameters

| Parameter   | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space |
| `:story_id` | number | Yes      | The numeric id of story |

### Response Properties

| Property | Type           | Description                                                                                                                                                           |
| -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story`  | The Story Object | The deleted [story object](https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/the-story-object). (Link points to Content Delivery API docs). |

*Note: The returned story object typically includes a `deleted_at` timestamp indicating the deletion time, although this is not explicitly mentioned in the Response Properties section of the current online documentation page.*

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID" \
  -X DELETE \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -d ""
```

---

## Duplicate a Story

This endpoint can be used to duplicate a story into another folder.

A common use case of this endpoint is to create an alternate version of a story for internationalization or localization purposes. It is recommended to install the [Dimensions app](https://www.storyblok.com/apps/locales) to auto-create links between stories in different languages.

`POST https://mapi.storyblok.com/v1/spaces/:space_id/stories/:story_id/duplicate`

### Path Parameters

| Parameter   | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space |
| `:story_id` | number | Yes      | ID of the story       |

### Request Body Properties

| Property         | Type            | Description                                                                                                          |
| ---------------- | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| `story`          | The Story Object| Optional. Any attributes sent here will be copied to the duplicated story. To link duplicated stories as alternates, specify a `group_id` in the `story` object. |
| `target_dimension`| number         | Optional. The `id` of the target folder.                                                                             |
| `same_path`      | boolean         | Optional. If set to `true`, the current story's `path` attribute will used for the duplicated story.                   |

### Response Properties

| Property | Type           | Description                                                                                                                                                                  |
| -------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story`  | The Story Object | The newly created (duplicated) [story object](https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/the-story-object). (Link points to Content Delivery API docs). |

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/SOURCE_STORY_ID/duplicate" \
  -X POST \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "target_dimension": TARGET_FOLDER_ID,
    "story": {
      "group_id": "UUID_OF_ORIGINAL_STORY_OR_GROUP"
    },
    "same_path": true
  }'
```

*Note: The online documentation example uses PUT, but the endpoint description specifies POST. This example uses POST as per the endpoint description.*

---

## Publish a Story

Publishing a story (besides using the `publish` property via creation) can be done by sending a GET request for each story you want to publish with `story_id` using the following endpoint.

Multiple language versions of a story can be published using the `lang` parameter (Publish translations individually has to be enabled in Settings > Internationalization).

`GET https://mapi.storyblok.com/v1/spaces/:space_id/stories/:story_id/publish`

### Path Parameters

| Parameter   | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space |
| `:story_id` | number | Yes      | The numeric id of story |

### Query Parameters

| Parameter | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| `lang`    | string | Accept a list of languages codes separated by a comma, e.g.: `lang=es,pt-br,[default]` |

### Request Body Properties

| Property    | Type   | Description                     |
| ----------- | ------ | ------------------------------- |
| `release_id`| number | Numeric ID of release (Optional) |

*Note: Sending a request body with a GET request is unconventional. Verify API behavior.* 

### Response

Returns the published [Story object](#the-story-object) with updated `published_at`, `published: true`, and `unpublished_changes: false`.

```json
{
  "story": {
    // ... published story object properties ...
    "published": true,
    "unpublished_changes": false,
    "published_at": "YYYY-MM-DDTHH:mm:ss.sssZ" // Updated timestamp
  }
}
```
*Note: The response structure is based on previous documentation/expected behavior, as the current online page does not explicitly detail the response.* 

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID/publish?lang=de" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

*Note: The bulk publishing endpoint (`POST .../publish_languages`) mentioned in previous versions is not present on the current documentation page.*

---

## Unpublish a Story

Unpublishing a story (besides using the `unpublish` action in visual editor or in content viewer) can be done by using a GET request for each story you want to unpublish.

Multiple language versions of a story can be unpublished using the `lang` parameter (Publish translations individually has to be enabled in Settings > Internationalization).

`GET https://mapi.storyblok.com/v1/spaces/:space_id/stories/:story_id/unpublish`

### Path Parameters

| Parameter   | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space |
| `:story_id` | number | Yes      | The numeric id of story |

### Query Parameters

| Parameter | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| `lang`    | string | Accept a list of languages codes separated by a comma, e.g.: `lang=es,pt-br,[default]` |

### Response

Returns the unpublished [Story object](#the-story-object) with `published: false`. The `published_at` timestamp remains the last time it was published.

```json
{
  "story": {
    // ... unpublished story object properties ...
    "published": false
  }
}
```
*Note: The response structure is based on previous documentation/expected behavior, as the current online page does not explicitly detail the response.* 

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID/unpublish" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Export a Story

Exporting a story can be done using a GET request for each story you want to export.

*Note: Exporting stories is available exclusively on higher-tier plans. Please refer to Storyblok's [Pricing](https://www.storyblok.com/pricing) for further information.*

`GET https://mapi.storyblok.com/v1/spaces/:space_id/stories/:story_id/export.json`

### Path Parameters

| Parameter   | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space |
| `:story_id` | number | Yes      | ID of the story       |

### Query Parameters

| Parameter   | Type    | Description                                                     |
| ----------- | ------- | --------------------------------------------------------------- |
| `version`   | string  | Default: `"1"`. Possible values: `"1"`, `"2"`.               |
| `lang_code` | string  | The language code for which the export should happen          |
| `export_lang`| boolean| If the values of the `lang_code` should be exported or not      |

### Response

Returns a JSON object representing the story content optimized for translation workflows.

**Example v2 response structure:**
```json
{
  "59ea90a7-c548-4d96-ae11-3d4ed40a5176:dp_richtext:richtext:content/content[0].content[0].text": "Dummy text content",
  "59ea90a7-c548-4d96-ae11-3d4ed40a5176:dp_richtext:richtext:content/content[1].attrs.body[0].content.content[0].content[0].text": "This is a hint component",
  "i-19d10cb3-3884-45bf-a1c4-5f27e852d636:dp_hint:color": "green",
  "i-19d10cb3-3884-45bf-a1c4-5f27e852d636:dp_hint:richtext:content/content[0].content[0].text": "This is a hint component",
  "6fae1c25-6c32-4268-8d52-173e8ca4996a:dp_page:og_title": "",
  "page": "592234781",
  "language": "default",
  "url": "docs/plugins/tool-plugins",
  "text_nodes": 0
}
```
*Note: In version 1, richtext fields were stringified. Version 2 exports them directly as text and preserves nested block structure, useful for translation.*

### Example Requests

**Export specific language:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID/export.json?lang_code=pt-br&export_lang=true" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

**Export using version 2:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID/export.json?lang_code=pt-br&export_lang=true&version=2" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Import a Story

Importing a story can be done using a PUT request for each story you want to import.

*Note: Importing stories is available exclusively on higher-tier plans. Please refer to Storyblok's [Pricing](https://www.storyblok.com/pricing) for further information.*

`PUT https://mapi.storyblok.com/v1/spaces/:space_id/stories/:story_id/import.json`

### Path Parameters

| Parameter   | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space |
| `:story_id` | number | Yes      | The numeric id of story to import/update |

### Query Parameters

| Parameter   | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| `version`   | string  | Default: `"1"`. Possible values: `"1"`, `"2"`. |
| `lang_code` | string  | A language code                                  |
| `import_lang`| boolean| It shows to import language code or not.         |

### Request Body Properties

| Property | Type           | Description                                                                                                                                                                                                                   |
| -------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story`  | The Story Object | A single [story object](#the-story-object) containing the data to import. When using data from the export endpoint (especially v2), the structure might differ from the standard story object and needs to be provided as-is. |

### Response Properties

| Property | Type           | Description                                                                                                                                                                 |
| -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story`  | The Story Object | The imported/updated [story object](https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/the-story-object). (Link points to Content Delivery API docs). |

### Example Request

```bash
# Example importing data (potentially from an export.json v2 file)
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID/import.json?lang_code=pt-br&import_lang=true&version=2" \
  -X PUT \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ 
    # Paste the JSON content from the export.json file here, 
    # or construct the story object as needed.
    # Example snippet based on online docs:
    "story": {
       "name": "Home",
       "parent_id": 0,
       "group_id": "fb33b858-277f-4690-81fb-e0a080bd39ac",
       "id": STORY_ID, 
       "uuid": "2497c493-168a-443f-bbb1-ccfd6340d319", 
       # ... other story properties based on export format or desired update ...
       "content": {
         "component": "your_content_type",
         "_uid": "98cccd01-f807-4494-996d-c6b0de2045a5",
         # ... content fields based on export format or desired update ...
       }
    } 
  }'
```
*Note: The online documentation example shows `Content-Type: multipart/form-data` which seems incorrect for a JSON body. This example uses `application/json`. Verify correct Content-Type if issues arise.* 
*Note: When using the import endpoint with version 2 data, stories no longer need to be stringified. Simply use the exported stories from v2 as-is to ensure compatibility with the updated structure.*

---

## Translate a Story by AI

This endpoint returns the story content, translated by AI.

**Important:** This endpoint will **not** create or update any story. It will only return the content with the internationalized keys and values for the specific language. Please refer to [Update a Story](#update-a-story) to apply the translation.

`GET https://mapi.storyblok.com/v1/spaces/:space_id/stories/:story_id/ai_translate`

### Path Parameters

| Parameter   | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space |
| `:story_id` | number | Yes      | Numeric id of story   |

### Query Parameters

| Parameter   | Type    | Required | Description                                      |
| ----------- | ------- | -------- | ------------------------------------------------ |
| `lang`      | string  | Yes      | The language code of the target language.        |
| `overwrite` | boolean | No       | *(Appears in example, not documented)* Defaults to `false`. If true, might influence how existing translations are handled? |

### Response Properties

| Property | Type           | Description                                                                                                                                                                                 |
| -------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `story`  | The Story Object | A single [story object](https://www.storyblok.com/docs/api/content-delivery/v2#core-resources/stories/the-story-object), containing the translated fields in its `content` property. |

*Note: The exact structure of the translated `content` is not fully detailed in the documentation.*

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID/ai_translate?lang=fr&overwrite=false" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Internationalization for Stories

If you use Storyblok's field-level translation functionality, you will also receive the translated content while fetching the story. Translated content can be viewed just next to the default content. Translated fields will have appended `__i18n__` to the field name followed by the language code.

Similarly, for creating or updating content, you can provide the values for the translations/languages within the same content object by appending `__i18n__` followed by the language code. Make sure to have the component field option `translatable` set to `true`.

Get a [full list of our languages codes](https://gist.github.com/DominikAngerer/f685f2c988171faef3fb6c2ffff4c78c) on Github.

### Example Story Response (Field-Level Translation)

```json
{
  "story": {
    // ... other story properties ...
    "content": {
      "_uid": "61a81f04-fb28-41f1-897a-8614df7f4143",
      "component": "post", 
      "headline": "This is awesome!",
      "headline__i18n__de": "Das ist toll!"
      // ... other content fields ...
    }
    // ... other story properties ...
  }
}
```

### Example Request (Create/Update with Field-Level Translation)

```bash
# Example using POST to create a story with translated fields
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -d '{
    "story": {
      "name": "My First Article",
      "slug": "first-post",
      "content": {
        "component": "post",
        "headline": "This is awesome!",
        "headline__i18n__de": "Das ist toll!"
      }
    },
    "publish": 1
  }'
```

*Note: Previous documentation for this section described creating separate alternate stories using `lang_code` and `group_id`. This approach is no longer detailed on this specific documentation page, although `group_id` is still mentioned in the "Update a Story" section online. This page now focuses solely on field-level translation.* 
*Note: Parameters like `language` and `fallback_lang` for retrieving specific language versions, and properties like `translated_slugs` / `translated_slugs_attributes` are also not mentioned on this specific page anymore.*

---

## Get Story Versions (New)

This allows you to retrieve the versions of a story and the corresponding author information. You can also filter the results based on pagination using the `page` parameter. This can be done with a GET request on the story version you wish to retrieve.

*Note: This endpoint returns story versions created after 2024-08-28. For older versions, use the [legacy endpoint](#get-story-versions-legacy).*

`GET https://mapi.storyblok.com/v1/spaces/:space_id/story_versions`

### Path Parameters

| Parameter   | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space |

### Query Parameters

| Parameter     | Type   | Required | Description                                                                                                                            |
| ------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `by_story_id` | number | Yes      | ID of the story. When this is passed, the endpoint returns versions of this particular story.                                          |
| `version_id`  | number | No       | ID of a Story's version. Use it to retrieve only a specific version of a story.                                                          |
| `by_release_id`| number| No       | ID of the release. When this is passed, the endpoint returns versions of all stories within the release and stories not associated with a particular release. |
| `page`        | number | No       | Default: `1`. Learn more under [Pagination](https://www.storyblok.com/docs/api/content-delivery/v2/getting-started/pagination).             |
| `per_page`    | number | No       | Default: `25`. Max: `100`. Learn more under [Pagination](https://www.storyblok.com/docs/api/content-delivery/v2/getting-started/pagination). |
| `show_content`| string | No       | Use it (`show_content=true`) to retrieve all the content of a version.                                                                   |

### Response Properties

The response contains a `story_versions` array. Each object in the array represents a version with the following properties:

| Property         | Type   | Description                                                     |
| ---------------- | ------ | --------------------------------------------------------------- |
| `id`             | number | ID of the version record                                        |
| `story_id`       | number | ID of the story                                                 |
| `user_id`        | number | ID of the user who made the change                              |
| `created_at`     | string | Timestamp of when the version was created                       |
| `published_at`   | string | Timestamp of when this version was published (if applicable)    |
| `state`          | string | State of the version (e.g., `published`, `draft`, `unpublished`) |
| `component_changes` | object | Details about component changes (structure not specified)     |
| `tag_changes`    | object | Details about tag changes (structure may vary based on changes) |
| `content`        | object | Snapshot of the `content` field for this version (only if `show_content=true`) |
| `author`         | object | Object containing basic author info (`id`, `name`)              |

### Example Requests

**Get versions for a specific story:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/story_versions?by_story_id=STORY_ID" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

**Get page 2 of versions for a specific story:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/story_versions?by_story_id=STORY_ID&page=2" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

**Get a specific version ID and include content:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/story_versions?version_id=VERSION_ID&show_content=true" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Get Story Versions (Legacy)

*This endpoint is deprecated and will not return info about versions created after 2024-08-28. Use the [new endpoint](#get-story-versions-new) instead.*

This allows you to retrieve the versions of a story and the corresponding author information. You can also filter the results based on pagination using the `page` parameter. This can be done with a GET request on the story version you wish to retrieve.

`GET https://mapi.storyblok.com/v1/spaces/:space_id/stories/:story_id/versions`

### Path Parameters

| Parameter   | Type   | Required | Description              |
| ----------- | ------ | -------- | ------------------------ |
| `:space_id` | number | Yes      | Numeric ID of a space    |
| `:story_id` | number | Yes      | The numeric id of the story |

### Query Parameters

| Parameter | Type   | Description                                                                                                                         |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `page`    | number | Default: `1`. Learn more under [Pagination](https://www.storyblok.com/docs/api/content-delivery/v2/getting-started/pagination).       |
| `per_page`| number | Default: `25`. Max: `100`. Learn more under [Pagination](https://www.storyblok.com/docs/api/content-delivery/v2/getting-started/pagination). |

### Response (Legacy Format)

Returns an array of version objects in the `versions` property.

| Property     | Type   | Description                                               |
| ------------ | ------ | --------------------------------------------------------- |
| `id`         | number | ID of the version record                                  |
| `created_at` | string | Timestamp of when the version was created                 |
| `story`      | object | Snapshot of the [Story object](#the-story-object) for this version |
| `user`       | object | Object containing basic author info (`id`, `name`)        |

### Example Response (Legacy)

```json
{
  "versions": [
    {
      "id": 5678,
      "created_at": "2024-05-01T10:00:00.000Z",
      "story": {
        // ... story object snapshot for this version ...
      },
      "user": { "id": 101, "name": "Admin User" }
    },
    {
      "id": 5679,
      "created_at": "2024-05-01T11:00:00.000Z",
      "story": {
        // ... story object snapshot for this version ...
      },
      "user": { "id": 102, "name": "Editor User" }
    }
    // ...
  ]
}
```

### Example Requests

**Basic Request:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID/versions" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

**Request with Pagination:**
```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID/versions?page=2" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Compare a Story Version

With this endpoint you can compare the changes between two versions of a story in Storyblok. You need to provide the story ID and version ID in the request to retrieve the comparison results.

`GET https://mapi.storyblok.com/v1/spaces/:space_id/stories/:story_id/compare`

### Path Parameters

| Parameter   | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| `:space_id` | number | Yes      | Numeric ID of a space |
| `:story_id` | number | Yes      | The numeric id of story |

### Query Parameters

| Parameter | Type   | Required | Description                                                                                                                 |
| --------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `version` | number | Yes      | Story version id (The version to compare against the current draft/latest version).                                         |

*Note: The online documentation table lists this parameter as `version_v2`, but the example request uses `version`. This documentation uses `version` based on the example.*

### Response

*The current online documentation page does not detail the response structure. Previously documented response included `diff_summary` (object), `diff_details` (object), `version` (object of the compared version), and `current_story` (object of the latest version).*

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/YOUR_SPACE_ID/stories/STORY_ID/compare?version=VERSION_ID_TO_COMPARE" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```
