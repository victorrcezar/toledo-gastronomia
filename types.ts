import React from "react";

export type SectionType = 'default' | 'grid' | 'timeline' | 'card-highlight' | 'journey';

export interface TimelineItem {
  phase: string;
  title: string;
  description: string;
}

export interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// This type is equivalent to Step, keeping it for now if other components use it.
export type FunnelStage = Step;

export interface GridItem {
  text: string;
  icon: React.ReactNode;
}

export interface GridColumn {
  title?: string;
  items: GridItem[];
}

export interface JourneySubStep {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

export interface JourneyStep {
  title: string;
  mindset: JourneySubStep;
  action: JourneySubStep;
  objective: JourneySubStep;
}


export interface Section {
  id: string;
  title: string;
  type: SectionType;
  content?: any;
  journeySteps?: JourneyStep[];
  columns?: GridColumn[];
  headers?: string[];
  rows?: string[][];
  timelineItems?: TimelineItem[];
}