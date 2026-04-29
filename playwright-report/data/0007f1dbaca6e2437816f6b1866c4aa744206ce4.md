# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Habit Tracker app >> logs out and redirects to /login
- Location: tests\e2e\app.spec.ts:75:7

# Error details

```
Error: browserContext.close: Test ended.
Browser logs:

<launching> C:\Users\Hp\AppData\Local\ms-playwright\firefox-1511\firefox\firefox.exe -no-remote -headless -profile C:\Users\Hp\AppData\Local\Temp\playwright_firefoxdev_profile-xqPQM4 -juggler-pipe -silent
<launched> pid=20188
[pid=20188][err] *** You are running in headless mode.
[pid=20188][err] JavaScript warning: resource://services-settings/Utils.sys.mjs, line 116: unreachable code after return statement
[pid=20188][out] console.warn: services.settings: Ignoring preference override of remote settings server
[pid=20188][out] console.warn: services.settings: Allow by setting MOZ_REMOTE_SETTINGS_DEVTOOLS=1 in the environment
[pid=20188][out] 
[pid=20188][out] Juggler listening to the pipe
[pid=20188][out] Crash Annotation GraphicsCriticalError: |[0][GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt (t=1.05108) [GFX1-]: RenderCompositorSWGL failed mapping default framebuffer, no dt
[pid=20188][err] JavaScript error: chrome://juggler/content/Helper.js, line 82: NS_ERROR_FAILURE: Component returned failure code: 0x80004005 (NS_ERROR_FAILURE) [nsIWebProgress.removeProgressListener]
[pid=20188][out] console.warn: services.settings: #fetchAttachment: Forcing fallbackToDump to false due to Utils.LOAD_DUMPS being false
[pid=20188][out] console.error: (new NotFoundError("Could not find fa0fc42c-d91d-fca7-34eb-806ff46062dc in cache or dump", "resource://services-settings/Attachments.sys.mjs", 48))
[pid=20188][out] console.warn: "Unable to find the attachment for" "fa0fc42c-d91d-fca7-34eb-806ff46062dc"
[pid=20188][err] JavaScript error: http://localhost:3000/_next/static/chunks/node_modules_next_dist_0u_w_5s._.js, line 2085: Error: ./app/signup/page.tsx:1:1
[pid=20188][err] Module not found: Can't resolve '@/components/SignUpForm'
[pid=20188][err] > 1 | import { SignupForm } from "@/components/SignUpForm";
[pid=20188][err]     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[pid=20188][err]   2 | import { Main, Section, StartText, Title, Subtitle, LoginPrompt, LoginLink } from "./SignUp...
[pid=20188][err]   3 | import { Metadata } from "next";
[pid=20188][err]   4 |
[pid=20188][err] 
[pid=20188][err] Import map: aliased to relative './components/SignUpForm' inside of [project]/
[pid=20188][err] 
[pid=20188][err] 
[pid=20188][err] https://nextjs.org/docs/messages/module-not-found
[pid=20188][err] 
[pid=20188][err] 
[pid=20188][out] console.error: services.settings: 
[pid=20188][out]   Message: EmptyDatabaseError: "main/nimbus-desktop-experiments" has not been synced yet
[pid=20188][out]   Stack:
[pid=20188][out]     EmptyDatabaseError@resource://services-settings/Database.sys.mjs:19:5
[pid=20188][out] list@resource://services-settings/Database.sys.mjs:96:13
[pid=20188][out] 
[pid=20188][err] JavaScript error: http://localhost:3000/_next/static/chunks/node_modules_next_dist_0u_w_5s._.js, line 2085: Error: ./app/signup/page.tsx:1:1
[pid=20188][err] Module not found: Can't resolve '@/components/SignUpForm'
[pid=20188][err] > 1 | import { SignupForm } from "@/components/SignUpForm";
[pid=20188][err]     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[pid=20188][err]   2 | import { Main, Section, StartText, Title, Subtitle, LoginPrompt, LoginLink } from "./SignUp...
[pid=20188][err]   3 | import { Metadata } from "next";
[pid=20188][err]   4 |
[pid=20188][err] 
[pid=20188][err] Import map: aliased to relative './components/SignUpForm' inside of [project]/
[pid=20188][err] 
[pid=20188][err] 
[pid=20188][err] https://nextjs.org/docs/messages/module-not-found
[pid=20188][err] 
[pid=20188][err] 
[pid=20188][out] console.error: [Exception... "Component returned failure code: 0x80070057 (NS_ERROR_ILLEGAL_VALUE) [nsIWinTaskbar.getTaskbarProgress]"  nsresult: "0x80070057 (NS_ERROR_ILLEGAL_VALUE)"  location: "JS frame :: moz-src:///browser/components/downloads/DownloadsTaskbar.sys.mjs :: #windowsAttachIndicator :: line 183"  data: no]
[pid=20188][err] JavaScript error: http://localhost:3000/_next/static/chunks/node_modules_next_dist_0u_w_5s._.js, line 2085: Error: ./app/signup/page.tsx:1:1
[pid=20188][err] Module not found: Can't resolve '@/components/SignUpForm'
[pid=20188][err] > 1 | import { SignupForm } from "@/components/SignUpForm";
[pid=20188][err]     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[pid=20188][err]   2 | import { Main, Section, StartText, Title, Subtitle, LoginPrompt, LoginLink } from "./SignUp...
[pid=20188][err]   3 | import { Metadata } from "next";
[pid=20188][err]   4 |
[pid=20188][err] 
[pid=20188][err] Import map: aliased to relative './components/SignUpForm' inside of [project]/
[pid=20188][err] 
[pid=20188][err] 
[pid=20188][err] https://nextjs.org/docs/messages/module-not-found
[pid=20188][err] 
[pid=20188][err] 
```