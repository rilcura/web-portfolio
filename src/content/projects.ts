export type District = 'mobile' | 'systems';
export interface Project { id: string; title: string; summary: string; contribution: string[]; technologies: string[]; district: District; kind: 'Career contribution' | 'Personal project'; featured: boolean; status: 'published' | 'construction'; images?: {src: string; alt: string}[]; links?: {label: string; url: string}[]; }
export const projects: Project[] = [
  {id:'banking',title:'Mobile banking applications',summary:'Customer-facing Android and iOS experiences at China Bank PH.',contribution:['Led mobile development and production support.', 'Delivered features integrated with backend services, working with QA, DevOps, security, and UX teams.', 'Investigated production issues and coordinated fixes across teams.'],technologies:['Android','iOS','Backend integration'],district:'mobile',kind:'Career contribution',featured:true,status:'published'},
  {id:'components',title:'Reusable mobile foundations',summary:'Shared components and development workflows for confidential products at Sedna.',contribution:['Developed reusable mobile components for pre-launch products.', 'Established and maintained a shared mobile and web monorepo.', 'Provided mobile-development guidance to cross-functional teams.'],technologies:['.NET MAUI','C#','Rust','RabbitMQ'],district:'mobile',kind:'Career contribution',featured:true,status:'published'},
  {id:'admin',title:'Internal administration portal',summary:'An internal tool supporting customer-service workflows at China Bank PH.',contribution:['Developed a secure internal portal for customer-support teams to access and manage user information.'],technologies:['Web development','Internal tooling'],district:'systems',kind:'Career contribution',featured:true,status:'published'},
  {id:'next-mobile',title:'The next mobile adventure',summary:'Under construction: a new build is taking shape.',contribution:[],technologies:[],district:'mobile',kind:'Personal project',featured:false,status:'construction'},
  {
    id:'ivan-planner',
    title:'Ivan Planner',
    summary:'Trello and Google Calendar scheduling automation. Version 0.2.0 deployed on 26 October 2026 with a five-minute background sync.',
    contribution:[
      'Problem: Keeping planned work sessions aligned across a task board and calendar required duplicate scheduling edits.',
      'My contribution: Built a standalone Google Apps Script integration using the Trello REST API and Google Calendar API directly, without Zapier or AI model calls.',
      'Delivered: Scheduled Trello work sessions create or update linked calendar events. Moving or resizing an existing linked event updates the Trello start time and duration. Trello owns task details and completion, with completed events retained as history.',
      'Reliability: Implemented persistent mappings and deterministic event IDs to prevent duplicate events, execution locking, conditional Calendar updates, preserved personal notes, and explicit review for conflicting edits or missing events.',
      'Validation: 61 automated direct-sync tests covered API adapters, reconciliation, failures, recovery, timezone handling, and trigger setup. Ten real-account checks passed, followed by verified automatic trigger runs at deployment.',
      'Scope: The deployed version connects one configured Trello board to one calendar. Multi-board support is undeployed draft work. Unrelated calendar events do not create tasks, and recurring or all-day events are unsupported.',
    ],
    technologies:['JavaScript','Google Apps Script','Trello REST API','Google Calendar API','Node.js tests'],
    district:'systems',kind:'Personal project',featured:true,status:'published',
  },
];
