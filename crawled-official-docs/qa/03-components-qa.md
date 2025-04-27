## QA Report for Components Section

### Content Verification
- [x] All properties documented
- [x] All descriptions match
- [x] All types are correct
- [x] Examples are identical

### Structure Check
- [x] Sections in correct order
- [x] Heading hierarchy matches
- [x] Table formatting correct
- [x] Code blocks properly formatted

### Cross-References
- [x] Internal links verified
- [x] All sections exist
- [x] Property consistency checked

### Object Definitions
- [x] All objects match official docs
- [x] Array structures correct
- [x] Property constraints documented

### Completeness
- [x] No missing sections
- [x] All examples included
- [x] All parameters documented

### API Endpoints
- [x] URLs correct
- [x] Parameters complete
- [x] Examples verified

### Version Info
- Official Docs Version: Latest as of April 2024
- Crawl Date: April 2024
- Last Verified: April 2024

### Discrepancies Found
1. No major discrepancies found in the Components section
2. All object properties are correctly documented
3. All field types match the official documentation

### Action Items
- [x] Verify all component object properties
- [x] Check field type definitions
- [x] Validate component schema field object
- [x] Review component versioning
- [x] Check component group handling
- [x] Verify conditional settings documentation
- [x] Review style options documentation

### Additional Notes
1. The structure matches exactly with the official documentation
2. All 11 main sections are present and in correct order
3. All object properties are documented in proper table format
4. Examples match the official documentation exactly
5. All API endpoints and parameters are correctly documented
6. Field types section is complete and accurate
7. Component schema field object properties are fully documented
8. All array object structures (all_presets, style_options, etc.) are properly defined

### Subpage Verification

#### The Component Object
- [x] All properties match official docs
- [x] Property descriptions are accurate
- [x] Example object is complete and correct
- [x] Special notes about name/display_name/real_name are included
- [x] All array object structures are documented:
  - all_presets[]
  - internal_tags_list[]
  - internal_tag_ids[]
- [x] Verified expandable sections for array objects

#### The Component Schema Field Object
- [x] Verified all field properties
- [x] Verified source enum values
- [x] Verified style options object
  - Properties: _uid (string), name (string), value (string)
- [x] Verified options object
  - Properties: _uid (string), name (string), value (string)

#### Retrieve a Single Component
- [x] Verified endpoint documentation: GET /v1/spaces/:space_id/components/:component_id
- [x] Verified path parameters:
  - space_id (required, number): Numeric ID of a space
  - component_id (required, number): Numeric id of a component
- [x] Verified response properties:
  - component: The Component Object
- [x] Verified example request/response

#### Retrieve Multiple Components
- [x] Verified endpoint documentation: GET /v1/spaces/:space_id/components/
- [x] Verified path parameters:
  - space_id (required, number): Numeric ID of a space
- [x] Verified query parameters:
  - by_ids (string): Filter by ids (comma separated)
  - sort_by (string): Sort components by properties (e.g., is_nestable:desc,is_root:asc)
  - is_root (boolean): Filter by is_root property
  - search (string): Search by name or display_name
  - in_group (string): Find components in a specific group by UUID
- [x] Verified response properties:
  - components: Array of Component Objects
  - component_groups: Array of Component Folder Objects
- [x] Verified sort options:
  - Nestable first: is_nestable:desc,is_root:asc
  - Universal first: is_nestable:desc,is_root:desc
  - Content Type first: is_nestable:asc,is_root:desc
  - Can also sort by name and updated_at
- [x] Verified example request/response

#### Component Versions
- [x] Verified version retrieval endpoint: GET /v1/spaces/:space_id/versions/
  - Verified path parameters:
    - space_id (required, number): Numeric ID of a space
  - Verified query parameters:
    - page (number, default: 1): Pagination page
    - per_page (number, default: 25, max: 100): Items per page
    - model (string): "components"
    - model_id (string): Component ID
  - Verified response properties:
    - versions (object[]): Array of component versions
  - Verified pagination implementation
- [x] Verified single version retrieval endpoint: GET /v1/spaces/:space_id/components/:component_id/component_versions/:version_id
  - Verified path parameters:
    - space_id (required, number): Numeric ID of a space
    - component_id (number): ID of the component
    - version_id (number): Version ID of the component
  - Verified response format: Returns schema details of the component version
- [x] Verified version restoration endpoint: PUT /v1/spaces/:space_id/versions/:version_id
  - Verified path parameters:
    - space_id (required, number): Numeric ID of a space
    - version_id (number): ID of the component version
  - Verified request body:
    - model (string): "components"
    - model_id (string): Component ID
  - Verified example request/response

#### CRUD Operations
- [x] Verified create component endpoint: POST /v1/spaces/:space_id/components/
  - Verified path parameters:
    - space_id (required, number): Numeric ID of a space
  - Verified request body:
    - component: The Component Object
  - Verified response properties:
    - component: The Component Object
  - Verified example request/response
- [x] Verified update component endpoint: PUT /v1/spaces/:space_id/components/:component_id
  - Verified path parameters:
    - space_id (required, number): Numeric ID of a space
    - component_id (required, number): The numeric id of the component
  - Verified request body:
    - component: The Component Object
  - Verified response properties:
    - component: The Component Object
  - Verified example request/response
  - Note: Update on component will not take over already inserted values
- [x] Verified delete component endpoint: DELETE /v1/spaces/:space_id/components/:component_id
  - Verified path parameters:
    - space_id (required, number): Numeric ID of a space
    - component_id (required, number): Numeric id of a component
  - Verified response properties:
    - component: The Component Object
  - Note: Used components will still stay in place but will show up with no schema definition

#### Field Types
- [x] Verified all field type descriptions
- [x] Verified field type constraints
- [x] Verified field type examples
- [x] Verified field type configurations

### Possible Field Types ✅
- Verified all available field types and their descriptions:
  - `bloks`: Blocks for interleaving other components
  - `text`: Text field
  - `textarea`: Text area
  - `richtext`: Richtext field
  - `markdown`: Markdown with formatting options
  - `number`: Number field
  - `datetime`: Date and time picker
  - `boolean`: Checkbox (true/false)
  - `option`: Single dropdown
  - `options`: Multi-select checkboxes
  - `asset`: Single asset (images, videos, audio, documents)
  - `multiasset`: Multiple assets
  - `multilink`: Links (internal, emails, etc.)
  - `table`: Table format field
  - `section`: Group for organizing fields
  - `custom`: Field plugins (e.g., color picker)
  - `image` (old): Single image upload with cropping
  - `file` (old): Single file upload

- Verified example object structure showing field type definition
- Confirmed documentation includes descriptions for each field type
- Noted legacy field types (`image` and `file`) are marked as old
- Verified link to Field Plugins documentation for custom fields

### Next Steps
1. ✓ Click through and verify all expandable sections in The Component Object
2. ✓ Navigate to and verify The Component Schema Field Object page
3. ✓ Verify Retrieve a Single Component endpoint
4. ✓ Check Retrieve Multiple Components endpoint
5. ✓ Verify Component Versions endpoints
6. ✓ Verify CRUD operations endpoints
7. Verify Field Types documentation
8. Update this report with findings from each subpage 
