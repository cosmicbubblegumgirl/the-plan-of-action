(() => {
  "use strict";

  const STORAGE_KEY = "sap-spellbook-academy-v2";
  const STREAM_KEY = "sap-spellbook-active-stream-v2";
  const THEME_KEY = "sap-spellbook-theme-v2";
  const BOSS_SECONDS = 3 * 60 * 60;

  const sections = [
    ["dashboard", "Spell Desk", "dashboard"],
    ["grimoire", "Practice Grimoire", "book"],
    ["roadmap", "Quest Map", "map"],
    ["library", "Arcane Library", "library"],
    ["labs", "Potion Labs", "flask"],
    ["charms", "Debugging Charms", "spark"],
    ["simulator", "Spell Simulator", "wand"],
    ["boss", "Final Boss Trial", "timer"],
    ["checklist", "Moonstone Checklist", "check"]
  ];

  const icons = {
    dashboard: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 4h7v7H4zm9 0h7v10h-7zM4 13h7v7H4zm9 3h7v4h-7z" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 5.5c4-2 6.7-1.2 8 1.1 1.3-2.3 4-3.1 8-1.1v14c-4-1.6-6.7-.9-8 1.1-1.3-2-4-2.7-8-1.1zM12 6.6v14" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none"><path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2zm5-2v14m6-12v14" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    library: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 4h5v16H5zm7 0h4v16h-4zm6 1 2 14m-15-4h15" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    flask: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 17l-5-9V3M7.5 14h9" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3 9.7 9.7 3 12l6.7 2.3L12 21l2.3-6.7L21 12l-6.7-2.3zM5 5l2 2m10 10 2 2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    wand: '<svg viewBox="0 0 24 24" fill="none"><path d="m4 20 10-10m-1-5 1-2 1 2 2 1-2 1-1 2-1-2-2-1zm6 7 1-2 1 2 2 1-2 1-1 2-1-2-2-1z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    timer: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="8" stroke-width="1.8"/><path d="M9 3h6m-3 4v6l4 2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6M4 20h16" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke-width="1.8" stroke-linecap="round"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none"><path d="M20 15.3A8 8 0 0 1 8.7 4a8 8 0 1 0 11.3 11.3Z" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke-width="1.8"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-width="1.8" stroke-linecap="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-5-5 5 5-5 5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  const streams = {
    stream1: {
      label: "Stream 1 Certification",
      shortLabel: "Stream 1",
      certification: "Integration Developer",
      grimoire: "The Apprentice Grimoire",
      cardTitle: "The First Grimoire",
      button: "Open Stream 1 Spellbook",
      accent: "mint",
      summary: "Begin your first certification path here. This stream keeps the current Integration Developer study build and turns it into the first spellbook.",
      desk: {
        today: "Build and deploy one integration flow without looking at notes.",
        quest: "Cloud Integration -> API Management -> Event Mesh",
        reminder: "Exact aliases, base paths, rates, and topic names matter.",
        hourglass: "3 hour final boss"
      },
      questMap: [
        ["Prophecy Reading", "Confirm the current SAP Certified - Integration Developer scope and the practical exam style.", "45 min"],
        ["Clean-Core Compass", "Explain why released APIs and events keep the ERP core upgrade-safe.", "50 min"],
        ["Integration Suite Gates", "Map Design, Monitor, Configure, API, and Event Mesh areas to real tasks.", "60 min"],
        ["Package Forge", "Create a governed integration package and iFlow with exact technical naming.", "75 min"],
        ["iFlow Casting", "Build HTTPS sender, Content Modifier, converter, mapping, Request Reply, and HTTP receiver.", "90 min"],
        ["API Shieldcraft", "Create provider, proxy, product, and policies for Verify API Key and Spike Arrest.", "90 min"],
        ["Event Mesh Channeling", "Create a durable queue and exact topic subscription.", "75 min"],
        ["Runtime Divination", "Use message processing logs to isolate the first meaningful error.", "60 min"],
        ["Security Sigils", "Deploy credential aliases and bind them without exposing secrets in the design.", "60 min"],
        ["Mock Arena", "Complete a timed attempt with no hints and thirty minutes reserved for review.", "180 min"]
      ],
      library: [
        ["Integration Stream Scrolls", "Official learning journey", "Developing with SAP Integration Suite, including APIs, Cloud Integration, and process modeling.", "https://learning.sap.com/learning-journeys/developing-with-sap-integration-suite"],
        ["Certification Prophecy", "Official certification page", "Current SAP Certified - Integration Developer certification landing page.", "https://learning.sap.com/certifications/sap-certified-associate-integration-developer"],
        ["Practical Exam Guide", "SAP Learning help", "SAP practical certification setup, launch, attempts, and preparation guidance.", "https://learning.sap.com/helpcenter/certification-support/step-by-step-guide-practical-exams"],
        ["Local HANA SyBA Runbook", "Bundled PDF", "Existing PDF asset retained from the current site for cross-skill database practice.", "./assets/SAP_HANA_SyBA_Practice_Build_Runbook.pdf"]
      ],
      tasks: [
        {
          name: "Forge the Integration Package",
          difficulty: "Foundation",
          time: "15 min",
          source: "Stream 1 current site content; SAP Integration Suite learning journey",
          prophecy: "Create a governed integration package with a readable name, exact technical identifier, and useful description.",
          ingredients: ["SAP Integration Suite tenant", "Design access", "Package naming convention", "Version note"],
          route: "Integration Suite -> Design -> Integrations -> Create",
          steps: ["Open the Design area.", "Choose Create package.", "Enter CERT PREP as the display name.", "Set CERT_PREP_2601 as the technical name.", "Save and confirm the package is visible."],
          code: "Package Name: CERT PREP\nTechnical Name: CERT_PREP_2601\nDescription: Practice artifacts for the integration developer assessment",
          translation: ["Display names are for humans.", "Technical names are exact and often validated.", "Descriptions should explain the business purpose."],
          finished: "Package exists, opens cleanly, and is ready for artifacts.",
          blank: "Package Name: ______\nTechnical Name: ______\nDescription: ______",
          proof: "Reopen the package from Design and verify the exact technical name.",
          traps: ["Using spaces in the technical identifier", "Creating the package in the wrong tenant"],
          counter: "Rename or recreate the package before building artifacts inside it."
        },
        {
          name: "Cast the HTTPS-to-HTTP iFlow",
          difficulty: "Core",
          time: "40 min",
          source: "Stream 1 current site content; SAP Integration Suite learning journey",
          prophecy: "Build a synchronous flow that accepts JSON, enriches headers, maps the payload, and calls a protected receiver.",
          ingredients: ["HTTPS sender", "Content Modifier", "JSON to XML converter", "Message Mapping", "Request Reply", "HTTP receiver"],
          route: "Integration Suite -> Design -> Package -> Integration Flow",
          steps: ["Add the HTTPS sender.", "Set the inbound resource path.", "Create correlation headers in Content Modifier.", "Convert JSON to XML before mapping.", "Call the receiver through Request Reply.", "Deploy and test."],
          code: "HTTPS Sender -> Content Modifier -> JSON to XML Converter -> Message Mapping -> Request Reply -> HTTP Receiver",
          translation: ["The sender opens the endpoint.", "The modifier enriches metadata.", "The converter makes XML mapping possible.", "Request Reply performs the synchronous receiver call."],
          finished: "The deployed iFlow receives a test message and returns the receiver response.",
          blank: "Sender -> ______ -> Converter -> ______ -> Request Reply -> ______",
          proof: "Open Message Processing and confirm the test exchange completed.",
          traps: ["Mapping before conversion", "Deploying before security material exists"],
          counter: "Move the steps into the expected order and redeploy only after required configuration is complete."
        },
        {
          name: "Raise the API Shield",
          difficulty: "Core",
          time: "35 min",
          source: "Stream 1 current site content; SAP Integration Suite learning journey",
          prophecy: "Protect an Orders API with consumer credentials and burst control.",
          ingredients: ["API provider", "API proxy", "Verify API Key policy", "Spike Arrest policy", "API product"],
          route: "Integration Suite -> API Management -> APIs",
          steps: ["Create or select the API provider.", "Create a versioned API proxy.", "Attach Verify API Key in request flow.", "Attach Spike Arrest with the requested rate.", "Deploy and publish through a product."],
          code: "Request PreFlow:\n  Verify API Key\n  Spike Arrest",
          translation: ["Verify API Key checks consumer identity.", "Spike Arrest smooths or limits sudden bursts.", "The product exposes the proxy for controlled consumption."],
          finished: "Calls without a valid key fail; calls with an approved key pass within the rate limit.",
          blank: "Policy 1: ______\nPolicy 2: ______\nBase Path: ______",
          proof: "Send one request without the key and one with the key; compare responses.",
          traps: ["Putting policies on the wrong flow", "Forgetting to publish the product"],
          counter: "Move policies to request PreFlow and retest with a subscribed application key."
        },
        {
          name: "Bind the Event Queue",
          difficulty: "Core",
          time: "30 min",
          source: "Stream 1 current site content; SAP Integration Suite learning journey",
          prophecy: "Create a durable queue and subscribe it to the exact business event topic.",
          ingredients: ["Event Mesh access", "Queue name", "Topic string", "Redelivery policy"],
          route: "Integration Suite -> Configure -> Event Mesh",
          steps: ["Create queue orders.created.q.", "Use non-exclusive access for shared consumers.", "Set maximum redelivery to 3.", "Add the exact topic subscription.", "Publish a sample event."],
          code: "Queue: orders.created.q\nAccess: NON_EXCLUSIVE\nMax Redelivery: 3\nTopic: sap/s4/beh/salesorder/v1/SalesOrder/Created/v1",
          translation: ["The topic routes events.", "The queue stores messages.", "Redelivery defines retry behavior."],
          finished: "A sample SalesOrder Created event lands in the queue.",
          blank: "Queue: ______\nAccess: ______\nTopic: ______",
          proof: "Open the queue and confirm the message count changes after publishing.",
          traps: ["Changing topic case", "Using an exclusive queue when multiple consumers are expected"],
          counter: "Correct the exact topic and replay a representative event."
        }
      ],
      charms: [
        ["Receiver returns 401", "The credential alias is missing, misspelled, or has the wrong secret.", "Deploy or correct the security material alias, then retest from Message Processing.", "New MPL shows receiver call completed.", "Security Sigils"],
        ["Mapping fails after JSON input", "The message is still JSON when XML-based mapping runs.", "Place JSON to XML Converter before Message Mapping.", "Mapping step completes with the expected target payload.", "iFlow Casting"],
        ["API key policy blocks every call", "The app is not subscribed to the product or the key is sent under the wrong header/query name.", "Subscribe the app, copy the correct key, and send it in the expected location.", "Authorized request succeeds while missing-key request fails.", "API Shieldcraft"],
        ["Event queue remains empty", "The topic subscription does not match the producer topic.", "Compare the topic path character by character and fix case or version segments.", "Published test event appears in the queue.", "Event Queue"]
      ],
      simulator: [
        ["Which step should run before XML message mapping when the sender sends JSON?", ["Request Reply", "JSON to XML Converter", "Spike Arrest", "API Product"], 1, "XML message mapping expects XML input."],
        ["Which two API policies match authentication plus burst protection?", ["Assign Message and XML Threat Protection", "Verify API Key and Spike Arrest", "OAuth Bearer and Content Modifier", "CORS and Message Mapping"], 1, "Verify API Key checks consumers; Spike Arrest controls bursts."],
        ["A log warns that ORDER_API was not found, then the receiver returns 401. What should you fix first?", ["The message mapping", "The receiver credential alias", "The Event Mesh queue", "The API product"], 1, "The earliest warning points to missing security material."],
        ["Clean-core integration usually prefers which pattern?", ["Modify unreleased ERP tables directly", "Use released APIs or business events", "Copy database tables nightly without contracts", "Disable governance for speed"], 1, "Released contracts reduce upgrade friction."]
      ],
      checklist: [
        ["Readiness", "I can explain the certification scope from the official SAP page."],
        ["Readiness", "I can complete an iFlow build without looking."],
        ["Readiness", "I can explain each policy and adapter choice."],
        ["Readiness", "I can fill in the blank spell scrolls for package, iFlow, API, and queue tasks."],
        ["Verification", "I can use Message Processing logs to prove a run worked."],
        ["Verification", "I can name the first error, root cause, and counter-spell."],
        ["Final Boss", "I have completed one three-hour no-hints attempt."],
        ["Final Boss", "I reserved final review time for exact values and deployment status."]
      ]
    },
    stream2: {
      label: "Stream 2 Certification",
      shortLabel: "Stream 2",
      certification: "Database Administrator - SAP HANA",
      grimoire: "The Cloud Mage Grimoire",
      cardTitle: "The Second Grimoire",
      button: "Open Stream 2 Spellbook",
      accent: "gold",
      summary: "Enter the advanced certification path focused on SAP HANA Cloud, SAP BTP access, Integration Suite context, migration, installation, administration, monitoring, security, SQL practice, and system-based exam prep.",
      desk: {
        today: "Choose the correct HANA admin tool for five tasks.",
        quest: "BTP access -> HANA Cloud ops -> migration -> security",
        reminder: "Cloud Central handles instance operations; cockpit handles database administration; Database Explorer handles SQL and catalog work.",
        hourglass: "3 hour final boss"
      },
      questMap: [
        ["The Prophecy", "Read the certification page and pin down the Database Administrator - SAP HANA role.", "45 min"],
        ["BTP Gatekeeping", "Compare enterprise, trial, and free tier access; verify entitlements and role collections.", "70 min"],
        ["Tool Triangle", "Master Cloud Central, HANA cockpit, and Database Explorer responsibilities.", "60 min"],
        ["Provisioning Ritual", "Plan region, memory, storage, availability zone, replicas, data lake, and key management choices.", "90 min"],
        ["SQL Rune Bench", "Use SQL Console, Statement Library, catalog objects, imports, and trace files.", "80 min"],
        ["Lifecycle Ward", "Start, stop, upgrade, back up, recover, and verify HANA Cloud instances.", "90 min"],
        ["Resilience Sigils", "Study replicas, scaling, resource monitoring, workload classes, and Elastic Compute Nodes.", "80 min"],
        ["Security Circle", "Configure auditing, users, user groups, roles, privileges, and least privilege.", "90 min"],
        ["Migration Portal", "Plan self-service migration projects and compatibility checks.", "90 min"],
        ["On-Premises Bridge", "Prepare Cloud Connector, virtual host and port, location ID, migration user, and rollback plan.", "90 min"],
        ["Installation Forge", "Review sizing, hardware, Linux requirements, hdblcm, cockpit, tenants, and post-install checks.", "110 min"],
        ["Final Boss Rehearsal", "Run a no-hints attempt across administration, migration, SQL, backup, and security tasks.", "180 min"]
      ],
      library: [
        ["HANA Cloud Rune Book", "Uploaded PDF", "Sprint 2 SAP HANA Cloud study notes with account access, tool split, lifecycle, monitoring, ECN, and security.", "./assets/Sprint_2_SAP_HANA_Cloud_Study_Notes.pdf"],
        ["Migration Potion Manual", "Uploaded DOCX", "Self-Service Migration for SAP HANA Cloud, including on-premises, Neo, Cloud Foundry, validation, and Alert Notification.", "./assets/Sprint_2_Part_2_Self_Service_Migration_SAP_HANA_Cloud.docx"],
        ["Installation and Admin Spellbook", "Uploaded DOCX", "SAP HANA installation and administration lessons covering sizing, Linux, hdblcm, cockpit, tenants, backup, recovery, and security.", "./assets/Sprint_2_Part_3_SAP_HANA_Installation_and_Administration_All_Lessons.docx"],
        ["Official HANA Certification", "SAP Learning", "SAP Certified - Database Administrator - SAP HANA certification page.", "https://learning.sap.com/certifications/sap-certified-associate-database-administrator-sap-hana"],
        ["HANA Cloud Admin Guide", "SAP Help", "Official SAP HANA Cloud database administration guide.", "https://help.sap.com/docs/hana-cloud-database/sap-hana-cloud-sap-hana-database-administration-guide/sap-hana-cloud-sap-hana-database-administration-guide"],
        ["HANA Cloud Tools", "SAP Help", "SAP HANA Cloud Central, SAP HANA cockpit, and SAP HANA database explorer subscription guidance.", "https://help.sap.com/docs/hana-cloud/sap-hana-cloud-administration-guide/subscribing-to-sap-hana-cloud-administration-tools"],
        ["Integration Bridge Scroll", "SAP Learning", "Integration Suite context for BTP administrators who need cross-platform fluency.", "https://learning.sap.com/learning-journeys/developing-with-sap-integration-suite"]
      ],
      tasks: [
        {
          name: "Choose the Correct Admin Tool",
          difficulty: "Foundation",
          time: "20 min",
          source: "Uploaded HANA Cloud Study Notes, Module 3; SAP Help administration tools",
          prophecy: "Route each task to Cloud Central, HANA cockpit, or Database Explorer.",
          ingredients: ["SAP BTP cockpit", "SAP HANA Cloud Central", "HANA cockpit", "Database Explorer"],
          route: "BTP Cockpit -> Subaccount -> Instances and Subscriptions -> SAP HANA Cloud Central",
          steps: ["Use Cloud Central for instance lifecycle and monitoring.", "Use HANA cockpit for database-level monitoring, backups, users, roles, and configuration.", "Use Database Explorer for SQL, catalog browsing, imports, trace files, and statement library work."],
          code: "Cloud Central = instance operations\nHANA cockpit = database administration\nDatabase Explorer = SQL and catalog work",
          translation: ["Instance operations happen above the database.", "Cockpit sees database health and administration objects.", "Database Explorer is the SQL workbench."],
          finished: "You can explain the tool split without hesitation.",
          blank: "Stop/start instance: ______\nCreate audit policy: ______\nRun SQL query: ______",
          proof: "Given five tasks, map each to the correct tool and justify the route.",
          traps: ["Opening Database Explorer for instance scaling", "Using Cloud Central when the task asks for SQL/catalog evidence"],
          counter: "Ask whether the task is instance-level, database-level, or SQL/catalog-level."
        },
        {
          name: "Open the BTP Gate",
          difficulty: "Foundation",
          time: "35 min",
          source: "Uploaded HANA Cloud Study Notes, Modules 1-2",
          prophecy: "Confirm account model, entitlements, and access before provisioning or migration work.",
          ingredients: ["Global account", "Subaccount", "Entitlements", "Role collection", "Cloud Foundry org and space"],
          route: "SAP BTP Cockpit -> Global Account -> Subaccount -> Entitlements",
          steps: ["Identify enterprise, trial, or free tier account context.", "Verify hana, tools, and data lake service plans as needed.", "Assign SAP HANA Cloud Administrator role collection.", "Log out and back in if role changes are not visible."],
          code: "cf login -o <organisation> -s <space> -a <API endpoint>",
          translation: ["The org and space select the Cloud Foundry target.", "The API endpoint selects the region.", "Entitlements decide whether services can be provisioned."],
          finished: "The learner can open Cloud Central and see the expected HANA Cloud tools.",
          blank: "Required service plan: ______\nRole collection: ______\nCLI target: ______",
          proof: "Cloud Central opens and the target subaccount has the expected service plans.",
          traps: ["Confusing trial account with free tier service plan", "Forgetting to refresh permissions after role changes"],
          counter: "Recheck entitlement assignment, role collection, and account type."
        },
        {
          name: "Provision the HANA Cloud Instance",
          difficulty: "Core",
          time: "45 min",
          source: "Uploaded HANA Cloud Study Notes, Module 4; SAP Help administration guide",
          prophecy: "Plan a SAP HANA Cloud instance with size, availability, data lake, and administration options.",
          ingredients: ["Memory", "Storage", "Region", "Availability zone", "Replica choice", "Data lake decision", "Backup and key management notes"],
          route: "Cloud Central -> Create Instance -> SAP HANA Database",
          steps: ["Choose deployment method.", "Set memory, storage, and performance class.", "Choose region and availability zone.", "Decide on replicas and data lake.", "Review backup, cloud connector, and key management options.", "Create and monitor status."],
          code: "{\n  \"memory\": \"<GB>\",\n  \"storage\": \"<GB>\",\n  \"availabilityZone\": \"<zone>\",\n  \"replicas\": \"<strategy>\",\n  \"dataLake\": \"<integrated-or-standalone>\"\n}",
          translation: ["Memory and storage shape cost and capacity.", "Availability options shape resilience.", "Data lake choices shape storage tiering and large-scale data."],
          finished: "Instance is created with documented sizing and availability decisions.",
          blank: "Region: ______\nMemory: ______\nStorage: ______\nReplica strategy: ______",
          proof: "Cloud Central shows the instance status and chosen capacity.",
          traps: ["Provisioning before entitlement checks", "Choosing region without checking data residency or app proximity"],
          counter: "Stop and write the provisioning decision sheet before pressing Create."
        },
        {
          name: "Cast the SQL Console Runes",
          difficulty: "Core",
          time: "40 min",
          source: "Uploaded HANA Cloud Study Notes, Modules 5-6",
          prophecy: "Create a schema and table in Database Explorer, then validate the catalog evidence.",
          ingredients: ["Database Explorer", "SQL Console", "Schema selector", "Catalog browser"],
          route: "Cloud Central -> Instance actions -> Open Database Explorer",
          steps: ["Open Database Explorer.", "Select the target instance.", "Open SQL Console.", "Run the schema and table statements.", "Inspect the catalog object and row count."],
          code: "CREATE SCHEMA \"HC200_SCHEMA\";\n\nCREATE COLUMN TABLE \"HC200_SCHEMA\".\"HC200_DEMO\" (\n  \"ID\" INTEGER,\n  \"NOTE\" NVARCHAR(120)\n);",
          translation: ["The schema groups the objects.", "The column table stores demo data in HANA columnar form.", "Quoted identifiers preserve exact case."],
          finished: "Schema and table exist in the catalog.",
          blank: "CREATE SCHEMA ______;\nCREATE COLUMN TABLE ______ ( ... );",
          proof: "Catalog browser shows HC200_SCHEMA.HC200_DEMO.",
          traps: ["Running in the wrong database connection", "Using a table name that does not match the required case"],
          counter: "Check the selected instance and schema before every statement."
        },
        {
          name: "Seal Backup and Recovery Evidence",
          difficulty: "Core",
          time: "45 min",
          source: "Uploaded HANA Cloud Study Notes, Module 7; uploaded Installation and Admin lessons",
          prophecy: "Explain automatic backups, log backups, retention, and point-in-time recovery target selection.",
          ingredients: ["Backup catalog", "Recovery point", "RPO/RTO", "Root-cause notes"],
          route: "Cloud Central or HANA cockpit -> Backup and Recovery",
          steps: ["Confirm automatic backup policy.", "Check data backup and log backup cadence.", "Choose a recovery time before the incident.", "Investigate root cause before recovery.", "Record validation steps after restore."],
          code: "Daily complete data backup\nLog and catalog backups every 15 minutes\nDefault retention commonly 14 days\nRecovery target = timestamp before the damaging event",
          translation: ["Data backups provide restore baselines.", "Log backups allow recovery after the baseline.", "Point-in-time recovery must avoid replaying the bad change."],
          finished: "You can choose the right recovery target and explain why.",
          blank: "RPO: ______\nRTO: ______\nRecovery target: ______",
          proof: "A recovery plan states the target time, backup evidence, validation, and root cause.",
          traps: ["Recovering to a time after the mistake", "Treating system replication as a backup replacement"],
          counter: "Pick the timestamp before the incident and keep backup and HA concepts separate."
        },
        {
          name: "Open the Migration Portal",
          difficulty: "Advanced",
          time: "60 min",
          source: "Uploaded Self-Service Migration for SAP HANA Cloud",
          prophecy: "Create a migration project and prepare the required source, target, and connectivity evidence.",
          ingredients: ["Migration project", "Source type", "Migration user", "Cloud Connector mapping", "Target database credentials", "Compatibility check"],
          route: "Cloud Central -> Migrations -> Create Migration Project",
          steps: ["Select source type.", "Enter project metadata.", "Provide source and target connection details.", "Run compatibility check.", "Resolve Critical findings.", "Execute, validate, and finalize."],
          code: "Compatibility severity:\nCritical = blocks continuation\nError = object will not migrate\nWarning = behavior may change\nInfo = review only",
          translation: ["The compatibility check protects the migration window.", "Critical findings must be resolved.", "Warnings need review and acceptance or remediation."],
          finished: "Migration project can reach source and target and has no unresolved blockers.",
          blank: "Source type: ______\nVirtual host/port: ______\nLocation ID: ______\nMigration user: ______",
          proof: "Compatibility report is clean enough to proceed and validation plan is written.",
          traps: ["Using a personal admin instead of a dedicated migration user", "Skipping Cloud Connector mapping for on-premises sources"],
          counter: "Create a scoped migration user and confirm virtual host, port, and location ID before execution."
        },
        {
          name: "Draw the Security Circle",
          difficulty: "Core",
          time: "45 min",
          source: "Uploaded HANA Cloud Study Notes, Module 10; uploaded Installation and Admin lessons",
          prophecy: "Use roles, user groups, and audit policies without confusing administration grouping with data access.",
          ingredients: ["Standard user", "Restricted user", "User group", "Role", "Audit policy"],
          route: "HANA cockpit or Database Explorer -> Security",
          steps: ["Create named users instead of sharing SYSTEM.", "Grant privileges through roles.", "Use user groups for user administration delegation.", "Create audit policy for relevant actions.", "Review audit trail storage and noise."],
          code: "CREATE AUDIT POLICY \"HC200 Demo Audit Policy\" AUDITING ALL CONNECT LEVEL INFO;\nALTER AUDIT POLICY \"HC200 Demo Audit Policy\" ENABLE;",
          translation: ["Audit policies define what is recorded.", "Roles package privileges.", "User groups help manage users but do not grant data access."],
          finished: "Audit policy is enabled and access uses roles rather than direct sprawl.",
          blank: "User group controls: ______\nData access controls: ______\nAudit policy captures: ______",
          proof: "Policy appears in audit configuration and roles show assigned privileges.",
          traps: ["Assuming user groups grant object access", "Granting privileges directly to every user"],
          counter: "Move data access into roles and keep groups for administration boundaries."
        },
        {
          name: "Prepare the Installation Forge",
          difficulty: "Advanced",
          time: "70 min",
          source: "Uploaded Installation and Administration All Lessons",
          prophecy: "Build an installation readiness sheet for SAP HANA sizing, supported hardware, Linux, hdblcm, and post-install validation.",
          ingredients: ["Sizing worksheet", "Supported hardware check", "Linux prerequisite list", "SID", "Instance number", "Paths", "Passwords", "hdblcm media"],
          route: "On-premises SAP HANA host -> hdblcm",
          steps: ["Complete sizing evidence.", "Confirm certified hardware or supported cloud design.", "Prepare Linux packages, users, time sync, hostnames, and file systems.", "Run hdblcm with planned parameters.", "Validate services, ports, tenant status, license, backups, and cockpit registration."],
          code: "hdblcm --action=install --sid=<SID> --number=<instance> --components=server",
          translation: ["hdblcm performs lifecycle installation tasks.", "The parameter sheet prevents improvising during install.", "Post-install validation proves the installer result is actually usable."],
          finished: "Installation sheet is complete and post-install checks are ready.",
          blank: "SID: ______\nInstance number: ______\nData path: ______\nLog path: ______\nPost-install check: ______",
          proof: "Checklist includes sizing, hardware, OS, media, parameters, services, backups, monitoring, and security.",
          traps: ["Trusting the installer success message alone", "Skipping backup/security setup after installation"],
          counter: "Treat post-install validation as a required deliverable, not an optional cleanup step."
        }
      ],
      charms: [
        ["I opened the wrong SAP tool", "The task level was misread.", "Use Cloud Central for instance operations, cockpit for database-level monitoring/security, and Database Explorer for SQL/catalog work.", "The task route now matches the expected evidence.", "Choose the Correct Admin Tool"],
        ["Migration compatibility check blocks me", "Critical findings remain unresolved.", "Fix Critical findings before execution; review Warning findings with owners.", "Compatibility report allows the project to continue.", "Open the Migration Portal"],
        ["Cloud Connector source cannot be reached", "Virtual host/port, location ID, or connectivity entitlement is wrong.", "Confirm Cloud Connector mapping, location ID, and connectivity_proxy entitlement.", "Migration project can connect to source.", "Migration Portal"],
        ["Backup evidence is not enough", "The plan relies on a UI message instead of catalog or policy evidence.", "Check backup catalog, retention, and restore target; record RPO/RTO.", "The recovery plan has backup, log, target time, and validation evidence.", "Backup and Recovery"],
        ["User group did not grant data access", "User groups organize administration but roles and privileges control object access.", "Grant privileges through roles and assign roles to users.", "User can access intended objects only.", "Security Circle"],
        ["ECN routing does not work", "Workload class routing was added before ECN provisioning or not removed before deprovisioning.", "Provision ECN first, then add routing; remove routing before deprovisioning.", "Workload routes to the intended compute location.", "Resilience Sigils"]
      ],
      simulator: [
        ["Which tool should you use to run SQL and browse catalog objects?", ["SAP HANA Cloud Central", "SAP HANA database explorer", "SAP BTP account cockpit", "Cloud Connector"], 1, "Database Explorer is the SQL and catalog workbench."],
        ["A task asks you to stop a SAP HANA Cloud instance. Which area fits best?", ["Cloud Central instance actions", "Message Processing Log", "API Management", "Statement Library only"], 0, "Cloud Central handles instance lifecycle operations."],
        ["A migration compatibility check returns Critical findings. What is the correct response?", ["Ignore and continue", "Resolve before migration can continue", "Only document after cutover", "Treat as Info"], 1, "Critical findings block continuation."],
        ["For an on-premises migration source, what connectivity item is specifically required?", ["API product", "Cloud Connector virtual host and port", "Event Mesh queue", "Developer Hub application"], 1, "On-premises migration needs secure BTP connectivity through Cloud Connector."],
        ["Which statement about user groups is correct?", ["They control data access", "They replace roles", "They organize user administration but do not control data access", "They disable auditing"], 2, "Roles and privileges control access; user groups help administer users."],
        ["What should point-in-time recovery target?", ["A time before the incident", "The latest possible timestamp even after the error", "Only the first backup ever taken", "A random log backup"], 0, "Recover to a point before the damaging event."],
        ["What is hdblcm used for?", ["SAP HANA lifecycle installation and component operations", "API traffic limiting", "Event routing", "Only SQL query tuning"], 0, "hdblcm is the SAP HANA lifecycle management tool."],
        ["What is a safe first action after an admin task fails?", ["Change several settings at once", "Collect symptom, time, system, logs, alerts, SQL, recent changes, and impact", "Delete the tenant", "Disable auditing"], 1, "Good troubleshooting starts with evidence."]
      ],
      checklist: [
        ["Readiness", "I can complete the task without looking."],
        ["Readiness", "I can explain every code block line by line."],
        ["Readiness", "I can fill in the answer skeleton."],
        ["Readiness", "I know the expected answer."],
        ["Verification", "I can verify the result in the correct SAP tool."],
        ["Verification", "I know the common mistakes."],
        ["Verification", "I can fix the error using a Debugging Charm."],
        ["Sources", "I can trace the task back to a source reference."],
        ["HANA Cloud", "I can explain BTP accounts, entitlements, Cloud Central, cockpit, and Database Explorer."],
        ["Migration", "I can prepare source, target, migration user, Cloud Connector, compatibility check, and validation plan."],
        ["Administration", "I can explain sizing, hdblcm, tenant lifecycle, backup, recovery, monitoring, security, and roles."],
        ["Final Boss", "I have run a timed attempt across Cloud, migration, install, SQL, and security tasks."]
      ]
    }
  };

  const statusLabels = ["Locked", "Unlocked", "In Progress", "Mastered", "Boss Ready"];
  const state = loadState();
  const requestedStream = new URLSearchParams(location.search).get("stream");
  let activeStreamId = streams[requestedStream] ? requestedStream : (streams[localStorage.getItem(STREAM_KEY)] ? localStorage.getItem(STREAM_KEY) : "stream1");
  let activeSection = "dashboard";
  let simulatorIndex = 0;
  let bossTicker = null;

  const page = document.getElementById("page");
  const primaryNav = document.getElementById("primaryNav");
  const pageTitle = document.getElementById("pageTitle");
  const breadcrumb = document.getElementById("breadcrumb");
  const timerPill = document.getElementById("timerPill");
  const globalTimer = document.getElementById("globalTimer");

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function stream() {
    return streams[activeStreamId] || streams.stream1;
  }

  function progress(streamId = activeStreamId) {
    state[streamId] ||= {
      quests: {},
      labs: {},
      checklist: {},
      simulator: {},
      boss: { active: false, endAt: 0, completed: {}, history: [] },
      lastRune: ""
    };
    state[streamId].boss ||= { active: false, endAt: 0, completed: {}, history: [] };
    state[streamId].quests ||= {};
    state[streamId].labs ||= {};
    state[streamId].checklist ||= {};
    state[streamId].simulator ||= {};
    return state[streamId];
  }

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function icon(name) {
    return icons[name] || "";
  }

  function pct(done, total) {
    return total ? Math.round((done / total) * 100) : 0;
  }

  function formatSeconds(total) {
    const safe = Math.max(0, Math.floor(total));
    const hours = String(Math.floor(safe / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((safe % 3600) / 60)).padStart(2, "0");
    const seconds = String(safe % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function progressStats() {
    const s = stream();
    const p = progress();
    const questReady = Object.values(p.quests).filter((value) => Number(value) >= 3).length;
    const labsDone = Object.values(p.labs).filter(Boolean).length;
    const checklistDone = Object.values(p.checklist).filter(Boolean).length;
    const simDone = Object.values(p.simulator).filter((item) => item?.correct).length;
    const quest = pct(questReady, s.questMap.length);
    const labs = pct(labsDone, s.tasks.length);
    const checklist = pct(checklistDone, s.checklist.length);
    const sim = pct(simDone, s.simulator.length);
    const readiness = Math.round(quest * 0.28 + labs * 0.30 + sim * 0.24 + checklist * 0.18);
    return { quest, labs, checklist, sim, readiness, questReady, labsDone, checklistDone, simDone };
  }

  function renderNav() {
    primaryNav.innerHTML = `
      <p class="nav-label">Academy sections</p>
      ${sections.map(([id, label, iconName]) => `
        <button class="nav-item ${id === activeSection ? "active" : ""}" data-route="${id}" type="button">
          <span class="nav-icon">${icon(iconName)}</span>
          <span>${esc(label)}</span>
        </button>
      `).join("")}
    `;
  }

  function renderStreamMini() {
    const s = stream();
    document.getElementById("streamMini").innerHTML = `
      <span class="mini-label">Current stream</span>
      <strong>${esc(s.shortLabel)}</strong>
      <small>${esc(s.certification)}</small>
      <button class="text-link" data-route="dashboard" type="button">Change stream</button>
    `;
  }

  function goTo(section) {
    const exists = sections.some(([id]) => id === section);
    activeSection = exists ? section : "dashboard";
    if (location.hash.replace("#", "") !== activeSection) {
      location.hash = activeSection;
    }
    renderRoute();
  }

  function renderRoute() {
    const hash = location.hash.replace("#", "");
    if (sections.some(([id]) => id === hash)) activeSection = hash;
    const label = sections.find(([id]) => id === activeSection)?.[1] || "Spell Desk";
    pageTitle.textContent = label;
    breadcrumb.textContent = `${stream().shortLabel} / ${label}`;
    renderNav();
    renderStreamMini();

    const renderers = {
      dashboard: renderDashboard,
      grimoire: renderGrimoire,
      roadmap: renderRoadmap,
      library: renderLibrary,
      labs: renderLabs,
      charms: renderCharms,
      simulator: renderSimulator,
      boss: renderBoss,
      checklist: renderChecklist
    };
    page.innerHTML = (renderers[activeSection] || renderDashboard)();
    page.focus({ preventScroll: true });
    updateTimer();
  }

  function renderDashboard() {
    const s = stream();
    const p = progress();
    const stats = progressStats();
    const nextQuest = s.questMap.findIndex((_, index) => Number(p.quests[index] || 0) < 3);
    const questIndex = nextQuest === -1 ? 0 : nextQuest;
    return `
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">Welcome to the SAP Spellbook Academy</p>
          <h2>Choose your certification stream and open the grimoire.</h2>
          <p>Each stream contains a practice grimoire, guided quests, hands-on potion labs, debugging charms, timed simulations, final boss trials, and a moonstone readiness checklist.</p>
          <div class="hero-line">Study the scrolls. Practise the spells. Defeat the exam beast.</div>
        </div>
        <div class="boss-orb ${stats.readiness >= 80 ? "glowing" : ""}">
          <strong>${stats.readiness}%</strong>
          <span>Moonstone charge</span>
        </div>
      </section>

      <section class="stream-choice-grid" aria-label="Choose your stream">
        ${Object.entries(streams).map(([id, item]) => `
          <article class="stream-card ${id === activeStreamId ? "active" : ""}">
            <div class="card-kicker"><span>${esc(item.label)}</span><span>${esc(item.cardTitle)}</span></div>
            <h3>${esc(item.certification)}</h3>
            <p>${esc(item.summary)}</p>
            <button class="button ${id === activeStreamId ? "button-primary" : "button-secondary"}" data-stream="${id}" type="button">${esc(item.button)}</button>
          </article>
        `).join("")}
      </section>

      <section class="desk-grid">
        ${deskWidget("Today's Spell", s.desk.today, "wand")}
        ${deskWidget("Current Quest", s.questMap[questIndex][0], "map")}
        ${deskWidget("Exam Hourglass", s.desk.hourglass, "timer")}
        ${deskWidget("Last Completed Rune", p.lastRune || "No rune completed yet", "spark")}
      </section>

      <section class="dashboard-grid">
        <article class="panel">
          <div class="panel-head">
            <div>
              <p class="eyebrow">${esc(s.label)}</p>
              <h2>${esc(s.grimoire)}</h2>
              <p>${esc(s.desk.reminder)}</p>
            </div>
          </div>
          <div class="progress-stack">
            ${progressLine("Quest Map", stats.quest)}
            ${progressLine("Potion Labs", stats.labs)}
            ${progressLine("Spell Simulator", stats.sim)}
            ${progressLine("Moonstone Checklist", stats.checklist)}
          </div>
          <div class="action-row">
            <button class="button button-primary" data-route="grimoire" type="button">Open Practice Grimoire ${icon("arrow")}</button>
            <button class="button button-secondary" data-route="boss" type="button">Enter Final Boss Trial</button>
          </div>
        </article>

        <article class="panel academy-map">
          <p class="eyebrow">Academy structure</p>
          <h3>Every stream has its own grimoire.</h3>
          <p>Inside each grimoire, every task becomes a spell: objective, ingredients, portal route, casting steps, code runes, translations, finished spell, blank scroll, debugging curses, and proof checks.</p>
          <div class="mini-map">
            ${sections.slice(1).map(([, label]) => `<span>${esc(label)}</span>`).join("")}
          </div>
        </article>
      </section>
      ${sourceStrip()}
    `;
  }

  function deskWidget(title, body, iconName) {
    return `
      <article class="desk-widget">
        <span class="metric-icon">${icon(iconName)}</span>
        <strong>${esc(title)}</strong>
        <p>${esc(body)}</p>
      </article>
    `;
  }

  function progressLine(label, value) {
    return `
      <div class="progress-line">
        <div><strong>${esc(label)}</strong><span>${value >= 100 ? "Mastered" : "In progress"}</span></div>
        <div class="progress-track"><span style="width:${value}%"></span></div>
        <b>${value}%</b>
      </div>
    `;
  }

  function renderGrimoire() {
    const s = stream();
    return `
      <div class="section-heading">
        <div>
          <p class="eyebrow">${esc(s.label)} Practice Grimoire</p>
          <h2>${esc(s.grimoire)}</h2>
          <p>A spell-by-spell workbook with guided tasks, code runes, answer skeletons, expected results, cheat sheets, glossary terms, debugging charms, and source scroll references.</p>
        </div>
      </div>
      <section class="task-scroll-list">
        ${s.tasks.map((task, index) => taskScroll(task, index, true)).join("")}
      </section>
    `;
  }

  function taskScroll(task, index, openFirst = false) {
    return `
      <details class="task-scroll" ${openFirst && index === 0 ? "open" : ""}>
        <summary>
          <span class="scroll-number">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>${esc(task.name)}</h3>
            <p>${esc(task.difficulty)} - ${esc(task.time)} - ${esc(task.source)}</p>
          </div>
        </summary>
        <div class="scroll-body">
          ${scrollBlock("The Prophecy", task.prophecy)}
          ${listBlock("Spell Ingredients", task.ingredients)}
          ${scrollBlock("Portal Route", task.route)}
          ${listBlock("Casting Steps", task.steps, true)}
          ${codeBlock("Code Runes", task.code)}
          ${listBlock("Rune Translation", task.translation)}
          ${scrollBlock("The Finished Spell", task.finished)}
          ${codeBlock("Blank Spell Scroll", task.blank)}
          ${scrollBlock("Proof of Magic", task.proof)}
          ${listBlock("Curses and Traps", task.traps)}
          ${scrollBlock("Counter-Spell", task.counter)}
          ${scrollBlock("Source Scroll", task.source)}
        </div>
      </details>
    `;
  }

  function scrollBlock(title, body) {
    return `<div class="scroll-block"><strong>${esc(title)}</strong><p>${esc(body)}</p></div>`;
  }

  function listBlock(title, items, ordered = false) {
    const tag = ordered ? "ol" : "ul";
    return `<div class="scroll-block"><strong>${esc(title)}</strong><${tag}>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</${tag}></div>`;
  }

  function codeBlock(title, code) {
    return `<div class="scroll-block"><strong>${esc(title)}</strong><pre>${esc(code)}</pre></div>`;
  }

  function renderRoadmap() {
    const s = stream();
    const p = progress();
    const mastered = Object.values(p.quests).filter((value) => Number(value) >= 3).length;
    return `
      <div class="section-heading">
        <div>
          <p class="eyebrow">The full certification journey</p>
          <h2>Quest Map</h2>
          <p>Turn the exam into chapters, chapters into quests, and quests into practical tasks. Click a quest to advance its status.</p>
        </div>
        <span class="tag">${mastered}/${s.questMap.length} mastered</span>
      </div>
      <section class="quest-grid">
        ${s.questMap.map((quest, index) => {
          const level = Number(p.quests[index] || 0);
          return `
            <article class="quest-card status-${level}">
              <div class="card-kicker"><span>Quest ${index + 1}</span><span>${esc(quest[2])}</span></div>
              <h3>${esc(quest[0])}</h3>
              <p>${esc(quest[1])}</p>
              <button class="status-button" data-quest="${index}" type="button">${esc(statusLabels[level])}</button>
            </article>
          `;
        }).join("")}
      </section>
    `;
  }

  function renderLibrary() {
    const s = stream();
    return `
      <div class="section-heading">
        <div>
          <p class="eyebrow">The resource vault</p>
          <h2>Arcane Library</h2>
          <p>All source scrolls live here: PDFs, DOCX notes, official SAP pages, cheat sheets, glossary anchors, and downloadable handbooks.</p>
        </div>
      </div>
      <section class="library-grid">
        ${s.library.map(([title, type, body, href]) => `
          <article class="library-card">
            <span class="tag">${esc(type)}</span>
            <h3>${esc(title)}</h3>
            <p>${esc(body)}</p>
            <a class="button button-secondary" href="${esc(href)}" target="_blank" rel="noreferrer">Open scroll</a>
          </article>
        `).join("")}
      </section>
      ${sourceStrip()}
    `;
  }

  function renderLabs() {
    const s = stream();
    const p = progress();
    const done = Object.values(p.labs).filter(Boolean).length;
    return `
      <div class="section-heading">
        <div>
          <p class="eyebrow">Hands-on practice</p>
          <h2>Potion Labs</h2>
          <p>Theory becomes muscle memory here. Each lab has ingredients, route, steps, code, explanation, expected answer, and verification checks.</p>
        </div>
        <span class="tag green">${done}/${s.tasks.length} mastered</span>
      </div>
      <section class="lab-grid">
        ${s.tasks.map((task, index) => {
          const mastered = Boolean(p.labs[index]);
          return `
            <article class="lab-card ${mastered ? "mastered" : ""}">
              <div class="card-kicker"><span>Lab ${index + 1}</span><span>${mastered ? "Mastered" : task.difficulty}</span></div>
              <h3>${esc(task.name)}</h3>
              <p>${esc(task.prophecy)}</p>
              <div class="lab-actions">
                <details><summary>Show Ingredients</summary>${listBlock("", task.ingredients)}</details>
                <details><summary>Reveal Code Runes</summary>${codeBlock("", task.code)}</details>
                <details><summary>Explain Rune by Rune</summary>${listBlock("", task.translation)}</details>
                <details><summary>Check My Spell</summary>${scrollBlock("Expected", task.finished)}${scrollBlock("Proof", task.proof)}</details>
              </div>
              <button class="button ${mastered ? "button-success" : "button-primary"}" data-lab="${index}" type="button">${mastered ? "Mastered" : "Mark as Mastered"}</button>
            </article>
          `;
        }).join("")}
      </section>
    `;
  }

  function renderCharms() {
    const s = stream();
    return `
      <div class="section-heading">
        <div>
          <p class="eyebrow">Error fixes</p>
          <h2>Debugging Charms</h2>
          <p>Every exam has curses. This section teaches you how to break them.</p>
        </div>
      </div>
      <section class="charm-list">
        ${s.charms.map(([curse, cause, counter, proof, task]) => `
          <article class="charm-card">
            <div class="curse-ribbon">Curse</div>
            <h3>${esc(curse)}</h3>
            <dl>
              <dt>Cause</dt><dd>${esc(cause)}</dd>
              <dt>Counter-Spell</dt><dd>${esc(counter)}</dd>
              <dt>Proof</dt><dd>${esc(proof)}</dd>
              <dt>Related Task</dt><dd>${esc(task)}</dd>
            </dl>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderSimulator() {
    const s = stream();
    const p = progress();
    const scenario = s.simulator[simulatorIndex % s.simulator.length];
    const saved = p.simulator[scenario[0]];
    const answered = saved && typeof saved.choice === "number";
    return `
      <div class="section-heading">
        <div>
          <p class="eyebrow">Random practice mode</p>
          <h2>Spell Simulator</h2>
          <p>Answer using the grimoire structure: tool, route, steps, code, explanation, expected result, and verification.</p>
        </div>
        <div class="heading-actions">
          <button class="button button-secondary" data-sim-random type="button">Random Spell</button>
          <button class="button button-primary" data-sim-next type="button">Next Spell</button>
        </div>
      </div>
      <section class="simulator-card">
        <div class="mode-row">
          <span>Apprentice Mode: hints on</span>
          <span>Mage Mode: limited hints</span>
          <span>Final Boss Mode: no hints</span>
          <span>Rune Mode: explain the answer</span>
        </div>
        <p class="eyebrow">Scenario ${simulatorIndex + 1} of ${s.simulator.length}</p>
        <h3>${esc(scenario[0])}</h3>
        <div class="choice-grid">
          ${scenario[1].map((choice, index) => `
            <button class="choice-button ${answered && saved.choice === index ? (saved.correct ? "correct" : "wrong") : ""}" data-sim-choice="${index}" type="button">
              <span>${String.fromCharCode(65 + index)}</span>${esc(choice)}
            </button>
          `).join("")}
        </div>
        ${answered ? `
          <div class="feedback ${saved.correct ? "success" : "error"}">
            <strong>${saved.correct ? "Finished spell" : "Needs a counter-spell"}</strong>
            <p>${esc(scenario[3])}</p>
          </div>
        ` : '<div class="hint-box">Choose an answer, then translate the reasoning in your own words before moving on.</div>'}
      </section>
    `;
  }

  function renderBoss() {
    const s = stream();
    const p = progress();
    const boss = p.boss;
    const remaining = boss.active ? Math.max(0, Math.ceil((boss.endAt - Date.now()) / 1000)) : BOSS_SECONDS;
    const completed = Object.values(boss.completed || {}).filter(Boolean).length;
    if (!boss.active) {
      return `
        <section class="boss-welcome">
          <div>
            <p class="eyebrow">You have entered the exam arena.</p>
            <h2>Complete each task. Verify every result. Do not submit until the Moonstone glows.</h2>
            <p>The Final Boss Trial is the pressure test for ${esc(s.certification)}. Timer on. Hints off. Grimoire closed.</p>
            <ul class="boss-rules">
              <li>Read every task before changing anything.</li>
              <li>Track exact names, paths, aliases, values, and tools.</li>
              <li>Reserve the final thirty minutes for verification.</li>
              <li>Use the checklist after the trial to repair weak areas.</li>
            </ul>
            <button class="button button-warning" data-boss-start type="button">Start Final Boss Trial</button>
          </div>
          <div class="boss-clock"><strong>03:00:00</strong><span>Trial time</span></div>
        </section>
      `;
    }
    return `
      <div class="section-heading">
        <div>
          <p class="eyebrow">Countdown active</p>
          <h2>Final Boss Trial</h2>
          <p>Complete the stream tasks before the exam beast wakes.</p>
        </div>
        <div class="heading-actions">
          <span class="tag">${formatSeconds(remaining)}</span>
          <button class="button button-warning" data-boss-submit type="button">Submit Trial</button>
        </div>
      </div>
      <section class="boss-panel">
        <div class="boss-progress">
          <div class="boss-orb ${completed === s.tasks.length ? "glowing" : ""}">
            <strong>${completed}/${s.tasks.length}</strong>
            <span>Tasks complete</span>
          </div>
          <p>When every task is checked and the Moonstone glows, submit your trial and review the repair list.</p>
        </div>
        <div class="boss-task-list">
          ${s.tasks.map((task, index) => {
            const checked = Boolean(boss.completed?.[index]);
            return `
              <label class="check-row ${checked ? "checked" : ""}">
                <input type="checkbox" data-boss-task="${index}" ${checked ? "checked" : ""}>
                <span>${esc(task.name)}</span>
              </label>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderChecklist() {
    const s = stream();
    const p = progress();
    const groups = [...new Set(s.checklist.map(([group]) => group))];
    const done = Object.values(p.checklist).filter(Boolean).length;
    const charge = pct(done, s.checklist.length);
    return `
      <div class="section-heading">
        <div>
          <p class="eyebrow">Readiness tracker</p>
          <h2>Moonstone Checklist</h2>
          <p>The Moonstone only glows when you are truly ready.</p>
        </div>
        <div class="boss-orb small ${charge === 100 ? "glowing" : ""}">
          <strong>${charge}%</strong>
          <span>Charged</span>
        </div>
      </div>
      <section class="checklist-layout">
        ${groups.map((group) => `
          <article class="panel">
            <h3>${esc(group)}</h3>
            ${s.checklist.map((item, index) => ({ item, index })).filter(({ item }) => item[0] === group).map(({ item, index }) => {
              const checked = Boolean(p.checklist[index]);
              return `
                <label class="check-row ${checked ? "checked" : ""}">
                  <input type="checkbox" data-check="${index}" ${checked ? "checked" : ""}>
                  <span>${esc(item[1])}</span>
                </label>
              `;
            }).join("")}
          </article>
        `).join("")}
      </section>
    `;
  }

  function sourceStrip() {
    return `
      <section class="source-strip">
        <div>
          <h3>Use SAP as the source of truth</h3>
          <p>This academy is learner-made. Product behavior and certification scope can change, so confirm important details against SAP Learning and SAP Help.</p>
        </div>
        <div class="source-row">
          <a href="https://learning.sap.com/certifications" target="_blank" rel="noreferrer">SAP Certifications</a>
          <a href="https://learning.sap.com/get-certified/reimagining-certification" target="_blank" rel="noreferrer">Practical exam changes</a>
          <a href="https://help.sap.com/docs/hana-cloud-database" target="_blank" rel="noreferrer">SAP Help Portal</a>
          <a href="https://www.sap.com/about/legal/trademark.html" target="_blank" rel="noreferrer">SAP trademarks</a>
        </div>
      </section>
    `;
  }

  function showToast(message, type = "") {
    const stack = document.getElementById("toastStack");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    stack.appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
  }

  function setStream(id) {
    if (!streams[id]) return;
    activeStreamId = id;
    localStorage.setItem(STREAM_KEY, id);
    simulatorIndex = 0;
    progress(id);
    saveState();
    renderRoute();
    showToast(`${streams[id].shortLabel} spellbook opened.`, "success");
  }

  function updateTimer() {
    const boss = progress().boss;
    if (!boss.active) {
      timerPill.hidden = true;
      clearInterval(bossTicker);
      bossTicker = null;
      return;
    }
    const remaining = Math.max(0, Math.ceil((boss.endAt - Date.now()) / 1000));
    globalTimer.textContent = formatSeconds(remaining);
    timerPill.hidden = false;
    if (remaining <= 0) {
      boss.active = false;
      boss.history.unshift({ completed: Object.values(boss.completed || {}).filter(Boolean).length, endedAt: Date.now(), reason: "expired" });
      saveState();
      showToast("Time expired. Trial closed.", "error");
      renderRoute();
      return;
    }
    if (!bossTicker) bossTicker = setInterval(updateTimer, 1000);
  }

  function handleClick(event) {
    const route = event.target.closest("[data-route]");
    if (route) {
      event.preventDefault();
      document.getElementById("sidebar").classList.remove("open");
      document.getElementById("sidebarScrim").hidden = true;
      goTo(route.dataset.route);
      return;
    }

    const streamButton = event.target.closest("[data-stream]");
    if (streamButton) {
      setStream(streamButton.dataset.stream);
      return;
    }

    const questButton = event.target.closest("[data-quest]");
    if (questButton) {
      const p = progress();
      const index = questButton.dataset.quest;
      p.quests[index] = (Number(p.quests[index] || 0) + 1) % statusLabels.length;
      p.lastRune = `${stream().questMap[index][0]} -> ${statusLabels[p.quests[index]]}`;
      saveState();
      renderRoute();
      return;
    }

    const labButton = event.target.closest("[data-lab]");
    if (labButton) {
      const p = progress();
      const index = labButton.dataset.lab;
      p.labs[index] = !p.labs[index];
      p.lastRune = `${stream().tasks[index].name} ${p.labs[index] ? "mastered" : "reopened"}`;
      saveState();
      renderRoute();
      return;
    }

    const simChoice = event.target.closest("[data-sim-choice]");
    if (simChoice) {
      const s = stream();
      const p = progress();
      const scenario = s.simulator[simulatorIndex % s.simulator.length];
      const choice = Number(simChoice.dataset.simChoice);
      p.simulator[scenario[0]] = { choice, correct: choice === scenario[2] };
      p.lastRune = `${scenario[0]} -> ${choice === scenario[2] ? "correct" : "review"}`;
      saveState();
      renderRoute();
      return;
    }

    if (event.target.closest("[data-sim-next]")) {
      simulatorIndex = (simulatorIndex + 1) % stream().simulator.length;
      renderRoute();
      return;
    }

    if (event.target.closest("[data-sim-random]")) {
      simulatorIndex = Math.floor(Math.random() * stream().simulator.length);
      renderRoute();
      return;
    }

    if (event.target.closest("[data-boss-start]")) {
      const boss = progress().boss;
      boss.active = true;
      boss.endAt = Date.now() + BOSS_SECONDS * 1000;
      boss.completed = {};
      saveState();
      renderRoute();
      showToast("Final Boss Trial started.", "success");
      return;
    }

    if (event.target.closest("[data-boss-submit]")) {
      const boss = progress().boss;
      boss.active = false;
      boss.history.unshift({ completed: Object.values(boss.completed || {}).filter(Boolean).length, endedAt: Date.now(), reason: "submitted" });
      progress().lastRune = "Final Boss Trial submitted";
      saveState();
      renderRoute();
      showToast("Trial submitted. Repair list ready.", "success");
      return;
    }

    const themeButton = event.target.closest("#themeButton");
    if (themeButton) {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem(THEME_KEY, next);
      themeButton.innerHTML = `<span data-icon="${next === "dark" ? "moon" : "sun"}"></span>`;
      hydrateIcons();
      return;
    }

    if (event.target.closest("#menuButton")) {
      document.getElementById("sidebar").classList.add("open");
      document.getElementById("sidebarScrim").hidden = false;
      return;
    }

    if (event.target.closest("#sidebarScrim")) {
      document.getElementById("sidebar").classList.remove("open");
      document.getElementById("sidebarScrim").hidden = true;
    }
  }

  function handleChange(event) {
    const bossTask = event.target.closest("[data-boss-task]");
    if (bossTask) {
      const p = progress();
      p.boss.completed[bossTask.dataset.bossTask] = bossTask.checked;
      saveState();
      renderRoute();
      return;
    }

    const check = event.target.closest("[data-check]");
    if (check) {
      const p = progress();
      p.checklist[check.dataset.check] = check.checked;
      p.lastRune = check.checked ? "Moonstone checklist updated" : "Checklist item reopened";
      saveState();
      renderRoute();
    }
  }

  function hydrateIcons() {
    document.querySelectorAll("[data-icon]").forEach((node) => {
      node.innerHTML = icon(node.dataset.icon);
    });
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }

  function init() {
    progress(activeStreamId);
    document.documentElement.dataset.theme = localStorage.getItem(THEME_KEY) || "dark";
    document.getElementById("themeButton").innerHTML = `<span data-icon="${document.documentElement.dataset.theme === "dark" ? "moon" : "sun"}"></span>`;
    activeSection = location.hash.replace("#", "") || "dashboard";
    document.addEventListener("click", handleClick);
    document.addEventListener("change", handleChange);
    window.addEventListener("hashchange", renderRoute);
    renderRoute();
    hydrateIcons();
    registerServiceWorker();
    document.getElementById("bootScreen").hidden = true;
    document.getElementById("appShell").hidden = false;
  }

  init();
})();
