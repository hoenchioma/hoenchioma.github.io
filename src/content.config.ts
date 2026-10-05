import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const yearMonth = z.coerce.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'use YYYY-MM with a month from 01 to 12');

const timeline = z.object({ short: z.string(), role: z.string(), org: z.string() });

const experience = defineCollection({
  loader: file('src/data/experience.yaml'),
  schema: ({ image }) =>
    z.object({
      org: z.string(),
      logo: image(),
      kind: z.enum(['research', 'industry', 'teaching']),
      start: yearMonth,
      end: yearMonth.optional(),
      /** Relative ordering overrides: list this entry somewhere above / below the entry with that id. */
      before: z.string().optional(),
      after: z.string().optional(),
      timeline: timeline.extend({ row: z.number().int().min(0).max(1) }),
      roles: z.array(
        z.object({ title: z.string(), start: yearMonth, end: yearMonth.optional(), display: z.string().optional() }),
      ),
      points: z.array(z.string()),
    }),
});

const education = defineCollection({
  loader: file('src/data/education.yaml'),
  schema: ({ image }) =>
    z.object({
      degree: z.string(),
      school: z.string(),
      logo: image(),
      start: yearMonth,
      end: yearMonth.optional(),
      display: z.string().optional(),
      timeline,
      /** One labelled line each, e.g. { label: Advisor, text: Dr. … }. */
      details: z.array(z.object({ label: z.string(), text: z.string() })),
    }),
});

const log = defineCollection({
  loader: file('src/data/log.yaml'),
  schema: z.object({
    date: yearMonth,
    text: z.string(),
    short: z.string().optional(),
    highlight: z.string().optional(),
  }),
});

const achievements = defineCollection({
  loader: file('src/data/achievements.yaml'),
  schema: ({ image }) =>
    z.object({
      group: z.enum(['academic', 'competitive-programming', 'hackathons', 'ctf']),
      title: z.string(),
      homeTitle: z.string().optional(),
      detail: z.string(),
      year: z.coerce.string(),
      home: z.boolean().default(false),
      photo: image().optional(),
    }),
});

const skills = defineCollection({
  loader: file('src/data/skills.yaml'),
  schema: z.object({ group: z.string(), items: z.array(z.string()) }),
});

const projects = defineCollection({
  loader: file('src/data/projects.yaml'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      kind: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      link: z.object({ label: z.string(), href: z.url() }),
      image: image().optional(),
    }),
});

const art = defineCollection({
  loader: file('src/data/art.yaml'),
  schema: ({ image }) =>
    z.object({
      image: image(),
      title: z.string().optional(),
      year: z.coerce.string().optional(),
      medium: z.string().optional(),
      home: z.boolean().default(false),
      link: z.url().optional(),
    }),
});

export const collections = { experience, education, log, achievements, skills, projects, art };
