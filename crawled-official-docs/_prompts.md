# Management API crawler

## General Information
The goal of this project is to be a Storyblok Management Typescript SDK. It will be created in an automated way by crawling the official docs and extracting the information to serve as the basis for the SDK. The crawled pages should be saved in the `crawled-official-docs` folder as markdown files. Each main section should be saved in a single file with a number prefix to maintain the order (e.g., `01-getting-started.md`, `02-stories.md`, etc.). All subsections of a main section should be included in the same file under their respective headings.

## Crawling Guidelines

1. **Using Playwright MCP**
   - Always use the Playwright MCP tools for crawling the documentation
   - Basic crawling flow:
     1. Navigate to the page using `mcp_playwright_browser_navigate`
     2. Extract content from the page
     3. Navigate to subsections if needed
   - Handle any dialogs or popups using appropriate MCP commands
   - Use `mcp_playwright_browser_wait` when needed for dynamic content
   - Take screenshots with `mcp_playwright_browser_take_screenshot` if visual verification is needed

2. **Continuous Crawling**
   - Crawl all pages within a section without interruption
   - If a page returns a 404, try to find the correct URL from the main section page
   - Continue with the next subsection even if one fails
   - Document any failed attempts or 404s at the end of the crawling session

3. **URL Handling**
   - Always verify URLs from the main section navigation
   - Use the section's main page as a source of truth for subsection URLs
   - If a URL pattern changes, adapt to the new pattern for subsequent requests

4. **Content Organization**
   - Keep all related content in a single numbered file (e.g., all Stories content in `02-stories.md`)
   - Maintain the original documentation structure and order
   - Include all examples, parameters, and response formats
   - Preserve any links to related documentation

5. **Content Formatting**
   - Use tables for all property descriptions, following this format:
     ```markdown
     | Property | Type | Description |
     |----------|------|-------------|
     | property_name | type | Description of the property |
     ```
   - When documenting objects with multiple properties:
     1. All properties MUST be listed in the main properties table
     2. Never leave properties as loose text between tables
     3. Keep the order of properties exactly as shown in the official documentation
     4. Never add properties that aren't present in the official documentation
     5. Never assume or infer properties based on examples or context

   - When a property is of type `object[]`:
     1. If the object structure is accessible (via a clickable link or expandable section):
        - Click on all "Show" buttons to reveal the full object structure
        - Document all child properties in a subsection
        - Include all properties exactly as shown in the expanded view
        - Verify that no properties are missing from the expanded view
        ```markdown
        #### The Object Name
        Each object in the `property_name` array has the following properties:

        | Property | Type | Description |
        |----------|------|-------------|
        | id | number | The unique identifier |
        | name | string | The item name |
        ```
     2. If the object structure is NOT accessible:
        - Keep only the basic definition in the main properties table
        - Do not create a subsection for that object
        - Do not make assumptions about its internal structure
        - Document only what is explicitly shown in the official documentation
        - Note in the QA report that the object structure was not accessible

   - Use tables for all parameters (Path, Query, Request Body, Response), following this format:
     ```markdown
     | Parameter | Type | Required | Description |
     |-----------|------|----------|-------------|
     | parameter_name | type | Yes/No | Description of the parameter |
     ```
   - Maintain consistent formatting across all documentation files
   - Use proper markdown headers for all sections (##, ###, etc.)
   - Include code examples in appropriate language-specific code blocks
   - Example objects in JSON should exactly match the documented properties
   - Remove any properties from example objects that aren't documented in the official docs

6. **Completeness Checks**
   - Before finishing a section, verify all subsections are crawled by checking:
     1. The navigation menu on the main section page
     2. Any "Related" or "See also" links
     3. Cross-references within the current section
   - Document any skipped subsections with a reason
   - Add a checklist at the end of each crawling session listing all subsections and their status

7. **Quality Control**
   - Compare the formatted output with the original documentation
   - Verify all tables are properly formatted
   - Check that all code examples are included and properly formatted
   - Ensure all links between sections are maintained
   - Validate that all properties are documented in table format

8. **Quality Assurance (QA) Steps**
   - After crawling each section, perform these verification steps:
     1. **Content Accuracy**
        - Compare each crawled section with the official documentation
        - Verify that all properties, descriptions, and types match exactly
        - Check that no information is missing or added incorrectly
        - Ensure all examples match the official documentation exactly
     
     2. **Structure Verification**
        - Confirm all sections are in the correct order
        - Verify that the hierarchy of headings matches the official docs
        - Check that all tables follow the specified format
        - Ensure all code blocks are properly formatted with correct language tags
     
     3. **Cross-Reference Check**
        - Verify all internal links are preserved and correct
        - Check that all referenced sections exist
        - Validate that all mentioned properties are documented
        - Ensure consistency in property names across sections
     
     4. **Object Definition Validation**
        - Compare all object definitions with official examples
        - Verify that array object structures are correctly documented
        - Check that all property constraints are accurately captured
        - Validate that default values are correctly specified
     
     5. **Documentation Completeness**
        - Create a checklist for each section comparing official vs crawled content
        - Document any discrepancies found
        - Track any sections that couldn't be crawled
        - Note any areas that need manual verification
     
     6. **API Endpoint Verification**
        - Verify all endpoint URLs are correct
        - Check that all parameters are documented
        - Validate request/response examples
        - Ensure all HTTP methods are correctly specified
     
     7. **Version Control**
        - Document the version of the official docs that was crawled
        - Note any changes in the official docs structure
        - Track any updates needed due to documentation changes
     
     8. **Final Validation**
        - Have a second person review the crawled content
        - Compare the final markdown with the live documentation
        - Verify all formatting is consistent
        - Check that all images and assets are properly referenced

   - Create a QA report for each crawled section with:
     ```markdown
     ## QA Report for [Section Name]
     
     ### Content Verification
     - [ ] All properties documented
     - [ ] All descriptions match
     - [ ] All types are correct
     - [ ] Examples are identical
     
     ### Structure Check
     - [ ] Sections in correct order
     - [ ] Heading hierarchy matches
     - [ ] Table formatting correct
     - [ ] Code blocks properly formatted
     
     ### Cross-References
     - [ ] Internal links verified
     - [ ] All sections exist
     - [ ] Property consistency checked
     
     ### Object Definitions
     - [ ] All objects match official docs
     - [ ] Array structures correct
     - [ ] Property constraints documented
     - [ ] All expandable sections checked
     - [ ] All object child properties documented
     - [ ] Example objects match expanded properties
     
     ### Expandable Sections
     - [ ] All "Show" buttons identified
     - [ ] All expandable sections clicked
     - [ ] All expanded content documented
     - [ ] All child properties verified
     - [ ] Content matches examples
     
     ### Version Info
     - Official Docs Version: [version]
     - Crawl Date: [date]
     - Last Verified: [date]
     
     ### Discrepancies Found
     1. [List any differences]
     2. [List any missing content]
     3. [List any formatting issues]
     
     ### Action Items
     - [ ] [Action needed]
     - [ ] [Update required]
     - [ ] [Manual verification needed]
     ```

   - Keep this QA report with the crawled documentation for reference
   - Update the QA report whenever the documentation is modified
   - Use the report to track and fix any discrepancies found

## Prompt 1

Start crawling the Getting Started section of the Storyblok Management API docs using Playwright MCP. Save all the content, including subsections, in a single file named `01-getting-started.md`.

This is the page:
https://www.storyblok.com/docs/management-api/getting-started

## Prompt 2

Continue crawling the Stories section of the Storyblok Management API docs using Playwright MCP. Save all the content, including subsections, in a single file named `02-stories.md`.

This is the page:
https://www.storyblok.com/docs/api/management/stories

## Prompt 3

Continue crawling the Components section of the Storyblok Management API docs using Playwright MCP. Save all the content, including subsections, in a single file named `03-components.md`.

This is the page:
https://www.storyblok.com/docs/api/management/components/
