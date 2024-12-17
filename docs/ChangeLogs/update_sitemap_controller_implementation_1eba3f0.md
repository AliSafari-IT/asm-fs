# Updated Sitemap Controller Implementation

Date: 2024-12-17

This change updates the implementation of the sitemap controller to use the `IMediator` for handling commands and queries.

## Details

The `SitemapsController` class in the `SitemapsController` class has been updated to use the `IMediator` for handling commands and queries.

### Changes Made:
- **New Controller**: Added `SitemapsController` for handling sitemap-related operations.
- **Updated `Program.cs`**: Simplified the `DbContext` registration to use `ApplicationDbContext`.
- **New Services**: Introduced a new `sitemapService` for managing sitemap items.
- **Updated Project File**: Added the `MediatR` package for handling commands and queries.
- **Various UI Updates**: Adjustments to the front-end components to integrate the new sitemap functionality.

### Relevant Code Snippets:
1. **SitemapsController**:
   ```csharp
   [ApiController]
   [Route("api/[controller]")]
   public class SitemapsController : ControllerBase
   {
       private readonly IMediator _mediator;

       public SitemapsController(IMediator mediator)
       {
           _mediator = mediator;
       }

       [HttpPost]
       public async Task<IActionResult> Create([FromBody] CreateSitemapCommand command)
       {
           var result = await _mediator.Send(command);
           return Ok(result);
       }
   }
   ```

2. **DbContext Registration in Program.cs**:
   ```csharp
   builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySql(conn, sv));
   ```

3. **Sitemap Service**:
   ```javascript
   export const sitemapService = {
       async createSitemap(sitemap: ISitemapItem) {
           const response = await apiClient.post(BASE_URL, sitemap);
           return response.data;
       },
       async getAllSitemaps() {
           const response = await apiClient.get(BASE_URL);
           return response.data;
       },
   };
   ```
