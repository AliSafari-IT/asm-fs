# Updated user service and profile components

Date: 2025-01-06

## Features

- **Updated user service and profile components**

### Details:

1. **Modified `userService.ts`** to enhance API interaction:
   ```typescript
   const url = `${API_FULLINFO_URL}/${email.replace('@', '%40')}`;
   ```
   This change ensures that the email is correctly formatted for the API request.

2. **Updated `UserProfile.tsx`** for improved user experience:
   - Removed error display logic to streamline the loading state.
   ```typescript
   // if (error) return <div>{error}</div>;
   ```

3. **Adjusted `categoryColors.ts`** for better color management:
   - Changed the selected palette to use primary colors:
   ```typescript
   const selectedPalette = allPalettes.primary;
   ```

4. **Refined `userUtils.ts`** to optimize user data fetching:
   ```typescript
   const url = `${API_FULLINFO_URL}/${email.replace('@', '%40')}`;
   ```
   This change improves the URL formatting for fetching user information.

---
