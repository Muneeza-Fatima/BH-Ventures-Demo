export interface ServiceProcessStep {
  title: string;
  desc: string;
}

export interface ServiceHighlight {
  label: string;
  value: string;
}

export interface Service {
  key: string;
  slug: string;
  image: string;
  video?: string; // optional — hero uses image until you add real footage
  badge: string;
  index: string;
  title: string;
  sub: string;
  desc: string;
  tag: string;
  whatsIncluded: string[];
  process: ServiceProcessStep[];
  highlights: ServiceHighlight[];
}
