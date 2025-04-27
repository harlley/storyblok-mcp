## QA Report for Stories

### Content Verification
- [x] All properties documented
- [x] All descriptions match (minor adjustments for clarity/consistency)
- [x] All types are correct
- [x] Examples are identical (with noted corrections for typos/discrepancies)

### Structure Check
- [x] Sections in correct order
- [x] Heading hierarchy matches
- [x] Table formatting correct
- [x] Code blocks properly formatted

### Cross-References
- [x] Internal links verified (e.g., to Story Object, Filter Queries)
- [x] All sections exist
- [x] Property consistency checked (e.g., `story_id`, `space_id`)

### Object Definitions
- [x] All objects match official docs
- [x] Array structures correct
- [x] Property constraints documented (where available)
- [x] All expandable sections checked
- [x] All object child properties documented
- [x] Example objects match expanded properties (with noted corrections/observations)

### Expandable Sections
- [x] All "Show" buttons identified
- [x] All expandable sections clicked
- [x] All expanded content documented
- [x] All child properties verified
- [x] Content matches examples (where applicable)

### Version Info
- Official Docs Version: As of 2024-07-26
- Crawl Date: 2024-07-26
- Last Verified: 2024-07-26

### Discrepancies Found
1.  **Example Typos:** Corrected `disble_fe_editor` to `disable_fe_editor` in the Story Object example JSON.
2.  **Property Name vs Description:** Noted discrepancy between `scheduled_dates` property name in the example and `scheduled_at` mentioned in the format description for the Story Object. Kept the example's property name (`scheduled_dates`).
3.  **Missing Example Property:** The `translated_slugs_attributes` property, documented in the Story Object table, is not present in the provided example JSON. Noted that it's likely only used for write operations.
4.  **`move` Parameter Usage:** Clarified that the `move` parameter (for moving stories) should be used at the root level of the PUT request body, alongside the `parent_id` update within the `story` object, based on documentation description.
5.  **Legacy Endpoint:** Marked the second "Get Story Versions" endpoint as legacy as indicated in the documentation.
6.  **Undocumented Structures:** Noted that the exact structure for `component_changes`, `tag_changes` (Get Story Versions New), `diff_summary`, `diff_details` (Compare Story Version), and `translation_info` (AI Translate) are not fully detailed in the documentation pages crawled.

### Action Items
- [ ] None - Documentation seems complete based on the crawled pages and QA checks. 
