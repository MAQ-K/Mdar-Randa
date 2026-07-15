I need to change the deployment structure of this project.

Target URLs:
- Main company website: https://madaranda.com/
- Customer maintenance portal: https://madaranda.com/maintenance/
- Staff application: https://madaranda.com/staff/
- Backend API: https://madaranda.com/api

Please inspect the repository before editing and identify the main website, customer portal, and staff app.

Tasks:

1. Restore/keep the original company website as the root website at `/`.

2. Add a prominent navbar button to the original website:
   - Arabic label: "طلب صيانة"
   - English label: "Maintenance Request"
   - Link: `/maintenance/`
   - Add it to both desktop and mobile navigation.
   - Make it match the existing navbar design.
   - Ensure it works from every website page, including pages in subdirectories.
   - Use a root-relative URL (`/maintenance/`).

3. Configure the customer portal so it is built and served from `/maintenance/`, not `/`.
   - Ensure its build base/public path is `/maintenance/`.
   - Ensure JavaScript, CSS, images, and other assets load correctly from that path.
   - Keep its API base URL as `https://madaranda.com/api`.
   - Add SPA routing fallback configuration if the portal needs it.

4. Keep the staff app at `/staff/`.
   - Ensure its build base/public path is `/staff/`.
   - Keep its API base URL as `https://madaranda.com/api`.

5. Do not place the backend inside the frontend folders.
   - Backend URL remains `/api`.
   - Do not expose backend source files publicly.

6. Build all changed frontend applications and prepare separate deployment archives:
   - Main website files/archive for `public_html`
   - `client-portal-dist.zip` whose contents go in `public_html/maintenance`
   - `staff-app-dist.zip` whose contents go in `public_html/staff`

7. Do not overwrite or delete unrelated existing website files.
   Provide a clear list of:
   - Files changed
   - Build commands run
   - Generated archive locations
   - Exact cPanel deployment destinations
   - Any old files that need to be renamed or removed

8. Verify locally that:
   - The main navbar button opens `/maintenance/`
   - Customer portal assets work under `/maintenance/`
   - Staff assets work under `/staff/`
   - Both apps call `/api` correctly

Do not deploy to cPanel. Make the code/build changes and give me the deployment instructions.