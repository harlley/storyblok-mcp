# Getting Started

The Storyblok Management API allows you to create, edit, update, and delete content using a common interface. It is organized around REST. Our API has predictable, resource-oriented URLs and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP query parameters and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support cross-origin resource sharing, allowing you to interact securely with our API from a client-side web application (you should never expose your secret API key in any public website's client-side code). JSON is returned by all API responses, including errors. Our API libraries convert responses to appropriate language-specific objects.

Requests can be performed using your own API Authentication Token that you can obtain from your profile [in the Storyblok application](http://app.storyblok.com/#!/me/account).

## API Libraries

Official libraries for the Storyblok Management API are available in several languages. You can take a look at [Storyblok's Github](https://github.com/storyblok) for more. Community-supported libraries are also available for additional languages.

## Region-specific base URLs

### European Union
Base URL for spaces created in the EU: `https://mapi.storyblok.com`

### United States
Base URL for spaces created in the US: `https://mapi.us.storyblok.com`

### Canada
Base URL for spaces created in Canada: `https://mapi.ca.storyblok.com`

### Australia
Base URL for spaces created in Australia: `https://mapi.au.storyblok.com`

### China
Base URL for spaces created in China: `https://mapi.cn.storyblok.com`

## Use Cases

The Management API should not be used to consume your content stored in Storyblok as it does not utilize our global CDN for your requests and can result in higher latencies. Please make sure to use the Content Delivery API instead.

The Management API can be used when there is a need to create, update, or delete something. It even allows you to consume the content. Here are a few use cases listed for which the Management API can be used:

- Migration from your current data storage / CMS
- Integration with 3rd party applications
- Import and Export automation
- Automatic translation workflows
- Component versioning
- Whitelabel integrations

## Authentication

To authenticate your account when making API requests, include an access token in the `Authorization` header. There are two types of access tokens in Storyblok:

### 1. Personal Access Token

A Personal Access Token is obtained from the Storyblok UI and grants access to all spaces associated with your account, including the Management API.

- It is **not tied to a single space** but allows actions based on your permissions in all accessible spaces.
- This token is used **without** the `Bearer` keyword in the `Authorization` header.
- You can generate or manage personal access tokens in the [Storyblok Account settings](https://app.storyblok.com/#/me/account?tab=token).

> **Important**: Personal access tokens grant broad access to your account. Never expose them in frontend code or commit them to version control. Always store them securely using environment variables. If exposed, revoke the token immediately and generate a new one.

### 2. OAuth Access Token

An OAuth Access Token is obtained via the OAuth2 authentication flow and is tied to a single space.

- It has a **time-to-live (TTL)** and is used for authenticating third-party apps or integrations.
- Permissions (scopes) such as `read_content` and `write_content` are granted during the OAuth process.
- This token **must** be used with the `Bearer` keyword in the `Authorization` header.
- OAuth access tokens only provide access to specific Management API endpoints, which are documented in the [Management API Reference](https://www.storyblok.com/docs/plugins/management-api-reference).

You can learn more about obtaining an OAuth access token in the [Storyblok OAuth2 Authentication Guide](https://www.storyblok.com/docs/plugins/authentication-apps).

### Authenticating API Requests

To authenticate requests to the Management API, include your access token in the `Authorization` header.

Using curl: Personal Access Token Example
```bash
curl -H "Authorization: YOUR_PERSONAL_ACCESS_TOKEN" https://mapi.storyblok.com/
```

Using curl: OAuth Access Token Example
```bash
curl -H "Authorization: Bearer YOUR_OAUTH_ACCESS_TOKEN" https://mapi.storyblok.com/
```

Using Storyblok's JavaScript SDK: Personal Access Token Example
```javascript
const StoryblokClient = require('storyblok-js-client')
const Storyblok = new StoryblokClient({
  oauthToken: 'YOUR_PERSONAL_ACCESS_TOKEN'
})
```

Using Storyblok's JavaScript SDK: OAuth Access Token Example
```javascript
const StoryblokClient = require('storyblok-js-client')
const Storyblok = new StoryblokClient({
  oauthToken: 'Bearer YOUR_PERSONAL_ACCESS_TOKEN'
})
```

## Errors

Storyblok uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the `2xx` range indicate success. Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, content entry was not published but version requested was set to published, etc.). Codes in the `5xx` range indicate an error with Storyblok's servers (these are rare).

Some `4xx` errors that could be handled programmatically (e.g., content entry was not found) include an error code that briefly explains the error reported.

### Http Status Code Summary

| Code | Description |
|------|-------------|
| 200 - OK | Everything worked as expected. |
| 400 - Bad Request | Wrong format was sent (eg. XML instead of JSON). |
| 401 - Unauthorized | No valid API key provided. |
| 403 - Forbidden | Insufficient permissions. |
| 404 - Not Found | The requested resource doesn't exist (perhaps due to not yet published content entries). |
| 422 - Unprocessable Entity | The request was unacceptable, often due to missing a required parameter. |
| 429 - Too Many Requests | Too many requests hit the API too quickly. We recommend an exponential backoff (throttling) of your requests. |
| 500, 502, 503, 504 - Server Errors | Something went wrong on Storyblok's end. (These are rare) |

## Rate Limit

Please refer to the [technical limits](https://www.storyblok.com/docs/technical-limits) page to see which Management API rate limit applies per plan.

## Pagination

To efficiently handle large datasets, the Storyblok API supports pagination for all top-level resources. For instance, `stories` and `datasource_entries` share a common structure and take these two parameters: `page`, `per_page`.

The default `per_page` is set to 25 entries per page. You can increase this number to receive up to 100 entries per page. To go through different pages you can utilize the page parameter. The page parameter is a numeric value and uses 1 as default.

For the calculation of how many pages are available, you can access the `total` response header that you will receive after you make your first request. Access it and divide it with your `per_page` parameter to receive the highest possible page. You will receive an empty array as a result if the page doesn't exist

### Query Parameters

| Query parameter | Description |
|----------------|-------------|
| page | Default: 1. Increase this to receive the next page of content entries |
| per_page | Default: 25, Max for Stories: 100, Max for Datasource Entries: 1000. Defines the number of content entries you will receive per page |

### Example Request

```bash
curl "https://mapi.storyblok.com/v1/spaces/606/stories/" \
-X GET \
-H "Authorization: YOUR_OAUTH_TOKEN" \
-H "Content-Type: application/json"
```

### Example Response

```json
{
  "stories": [
    {...},
    {...}
  ]
}
```

### Example Response Headers

```
status: 200
per-page: 2
total: 3
...
```

## Organization

The Organization endpoint helps obtain comprehensive statistics on your Storyblok spaces. It provides valuable information, such as the number of users within your organization, as well as details like `last_sign_in_at` or `last_sign_in_ip`.

You can see an example request and response below:

### Example Request

```bash
curl -H "Authorization: YOUR_OAUTH_TOKEN" https://mapi.storyblok.com/v1/orgs/me
```

### Example Response

```json
{
  "org": {
    "name": "ORG Name",
    "users": [
      {
        "userid": "exampleemail@storyblok.com",
        "email": "exampleemail@storyblok.com",
        "username": null,
        "real_email": "exampleemail@storyblok.com",
        "avatar": null,
        "id": 106362,
        "organization": null,
        "sign_in_count": 0,
        "created_at": "2022-01-12T12:56:56.806Z",
        "firstname": "Dipankar",
        "lastname": "Maikap",
        "org_role": "member",
        "last_sign_in_at": null,
        "last_sign_in_ip": "168.121.178.3",
        "disabled": false,
        "partner_role": null,
        "friendly_name": "Dipankar Maikap",
        "on_spaces": [
          123456,
          234567
        ],
        "roles_on_spaces": {
          "123456": [
            "admin"
          ],
          "234567": [
            "owner"
          ]
        }
      }
    ],
    "spaces": [{}], // space details
    "settings": {},
    "plan": "starter",
    "billing_address": {},
    "user_count": 25,
    "plan_level": 400,
    "max_spaces": 50,
    "max_collaborators": 250,
    "external_users": [],
    "extended_external_users": [],
    "track_statistics": true,
    "invitations": [
      {
        "id": 105845,
        "email": "exampleemail@storyblok.com",
        "org_id": 34,
        "user_id": 17,
        "expires_at": "2023-06-13T12:28:44.527Z",
        "org_role": "admin",
        "inviter_id": 1,
        "registered": false
      }
    ],
    "sso_firstname": null,
    "sso_lastname": null,
    "sso_alt_email": null,
    "strong_auth": null,
    "restricted_regions": []
  }
} 
