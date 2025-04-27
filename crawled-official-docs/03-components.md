# Components

A component is a standalone entity that is meaningful in its own right. While components (or bloks) can be nested in each other, semantically they remain equal. Each component is a small piece of your data structure which can be filled with content. One component can consist of as many field types as required.

The components endpoint allows you to retrieve, add, update, or delete components.

**Endpoint**: `/v1/spaces/:space_id/components`

## Overview

- [The Component Object](#the-component-object)
- [The Component Schema Field Object](#the-component-schema-field-object)
- [Retrieve a Single Component](#retrieve-a-single-component)
- [Retrieve Multiple Components](#retrieve-multiple-components)
- [Restore a Component Version](#restore-a-component-version)
- [Retrieve a Single Component Version](#retrieve-a-single-component-version)
- [Retrieve Component Versions](#retrieve-component-versions)
- [Create a Component](#create-a-component)
- [Update a Component](#update-a-component)
- [Delete a Component](#delete-a-component)
- [Possible Field Types](#possible-field-types) 

## The Component Object

This is an object representing a component in a space. Some properties can be read-only, and others can be managed by the space owner using the Management API.

It is important to note that the `name` will be shown to the user in the content editor if the `display_name` is null. If `display_name` is a string, it will be shown to the user inside the content editor.

There is another field called `real_name` which is read-only and is used by Storyblok internally. If `display_name` is null, the `real_name` is set to `name`. If `display_name` is a string, the `real_name` field has the value of `display_name`.

You should use the `name` and `display_name` for any purpose.

If `is_nestable` and `is_root` properties are both set to `false`, the component is nestable.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| id | number | The numeric ID |
| name | string | Technical name used for component property in entries |
| display_name | string | Name that will be used in the editor interface |
| created_at | string | Creation date (Format: `yyyy-MM-dd'T'HH:mm:ssZ`) |
| updated_at | string | Latest update date (Format: `yyyy-MM-dd'T'HH:mm:ssZ`) |
| schema | object | Key value pairs of component fields |
| image | string or null | URL to the preview image, if uploaded |
| preview_field | string | The field that is for preview in the interface (Preview Field) |
| is_root | boolean | True if the component can be used as a Content Type |
| preview_tmpl | string | Your component preview template |
| is_nestable | boolean | True if the component is nestable (insertable) in block field types |
| all_presets | object[] | An array of presets for this component |
| real_name | string | Duplicated technical name or display name, used for internal tasks |
| component_group_uuid | string | The component folder ID of the component |
| color | string | The color of the icon selected for the component |
| icon | string | Icon selected for the component |
| internal_tags_list | object[] | List of objects containing the details of tags used for the component |
| internal_tag_ids | string[] | List of ids of the tags assigned to the component |
| content_type_asset_preview | string | Asset preview field (Preview Card) for a content type component |
| conditional_settings | object[] | Array containing the object with information about conditions set on the field |

#### The All Presets Object
Each object in the `all_presets` array has the following properties:

| Property | Type | Description |
|----------|------|-------------|
| id | number | The numeric ID of the preset |
| name | string | Name of the preset |
| component_id | number | The ID of the component the preset is for |
| image | string or null | Link to the preview image of the preset |
| icon | string | Icon selected for the preset |
| color | string | Color of the icon selected for the preset |
| description | string | The description of the preset |

#### The Internal Tags List Object
Each object in the `internal_tags_list` array has the following properties:

| Property | Type | Description |
|----------|------|-------------|
| id | number | Id of the tag |
| name | string | Name of the tag |

### Example Object

```json
{
  "component": {
    "name": "banner_section",
    "display_name": null,
    "created_at": "2023-03-27T10:35:25.086Z",
    "updated_at": "2023-07-04T08:30:54.235Z",
    "id": 3672886,
    "schema": {
      "headline": {
        "type": "textarea",
        "pos": 0,
        "translatable": true,
        "description": "This field is used to render an H1 title"
      }
    },
    "image": "//a.storyblok.com/f/88751/x/d4284bb2e5/screenshot-2021-05-06-at-15-55-21.png",
    "preview_field": null,
    "is_root": false,
    "preview_tmpl": null,
    "is_nestable": true,
    "all_presets": [],
    "preset_id": null,
    "real_name": "banner_section",
    "component_group_uuid": "19cb297f-541a-4a23-b02e-66d08e5f6323",
    "color": "#fbce41",
    "icon": "block-image",
    "internal_tags_list": [
      {
        "id": 43211,
        "name": "test"
      },
      {
        "id": 43212,
        "name": "test2"
      }
    ],
    "internal_tag_ids": [
      "43211",
      "43212"
    ],
    "content_type_asset_preview": "hero_image",
    "conditional_settings": []
  }
}
``` 

## The Component Schema Field Object

There are a few properties which are present in every field type that can be added in a component. Not every property will be used for every field type. Some may only affect specific types. We have mentioned a few fields properties here, but there can be more as well.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| type | string | The type of your field |
| required | boolean | Is this field required? Default: false |
| description | string | The description is shown in the editor interface |
| tooltip | boolean | True if the description is set to show as a tooltip. Default: false |
| pos | number | Position of the field in the component |
| translatable | boolean | True if the translation is enabled over the field |
| default_value | string | Default value for the field. Can be an escaped JSON object |
| display_name | string | Name that will be used in the editor interface |
| maximum | number | The maximum amount of components that can be added in a bloks field. Only for type: bloks |
| minimum | number | The minimum amount of components that should be added in a bloks field. Only for type: bloks |
| restrict_type | string | A string to define what type is used for restricting the components in a bloks field. Can be `tags`, `groups` (folders), or empty string for specific components |
| restrict_components | boolean | Activate restriction nestable component option. Default: false. Only for type: bloks, and richtext (for nestable bloks inside that) |
| component_whitelist | string[] | An array of component/content type names: ["post", "page", "product"]. Only for type: bloks, multilink, and richtext (for nestable bloks inside that) |
| component_tag_whitelist | number[] | An array of tag IDs. Only the components with these tags can be inserted in the bloks field. Only for type: bloks. and richtext (for nestable bloks inside that) |
| component_group_whitelist | string[] | An array of group UUIDs. Only the components that belong to these groups can be inserted in the bloks field. Only for type: bloks, and richtext (for nestable bloks inside that) |
| no_translate | boolean | Should be excluded in translation export. Only for type text and number |
| rtl | boolean | Enable global RTL for this field. Only for type: markdown, text, textarea |
| regex | string | Client Regex validation for the text field type |
| max_length | number | Set the max length of the input string. Only for type: text, textarea, markdown |
| style_options | object[] | Objects containing the data about custom CSS set inside the richtext field |
| customize_toolbar | boolean | True if customization of toolbar in a richtext or markdown field is enabled |
| toolbar | string[] | Array containing the value of enabled items while customizing the toolbar of richtext or markdown field |
| allow_target_blank | boolean | Allows links inside a richtext field to be open in a new tab and enables an option for the links field to open link in a new tab |
| allow_custom_attributes | boolean | For enabling custom attributes in a link. Works for links inside the richtext field and multilink field |
| rich_markdown | boolean | Enable rich markdown view. Only for type: markdown |
| allow_multiline | boolean | Enable empty paragraphs in markdown |
| min_value | number | Minimum value that a number field can have |
| max_value | number | Maximum value that a number field can have |
| decimals | number | The number of decimal places that appear after the point in a number field |
| steps | number | The interval between numbers of a number field type |
| disable_time | boolean | Disables time selection from the date picker. Default: false. Only for type: datetime |
| inline_label | boolean | Makes the label of a boolean field inline |
| exclude_empty_option | boolean | Hide empty options in the UI in an option or options field |
| options | object[] | Array of datasource entries [{name:"", value:""}]; Effects editor only if source=undefined. For field type option |
| source | enum | Only for type: option, options, custom |
| use_uuid | boolean | Default: true; available in option and source=internal_stories |
| datasource_slug | string | Define selectable datasources string; Effects editor only if source=internal for field types option and options |
| external_datasource | string | Define external datasource JSON Url; Effects editor only if source=external for field types option and options |
| folder_slug | string | Filter on selectable stories path; Effects editor only if source=internal_stories; In case you have a multi-language folder structure you can add the '{0}' placeholder and the path will be adapted dynamically. Examples: "{0}/categories/", {0}/{1}/categories/ |
| max_options | string | Maximum options that can be selected in an options field |
| min_options | string | Minimum options that should be selected in an options field |
| filter_content_type | string[] | An array of content types that can be selected in a option or options field where source is `internal_stories` |
| entry_appearance | string | The appearance type of an option inside the option or options field type when source is `internal_stories`. Can be `link` or `card`, default: `link` |
| allow_advanced_search | boolean | Allow advance search that enables a separate dialogue for search. Only in option and options field type |
| is_reference_type | boolean | True if the options field is of type reference |
| filetypes | string[] | Array of file type names: ["images", "videos", "audios", "texts"]. Only for type: multiasset |
| asset_folder_id | number | Default asset folder numeric id to store uploaded image of that field. Only for type: asset |
| allow_external_url | boolean | If the asset or multiasset field allow external URLs |
| email_link_type | boolean | Allow emails in the multilink field type. Default: false |
| asset_link_type | boolean | Allow assets in the multilink field type. Default: false |
| show_anchor | boolean | Enable anchor field on internal links inside multilink field type. Default: false |
| restrict_content_types | boolean | Activate the restriction content type option. Only for type: multilink |
| force_link_scope | boolean | Force folder restriction on multilink field type. Default: false |
| link_scope | string | Filter on selectable folders when the force folder (`force_link_fields`) is in place. Default: false |
| keys | string[] | An array of field keys to include in this section (group field types). Only for type: section |
| field_type | string | Name of the custom field type plugin. Only for type: custom |
| required_fields | string | Comma-separated required fields. Only for type custom |
| image_crop | boolean | Activate force crop for images. Only for type: image |
| keep_image_size | boolean | Keep the original size. Only for type: image |
| image_width | string | Define width in px or width ratio if keep_image_size is enabled. Only for type: image |
| image_height | string | Define height in px or height ratio if keep_image_size is enabled. Only for type: image |
| add_https | boolean | Prepends https: to stop the usage of the relative protocol. Only for type: image, file |
| can_sync | boolean | Advanced usage to sync with the field in preview. Default: false |
| exclude_from_merge | boolean | Excludes a blok from being merged during a merge action (only works with the Dimensions App) |
| exclude_from_overwrite | boolean | Excludes a blok from being overwritten during an overwrite action (only works with the Dimensions App) |
| force_merge | boolean | Overwrites a blok during a merge action (only works with the Dimensions App) |
| conditional_settings | object[] | Array containing the object with information about conditions set on the field |

#### Source Enum Values

| Value | Description |
|-------|-------------|
| undefined | Self |
| internal_stories | Stories |
| internal | Datasource |
| external | API Endpoint in Datasource Entries Array Format |
| internal_languages | The languages enabled in the space |

#### The Style Options Object
Each object in the `style_options` array has the following properties:

| Property | Type | Description |
|----------|------|-------------|
| _uid | string | Unique identifier for the style option |
| name | string | Name of the style option |
| value | string | CSS value for the style option |

#### The Options Object
Each object in the `options` array has the following properties:

| Property | Type | Description |
|----------|------|-------------|
| name | string | Display name of the option |
| value | string | Value of the option |

### Example Object

```json
{
  "title": {
    "type": "text",
    "pos": 0,
    "translatable": true,
    "required": true,
    "regex": "",
    "description": "Description for the field",
    "display_name": "",
    "default_value": "",
    "can_sync": false,
    "rtl": false,
    "no_translate": false
  }
}
``` 

## Retrieve a Single Component

Returns a single, fully loaded component object by providing a specific numeric id.

```
https://mapi.storyblok.com/v1/spaces/:space_id/components/:component_id
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| :space_id | number | Yes | Numeric ID of a space |
| :component_id | number | Yes | Numeric id of a component |

### Response Properties

| Property | Type | Description |
|----------|------|-------------|
| component | object | The Component Object |

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/606/components/4123" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

You will receive a fully loaded component object as a response. 

## Retrieve Multiple Components

Returns an array of component objects. This endpoint's response is not paginated, so you will retrieve all components.

This endpoint also returns the information about the component groups (folders) in a separate key named `component_groups`, which is an array of objects containing the details of component groups (folders) inside the space.

```
https://mapi.storyblok.com/v1/spaces/:space_id/components/
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| :space_id | number | Yes | Numeric ID of a space |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| by_ids | string | Filter by ids (comma separated) |
| sort_by | string | Components can be sorted in an ascending or descending order by a specific property |
| is_root | boolean | Retrieve all the components based on `is_root` property of a component. Set to true to retrieve all the components that can be used as content types or set to false to retrieve all the nestable components |
| search | string | Search by `name` or `display_name` |
| in_group | string | Find components that are present in a specific group with the UUID of the group |

#### Sort By Options

Components can be sorted in an ascending or descending order by a specific property. Following are a few options and examples:

- Retrieve Nestable first - `is_nestable:desc,is_root:asc`
- Retrieve Universal first - `is_nestable:desc,is_root:desc`
- Retrieve Content Type first - `is_nestable:asc,is_root:desc`

You can also use properties like `name` and `updated_at`.

### Response Properties

| Property | Type | Description |
|----------|------|-------------|
| components | object[] | An array of components |
| component_groups | object[] | Component groups present inside the space |

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/606/components/" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

You will receive an array of component objects as a response. 

## Restore a Component Version

Restores a component to a saved version.

**Endpoint:** `https://mapi.storyblok.com/v1/spaces/:space_id/versions/:version_id`

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| :space_id | number | Numeric ID of a space (required) |
| :version_id | number | ID of the component version |

### Request Body Properties

| Property | Type | Description |
|----------|------|-------------|
| model | string | Model name: "components" |
| model_id | string | Component ID |

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/606/versions/279820276" \
  -X PUT \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"model\":\"components\",\"model_id\":6826721}"
```

## Retrieve a Single Component Version

Returns schema details of a component version.

**Endpoint:** `https://mapi.storyblok.com/v1/spaces/:space_id/components/:component_id/component_versions/:version_id`

### Path Parameters

- `:space_id` (number, required) - Numeric ID of a space
- `:component_id` (number) - ID of the component  
- `:version_id` (number) - Version ID of the component

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/606/components/6826721/component_versions/279820267" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

### Example Response

```json
{
  "component_version": {
    "schema": {
      "bio": {
        "type": "richtext",
        "pos": 0,
        "id": "ih9EQ581Qs-rEN3plhuV1w"
      },
      "name": {
        "type": "text", 
        "pos": 1,
        "id": "YmDMYXlRQqqPGXAcLTHXhQ"
      }
    }
  }
}
```

## Retrieve Component Versions

Returns an array of component versions. This endpoint's response is paginated.

```
https://mapi.storyblok.com/v1/spaces/:space_id/versions/
```

This endpoint is paginated by default, including a maximum of 100 component versions in the response. Learn more under [Pagination](https://www.storyblok.com/docs/api/content-delivery/v2/getting-started/pagination).

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| :space_id | number | Yes | Numeric ID of a space |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Default: `1`. Learn more under [Pagination](https://www.storyblok.com/docs/api/content-delivery/v2/getting-started/pagination). |
| per_page | number | Default: `25`. Max: `100`. Learn more under [Pagination](https://www.storyblok.com/docs/api/content-delivery/v2/getting-started/pagination). |
| model | string | Model name: components |
| model_id | string | Component ID |

### Response Properties

| Property | Type | Description |
|----------|------|-------------|
| versions | object[] | Array of component versions |

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/606/versions?model=components&model_id=6826721" \
  -X GET \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json"
```

You will receive an array of component versions as a response.

```json
{
  "versions": [{
    "id": 279820276,
    "event": "update",
    "created_at": "2025-03-17T09:24:10.926Z",
    "author_id": "133876",
    "author": "Dipankar Maikap",
    "item_id": 6826721,
    "is_draft": true
  }]
}
```

## Create a Component

You can set most of the fields that are available in the component object, below we only list the properties in the example and possible required fields.

```
https://mapi.storyblok.com/v1/spaces/:space_id/components/
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| :space_id | number | Yes | Numeric ID of a space |

### Request Body Properties

| Property | Type | Description |
|----------|------|-------------|
| component | object | The Component Object |

### Response Properties

| Property | Type | Description |
|----------|------|-------------|
| component | object | The Component Object |

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/606/components/" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -d "{
    \"component\": {
      \"name\": \"banner_section\",
      \"display_name\": null,
      \"schema\": {
        \"headline\": {
          \"type\": \"textarea\",
          \"pos\": 0,
          \"translatable\": true,
          \"description\": \"This field is used to render an H1 title\"
        }
      },
      \"is_root\": false,
      \"is_nestable\": true
    }
  }"
```

You will receive a fully loaded component object as a response.

## Update a Component

The PUT method sends the component object with updated values to our backend. An update on the component will not take over already inserted values, make sure also to update your stories that contain this component.

```
https://mapi.storyblok.com/v1/spaces/:space_id/components/:component_id
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| :space_id | number | Yes | Numeric ID of a space |
| :component_id | number | Yes | The numeric id of the component |

### Request Body Properties

| Property | Type | Description |
|----------|------|-------------|
| component | object | The Component Object |

### Response Properties

| Property | Type | Description |
|----------|------|-------------|
| component | object | The Component Object |

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/606/components/4123" \
  -X PUT \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"component\": {
      \"id\":4123,
      \"name\": \"banner_section\",
      \"display_name\": null,
      \"schema\": {
        \"headline\": {
          \"type\": \"textarea\",
          \"pos\": 0,
          \"translatable\": true,
          \"description\": \"This field is used to render an H1 title\"
        }
      },
      \"is_root\": false,
      \"is_nestable\": true
    }
  }"
```

You will receive a fully loaded component object as a response.

## Delete a Component

Delete any component using its numeric id. Already used components will still stay in place but will show up with no schema definition so your inserted values won't be removed. You can use the update stories to migrate your content to other or new components.

```
https://mapi.storyblok.com/v1/spaces/:space_id/components/:component_id
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| :space_id | number | Yes | Numeric ID of a space |
| :component_id | number | Yes | Numeric id of a component |

### Response Properties

| Property | Type | Description |
|----------|------|-------------|
| component | object | The Component Object |

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/606/components/4123" \
  -X DELETE \
  -H "Authorization: YOUR_OAUTH_TOKEN" \
  -d ""
```

## Possible Field Types

Following are the possible field types inside Storyblok:

| Field Type | Description |
|------------|-------------|
| bloks | Blocks: a field to interleave other components in your current one |
| text | Text: a text field |
| textarea | Textarea: a text area |
| richtext | Richtext: a richtext field |
| markdown | Markdown: write markdown with a text area and additional formatting options |
| number | Number: a number field |
| datetime | Date/Time: a date and time picker |
| boolean | Boolean: a checkbox - true/false |
| option | Single-Option: a single dropdown |
| options | Multi-Options: a list of checkboxes that allows multi-select |
| asset | Asset: Single asset (images, videos, audio, and documents) |
| multiasset | Multi-Assets: (images, videos, audio, and documents) |
| multilink | Link: an input field for adding links like internal linking to other stories, emails etc. |
| table | Table: a field for table format |
| section | Group: no input possibility - allows you to group fields in sections |
| custom | Plugin: Extend the editor yourself with a color picker or similar. Please take a look at [Introduction to Field Plugins](https://www.storyblok.com/docs/plugins/field-plugins/introduction) |
| image | Image (old): a upload field for a single image with cropping possibilities |
| file | File (old): a upload field for a single file |

Example Object:
```json
"field_key": {
  "type": "text", // <-- field type
}
```
