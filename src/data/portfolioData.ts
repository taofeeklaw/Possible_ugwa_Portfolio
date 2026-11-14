import heroSuiteImg from '../assets/images/hero_editing_suite_1794680125839.jpg';
import aboutEditorImg from '../assets/images/about_editor_frame_1794680125709.jpg';
import sampleVlogImg from '../assets/images/sample_vlog_frame_1794680125901.jpg';
import sampleTalkingHeadImg from '../assets/images/sample_talking_head_1794680126491.jpg';
import sampleMotionImg from '../assets/images/sample_motion_design_1794680126126.jpg';

export type WorkCategory = 'All' | 'Vlog' | 'Talking-Head' | 'Motion Design';

export interface WorkSample {
  id: string;
  title: string;
  category: Exclude<WorkCategory, 'All'>;
  aspectRatio: '16:9' | '9:16';
  formatLabel: string;
  duration: string;
  timecode: string;
  thumbnail: string;
  placeholderLabel: string;
  notes: string;
  /**
   * Swap in a real MP4 URL, YouTube link, or Google Drive preview link here.
   * Leave empty string "" to display the clean placeholder slot.
   */
  videoUrl: string;
}

export interface WhyMePromise {
  number: string;
  text: string;
}

export interface ContactChannel {
  id: 'x' | 'email' | 'whatsapp';
  label: string;
  handle: string;
  href: string;
  copyValue: string;
  actionLabel: string;
}

export const SITE_ASSETS = {
  heroSuite: heroSuiteImg,
  aboutEditor: aboutEditorImg,
};

export const SPECIALTIES = [
  'Retention Editing',
  'Motion Design',
  'Talking-Head & Vlogs',
] as const;

export const WORK_CATEGORIES: WorkCategory[] = [
  'All',
  'Vlog',
  'Talking-Head',
  'Motion Design',
];

export const WORK_SAMPLES: WorkSample[] = [
  {
    id: 'vlog-01',
    title: 'Creator Travel & Lifestyle Vlog Cut',
    category: 'Vlog',
    aspectRatio: '16:9',
    formatLabel: 'YouTube Vlog',
    duration: '1:20',
    timecode: '00:01:20:08',
    thumbnail: sampleVlogImg,
    placeholderLabel: 'Sample Reel Preview',
    notes: 'Paced story arc, J-cut audio transitions, and atmospheric color grade built for long-form retention.',
    videoUrl: '',
  },
  {
    id: 'talking-head-01',
    title: 'High-Retention Hook & Vertical Reel',
    category: 'Talking-Head',
    aspectRatio: '9:16',
    formatLabel: 'Reels / Shorts',
    duration: '0:45',
    timecode: '00:00:45:14',
    thumbnail: sampleTalkingHeadImg,
    placeholderLabel: 'Sample Reel Preview',
    notes: 'Frame-tight punch-ins, kinetic caption timing, and pattern interrupts in the opening 3 seconds.',
    videoUrl: '',
  },
  {
    id: 'motion-01',
    title: 'Editorial Product & Brand Motion Sequence',
    category: 'Motion Design',
    aspectRatio: '16:9',
    formatLabel: 'Motion Showcase',
    duration: '0:38',
    timecode: '00:00:38:00',
    thumbnail: sampleMotionImg,
    placeholderLabel: 'Sample Reel Preview',
    notes: 'Custom typography animation, clean UI callouts, and rhythmic sound design synced to keyframe easing.',
    videoUrl: '',
  },
  {
    id: 'talking-head-02',
    title: 'Founder Commentary Short-Form Cut',
    category: 'Talking-Head',
    aspectRatio: '9:16',
    formatLabel: 'Reels / Shorts',
    duration: '0:58',
    timecode: '00:00:58:19',
    thumbnail: sampleTalkingHeadImg,
    placeholderLabel: 'Sample Reel Preview',
    notes: 'Tightened breath-pauses, B-roll layering, and clean visual pacing to hold watch-through past 75%.',
    videoUrl: '',
  },
  {
    id: 'vlog-02',
    title: 'Day-in-the-Life Narrative Edit',
    category: 'Vlog',
    aspectRatio: '16:9',
    formatLabel: 'YouTube Vlog',
    duration: '1:45',
    timecode: '00:01:45:04',
    thumbnail: sampleVlogImg,
    placeholderLabel: 'Sample Reel Preview',
    notes: 'Soundtrack swell timing, crisp SFX beds, and narrative chapter pacing from intro hook to outro.',
    videoUrl: '',
  },
  {
    id: 'motion-02',
    title: 'Vertical Explainer & Kinetic Type Reel',
    category: 'Motion Design',
    aspectRatio: '9:16',
    formatLabel: 'Motion Reel',
    duration: '0:52',
    timecode: '00:00:52:11',
    thumbnail: sampleMotionImg,
    placeholderLabel: 'Sample Reel Preview',
    notes: 'Dynamic data-card motion, crisp vector highlights, and scroll-stopping visual transitions.',
    videoUrl: '',
  },
];

export const WHY_ME_PROMISES: WhyMePromise[] = [
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
];

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
