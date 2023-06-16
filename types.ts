import { type } from 'os';
import Stripe from 'stripe';

export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avaatar_url?: string;
    billing_address?: Stripe.Address;
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product {
    id: string;
    active?: boolean;
    name: string;
    description?: string;
    image?: string;
    metadata?: Stripe.Metadata;
}

export interface Price {
    id: string;
    product_id: string;
    active?: boolean;
    description?: string;
    unit_amount?: number;
    currency?: string;
    type?: Stripe.Price.Type;
    interval?: Stripe.Price.Recurring.Interval;
    interval_count?: number;
    trial_period_days?: number | null;
    metadata?: Stripe.Metadata;
    products?: Product;
}

export interface SubscriptionDetails {
    id: string;
    user_id: string;
    metadata?: Stripe.Metadata;
    status?: Stripe.Subscription.Status;
    price_id?: string;
    quantity?: number;
    cancel_at_period_end?: boolean;
    created?: string;
    current_period_end?: string;
    current_period_start?: string;
    ended_at?: string;
    cancel_at?: string;
    canceled_at?: string;
    trial_start?: string;
    trial_end?: string;
    prices?: Price;
}