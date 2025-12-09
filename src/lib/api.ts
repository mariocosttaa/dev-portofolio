/**
 * Portfolio Data API
 * 
 * Centralized data access layer for portfolio content.
 * All data is stored in JSON files for easy updates.
 */

import type {
  PersonalInfo,
  ProjectsData,
  ExperienceData,
  SkillsData,
  NavigationData,
  ContactData,
} from "@/types/portfolio";

// Import JSON data for English
import personalDataEn from "@/data/en/personal.json";
import projectsDataEn from "@/data/en/projects.json";
import experienceDataEn from "@/data/en/experience.json";
import skillsDataEn from "@/data/en/skills.json";
import navigationDataEn from "@/data/en/navigation.json";
import contactDataEn from "@/data/en/contact.json";

// Import JSON data for Portuguese
import personalDataPt from "@/data/pt/personal.json";
import projectsDataPt from "@/data/pt/projects.json";
import experienceDataPt from "@/data/pt/experience.json";
import skillsDataPt from "@/data/pt/skills.json";
import navigationDataPt from "@/data/pt/navigation.json";
import contactDataPt from "@/data/pt/contact.json";

/**
 * Helper to get data by locale
 */
function getData<T>(enData: T, ptData: T, locale: string = 'en'): T {
  return locale === 'pt' ? ptData : enData;
}

/**
 * Get personal information
 */
export function getPersonalInfo(locale: string = 'en'): PersonalInfo {
  return getData(personalDataEn, personalDataPt, locale) as PersonalInfo;
}

/**
 * Get all projects (featured + open source)
 */
export function getProjects(locale: string = 'en'): ProjectsData {
  return getData(projectsDataEn, projectsDataPt, locale) as ProjectsData;
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(locale: string = 'en') {
  return getProjects(locale).featured;
}

/**
 * Get open source projects only
 */
export function getOpenSourceProjects(locale: string = 'en') {
  return getProjects(locale).openSource;
}

/**
 * Get experience data (work + education + about)
 */
export function getExperience(locale: string = 'en'): ExperienceData {
  return getData(experienceDataEn, experienceDataPt, locale) as ExperienceData;
}

/**
 * Get work experience only
 */
export function getWorkExperience(locale: string = 'en') {
  return getExperience(locale).work;
}

/**
 * Get education history
 */
export function getEducation(locale: string = 'en') {
  return getExperience(locale).education;
}

/**
 * Get about section content
 */
export function getAboutContent(locale: string = 'en') {
  return getExperience(locale).about;
}

/**
 * Get skills data
 */
export function getSkills(locale: string = 'en'): SkillsData {
  return getData(skillsDataEn, skillsDataPt, locale) as SkillsData;
}

/**
 * Get skill categories
 */
export function getSkillCategories(locale: string = 'en') {
  return getSkills(locale).categories;
}

/**
 * Get expertise areas
 */
export function getExpertise(locale: string = 'en') {
  return getSkills(locale).expertise;
}

/**
 * Get technologies list (for marquee)
 */
export function getTechnologies(locale: string = 'en') {
  return getSkills(locale).technologies;
}

/**
 * Get navigation links
 */
export function getNavigation(locale: string = 'en'): NavigationData {
  return getData(navigationDataEn, navigationDataPt, locale) as NavigationData;
}

/**
 * Get contact information
 */
export function getContact(locale: string = 'en'): ContactData {
  return getData(contactDataEn, contactDataPt, locale) as ContactData;
}

/**
 * Get contact methods
 */
export function getContactMethods(locale: string = 'en') {
  return getContact(locale).methods;
}

// Re-export all data for convenience (defaulting to English for backward compatibility)
export const portfolioData = {
  personal: personalDataEn,
  projects: projectsDataEn,
  experience: experienceDataEn,
  skills: skillsDataEn,
  navigation: navigationDataEn,
  contact: contactDataEn,
};

