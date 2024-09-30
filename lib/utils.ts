import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';
import { BADGE_CRITERIA } from '@/constants';
import { BadgeCounts } from '@/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor(
        (now.getTime() - createdAt.getTime()) / 1000,
    );

    const timeUnits = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 },
    ];

    for (const { unit, seconds } of timeUnits) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
};

export const formatLargeNumber = (num: number): string => {
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
};

// Get the JavaScript date object as a parameter and return a joined date (just a month and year)
export const getJoinedDate = (date: Date): string => {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${month} ${year}`;
};

interface UrlQueryParams {
    params: string;
    key: string;
    value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
    const currentUrl = qs.parse(params);

    currentUrl[key] = value;

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl,
        },
        {
            skipNull: true,
        },
    );
};

interface RemoveUrlQueryParams {
    params: string;
    keysToRemove: string[];
}

export const removeKeysFromQuery = ({
    params,
    keysToRemove,
}: RemoveUrlQueryParams) => {
    const currentUrl = qs.parse(params);

    keysToRemove.forEach((key) => delete currentUrl[key]);

    return qs.stringifyUrl(
        {
            url: window.location.pathname,
            query: currentUrl,
        },
        {
            skipNull: true,
        },
    );
};

interface BadgeParam {
    criteria: {
        type: keyof typeof BADGE_CRITERIA;
        count: number;
    }[];
}

export const assignBadges = (params: BadgeParam) => {
    const badgeCounts: BadgeCounts = {
        GOLD: 0,
        SILVER: 0,
        BRONZE: 0,
    };

    const { criteria } = params;

    criteria.forEach((item) => {
        const { type, count } = item;
        const badgeLevels: any = BADGE_CRITERIA[type];

        Object.keys(badgeLevels).forEach((level: any) => {
            if (count >= badgeLevels[level]) {
                badgeCounts[level as keyof BadgeCounts] += 1;
            }
        });
    });

    return badgeCounts;
};
