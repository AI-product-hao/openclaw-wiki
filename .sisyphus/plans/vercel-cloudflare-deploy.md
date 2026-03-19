# Deploy OpenClaw Wiki to Vercel with Cloudflare DNS

## TL;DR

> **Quick Summary**: Deploy this static-export Next.js site to Vercel, attach both `openclawwiki.com` and `www.openclawwiki.com`, point Cloudflare DNS to Vercel, then configure `www` to redirect to the apex domain.
>
> **Deliverables**:
> - Working Vercel project for this repository
> - `openclawwiki.com` serving the site over HTTPS
> - `www.openclawwiki.com` redirecting to `https://openclawwiki.com`
> - Verification evidence for build, DNS, redirect, and TLS
>
> **Estimated Effort**: Short
> **Parallel Execution**: YES - 4 waves
> **Critical Path**: Task 1 -> Task 4 -> Task 5 -> Task 7 -> Task 8 -> Task 9 -> Task 10

---

## Context

### Original Request
Deploy this project to Vercel and configure the already-purchased Cloudflare-managed domain `openclawwiki.com`, with apex as the primary domain and `www.openclawwiki.com` redirecting to the apex.

### Interview Summary
**Key Discussions**:
- Primary domain choice: `openclawwiki.com` is primary
- Redirect policy: `www.openclawwiki.com` must redirect to the apex
- DNS remains managed in Cloudflare, not delegated to Vercel nameservers

**Research Findings**:
- `next.config.ts:3` configures static export with `output: 'export'`, `distDir: 'dist'`, `images.unoptimized: true`, and `trailingSlash: true`
- `package.json:5` uses npm scripts with `build` = `next build`, so Vercel should build via `npm run build`
- `src/app/posts/[slug]/page.tsx:41` uses only `process.env.NODE_ENV`, so no required deployment secrets were found for basic hosting
- Official Vercel guidance for Cloudflare-managed DNS is apex `A 76.76.21.21` and `www CNAME cname.vercel.com`, with Cloudflare proxy disabled during verification and certificate issuance

### Metis Review
**Identified Gaps** (addressed):
- Added guardrails against code changes, proxy enablement, redirect loops, and account-ownership conflicts
- Added acceptance criteria for local build, Vercel readiness, DNS resolution, redirect behavior, and TLS issuance
- Added edge-case handling for conflicting DNS records, CAA restrictions, propagation lag, and cross-account domain ownership

---

## Work Objectives

### Core Objective
Publish this repository on Vercel using its existing static-export configuration and bind the Cloudflare-managed domain so the apex serves the site directly over HTTPS while `www` permanently redirects to the apex.

### Concrete Deliverables
- Vercel project linked to this repository with correct build settings
- Vercel domains added: `openclawwiki.com`, `www.openclawwiki.com`
- Cloudflare DNS records updated to point apex and `www` to Vercel
- Permanent redirect from `https://www.openclawwiki.com/` to `https://openclawwiki.com/`
- Evidence files for build output, DNS lookups, TLS validation, and HTTP response checks

### Definition of Done
- [ ] `npm ci && npm run build` exits `0` and produces `dist/`
- [ ] Vercel project shows the deployment as Ready
- [ ] `dig +short openclawwiki.com A` returns `76.76.21.21`
- [ ] `dig +short www.openclawwiki.com CNAME` returns `cname.vercel.com.`
- [ ] `curl -I https://openclawwiki.com` returns `200`
- [ ] `curl -I https://www.openclawwiki.com` returns `301` or `308` with `Location: https://openclawwiki.com/...`
- [ ] TLS certificate is valid for `openclawwiki.com`

### Must Have
- Keep deployment compatible with existing static export settings in `next.config.ts:3`
- Use Cloudflare as DNS host and Vercel as application host
- Keep `www` and apex both attached in Vercel before final DNS verification
- Capture enough evidence to prove build, DNS, redirect, and HTTPS success

### Must NOT Have (Guardrails)
- Do not change application code unless deployment is blocked by a verified static-export incompatibility
- Do not enable Cloudflare orange-cloud proxy until Vercel verification and certificate issuance both succeed
- Do not configure redirect logic in both Cloudflare and Vercel at the same time
- Do not expand scope into analytics, caching, WAF, SEO tuning, CI, or performance optimization
- Do not remove prior DNS records without first recording them for rollback
- Do not proceed if the domain is already attached to another Vercel project/team until ownership is resolved

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION for plan acceptance** - every criterion must be executable by an agent, even though the actual dashboard clicks are performed by the operator.

### Test Decision
- **Infrastructure exists**: NO dedicated automated test suite detected
- **Automated tests**: None
- **Framework**: none
- **TDD-oriented policy**: Use verify-before-change and verify-after-change checkpoints for every deployment task (`build/dig/curl/openssl`) to emulate red-green validation around infrastructure changes

### QA Policy
Every task includes agent-executed QA scenarios and an evidence target under `.sisyphus/evidence/`.

- **Repo/build verification**: Bash (`npm ci`, `npm run build`, `ls dist`)
- **DNS verification**: Bash (`dig`, `nslookup`)
- **HTTP verification**: Bash (`curl -I`, `curl -L -I`)
- **TLS verification**: Bash (`openssl s_client`)
- **Dashboard evidence**: operator screenshots saved into `.sisyphus/evidence/` when required for Vercel/Cloudflare settings confirmation

---

## Execution Strategy

### Parallel Execution Waves

Wave 1 (Start Immediately - preflight and guardrails):
- Task 1: Verify local build and exported output
- Task 2: Confirm Vercel/Cloudflare access and domain ownership state
- Task 3: Snapshot current Cloudflare DNS and CAA state for rollback

Wave 2 (After Wave 1 - Vercel project setup):
- Task 4: Create/import Vercel project with correct build settings
- Task 5: Attach apex and `www` domains in Vercel
- Task 6: Prepare verification commands and evidence paths before DNS changes

Wave 3 (After Wave 2 - DNS cutover and routing):
- Task 7: Update Cloudflare apex and `www` DNS records for Vercel
- Task 8: Verify propagation and Vercel domain validation
- Task 9: Configure `www` -> apex redirect in Vercel and verify no redirect loop

Wave 4 (After Wave 3 - production validation):
- Task 10: Verify HTTPS, response codes, and certificate health on apex and `www`
- Task 11: Compare final production behavior against expected static-export output
- Task 12: Document rollback-ready final state and unresolved follow-ups, if any

Wave FINAL (After all tasks - 4 parallel reviews):
- F1: Plan compliance audit
- F2: Deployment quality review
- F3: Real QA replay of DNS/HTTP/TLS checks
- F4: Scope fidelity check

Critical Path: 1 -> 4 -> 5 -> 7 -> 8 -> 9 -> 10 -> FINAL
Parallel Speedup: Moderate, limited by DNS propagation and domain verification
Max Concurrent: 3

### Dependency Matrix

- **1**: none -> 4, 11
- **2**: none -> 4, 5, 7
- **3**: none -> 7, 12
- **4**: 1, 2 -> 5, 6
- **5**: 2, 4 -> 7, 8, 9
- **6**: 4 -> 8, 10, 11
- **7**: 3, 5 -> 8, 10
- **8**: 5, 6, 7 -> 9, 10
- **9**: 5, 8 -> 10, 11
- **10**: 6, 7, 8, 9 -> FINAL
- **11**: 1, 6, 9 -> FINAL
- **12**: 3, 10, 11 -> FINAL

### Agent Dispatch Summary

- **Wave 1**: T1 -> `quick`, T2 -> `unspecified-high`, T3 -> `quick`
- **Wave 2**: T4 -> `quick`, T5 -> `quick`, T6 -> `quick`
- **Wave 3**: T7 -> `quick`, T8 -> `unspecified-high`, T9 -> `quick`
- **Wave 4**: T10 -> `unspecified-high`, T11 -> `quick`, T12 -> `writing`
- **Final**: F1 -> `oracle`, F2 -> `unspecified-high`, F3 -> `unspecified-high`, F4 -> `deep`

---

## TODOs

- [ ] 1. Verify local build and exported output

  **What to do**:
  - Run `npm ci && npm run build`
  - Confirm `dist/` exists and contains export output
  - Record any build blocker before touching Vercel or DNS

  **Must NOT do**:
  - Do not change source code unless a verified deployment blocker is found

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: straightforward repo verification with a single build command
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**:
    - `playwright`: no browser interaction needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: 4, 11
  - **Blocked By**: None

  **References**:
  - `package.json:5` - build script source of truth (`next build`)
  - `next.config.ts:3` - confirms static export and `dist` output expectations
  - `README.md` - states the site is Vercel-ready and the build output should land in `dist/`

  **Acceptance Criteria**:
  - [ ] `npm ci && npm run build` exits `0`
  - [ ] `dist/` exists after build
  - [ ] Build logs show static export completed without runtime-only feature failures

  **QA Scenarios**:
  ```text
  Scenario: Happy path local export build
    Tool: Bash
    Preconditions: clean working tree or known-safe local state; network available for npm install
    Steps:
      1. Run `npm ci` in repo root
      2. Run `npm run build`
      3. Run `ls dist`
    Expected Result: build exits 0 and `dist` contains exported site files
    Failure Indicators: non-zero exit, missing `dist`, static export incompatibility error
    Evidence: .sisyphus/evidence/task-1-build.txt

  Scenario: Failure path build blocker detection
    Tool: Bash
    Preconditions: same environment
    Steps:
      1. Re-run `npm run build` if initial build failed
      2. Capture the exact error output
      3. Stop further deployment tasks and record blocker
    Expected Result: blocker is captured verbatim and no deployment proceeds blindly
    Evidence: .sisyphus/evidence/task-1-build-error.txt
  ```

  **Commit**: NO

- [ ] 2. Confirm Vercel/Cloudflare access and domain ownership state

  **What to do**:
  - Verify operator has admin access to the target Vercel account/team and Cloudflare zone
  - Check whether `openclawwiki.com` is already attached to another Vercel project/team
  - Record any ownership conflict before DNS changes

  **Must NOT do**:
  - Do not reassign the domain if ownership is unclear

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: domain ownership mistakes can cause blocking account-level issues
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: 4, 5, 7
  - **Blocked By**: None

  **References**:
  - `README.md` - indicates the intended public domain already exists conceptually
  - Vercel custom domains docs - explains verification and domain ownership behavior

  **Acceptance Criteria**:
  - [ ] Operator confirms access to both dashboards
  - [ ] Vercel does not report a cross-project/team ownership block for either domain

  **QA Scenarios**:
  ```text
  Scenario: Happy path domain available in target Vercel account
    Tool: Screenshot capture + manual dashboard action log
    Preconditions: logged into intended Vercel account/team and Cloudflare zone
    Steps:
      1. Open Vercel project settings -> Domains
      2. Attempt to add `openclawwiki.com`
      3. Confirm Vercel accepts the domain without ownership conflict warning
    Expected Result: domain can be added in the intended project/team
    Failure Indicators: Vercel reports domain already assigned elsewhere or permissions denied
    Evidence: .sisyphus/evidence/task-2-domain-ownership.png

  Scenario: Failure path ownership conflict
    Tool: Screenshot capture + manual dashboard action log
    Preconditions: same dashboard access
    Steps:
      1. Attempt domain attach for apex or `www`
      2. Capture the exact Vercel conflict message if shown
      3. Stop further cutover steps until ownership is resolved
    Expected Result: blocking conflict is documented before DNS changes
    Evidence: .sisyphus/evidence/task-2-domain-ownership-error.png
  ```

  **Commit**: NO

- [ ] 3. Snapshot current Cloudflare DNS and CAA state for rollback

  **What to do**:
  - Export or screenshot existing DNS records for apex and `www`
  - Check for conflicting `A`, `AAAA`, `CNAME`, and restrictive `CAA` records
  - Record rollback values before any modifications

  **Must NOT do**:
  - Do not delete existing records before they are documented

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: focused documentation and inspection task
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: 7, 12
  - **Blocked By**: None

  **References**:
  - Cloudflare DNS docs - apex record constraints and record management behavior
  - Cloudflare CAA docs - certificate issuance allowlist behavior

  **Acceptance Criteria**:
  - [ ] Existing apex and `www` DNS records are captured
  - [ ] Any `CAA` records are recorded
  - [ ] A rollback note exists with old values

  **QA Scenarios**:
  ```text
  Scenario: Happy path baseline capture
    Tool: Screenshot capture + manual dashboard action log
    Preconditions: access to Cloudflare DNS for `openclawwiki.com`
    Steps:
      1. Open Cloudflare DNS page for the zone
      2. Capture records for `@`, `www`, and any `CAA`
      3. Save screenshots and a rollback note
    Expected Result: pre-change DNS baseline is preserved
    Failure Indicators: no record snapshot exists or CAA state is unknown
    Evidence: .sisyphus/evidence/task-3-dns-baseline.png

  Scenario: Failure path conflicting records found
    Tool: Screenshot capture + manual dashboard action log
    Preconditions: same DNS page
    Steps:
      1. Inspect for duplicate/conflicting `A`, `AAAA`, or `CNAME` records
      2. Capture any conflict before editing
    Expected Result: conflicts are identified before cutover
    Evidence: .sisyphus/evidence/task-3-dns-conflict.png
  ```

  **Commit**: NO

- [ ] 4. Create/import Vercel project with correct build settings

  **What to do**:
  - Import the repository into Vercel or select the existing project
  - Confirm framework preset resolves to Next.js
  - Set build command to `npm run build` if auto-detection is incorrect
  - Set output directory to `dist` if Vercel does not infer it correctly

  **Must NOT do**:
  - Do not add unnecessary env vars or change runtime options unrelated to static hosting

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: deterministic dashboard configuration task
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential in Wave 2
  - **Blocks**: 5, 6
  - **Blocked By**: 1, 2

  **References**:
  - `package.json:5` - build script to mirror in Vercel settings
  - `next.config.ts:3` - export mode and output directory expectation
  - `README.md` - states deploy target is static `dist/` output

  **Acceptance Criteria**:
  - [ ] Repository is connected to the correct Vercel project
  - [ ] Framework preset is Next.js
  - [ ] Build command is `npm run build`
  - [ ] Output directory is `dist` when required

  **QA Scenarios**:
  ```text
  Scenario: Happy path Vercel project configured
    Tool: Screenshot capture + manual dashboard action log
    Preconditions: repository is reachable by Vercel
    Steps:
      1. Create/import project in Vercel
      2. Inspect Build & Output Settings
      3. Confirm framework, build command, and output directory match plan
    Expected Result: project is ready to deploy with correct static-export settings
    Failure Indicators: wrong framework preset, wrong output directory, or missing repo linkage
    Evidence: .sisyphus/evidence/task-4-vercel-settings.png

  Scenario: Failure path incorrect auto-detection
    Tool: Screenshot capture + manual dashboard action log
    Preconditions: project settings open
    Steps:
      1. Compare inferred settings against `package.json` and `next.config.ts`
      2. Capture any mismatch before deployment
    Expected Result: any mismatch is documented and corrected before continuing
    Evidence: .sisyphus/evidence/task-4-vercel-settings-error.png
  ```

  **Commit**: NO

- [ ] 5. Attach apex and `www` domains in Vercel

  **What to do**:
  - Add `openclawwiki.com`
  - Add `www.openclawwiki.com`
  - Keep both attached before redirect configuration

  **Must NOT do**:
  - Do not configure Cloudflare redirect rules for `www`

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: direct domain binding task in one Vercel settings area
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential in Wave 2
  - **Blocks**: 7, 8, 9
  - **Blocked By**: 2, 4

  **References**:
  - Vercel custom domains docs - domain attach and redirect flow
  - Vercel domain troubleshooting docs - ownership and validation statuses

  **Acceptance Criteria**:
  - [ ] Both domains appear in Vercel project settings
  - [ ] Vercel presents expected DNS targets for apex and `www`

  **QA Scenarios**:
  ```text
  Scenario: Happy path domain pair attached
    Tool: Screenshot capture + manual dashboard action log
    Preconditions: project exists in Vercel
    Steps:
      1. Add `openclawwiki.com`
      2. Add `www.openclawwiki.com`
      3. Confirm both domains appear in the domain list
    Expected Result: both domains are attached and waiting for or completing validation
    Failure Indicators: only one domain attached, wrong project, or validation target mismatch
    Evidence: .sisyphus/evidence/task-5-vercel-domains.png

  Scenario: Failure path duplicate/conflict warning
    Tool: Screenshot capture + manual dashboard action log
    Preconditions: same domain settings page
    Steps:
      1. Attempt to add either domain
      2. Capture any warning about duplicate or external ownership
    Expected Result: conflict is documented before DNS cutover
    Evidence: .sisyphus/evidence/task-5-vercel-domains-error.png
  ```

  **Commit**: NO

- [ ] 6. Prepare verification commands and evidence paths before DNS changes

  **What to do**:
  - Create a checklist of exact `dig`, `curl`, and `openssl` commands
  - Define evidence filenames before cutover starts
  - Ensure rollback commands/notes are ready

  **Must NOT do**:
  - Do not start DNS edits before verification steps are ready

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: low-risk procedural preparation task
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (after Task 4, with Tasks 4-5 flow)
  - **Blocks**: 8, 10, 11
  - **Blocked By**: 4

  **References**:
  - Vercel docs - expected DNS targets
  - Cloudflare docs - DNS and CAA checks

  **Acceptance Criteria**:
  - [ ] Command list exists for DNS, HTTP, and TLS verification
  - [ ] Evidence file names are predetermined
  - [ ] Rollback notes reference original DNS values from Task 3

  **QA Scenarios**:
  ```text
  Scenario: Happy path verification prep complete
    Tool: Bash + note capture
    Preconditions: Task 3 baseline exists
    Steps:
      1. Draft exact commands for apex and `www`
      2. Map each command to an evidence file path
      3. Confirm rollback note references old records
    Expected Result: cutover can be validated immediately after change
    Failure Indicators: missing command coverage for DNS, redirect, or TLS
    Evidence: .sisyphus/evidence/task-6-verification-plan.txt

  Scenario: Failure path missing rollback reference
    Tool: Bash + note capture
    Preconditions: same plan draft
    Steps:
      1. Review planned verification bundle
      2. Confirm original record values are present
    Expected Result: rollback-ready documentation exists before DNS edits
    Evidence: .sisyphus/evidence/task-6-verification-plan-error.txt
  ```

  **Commit**: NO

- [ ] 7. Update Cloudflare apex and `www` DNS records for Vercel

  **What to do**:
  - Set apex `A` record: `@ -> 76.76.21.21`
  - Set `www` `CNAME`: `www -> cname.vercel.com`
  - Keep both records as DNS-only (grey cloud) during verification and certificate issuance
  - Remove or disable conflicting old records only after baseline is captured

  **Must NOT do**:
  - Do not leave conflicting `A`/`AAAA`/`CNAME` records active
  - Do not enable Cloudflare proxy yet

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: exact, mechanical DNS cutover task
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential in Wave 3
  - **Blocks**: 8, 10
  - **Blocked By**: 3, 5

  **References**:
  - Vercel docs - required apex `A` and `www` `CNAME` values
  - Cloudflare DNS docs - zone apex rules and record entry behavior

  **Acceptance Criteria**:
  - [ ] Apex record points to `76.76.21.21`
  - [ ] `www` points to `cname.vercel.com`
  - [ ] Proxy status is DNS-only for both records

  **QA Scenarios**:
  ```text
  Scenario: Happy path DNS cutover applied
    Tool: Screenshot capture + manual dashboard action log
    Preconditions: Task 3 baseline captured; Task 5 domains attached in Vercel
    Steps:
      1. Edit apex record to `A @ 76.76.21.21`
      2. Edit/create `CNAME www cname.vercel.com`
      3. Confirm both records are grey-cloud DNS only
    Expected Result: Cloudflare now points both hostnames to Vercel correctly
    Failure Indicators: orange cloud enabled, wrong target, or conflicting legacy records still active
    Evidence: .sisyphus/evidence/task-7-cloudflare-dns.png

  Scenario: Failure path conflicting record still active
    Tool: Screenshot capture + manual dashboard action log
    Preconditions: DNS page open after edits
    Steps:
      1. Inspect for duplicate apex or `www` records
      2. Capture any remaining conflict
    Expected Result: leftover conflicts are documented and resolved before verification
    Evidence: .sisyphus/evidence/task-7-cloudflare-dns-error.png
  ```

  **Commit**: NO

- [ ] 8. Verify propagation and Vercel domain validation

  **What to do**:
  - Run `dig` and `nslookup` checks until apex and `www` resolve as expected
  - Confirm Vercel marks both domains as configured/valid
  - If validation lags, wait and re-check instead of changing settings randomly

  **Must NOT do**:
  - Do not introduce extra DNS changes during normal propagation delay

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: requires careful diagnosis to distinguish propagation delay from bad configuration
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential in Wave 3
  - **Blocks**: 9, 10
  - **Blocked By**: 5, 6, 7

  **References**:
  - Vercel domain troubleshooting docs - expected validation states and failure modes
  - Cloudflare DNS docs - propagation expectations and record visibility

  **Acceptance Criteria**:
  - [ ] `dig +short openclawwiki.com A` returns `76.76.21.21`
  - [ ] `dig +short www.openclawwiki.com CNAME` returns `cname.vercel.com.`
  - [ ] Vercel shows both domains as valid/configured

  **QA Scenarios**:
  ```text
  Scenario: Happy path propagation complete
    Tool: Bash
    Preconditions: Task 7 DNS edits saved
    Steps:
      1. Run `dig +short openclawwiki.com A`
      2. Run `dig +short www.openclawwiki.com CNAME`
      3. Refresh Vercel domain status page
    Expected Result: DNS answers match plan and Vercel marks the domains configured
    Failure Indicators: stale old IPs, empty CNAME answer, or Vercel still showing invalid configuration after reasonable propagation time
    Evidence: .sisyphus/evidence/task-8-propagation.txt

  Scenario: Failure path certificate/validation blocked by CAA or proxy
    Tool: Bash + screenshot capture
    Preconditions: Vercel still not validating after propagation window
    Steps:
      1. Inspect Cloudflare for orange-cloud proxy status and any `CAA` records
      2. Capture exact Vercel error state
    Expected Result: blocking cause is identified specifically rather than guessed
    Evidence: .sisyphus/evidence/task-8-propagation-error.txt
  ```

  **Commit**: NO

- [ ] 9. Configure `www` -> apex redirect in Vercel and verify no redirect loop

  **What to do**:
  - Set `openclawwiki.com` as primary domain in Vercel
  - Configure `www.openclawwiki.com` to redirect permanently to `https://openclawwiki.com`
  - Confirm Cloudflare is not also redirecting `www`

  **Must NOT do**:
  - Do not create competing redirects in Cloudflare

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: single routing rule in Vercel settings
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential in Wave 3
  - **Blocks**: 10, 11
  - **Blocked By**: 5, 8

  **References**:
  - Vercel redirect/domain docs - primary domain and redirect behavior
  - User decision from interview - apex must be primary

  **Acceptance Criteria**:
  - [ ] Vercel marks apex as primary
  - [ ] `www` is configured to redirect to apex
  - [ ] No redirect loop occurs

  **QA Scenarios**:
  ```text
  Scenario: Happy path `www` redirects to apex
    Tool: Bash
    Preconditions: both domains validated in Vercel
    Steps:
      1. Run `curl -I https://www.openclawwiki.com`
      2. Inspect `Location` header
      3. Run `curl -L -I https://www.openclawwiki.com` to follow redirects
    Expected Result: first response is `301` or `308`, final URL is apex, and redirect chain is one hop
    Failure Indicators: no redirect, wrong target, or repeated redirect chain
    Evidence: .sisyphus/evidence/task-9-www-redirect.txt

  Scenario: Failure path redirect loop
    Tool: Bash
    Preconditions: redirect configured
    Steps:
      1. Run `curl -L -I --max-redirs 10 https://www.openclawwiki.com`
      2. Capture loop or excessive redirect behavior if present
    Expected Result: loops are caught immediately and traced to duplicate redirect logic
    Evidence: .sisyphus/evidence/task-9-www-redirect-error.txt
  ```

  **Commit**: NO

- [ ] 10. Verify HTTPS, response codes, and certificate health on apex and `www`

  **What to do**:
  - Verify apex returns `200`
  - Verify `www` redirects with `301`/`308`
  - Validate certificate issuance on apex using `openssl s_client`
  - Wait for lagging certificate issuance if apex works before `www` fully stabilizes

  **Must NOT do**:
  - Do not enable Cloudflare proxy as a workaround for missing Vercel cert issuance

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: production validation across DNS, TLS, and HTTP layers
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential in Wave 4
  - **Blocks**: 12, FINAL
  - **Blocked By**: 6, 7, 8, 9

  **References**:
  - Vercel troubleshooting docs - TLS and validation expectations
  - Cloudflare CAA docs - certificate authority restrictions

  **Acceptance Criteria**:
  - [ ] `curl -I https://openclawwiki.com` returns `200`
  - [ ] `curl -I https://www.openclawwiki.com` returns `301` or `308`
  - [ ] `openssl s_client -connect openclawwiki.com:443 -servername openclawwiki.com` shows a valid cert chain

  **QA Scenarios**:
  ```text
  Scenario: Happy path HTTPS healthy on apex and redirect healthy on `www`
    Tool: Bash
    Preconditions: Tasks 7-9 complete
    Steps:
      1. Run `curl -I https://openclawwiki.com`
      2. Run `curl -I https://www.openclawwiki.com`
      3. Run `openssl s_client -connect openclawwiki.com:443 -servername openclawwiki.com < /dev/null`
    Expected Result: apex returns `200`, `www` returns permanent redirect, and TLS certificate is valid for apex
    Failure Indicators: 525/526 TLS errors, invalid certificate, or redirect target mismatch
    Evidence: .sisyphus/evidence/task-10-https.txt

  Scenario: Failure path partial HTTPS readiness
    Tool: Bash
    Preconditions: one hostname still failing HTTPS
    Steps:
      1. Repeat `curl -I` for both hostnames
      2. Capture exact hostname-specific failure
      3. Confirm whether issue is propagation lag vs persistent cert issue
    Expected Result: partial rollout state is diagnosed precisely
    Evidence: .sisyphus/evidence/task-10-https-error.txt
  ```

  **Commit**: NO

- [ ] 11. Compare final production behavior against expected static-export output

  **What to do**:
  - Check homepage and at least one content route resolve correctly in production
  - Confirm trailing slash behavior is consistent with the export config
  - Confirm draft content is not exposed in production

  **Must NOT do**:
  - Do not turn this into general UI/manual QA outside deployment-critical pages

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: focused post-deploy smoke check
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 10, 12)
  - **Blocks**: FINAL
  - **Blocked By**: 1, 6, 9

  **References**:
  - `next.config.ts:9` - trailing slash expectation
  - `src/app/posts/[slug]/page.tsx:40` - production draft-post hiding behavior
  - SEO route files `src/app/robots.txt/route.ts`, `src/app/sitemap.xml/route.ts`, `src/app/rss.xml/route.ts` - static route outputs expected after deploy

  **Acceptance Criteria**:
  - [ ] Homepage resolves on apex
  - [ ] At least one post route resolves on apex
  - [ ] Trailing-slash routes behave as expected
  - [ ] No draft-only content is exposed publicly

  **QA Scenarios**:
  ```text
  Scenario: Happy path production smoke check
    Tool: Bash
    Preconditions: apex is live over HTTPS
    Steps:
      1. Run `curl -I https://openclawwiki.com/`
      2. Run `curl -I https://openclawwiki.com/posts/<known-slug>/`
      3. Run `curl -I https://openclawwiki.com/robots.txt`
    Expected Result: key routes return successful responses consistent with static export
    Failure Indicators: 404 on known content, missing SEO routes, or inconsistent slash behavior
    Evidence: .sisyphus/evidence/task-11-smoke.txt

  Scenario: Failure path draft exposure or broken content route
    Tool: Bash
    Preconditions: at least one known draft slug or protected content path known
    Steps:
      1. Request a draft-only post path if available
      2. Confirm production returns not-found behavior
    Expected Result: draft content remains hidden in production
    Evidence: .sisyphus/evidence/task-11-smoke-error.txt
  ```

  **Commit**: NO

- [ ] 12. Document rollback-ready final state and unresolved follow-ups

  **What to do**:
  - Record final DNS records, Vercel domain settings, and evidence locations
  - Document rollback steps using the baseline from Task 3
  - Note any optional post-launch items that are explicitly out of scope

  **Must NOT do**:
  - Do not expand into optimization work; capture follow-ups only as notes

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: final deployment state capture and rollback note writing
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 10, 11)
  - **Blocks**: FINAL
  - **Blocked By**: 3, 10, 11

  **References**:
  - Task 3 baseline evidence - source of rollback values
  - Task 7 and Task 9 evidence - source of final DNS and redirect settings

  **Acceptance Criteria**:
  - [ ] Final-state note contains current apex and `www` routing values
  - [ ] Rollback steps map directly to pre-change records
  - [ ] Out-of-scope improvements are listed separately from required work

  **QA Scenarios**:
  ```text
  Scenario: Happy path rollback note complete
    Tool: Text evidence review
    Preconditions: Tasks 3, 7, 9, 10 complete
    Steps:
      1. Compare final note against captured baseline and final evidence
      2. Confirm rollback values and forward values both appear
    Expected Result: rollback can be executed quickly if post-launch issues appear
    Failure Indicators: missing old values, incomplete final routing description, or no evidence index
    Evidence: .sisyphus/evidence/task-12-rollback-note.txt

  Scenario: Failure path unresolved follow-up hidden inside required scope
    Tool: Text evidence review
    Preconditions: final note drafted
    Steps:
      1. Inspect note for any optimization work mixed into core deployment completion
      2. Reclassify extras as follow-ups only
    Expected Result: deployment completion remains tightly scoped
    Evidence: .sisyphus/evidence/task-12-rollback-note-error.txt
  ```

  **Commit**: NO

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** - `oracle`
  Verify the final deployed state matches the plan: apex live on Vercel, `www` redirecting to apex, evidence files present, and no proxy/redirect guardrail violations.

- [ ] F2. **Deployment Quality Review** - `unspecified-high`
  Re-run build, DNS, redirect, and TLS checks; ensure there are no hidden validation warnings, ownership issues, or stale conflicting records.

- [ ] F3. **Real QA Replay** - `unspecified-high`
  Execute every `dig`, `curl`, and `openssl` scenario from Tasks 8-11 and save results to `.sisyphus/evidence/final-qa/`.

- [ ] F4. **Scope Fidelity Check** - `deep`
  Confirm the work delivered deployment + domain connection only, with no unrelated config, app, CI, analytics, or Cloudflare feature changes.

---

## Commit Strategy

- Default expectation: **no repo commit**, because this deployment should be achievable entirely through Vercel and Cloudflare dashboards
- If a verified blocker requires repo changes, use atomic commits only:
  - `chore(vercel): adjust deployment config`
  - `docs(deploy): record vercel cloudflare setup`
- Never mix app-code changes with deployment-documentation changes in one commit

---

## Success Criteria

### Verification Commands
```bash
npm ci && npm run build
dig +short openclawwiki.com A
dig +short www.openclawwiki.com CNAME
curl -I https://openclawwiki.com
curl -I https://www.openclawwiki.com
openssl s_client -connect openclawwiki.com:443 -servername openclawwiki.com < /dev/null
```

### Final Checklist
- [ ] Local static export build succeeds
- [ ] Vercel deployment is Ready
- [ ] Apex resolves to `76.76.21.21`
- [ ] `www` resolves to `cname.vercel.com.`
- [ ] Apex serves HTTPS successfully
- [ ] `www` redirects permanently to apex
- [ ] No Cloudflare proxy or duplicate redirect misconfiguration remains
