import aboutEditorImg from '../assets/images/about_editor_frame_1794680125709.jpg';
import sampleVlogImg from '../assets/images/sample_vlog_frame_1794680125901.jpg';
import sampleTalkingHeadImg from '../assets/images/sample_talking_head_1794680126491.jpg';
import sampleMotionImg from '../assets/images/sample_motion_design_1794680126126.jpg';

export const ABOUT_PORTRAIT_URL =
  'https://drive.google.com/file/d/1w9Sq3arJXqV_VeNoos54nklKWTe-JhqV/view?usp=sharing';

export interface WorkItem {
  id: string;
  title: string;
  category: 'Motion Design' | 'Talking-Head' | 'Vlog';
  type: 'video' | 'image';
  format: '9:16' | '16:9';
  duration: string;
  driveUrl: string;
  thumbnailDriveUrl: string;
  description: string;
  featured: boolean;
}

/**
 * Centralized Work Portfolio Items
 * Supports local/direct .mp4/.mov paths or Google Drive share links.
 */
export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'work-01',
    title: 'Editorial Motion Sequence 01',
    category: 'Motion Design',
    type: 'video',
    format: '16:9',
    duration: '0:38',
    driveUrl:
      'https://drive.google.com/file/d/1MkoCdWdqyOHOFJdwjL496-Smg0IfsvXR/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Custom typography animation, clean UI callouts, and rhythmic sound design synced to keyframe easing.',
    featured: true,
  },
  {
    id: 'work-02',
    title: 'High-Retention Vertical Reel 01',
    category: 'Talking-Head',
    type: 'video',
    format: '9:16',
    duration: '0:45',
    driveUrl:
      'https://drive.google.com/file/d/1-qlLwqmOUk727ipB0E7FPGt8SC5Rfsu3/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Frame-tight punch-ins, kinetic caption timing, and pattern interrupts in the opening 3 seconds.',
    featured: true,
  },
  {
    id: 'work-03',
    title: 'Creator Vlog & Story Edit 01',
    category: 'Vlog',
    type: 'video',
    format: '9:16',
    duration: '1:20',
    driveUrl:
      'https://drive.google.com/file/d/1LE1nYhWteDojAUY29qvjeFEuWUeMiz2_/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Paced story arc, J-cut audio transitions, and atmospheric color grade built for retention.',
    featured: true,
  },
  {
    id: 'work-04',
    title: 'Kinetic Typography Reel 02',
    category: 'Motion Design',
    type: 'video',
    format: '9:16',
    duration: '0:52',
    driveUrl:
      'https://drive.google.com/file/d/1SJwoCyXHlaf4Kgkv4TdvXkpJdtjW2GOC/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Dynamic data-card motion, crisp vector highlights, and scroll-stopping visual transitions.',
    featured: true,
  },
  {
    id: 'work-05',
    title: 'Founder Commentary Short 02',
    category: 'Talking-Head',
    type: 'video',
    format: '9:16',
    duration: '0:58',
    driveUrl:
      'https://drive.google.com/file/d/1vdf24fFsSZ92Gpa3APsg_iofTgbF8epu/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Tightened breath-pauses, B-roll layering, and clean visual pacing to hold watch-through past 75%.',
    featured: false,
  },
  {
    id: 'work-06',
    title: 'Narrative Vlog Edit 02',
    category: 'Vlog',
    type: 'video',
    format: '9:16',
    duration: '1:45',
    driveUrl:
      'https://drive.google.com/file/d/1l8FA7oepaH4JS6QyPOl1ajDL9GRrU-8h/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Soundtrack swell timing, crisp SFX beds, and narrative chapter pacing from intro hook to outro.',
    featured: false,
  },
  {
    id: 'work-07',
    title: 'Brand Visual Motion Reel 03',
    category: 'Motion Design',
    type: 'video',
    format: '9:16',
    duration: '0:48',
    driveUrl:
      'https://drive.google.com/file/d/15zkPvStLmI22IMrdr5pTtx1U1xLKO2TM/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Polished keyframe transitions, graphic overlays, and clean sound-designed motion accents.',
    featured: false,
  },
  {
    id: 'work-08',
    title: 'Direct-to-Camera Hook Cut 03',
    category: 'Talking-Head',
    type: 'video',
    format: '9:16',
    duration: '0:42',
    driveUrl:
      'https://drive.google.com/file/d/1_JBIP3WlVch90VE-YvFD_UJV0_K-WeT0/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Snap-cut pacing, subtle zoom emphasis, and high-clarity caption choreography.',
    featured: false,
  },
  {
    id: 'work-09',
    title: 'Documentary Pacing Cut 03',
    category: 'Vlog',
    type: 'video',
    format: '9:16',
    duration: '1:30',
    driveUrl:
      'https://drive.google.com/file/d/1-MRcxZfzZ8WThrQgGSvhrsoxyoDccwPE/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Seamless scene transitions, balanced dialogue mix, and visual rhythm engineered for completion.',
    featured: false,
  },
  {
    id: 'work-10',
    title: 'Explainer Motion Design Cut 04',
    category: 'Motion Design',
    type: 'video',
    format: '9:16',
    duration: '0:40',
    driveUrl:
      'https://drive.google.com/file/d/1ESwCuxQkj4aSlCznOqlfO2nEIuylV7FF/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Crisp animated callouts and kinetic visual storytelling built for vertical feeds.',
    featured: false,
  },
  {
    id: 'work-11',
    title: 'Short-Form Retention Edit 04',
    category: 'Talking-Head',
    type: 'video',
    format: '16:9',
    duration: '0:50',
    driveUrl:
      'https://drive.google.com/file/d/1V6jf2MCUvqF3Rkz0Yv7basb0ELV97gPq/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Scroll-stopping first-frame hook with clean B-roll inserts and tight rhythmic cuts.',
    featured: false,
  },
  {
    id: 'work-12',
    title: 'Lifestyle & Travel Vlog Cut 04',
    category: 'Vlog',
    type: 'video',
    format: '9:16',
    duration: '1:15',
    driveUrl:
      'https://drive.google.com/file/d/1n3e1UIh8b3xrIVJ2FwB8asIly2hsXgLK/view?usp=drive_link',
    thumbnailDriveUrl: '',
    description:
      'Cohesive color grading, ambient audio layering, and story-first timeline assembly.',
    featured: false,
  },
];

export const HERO_VIDEO_ITEM = WORK_ITEMS[0];

export const WORK_CATEGORIES = [
  'All',
  'Motion Design',
  'Talking-Head',
  'Vlog',
] as const;

export const SITE_ASSETS = {
  aboutEditorDefault: aboutEditorImg,
  fallbackThumbnails: {
    vlog: sampleVlogImg,
    talkingHead: sampleTalkingHeadImg,
    motionDesign: sampleMotionImg,
  },
};

export function getFallbackThumbnail(category: string): string {
  const normalized = category.toLowerCase();
  if (normalized.includes('talk') || normalized.includes('reel') || normalized.includes('short')) {
    return SITE_ASSETS.fallbackThumbnails.talkingHead;
  }
  if (normalized.includes('motion')) {
    return SITE_ASSETS.fallbackThumbnails.motionDesign;
  }
  return SITE_ASSETS.fallbackThumbnails.vlog;
}

export function formatTimecode(duration: string): string {
  const clean = duration.trim();
  if (!clean) return '00:00:45:00';
  const parts = clean.split(':').map((p) => p.padStart(2, '0'));
  if (parts.length === 2) return `00:${parts[0]}:${parts[1]}:00`;
  if (parts.length === 3) return `${parts[0]}:${parts[1]}:${parts[2]}:00`;
  return '00:00:45:00';
}

export const SPECIALTIES = [
  'Retention Editing',
  'Motion Design',
  'Talking-Head & Vlogs',
] as const;

export const WHY_ME_PROMISES = [
  {
    number: '01',
    text: "I respect deadlines. You'll never be chasing me for updates.",
  },
  {
    number: '02',
    text: 'I edit with your audience in mind, not just aesthetics.',
  },
  {
    number: '03',
    text: "I'm not done until you're genuinely happy with the result.",
  },
  {
    number: '04',
    text: "I'm easy to work with. I make the process smooth from brief to final delivery, with zero drama.",
  },
] as const;

export interface ContactChannel {
  id: 'x' | 'email' | 'whatsapp';
  label: string;
  handle: string;
  href: string;
  copyValue: string;
  actionLabel: string;
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'x',
    label: 'X (Twitter) DM',
    handle: '@Possible_Ugwa',
    href: 'https://x.com/Possible_Ugwa',
    copyValue: '@Possible_Ugwa',
    actionLabel: 'Send a DM',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'possibleugwa@gmail.com',
    href: 'mailto:possibleugwa@gmail.com',
    copyValue: 'possibleugwa@gmail.com',
    actionLabel: 'Send an Email',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: '+234 807 310 2035',
    href: 'https://wa.me/2348073102035',
    copyValue: '+2348073102035',
    actionLabel: 'Message on WhatsApp',
  },
];
