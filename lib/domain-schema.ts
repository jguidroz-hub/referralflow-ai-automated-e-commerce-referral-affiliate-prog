import { pgTable, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './schema';

// Per-user preferences and settings
export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  timezone: text('timezone').default('UTC'),
  emailNotifications: boolean('email_notifications').default('true'),
  weeklyDigest: boolean('weekly_digest').default('true'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
  updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
});

// Tracks important state changes for debugging and compliance
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
});

// Define unique referral program configurations for businesses
export const referralPrograms = pgTable('referral_programs', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  commissionRate: text('commission_rate').notNull(),
  minimumPayout: text('minimum_payout').default(0),
  isActive: boolean('is_active').default('true'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

// Unique trackable referral links for affiliates
export const referralLinks = pgTable('referral_links', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  programId: text('program_id').references(() => referralPrograms.id, { onDelete: 'cascade' }),
  uniqueCode: text('unique_code').notNull().unique(),
  totalClicks: integer('total_clicks').default(0),
  totalConversions: integer('total_conversions').default(0),
  totalEarnings: text('total_earnings').default(0),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

// Track individual referral sales and commissions
export const referralTransactions = pgTable('referral_transactions', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  linkId: text('link_id').references(() => referralLinks.id, { onDelete: 'cascade' }),
  orderAmount: text('order_amount').notNull(),
  commissionAmount: text('commission_amount').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
