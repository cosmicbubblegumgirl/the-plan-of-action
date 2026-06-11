(() => {
  "use strict";

  const DB_NAME = "the-plan-of-action";
  const DB_VERSION = 1;
  const ACTIVE_PROFILE_KEY = "poa-active-profile";
  const THEME_KEY = "poa-theme";
  const THREE_HOURS = 3 * 60 * 60 * 1000;

  const pageMeta = {
    dashboard: ["Dashboard", "Workspace / Dashboard"],
    roadmap: ["Study roadmap", "Workspace / Study roadmap"],
    simulator: ["System simulator", "Workspace / System simulator"],
    questions: ["Questions & answers", "Workspace / Questions & answers"],
    walkthroughs: ["Task walkthroughs", "Workspace / Task walkthroughs"],
    landmarks: ["Learning landmarks", "Progress / Learning landmarks"],
    checklist: ["Checklist", "Progress / Checklist"],
    notes: ["My notes", "Progress / My notes"],
    mock: ["3-hour mock assessment", "Assessment / Timed mock"]
  };

  const icons = {
    dashboard: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 4h6v6H4zm10 0h6v10h-6zM4 14h6v6H4zm10 4h6v2h-6z" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    roadmap: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 3v18M6 6h9l-2 3 2 3H6m0 5h11" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    lab: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 17l-5-9V3M7.5 14h9" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    questions: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H7a3 3 0 0 0-3 3zm0 0V21m5-13h7m-7 4h5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    steps: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 6h14M5 12h14M5 18h14M3 6h.01M3 12h.01M3 18h.01" stroke-width="1.8" stroke-linecap="round"/></svg>',
    landmark: '<svg viewBox="0 0 24 24" fill="none"><path d="m12 3 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    checklist: '<svg viewBox="0 0 24 24" fill="none"><path d="m4 6 2 2 3-4M12 6h8M4 13l2 2 3-4m3 2h8M4 20l2 2 3-4m3 2h8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    notes: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 3h11l3 3v15H5zm10 0v4h4M8 11h8m-8 4h8m-8 4h5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    timer: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="8" stroke-width="1.8"/><path d="M9 3h6m-3 3v7l4 2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none"><path d="M20 15.3A8 8 0 0 1 8.7 4a8 8 0 1 0 11.3 11.3Z" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke-width="1.8"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-width="1.8" stroke-linecap="round"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none"><path d="m8 10 4 4 4-4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke-width="1.8" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none"><path d="m6 6 12 12M18 6 6 18" stroke-width="1.8" stroke-linecap="round"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke-width="1.8"/><path d="m16.5 16.5 4 4" stroke-width="1.8" stroke-linecap="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-5-5 5 5-5 5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v12m-4-4 4 4 4-4M5 20h14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };

  const roadmapDays = [
    ["Orientation and baseline", "Read the certification page, scan all five CLD900 units, and attempt ten recall questions without notes.", "60 min"],
    ["Integration strategy", "Study distributed architecture challenges, SAP integration strategy, clean core, and API-led integration.", "75 min"],
    ["Suite navigation", "Learn tenant roles, capabilities, system scope, lifecycle states, and the Design, Monitor, Configure, and APIs areas.", "75 min"],
    ["API foundations", "Practice providers, proxies, resources, base paths, products, applications, and the API lifecycle.", "90 min"],
    ["API policies", "Configure Verify API Key, Spike Arrest, Assign Message, threat protection, and fault handling.", "90 min"],
    ["Cloud Integration basics", "Create packages and artifacts; review sender and receiver channels plus the iFlow development lifecycle.", "90 min"],
    ["Build an integration flow", "Complete simulator tasks 1–3. Rebuild the iFlow sequence once without hints.", "105 min"],
    ["Transform and route", "Practice converters, message mapping, Content Modifier, Camel data, Simple expressions, and routing.", "90 min"],
    ["Security and connectivity", "Review credential aliases, OAuth2, TLS material, destinations, Cloud Connector, and adapter authentication.", "90 min"],
    ["Runtime operations", "Trace failed messages, read MPL evidence, correct configuration, redeploy, and retry.", "90 min"],
    ["Event-driven architecture", "Study queues, topics, subscriptions, direct versus guaranteed delivery, and loose coupling.", "90 min"],
    ["Event Mesh practical", "Complete simulator tasks 6 and 11, then explain the configuration aloud without looking.", "90 min"],
    ["Full mock", "Start the three-hour mock. Finish all twelve tasks and preserve at least thirty minutes for review.", "180 min"],
    ["Repair and rehearse", "Repeat every failed task, tighten your notes, and prepare an exam-day checklist.", "90 min"]
  ];

  const systemChallenges = [
    {
      id: "package",
      title: "Create an integration package",
      domain: "Cloud Integration",
      difficulty: "Foundation",
      area: "Design · Integrations",
      prompt: "Create a package for the assessment artifacts with the exact technical identifier and a meaningful description.",
      instructions: "Name the package CERT PREP. Set the technical name to CERT_PREP_2601 and describe it as Practice artifacts for the integration developer assessment.",
      type: "fields",
      fields: [
        ["name", "Package Name", "text", "CERT PREP"],
        ["technicalName", "Technical Name", "text", "CERT_PREP_2601"],
        ["description", "Short Description", "textarea", "Practice artifacts for the integration developer assessment"]
      ],
      expected: {
        name: "CERT PREP",
        technicalName: "CERT_PREP_2601",
        description: "Practice artifacts for the integration developer assessment"
      },
      hint: "Technical identifiers are exact. Keep the human-readable name separate from the technical name."
    },
    {
      id: "iflow",
      title: "Assemble an integration flow",
      domain: "Cloud Integration",
      difficulty: "Core",
      area: "Design · Integration Flow",
      prompt: "Construct the processing sequence for an HTTPS-to-HTTP sales-order integration.",
      instructions: "Select the six components in the order they should execute after the sender receives the message.",
      type: "sequence",
      options: ["HTTPS Sender", "Content Modifier", "JSON to XML Converter", "Message Mapping", "Request Reply", "HTTP Receiver"],
      expected: ["HTTPS Sender", "Content Modifier", "JSON to XML Converter", "Message Mapping", "Request Reply", "HTTP Receiver"],
      hint: "Think sender channel, message enrichment, format conversion, transformation, synchronous call, then receiver channel."
    },
    {
      id: "camel",
      title: "Set a Camel Simple expression",
      domain: "Cloud Integration",
      difficulty: "Core",
      area: "Design · Content Modifier",
      prompt: "Create a message header named SourceSystem from the inbound header X-Source-System.",
      instructions: "Choose the expression that reads the inbound Camel header.",
      type: "single",
      options: [
        ["${header.X-Source-System}", "Read the inbound header directly."],
        ["${property.X-Source-System}", "Read an exchange property."],
        ["{{header.X-Source-System}}", "Resolve an externalized parameter."],
        ["#{header:X-Source-System}", "Use a non-Camel expression syntax."]
      ],
      expected: 0,
      hint: "Camel Simple accesses headers through the header namespace."
    },
    {
      id: "apiPolicies",
      title: "Protect an API proxy",
      domain: "API Management",
      difficulty: "Core",
      area: "APIs · Policy Editor",
      prompt: "Secure an Orders API against unauthorized calls and sudden traffic bursts.",
      instructions: "Select exactly two policies: one must verify a consumer credential and one must limit burst traffic.",
      type: "multi",
      options: [
        ["Verify API Key", "Validate the application key supplied by the caller."],
        ["Spike Arrest", "Smooth or limit traffic rates."],
        ["Assign Message", "Create or alter message content."],
        ["XML Threat Protection", "Limit XML structural complexity."]
      ],
      expected: [0, 1],
      hint: "The requirement describes authentication plus traffic protection, not message construction."
    },
    {
      id: "security",
      title: "Deploy security material",
      domain: "Cloud Integration",
      difficulty: "Core",
      area: "Monitor · Security Material",
      prompt: "Create the credential referenced by the HTTP receiver adapter.",
      instructions: "Use User Credentials named ORDER_API for user integration_user. A practice password of ExamReady! is expected by this simulator.",
      type: "fields",
      fields: [
        ["type", "Security Material Type", "select", "User Credentials", ["User Credentials", "OAuth2 Client Credentials", "Secure Parameter"]],
        ["name", "Name", "text", "ORDER_API"],
        ["username", "User", "text", "integration_user"],
        ["password", "Password", "password", "ExamReady!"]
      ],
      expected: {
        type: "User Credentials",
        name: "ORDER_API",
        username: "integration_user",
        password: "ExamReady!"
      },
      hint: "The adapter resolves the credential by its deployed material name."
    },
    {
      id: "eventQueue",
      title: "Configure an Event Mesh queue",
      domain: "Event Mesh",
      difficulty: "Core",
      area: "Configure · Event Mesh",
      prompt: "Create a durable queue for the SAP S/4HANA Sales Order Created business event.",
      instructions: "Create queue orders.created.q with NON_EXCLUSIVE access, maximum redelivery 3, and the exact topic subscription shown.",
      type: "fields",
      fields: [
        ["queue", "Queue Name", "text", "orders.created.q"],
        ["access", "Access Type", "select", "NON_EXCLUSIVE", ["NON_EXCLUSIVE", "EXCLUSIVE"]],
        ["redelivery", "Max Redelivery", "number", "3"],
        ["topic", "Topic Subscription", "textarea", "sap/s4/beh/salesorder/v1/SalesOrder/Created/v1"]
      ],
      expected: {
        queue: "orders.created.q",
        access: "NON_EXCLUSIVE",
        redelivery: "3",
        topic: "sap/s4/beh/salesorder/v1/SalesOrder/Created/v1"
      },
      hint: "The topic path is case-sensitive; queue names conventionally use lower case and dots."
    },
    {
      id: "monitor",
      title: "Diagnose a failed message",
      domain: "Operations",
      difficulty: "Core",
      area: "Monitor · Message Processing",
      prompt: "A previously working iFlow now fails at the receiver. Use the message processing log to identify the first corrective action.",
      instructions: "Review the log and choose the most direct fix.",
      type: "log-single",
      log: `[INFO] HTTPS sender accepted POST /orders
[INFO] JSON to XML conversion completed
[INFO] Message mapping completed
[WARN] Security material alias ORDER_API was not found
[ERROR] HTTP receiver returned 401 Unauthorized
[ERROR] Message processing failed`,
      options: [
        ["Deploy or correct ORDER_API security material", "Fix the missing credential alias referenced by the receiver."],
        ["Replace the JSON to XML converter", "Change the successful conversion step."],
        ["Increase Event Mesh redelivery count", "Change an unrelated messaging setting."],
        ["Remove the HTTPS sender", "Remove the inbound endpoint."]
      ],
      expected: 0,
      hint: "Start with the earliest warning that explains the receiver's authorization failure."
    },
    {
      id: "mapping",
      title: "Complete a message mapping",
      domain: "Cloud Integration",
      difficulty: "Core",
      area: "Design · Message Mapping",
      prompt: "Map the source sales-order fields to the target purchase-order structure.",
      instructions: "Enter the target element for each source field.",
      type: "mapping",
      rows: [
        ["OrderNumber", "PurchaseOrderID"],
        ["Customer", "BuyerID"],
        ["Amount", "NetAmount"]
      ],
      expected: {
        OrderNumber: "PurchaseOrderID",
        Customer: "BuyerID",
        Amount: "NetAmount"
      },
      hint: "Match business meaning rather than field position."
    },
    {
      id: "cleanCore",
      title: "Choose the clean-core design",
      domain: "Architecture",
      difficulty: "Foundation",
      area: "Integration Strategy",
      prompt: "A custom approval process must react to SAP S/4HANA sales orders while minimizing upgrade friction.",
      instructions: "Choose the design most consistent with clean-core principles.",
      type: "single",
      options: [
        ["Publish a released business event and handle approval outside the ERP core", "Use stable interfaces and side-by-side logic."],
        ["Modify standard ERP code directly", "Embed the workflow in the core."],
        ["Read internal database tables from an external script", "Couple to unreleased internals."],
        ["Disable upgrades after customization", "Avoid change instead of controlling it."]
      ],
      expected: 0,
      hint: "Clean core favors released interfaces and decoupled extensions."
    },
    {
      id: "apiLifecycle",
      title: "Order the API lifecycle",
      domain: "API Management",
      difficulty: "Foundation",
      area: "APIs · Lifecycle",
      prompt: "Move an API from backend connectivity to consumer discovery.",
      instructions: "Place the lifecycle actions in a sensible implementation order.",
      type: "sequence",
      options: ["Create API Provider", "Create API Proxy", "Add Policies", "Deploy API Proxy", "Publish API Product"],
      expected: ["Create API Provider", "Create API Proxy", "Add Policies", "Deploy API Proxy", "Publish API Product"],
      hint: "Connectivity comes first; consumer publication comes after a deployable, protected proxy exists."
    },
    {
      id: "messaging",
      title: "Select the messaging pattern",
      domain: "Event Mesh",
      difficulty: "Foundation",
      area: "Event-Driven Architecture",
      prompt: "One order event must be independently consumed by billing, analytics, and notification services.",
      instructions: "Choose the best communication pattern.",
      type: "single",
      options: [
        ["Publish/subscribe", "Each interested consumer receives the event through subscriptions."],
        ["Point-to-point only", "Exactly one consumer receives each message."],
        ["Synchronous request/reply", "The producer waits for each consumer response."],
        ["Shared database polling", "Every consumer repeatedly queries a common table."]
      ],
      expected: 0,
      hint: "The same event must fan out to multiple independent consumers."
    },
    {
      id: "externalized",
      title: "Externalize deployment configuration",
      domain: "Cloud Integration",
      difficulty: "Core",
      area: "Design · Configuration",
      prompt: "The receiver host differs between development, test, and production tenants.",
      instructions: "Configure the receiver address using the expected externalized parameter syntax and default development URL.",
      type: "fields",
      fields: [
        ["parameter", "Parameter Name", "text", "ReceiverHost"],
        ["adapterValue", "HTTP Adapter Address", "text", "{{ReceiverHost}}/orders"],
        ["defaultValue", "Default Value", "text", "https://dev.api.example.com"]
      ],
      expected: {
        parameter: "ReceiverHost",
        adapterValue: "{{ReceiverHost}}/orders",
        defaultValue: "https://dev.api.example.com"
      },
      hint: "Externalized parameters are referenced with double curly braces."
    }
  ];

  const qaItems = [
    ["Cloud Integration", "What is the difference between a message header and an exchange property?", "A header travels with the message and is commonly used by adapters and routing. An exchange property is internal to the exchange and is useful for values that should not be sent to a receiver."],
    ["Cloud Integration", "When should you use a Content Modifier?", "Use it to create or change the body, headers, and exchange properties without writing custom code."],
    ["Cloud Integration", "What does a Request Reply step do?", "It performs a synchronous call to a receiver and waits for the response before the integration flow continues."],
    ["Cloud Integration", "Why externalize parameters?", "Externalization separates environment-specific values from design-time content so the same artifact can be configured across tenants."],
    ["Cloud Integration", "What is the Message Processing Log used for?", "The MPL records runtime status, processing steps, timestamps, properties, attachments when enabled, and error evidence for a message exchange."],
    ["Cloud Integration", "What is the practical difference between deploy and save?", "Save persists the design draft. Deploy creates or updates the runtime artifact that can process messages."],
    ["Cloud Integration", "How do you reference a header in Camel Simple?", "Use ${header.HeaderName}. Exchange properties use ${property.PropertyName}."],
    ["Cloud Integration", "Why avoid excessive trace logging?", "Trace can expose payload data and consume storage. Enable it temporarily for controlled troubleshooting and disable it afterward."],
    ["API Management", "What is an API provider?", "It stores backend connectivity details used as the source when creating API proxies."],
    ["API Management", "What is an API proxy?", "It is the managed facade exposed to consumers, where routing, security, traffic, and transformation policies are applied."],
    ["API Management", "What does Verify API Key protect?", "It checks that a calling application presents a valid key associated with an approved API product and application."],
    ["API Management", "What does Spike Arrest do?", "It limits or smooths request rates to protect the target system from sudden bursts."],
    ["API Management", "Why publish an API product?", "A product packages one or more APIs for discovery, subscription, approval, and consumption through a developer portal or hub."],
    ["API Management", "Where are policies executed?", "Policies are attached to proxy or target flows such as PreFlow, PostFlow, and conditional flows for requests or responses."],
    ["Event Mesh", "What is guaranteed messaging?", "The broker persists a message until it can be delivered and acknowledged, subject to queue and redelivery configuration."],
    ["Event Mesh", "What is the difference between a queue and a topic?", "A topic is a routing address or subscription pattern. A queue stores messages for consumption and can subscribe to one or more topics."],
    ["Event Mesh", "When is publish/subscribe appropriate?", "Use it when the same event should fan out to multiple independent consumers without coupling the producer to them."],
    ["Event Mesh", "What does NON_EXCLUSIVE queue access allow?", "It allows multiple consumers to bind to the queue, typically distributing messages among them."],
    ["Architecture", "What does clean core mean for integration?", "Use released APIs and events, keep custom logic decoupled, govern interfaces, and avoid direct modifications or dependencies on unreleased internals."],
    ["Architecture", "Why create an integration strategy?", "It aligns business needs, platforms, patterns, governance, ownership, and lifecycle practices across a distributed landscape."],
    ["Architecture", "What is loose coupling?", "Producers and consumers depend on stable contracts rather than each other's implementation or availability."],
    ["Operations", "What should you inspect first after an iFlow failure?", "Start with message status and the earliest meaningful warning or error in the MPL, then inspect the failing step and related configuration."],
    ["Operations", "Why can a receiver return HTTP 401?", "Typical causes include missing or invalid credentials, an incorrect credential alias, token configuration, or insufficient authorization."],
    ["Operations", "What is a safe retry workflow?", "Correct the root cause, redeploy or update runtime configuration if needed, then retry or resend while checking idempotency and duplicate-processing risk."]
  ].map((item, index) => ({ id: `qa-${index + 1}`, category: item[0], question: item[1], answer: item[2] }));

  const walkthroughs = [
    {
      id: "w-package",
      title: "Create and deploy an integration package",
      duration: "15 min",
      objective: "Create a governed package, add an iFlow artifact, save the draft, and understand when deployment occurs.",
      steps: [
        "Open Design → Integrations and choose Create.",
        "Enter a readable package name, exact technical name, description, and version.",
        "Open the package and add an Integration Flow artifact.",
        "Name the iFlow according to the business purpose, not the protocol alone.",
        "Save the artifact and review the package contents before deployment.",
        "Deploy only after mandatory configuration and validation are complete."
      ]
    },
    {
      id: "w-iflow",
      title: "Build an HTTPS-to-HTTP iFlow",
      duration: "35 min",
      objective: "Create a synchronous integration that receives JSON, transforms it, and calls a protected HTTP endpoint.",
      steps: [
        "Connect the sender participant to the process with an HTTPS sender adapter.",
        "Set the HTTPS address and allowed method, then define authentication as required.",
        "Add a Content Modifier for correlation and business headers.",
        "Convert JSON to XML before XML-based message mapping.",
        "Create and test the message mapping with representative input.",
        "Add Request Reply and connect the receiver with an HTTP adapter.",
        "Externalize the host, configure authentication, save, deploy, and send a test request.",
        "Open Message Monitoring and confirm the exchange completed."
      ]
    },
    {
      id: "w-monitor",
      title: "Troubleshoot a failed exchange",
      duration: "20 min",
      objective: "Use runtime evidence to isolate the first failing component and verify the correction.",
      steps: [
        "Open Monitor → Integrations → Message Processing.",
        "Filter by artifact, time window, status, or correlation identifier.",
        "Open the failed message and read the earliest warning and root exception.",
        "Identify whether the cause is payload, mapping, connectivity, authentication, or receiver behavior.",
        "Correct the smallest relevant configuration or design issue.",
        "Redeploy only if the artifact changed; runtime material changes may not require it.",
        "Retry or resend with duplicate-processing risk in mind.",
        "Confirm the new MPL is completed and record the root cause."
      ]
    },
    {
      id: "w-api",
      title: "Create and protect an API proxy",
      duration: "30 min",
      objective: "Expose a backend API through a versioned proxy with consumer and traffic controls.",
      steps: [
        "Create an API provider and verify backend connectivity.",
        "Create an API proxy from the provider and select the required resources.",
        "Set a stable versioned base path such as /v1/orders.",
        "Add Verify API Key to the request PreFlow.",
        "Add Spike Arrest and configure the required request rate.",
        "Use the trace or test console to validate policy execution.",
        "Deploy the proxy and create an API product.",
        "Publish the product and test with an approved application key."
      ]
    },
    {
      id: "w-security",
      title: "Configure receiver authentication",
      duration: "20 min",
      objective: "Create security material and bind its alias to an adapter without exposing the secret in design content.",
      steps: [
        "Determine the required authentication type from the receiver contract.",
        "Open Monitor → Security Material.",
        "Create the correct material type and give it a deliberate alias.",
        "Enter the credential or token-endpoint details and deploy the material.",
        "Open the receiver adapter and select or enter the exact credential alias.",
        "Save and deploy the iFlow if its adapter configuration changed.",
        "Run a controlled test and verify authentication in the MPL.",
        "Rotate or delete practice secrets when they are no longer required."
      ]
    },
    {
      id: "w-event",
      title: "Create an Event Mesh queue and subscription",
      duration: "25 min",
      objective: "Route a business event into a durable queue with controlled redelivery.",
      steps: [
        "Identify the exact event topic and contract from the producer.",
        "Create a queue with a meaningful lower-case name.",
        "Choose exclusive or non-exclusive access based on the consumer model.",
        "Set message size, retention, and redelivery limits if available.",
        "Add the topic subscription using the exact hierarchy and case.",
        "Publish a representative event and verify it arrives in the queue.",
        "Bind a consumer and acknowledge the message.",
        "Test an error path and confirm redelivery behavior."
      ]
    },
    {
      id: "w-mapping",
      title: "Create and test message mapping",
      duration: "25 min",
      objective: "Transform a source order structure into the target contract and test representative edge cases.",
      steps: [
        "Import or create the source and target message types.",
        "Map identifiers and business fields by meaning.",
        "Add constants, default values, or context handling where required.",
        "Use mapping functions only when the business rule requires them.",
        "Test a normal payload and verify every mandatory target element.",
        "Test missing optional fields and repeated source nodes.",
        "Save the mapping and bind it in the correct iFlow position.",
        "Run an end-to-end message and compare the receiver payload."
      ]
    },
    {
      id: "w-mock",
      title: "Run a disciplined three-hour attempt",
      duration: "180 min",
      objective: "Use a repeatable assessment strategy that preserves review time and reduces avoidable configuration errors.",
      steps: [
        "Read all tasks first and mark exact names, paths, aliases, rates, and topics.",
        "Complete short foundation tasks before long build tasks.",
        "Save after every meaningful configuration block.",
        "Validate each artifact as soon as a usable path exists.",
        "Use monitoring evidence instead of changing several settings at once.",
        "Keep a scratch list of incomplete details and return to them.",
        "Stop new work with thirty minutes remaining and review exact values.",
        "Submit only after checking every activity status and required deployment."
      ]
    }
  ];

  const landmarks = [
    {
      id: "l-strategy",
      unit: "01",
      title: "Integration strategy and clean core",
      duration: "32 min",
      description: "Understand SAP's integration strategy and why clean-core decisions matter.",
      lessons: ["Presenting the SAP Integration Strategy", "Introducing the Clean Core Approach"]
    },
    {
      id: "l-suite",
      unit: "02",
      title: "SAP Integration Suite",
      duration: "44 min",
      description: "Recognize distributed architecture challenges, capabilities, constraints, and suite components.",
      lessons: ["Distributed Architectures", "Understanding Integration Suite", "Capabilities and Considerations", "Exploring Suite Capabilities"]
    },
    {
      id: "l-api",
      unit: "03",
      title: "API Management",
      duration: "2 hr 22 min",
      description: "Manage the API lifecycle from providers and proxies to policies, products, and consumer discovery.",
      lessons: ["API Management Components", "API Lifecycle", "API Providers and Proxies", "Policies", "Developer Hub and Products", "Graph"]
    },
    {
      id: "l-cloud",
      unit: "04",
      title: "Cloud Integration",
      duration: "3 hr 24 min",
      description: "Build, configure, deploy, monitor, and troubleshoot integration flows.",
      lessons: ["Basic Concepts", "Connectivity", "Operating Model", "System Scope", "Design Guidelines", "Development Cycle", "Monitoring", "Camel Data", "Integration Flow"]
    },
    {
      id: "l-event",
      unit: "05",
      title: "Event Mesh",
      duration: "3 hr 40 min",
      description: "Use event-driven architecture, messaging patterns, Event Mesh, and Advanced Event Mesh.",
      lessons: ["Event-Driven Architecture", "Direct and Guaranteed Messaging", "SAP Event Mesh", "Event Mesh Capability", "Advanced Event Mesh"]
    }
  ];

  const baseChecklist = [
    ["Preparation", "Verify the current C_CPI_2601 certification page and assessment format."],
    ["Preparation", "Complete all five CLD900 units and their knowledge checks."],
    ["Preparation", "Create a one-page reference for exact syntax, aliases, paths, and policy names."],
    ["Preparation", "Complete at least two uninterrupted three-hour practice attempts."],
    ["Cloud Integration", "Create a package and iFlow from memory."],
    ["Cloud Integration", "Configure HTTPS, HTTP, and at least one asynchronous adapter."],
    ["Cloud Integration", "Use Content Modifier, converter, mapping, Request Reply, and routing."],
    ["Cloud Integration", "Use Camel Simple for headers and exchange properties."],
    ["Cloud Integration", "Externalize environment-specific configuration."],
    ["Cloud Integration", "Diagnose a failed message from MPL evidence."],
    ["API Management", "Create an API provider and versioned API proxy."],
    ["API Management", "Configure Verify API Key and Spike Arrest."],
    ["API Management", "Deploy a proxy and publish an API product."],
    ["Event Mesh", "Explain queue, topic, subscription, and guaranteed messaging."],
    ["Event Mesh", "Create a queue and exact topic subscription."],
    ["Security", "Create and deploy User Credentials and OAuth2 material."],
    ["Security", "Reference a security material alias from an adapter."],
    ["Exam day", "Check system requirements, identity documents, and appointment time."],
    ["Exam day", "Read all activities before changing the tenant."],
    ["Exam day", "Reserve the final thirty minutes for exact-value and deployment checks."]
  ].map((item, index) => ({ id: `base-${index + 1}`, group: item[0], text: item[1], custom: false }));

  let db;
  let activeProfile;
  let userState;
  let notes = [];
  let currentRoute = "dashboard";
  let currentChallenge = 0;
  let qaFilter = "All";
  let qaSearch = "";
  let noteSearch = "";
  let selectedNoteId = null;
  let confirmAction = null;
  let timerInterval = null;

  function defaultUserState(userId) {
    return {
      userId,
      roadmap: {},
      simAnswers: {},
      simPassed: {},
      simFeedback: {},
      qaReviewed: {},
      walkSteps: {},
      landmarks: {},
      checklist: {},
      customChecklist: [],
      activityLog: [],
      mock: {
        active: false,
        submitted: false,
        startedAt: null,
        endAt: null,
        answers: {},
        passed: {},
        current: 0,
        history: []
      },
      updatedAt: Date.now()
    };
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains("profiles")) {
          database.createObjectStore("profiles", { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains("userStates")) {
          database.createObjectStore("userStates", { keyPath: "userId" });
        }
        if (!database.objectStoreNames.contains("notes")) {
          const store = database.createObjectStore("notes", { keyPath: "id" });
          store.createIndex("userId", "userId", { unique: false });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function dbGet(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const request = transaction.objectStore(storeName).get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function dbGetAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const request = transaction.objectStore(storeName).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  function dbPut(storeName, value) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      transaction.objectStore(storeName).put(value);
      transaction.oncomplete = () => resolve(value);
      transaction.onerror = () => reject(transaction.error);
    });
  }

  function dbDelete(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      transaction.objectStore(storeName).delete(key);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async function hashPin(pin) {
    if (!pin) return "";
    const data = new TextEncoder().encode(pin);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  async function ensureGuestProfile() {
    let guest = await dbGet("profiles", "guest");
    if (!guest) {
      guest = {
        id: "guest",
        name: "Guest learner",
        initials: "G",
        pinHash: "",
        createdAt: Date.now(),
        lastLogin: Date.now()
      };
      await dbPut("profiles", guest);
    }
    return guest;
  }

  async function loadProfile(profile) {
    activeProfile = profile;
    activeProfile.lastLogin = Date.now();
    await dbPut("profiles", activeProfile);
    localStorage.setItem(ACTIVE_PROFILE_KEY, profile.id);
    userState = await dbGet("userStates", profile.id) || defaultUserState(profile.id);
    notes = (await dbGetAll("notes"))
      .filter((note) => note.userId === profile.id)
      .sort((a, b) => b.updatedAt - a.updatedAt);
    selectedNoteId = notes[0]?.id || null;
    updateProfileUI();
    renderRoute();
  }

  async function saveUserState() {
    userState.updatedAt = Date.now();
    await dbPut("userStates", userState);
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

  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() || "").join("") || "U";
  }

  function showToast(message, type = "") {
    const stack = document.getElementById("toastStack");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`.trim();
    toast.textContent = message;
    stack.appendChild(toast);
    setTimeout(() => toast.remove(), 3400);
  }

  function logActivity(text) {
    userState.activityLog.unshift({ text, time: Date.now() });
    userState.activityLog = userState.activityLog.slice(0, 10);
  }

  function percent(count, total) {
    return total ? Math.round((count / total) * 100) : 0;
  }

  function progressStats() {
    const roadmap = percent(Object.values(userState.roadmap).filter(Boolean).length, roadmapDays.length);
    const simulator = percent(Object.values(userState.simPassed).filter(Boolean).length, systemChallenges.length);
    const qa = percent(Object.keys(userState.qaReviewed).length, qaItems.length);
    const totalSteps = walkthroughs.reduce((sum, item) => sum + item.steps.length, 0);
    const walkthrough = percent(Object.values(userState.walkSteps).filter(Boolean).length, totalSteps);
    const landmark = percent(Object.values(userState.landmarks).filter(Boolean).length, landmarks.length);
    const allChecks = [...baseChecklist, ...userState.customChecklist];
    const checklist = percent(allChecks.filter((item) => userState.checklist[item.id]).length, allChecks.length);
    const readiness = Math.round(
      roadmap * 0.15 +
      simulator * 0.35 +
      qa * 0.10 +
      walkthrough * 0.15 +
      landmark * 0.15 +
      checklist * 0.10
    );
    return { roadmap, simulator, qa, walkthrough, landmark, checklist, readiness };
  }

  function nextChallengeIndex() {
    const index = systemChallenges.findIndex((challenge) => !userState.simPassed[challenge.id]);
    return index === -1 ? 0 : index;
  }

  function updateProfileUI() {
    document.getElementById("profileName").textContent = activeProfile.name;
    document.getElementById("profileAvatar").textContent = activeProfile.initials;
  }

  function applyTheme(theme) {
    const actual = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = actual;
    localStorage.setItem(THEME_KEY, actual);
    document.querySelector("#themeButton span").innerHTML = icon(actual === "dark" ? "sun" : "moon");
    document.getElementById("themeButton").setAttribute("aria-label", actual === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  function setRoute(route) {
    const target = pageMeta[route] ? route : "dashboard";
    if (location.hash !== `#${target}`) {
      location.hash = target;
      return;
    }
    currentRoute = target;
    renderRoute();
  }

  function renderRoute() {
    const route = location.hash.replace("#", "") || "dashboard";
    currentRoute = pageMeta[route] ? route : "dashboard";
    const [title, breadcrumb] = pageMeta[currentRoute];
    document.getElementById("pageTitle").textContent = title;
    document.getElementById("breadcrumb").textContent = breadcrumb;
    document.querySelectorAll("[data-nav]").forEach((button) => {
      button.classList.toggle("active", button.dataset.nav === currentRoute);
    });
    const page = document.getElementById("page");
    const renderers = {
      dashboard: renderDashboard,
      roadmap: renderRoadmap,
      simulator: renderSimulator,
      questions: renderQuestions,
      walkthroughs: renderWalkthroughs,
      landmarks: renderLandmarks,
      checklist: renderChecklist,
      notes: renderNotes,
      mock: renderMock
    };
    page.innerHTML = renderers[currentRoute]();
    page.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebarScrim").hidden = true;
    updateTimer();
  }

  function sourceStrip() {
    return `
      <section class="source-strip">
        <div>
          <h3>Use the official SAP material as your source of truth</h3>
          <p>Scope and product behavior can change. These links were checked on 12 June 2026.</p>
        </div>
        <div class="source-row">
          <a href="https://learning.sap.com/certifications/sap-certified-associate-integration-developer" target="_blank" rel="noreferrer">Certification</a>
          <a href="https://learning.sap.com/learning-journeys/developing-with-sap-integration-suite" target="_blank" rel="noreferrer">Learning journey</a>
          <a href="https://learning.sap.com/courses/sap-cloud-platform-integration-service-overview" target="_blank" rel="noreferrer">CLD900</a>
          <a href="https://learning.sap.com/helpcenter/certification-support/step-by-step-guide-practical-exams" target="_blank" rel="noreferrer">Practical exam guide</a>
        </div>
      </section>
    `;
  }

  function renderDashboard() {
    const stats = progressStats();
    const next = nextChallengeIndex();
    const recent = userState.activityLog.length
      ? userState.activityLog.slice(0, 5).map((activity) => `
          <div class="activity-row">
            <span class="activity-dot"></span>
            <div><strong>${esc(activity.text)}</strong><p>Saved to ${esc(activeProfile.name)}'s workspace</p></div>
            <time>${relativeTime(activity.time)}</time>
          </div>
        `).join("")
      : `<div class="empty-state"><h3>Your activity will appear here</h3><p>Complete a task, review a question, or create a note to begin your learning history.</p></div>`;

    return `
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">C_CPI_2601 · Integration Developer</p>
          <h2>Turn the syllabus into a repeatable plan of action.</h2>
          <p>Study the current learning journey, operate a tenant-style simulator, document what you learn, and rehearse a complete three-hour assessment.</p>
          <div class="hero-actions">
            <button class="button button-primary" data-route="simulator" data-open-challenge="${next}" type="button">Continue practical training ${icon("arrow")}</button>
            <button class="button button-secondary" data-route="roadmap" type="button">View 14-day roadmap</button>
          </div>
        </div>
        <div class="hero-score">
          <div class="readiness-ring" style="--score:${stats.readiness}">
            <div><strong>${stats.readiness}%</strong><span>Readiness</span></div>
          </div>
          <p class="score-caption">${stats.readiness >= 80 ? "Assessment rehearsal phase" : "Keep building practical fluency"}</p>
        </div>
      </section>

      <section class="metric-grid">
        ${metricCard("roadmap", `${Object.values(userState.roadmap).filter(Boolean).length}/${roadmapDays.length}`, "Roadmap days complete")}
        ${metricCard("lab", `${Object.values(userState.simPassed).filter(Boolean).length}/${systemChallenges.length}`, "System tasks passed")}
        ${metricCard("questions", `${Object.keys(userState.qaReviewed).length}/${qaItems.length}`, "Answers reviewed")}
        ${metricCard("notes", String(notes.length), "Personal notes")}
      </section>

      <section class="dashboard-grid">
        <div class="panel">
          <div class="panel-head">
            <div><h3>Continue where you left off</h3><p>Your next incomplete system-based task</p></div>
            <span class="tag">${stats.simulator}% practical</span>
          </div>
          <div class="panel-body">
            <div class="continue-card">
              <span class="continue-number">${String(next + 1).padStart(2, "0")}</span>
              <div>
                <h4>${esc(systemChallenges[next].title)}</h4>
                <p>${esc(systemChallenges[next].prompt)}</p>
              </div>
              <button class="button button-primary button-small" data-route="simulator" data-open-challenge="${next}" type="button">Open task</button>
            </div>
            <div class="progress-list" style="margin-top:20px">
              ${progressLine("Study roadmap", stats.roadmap)}
              ${progressLine("System simulator", stats.simulator)}
              ${progressLine("Task walkthroughs", stats.walkthrough)}
              ${progressLine("Learning landmarks", stats.landmark)}
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-head">
            <div><h3>Recent activity</h3><p>Latest actions in this device profile</p></div>
          </div>
          <div class="panel-body activity-feed">${recent}</div>
        </div>
      </section>

      <section style="margin-top:20px">
        <div class="section-heading">
          <div><p class="eyebrow">Your workspace</p><h2 style="font-size:1.6rem">Everything needed for deliberate practice</h2></div>
        </div>
        <div class="feature-grid">
          ${featureCard("lab", "System simulator", "Twelve original, exam-aligned scenarios for Cloud Integration, API Management, Event Mesh, monitoring, and architecture.", "simulator")}
          ${featureCard("steps", "Step-by-step tasks", "Check off every action in eight practical walkthroughs and keep the exact workflow fresh.", "walkthroughs")}
          ${featureCard("notes", "Personal knowledge base", "Write, search, edit, and export notes that remain separate for each device profile.", "notes")}
        </div>
      </section>
      ${sourceStrip()}
    `;
  }

  function metricCard(iconName, value, label) {
    return `<div class="metric-card"><div class="metric-head"><span class="metric-icon">${icon(iconName)}</span></div><strong>${esc(value)}</strong><p>${esc(label)}</p></div>`;
  }

  function progressLine(label, value) {
    return `
      <div class="progress-line">
        <div class="progress-copy"><strong>${esc(label)}</strong><span>${value === 100 ? "Complete" : "In progress"}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${value}%"></div></div>
        <span class="progress-value">${value}%</span>
      </div>
    `;
  }

  function featureCard(iconName, title, description, route) {
    return `
      <article class="feature-card">
        <span class="metric-icon">${icon(iconName)}</span>
        <h3>${esc(title)}</h3>
        <p>${esc(description)}</p>
        <button class="text-link" data-route="${route}" type="button">Open workspace →</button>
      </article>
    `;
  }

  function renderRoadmap() {
    const done = Object.values(userState.roadmap).filter(Boolean).length;
    const remainingMinutes = roadmapDays.reduce((sum, day, index) => {
      if (userState.roadmap[index]) return sum;
      return sum + Number(day[2].split(" ")[0]);
    }, 0);
    return `
      <div class="section-heading">
        <div><p class="eyebrow">14-day preparation route</p><h2>Study with a practical finish line</h2><p>Move from the official concepts to timed tenant work. Mark days complete as you finish the full objective, not when you merely open the material.</p></div>
        <div class="heading-actions"><button class="button button-secondary" data-reset-roadmap type="button">Reset roadmap</button></div>
      </div>
      <div class="roadmap-layout">
        <section class="panel">
          <div class="panel-head"><div><h3>Your schedule</h3><p>${done} of ${roadmapDays.length} days completed</p></div><span class="tag">${percent(done, roadmapDays.length)}%</span></div>
          <div class="roadmap-list">
            ${roadmapDays.map((day, index) => `
              <article class="roadmap-day ${userState.roadmap[index] ? "completed" : ""}">
                <button class="roadmap-check" data-roadmap="${index}" type="button" aria-label="Toggle day ${index + 1}">${userState.roadmap[index] ? "✓" : index + 1}</button>
                <div><h3>${esc(day[0])}</h3><p>${esc(day[1])}</p></div>
                <span class="roadmap-time">${esc(day[2])}</span>
              </article>
            `).join("")}
          </div>
        </section>
        <aside class="panel sticky-panel">
          <div class="panel-head"><div><h3>Plan summary</h3><p>Based on your checked days</p></div></div>
          <div class="panel-body study-summary">
            <div class="summary-stat"><span>Completed</span><strong>${done} days</strong></div>
            <div class="summary-stat"><span>Remaining</span><strong>${roadmapDays.length - done} days</strong></div>
            <div class="summary-stat"><span>Estimated time</span><strong>${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m</strong></div>
            <div class="summary-stat"><span>Practical days</span><strong>7 of 14</strong></div>
            <div class="callout">A system-based assessment rewards reliable execution. Repeat the tasks that feel slow even after you understand the concept.</div>
            <button class="button button-primary" data-route="simulator" type="button">Open system simulator</button>
          </div>
        </aside>
      </div>
    `;
  }

  function renderSimulator() {
    if (currentChallenge >= systemChallenges.length) currentChallenge = 0;
    const challenge = systemChallenges[currentChallenge];
    const passed = Object.values(userState.simPassed).filter(Boolean).length;
    return `
      <div class="section-heading">
        <div><p class="eyebrow">Guided practical environment</p><h2>System-based task simulator</h2><p>Complete twelve original scenarios built around the current CLD900 learning objectives. Guided mode gives hints and exact feedback.</p></div>
        <div class="heading-actions"><span class="tag green">${passed}/${systemChallenges.length} passed</span><button class="button button-secondary" data-route="mock" type="button">Open timed mock</button></div>
      </div>
      <div class="simulator-layout">
        <aside class="challenge-list">
          ${systemChallenges.map((item, index) => `
            <button class="challenge-button ${index === currentChallenge ? "active" : ""} ${userState.simPassed[item.id] ? "passed" : ""}" data-challenge="${index}" type="button">
              <span class="challenge-index">${userState.simPassed[item.id] ? "✓" : String(index + 1).padStart(2, "0")}</span>
              <span><strong>${esc(item.title)}</strong><small>${esc(item.domain)} · ${esc(item.difficulty)}</small></span>
              <span class="challenge-status">${userState.simPassed[item.id] ? "●" : ""}</span>
            </button>
          `).join("")}
        </aside>
        <section class="challenge-workspace">
          ${challengeWorkspace(challenge, "guided")}
        </section>
      </div>
    `;
  }

  function challengeWorkspace(challenge, mode) {
    const isMock = mode === "mock";
    const answerStore = isMock ? userState.mock.answers : userState.simAnswers;
    const feedbackStore = isMock ? {} : userState.simFeedback;
    const answer = answerStore[challenge.id] || (challenge.type === "multi" || challenge.type === "sequence" ? [] : {});
    const feedback = feedbackStore[challenge.id];
    return `
      <header class="sim-brief">
        <div class="sim-status"><span class="pulse-dot"></span>${esc(challenge.area)} · ${esc(challenge.difficulty)}</div>
        <h2>${esc(challenge.title)}</h2>
        <p>${esc(challenge.prompt)}</p>
      </header>
      <div class="sim-content">
        <div class="task-instructions"><strong>Task</strong><p>${esc(challenge.instructions)}</p></div>
        <div class="tenant-frame">
          <div class="tenant-bar"><div class="tenant-brand"><span class="tenant-mark">IS</span>Integration Suite</div><span class="tenant-tag">CERT-PREP · DEV</span></div>
          <div class="tenant-page">
            <div class="tenant-title"><h3>${esc(challenge.area)}</h3><p>Assessment activity ${systemChallenges.indexOf(challenge) + 1} of ${systemChallenges.length}</p></div>
            ${challengeInput(challenge, answer, mode)}
          </div>
        </div>
        ${!isMock && feedback ? `<div class="feedback ${feedback.pass ? "success" : "error"}">${esc(feedback.message)}</div>` : ""}
        ${!isMock && feedback?.hint ? `<div class="hint-box"><strong>Hint:</strong> ${esc(challenge.hint)}</div>` : ""}
        <div class="form-actions">
          <div class="challenge-nav">
            <button class="button button-soft button-small" data-challenge-prev type="button" ${currentChallenge === 0 ? "disabled" : ""}>Previous</button>
            <button class="button button-soft button-small" data-challenge-next type="button" ${currentChallenge === systemChallenges.length - 1 ? "disabled" : ""}>Next</button>
          </div>
          <div class="challenge-nav">
            ${!isMock ? '<button class="button button-secondary button-small" data-show-hint type="button">Show hint</button><button class="button button-primary" data-check-challenge type="button">Check task</button>' : ""}
          </div>
        </div>
      </div>
    `;
  }

  function challengeInput(challenge, answer, mode) {
    const prefix = mode === "mock" ? "mock" : "sim";
    if (challenge.type === "fields") {
      return `<div class="form-grid">${challenge.fields.map((field) => {
        const [key, label, type, placeholder, options] = field;
        const value = answer[key] ?? "";
        if (type === "select") {
          return `<label class="field"><span>${esc(label)}</span><select data-${prefix}-field="${esc(key)}">${options.map((option) => `<option ${value === option ? "selected" : ""}>${esc(option)}</option>`).join("")}</select></label>`;
        }
        if (type === "textarea") {
          return `<label class="field full"><span>${esc(label)}</span><textarea data-${prefix}-field="${esc(key)}" placeholder="${esc(placeholder)}">${esc(value)}</textarea></label>`;
        }
        return `<label class="field"><span>${esc(label)}</span><input type="${type}" data-${prefix}-field="${esc(key)}" value="${esc(value)}" placeholder="${esc(placeholder)}"></label>`;
      }).join("")}</div>`;
    }

    if (challenge.type === "single" || challenge.type === "log-single") {
      return `
        ${challenge.log ? `<div class="log-console">${esc(challenge.log)}</div>` : ""}
        <div class="choice-grid" style="${challenge.log ? "margin-top:14px" : ""}">
          ${challenge.options.map((option, index) => `
            <button class="choice-card ${answer === index ? "selected" : ""}" data-${prefix}-single="${index}" type="button">
              <span class="choice-marker">${answer === index ? "✓" : ""}</span>
              <span><strong>${esc(option[0])}</strong><p>${esc(option[1])}</p></span>
            </button>
          `).join("")}
        </div>
      `;
    }

    if (challenge.type === "multi") {
      return `<div class="choice-grid">${challenge.options.map((option, index) => {
        const selected = Array.isArray(answer) && answer.includes(index);
        return `
          <button class="choice-card multi ${selected ? "selected" : ""}" data-${prefix}-multi="${index}" type="button">
            <span class="choice-marker">${selected ? "✓" : ""}</span>
            <span><strong>${esc(option[0])}</strong><p>${esc(option[1])}</p></span>
          </button>
        `;
      }).join("")}</div>`;
    }

    if (challenge.type === "sequence") {
      const selected = Array.isArray(answer) ? answer : [];
      const available = challenge.options.filter((option) => !selected.includes(option));
      return `
        <p class="eyebrow">Available actions</p>
        <div class="sequence-pool">
          ${available.length ? available.map((option) => `<button class="sequence-chip" data-${prefix}-sequence-add="${esc(option)}" type="button">${esc(option)}</button>`).join("") : '<span class="sequence-placeholder">All actions selected</span>'}
        </div>
        <p class="eyebrow" style="margin-top:14px">Your sequence</p>
        <div class="sequence-answer">
          ${selected.length ? selected.map((option, index) => `<button class="sequence-chip" data-${prefix}-sequence-remove="${index}" type="button">${index + 1}. ${esc(option)} ×</button>`).join("") : '<span class="sequence-placeholder">Choose actions above in execution order</span>'}
        </div>
      `;
    }

    if (challenge.type === "mapping") {
      return `
        <table class="mapping-table">
          <thead><tr><th>Source Field</th><th>Target Element</th></tr></thead>
          <tbody>
            ${challenge.rows.map((row) => `<tr><td>${esc(row[0])}</td><td><input data-${prefix}-field="${esc(row[0])}" value="${esc(answer[row[0]] || "")}" placeholder="${esc(row[1])}"></td></tr>`).join("")}
          </tbody>
        </table>
      `;
    }
    return "";
  }

  function validateChallenge(challenge, answer) {
    if (challenge.type === "single" || challenge.type === "log-single") {
      return answer === challenge.expected;
    }
    if (challenge.type === "multi") {
      const actual = Array.isArray(answer) ? [...answer].sort() : [];
      return JSON.stringify(actual) === JSON.stringify([...challenge.expected].sort());
    }
    if (challenge.type === "sequence") {
      return JSON.stringify(answer || []) === JSON.stringify(challenge.expected);
    }
    const expected = challenge.expected;
    return Object.keys(expected).every((key) => {
      return String(answer?.[key] ?? "").trim().toLowerCase() === String(expected[key]).trim().toLowerCase();
    });
  }

  function renderQuestions() {
    const categories = ["All", ...new Set(qaItems.map((item) => item.category))];
    const filtered = qaItems.filter((item) => {
      const categoryMatch = qaFilter === "All" || item.category === qaFilter;
      const query = qaSearch.trim().toLowerCase();
      const textMatch = !query || `${item.question} ${item.answer} ${item.category}`.toLowerCase().includes(query);
      return categoryMatch && textMatch;
    });
    return `
      <div class="section-heading">
        <div><p class="eyebrow">Fast recall bank</p><h2>Questions and answers</h2><p>Use these original study prompts to explain the product behavior in your own words. Reveal an answer only after you commit to a response.</p></div>
        <div class="heading-actions"><span class="tag">${Object.keys(userState.qaReviewed).length}/${qaItems.length} reviewed</span></div>
      </div>
      <div class="filter-bar">
        <label class="search-wrap"><span>${icon("search")}</span><input class="search-input" id="qaSearch" value="${esc(qaSearch)}" placeholder="Search questions, answers, or domains"></label>
        <div class="filter-group">${categories.map((category) => `<button class="filter-chip ${qaFilter === category ? "active" : ""}" data-qa-filter="${esc(category)}" type="button">${esc(category)}</button>`).join("")}</div>
      </div>
      <section class="qa-grid">
        ${filtered.length ? filtered.map((item) => {
          const revealed = Boolean(userState.qaReviewed[item.id]);
          const colorClass = item.category === "Event Mesh" ? "purple" : item.category === "Operations" ? "orange" : item.category === "Architecture" ? "green" : "";
          return `
            <article class="question-card ${revealed ? "revealed" : ""}">
              <div class="card-kicker"><span class="tag ${colorClass}">${esc(item.category)}</span><span class="tag">${qaItems.indexOf(item) + 1}</span></div>
              <h3>${esc(item.question)}</h3>
              ${revealed ? `<div class="answer-panel">${esc(item.answer)}</div>` : '<div class="answer-placeholder">Say your answer aloud, then reveal the explanation.</div>'}
              <div class="card-actions"><button class="text-link" data-qa-reveal="${item.id}" type="button">${revealed ? "Hide answer" : "Reveal answer"}</button><button class="text-link" data-note-from-qa="${item.id}" type="button">Add to notes</button></div>
            </article>
          `;
        }).join("") : '<div class="empty-state" style="grid-column:1/-1"><h3>No matching questions</h3><p>Try a broader search or select a different domain.</p></div>'}
      </section>
    `;
  }

  function renderWalkthroughs() {
    const totalSteps = walkthroughs.reduce((sum, item) => sum + item.steps.length, 0);
    const completed = Object.values(userState.walkSteps).filter(Boolean).length;
    return `
      <div class="section-heading">
        <div><p class="eyebrow">Task completion guides</p><h2>Step-by-step walkthroughs</h2><p>Check each action only after you can perform it yourself. The wording describes product workflows without reproducing confidential exam tasks.</p></div>
        <div class="heading-actions"><span class="tag green">${completed}/${totalSteps} steps</span></div>
      </div>
      <section class="walkthrough-list">
        ${walkthroughs.map((walkthrough, index) => {
          const done = walkthrough.steps.filter((_, stepIndex) => userState.walkSteps[`${walkthrough.id}:${stepIndex}`]).length;
          return `
            <details class="walkthrough-card" ${done > 0 && done < walkthrough.steps.length ? "open" : ""}>
              <summary>
                <div class="walkthrough-summary">
                  <div><span class="walkthrough-number">${String(index + 1).padStart(2, "0")}</span><div><h3>${esc(walkthrough.title)}</h3><p>${esc(walkthrough.duration)} · ${walkthrough.steps.length} steps</p></div></div>
                  <div class="walkthrough-progress"><strong>${done}/${walkthrough.steps.length}</strong><span>${done === walkthrough.steps.length ? "Complete" : "Steps complete"}</span></div>
                </div>
              </summary>
              <div class="walkthrough-body">
                <div class="walkthrough-objective"><strong>Objective:</strong> ${esc(walkthrough.objective)}</div>
                <div class="step-list">
                  ${walkthrough.steps.map((step, stepIndex) => {
                    const key = `${walkthrough.id}:${stepIndex}`;
                    const isDone = Boolean(userState.walkSteps[key]);
                    return `<div class="step-row ${isDone ? "done" : ""}"><button class="step-check" data-walk-step="${key}" type="button">${isDone ? "✓" : stepIndex + 1}</button><div><strong>Step ${stepIndex + 1}</strong><p>${esc(step)}</p></div></div>`;
                  }).join("")}
                </div>
                <div class="card-actions"><button class="button button-secondary button-small" data-note-from-walk="${walkthrough.id}" type="button">Add task notes</button><button class="button button-soft button-small" data-reset-walk="${walkthrough.id}" type="button">Reset steps</button></div>
              </div>
            </details>
          `;
        }).join("")}
      </section>
    `;
  }

  function renderLandmarks() {
    const done = Object.values(userState.landmarks).filter(Boolean).length;
    return `
      <div class="section-heading">
        <div><p class="eyebrow">CLD900-aligned milestones</p><h2>Learning landmarks</h2><p>These five landmarks follow the current official course units and help you see whether your practical preparation covers the full journey.</p></div>
        <div class="heading-actions"><span class="tag green">${done}/${landmarks.length} complete</span></div>
      </div>
      <section class="landmark-grid">
        ${landmarks.map((landmark) => {
          const complete = Boolean(userState.landmarks[landmark.id]);
          return `
            <article class="landmark-card ${complete ? "complete" : ""}">
              <div class="landmark-head"><span class="landmark-unit">${landmark.unit}</span><span class="tag ${complete ? "green" : ""}">${complete ? "Completed" : landmark.duration}</span></div>
              <h3>${esc(landmark.title)}</h3>
              <p>${esc(landmark.description)}</p>
              <ul class="lesson-list">${landmark.lessons.map((lesson) => `<li>${esc(lesson)}</li>`).join("")}</ul>
              <div class="card-actions"><button class="button ${complete ? "button-success" : "button-primary"} button-small" data-landmark="${landmark.id}" type="button">${complete ? "Completed ✓" : "Mark complete"}</button><button class="text-link" data-route="${landmark.id === "l-cloud" || landmark.id === "l-api" || landmark.id === "l-event" ? "simulator" : "questions"}" type="button">Practice this area →</button></div>
            </article>
          `;
        }).join("")}
      </section>
      ${sourceStrip()}
    `;
  }

  function renderChecklist() {
    const allItems = [...baseChecklist, ...userState.customChecklist];
    const groups = [...new Set(allItems.map((item) => item.group))];
    const completed = allItems.filter((item) => userState.checklist[item.id]).length;
    return `
      <div class="section-heading">
        <div><p class="eyebrow">Preparation control</p><h2>Readiness checklist</h2><p>Use the built-in requirements and add your own. Every device profile has an independent checklist.</p></div>
        <div class="heading-actions"><span class="tag green">${completed}/${allItems.length} checked</span><button class="button button-secondary" data-reset-checklist type="button">Reset checks</button></div>
      </div>
      <div class="checklist-layout">
        <section class="panel">
          ${groups.map((group) => `
            <div class="check-group">
              <h3>${esc(group)}</h3>
              ${allItems.filter((item) => item.group === group).map((item) => {
                const checked = Boolean(userState.checklist[item.id]);
                return `
                  <div class="check-row ${checked ? "checked" : ""}">
                    <input type="checkbox" id="${esc(item.id)}" data-check-item="${esc(item.id)}" ${checked ? "checked" : ""}>
                    <label for="${esc(item.id)}">${esc(item.text)}</label>
                    ${item.custom ? `<button class="delete-check" data-delete-check="${esc(item.id)}" type="button" aria-label="Delete custom checklist item">×</button>` : ""}
                  </div>
                `;
              }).join("")}
            </div>
          `).join("")}
        </section>
        <aside class="panel sticky-panel">
          <div class="panel-head"><div><h3>Add your own item</h3><p>Personalize your exam plan</p></div></div>
          <div class="panel-body">
            <form class="custom-check-form" id="customCheckForm">
              <label for="customCheckGroup">Section</label>
              <input id="customCheckGroup" maxlength="40" placeholder="For example: My weak areas" required>
              <label for="customCheckText">Checklist item</label>
              <input id="customCheckText" maxlength="180" placeholder="What must you complete?" required>
              <button class="button button-primary" type="submit">${icon("plus")} Add item</button>
            </form>
            <div class="callout" style="margin-top:16px">A checked item means you can perform or explain it without relying on a click-by-click guide.</div>
          </div>
        </aside>
      </div>
    `;
  }

  function renderNotes() {
    const filtered = notes.filter((note) => {
      const query = noteSearch.trim().toLowerCase();
      return !query || `${note.title} ${note.body} ${note.category}`.toLowerCase().includes(query);
    });
    const selected = notes.find((note) => note.id === selectedNoteId) || null;
    return `
      <div class="section-heading">
        <div><p class="eyebrow">Device-local knowledge base</p><h2>My notes</h2><p>Capture exact syntax, troubleshooting findings, and task reminders. Notes are stored in IndexedDB under ${esc(activeProfile.name)}'s profile.</p></div>
        <div class="heading-actions"><button class="button button-secondary" data-export-notes type="button">${icon("download")} Export JSON</button><button class="button button-primary" data-new-note type="button">${icon("plus")} New note</button></div>
      </div>
      <div class="filter-bar">
        <label class="search-wrap"><span>${icon("search")}</span><input class="search-input" id="noteSearch" value="${esc(noteSearch)}" placeholder="Search your notes"></label>
        <span class="tag">${notes.length} note${notes.length === 1 ? "" : "s"}</span>
      </div>
      <div class="notes-layout">
        <section class="notes-list">
          ${filtered.length ? filtered.map((note) => `
            <article class="note-card ${note.id === selectedNoteId ? "active" : ""}" data-note-select="${esc(note.id)}">
              <div class="note-meta"><span class="tag">${esc(note.category)}</span><time>${relativeTime(note.updatedAt)}</time></div>
              <h3>${esc(note.title)}</h3>
              <p>${esc(note.body || "Empty note")}</p>
            </article>
          `).join("") : '<div class="empty-state"><span class="metric-icon">' + icon("notes") + '</span><h3>No notes found</h3><p>Create a note for syntax, a difficult task, or a troubleshooting lesson.</p><button class="button button-primary" data-new-note type="button">Create first note</button></div>'}
        </section>
        <section class="panel note-editor">
          ${selected ? noteEditor(selected) : `
            <div class="empty-state">
              <span class="metric-icon">${icon("notes")}</span>
              <h3>Select or create a note</h3>
              <p>Your edits are saved when you choose Save note.</p>
              <button class="button button-primary" data-new-note type="button">New note</button>
            </div>
          `}
        </section>
      </div>
    `;
  }

  function noteEditor(note) {
    return `
      <form id="noteForm">
        <input type="hidden" id="noteId" value="${esc(note.id)}">
        <label><span>Title</span><input id="noteTitle" maxlength="100" value="${esc(note.title)}" required></label>
        <label><span>Category</span><select id="noteCategory">${["General", "Cloud Integration", "API Management", "Event Mesh", "Operations", "Architecture", "Exam day"].map((category) => `<option ${note.category === category ? "selected" : ""}>${esc(category)}</option>`).join("")}</select></label>
        <label><span>Notes</span><textarea id="noteBody" placeholder="Write what you need to remember...">${esc(note.body)}</textarea></label>
        <div class="form-actions"><button class="button button-danger button-small" data-delete-note="${esc(note.id)}" type="button">Delete</button><button class="button button-primary" type="submit">Save note</button></div>
      </form>
    `;
  }

  function renderMock() {
    const mock = userState.mock;
    if (mock.submitted) return renderMockResult();
    if (!mock.active) {
      return `
        <section class="mock-welcome">
          <div>
            <p class="eyebrow" style="color:#ffaf6b">Timed system rehearsal</p>
            <h2>Twelve activities. Three hours. One deliberate attempt.</h2>
            <p>The mock reuses the system scenarios without hints or immediate feedback. Your guided answers remain untouched.</p>
            <ul class="mock-rule-list">
              <li>Read every activity before configuring answers.</li>
              <li>Exact aliases, paths, rates, names, and topic values matter.</li>
              <li>Use the timer and reserve thirty minutes for review.</li>
              <li>Submission reveals a task-by-task result and saves the attempt.</li>
            </ul>
            <button class="button button-warning" data-start-mock type="button">Start 3-hour assessment</button>
          </div>
          <div class="mock-clock"><div><strong>03:00:00</strong><span>Assessment time</span></div></div>
        </section>
      `;
    }
    const challenge = systemChallenges[mock.current || 0];
    return `
      <div class="section-heading">
        <div><p class="eyebrow">Countdown active</p><h2>Mock assessment in progress</h2><p>Answers save automatically to this device profile. Feedback remains hidden until submission.</p></div>
        <div class="heading-actions"><button class="button button-warning" data-submit-mock type="button">Submit assessment</button></div>
      </div>
      <div class="mock-active">
        <aside class="challenge-list">
          ${systemChallenges.map((item, index) => `
            <button class="challenge-button ${index === mock.current ? "active" : ""}" data-mock-challenge="${index}" type="button">
              <span class="challenge-index">${String(index + 1).padStart(2, "0")}</span>
              <span><strong>${esc(item.title)}</strong><small>${esc(item.domain)}</small></span>
            </button>
          `).join("")}
        </aside>
        <section class="mock-card">
          <div class="mock-topline"><strong>Activity ${(mock.current || 0) + 1} of ${systemChallenges.length}</strong><span>Feedback hidden</span></div>
          ${challengeWorkspace(challenge, "mock").replace(
            '<div class="challenge-nav">\n            \n          </div>',
            `<div class="challenge-nav"><button class="button button-warning" data-submit-mock type="button">Submit assessment</button></div>`
          )}
        </section>
      </div>
    `;
  }

  function renderMockResult() {
    const mock = userState.mock;
    const passed = Object.values(mock.passed).filter(Boolean).length;
    const score = percent(passed, systemChallenges.length);
    return `
      <section class="mock-card mock-result">
        <div class="result-score">${score}%</div>
        <p class="eyebrow">Attempt complete</p>
        <h2>${score === 100 ? "Every simulated task passed" : "Your repair list is ready"}</h2>
        <p>${passed} of ${systemChallenges.length} activities passed exact validation. Use the breakdown to repeat weak workflows in guided mode.</p>
        <div class="result-breakdown">
          ${systemChallenges.map((challenge, index) => `<div class="result-row"><span>${index + 1}. ${esc(challenge.title)}</span><strong style="color:${mock.passed[challenge.id] ? "var(--green)" : "var(--red)"}">${mock.passed[challenge.id] ? "Pass" : "Review"}</strong></div>`).join("")}
        </div>
        <div class="heading-actions" style="justify-content:center">
          <button class="button button-secondary" data-review-mock type="button">Review in guided mode</button>
          <button class="button button-warning" data-restart-mock type="button">Start another attempt</button>
        </div>
      </section>
    `;
  }

  function relativeTime(timestamp) {
    const seconds = Math.max(1, Math.round((Date.now() - timestamp) / 1000));
    if (seconds < 60) return "now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  function formatTime(milliseconds) {
    const total = Math.max(0, Math.ceil(milliseconds / 1000));
    const hours = String(Math.floor(total / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const seconds = String(total % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function updateTimer() {
    const pill = document.getElementById("timerPill");
    const timer = document.getElementById("globalTimer");
    if (!userState?.mock?.active || userState.mock.submitted) {
      pill.hidden = true;
      clearInterval(timerInterval);
      timerInterval = null;
      return;
    }
    pill.hidden = false;
    const remaining = userState.mock.endAt - Date.now();
    timer.textContent = formatTime(remaining);
    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      submitMock(true);
      return;
    }
    if (!timerInterval) timerInterval = setInterval(updateTimer, 1000);
  }

  async function renderProfiles() {
    const profiles = (await dbGetAll("profiles")).sort((a, b) => b.lastLogin - a.lastLogin);
    document.getElementById("profileList").innerHTML = profiles.map((profile) => `
      <div class="profile-row">
        <span class="avatar">${esc(profile.initials)}</span>
        <div><strong>${esc(profile.name)}</strong><small>${profile.id === activeProfile.id ? "Current profile" : profile.pinHash ? "PIN protected" : "Open profile"}</small></div>
        <button class="button button-small ${profile.id === activeProfile.id ? "button-success" : "button-secondary"}" data-open-profile="${esc(profile.id)}" type="button">${profile.id === activeProfile.id ? "Active" : "Open"}</button>
      </div>
    `).join("");
  }

  function confirmDialog(title, message, action) {
    document.getElementById("confirmTitle").textContent = title;
    document.getElementById("confirmMessage").textContent = message;
    confirmAction = action;
    document.getElementById("confirmDialog").showModal();
  }

  async function createNote({ title = "Untitled note", category = "General", body = "" } = {}) {
    const note = {
      id: crypto.randomUUID(),
      userId: activeProfile.id,
      title,
      category,
      body,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    await dbPut("notes", note);
    notes.unshift(note);
    selectedNoteId = note.id;
    logActivity(`Created note: ${title}`);
    await saveUserState();
    setRoute("notes");
  }

  async function submitMock(auto = false) {
    if (!userState.mock.active || userState.mock.submitted) return;
    const passed = {};
    systemChallenges.forEach((challenge) => {
      passed[challenge.id] = validateChallenge(challenge, userState.mock.answers[challenge.id]);
    });
    const score = percent(Object.values(passed).filter(Boolean).length, systemChallenges.length);
    userState.mock.passed = passed;
    userState.mock.active = false;
    userState.mock.submitted = true;
    userState.mock.history.unshift({
      id: crypto.randomUUID(),
      submittedAt: Date.now(),
      score,
      auto
    });
    userState.mock.history = userState.mock.history.slice(0, 10);
    logActivity(`Completed a mock assessment with ${score}%`);
    await saveUserState();
    showToast(auto ? "Time expired. The mock was submitted automatically." : "Mock assessment submitted.", auto ? "error" : "success");
    renderRoute();
  }

  function getAnswerStore(mode) {
    return mode === "mock" ? userState.mock.answers : userState.simAnswers;
  }

  function updateAnswer(mode, challenge, updater) {
    const store = getAnswerStore(mode);
    const current = store[challenge.id];
    store[challenge.id] = updater(current);
    saveUserState();
  }

  function refreshChallengeOnly(mode = "guided") {
    if (mode === "mock") renderRoute();
    else document.querySelector(".challenge-workspace").innerHTML = challengeWorkspace(systemChallenges[currentChallenge], "guided");
  }

  async function handleClick(event) {
    const nav = event.target.closest("[data-nav]");
    if (nav) {
      event.preventDefault();
      setRoute(nav.dataset.nav);
      return;
    }

    const routeButton = event.target.closest("[data-route]");
    if (routeButton) {
      if (routeButton.dataset.openChallenge !== undefined) currentChallenge = Number(routeButton.dataset.openChallenge);
      setRoute(routeButton.dataset.route);
      return;
    }

    if (event.target.closest("#themeButton")) {
      applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
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
      return;
    }

    if (event.target.closest("#profileButton")) {
      await renderProfiles();
      document.getElementById("profileDialog").showModal();
      return;
    }

    const openProfile = event.target.closest("[data-open-profile]");
    if (openProfile) {
      const profile = await dbGet("profiles", openProfile.dataset.openProfile);
      if (!profile || profile.id === activeProfile.id) return;
      if (profile.pinHash) {
        document.getElementById("pinProfileId").value = profile.id;
        document.getElementById("pinTitle").textContent = `Open ${profile.name}`;
        document.getElementById("pinError").textContent = "";
        document.getElementById("profileDialog").close();
        document.getElementById("pinDialog").showModal();
      } else {
        document.getElementById("profileDialog").close();
        await loadProfile(profile);
        showToast(`Opened ${profile.name}'s workspace.`, "success");
      }
      return;
    }

    const roadmapButton = event.target.closest("[data-roadmap]");
    if (roadmapButton) {
      const index = roadmapButton.dataset.roadmap;
      userState.roadmap[index] = !userState.roadmap[index];
      if (userState.roadmap[index]) logActivity(`Completed roadmap day ${Number(index) + 1}`);
      await saveUserState();
      renderRoute();
      return;
    }

    if (event.target.closest("[data-reset-roadmap]")) {
      confirmDialog("Reset roadmap?", "This clears all fourteen day-completion checks for the current profile.", async () => {
        userState.roadmap = {};
        await saveUserState();
        renderRoute();
      });
      return;
    }

    const challengeButton = event.target.closest("[data-challenge]");
    if (challengeButton) {
      currentChallenge = Number(challengeButton.dataset.challenge);
      renderRoute();
      return;
    }

    if (event.target.closest("[data-challenge-prev]")) {
      currentChallenge = Math.max(0, currentChallenge - 1);
      renderRoute();
      return;
    }

    if (event.target.closest("[data-challenge-next]")) {
      currentChallenge = Math.min(systemChallenges.length - 1, currentChallenge + 1);
      renderRoute();
      return;
    }

    const simSingle = event.target.closest("[data-sim-single]");
    if (simSingle) {
      const challenge = systemChallenges[currentChallenge];
      userState.simAnswers[challenge.id] = Number(simSingle.dataset.simSingle);
      await saveUserState();
      refreshChallengeOnly();
      return;
    }

    const simMulti = event.target.closest("[data-sim-multi]");
    if (simMulti) {
      const challenge = systemChallenges[currentChallenge];
      const index = Number(simMulti.dataset.simMulti);
      const answer = Array.isArray(userState.simAnswers[challenge.id]) ? [...userState.simAnswers[challenge.id]] : [];
      const position = answer.indexOf(index);
      if (position >= 0) answer.splice(position, 1);
      else answer.push(index);
      userState.simAnswers[challenge.id] = answer;
      await saveUserState();
      refreshChallengeOnly();
      return;
    }

    const simSeqAdd = event.target.closest("[data-sim-sequence-add]");
    if (simSeqAdd) {
      const challenge = systemChallenges[currentChallenge];
      const answer = Array.isArray(userState.simAnswers[challenge.id]) ? [...userState.simAnswers[challenge.id]] : [];
      answer.push(simSeqAdd.dataset.simSequenceAdd);
      userState.simAnswers[challenge.id] = answer;
      await saveUserState();
      refreshChallengeOnly();
      return;
    }

    const simSeqRemove = event.target.closest("[data-sim-sequence-remove]");
    if (simSeqRemove) {
      const challenge = systemChallenges[currentChallenge];
      const answer = Array.isArray(userState.simAnswers[challenge.id]) ? [...userState.simAnswers[challenge.id]] : [];
      answer.splice(Number(simSeqRemove.dataset.simSequenceRemove), 1);
      userState.simAnswers[challenge.id] = answer;
      await saveUserState();
      refreshChallengeOnly();
      return;
    }

    if (event.target.closest("[data-show-hint]")) {
      const challenge = systemChallenges[currentChallenge];
      userState.simFeedback[challenge.id] = { pass: false, message: "Hint revealed. Try the task again before checking.", hint: true };
      await saveUserState();
      refreshChallengeOnly();
      return;
    }

    if (event.target.closest("[data-check-challenge]")) {
      const challenge = systemChallenges[currentChallenge];
      const pass = validateChallenge(challenge, userState.simAnswers[challenge.id]);
      userState.simPassed[challenge.id] = pass;
      userState.simFeedback[challenge.id] = {
        pass,
        message: pass ? "Task passed exact validation. You can move to the next activity." : "This configuration does not yet match every requested value. Re-read the task and use the hint if needed.",
        hint: false
      };
      if (pass) logActivity(`Passed simulator task: ${challenge.title}`);
      await saveUserState();
      showToast(pass ? "System task passed." : "Task needs another review.", pass ? "success" : "error");
      renderRoute();
      return;
    }

    const qaFilterButton = event.target.closest("[data-qa-filter]");
    if (qaFilterButton) {
      qaFilter = qaFilterButton.dataset.qaFilter;
      renderRoute();
      return;
    }

    const qaReveal = event.target.closest("[data-qa-reveal]");
    if (qaReveal) {
      const id = qaReveal.dataset.qaReveal;
      if (userState.qaReviewed[id]) delete userState.qaReviewed[id];
      else {
        userState.qaReviewed[id] = true;
        const item = qaItems.find((entry) => entry.id === id);
        if (item) logActivity(`Reviewed Q&A: ${item.question}`);
      }
      await saveUserState();
      renderRoute();
      return;
    }

    const noteFromQa = event.target.closest("[data-note-from-qa]");
    if (noteFromQa) {
      const item = qaItems.find((entry) => entry.id === noteFromQa.dataset.noteFromQa);
      if (item) await createNote({ title: item.question, category: item.category, body: `${item.answer}\n\nMy own explanation:\n` });
      return;
    }

    const walkStep = event.target.closest("[data-walk-step]");
    if (walkStep) {
      const key = walkStep.dataset.walkStep;
      userState.walkSteps[key] = !userState.walkSteps[key];
      await saveUserState();
      renderRoute();
      return;
    }

    const resetWalk = event.target.closest("[data-reset-walk]");
    if (resetWalk) {
      const id = resetWalk.dataset.resetWalk;
      Object.keys(userState.walkSteps).filter((key) => key.startsWith(`${id}:`)).forEach((key) => delete userState.walkSteps[key]);
      await saveUserState();
      renderRoute();
      return;
    }

    const noteFromWalk = event.target.closest("[data-note-from-walk]");
    if (noteFromWalk) {
      const walkthrough = walkthroughs.find((item) => item.id === noteFromWalk.dataset.noteFromWalk);
      if (walkthrough) await createNote({ title: `${walkthrough.title} notes`, category: "Cloud Integration", body: `Objective: ${walkthrough.objective}\n\nWhat I need to remember:\n` });
      return;
    }

    const landmarkButton = event.target.closest("[data-landmark]");
    if (landmarkButton) {
      const id = landmarkButton.dataset.landmark;
      userState.landmarks[id] = !userState.landmarks[id];
      if (userState.landmarks[id]) {
        const item = landmarks.find((entry) => entry.id === id);
        if (item) logActivity(`Completed landmark: ${item.title}`);
      }
      await saveUserState();
      renderRoute();
      return;
    }

    const checkItem = event.target.closest("[data-check-item]");
    if (checkItem) {
      userState.checklist[checkItem.dataset.checkItem] = checkItem.checked;
      await saveUserState();
      renderRoute();
      return;
    }

    const deleteCheck = event.target.closest("[data-delete-check]");
    if (deleteCheck) {
      const id = deleteCheck.dataset.deleteCheck;
      userState.customChecklist = userState.customChecklist.filter((item) => item.id !== id);
      delete userState.checklist[id];
      await saveUserState();
      renderRoute();
      return;
    }

    if (event.target.closest("[data-reset-checklist]")) {
      confirmDialog("Reset checklist?", "This clears every checklist tick for the current profile. Custom items remain.", async () => {
        userState.checklist = {};
        await saveUserState();
        renderRoute();
      });
      return;
    }

    const noteSelect = event.target.closest("[data-note-select]");
    if (noteSelect) {
      selectedNoteId = noteSelect.dataset.noteSelect;
      renderRoute();
      return;
    }

    if (event.target.closest("[data-new-note]")) {
      await createNote();
      return;
    }

    const deleteNote = event.target.closest("[data-delete-note]");
    if (deleteNote) {
      const id = deleteNote.dataset.deleteNote;
      confirmDialog("Delete note?", "This permanently removes the selected note from this browser profile.", async () => {
        await dbDelete("notes", id);
        notes = notes.filter((note) => note.id !== id);
        selectedNoteId = notes[0]?.id || null;
        showToast("Note deleted.");
        renderRoute();
      });
      return;
    }

    if (event.target.closest("[data-export-notes]")) {
      const payload = {
        application: "The Plan of Action",
        profile: activeProfile.name,
        exportedAt: new Date().toISOString(),
        notes
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `plan-of-action-notes-${activeProfile.id}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showToast("Notes exported.", "success");
      return;
    }

    if (event.target.closest("[data-start-mock]")) {
      userState.mock = {
        active: true,
        submitted: false,
        startedAt: Date.now(),
        endAt: Date.now() + THREE_HOURS,
        answers: {},
        passed: {},
        current: 0,
        history: userState.mock.history || []
      };
      logActivity("Started a three-hour mock assessment");
      await saveUserState();
      renderRoute();
      showToast("Mock assessment started. The countdown is active.");
      return;
    }

    const mockChallenge = event.target.closest("[data-mock-challenge]");
    if (mockChallenge) {
      userState.mock.current = Number(mockChallenge.dataset.mockChallenge);
      await saveUserState();
      renderRoute();
      return;
    }

    const mockSingle = event.target.closest("[data-mock-single]");
    if (mockSingle) {
      const challenge = systemChallenges[userState.mock.current || 0];
      userState.mock.answers[challenge.id] = Number(mockSingle.dataset.mockSingle);
      await saveUserState();
      renderRoute();
      return;
    }

    const mockMulti = event.target.closest("[data-mock-multi]");
    if (mockMulti) {
      const challenge = systemChallenges[userState.mock.current || 0];
      const index = Number(mockMulti.dataset.mockMulti);
      const answer = Array.isArray(userState.mock.answers[challenge.id]) ? [...userState.mock.answers[challenge.id]] : [];
      const position = answer.indexOf(index);
      if (position >= 0) answer.splice(position, 1);
      else answer.push(index);
      userState.mock.answers[challenge.id] = answer;
      await saveUserState();
      renderRoute();
      return;
    }

    const mockSeqAdd = event.target.closest("[data-mock-sequence-add]");
    if (mockSeqAdd) {
      const challenge = systemChallenges[userState.mock.current || 0];
      const answer = Array.isArray(userState.mock.answers[challenge.id]) ? [...userState.mock.answers[challenge.id]] : [];
      answer.push(mockSeqAdd.dataset.mockSequenceAdd);
      userState.mock.answers[challenge.id] = answer;
      await saveUserState();
      renderRoute();
      return;
    }

    const mockSeqRemove = event.target.closest("[data-mock-sequence-remove]");
    if (mockSeqRemove) {
      const challenge = systemChallenges[userState.mock.current || 0];
      const answer = Array.isArray(userState.mock.answers[challenge.id]) ? [...userState.mock.answers[challenge.id]] : [];
      answer.splice(Number(mockSeqRemove.dataset.mockSequenceRemove), 1);
      userState.mock.answers[challenge.id] = answer;
      await saveUserState();
      renderRoute();
      return;
    }

    if (event.target.closest("[data-submit-mock]")) {
      confirmDialog("Submit mock assessment?", "Submission stops the timer and reveals the task-by-task result.", () => submitMock(false));
      return;
    }

    if (event.target.closest("[data-restart-mock]")) {
      userState.mock.active = false;
      userState.mock.submitted = false;
      userState.mock.answers = {};
      userState.mock.passed = {};
      await saveUserState();
      renderRoute();
      return;
    }

    if (event.target.closest("[data-review-mock]")) {
      const firstFailed = systemChallenges.findIndex((challenge) => !userState.mock.passed[challenge.id]);
      currentChallenge = firstFailed >= 0 ? firstFailed : 0;
      setRoute("simulator");
      return;
    }

    if (event.target.closest("#confirmCancel")) {
      confirmAction = null;
      document.getElementById("confirmDialog").close();
      return;
    }

    if (event.target.closest("#confirmAccept")) {
      const action = confirmAction;
      confirmAction = null;
      document.getElementById("confirmDialog").close();
      if (action) await action();
    }
  }

  async function handleInput(event) {
    if (event.target.id === "qaSearch") {
      qaSearch = event.target.value;
      renderRoute();
      const input = document.getElementById("qaSearch");
      input.focus();
      input.setSelectionRange(qaSearch.length, qaSearch.length);
      return;
    }

    if (event.target.id === "noteSearch") {
      noteSearch = event.target.value;
      renderRoute();
      const input = document.getElementById("noteSearch");
      input.focus();
      input.setSelectionRange(noteSearch.length, noteSearch.length);
      return;
    }

    const simField = event.target.dataset.simField;
    if (simField !== undefined) {
      const challenge = systemChallenges[currentChallenge];
      if (!userState.simAnswers[challenge.id] || typeof userState.simAnswers[challenge.id] !== "object" || Array.isArray(userState.simAnswers[challenge.id])) {
        userState.simAnswers[challenge.id] = {};
      }
      userState.simAnswers[challenge.id][simField] = event.target.value;
      await saveUserState();
      return;
    }

    const mockField = event.target.dataset.mockField;
    if (mockField !== undefined) {
      const challenge = systemChallenges[userState.mock.current || 0];
      if (!userState.mock.answers[challenge.id] || typeof userState.mock.answers[challenge.id] !== "object" || Array.isArray(userState.mock.answers[challenge.id])) {
        userState.mock.answers[challenge.id] = {};
      }
      userState.mock.answers[challenge.id][mockField] = event.target.value;
      await saveUserState();
    }
  }

  async function handleSubmit(event) {
    if (event.target.id === "profileCreateForm") {
      event.preventDefault();
      const name = document.getElementById("newProfileName").value.trim();
      const pin = document.getElementById("newProfilePin").value.trim();
      if (!name) return;
      if (pin && !/^\d{4,8}$/.test(pin)) {
        showToast("A profile PIN must contain 4–8 digits.", "error");
        return;
      }
      const profile = {
        id: crypto.randomUUID(),
        name,
        initials: initials(name),
        pinHash: await hashPin(pin),
        createdAt: Date.now(),
        lastLogin: Date.now()
      };
      await dbPut("profiles", profile);
      document.getElementById("profileDialog").close();
      event.target.reset();
      await loadProfile(profile);
      showToast(`Created ${name}'s workspace.`, "success");
      return;
    }

    if (event.target.id === "pinForm") {
      event.preventDefault();
      const id = document.getElementById("pinProfileId").value;
      const profile = await dbGet("profiles", id);
      const entered = await hashPin(document.getElementById("profilePin").value);
      if (!profile || entered !== profile.pinHash) {
        document.getElementById("pinError").textContent = "That PIN does not match this device profile.";
        return;
      }
      document.getElementById("pinDialog").close();
      event.target.reset();
      await loadProfile(profile);
      showToast(`Opened ${profile.name}'s workspace.`, "success");
      return;
    }

    if (event.target.id === "customCheckForm") {
      event.preventDefault();
      const group = document.getElementById("customCheckGroup").value.trim();
      const text = document.getElementById("customCheckText").value.trim();
      if (!group || !text) return;
      userState.customChecklist.push({ id: `custom-${crypto.randomUUID()}`, group, text, custom: true });
      await saveUserState();
      showToast("Checklist item added.", "success");
      renderRoute();
      return;
    }

    if (event.target.id === "noteForm") {
      event.preventDefault();
      const id = document.getElementById("noteId").value;
      const note = notes.find((item) => item.id === id);
      if (!note) return;
      note.title = document.getElementById("noteTitle").value.trim() || "Untitled note";
      note.category = document.getElementById("noteCategory").value;
      note.body = document.getElementById("noteBody").value;
      note.updatedAt = Date.now();
      await dbPut("notes", note);
      notes.sort((a, b) => b.updatedAt - a.updatedAt);
      logActivity(`Updated note: ${note.title}`);
      await saveUserState();
      showToast("Note saved.", "success");
      renderRoute();
    }
  }

  async function initialize() {
    document.querySelectorAll("[data-icon]").forEach((node) => {
      node.innerHTML = icon(node.dataset.icon);
    });
    applyTheme(localStorage.getItem(THEME_KEY) || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    db = await openDatabase();
    const guest = await ensureGuestProfile();
    const activeId = localStorage.getItem(ACTIVE_PROFILE_KEY);
    const profile = activeId ? await dbGet("profiles", activeId) : guest;
    await loadProfile(profile || guest);
    document.getElementById("bootScreen").hidden = true;
    document.getElementById("appShell").hidden = false;
    document.addEventListener("click", handleClick);
    document.addEventListener("input", handleInput);
    document.addEventListener("change", handleInput);
    document.addEventListener("submit", handleSubmit);
    window.addEventListener("hashchange", renderRoute);
    if ("serviceWorker" in navigator && location.protocol !== "file:") {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    }
  }

  initialize().catch((error) => {
    console.error(error);
    document.getElementById("bootScreen").innerHTML = `<strong>Workspace could not start</strong><span>${esc(error.message || "IndexedDB is unavailable in this browser.")}</span>`;
  });
})();
